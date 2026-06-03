import { readFileSync } from "fs";
import { join } from "path";

export type MarketTrendSignal = {
  category: string;
  productIdea: string;
  searchQuery: string;
  budgetHint: string;
  giftFit: number;
  marketSignal: number;
  whenToUse: string;
};

export type MarketTrendContext = {
  influence: number;
  category: string;
  signals: MarketTrendSignal[];
  sourceFile: string;
};

const marketTrendFile = join(process.cwd(), "data", "market-trends-2026.md");
const defaultInfluence = 0.35;
const maxPromptSignals = 16;

let cachedSignals: MarketTrendSignal[] | null = null;

export function getMarketTrendContext(): MarketTrendContext {
  const influence = normalizeInfluence(
    process.env.MARKET_TRENDS_INFLUENCE,
    defaultInfluence
  );
  const category = normalizeCategory(
    process.env.MARKET_TRENDS_CATEGORY ?? "all"
  );
  const signals = getMarketTrendSignals()
    .filter((signal) => category === "all" || signal.category === category)
    .sort(
      (first, second) =>
        second.marketSignal * second.giftFit - first.marketSignal * first.giftFit
    )
    .slice(0, maxPromptSignals);

  return {
    influence,
    category,
    signals,
    sourceFile: "data/market-trends-2026.md"
  };
}

export function getMarketTrendSignals(): MarketTrendSignal[] {
  if (!cachedSignals) {
    cachedSignals = parseMarketTrendMarkdown(readFileSync(marketTrendFile, "utf8"));
  }

  return cachedSignals;
}

function parseMarketTrendMarkdown(markdown: string) {
  const productSignalSection = markdown.split("## Product signals")[1] ?? "";
  const rows = productSignalSection
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|") && !line.includes("---"));

  return rows.slice(1).flatMap((row) => {
    const columns = row
      .split("|")
      .slice(1, -1)
      .map((column) => column.trim());

    if (columns.length < 7) {
      return [];
    }

    const [category, productIdea, searchQuery, budgetHint, giftFit, marketSignal, whenToUse] =
      columns;

    return [
      {
        category: normalizeCategory(category),
        productIdea,
        searchQuery,
        budgetHint,
        giftFit: Number(giftFit),
        marketSignal: Number(marketSignal),
        whenToUse
      }
    ];
  });
}

function normalizeInfluence(value: string | undefined, fallback: number) {
  const influence = Number(value ?? fallback);

  if (!Number.isFinite(influence)) {
    return fallback;
  }

  return Math.min(1, Math.max(0, influence));
}

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
