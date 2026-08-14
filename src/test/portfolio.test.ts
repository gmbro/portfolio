import { describe, expect, it } from "vitest";
import type { Json } from "@/lib/database.types";
import { defaultHeroContent, parsePortfolioPageContent } from "@/types/portfolio";
import {
  careerExperiences,
  featuredProjects,
  flagshipProject,
  portfolioProjects,
  profile,
} from "@/data/portfolio";

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

  it("회사별 Hero의 줄 수, 길이, stat 개수와 CTA target을 제한한다", () => {
    const tooManyHeadlineLines = structuredClone(validContent) as Record<string, unknown>;
    (tooManyHeadlineLines.hero as Record<string, unknown>).headline = "첫 줄\n둘째 줄\n셋째 줄";

    const tooManyStats = structuredClone(validContent) as Record<string, unknown>;
    (tooManyStats.hero as Record<string, unknown>).stats = [
      { value: "1", label: "하나" },
      { value: "2", label: "둘" },
      { value: "3", label: "셋" },
      { value: "4", label: "넷" },
    ];

    const unsafeTarget = structuredClone(validContent) as Record<string, unknown>;
    (unsafeTarget.hero as Record<string, unknown>).ctaTarget = "#case-studies<script>";

    const longToken = structuredClone(validContent) as Record<string, unknown>;
    (longToken.hero as Record<string, unknown>).roleLabel = "A".repeat(41);

    expect(parsePortfolioPageContent(tooManyHeadlineLines as Json)).toBeNull();
    expect(parsePortfolioPageContent(tooManyStats as Json)).toBeNull();
    expect(parsePortfolioPageContent(unsafeTarget as Json)).toBeNull();
    expect(parsePortfolioPageContent(longToken as Json)).toBeNull();
  });

  it("회사별 Hero 문자열의 앞뒤 공백을 제거해 반환한다", () => {
    const padded = structuredClone(validContent) as Record<string, unknown>;
    (padded.hero as Record<string, unknown>).roleLabel = "  프로덕트 매니저  ";

    expect(parsePortfolioPageContent(padded as Json)?.hero.roleLabel).toBe("프로덕트 매니저");
  });
});

describe("검증된 기본 포트폴리오 콘텐츠", () => {
  it("AI Product Manager 포지셔닝과 Archi 중심 Hero를 사용한다", () => {
    expect(defaultHeroContent).toEqual({
      roleLabel: "AI Product Manager",
      careerLabel: "· 7년 경력",
      headline: "고객의 문제를 제품으로 해결합니다.",
      highlight: "제품으로 해결합니다",
      subcopy: [
        "350만 MAU 제품 운영, AI 제품 0→1, STT 운영 원가 70%+ 절감으로 문제 정의와 실행 역량을 검증했습니다.",
        "현재는 Archi(아키)를 1인으로 기획·개발·사업·운영하며, 6명의 베타 참여자에게서 얻은 피드백으로 다음 제품 결정을 내리고 있습니다.",
      ],
      keywords: ["문제 정의", "제품 우선순위", "실사용 검증"],
      ctaLabel: "프로젝트 보기",
      ctaTarget: "case-studies",
      stats: [
        { value: "6명", label: "Archi 베타" },
        { value: "350만", label: "MAU 제품 운영" },
        { value: "70%+", label: "운영 원가 절감" },
      ],
    });
  });

  it("keeps the verified identity and career history in newest-first order", () => {
    expect(profile.name).toBe("이경민");
    expect(profile.role).toBe("AI Product Manager");
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
    expect(careerExperiences[0]).toMatchObject({
      company: "Arkylab",
      title: "대표",
      team: "",
    });
    expect(careerExperiences[1]).toMatchObject({
      company: "GenON",
      title: "프로.사업개발",
      team: "",
    });
  });

  it("Archi 제품과 Arkylab 운영 주체를 구분하고 실사용 학습을 보존한다", () => {
    const [arkylab] = careerExperiences;

    expect(arkylab).toMatchObject({
      company: "Arkylab",
      period: "2026.06–진행 중",
      description: "Archi(아키)를 운영하는 1인 사업자로 제품과 사업 전 과정을 맡고 있습니다.",
    });
    expect(flagshipProject).toMatchObject({
      organization: "Arkylab",
      category: "Archi · 실사용 베타",
      involvement: { label: "담당 책임", value: "제품 기획·개발·사업·운영 전담" },
      link: { label: "Archi 베타 보기", href: "https://archi.best" },
      metrics: ["베타 참여자 6명", "2026.07–진행 중", "제품 전 과정 1인 전담"],
      visual: { alt: expect.stringContaining("Archi(아키)") },
    });
    expect(flagshipProject.action).toContain("그리드 배경 촬영 기능");
    expect(flagshipProject.result).toContain("시퀀스");
    expect(flagshipProject.result).toContain("영상 기록");
  });

  it("Archi 다음에 핵심 프로젝트를 사용자 지정 서사 순서로 배열한다", () => {
    expect(portfolioProjects.map((project) => project.id)).toEqual([
      "arkylab-ai-coach",
      "nipa-vision-ai-poc",
      "selectstar-stt-operations",
      "skelter-ai-counselor",
      "sk-planet-syrup-wallet",
    ]);
    expect(featuredProjects.map((project) => project.period)).toEqual([
      "2025.06–2025.12",
      "2024.06–2025.01",
      "2021.09–2023.04",
      "2018.04–2020.04",
    ]);
  });

  it("수행 조직과 담당 책임을 퍼센트 없이 구체적으로 표시한다", () => {
    expect(
      portfolioProjects.map((project) => `${project.organizationLabel}: ${project.organization}`),
    ).toEqual([
      "수행 주체: Arkylab",
      "수행 회사: GenON · NIPA 지원 사업",
      "수행 회사: Selectstar · 프로젝트실",
      "수행 회사: Skelter Labs · 제품",
      "수행 회사: SK Planet · Syrup Wallet",
    ]);
    expect(
      portfolioProjects.map((project) => `${project.involvement.label}: ${project.involvement.value}`),
    ).toEqual([
      "담당 책임: 제품 기획·개발·사업·운영 전담",
      "담당 책임: 제안·산출물·이해관계자 관리",
      "담당 책임: STT 전환 기획·운영 품질 관리",
      "담당 책임: 제품·대화 설계 및 제휴 주도",
      "담당 책임: 푸시 기능 기획·운영 개선",
    ]);
    expect(JSON.stringify(portfolioProjects)).not.toMatch(/기여도|90%|100%/);
  });

  it("공식 제품명과 7년 경력을 사용하고 이전 표기를 남기지 않는다", () => {
    const serialized = JSON.stringify({
      defaultHeroContent,
      profile,
      careerExperiences,
      portfolioProjects,
    });

    expect(serialized).toContain("Archi(아키)");
    expect(serialized).toContain("7년 경력");
    expect(serialized).not.toMatch(/(^|[^A-Za-z])Arky([^A-Za-z]|$)/);
    expect(serialized).not.toContain("9년차");
    expect(serialized).not.toMatch(/클래스팅|Classting/i);
    expect(serialized).toMatch(/[가-힣]/);
  });

  it("짧은 Adler 경력의 고용 형태와 종료 배경을 확인된 범위로 설명한다", () => {
    const adler = careerExperiences.find((experience) => experience.company === "Adler");

    expect(adler?.period).toBe("2023.04–2023.06");
    expect(adler?.description).toContain("정규직");
    expect(adler?.description).toContain("회사");
    expect(adler?.description).toContain("휴업");
    expect(adler?.description).not.toMatch(/폐업|해고|경영난/);
  });
});
