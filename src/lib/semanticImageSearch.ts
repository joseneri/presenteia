import OpenAI from "openai";
import { createHash } from "crypto";
import { getRedis } from "@/lib/redis";
import {
  getGiftImage,
  productImageRepository,
  popularSearchImageRepository,
  type SearchImage
} from "@/lib/imageRepository";

type SemanticGiftImageInput = {
  id?: string;
  title?: string;
  description?: string;
  searchQuery?: string;
  categories?: string[];
  personas?: string[];
  occasions?: string[];
  interests?: string[];
  recipient?: string;
  ageGroup?: string;
  occasion?: string;
  style?: string;
  fallback?: string;
  usedImages?: string[];
};

type VisualImageDocument = {
  id: string;
  image: string;
  priority: number;
  topic: string;
  text: string;
};

type VectorMatch = {
  document: VisualImageDocument;
  score: number;
};

const redis = getRedis();
const vectorDimensions = 384;
const openAIEmbeddingModel =
  process.env.OPENAI_IMAGE_EMBEDDING_MODEL ?? "text-embedding-3-small";
const providerMode = process.env.IMAGE_SEARCH_PROVIDER ?? "auto";
const cacheTtlSeconds = 60 * 60 * 24 * 30;

let openAIClient: OpenAI | null = null;
let openAIClientApiKey: string | undefined;
let openAIIndexPromise: Promise<Map<string, number[]>> | null = null;
let localIndex: Map<string, number[]> | null = null;
const memoryEmbeddingCache = new Map<string, number[]>();

export async function getSemanticGiftImage(input: SemanticGiftImageInput) {
  const exactProductImage = input.id ? productImageRepository[input.id] : undefined;

  if (exactProductImage && !input.usedImages?.includes(exactProductImage)) {
    return exactProductImage;
  }

  const query = buildImageQuery(input);

  if (!query) {
    return getGiftImage(input);
  }

  const matches = await searchVisualImages(query, input.usedImages ?? []);
  const bestMatch = matches[0];

  if (!bestMatch) {
    return getGiftImage(input);
  }

  return bestMatch.document.image;
}

export async function searchVisualImages(
  query: string,
  usedImages: string[] = [],
  limit = 8
) {
  const documents = getVisualImageDocuments();
  const provider = getProvider();
  const { queryVector, index } =
    provider === "openai"
      ? await getOpenAISearchState(query, documents)
      : getLocalSearchState(query, documents);
  const usedImageSet = new Set(usedImages);

  return documents
    .filter((document) => !usedImageSet.has(document.image))
    .map<VectorMatch>((document) => {
      const documentVector = index.get(document.id) ?? embedLocally(document.text);
      const semanticScore = cosineSimilarity(queryVector, documentVector);
      const priorityScore = Math.min(document.priority, 140) / 1000;

      return {
        document,
        score: semanticScore + priorityScore
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

async function getOpenAISearchState(query: string, documents: VisualImageDocument[]) {
  try {
    return {
      queryVector: await embedWithOpenAI(query),
      index: await getOpenAIIndex(documents)
    };
  } catch {
    openAIIndexPromise = null;
    return getLocalSearchState(query, documents);
  }
}

function getLocalSearchState(query: string, documents: VisualImageDocument[]) {
  return {
    queryVector: embedLocally(query),
    index: getLocalIndex(documents)
  };
}

function getProvider() {
  if (providerMode === "local") {
    return "local";
  }

  if (providerMode === "openai" && process.env.OPENAI_API_KEY) {
    return "openai";
  }

  if (providerMode === "openai") {
    return "local";
  }

  return process.env.OPENAI_API_KEY ? "openai" : "local";
}

function getVisualImageDocuments(): VisualImageDocument[] {
  const productDocuments = Object.entries(productImageRepository).map(
    ([id, image]) => ({
      id: `product-${id}`,
      image,
      priority: 180,
      topic: id,
      text: buildProductDocumentText(id)
    })
  );

  return [
    ...productDocuments,
    ...popularSearchImageRepository.map((entry) => ({
      id: entry.id,
      image: entry.image,
      priority: entry.priority,
      topic: entry.topic,
      text: buildDocumentText(entry)
    }))
  ];
}

function buildDocumentText(entry: SearchImage) {
  return [
    `imagem de ${entry.topic}`,
    `presente visual ${entry.topic}`,
    entry.terms.join(" "),
    expandVisualTerms(entry.terms.join(" "))
  ].join(" ");
}

function buildProductDocumentText(id: string) {
  const readableId = id.replace(/-/g, " ");

  return [
    `imagem de produto ${readableId}`,
    `foto principal de produto ${readableId}`,
    `presente compravel ${readableId}`,
    readableId,
    expandVisualTerms(readableId)
  ].join(" ");
}

function buildImageQuery(input: SemanticGiftImageInput) {
  return [
    input.title,
    input.description,
    input.searchQuery,
    input.categories?.join(" "),
    input.personas?.join(" "),
    input.occasions?.join(" "),
    input.interests?.join(" "),
    input.recipient,
    input.ageGroup,
    input.occasion,
    input.style
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
}

function getLocalIndex(documents: VisualImageDocument[]) {
  if (!localIndex) {
    localIndex = new Map(
      documents.map((document) => [document.id, embedLocally(document.text)])
    );
  }

  return localIndex;
}

async function getOpenAIIndex(documents: VisualImageDocument[]) {
  if (!openAIIndexPromise) {
    openAIIndexPromise = buildOpenAIIndex(documents);
  }

  return openAIIndexPromise;
}

async function buildOpenAIIndex(documents: VisualImageDocument[]) {
  const index = new Map<string, number[]>();
  const missingDocuments: VisualImageDocument[] = [];

  for (const document of documents) {
    const cached = await getCachedEmbedding(document.text);

    if (cached) {
      index.set(document.id, cached);
    } else {
      missingDocuments.push(document);
    }
  }

  if (missingDocuments.length === 0) {
    return index;
  }

  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: openAIEmbeddingModel,
    input: missingDocuments.map((document) => document.text)
  });

  await Promise.all(
    response.data.map(async (embedding, indexPosition) => {
      const document = missingDocuments[indexPosition];
      const vector = normalizeVector(embedding.embedding);

      index.set(document.id, vector);
      await setCachedEmbedding(document.text, vector);
    })
  );

  return index;
}

async function embedWithOpenAI(text: string) {
  const cached = await getCachedEmbedding(text);

  if (cached) {
    return cached;
  }

  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: openAIEmbeddingModel,
    input: text
  });
  const vector = normalizeVector(response.data[0].embedding);

  await setCachedEmbedding(text, vector);

  return vector;
}

async function getCachedEmbedding(text: string) {
  const key = getEmbeddingCacheKey(text);
  const memoryCached = memoryEmbeddingCache.get(key);

  if (memoryCached) {
    return memoryCached;
  }

  if (!redis) {
    return null;
  }

  try {
    const cached = await redis.get<string>(key);

    if (!cached) {
      return null;
    }

    const vector = JSON.parse(cached) as number[];
    memoryEmbeddingCache.set(key, vector);

    return vector;
  } catch {
    return null;
  }
}

async function setCachedEmbedding(text: string, vector: number[]) {
  const key = getEmbeddingCacheKey(text);

  memoryEmbeddingCache.set(key, vector);

  if (!redis) {
    return;
  }

  try {
    await redis.setex(key, cacheTtlSeconds, JSON.stringify(vector));
  } catch {
    // Embedding cache is an optimization; search still works without Redis.
  }
}

function getEmbeddingCacheKey(text: string) {
  const hash = createHash("sha256")
    .update(`${openAIEmbeddingModel}:${normalizeText(text)}`)
    .digest("hex");

  return `presenteia:image-embedding:v1:${hash}`;
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY nao configurada para busca vetorial.");
  }

  if (!openAIClient || openAIClientApiKey !== apiKey) {
    openAIClient = new OpenAI({ apiKey });
    openAIClientApiKey = apiKey;
  }

  return openAIClient;
}

