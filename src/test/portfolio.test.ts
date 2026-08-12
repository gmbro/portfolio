import { describe, expect, it } from "vitest";
import type { Json } from "@/lib/database.types";
import { defaultHeroContent, parsePortfolioPageContent } from "@/types/portfolio";
import { careerExperiences, featuredProjects, profile } from "@/data/portfolio";

const validContent: Json = {
  meta: {
    companyName: "검증된 회사",
    roleTitle: "프로덕트 매니저",
    pageTitle: "검증된 회사 프로덕트 매니저 포트폴리오",
  },
  hero: {
    roleLabel: "프로덕트 매니저",
    careerLabel: "검증된 경력",
    headline: "검증된 문제를\n측정 가능한 성과로 연결합니다.",
    highlight: "측정 가능한 성과",
    subcopy: [
      "검증된 근거로 전략을 설계합니다.",
      "협업의 실행 과정을 실제 성과로 연결합니다.",
    ],
    keywords: ["문제 정의", "데이터 분석", "프로젝트 관리"],
    ctaLabel: "대표 프로젝트 보기",
    ctaTarget: "case-studies",
    stats: [{ value: "검증", label: "근거 기반 지표" }],
  },
};

describe("parsePortfolioPageContent", () => {
  it("키워드가 정확히 세 개인 공개용 Hero payload를 허용한다", () => {
    expect(parsePortfolioPageContent(validContent)).toMatchObject({
      hero: { keywords: ["문제 정의", "데이터 분석", "프로젝트 관리"] },
    });
  });

  it("rejects an incomplete Hero payload", () => {
    const invalidContent: Json = {
      hero: {
        roleLabel: "Product Manager",
        headline: "Incomplete headline",
        subcopy: ["Only one line"],
        keywords: ["One", "Two"],
        ctaLabel: "View work",
        ctaTarget: "case-studies",
      },
    };

    expect(parsePortfolioPageContent(invalidContent)).toBeNull();
  });

  it("rejects invalid metadata types before they reach document metadata", () => {
    const invalidMeta = structuredClone(validContent) as Record<string, unknown>;
    invalidMeta.meta = { pageTitle: 42 };

    expect(parsePortfolioPageContent(invalidMeta as Json)).toBeNull();
  });
});

describe("검증된 기본 포트폴리오 콘텐츠", () => {
  it("승인된 한국어 AI PM Hero 문구, 키워드, CTA와 지표를 사용한다", () => {
    expect(defaultHeroContent).toEqual({
      roleLabel: "AI 프로덕트·프로젝트 매니저",
      careerLabel: "· 9년차",
      headline: "기술로 고객의 문제를 해결하고\n성과로 증명합니다.",
      highlight: "성과로 증명합니다.",
      subcopy: [
        "AI 서비스 기획, 데이터 프로젝트 운영과 B2B·B2G 사업화를 연결해 왔습니다.",
        "0→1 PoC부터 350만 MAU 서비스 운영, 프로젝트 운영 원가 70%+ 절감까지 경험했습니다.",
      ],
      keywords: ["AI 서비스 기획", "데이터·운영 설계", "사업화·프로젝트 실행"],
      ctaLabel: "대표 프로젝트 보기",
      ctaTarget: "case-studies",
      stats: [
        { value: "2억", label: "AI 프로젝트 규모" },
        { value: "350만", label: "MAU 서비스 운영" },
        { value: "70%+", label: "프로젝트 운영 원가 절감" },
      ],
    });
  });

  it("keeps the verified identity and career history in newest-first order", () => {
    expect(profile.name).toBe("이경민");
    expect(careerExperiences.map((experience) => experience.company)).toEqual([
      "Arkylab",
      "GenON",
      "Selectstar",
      "Adler",
      "Skelter Labs",
      "SK Planet",
      "Kakao Commerce",
    ]);
    expect(careerExperiences.map((experience) => experience.period)).toEqual([
      "2026.06–진행 중",
      "2025.01–2026.05",
      "2024.06–2025.01",
      "2023.04–2023.06",
      "2021.09–2023.04",
      "2018.04–2020.04",
      "2017.05–2017.12",
    ]);
  });

  it("keeps the three verified Arkylab achievements at the top of Experience", () => {
    const [arkylab] = careerExperiences;

    expect(arkylab).toMatchObject({
      company: "Arkylab",
      period: "2026.06–진행 중",
      achievements: [
        "운동 강사를 위한 AI 기록 솔루션 개발 및 운영, 베타 서비스 진행 중",
        "트레바리 독서 커뮤니티를 위한 AI 솔루션 제작 및 운영",
        "부당한 정책에 대해 환불받을 수 있도록 지원하는 B2C 법률 서비스 제작 및 납품",
      ],
    });
  });

  it("orders selected projects newest-first", () => {
    expect(featuredProjects.map((project) => project.period)).toEqual([
      "2026.06–진행 중",
      "2026.05–진행 중",
      "2025.06–2025.12",
      "2024.06–2025.01",
      "2021.09–2023.04",
      "2018.04–2020.04",
    ]);
  });

  it("수행 조직과 기여 정보를 과장 없이 한국어로 표시한다", () => {
    expect(
      featuredProjects.map((project) => `${project.organizationLabel}: ${project.organization}`),
    ).toEqual([
      "수행 주체: Arkylab",
      "수행 주체: Arkylab · 독립 구축",
      "지원 사업: NIPA 지원 사업",
      "수행 회사: Selectstar · 프로젝트실",
      "수행 회사: Skelter Labs · 제품",
      "수행 회사: SK Planet · Syrup Wallet",
    ]);
    expect(
      featuredProjects.map((project) => `${project.involvement.label}: ${project.involvement.value}`),
    ).toEqual([
      "역할 범위: 제품 기획 · MVP 개발",
      "기여도: 100%",
      "역할 범위: 제안→종결 관리",
      "기여도: 100%",
      "기여도: 90%",
      "기여도: 100%",
    ]);
  });

  it("공개 포트폴리오의 주요 설명을 한국어로 제공한다", () => {
    expect(
      JSON.stringify({ defaultHeroContent, profile, careerExperiences, featuredProjects }),
    ).toMatch(/[가-힣]/);
  });
});
