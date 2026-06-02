import { createHash } from "crypto";
import type { RecommendationInput } from "@/lib/recommend";

const cacheKeyPrefix = "presenteia:recommendations:v3:";

function normalizeDropdown(value: string | undefined) {
  return (value ?? "").toLowerCase().trim();
}

function normalizeFreeText(value: string | undefined) {
  return (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[.,;!?]/g, "")
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean)
    .sort()
    .join(" ");
}

export function generateRecommendationCacheKey(input: RecommendationInput) {
  const normalized = {
    ageGroup: normalizeDropdown(input.ageGroup),
    budget: normalizeDropdown(input.budget),
    interests: normalizeFreeText(input.interests),
    occasion: normalizeDropdown(input.occasion),
    recipient: normalizeDropdown(input.recipient),
    style: normalizeDropdown(input.style)
  };

  const serialized = JSON.stringify(
    normalized,
    Object.keys(normalized).sort()
  );
  const hash = createHash("md5").update(serialized).digest("hex");

  return `${cacheKeyPrefix}${hash}`;
}
