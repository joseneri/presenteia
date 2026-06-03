import OpenAI from "openai";
import { NextResponse } from "next/server";
import { generateRecommendationCacheKey } from "@/lib/cacheKey";
import { getMarketTrendContext } from "@/lib/marketTrends";
import { getSemanticGiftImage } from "@/lib/semanticImageSearch";
import {
  buildAmazonSearchUrl,
  getRecommendationCount,
  recommendProducts,
  slugifyRecommendation,
  type Recommendation,
  type RecommendationInput
} from "@/lib/recommend";
import { getRedis } from "@/lib/redis";
import {
  findBestVisualAnchor,
  getVisualAnchor,
  getVisualCatalogForPrompt,
  type VisualGiftAnchor
} from "@/lib/visualCatalog";

export const runtime = "nodejs";

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
  visualAnchorId?: string;
  imageAnchorId?: string;
  anchorId?: string;
  destaque?: boolean;
  coringa?: boolean;
};

type OpenAIRecommendationPayload = {
  recommendations?: OpenAIRecommendation[];
  itens?: OpenAIRecommendation[];
  total?: number;
};

type RecommendationResponsePayload = {
  recommendations: Recommendation[];
  total: number;
  itens: ReturnType<typeof toStructuredItems>;
  source: string;
  mode?: string;
};

type MemoryCacheEntry = {
  payload: RecommendationResponsePayload;
  expiresAt: number;
};

const defaultOpenAITimeoutMs = 35000;
const cacheTtlSeconds = 60 * 60 * 24 * 7;
const cacheTtlMs = cacheTtlSeconds * 1000;
const missingApiKeyFallbackEnabled =
  process.env.OPENAI_FALLBACK_ENABLED === "true";
const openAITimeoutMs = getOpenAITimeoutMs();
let openAIClient: OpenAI | null = null;
let openAIClientApiKey: string | undefined;
const redis = getRedis();
const memoryCache = new Map<string, MemoryCacheEntry>();

export async function POST(request: Request) {
  const debugId = crypto.randomUUID();
  const input = (await request.json()) as RecommendationInput;
  const cacheKey = generateRecommendationCacheKey(input);
  const localRecommendations = recommendProducts(input);
  const desiredCount = getRecommendationCount(input);
  const candidateCount = desiredCount + 4;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const marketTrendContext = getMarketTrendContext();

  console.info("[recommendations] request_received", {
    debugId,
    model,
    fallbackEnabled: missingApiKeyFallbackEnabled,
    mode: "openai-visual-anchored",
    openAITimeoutMs,
    recipient: input.recipient,
    ageGroup: input.ageGroup,
    occasion: input.occasion,
    budget: input.budget,
    style: input.style,
    interests: input.interests || null,
    desiredCount,
    candidateCount,
    marketTrendInfluence: marketTrendContext.influence,
    marketTrendCategory: marketTrendContext.category
  });

  const cachedPayload = await getCachedRecommendations(cacheKey, debugId);

  if (cachedPayload) {
    console.info("[recommendations] cache_hit", {
      debugId,
      source: cachedPayload.source,
      recommendationCount: cachedPayload.recommendations.length
    });

    return NextResponse.json({
      ...cachedPayload,
      debugId,
      fromCache: true
    });
  }

  console.info("[recommendations] cache_miss", { debugId });

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
        debugId,
        fromCache: false
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
              marketTrendContext,
              visualCatalog: getVisualCatalogForPrompt(),
              task:
                "Crie uma lista de candidatos de presentes usando somente o visualCatalog. Cada recomendacao deve escolher exatamente um visualAnchorId existente no catalogo; nao invente ids. Respeite pessoa, orcamento, estilo, idade, gostos e ocasiao quando informada. Use marketTrendContext como sinal de mercado: influence 0 ignora tendencias, 1 favorece fortemente produtos da lista; category limita o recorte de tendencias quando diferente de all. Tendencias nao devem vencer adequacao ao perfil. A quantidade final desejada e desiredCount, mas retorne candidateCount candidatos diversos para o servidor selecionar os melhores. Para cada item, informe title, description, reason, priceRange, searchQuery, categories, visualAnchorId, destaque e coringa. searchQuery deve ser curta, sem marca inventada e alinhada ao visualAnchorId escolhido. Retorne exatamente { total, recommendations: [{ title, description, reason, priceRange, searchQuery, categories, visualAnchorId, destaque, coringa }] }."
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
    const recommendations = await buildDynamicRecommendations(
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
      mode: "openai-visual-anchored",
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

    const payload = {
      recommendations,
      total: recommendations.length,
      itens: toStructuredItems(recommendations),
      source: "openai",
      mode: "openai-visual-anchored"
    };

    await setCachedRecommendations(cacheKey, payload, debugId);

    return NextResponse.json({
      ...payload,
      debugId,
      fromCache: false
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
      debugId,
      fromCache: false
    });
  }
}

