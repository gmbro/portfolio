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
  roleLabel: "이경민의 AI PM 포트폴리오",
  careerLabel: "· 7년 경력",
  headline: "고객의 문제를 제품으로 해결해 온\nAI PM 이경민입니다.",
  highlight: "AI PM 이경민",
  subcopy: [
    "AI 제품 0→1, 350만 MAU 운영, 데이터·운영 개선과 B2B·B2G 사업화 경험을 프로젝트의 문제·판단·실행·성과로 보여드립니다.",
    "대표 프로젝트를 직접 살펴보거나, AI에게 필요한 경력 근거를 물어보세요.",
  ],
  keywords: ["AI 제품 0→1", "대규모 제품 운영", "운영 구조·사업화"],
  ctaLabel: "프로젝트 증거 보기",
  ctaTarget: "case-studies",
  stats: [
    { value: "5개", label: "대표 프로젝트" },
    { value: "350만", label: "MAU 제품 운영" },
    { value: "70%+", label: "운영 원가 절감" },
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
  const ctaLabel = normalizeString(heroCandidate.ctaLabel, 32);
  const ctaTarget = normalizeString(heroCandidate.ctaTarget, 64);
  const headlineLines = headline?.split("\n") ?? [];

  if (
    !roleLabel ||
    careerLabel === null ||
    !headline ||
    highlight === null ||
    !ctaLabel ||
    !ctaTarget ||
    !isSafeTarget(ctaTarget) ||
    headlineLines.length > 2 ||
    headlineLines.some((line) => !line.trim() || line.trim().length > 60)
  ) {
    return null;
  }

  const subcopySource = heroCandidate.subcopy;
  const keywordSource = heroCandidate.keywords;
  if (!Array.isArray(subcopySource) || subcopySource.length !== 2) return null;
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
      subcopy: subcopy as [string, string],
      keywords: keywords as [string, string, string],
      ctaLabel,
      ctaTarget,
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
