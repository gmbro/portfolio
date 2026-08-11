import type { Json } from "@/lib/database.types";

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  roleLabel: string;
  careerLabel?: string;
  headline: string;
  highlight?: string;
  subcopy: string[];
  keywords: [string, string, string];
  ctaLabel: string;
  ctaTarget: string;
  stats?: HeroStat[];
}

export interface PortfolioPageContent {
  meta?: {
    companyName?: string;
    roleTitle?: string;
    pageTitle?: string;
  };
  hero: HeroContent;
}

export interface PortfolioPublication {
  slug: string;
  noindex: boolean;
  published_content: Json;
}

export const defaultHeroContent: HeroContent = {
  roleLabel: "AI Product & Project Manager",
  careerLabel: "· 9 years",
  headline: "I turn AI into products, operating systems,\nand measurable outcomes.",
  highlight: "measurable outcomes.",
  subcopy: [
    "Nine years across AI product planning, data operations, and B2B/B2G commercialization.",
    "From 0→1 PoCs to 3.5M-MAU operations and 70%+ cost reduction.",
  ],
  keywords: ["AI Product Design", "Data & Operations", "Commercial Delivery"],
  ctaLabel: "View selected work",
  ctaTarget: "case-studies",
  stats: [
    { value: "₩200M", label: "AI Project Scope" },
    { value: "3.5M", label: "MAU Service Operations" },
    { value: "70%+", label: "Operating Cost Reduction" },
  ],
};

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || typeof value === "string";

export const parsePortfolioPageContent = (value: Json): PortfolioPageContent | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const candidate = value as Record<string, unknown>;
  const hero = candidate.hero;
  if (!hero || typeof hero !== "object" || Array.isArray(hero)) return null;

  const heroCandidate = hero as Record<string, unknown>;
  const keywords = heroCandidate.keywords;
  const subcopy = heroCandidate.subcopy;

  if (
    typeof heroCandidate.roleLabel !== "string" ||
    typeof heroCandidate.headline !== "string" ||
    typeof heroCandidate.ctaLabel !== "string" ||
    typeof heroCandidate.ctaTarget !== "string" ||
    !isStringArray(subcopy) ||
    subcopy.length !== 2 ||
    !isStringArray(keywords) ||
    keywords.length !== 3 ||
    !isOptionalString(heroCandidate.careerLabel) ||
    !isOptionalString(heroCandidate.highlight)
  ) {
    return null;
  }

  const stats = heroCandidate.stats;
  if (
    stats !== undefined &&
    (!Array.isArray(stats) ||
      !stats.every(
        (item) =>
          item &&
          typeof item === "object" &&
          !Array.isArray(item) &&
          typeof (item as Record<string, unknown>).value === "string" &&
          typeof (item as Record<string, unknown>).label === "string",
      ))
  ) {
    return null;
  }

  const meta = candidate.meta;
  if (
    meta !== undefined &&
    (typeof meta !== "object" ||
      meta === null ||
      Array.isArray(meta) ||
      !isOptionalString((meta as Record<string, unknown>).companyName) ||
      !isOptionalString((meta as Record<string, unknown>).roleTitle) ||
      !isOptionalString((meta as Record<string, unknown>).pageTitle))
  ) {
    return null;
  }

  return value as unknown as PortfolioPageContent;
};

export const getPortfolioUrl = (slug: string) => {
  const basePath = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return new URL(`${basePath}p/${slug}`.replace(/\/+/g, "/"), window.location.origin).href;
};
