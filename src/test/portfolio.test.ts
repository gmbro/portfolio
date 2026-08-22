import { describe, expect, it } from "vitest";
import type { Json } from "@/lib/database.types";
import { defaultHeroContent, parsePortfolioPageContent } from "@/types/portfolio";
import { chatbotStarterQuestions } from "@/data/chatbot";
import { parseCountUpValue } from "@/lib/countUp";
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
  it("7년 경력 AI Product Manager Hero를 사용한다", () => {
    expect(defaultHeroContent).toEqual({
      roleLabel: "AI Product Manager",
      careerLabel: "7 years of experience",
      headline: "고객의 문제를 제품으로 해결합니다.",
      highlight: ["고객", "제품"],
      subcopy: [],
      keywords: [
        "프로덕트의 제로투원 경험",
        "350만 MAU 제품 운영",
        "B2B&B2G 프로젝트",
        "B2C Product 기획·개발",
      ],
      stats: [
        { value: "5+", label: "수행 프로젝트" },
        { value: "3+", label: "제품 기획.운영" },
        { value: "28억", label: "매출 기여" },
      ],
    });
    expect(defaultHeroContent.highlight).toEqual(["고객", "제품"]);
    expect(defaultHeroContent.headline).not.toContain("AI 역량");
    expect(defaultHeroContent.ctaLabel).toBeUndefined();
    expect(defaultHeroContent.ctaTarget).toBeUndefined();
  });

  it("keeps the verified identity and career history in newest-first order", () => {
    expect(profile.name).toBe("이경민");
    expect(profile.role).toBe("AI Product Manager");
    expect(careerExperiences.map((experience) => experience.company)).toEqual([
      "아키랩",
      "GenON",
      "Selectstar",
      "Skelter Labs",
      "SK Planet",
      "Kakao Commerce",
    ]);
    expect(careerExperiences.map((experience) => experience.period)).toEqual([
      "2026.06–진행 중",
      "2025.01–2026.05",
      "2024.06–2025.01",
      "2021.09–2023.04",
      "2018.04–2020.04",
      "2017.05–2017.12",
    ]);
    expect(careerExperiences.map((experience) => experience.duration)).toEqual([
      "3개월",
      "1년 6개월",
      "7개월",
      "1년 7개월",
      "2년",
      "7개월",
    ]);
    expect(careerExperiences[0]).toMatchObject({
      company: "아키랩",
      title: "대표",
      team: "",
    });
    expect(careerExperiences[1]).toMatchObject({
      company: "GenON",
      title: "프로.사업개발",
      team: "",
    });
  });

  it("아키 제품과 아키랩 운영 주체를 구분하고 실사용 학습을 보존한다", () => {
    const [arkylab] = careerExperiences;

    expect(arkylab).toMatchObject({
      company: "아키랩",
      period: "2026.06–진행 중",
      duration: "3개월",
      description: "1인 사업자로 헬스케어·커뮤니티·법률 서비스를 개발해 운영하고 있습니다.",
    });
    expect(flagshipProject).toMatchObject({
      organization: "아키랩, FIXNESS",
      category: "아키 · 실사용 베타",
      involvement: { label: "담당 책임", value: "제품 기획·개발·사업·운영 전담" },
      link: { label: "아키 베타 보기", href: "https://archi.best" },
      metrics: ["베타 참여자 15명", "2026.06–진행 중", "제품 전 과정 1인 전담"],
      visual: { alt: expect.stringContaining("아키") },
    });
    expect(flagshipProject.visual?.placeholderItems).toEqual([]);
    expect(flagshipProject.visual?.items).toEqual([
      expect.objectContaining({
        id: "arky-product-flow",
        src: expect.stringContaining("/arky/arky1.png"),
        alt: expect.stringContaining("수업 캘린더"),
        width: 1809,
        height: 1311,
      }),
      expect.objectContaining({
        id: "arky-recording-proof",
        src: expect.stringContaining("/arky/arky2.png"),
        alt: expect.stringContaining("수업 기록 영상"),
        width: 1355,
        height: 1311,
      }),
      expect.objectContaining({
        id: "arky-user-manual",
        src: expect.stringContaining("/arky/arky3.png"),
        alt: expect.stringContaining("이용 매뉴얼"),
        width: 1784,
        height: 1311,
      }),
    ]);
    expect(flagshipProject.visual?.items?.every((item) => item.caption === undefined)).toBe(true);
    expect(flagshipProject.action).toContain("Gemini API");
    expect(flagshipProject.action).toContain("MediaPipe");
    expect(flagshipProject.action).toContain("33개 관절");
    expect(flagshipProject.result).toContain("15명");
    expect(flagshipProject.result).toContain("교정 운동 전후 비교");
    expect(JSON.stringify({ arkylab, flagshipProject })).not.toMatch(/6명|2026\.07|1인 제품/);
  });

  it("Hero의 수행 프로젝트 하한을 공개 CAR 프로젝트와 연결한다", () => {
    expect(defaultHeroContent.stats?.[0]).toEqual({
      value: "5+",
      label: "수행 프로젝트",
    });
    expect(portfolioProjects).toHaveLength(5);
    expect(portfolioProjects.some((project) => project.organization.includes("GenON"))).toBe(true);
  });

  it("숫자로 시작하는 Hero 지표만 카운트업 대상으로 파싱한다", () => {
    expect(defaultHeroContent.stats?.map(({ value }) => parseCountUpValue(value))).toEqual([
      { target: 5, suffix: "+" },
      { target: 3, suffix: "+" },
      { target: 28, suffix: "억" },
    ]);
    expect(parseCountUpValue("검증")).toBeNull();
  });

  it("챗봇 추천 질문 4개를 공개된 프로젝트·경력 근거와 연결한다", () => {
    expect(chatbotStarterQuestions.map(({ id }) => id)).toEqual([
      "zero-to-one",
      "large-scale-operations",
      "data-operations",
      "b2b-b2g",
    ]);
    expect(portfolioProjects.find(({ id }) => id === "skelter-ai-counselor")).toMatchObject({
      category: "Product 0 to 1",
      metrics: expect.arrayContaining(["PoC"]),
    });
    expect(portfolioProjects.find(({ id }) => id === "sk-planet-syrup-wallet")).toMatchObject({
      category: "350만 MAU 제품 광고 운영",
      metrics: expect.arrayContaining(["제품 운영"]),
    });
    expect(portfolioProjects.find(({ id }) => id === "selectstar-stt-operations")?.metrics).toContain(
      "운영 원가 70%+ 절감",
    );
    expect(careerExperiences.find(({ company }) => company === "GenON")?.tags).toContain(
      "B2B · B2G",
    );
  });

  it("아키 다음에 핵심 프로젝트를 사용자 지정 서사 순서로 배열한다", () => {
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
      "수행 주체: 아키랩, FIXNESS",
      "수행 회사: GenON · NIPA 지원사업 AI 바우처",
      "수행 회사: 셀렉터스타 · LG유플러스",
      "수행 회사: 스켈터랩스 · 네오사피엔스",
      "수행 회사: SK Planet · Syrup Wallet",
    ]);
    expect(
      portfolioProjects.map((project) => `${project.involvement.label}: ${project.involvement.value}`),
    ).toEqual([
      "담당 책임: 제품 기획·개발·사업·운영 전담",
      "담당 책임: 제안서·산출물·프로젝트 관리",
      "담당 책임: 프로젝트 수행·STT 제품 기획",
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

    expect(serialized).toContain("아키");
    expect(serialized).toContain("아키랩");
    expect(serialized).not.toContain("Archi");
    expect(serialized).not.toContain("Arkylab");
    expect(serialized).not.toMatch(/(^|[^A-Za-z])Arky([^A-Za-z]|$)/);
    expect(serialized).not.toContain("9년차");
    expect(serialized).not.toContain("Adler");
    expect(serialized).not.toMatch(/클래스팅|Classting/i);
    expect(serialized).toMatch(/[가-힣]/);
  });

  it("사용자가 제외한 Adler 경력을 공개 데이터에 포함하지 않는다", () => {
    expect(careerExperiences.some((experience) => experience.company === "Adler")).toBe(false);
  });

  it("주석에서 확정한 프로젝트 제목·라벨·핵심 근거를 보존한다", () => {
    expect(
      portfolioProjects.map(({ id, category, title, organization, involvement, metrics }) => ({
        id,
        category,
        title,
        organization,
        involvement: involvement.value,
        metrics,
      })),
    ).toEqual([
      {
        id: "arkylab-ai-coach",
        category: "아키 · 실사용 베타",
        title: "운동 강사를 위한 AI 기록 솔루션",
        organization: "아키랩, FIXNESS",
        involvement: "제품 기획·개발·사업·운영 전담",
        metrics: ["베타 참여자 15명", "2026.06–진행 중", "제품 전 과정 1인 전담"],
      },
      {
        id: "nipa-vision-ai-poc",
        category: "Vision AI · 프로젝트 관리",
        title: "Vision AI를 활용한 신발 아웃솔 품질 검사 효율화 프로젝트",
        organization: "GenON · NIPA 지원사업 AI 바우처",
        involvement: "제안서·산출물·프로젝트 관리",
        metrics: ["7개월 수행", "PoC·산출물 관리"],
      },
      {
        id: "selectstar-stt-operations",
        category: "AI 데이터 가공",
        title: "음성 전사 데이터셋 구축 프로젝트",
        organization: "셀렉터스타 · LG유플러스",
        involvement: "프로젝트 수행·STT 제품 기획",
        metrics: ["맨먼스 약 1/10", "운영 원가 70%+ 절감", "수행사 커뮤니케이션"],
      },
      {
        id: "skelter-ai-counselor",
        category: "Product 0 to 1",
        title: "Retrieval 기술을 활용한 AI 상담사 PoC",
        organization: "스켈터랩스 · 네오사피엔스",
        involvement: "제품·대화 설계 및 제휴 주도",
        metrics: ["제품 기획", "사업 제휴", "PoC", "챗봇"],
      },
      {
        id: "sk-planet-syrup-wallet",
        category: "350만 MAU 제품 광고 운영",
        title: "시럽월렛 광고 운영",
        organization: "SK Planet · Syrup Wallet",
        involvement: "푸시 기능 기획·운영 개선",
        metrics: ["제품 운영", "타겟팅 기획", "운영 효율화"],
      },
    ]);

    const skelter = portfolioProjects.find(({ id }) => id === "skelter-ai-counselor");
    const syrup = portfolioProjects.find(({ id }) => id === "sk-planet-syrup-wallet");
    expect(skelter?.visual?.placeholderItems).toEqual(["PRD", "대화 흐름", "PoC"]);
    expect(skelter?.result).toContain("사업 제휴");
    expect(syrup?.action).toContain("유효 토큰");
    expect(syrup?.action).toContain("분산 발송");
    expect(syrup?.action).toContain("어드민");
    expect(syrup?.tags).toEqual(["B2C", "서비스 운영", "푸시 기능 개선", "프로세스 운영 개선"]);
  });

  it("주석에서 확정한 회사 설명·직무·팀·경력 설명을 보존한다", () => {
    const byCompany = Object.fromEntries(careerExperiences.map((experience) => [experience.company, experience]));

    expect(byCompany.Selectstar).toMatchObject({
      companyDesc: "AI 데이터 가공",
      description: "음성 전사 데이터셋 구축 프로젝트를 수행하며 STT 제품 개발을 주도했습니다.",
    });
    expect(byCompany.Adler).toBeUndefined();
    expect(byCompany["Skelter Labs"]).toMatchObject({
      companyDesc: "B2B AI 챗봇 사업",
      title: "프로덕트 매니저",
      team: "제품팀",
    });
    expect(byCompany["Skelter Labs"].description).toContain("사업 제휴를 담당했습니다");
    expect(byCompany["SK Planet"]).toMatchObject({ title: "운영 매니저", team: "서비스 운영팀" });
    expect(byCompany["Kakao Commerce"]).toMatchObject({
      title: "퍼포먼스 마케터",
      team: "선물하기팀",
    });
    expect(byCompany["Kakao Commerce"].description).toContain("클릭 전환율");
  });
});
