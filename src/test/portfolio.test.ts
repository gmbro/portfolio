import { describe, expect, it } from "vitest";
import type { Json } from "@/lib/database.types";
import { defaultHeroContent, parsePortfolioPageContent } from "@/types/portfolio";
import { chatbotStarterQuestions } from "@/data/chatbot";
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

  it("보조 문장 1~2개와 CTA가 없는 공개용 Hero를 허용한다", () => {
    const withoutCta = structuredClone(validContent) as Record<string, unknown>;
    const hero = withoutCta.hero as Record<string, unknown>;
    hero.subcopy = ["검증된 한 문장으로 역할 범위를 설명합니다."];
    delete hero.ctaLabel;
    delete hero.ctaTarget;

    expect(parsePortfolioPageContent(withoutCta as Json)).toMatchObject({
      hero: {
        subcopy: ["검증된 한 문장으로 역할 범위를 설명합니다."],
      },
    });
    expect(parsePortfolioPageContent(withoutCta as Json)?.hero.ctaLabel).toBeUndefined();
    expect(parsePortfolioPageContent(withoutCta as Json)?.hero.ctaTarget).toBeUndefined();
  });

  it("CTA 한쪽만 있거나 보조 문장이 0개·3개인 Hero를 거절한다", () => {
    const labelOnly = structuredClone(validContent) as Record<string, unknown>;
    delete (labelOnly.hero as Record<string, unknown>).ctaTarget;

    const noSubcopy = structuredClone(validContent) as Record<string, unknown>;
    (noSubcopy.hero as Record<string, unknown>).subcopy = [];

    const tooManySubcopy = structuredClone(validContent) as Record<string, unknown>;
    (tooManySubcopy.hero as Record<string, unknown>).subcopy = ["첫째", "둘째", "셋째"];

    expect(parsePortfolioPageContent(labelOnly as Json)).toBeNull();
    expect(parsePortfolioPageContent(noSubcopy as Json)).toBeNull();
    expect(parsePortfolioPageContent(tooManySubcopy as Json)).toBeNull();
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
  it("AI Product & Project Manager 제너럴리스트 Hero를 사용한다", () => {
    expect(defaultHeroContent).toEqual({
      roleLabel: "AI Product & Project Manager",
      headline: "AI 역량이 우수한 제너럴리스트로서\n고객의 문제를 제품으로 해결합니다.",
      highlight: "AI 역량",
      subcopy: [
        "제품의 제로투원과 350만 MAU 제품의 운영을 경험하고 제품 기획, 사업 개발, 퍼포먼스 마케팅 등 다양한 영역에서 역량을 키워왔습니다. B2B AI Project에 강점이 있으며 최근 직접 개발한 B2C Product로 헬스케어 데이터의 휘발성에 대한 문제를 풀고 있습니다.",
      ],
      keywords: ["프로덕트의 제로투원 경험", "350만 MAU 제품 운영", "B2B&B2G 프로젝트"],
      stats: [
        { value: "5개", label: "수행 프로젝트" },
        { value: "3개", label: "프로덕트 기획 및 운영" },
        { value: "3억", label: "매출 기여" },
      ],
    });
    expect(defaultHeroContent.highlight).toBe("AI 역량");
    expect(defaultHeroContent.headline).toContain("AI 역량");
    expect(defaultHeroContent.ctaLabel).toBeUndefined();
    expect(defaultHeroContent.ctaTarget).toBeUndefined();
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

  it("Hero의 수행 프로젝트 수를 공개 CAR 프로젝트와 연결한다", () => {
    expect(defaultHeroContent.stats?.[0]).toEqual({
      value: "5개",
      label: "수행 프로젝트",
    });
    expect(portfolioProjects).toHaveLength(5);
    expect(portfolioProjects.some((project) => project.organization.includes("GenON"))).toBe(true);
  });

  it("챗봇 추천 질문 4개를 공개된 프로젝트·경력 근거와 연결한다", () => {
    expect(chatbotStarterQuestions.map(({ id }) => id)).toEqual([
      "zero-to-one",
      "large-scale-operations",
      "data-operations",
      "b2b-b2g",
    ]);
    expect(portfolioProjects.find(({ id }) => id === "skelter-ai-counselor")?.metrics).toContain(
      "0→1 PoC",
    );
    expect(portfolioProjects.find(({ id }) => id === "sk-planet-syrup-wallet")?.metrics).toContain(
      "약 350만 MAU",
    );
    expect(portfolioProjects.find(({ id }) => id === "selectstar-stt-operations")?.metrics).toContain(
      "운영 원가 70%+ 절감",
    );
    expect(careerExperiences.find(({ company }) => company === "GenON")?.tags).toContain(
      "B2B · B2G",
    );
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

  it("공식 제품명을 사용하고 이전 표기를 남기지 않는다", () => {
    const serialized = JSON.stringify({
      defaultHeroContent,
      profile,
      careerExperiences,
      portfolioProjects,
    });

    expect(serialized).toContain("Archi(아키)");
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
