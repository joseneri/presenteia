import OpenAI from "openai";
import { NextResponse } from "next/server";
import {
  buildAmazonSearchUrl,
  getRecommendationCount,
  recommendProducts,
  slugifyRecommendation,
  type Recommendation,
  type RecommendationInput
} from "@/lib/recommend";

type OpenAIRecommendation = {
  title?: string;
  titulo?: string;
  description?: string;
  descricao?: string;
  reason?: string;
  motivo?: string;
  priceRange?: string;
  precoEstimado?: string;
  searchQuery?: string;
  buscaAmazon?: string;
  categoria?: string;
  categories?: string[];
  destaque?: boolean;
  coringa?: boolean;
};

type OpenAIRecommendationPayload = {
  recommendations?: OpenAIRecommendation[];
  itens?: OpenAIRecommendation[];
  total?: number;
};

const fallbackEnabled = process.env.OPENAI_FALLBACK_ENABLED === "true";

export async function POST(request: Request) {
  const debugId = crypto.randomUUID();
  const input = (await request.json()) as RecommendationInput;
  const localRecommendations = recommendProducts(input);
  const desiredCount = getRecommendationCount(input);
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
    interests: input.interests || null,
    desiredCount
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
        total: localRecommendations.length,
        itens: toStructuredItems(localRecommendations),
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
          content: buildSystemPrompt()
        },
        {
          role: "user",
          content: JSON.stringify({
            input,
            task:
              "Crie uma lista curada de presentes livres, sem usar catalogo fixo. Respeite orcamento, ocasiao, estilo, idade e gostos. A quantidade deve ser calculada pelas regras do system prompt antes de gerar a lista. Para cada item, informe title, description, reason, priceRange, searchQuery, categories, destaque e coringa. searchQuery deve ser curta e boa para buscar na Amazon Brasil, sem marca inventada e sem preco. Retorne exatamente { total, recommendations: [{ title, description, reason, priceRange, searchQuery, categories, destaque, coringa }] }."
          })
        }
      ],
      max_tokens: 1600,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    const parsed = (content
      ? JSON.parse(content)
      : {}) as OpenAIRecommendationPayload;
    const recommendations = buildDynamicRecommendations(
      parsed.recommendations ?? parsed.itens ?? [],
      input,
      desiredCount
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
      total: recommendations.length,
      itens: toStructuredItems(recommendations),
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
        total: localRecommendations.length,
        itens: toStructuredItems(localRecommendations),
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

function buildSystemPrompt() {
  return [
    "Voce e um especialista brasileiro em presentes com foco em conversao, curadoria e conexao emocional.",
    "Sugira presentes reais que uma pessoa conseguiria procurar em lojas online no Brasil.",
    "Antes de gerar a lista, calcule a quantidade EXATA de itens pelas regras:",
    "- gostos especificos com 3 ou mais palavras e orcamento acima de R$200: 7 itens.",
    "- gostos especificos com 3 ou mais palavras e orcamento ate R$200 ou nao informado: 5 itens.",
    "- gostos vagos com menos de 3 palavras: 5 itens.",
    "- gostos nao informados, vazios ou apenas espacos: 4 itens.",
    "Diversidade obrigatoria: no maximo 2 itens da mesma categoria ou categoria similar. Se o usuario mencionar cafe, inclua no maximo 2 itens relacionados a cafe; os demais devem ser categorias distintas conectadas ao perfil.",
    "Hierarquia obrigatoria: o item 1 deve ter destaque true e ser o mais criativo e certeiro, nao o mais obvio. Exatamente 1 item deve ter coringa true: uma experiencia, servico ou presente inusitado dentro do orcamento. Os demais devem vir em relevancia decrescente.",
    "O campo reason deve ser um motivo emocional que conecta com a pessoa, nao uma descricao do produto. Exemplo ruim: kit completo com 3 tipos de grao especial. Exemplo bom: porque ela vai lembrar de voce toda manha.",
    "Responda APENAS com JSON valido, sem texto antes ou depois, sem markdown e sem backticks.",
    "Formato obrigatorio: { \"total\": numero, \"recommendations\": [{ \"title\": string, \"description\": string, \"reason\": string, \"priceRange\": string, \"searchQuery\": string, \"categories\": string[], \"destaque\": boolean, \"coringa\": boolean }] }."
  ].join(" ");
}

function buildDynamicRecommendations(
  items: OpenAIRecommendation[],
  input: RecommendationInput,
  desiredCount: number
): Recommendation[] {
  const usedIds = new Set<string>();
  const categoryCounts = new Map<string, number>();
  let hasCoringa = false;

  return items
    .map(normalizeOpenAIRecommendation)
    .filter((item) => {
      if (
        !item.title ||
        !item.description ||
        !item.reason ||
        !item.priceRange ||
        !item.searchQuery
      ) {
        return false;
      }

      const category = normalizeCategory(item.categories[0] ?? item.categoria ?? "");
      const count = categoryCounts.get(category) ?? 0;

      if (category && count >= 2) {
        return false;
      }

      if (category) {
        categoryCounts.set(category, count + 1);
      }

      return true;
    })
    .slice(0, desiredCount)
    .map((item, index) => {
      const baseId = slugifyRecommendation(item.title) || `sugestao-${index + 1}`;
      const id = usedIds.has(baseId) ? `${baseId}-${index + 1}` : baseId;
      usedIds.add(id);
      const coringa =
        !hasCoringa &&
        (item.coringa === true || index === Math.min(2, desiredCount - 1));
      hasCoringa = hasCoringa || coringa;
      const categories = item.categories.filter(Boolean).slice(0, 3);

      return {
        id,
        title: item.title.trim(),
        description: item.description.trim(),
        reason: item.reason.trim(),
        priceRange: item.priceRange.trim(),
        amazonUrl: buildAmazonSearchUrl(item.searchQuery.trim()),
        image: imageForRecommendation(item, input),
        categories: categories.length
          ? categories
          : [input.style, input.occasion].filter(Boolean).slice(0, 2),
        personas: [input.recipient],
        occasions: [input.occasion],
        interests: [input.interests || input.style],
        score: 100 - index,
        destaque: index === 0,
        coringa
      };
    });
}

function normalizeOpenAIRecommendation(item: OpenAIRecommendation) {
  const category = item.categoria?.trim();

  return {
    title: item.title ?? item.titulo ?? "",
    description: item.description ?? item.descricao ?? "",
    reason: item.reason ?? item.motivo ?? "",
    priceRange: item.priceRange ?? item.precoEstimado ?? "",
    searchQuery: item.searchQuery ?? item.buscaAmazon ?? item.title ?? item.titulo ?? "",
    categories: item.categories?.filter(Boolean) ?? (category ? [category] : []),
    categoria: item.categoria,
    destaque: item.destaque,
    coringa: item.coringa
  };
}

function normalizeCategory(category: string) {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function toStructuredItems(recommendations: Recommendation[]) {
  return recommendations.map((item, index) => ({
    id: index + 1,
    titulo: item.title,
    categoria: item.categories[0] ?? "presente",
    motivo: item.reason,
    precoEstimado: item.priceRange,
    destaque: item.destaque === true,
    coringa: item.coringa === true
  }));
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