async function getCachedRecommendations(cacheKey: string, debugId: string) {
  const memoryPayload = getMemoryCachedRecommendations(cacheKey);

  if (memoryPayload) {
    console.info("[recommendations] memory_cache_hit", { debugId });
    return memoryPayload;
  }

  if (!redis) {
    return null;
  }

  try {
    const cached = await redis.get<string>(cacheKey);

    if (!cached) {
      return null;
    }

    const payload = JSON.parse(cached) as RecommendationResponsePayload;
    setMemoryCachedRecommendations(cacheKey, payload);

    return payload;
  } catch (error) {
    console.error("[recommendations] redis_get_error", {
      debugId,
      error: error instanceof Error ? error.message : "Unknown error"
    });
    return null;
  }
}

async function setCachedRecommendations(
  cacheKey: string,
  payload: RecommendationResponsePayload,
  debugId: string
) {
  setMemoryCachedRecommendations(cacheKey, payload);

  if (!redis) {
    return;
  }

  try {
    await redis.setex(cacheKey, cacheTtlSeconds, JSON.stringify(payload));
    console.info("[recommendations] cache_saved", {
      debugId,
      ttlSeconds: cacheTtlSeconds,
      recommendationCount: payload.recommendations.length
    });
  } catch (error) {
    console.error("[recommendations] redis_set_error", {
      debugId,
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

function getMemoryCachedRecommendations(cacheKey: string) {
  const cached = memoryCache.get(cacheKey);

  if (!cached) {
    return null;
  }

  if (Date.now() > cached.expiresAt) {
    memoryCache.delete(cacheKey);
    return null;
  }

  return cached.payload;
}

function setMemoryCachedRecommendations(
  cacheKey: string,
  payload: RecommendationResponsePayload
) {
  memoryCache.set(cacheKey, {
    payload,
    expiresAt: Date.now() + cacheTtlMs
  });
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
    "Toda recomendacao precisa estar presa a uma imagem confiavel: use somente ids existentes no visualCatalog recebido pelo usuario.",
    "Use o marketTrendContext recebido como memoria de mercado. Ele contem produtos/categorias populares e um campo influence de 0 a 1. Com influence baixo, use apenas como desempate. Com influence medio, favoreca tendencias quando tambem combinarem com o perfil. Com influence alto, priorize itens da lista, mantendo diversidade e adequacao emocional.",
    "Se marketTrendContext.category for diferente de all, trate esse recorte como preferencia de categoria, mas nunca recomende algo claramente inadequado para pessoa, idade, ocasiao ou orcamento.",
    "O visualAnchorId e uma restricao obrigatoria, nao uma sugestao. Se uma ideia nao couber em nenhum visualAnchorId, escolha outra ideia.",
    "A quantidade final de itens e calculada pelo servidor e deve ser respeitada: sempre entregue desiredCount itens finais, normalmente 6.",
    "Use pelo menos 4 parametros preenchidos pelo usuario quando existirem. Priorize pessoa, orcamento, estilo, idade e gostos; use ocasiao apenas quando ela vier informada. Nao invente uma ocasiao quando o campo estiver vazio.",
    "Quando o usuario mencionar um tema forte, gere candidatos conectados a ele, mas nao faca a lista inteira do mesmo tema. Diversidade obrigatoria: no maximo 2 itens da mesma categoria ou categoria similar e no maximo 2 itens do mesmo macrotema. Se o usuario mencionar cafe, inclua no maximo 2 itens relacionados diretamente a cafe; os demais devem ser alternativas distintas conectadas ao perfil, como leitura, cozinha, casa, bem-estar, trabalho, experiencia ou tecnologia.",
    "Hierarquia obrigatoria: o item 1 deve ter destaque true e ser o mais criativo e certeiro, nao o mais obvio. Exatamente 1 item deve ter coringa true: uma experiencia, servico ou presente inusitado dentro do orcamento. Os demais devem vir em relevancia decrescente.",
    "O campo reason deve ser um motivo emocional que conecta com a pessoa, nao uma descricao do produto. Exemplo ruim: kit completo com 3 tipos de grao especial. Exemplo bom: porque ela vai lembrar de voce toda manha.",
    "Responda APENAS com JSON valido, sem texto antes ou depois, sem markdown e sem backticks.",
    "Formato obrigatorio: { \"total\": numero, \"recommendations\": [{ \"title\": string, \"description\": string, \"reason\": string, \"priceRange\": string, \"searchQuery\": string, \"categories\": string[], \"visualAnchorId\": string, \"destaque\": boolean, \"coringa\": boolean }] }."
  ].join(" ");
}

async function buildDynamicRecommendations(
  items: OpenAIRecommendation[],
  input: RecommendationInput,
  desiredCount: number,
  localRecommendations: Recommendation[]
): Promise<Recommendation[]> {
  const usedIds = new Set<string>();
  const usedImages = new Set<string>();
  const diversityState = createDiversityState();
  let hasCoringa = false;

  const normalizedDynamicItems = items
    .map(normalizeOpenAIRecommendation)
    .map((item) => ({
      ...item,
      visualAnchor:
        getVisualAnchor(item.visualAnchorId) ?? findBestVisualAnchor(item)
    }))
    .filter((item) => {
      if (
        !item.title ||
        !item.description ||
        !item.reason ||
        !item.priceRange ||
        !item.searchQuery ||
        !item.visualAnchor
      ) {
        return false;
      }

      if (!canUseRecommendation(item, diversityState)) {
        return false;
      }

      return true;
    })
    .slice(0, desiredCount);

  const dynamicRecommendations: Recommendation[] = [];

  for (const [index, item] of normalizedDynamicItems.entries()) {
    const visualAnchor = item.visualAnchor as VisualGiftAnchor;
    const baseId =
      slugifyRecommendation(visualAnchor.id) ||
      slugifyRecommendation(item.title) ||
      `sugestao-${index + 1}`;
    const id = usedIds.has(baseId) ? `${baseId}-${index + 1}` : baseId;
    usedIds.add(id);
    const coringa: boolean =
      !hasCoringa &&
      (item.coringa === true || index === Math.min(2, desiredCount - 1));
    hasCoringa = hasCoringa || coringa;
    const categories = visualAnchor.categories.slice(0, 3);
    const image = await getSemanticGiftImage({
      id,
      title: visualAnchor.label,
      description: visualAnchor.description,
      searchQuery: visualAnchor.searchQuery,
      categories,
      recipient: input.recipient,
      ageGroup: input.ageGroup,
      occasion: input.occasion,
      style: input.style,
      interests: [input.interests, item.title, item.searchQuery],
      usedImages: [...usedImages]
    });

    usedImages.add(image);

    dynamicRecommendations.push({
      id,
      title: item.title.trim(),
      description: item.description.trim(),
      reason: item.reason.trim(),
      priceRange: item.priceRange.trim(),
      amazonUrl: buildAmazonSearchUrl(visualAnchor.searchQuery),
      image,
      categories,
      personas: [input.recipient],
      occasions: [input.occasion],
      interests: [input.interests || input.style, visualAnchor.label],
      score: 100 - index,
      destaque: index === 0,
      coringa
    });
  }

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
    const image = await getSemanticGiftImage({
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
    const image = await getSemanticGiftImage({
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
  visualAnchor?: VisualGiftAnchor;
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
    candidate.visualAnchor?.categories[0] ??
      candidate.categories?.[0] ??
      candidate.categoria ??
      ""
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
      candidate.visualAnchor?.label,
      candidate.visualAnchor?.id,
      candidate.visualAnchor?.terms.join(" "),
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
    visualAnchorId: item.visualAnchorId ?? item.imageAnchorId ?? item.anchorId,
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
