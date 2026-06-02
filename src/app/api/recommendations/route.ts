import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getGiftImage, getProductImage } from "@/lib/imageRepository";
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

const defaultOpenAITimeoutMs = 35000;
const missingApiKeyFallbackEnabled =
  process.env.OPENAI_FALLBACK_ENABLED === "true";
const openAITimeoutMs = getOpenAITimeoutMs();
let openAIClient: OpenAI | null = null;
let openAIClientApiKey: string | undefined;

export async function POST(request: Request) {
  const debugId = crypto.randomUUID();
  const input = (await request.json()) as RecommendationInput;
  const localRecommendations = recommendProducts(input);
  const desiredCount = getRecommendationCount(input);
  const candidateCount = desiredCount + 4;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  console.info("[recommendations] request_received", {
    debugId,
    model,
    fallbackEnabled: missingApiKeyFallbackEnabled,
    mode: "openai-freeform",
    openAITimeoutMs,
    recipient: input.recipient,
    ageGroup: input.ageGroup,
    occasion: input.occasion,
    budget: input.budget,
    style: input.style,
    interests: input.interests || null,
    desiredCount,
    candidateCount
  });

  if (!process.env.OPENAI_API_KEY) {
    console.error("[recommendations] missing_openai_api_key", { debugId });

    if (missingApiKeyFallbackEnabled) {
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
    const client = getOpenAIClient(process.env.OPENAI_API_KEY);

    const response = await client.chat.completions.create(
      {
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
              desiredCount,
              candidateCount,
              task:
                "Crie uma lista de candidatos de presentes livres, sem usar catalogo fixo. Respeite os parametros preenchidos pelo usuario: pessoa, orcamento, estilo, idade, gostos e ocasiao quando informada. A quantidade final desejada e desiredCount, mas retorne candidateCount candidatos diversos para o servidor selecionar os melhores. Para cada item, informe title, description, reason, priceRange, searchQuery, categories, destaque e coringa. searchQuery deve ser curta e boa para buscar na Amazon Brasil, sem marca inventada e sem preco. Retorne exatamente { total, recommendations: [{ title, description, reason, priceRange, searchQuery, categories, destaque, coringa }] }."
            })
          }
        ],
        max_tokens: 2200,
        response_format: { type: "json_object" }
      },
      {
        maxRetries: 1,
        signal: AbortSignal.timeout(openAITimeoutMs),
        timeout: openAITimeoutMs
      }
    );

    const content = response.choices[0]?.message?.content;
    const parsed = (content
      ? JSON.parse(content)
      : {}) as OpenAIRecommendationPayload;
    const recommendations = buildDynamicRecommendations(
      parsed.recommendations ?? parsed.itens ?? [],
      input,
      desiredCount,
      localRecommendations
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
      fallbackEnabled: missingApiKeyFallbackEnabled,
      error: message
    });

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
      mode: "openai-fallback",
      debugId
    });
  }
}

function getOpenAIClient(apiKey: string) {
  if (!openAIClient || openAIClientApiKey !== apiKey) {
    openAIClient = new OpenAI({ apiKey });
    openAIClientApiKey = apiKey;
  }

  return openAIClient;
}

function getOpenAITimeoutMs() {
  const timeoutMs = Number(
    process.env.OPENAI_TIMEOUT_MS ?? defaultOpenAITimeoutMs
  );

  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    return defaultOpenAITimeoutMs;
  }

  return Math.trunc(timeoutMs);
}