function embedLocally(text: string) {
  const vector = new Array<number>(vectorDimensions).fill(0);
  const tokens = tokenize(`${text} ${expandVisualTerms(text)}`);

  for (const token of tokens) {
    const index = hashToken(token, vectorDimensions);
    vector[index] += 1;
  }

  for (let index = 0; index < tokens.length - 1; index += 1) {
    const bigram = `${tokens[index]} ${tokens[index + 1]}`;
    vector[hashToken(bigram, vectorDimensions)] += 1.5;
  }

  return normalizeVector(vector);
}

function expandVisualTerms(text: string) {
  const normalized = normalizeText(text);
  const expansions = semanticGroups
    .filter((group) => group.terms.some((term) => normalized.includes(term)))
    .flatMap((group) => group.terms);

  return expansions.join(" ");
}

function tokenize(text: string) {
  return normalizeText(text)
    .split(/\s+/)
    .filter((token) => token.length >= 2);
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hashToken(token: string, modulo: number) {
  let hash = 2166136261;

  for (let index = 0; index < token.length; index += 1) {
    hash ^= token.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) % modulo;
}

function normalizeVector(vector: number[]) {
  const length = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));

  if (!length) {
    return vector;
  }

  return vector.map((value) => value / length);
}

function cosineSimilarity(first: number[], second: number[]) {
  const length = Math.min(first.length, second.length);
  let score = 0;

  for (let index = 0; index < length; index += 1) {
    score += first[index] * second[index];
  }

  return score;
}

const semanticGroups = [
  {
    terms: ["cafe", "cafeteira", "moka", "espresso", "caneca", "xicara", "graos"]
  },
  {
    terms: ["livro", "livros", "leitura", "kindle", "biblioteca", "estudo"]
  },
  {
    terms: ["tecnologia", "gadget", "fone", "bluetooth", "alexa", "smart", "setup"]
  },
  {
    terms: ["beleza", "skincare", "autocuidado", "spa", "maquiagem", "perfume"]
  },
  {
    terms: ["casa", "decoracao", "luminaria", "vaso", "planta", "ambiente"]
  },
  {
    terms: ["cozinha", "gastronomia", "receita", "tempero", "jantar", "vinho"]
  },
  {
    terms: ["crianca", "bebe", "brinquedo", "educativo", "pelucia", "sensorial"]
  },
  {
    terms: ["jogo", "jogos", "tabuleiro", "quebra", "familia", "diversao"]
  },
  {
    terms: ["trabalho", "escritorio", "planner", "agenda", "produtividade"]
  },
  {
    terms: ["viagem", "mala", "mochila", "necessaire", "aventura", "praia"]
  },
  {
    terms: ["fitness", "academia", "treino", "esporte", "garrafa", "yoga"]
  },
  {
    terms: ["romantico", "casal", "namorada", "namorado", "flores", "memorias"]
  },
  {
    terms: ["experiencia", "oficina", "curso", "aula", "workshop", "assinatura"]
  }
];
