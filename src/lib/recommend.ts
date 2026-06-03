import { products, type Product } from "@/data/products";

export type RecommendationInput = {
  recipient: string;
  sex: string;
  ageGroup: string;
  occasion: string;
  budget: string;
  interests: string;
  style: string;
};

export type Recommendation = Product & {
  reason: string;
  score: number;
  destaque?: boolean;
  coringa?: boolean;
};

const affiliateTag = "presentesid09-20";

export function buildAmazonSearchUrl(query: string) {
  const search = new URLSearchParams({
    k: query,
    tag: affiliateTag
  });

  return `https://www.amazon.com.br/s?${search.toString()}`;
}

export function slugifyRecommendation(value: string) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const normalize = (value: string | undefined) =>
  (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function recommendProducts(input: RecommendationInput): Recommendation[] {
  const desiredCount = getRecommendationCount(input);
  const haystack = normalize(
    [
      ...buildRecipientTerms(input),
      input.ageGroup,
      input.occasion,
      input.budget,
      input.interests,
      input.style
    ].join(" ")
  );

  const rankedProducts = products
    .filter((product) =>
      isPriceRangeAllowedForBudget(product.priceRange, input.budget)
    )
    .map((product) => {
      const terms = [
        ...product.categories,
        ...product.personas,
        ...product.occasions,
        ...product.interests
      ].map(normalize);

      const score = terms.reduce(
        (sum, term) => sum + (haystack.includes(term) ? 2 : 0),
        0
      ) + budgetScore(product, input.budget);

      return {
        ...product,
        score,
        reason: buildReason(product, input)
      };
    })
    .sort((a, b) => b.score - a.score);

  return limitCategoryRepetition(rankedProducts, desiredCount)
    .slice(0, desiredCount)
    .map((product, index) => ({
      ...product,
      destaque: index === 0,
      coringa: index === Math.min(2, desiredCount - 1)
    }));
}

export function getRecommendationCount(input: RecommendationInput) {
  void input;
  return 6;
}

export function isPriceRangeAllowedForBudget(
  priceRange: string,
  budget: string
) {
  const constraint = getBudgetConstraint(budget);

  if (!constraint) {
    return true;
  }

  const prices = extractPriceValues(priceRange);

  if (prices.length === 0) {
    return false;
  }

  const maxPrice = Math.max(...prices);

  if (constraint.type === "above") {
    return maxPrice >= constraint.min;
  }

  return maxPrice <= constraint.max;
}

function buildReason(product: Product, input: RecommendationInput) {
  const interest = input.interests || "os interesses da pessoa";
  return `Combina com ${interest} e tem perfil ${product.categories.slice(0, 2).join(" + ")}.`;
}

function buildRecipientTerms(input: RecommendationInput) {
  const recipient = normalize(input.recipient);
  const sex = normalize(input.sex);
  const terms = [recipient, sex];

  const recipientMap: Record<string, { female: string[]; male: string[]; neutral: string[] }> = {
    "mae-pai": {
      female: ["mae"],
      male: ["pai"],
      neutral: ["mae", "pai", "familia"]
    },
    filho: {
      female: ["filha"],
      male: ["filho"],
      neutral: ["filho", "filha", "crianca"]
    },
    irmao: {
      female: ["irma"],
      male: ["irmao"],
      neutral: ["irma", "irmao", "familia"]
    },
    "namoro": {
      female: ["namorada"],
      male: ["namorado"],
      neutral: ["namorada", "namorado", "romantico"]
    },
    conjuge: {
      female: ["esposa"],
      male: ["marido"],
      neutral: ["esposa", "marido", "casal", "romantico"]
    },
    amigo: {
      female: ["amiga"],
      male: ["amigo"],
      neutral: ["amiga", "amigo"]
    },
    sogro: {
      female: ["sogra"],
      male: ["sogro"],
      neutral: ["sogra", "sogro", "familia"]
    }
  };
  const mappedRecipient = recipientMap[recipient];

  if (!mappedRecipient) {
    return terms;
  }

  if (sex === "feminino") {
    return [...terms, ...mappedRecipient.female, ...mappedRecipient.neutral];
  }

  if (sex === "masculino") {
    return [...terms, ...mappedRecipient.male, ...mappedRecipient.neutral];
  }

  return [...terms, ...mappedRecipient.neutral];
}

function limitCategoryRepetition(
  recommendations: Recommendation[],
  desiredCount: number
) {
  const categoryCounts = new Map<string, number>();
  const selected: Recommendation[] = [];
  const selectedIds = new Set<string>();

  for (const recommendation of recommendations) {
    const category = normalize(recommendation.categories[0] ?? "");
    const count = categoryCounts.get(category) ?? 0;

    if (category && count >= 2) {
      continue;
    }

    selected.push(recommendation);
    selectedIds.add(recommendation.id);

    if (category) {
      categoryCounts.set(category, count + 1);
    }

    if (selected.length === desiredCount) {
      return selected;
    }
  }

  for (const recommendation of recommendations) {
    if (selected.length === desiredCount) {
      return selected;
    }

    if (selectedIds.has(recommendation.id)) {
      continue;
    }

    const category = normalize(recommendation.categories[0] ?? "");
    const count = categoryCounts.get(category) ?? 0;

    if (category && count >= 3) {
      continue;
    }

    selected.push(recommendation);
    selectedIds.add(recommendation.id);

    if (category) {
      categoryCounts.set(category, count + 1);
    }
  }

  return selected;
}

function budgetScore(product: Product, budget: string) {
  const constraint = getBudgetConstraint(budget);
  const prices = extractPriceValues(product.priceRange);

  if (!constraint || prices.length === 0) {
    return 0;
  }

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (constraint.type === "above") {
    return maxPrice >= constraint.min ? 2 : -8;
  }

  if (maxPrice <= constraint.max) {
    return 3;
  }

  return minPrice <= constraint.max ? -4 : -8;
}

function getBudgetConstraint(budget: string) {
  const normalizedBudget = normalize(budget);
  const value = Number(normalizedBudget.match(/\d+/)?.[0] ?? 0);

  if (normalizedBudget.includes("varias") || !value) {
    return null;
  }

  if (normalizedBudget.includes("acima")) {
    return { type: "above" as const, min: value };
  }

  if (normalizedBudget.includes("ate")) {
    return { type: "max" as const, max: value };
  }

  return null;
}

function extractPriceValues(priceRange: string) {
  return priceRange.match(/\d+/g)?.map(Number).filter(Number.isFinite) ?? [];
}