function buildSystemPrompt() {
  return [
    "Voce e um especialista brasileiro em presentes com foco em conversao, curadoria e conexao emocional.",
    "Sugira presentes reais que uma pessoa conseguiria procurar em lojas online no Brasil.",
    "A quantidade final de itens e calculada pelo servidor e deve ser respeitada: sempre entregue desiredCount itens finais, normalmente 8.",
    "Use pelo menos 4 parametros preenchidos pelo usuario quando existirem. Priorize pessoa, orcamento, estilo, idade e gostos; use ocasiao apenas quando ela vier informada. Nao invente uma ocasiao quando o campo estiver vazio.",
    "Quando o usuario mencionar um tema forte, gere candidatos conectados a ele, mas nao faca a lista inteira do mesmo tema. Diversidade obrigatoria: no maximo 2 itens da mesma categoria ou categoria similar e no maximo 2 itens do mesmo macrotema. Se o usuario mencionar cafe, inclua no maximo 2 itens relacionados diretamente a cafe; os demais devem ser alternativas distintas conectadas ao perfil, como leitura, cozinha, casa, bem-estar, trabalho, experiencia ou tecnologia.",
    "Hierarquia obrigatoria: o item 1 deve ter destaque true e ser o mais criativo e certeiro, nao o mais obvio. Exatamente 1 item deve ter coringa true: uma experiencia, servico ou presente inusitado dentro do orcamento. Os demais devem vir em relevancia decrescente.",
    "O campo reason deve ser um motivo emocional que conecta com a pessoa, nao uma descricao do produto. Exemplo ruim: kit completo com 3 tipos de grao especial. Exemplo bom: porque ela vai lembrar de voce toda manha.",
    "Responda APENAS com JSON valido, sem texto antes ou depois, sem markdown e sem backticks.",
    "Formato obrigatorio: { \"total\": numero, \"recommendations\": [{ \"title\": string, \"description\": string, \"reason\": string, \"priceRange\": string, \"searchQuery\": string, \"categories\": string[], \"destaque\": boolean, \"coringa\": boolean }] }."
  ].join(" ");
}

