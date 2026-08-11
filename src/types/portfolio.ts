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
  id: string;
  slug: string;
  current_revision_id: string | null;
  noindex: boolean;
  status: string;
  updated_at: string;
  published_content: Json;
}

export const defaultHeroContent: HeroContent = {
  roleLabel: "Product Manager",
  careerLabel: "· 7년 경력",
  headline: "정량/정성 데이터로\n지표를 성장시킵니다.",
  highlight: "지표를",
  subcopy: [
    "사용자 인사이트와 데이터 분석을 기반으로 제품 전략을 수립하고,",
    "개발·디자인·비즈니스 팀을 연결하여 실질적인 성과를 만들어온 Product Manager입니다.",
  ],
  keywords: ["사용자 인사이트", "데이터 분석", "제품 실행"],
  ctaLabel: "포트폴리오 확인하기",
  ctaTarget: "case-studies",
  stats: [
    { value: "7+", label: "년 경력" },
    { value: "12+", label: "런칭 프로덕트" },
    { value: "3개", label: "재직 기업" },
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
