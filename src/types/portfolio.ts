import type { Json } from "@/lib/database.types";

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  roleLabel: string;
  careerLabel?: string;
  headline: string;
  highlight?: string | string[];
  subcopy: string[];
  keywords:
    | [string, string, string]
    | [string, string, string, string]
    | [string, string, string, string, string];
  ctaLabel?: string;
  ctaTarget?: string;
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
  roleLabel: "AI PM",
  careerLabel: "7 years of experience",
  headline: "고객의 문제를 제품으로 해결합니다.",
  highlight: ["고객", "제품"],
  subcopy: [],
  keywords: [
    "AI",
    "Product",
    "Project",
    "B2B",
    "B2C",
  ],
  stats: [
    { value: "5+", label: "수행 프로젝트" },
    { value: "3+", label: "제품 기획.운영" },
    { value: "13억", label: "매출 기여" },
  ],
};

const normalizeString = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= maxLength ? normalized : null;
};

const normalizeOptionalString = (value: unknown, maxLength: number) => {
  if (value === undefined) return undefined;
  return normalizeString(value, maxLength);
};

const isSafeTarget = (value: string) => /^[a-z][a-z0-9-]{0,63}$/.test(value);

export const parsePortfolioPageContent = (value: Json): PortfolioPageContent | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const candidate = value as Record<string, unknown>;
  const hero = candidate.hero;
  if (!hero || typeof hero !== "object" || Array.isArray(hero)) return null;

  const heroCandidate = hero as Record<string, unknown>;
  const roleLabel = normalizeString(heroCandidate.roleLabel, 40);
  const careerLabel = normalizeOptionalString(heroCandidate.careerLabel, 24);
  const headline = normalizeString(heroCandidate.headline, 120);
  const highlight = normalizeOptionalString(heroCandidate.highlight, 60);
  const ctaLabel = normalizeOptionalString(heroCandidate.ctaLabel, 32);
  const ctaTarget = normalizeOptionalString(heroCandidate.ctaTarget, 64);
  const headlineLines = headline?.split("\n") ?? [];
  const hasCompleteCta = ctaLabel !== undefined && ctaTarget !== undefined;
  const hasPartialCta = (ctaLabel === undefined) !== (ctaTarget === undefined);

  if (
    !roleLabel ||
    careerLabel === null ||
    !headline ||
    highlight === null ||
    ctaLabel === null ||
    ctaTarget === null ||
    hasPartialCta ||
    (hasCompleteCta && !isSafeTarget(ctaTarget)) ||
    headlineLines.length > 2 ||
    headlineLines.some((line) => !line.trim() || line.trim().length > 60)
  ) {
    return null;
  }

  const subcopySource = heroCandidate.subcopy;
  const keywordSource = heroCandidate.keywords;
  if (!Array.isArray(subcopySource) || subcopySource.length < 1 || subcopySource.length > 2) {
    return null;
  }
  if (!Array.isArray(keywordSource) || keywordSource.length !== 3) return null;

  const subcopy = subcopySource.map((item) => normalizeString(item, 180));
  const keywords = keywordSource.map((item) => normalizeString(item, 24));
  if (subcopy.some((item) => !item) || keywords.some((item) => !item)) return null;

  const stats = heroCandidate.stats;
  if (
    stats !== undefined &&
    (!Array.isArray(stats) || stats.length < 1 || stats.length > 3)
  ) {
    return null;
  }

  const statsSource = stats as unknown[] | undefined;
  const normalizedStats = statsSource?.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return null;
    const stat = item as Record<string, unknown>;
    const statValue = normalizeString(stat.value, 16);
    const statLabel = normalizeString(stat.label, 30);
    return statValue && statLabel ? { value: statValue, label: statLabel } : null;
  });
  if (normalizedStats?.some((item) => !item)) return null;

  const meta = candidate.meta;
  let normalizedMeta: PortfolioPageContent["meta"];
  if (meta !== undefined) {
    if (typeof meta !== "object" || meta === null || Array.isArray(meta)) return null;
    const metaCandidate = meta as Record<string, unknown>;
    const companyName = normalizeOptionalString(metaCandidate.companyName, 80);
    const roleTitle = normalizeOptionalString(metaCandidate.roleTitle, 80);
    const pageTitle = normalizeOptionalString(metaCandidate.pageTitle, 120);
    if (companyName === null || roleTitle === null || pageTitle === null) return null;
    normalizedMeta = { companyName, roleTitle, pageTitle };
  }

  return {
    meta: normalizedMeta,
    hero: {
      roleLabel,
      careerLabel,
      headline,
      highlight,
      subcopy: subcopy as string[],
      keywords: keywords as [string, string, string],
      ...(hasCompleteCta ? { ctaLabel, ctaTarget } : {}),
      stats: normalizedStats as HeroStat[] | undefined,
    },
  };
};

export const getPortfolioUrl = (slug: string) => {
  const basePath = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return new URL(`${basePath}p/${slug}`.replace(/\/+/g, "/"), window.location.origin).href;
};
