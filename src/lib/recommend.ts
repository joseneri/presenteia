import { products, type Product } from "@/data/products";

export type RecommendationInput = {
  recipient: string;
  occasion: string;
  budget: string;
  interests: string;
  style: string;
};

export type Recommendation = Product & {
  reason: string;
  score: number;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function recommendProducts(input: RecommendationInput): Recommendation[] {
  const haystack = normalize(
    [
      input.recipient,
      input.occasion,
      input.budget,
      input.interests,
      input.style
    ].join(" ")
  );

  return products
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
      );

      return {
        ...product,
        score,
        reason: buildReason(product, input)
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

function buildReason(product: Product, input: RecommendationInput) {
  const interest = input.interests || "os interesses da pessoa";
  return `Combina com ${interest} e tem perfil ${product.categories.slice(0, 2).join(" + ")}.`;
}
