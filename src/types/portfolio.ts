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
  roleLabel: "프로덕트 매니저",
  careerLabel: "· 9년차",
  headline: "고객의 문제를 제품으로 해결하고\n실제 사용과 성과로 검증합니다.",
  highlight: "실제 사용과 성과로 검증합니다.",
  subcopy: [
    "350만 MAU 제품 운영과 AI 상담사 0→1 기획을 통해 고객 문제를 제품 구조와 실행 계획으로 전환해 왔습니다.",
    "현재는 운동 강사용 AI 제품을 직접 기획·구축하고 실제 수업에서 베타 검증하며 개선하고 있습니다.",
  ],
  keywords: ["고객 문제 정의", "0→1 제품 설계", "데이터 기반 개선"],
  ctaLabel: "대표 프로젝트 보기",
  ctaTarget: "case-studies",
  stats: [
    { value: "0→1", label: "AI 제품 기획·구축" },
    { value: "350만", label: "MAU 제품 운영" },
    { value: "70%+", label: "운영 원가 절감" },
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
