import { describe, expect, it } from "vitest";
import type { Json } from "@/lib/database.types";
import { defaultHeroContent, parsePortfolioPageContent } from "@/types/portfolio";
import {
  chatbotFollowupQuestionsByPath,
  chatbotStarterQuestions,
  resolveChatbotQuestionPath,
} from "@/data/chatbot";
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
      hero: {
        headline: "검증된 문제를 측정 가능한 성과로 연결합니다.",
        keywords: ["문제 정의", "데이터 분석", "프로젝트 관리"],
      },
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

  it("회사별 Hero의 길이, stat 개수와 CTA target을 제한한다", () => {
    const tooLongHeadline = structuredClone(validContent) as Record<string, unknown>;
    (tooLongHeadline.hero as Record<string, unknown>).headline = "가".repeat(121);

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

    expect(parsePortfolioPageContent(tooLongHeadline as Json)).toBeNull();
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
  it("7년 경력 AI PM Hero를 사용한다", () => {
    expect(defaultHeroContent).toEqual({
      roleLabel: "AI Product Manager",
      careerLabel: "7 years of experience",
      headline: "AI 기술을 제품화하고, 운영 성과를 설계합니다.",
      highlight: ["AI 기술을 제품화", "운영 성과를 설계"],
      subcopy: [
        "저는 AI 모델과 기술을 사용자 시나리오·데이터 처리·서비스 아키텍처로 구체화하는 제품 기획자로, STT·TTS·Retrieval 기반 AI 서비스 기획부터 데이터 파이프라인 설계, 제품 통합, 운영 비용 최적화까지 경험했습니다.",
      ],
      keywords: ["AI", "Product", "Project", "B2B", "B2C"],
      stats: [
        { value: "5+", label: "수행 프로젝트" },
        { value: "3+", label: "제품 기획·운영" },
        { value: "13억", label: "매출 기여" },
      ],
    });
    expect(defaultHeroContent.highlight).toEqual(["AI 기술을 제품화", "운영 성과를 설계"]);
    expect(defaultHeroContent.headline).not.toContain("\n");
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
      title: "프로 · 사업 개발",
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
      category: "제품, 베타 서비스",
      involvement: { label: "담당 업무", value: "제품 기획·개발·사업·운영 전담" },
      link: { label: "베타 서비스 보기", href: "https://archi.best" },
      metrics: ["제품 개발", "사업 제휴", "베타 서비스 운영"],
      visual: { alt: expect.stringContaining("아키"), frameAspectRatio: "7:6" },
    });
    expect(flagshipProject.visual?.placeholderItems).toEqual([]);
    expect(flagshipProject.visual?.items).toEqual([
      expect.objectContaining({
        id: "arky-motion-tracking",
        src: expect.stringContaining("/arky/1.png"),
        alt: expect.stringContaining("관절 추적선"),
        width: 1600,
        height: 1200,
        kind: "evidence",
      }),
      expect.objectContaining({
        id: "arky-product-screens",
        src: expect.stringContaining("/arky/2.png"),
        alt: expect.stringContaining("모바일 화면 3종"),
        width: 1600,
        height: 1200,
        kind: "evidence",
      }),
      expect.objectContaining({
        id: "arky-report-sharing",
        src: expect.stringContaining("/arky/3.png"),
        alt: expect.stringContaining("수업 기록 공유"),
        width: 1600,
        height: 1200,
        kind: "evidence",
      }),
    ]);
    expect(flagshipProject.visual?.items?.every((item) => item.caption === undefined)).toBe(true);
    expect(flagshipProject.action).toContain("AI SaaS");
    expect(flagshipProject.action).toContain("자세 변화");
    expect(flagshipProject.action).toContain("강사와 회원");
    expect(flagshipProject.result).toContain("15명");
    expect(flagshipProject.result).toContain("교정 운동 전후 비교");
    expect(flagshipProject.result).toContain("1인 개발");
    expect(flagshipProject.result).toContain("회원 공유");
    expect(flagshipProject.result).toContain("SaaS");
    expect(flagshipProject.tags).toEqual(["Codex", "Supabase", "Gemini", "React"]);
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
      { target: 13, suffix: "억" },
    ]);
    expect(parseCountUpValue("검증")).toBeNull();
  });

  it("챗봇 추천 질문 8개와 경로별 후속 질문을 공개된 프로젝트·경력 근거에 연결한다", () => {
    expect(chatbotStarterQuestions.map(({ id }) => id)).toEqual([
      "arky-product",
      "nipa-vision",
      "selectstar-stt",
      "skelter-counselor",
      "syrup-operations",
      "career-fit",
      "hiring-summary",
      "collaboration-style",
    ]);
    expect(new Set(chatbotStarterQuestions.map(({ question }) => question))).toHaveProperty("size", 8);
    expect(Object.values(chatbotFollowupQuestionsByPath)).toHaveLength(9);
    expect(Object.values(chatbotFollowupQuestionsByPath).every((questions) => questions.length === 3)).toBe(true);
    const followupQuestions = Object.values(chatbotFollowupQuestionsByPath).flat();
    expect(new Set(followupQuestions.map(({ id }) => id))).toHaveProperty("size", 27);
    expect(new Set(followupQuestions.map(({ question }) => question))).toHaveProperty("size", 27);
    expect(resolveChatbotQuestionPath("아키의 베타 검증 과정을 알려줘")).toBe("arky-product");
    expect(resolveChatbotQuestionPath("NIPA Vision 프로젝트를 알려줘")).toBe("nipa-vision");
    expect(resolveChatbotQuestionPath("STT 데이터 구축 경험을 알려줘")).toBe("selectstar-stt");
    expect(resolveChatbotQuestionPath("AI 상담사 Retrieval 구조를 알려줘")).toBe("skelter-counselor");
    expect(resolveChatbotQuestionPath("STT·TTS·Retrieval 상담사 구조를 알려줘")).toBe("skelter-counselor");
    expect(resolveChatbotQuestionPath("시럽 푸시 운영 경험을 알려줘")).toBe("syrup-operations");
    expect(resolveChatbotQuestionPath("채용 담당자 관점의 핵심 근거를 알려줘")).toBe("hiring-summary");
    expect(resolveChatbotQuestionPath("이해관계자 협업 방식을 알려줘")).toBe("collaboration-style");
    expect(resolveChatbotQuestionPath("[채용 브리프 Beta] JD 적합도를 분석해줘")).toBe("jd-brief");
    expect(resolveChatbotQuestionPath("이경민의 강점을 알려줘")).toBe("career-fit");
    expect(portfolioProjects.find(({ id }) => id === "skelter-ai-counselor")).toMatchObject({
      category: "제품 기획, PoC, 사업 제휴",
      metrics: expect.arrayContaining(["PoC"]),
    });
    expect(portfolioProjects.find(({ id }) => id === "sk-planet-syrup-wallet")).toMatchObject({
      category: "서비스 운영, 푸시 광고, 운영 효율화",
      metrics: expect.arrayContaining(["제품 운영"]),
    });
    expect(portfolioProjects.find(({ id }) => id === "selectstar-stt-operations")?.result).toContain(
      "70% 이상 절감",
    );
    expect(careerExperiences.find(({ company }) => company === "GenON")?.tags).toContain(
      "B2B·B2G",
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

  it("수행 조직과 담당 업무를 퍼센트 없이 구체적으로 표시한다", () => {
    expect(
      portfolioProjects.map((project) => `${project.organizationLabel}: ${project.organization}`),
    ).toEqual([
      "수행 주체: 아키랩, FIXNESS",
      "수행 회사: GenON · NIPA 지원사업 AI 바우처",
      "수행 회사: 셀렉트스타 · LG유플러스",
      "수행 회사: 스켈터랩스 · 네오사피엔스",
      "수행 회사: SK Planet · Syrup Wallet",
    ]);
    expect(
      portfolioProjects.map((project) => `${project.involvement.label}: ${project.involvement.value}`),
    ).toEqual([
      "담당 업무: 제품 기획·개발·사업·운영 전담",
      "담당 업무: 제안서·산출물·프로젝트 관리",
      "담당 업무: 프로젝트 수행·STT 제품 기획",
      "담당 업무: 제품·대화 설계 및 제휴 주도",
      "담당 업무: 푸시 기능 기획·운영 개선",
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
        category: "제품, 베타 서비스",
        title: "운동 강사를 위한 AI 기록 솔루션",
        organization: "아키랩, FIXNESS",
        involvement: "제품 기획·개발·사업·운영 전담",
        metrics: ["제품 개발", "사업 제휴", "베타 서비스 운영"],
      },
      {
        id: "nipa-vision-ai-poc",
        category: "Vision AI · 프로젝트 관리",
        title: "AI Vision 기반 신발 아웃솔 품질 검사 효율화 프로젝트",
        organization: "GenON · NIPA 지원사업 AI 바우처",
        involvement: "제안서·산출물·프로젝트 관리",
        metrics: ["제안서 작성", "PoC·산출물 관리"],
      },
      {
        id: "selectstar-stt-operations",
        category: "AI 데이터 가공, 프로젝트 관리",
        title: "음성 전사 데이터셋 구축 프로젝트",
        organization: "셀렉트스타 · LG유플러스",
        involvement: "프로젝트 수행·STT 제품 기획",
        metrics: ["프로젝트 수행", "STT 제품 기획", "작업자 관리"],
      },
      {
        id: "skelter-ai-counselor",
        category: "제품 기획, PoC, 사업 제휴",
        title: "Retrieval 기술을 활용한 AI 상담사 PoC",
        organization: "스켈터랩스 · 네오사피엔스",
        involvement: "제품·대화 설계 및 제휴 주도",
        metrics: ["제품 기획", "사업 제휴", "PoC", "대화 데이터 제작"],
      },
      {
        id: "sk-planet-syrup-wallet",
        category: "서비스 운영, 푸시 광고, 운영 효율화",
        title: "시럽월렛 광고 운영 효율화",
        organization: "SK Planet · Syrup Wallet",
        involvement: "푸시 기능 기획·운영 개선",
        metrics: ["제품 운영", "타겟팅 기획", "운영 효율화"],
      },
    ]);

    const nipa = portfolioProjects.find(({ id }) => id === "nipa-vision-ai-poc");
    const selectstar = portfolioProjects.find(({ id }) => id === "selectstar-stt-operations");
    const skelter = portfolioProjects.find(({ id }) => id === "skelter-ai-counselor");
    const syrup = portfolioProjects.find(({ id }) => id === "sk-planet-syrup-wallet");
    expect(nipa?.challenge).toContain("작업자 편차");
    expect(nipa?.action).toContain("NIPA AI 바우처");
    expect(nipa?.result).toContain("사업비 정산");
    expect(nipa?.visual?.placeholderItems).toEqual([]);
    expect(nipa?.visual?.frameAspectRatio).toBe("7:6");
    expect(nipa?.visual?.items).toEqual([
      {
        id: "nipa-vision-ai-test-report",
        src: "/media/portfolio/pratama/1.png",
        alt: "정확도·재현율·처리 속도의 시험 결과가 적합으로 표시된 AI 바우처 시험 성적서",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
      {
        id: "nipa-vision-ai-defect-flow",
        src: "/media/portfolio/pratama/2.png",
        alt: "신발 아웃솔 이미지를 AI로 세그멘테이션해 7종 불량 유형을 구분하는 검사 흐름도",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
      {
        id: "nipa-vision-ai-inspector",
        src: "/media/portfolio/pratama/3.png",
        alt: "신발 아웃솔의 결함 위치와 검사 수량을 보여주는 AI 품질 검사 실행 화면",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
    ]);
    expect(
      portfolioProjects.flatMap((project) => project.visual?.items ?? [])
        .filter((item) => item.kind === "concept-mockup"),
    ).toHaveLength(0);
    expect(selectstar?.challenge).toContain("1000시간");
    expect(selectstar?.action).toContain("약 200명");
    expect(selectstar?.result).toContain("폐쇄망");
    expect(selectstar?.result).toContain("1/10");
    expect(selectstar?.result).toContain("70% 이상");
    expect(selectstar?.visual?.placeholderItems).toEqual([]);
    expect(selectstar?.visual?.items).toEqual([
      {
        id: "selectstar-stt-label-studio",
        src: "/media/portfolio/select/1.png",
        alt: "화자 구간을 나누고 음성을 텍스트로 전사하는 Label Studio 작업 화면",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
      {
        id: "selectstar-stt-segmentation",
        src: "/media/portfolio/select/2.png",
        alt: "음성 파형의 발화 구간을 분할해 편집하는 온라인 라벨링 작업 화면",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
      {
        id: "selectstar-stt-operation-dashboard",
        src: "/media/portfolio/select/3.png",
        alt: "전체 완료 작업량과 작업자별 누적 작업량을 보여주는 프로젝트 운영 대시보드",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
    ]);
    expect(skelter?.visual?.placeholderItems).toEqual([]);
    expect(skelter?.visual?.items).toEqual([
      {
        id: "skelter-ai-counselor-launch-article",
        src: "/media/portfolio/skelter/skel.png",
        alt: "주현영 AI 챗봇 출시를 소개하는 온라인 기사 화면",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
      {
        id: "skelter-ai-counselor-demo",
        src: "/media/portfolio/skelter/skel2.png",
        alt: "음성 질문에 답하는 디지털 휴먼 AI 상담사 데모 화면",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
      {
        id: "skelter-ai-counselor-conversation-data",
        src: "/media/portfolio/skelter/skel3.png",
        alt: "자기소개·타깃 사용자·정보성 대화 주제로 구성한 AI 상담사 대화 데이터 설계표",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
    ]);
    expect(skelter?.result).toContain("후속 사업 진행 가능성");
    expect(skelter?.tags).toEqual([]);
    expect(syrup?.action).toContain("유효 토큰");
    expect(syrup?.action).toContain("분산 발송");
    expect(syrup?.action).toContain("어드민");
    expect(syrup?.result).toContain("수신율을 2배");
    expect(syrup?.result).toContain("열람률을 1.5배");
    expect(syrup?.result).toContain("1/10");
    expect(syrup?.visual?.placeholderItems).toEqual([]);
    expect(syrup?.visual?.items).toEqual([
      {
        id: "sk-planet-syrup-push-format",
        src: "/media/portfolio/syrup/1.png",
        alt: "시럽월렛 쿠폰 목록과 이미지형·텍스트형 푸시 알림 화면 비교",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
      {
        id: "sk-planet-syrup-push-campaigns",
        src: "/media/portfolio/syrup/2.png",
        alt: "교육·생활 및 뷰티·화장품 분야 시럽월렛 푸시 메시지와 연결 페이지 집행 사례",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
      {
        id: "sk-planet-syrup-top-banner-campaigns",
        src: "/media/portfolio/syrup/3.png",
        alt: "주방가전·생활가전·화장품 분야 시럽월렛 TOP 배너와 연결 페이지 집행 사례",
        width: 1600,
        height: 1200,
        kind: "evidence",
      },
    ]);
    expect(syrup?.tags).toEqual([
      "어드민 운영",
      "내·외부 커뮤니케이션",
      "푸시 기능 고도화",
      "운영 프로세스 개선",
    ]);
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
