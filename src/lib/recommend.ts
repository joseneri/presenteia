import { products, type Product } from "@/data/products";

export type RecommendationInput = {
  recipient: string;
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

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function recommendProducts(input: RecommendationInput): Recommendation[] {
  const desiredCount = getRecommendationCount(input);
  const haystack = normalize(
    [
      input.recipient,
      input.ageGroup,
      input.occasion,
      input.budget,
      input.interests,
      input.style
    ].join(" ")
  );

  const rankedProducts = products
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
  const interestWordCount = input.interests.trim().split(/\s+/).filter(Boolean).length;

  if (interestWordCount === 0) {
    return 4;
  }

  if (interestWordCount < 3) {
    return 5;
  }

  return budgetAboveTwoHundred(input.budget) ? 7 : 5;
}

function buildReason(product: Product, input: RecommendationInput) {
  const interest = input.interests || "os interesses da pessoa";
  return `Combina com ${interest} e tem perfil ${product.categories.slice(0, 2).join(" + ")}.`;
}

function limitCategoryRepetition(
  recommendations: Recommendation[],
  desiredCount: number
) {
  const categoryCounts = new Map<string, number>();
  const selected: Recommendation[] = [];

  for (const recommendation of recommendations) {
    const category = normalize(recommendation.categories[0] ?? "");
    const count = categoryCounts.get(category) ?? 0;

    if (category && count >= 2) {
      continue;
    }

    selected.push(recommendation);

    if (category) {
      categoryCounts.set(category, count + 1);
    }

    if (selected.length === desiredCount) {
      return selected;
    }
  }

  return selected;
}

function budgetScore(product: Product, budget: string) {
  const normalizedBudget = normalize(budget);

  if (!normalizedBudget.includes("ate")) {
    return 0;
  }

  const budgetLimit = Number(normalizedBudget.match(/\d+/)?.[0] ?? 0);
  const prices = product.priceRange.match(/\d+/g)?.map(Number) ?? [];
  const minPrice = Math.min(...prices);

  if (!budgetLimit || !Number.isFinite(minPrice)) {
    return 0;
  }

  return minPrice <= budgetLimit ? 1 : -2;
}

function budgetAboveTwoHundred(budget: string) {
  const normalizedBudget = normalize(budget);
  const values = normalizedBudget.match(/\d+/g)?.map(Number) ?? [];
  const highestValue = Math.max(0, ...values);

  if (normalizedBudget.includes("acima")) {
    return highestValue >= 200;
  }

  return highestValue > 200;
}