function buildDynamicRecommendations(
  items: OpenAIRecommendation[],
  input: RecommendationInput,
  desiredCount: number,
  localRecommendations: Recommendation[]
): Recommendation[] {
  const usedIds = new Set<string>();
  const usedImages = new Set<string>();
  const diversityState = createDiversityState();
  let hasCoringa = false;

  const dynamicRecommendations = items
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

      if (!canUseRecommendation(item, diversityState)) {
        return false;
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
      const image = getGiftImage({
        id,
        title: item.title,
        description: item.description,
        searchQuery: item.searchQuery,
        categories,
        recipient: input.recipient,
        ageGroup: input.ageGroup,
        occasion: input.occasion,
        style: input.style,
        interests: [input.interests],
        usedImages: [...usedImages]
      });

      usedImages.add(image);

      return {
        id,
        title: item.title.trim(),
        description: item.description.trim(),
        reason: item.reason.trim(),
        priceRange: item.priceRange.trim(),
        amazonUrl: buildAmazonSearchUrl(item.searchQuery.trim()),
        image,
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

  if (dynamicRecommendations.length >= desiredCount) {
    return normalizeRecommendationFlags(
      dynamicRecommendations.slice(0, desiredCount)
    );
  }

  const completedRecommendations = [...dynamicRecommendations];

  for (const recommendation of localRecommendations) {
    if (completedRecommendations.length >= desiredCount) {
      break;
    }

    if (usedIds.has(recommendation.id)) {
      continue;
    }

    if (!canUseRecommendation(recommendation, diversityState)) {
      continue;
    }

    usedIds.add(recommendation.id);
    const image = getProductImage({
      ...recommendation,
      fallback: recommendation.image,
      usedImages: [...usedImages]
    });
    usedImages.add(image);
    completedRecommendations.push({
      ...recommendation,
      image,
      destaque: false,
      coringa: false
    });
  }

  for (const recommendation of localRecommendations) {
    if (completedRecommendations.length >= desiredCount) {
      break;
    }

    if (usedIds.has(recommendation.id)) {
      continue;
    }

    if (
      !canUseRecommendation(recommendation, diversityState, {
        relaxCategoryLimit: true,
        relaxTopicLimit: true
      })
    ) {
      continue;
    }

    usedIds.add(recommendation.id);
    const image = getProductImage({
      ...recommendation,
      fallback: recommendation.image,
      usedImages: [...usedImages]
    });
    usedImages.add(image);
    completedRecommendations.push({
      ...recommendation,
      image,
      destaque: false,
      coringa: false
    });
  }

  return normalizeRecommendationFlags(
    completedRecommendations.slice(0, desiredCount)
  );
}

type DiversityCandidate = {
  title?: string;
  description?: string;
  searchQuery?: string;
  categories?: string[];
  categoria?: string;
};

type DiversityState = {
  categoryCounts: Map<string, number>;
  topicCounts: Map<string, number>;
};

function createDiversityState(): DiversityState {
  return {
    categoryCounts: new Map<string, number>(),
    topicCounts: new Map<string, number>()
  };
}

function canUseRecommendation(
  candidate: DiversityCandidate,
  state: DiversityState,
  options: {
    relaxCategoryLimit?: boolean;
    relaxTopicLimit?: boolean;
  } = {}
) {
  const category = normalizeCategory(
    candidate.categories?.[0] ?? candidate.categoria ?? ""
  );
  const topic = getRecommendationTopic(candidate);
  const categoryCount = state.categoryCounts.get(category) ?? 0;
  const topicCount = state.topicCounts.get(topic) ?? 0;
  const categoryLimit = options.relaxCategoryLimit ? 3 : 2;
  const topicLimit =
    options.relaxTopicLimit && topic !== "cafe" ? 4 : getTopicLimit(topic);

  if (category && categoryCount >= categoryLimit) {
    return false;
  }

  if (topic && topicCount >= topicLimit) {
    return false;
  }

  if (category) {
    state.categoryCounts.set(category, categoryCount + 1);
  }

  if (topic) {
    state.topicCounts.set(topic, topicCount + 1);
  }

  return true;
}

function getTopicLimit(topic: string) {
  return topic === "cafe" ? 2 : 3;
}

function getRecommendationTopic(candidate: DiversityCandidate) {
  const text = normalizeCategory(
    [
      candidate.title,
      candidate.description,
      candidate.searchQuery,
      candidate.categories?.join(" "),
      candidate.categoria
    ]
      .filter(Boolean)
      .join(" ")
  );

  const topicGroups = [
    {
      topic: "cafe",
      terms: ["cafe", "cafeteira", "moka", "espresso", "grao", "caneca"]
    },
    {
      topic: "cozinha",
      terms: ["cozinha", "culinaria", "gastronomia", "receita", "tempero", "cha"]
    },
    {
      topic: "leitura",
      terms: ["livro", "leitura", "kindle", "biblioteca"]
    },
    {
      topic: "tecnologia",
      terms: ["tecnologia", "fone", "gadget", "alexa", "tablet", "setup"]
    },
    {
      topic: "beleza",
      terms: ["beleza", "skincare", "autocuidado", "spa"]
    },
    {
      topic: "crianca",
      terms: ["crianca", "bebe", "brinquedo", "educativo", "pelucia"]
    },
    {
      topic: "casa",
      terms: ["casa", "decoracao", "luminaria", "porta retrato"]
    },
    {
      topic: "trabalho",
      terms: ["trabalho", "escritorio", "planner", "agenda", "produtividade"]
    },
    {
      topic: "experiencia",
      terms: ["experiencia", "oficina", "aula", "curso", "degustacao"]
    }
  ];

  return (
    topicGroups.find((group) =>
      group.terms.some((term) => text.includes(term))
    )?.topic ?? ""
  );
}

function normalizeRecommendationFlags(recommendations: Recommendation[]) {
  const coringaIndex = Math.min(2, recommendations.length - 1);

  return recommendations.map((recommendation, index) => ({
    ...recommendation,
    destaque: index === 0,
    coringa: index === coringaIndex
  }));
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
