import OpenAI from "openai";
import { NextResponse } from "next/server";
import {
  buildAmazonSearchUrl,
  recommendProducts,
  slugifyRecommendation,
  type Recommendation,
  type RecommendationInput
} from "@/lib/recommend";

type OpenAIRecommendation = {
  title: string;
  description: string;
  reason: string;
  priceRange: string;
  searchQuery: string;
  categories?: string[];
};

type OpenAIRecommendationPayload = {
  recommendations?: OpenAIRecommendation[];
};

const fallbackEnabled = process.env.OPENAI_FALLBACK_ENABLED === "true";

export async function POST(request: Request) {
  const debugId = crypto.randomUUID();
  const input = (await request.json()) as RecommendationInput;
  const localRecommendations = recommendProducts(input);
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  console.info("[recommendations] request_received", {
    debugId,
    model,
    fallbackEnabled,
    mode: "openai-freeform",
    recipient: input.recipient,
    ageGroup: input.ageGroup,
    occasion: input.occasion,
    budget: input.budget,
    style: input.style,
    interests: input.interests || null
  });

  if (!process.env.OPENAI_API_KEY) {
    console.error("[recommendations] missing_openai_api_key", { debugId });

    if (fallbackEnabled) {
      console.info("[recommendations] returning_local_fallback", {
        debugId,
        reason: "missing_api_key",
        count: localRecommendations.length
      });
      return NextResponse.json({
        recommendations: localRecommendations,
        source: "local",
        debugId
      });
    }

    return NextResponse.json(
      {
        error: "OPENAI_API_KEY nao configurada no servidor de producao.",
        source: "openai-error",
        debugId
      },
      { status: 500 }
    );
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "Voce e um especialista brasileiro em presentes. Sugira presentes reais que uma pessoa conseguiria procurar em lojas online no Brasil. Responda somente JSON valido, sem markdown."
        },
        {
          role: "user",
          content: JSON.stringify({
            input,
            task:
              "Crie um Top 10 de presentes livres, sem usar catalogo fixo. Respeite orcamento, ocasiao, estilo, idade e gostos. Para cada item, informe title, description, reason, priceRange, searchQuery e categories. searchQuery deve ser curta e boa para buscar na Amazon Brasil, sem marca inventada e sem preco. Retorne exatamente { recommendations: [{ title, description, reason, priceRange, searchQuery, categories }] }."
          })
        }
      ],
      max_tokens: 1200,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    const parsed = (content
      ? JSON.parse(content)
      : {}) as OpenAIRecommendationPayload;
    const recommendations = buildDynamicRecommendations(
      parsed.recommendations ?? [],
      input
    );

    if (recommendations.length === 0) {
      throw new Error("OpenAI retornou JSON sem recomendacoes validas.");
    }

    console.info("[recommendations] openai_success", {
      debugId,
      model,
      mode: "openai-freeform",
      responseId: response.id,
      finishReason: response.choices[0]?.finish_reason,
      recommendationCount: recommendations.length,
      recommendations: recommendations.map((product, index) => ({
        rank: index + 1,
        id: product.id,
        title: product.title,
        reason: product.reason,
        searchUrl: product.amazonUrl
      })),
      usage: response.usage
    });

    return NextResponse.json({
      recommendations,
      source: "openai",
      mode: "openai-freeform",
      debugId
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    console.error("[recommendations] openai_error", {
      debugId,
      model,
      fallbackEnabled,
      error: message
    });

    if (fallbackEnabled) {
      console.info("[recommendations] returning_local_fallback", {
        debugId,
        reason: "openai_error",
        count: localRecommendations.length
      });
      return NextResponse.json({
        recommendations: localRecommendations,
        source: "local-fallback",
        debugId
      });
    }

    return NextResponse.json(
      {
        error: `OpenAI falhou: ${message}`,
        source: "openai-error",
        debugId
      },
      { status: 502 }
    );
  }
}

function buildDynamicRecommendations(
  items: OpenAIRecommendation[],
  input: RecommendationInput
): Recommendation[] {
  const usedIds = new Set<string>();

  return items
    .filter(
      (item) =>
        item.title &&
        item.description &&
        item.reason &&
        item.priceRange &&
        item.searchQuery
    )
    .slice(0, 10)
    .map((item, index) => {
      const baseId = slugifyRecommendation(item.title) || `sugestao-${index + 1}`;
      const id = usedIds.has(baseId) ? `${baseId}-${index + 1}` : baseId;
      usedIds.add(id);

      return {
        id,
        title: item.title.trim(),
        description: item.description.trim(),
        reason: item.reason.trim(),
        priceRange: item.priceRange.trim(),
        amazonUrl: buildAmazonSearchUrl(item.searchQuery.trim()),
        image: imageForRecommendation(item, input),
        categories:
          item.categories?.filter(Boolean).slice(0, 3) ??
          [input.style, input.occasion].filter(Boolean).slice(0, 2),
        personas: [input.recipient],
        occasions: [input.occasion],
        interests: [input.interests || input.style],
        score: 100 - index
      };
    });
}

function imageForRecommendation(
  item: OpenAIRecommendation,
  input: RecommendationInput
) {
  const text = [
    item.title,
    item.description,
    item.searchQuery,
    item.categories?.join(" "),
    input.style,
    input.interests
  ]
    .join(" ")
    .toLowerCase();

  if (text.includes("cafe") || text.includes("cafeteira")) {
    return "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=720&q=82";
  }

  if (text.includes("livro") || text.includes("leitura")) {
    return "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=720&q=82";
  }

  if (text.includes("tecnologia") || text.includes("fone")) {
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=720&q=82";
  }

  if (text.includes("desenho") || text.includes("arte")) {
    return "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=720&q=82";
  }

  if (text.includes("crianca") || text.includes("brinquedo")) {
    return "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=720&q=82";
  }

  if (text.includes("beleza") || text.includes("skincare")) {
    return "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=720&q=82";
  }

  return "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=720&q=82";
}
