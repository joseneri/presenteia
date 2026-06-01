import { NextResponse } from "next/server";
import { recommendProducts, type RecommendationInput } from "@/lib/recommend";

export async function POST(request: Request) {
  const input = (await request.json()) as RecommendationInput;
  const recommendations = recommendProducts(input);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ recommendations, source: "local" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Voce ajuda a explicar recomendacoes de presentes em portugues do Brasil. Responda somente JSON valido."
          },
          {
            role: "user",
            content: JSON.stringify({
              input,
              products: recommendations.map((product) => ({
                id: product.id,
                title: product.title,
                description: product.description,
                categories: product.categories
              })),
              task:
                "Crie um motivo curto, especifico e honesto para cada produto. Retorne { reasons: [{ id, reason }] }."
            })
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      return NextResponse.json({ recommendations, source: "local-fallback" });
    }

    const payload = await response.json();
    const content = payload.choices?.[0]?.message?.content;
    const parsed = content ? JSON.parse(content) : { reasons: [] };
    const reasonMap = new Map<string, string>(
      parsed.reasons?.map((item: { id: string; reason: string }) => [
        item.id,
        item.reason
      ]) ?? []
    );

    return NextResponse.json({
      recommendations: recommendations.map((product) => ({
        ...product,
        reason: reasonMap.get(product.id) ?? product.reason
      })),
      source: "openai"
    });
  } catch {
    return NextResponse.json({ recommendations, source: "local-fallback" });
  }
}
