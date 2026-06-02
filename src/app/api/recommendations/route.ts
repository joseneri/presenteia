import OpenAI from "openai";
import { NextResponse } from "next/server";
import { recommendProducts, type RecommendationInput } from "@/lib/recommend";

type OpenAIReason = {
  id: string;
  reason: string;
};

type OpenAIReasonPayload = {
  reasons?: OpenAIReason[];
};

const fallbackEnabled = process.env.OPENAI_FALLBACK_ENABLED === "true";

export async function POST(request: Request) {
  const debugId = crypto.randomUUID();
  const input = (await request.json()) as RecommendationInput;
  const recommendations = recommendProducts(input);
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  console.info("[recommendations] request_received", {
    debugId,
    model,
    fallbackEnabled,
    recipient: input.recipient,
    ageGroup: input.ageGroup,
    occasion: input.occasion,
    budget: input.budget,
    style: input.style,
    hasInterests: Boolean(input.interests)
  });

  if (!process.env.OPENAI_API_KEY) {
    console.error("[recommendations] missing_openai_api_key", { debugId });

    if (fallbackEnabled) {
      console.info("[recommendations] returning_local_fallback", {
        debugId,
        reason: "missing_api_key",
        count: recommendations.length
      });
      return NextResponse.json({ recommendations, source: "local", debugId });
    }

    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY nao configurada no servidor de producao.",
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
            "Voce ajuda a explicar recomendacoes de presentes em portugues do Brasil. Responda somente JSON valido, sem markdown."
        },
        {
          role: "user",
          content: JSON.stringify({
            input,
            products: recommendations.map((product) => ({
              id: product.id,
              title: product.title,
              description: product.description,
              categories: product.categories,
              priceRange: product.priceRange
            })),
            task:
              "Crie um motivo curto, especifico e honesto para cada produto, respeitando o orcamento e os gostos informados. Retorne { reasons: [{ id, reason }] }."
          })
        }
      ],
      max_tokens: 700,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    const parsed = (content ? JSON.parse(content) : {}) as OpenAIReasonPayload;
    const reasonMap = new Map<string, string>(
      parsed.reasons?.map((item) => [item.id, item.reason]) ?? []
    );
    const enrichedRecommendations = recommendations.map((product) => ({
      ...product,
      reason: reasonMap.get(product.id) ?? product.reason
    }));

    console.info("[recommendations] openai_success", {
      debugId,
      model,
      responseId: response.id,
      finishReason: response.choices[0]?.finish_reason,
      reasonCount: reasonMap.size,
      recommendationCount: enrichedRecommendations.length,
      usage: response.usage
    });

    return NextResponse.json({
      recommendations: enrichedRecommendations,
      source: "openai",
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
        count: recommendations.length
      });
      return NextResponse.json({
        recommendations,
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
