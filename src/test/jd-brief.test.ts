import { afterEach, describe, expect, it, vi } from "vitest";
import { portfolioProjects } from "@/data/portfolio";
import {
  JD_FILE_MAX_BYTES,
  JD_URL_MAX_CHARACTERS,
  JD_TEXT_MAX_CHARACTERS,
  JD_EVIDENCE_FIT_FORMULA,
  JdBriefError,
  analyzeJdAgainstPortfolio,
  buildJdFollowupQuestion,
  extractJdTextFromFile,
  extractJdTextFromUrl,
  getPublicPortfolioEvidence,
  normalizeJdText,
  parseJinaReaderResponse,
  validateJdFile,
  validatePublicJdUrl,
} from "@/lib/jdBrief";

const responseWith = (body: string, ok = true) =>
  ({
    ok,
    status: ok ? 200 : 422,
    text: vi.fn().mockResolvedValue(body),
  }) as unknown as Response;

describe("공개 JD URL 검증", () => {
  it("HTTPS 공개 URL을 정규화하고 fragment를 제거한다", () => {
    expect(
      validatePublicJdUrl("  https://jobs.example.com:443/positions/pm?team=ai#apply  ").href,
    ).toBe("https://jobs.example.com/positions/pm?team=ai");
  });

  it.each([
    "http://jobs.example.com/position",
    "ftp://jobs.example.com/position",
    "https://localhost/job",
    "https://preview.localhost/job",
    "https://recruit.local/job",
    "https://127.0.0.1/job",
    "https://2130706433/job",
    "https://[::1]/job",
    "https://user:password@jobs.example.com/job",
    "https://jobs.example.com:8443/job",
  ])("비공개·인증·비표준 URL을 차단한다: %s", (url) => {
    expect(() => validatePublicJdUrl(url)).toThrow(JdBriefError);
  });

  it("잘못된 URL을 안전한 오류로 거절한다", () => {
    expect(() => validatePublicJdUrl("채용 공고 링크")).toThrow(
      "유효한 공개 채용 공고 URL",
    );
  });

  it("과도하게 긴 URL을 Reader로 전달하지 않는다", () => {
    expect(() => validatePublicJdUrl(`https://jobs.example.com/${"a".repeat(JD_URL_MAX_CHARACTERS)}`))
      .toThrow("2,000자");
  });

  it.each([
    "https://jobs.example.com/position?token=secret",
    "https://jobs.example.com/position?access_token=secret",
    "https://jobs.example.com/position?email=private@example.com",
    "https://jobs.example.com/position?signature=secret",
  ])("인증·개인정보 query를 Reader로 전달하지 않는다: %s", (url) => {
    expect(() => validatePublicJdUrl(url)).toThrow("인증·개인정보 query");
  });
});

describe("브라우저 내 결정론적 JD 근거 분석", () => {
  const representativeJd = `
    주요 업무: AI 기반 B2B SaaS 제품 기획과 PRD 작성
    필수 역량: 프로젝트 관리, 이해관계자 커뮤니케이션, 데이터 기반 의사결정
    우대 사항: 사업 개발과 서비스 운영 효율화 경험
  `;

  it("한국어·영문 신호를 고정 taxonomy의 최대 5개 요구 역량으로 분석한다", () => {
    const result = analyzeJdAgainstPortfolio(representativeJd);

    expect(result.insufficient_signal).toBe(false);
    expect(result.requirements.length).toBeGreaterThan(0);
    expect(result.requirements.length).toBeLessThanOrEqual(5);
    expect(result.requirements.map(({ id }) => id)).toEqual(
      expect.arrayContaining([
        "product-planning",
        "ai-data",
        "project-management",
        "business-development",
        "service-operations",
      ]),
    );
    expect(result.requirements.find(({ id }) => id === "product-planning")).toMatchObject({
      label: "제품 기획",
      importance: "상",
      signalKeywords: expect.arrayContaining(["제품 기획", "prd"]),
    });
    expect(result.requirements.find(({ id }) => id === "business-development")?.signalKeywords).toEqual(
      expect.arrayContaining(["b2b", "saas", "사업 개발"]),
    );
  });

  it("공개 portfolioProjects의 사실과 ID만 강한 근거로 최대 2개 반환한다", () => {
    const result = analyzeJdAgainstPortfolio(representativeJd);
    const projectById = new Map(portfolioProjects.map((project) => [project.id, project]));

    result.requirements.forEach((requirement) => {
      expect(requirement.strongEvidence.length).toBeLessThanOrEqual(2);
      requirement.strongEvidence.forEach((evidence) => {
        const project = projectById.get(evidence.projectId);
        expect(project).toBeDefined();
        expect(evidence.projectTitle).toBe(project?.title);
        expect(evidence.responsibility).toBe(project?.involvement.value);
        expect([project?.challenge, project?.action, project?.result]).toContain(evidence.fact);
        expect(evidence.matchedKeywords.length).toBeGreaterThanOrEqual(2);
      });
    });

    expect(JSON.stringify(result)).not.toContain("supabase.co/storage");
  });

  it("명시된 가중 커버리지 공식으로 0~100 근거 적합도와 질문 3개를 만든다", () => {
    const result = analyzeJdAgainstPortfolio(representativeJd);

    expect(result.evidenceFitScore).not.toBeNull();
    expect(result.evidenceFitScore).toBeGreaterThanOrEqual(0);
    expect(result.evidenceFitScore).toBeLessThanOrEqual(100);
    expect(Number.isInteger(result.evidenceFitScore)).toBe(true);
    expect(result.scoreLabel).toBe("근거 적합도");
    expect(result.scoreFormula).toBe(JD_EVIDENCE_FIT_FORMULA);
    expect(result.scoreFormula).toContain("상=3·중=2·하=1");
    expect(result.scoreFormula).toContain("min(최대 근거 신호 수, 3) ÷ 3");
    expect(result.interviewQuestions).toHaveLength(3);
  });

  it.each([
    "제품 기획과 product management 경험",
    "AI data와 machine learning 활용",
    "project management와 이해관계자 관리",
    "business development와 B2G 제안",
    "service operations와 process improvement",
    "performance marketing과 conversion rate 개선",
  ])("각 taxonomy의 한국어·영문 조합을 탐지한다: %s", (jd) => {
    const result = analyzeJdAgainstPortfolio(jd);
    expect(result.insufficient_signal).toBe(false);
    expect(result.requirements[0]?.signalKeywords.length).toBeGreaterThanOrEqual(2);
  });

  it("JD 신호가 부족하면 임의 점수를 만들지 않는다", () => {
    const oneSignal = analyzeJdAgainstPortfolio("성실하게 함께 일할 동료를 찾습니다. AI 우대");
    const noSignal = analyzeJdAgainstPortfolio("함께 성장할 동료를 찾습니다.");

    expect(oneSignal).toMatchObject({
      insufficient_signal: true,
      evidenceFitScore: null,
    });
    expect(noSignal).toMatchObject({
      insufficient_signal: true,
      evidenceFitScore: null,
      requirements: [],
    });
    expect(oneSignal.evidenceGaps).toEqual(["요구 역량을 판별할 JD 신호가 부족합니다."]);
    expect(noSignal.interviewQuestions).toHaveLength(3);
  });

  it("분석 결과와 Typebot 후속 질문에 JD 원문·URL을 포함하지 않는다", () => {
    const privateMarker = "CONFIDENTIAL-JD-8472";
    const sourceUrl = "https://jobs.example.com/private-role?token=secret";
    const result = analyzeJdAgainstPortfolio(
      `${privateMarker} ${sourceUrl} 필수 제품 기획, PRD, AI, 데이터, B2B 프로젝트 관리`,
    );
    const question = buildJdFollowupQuestion(result);

    expect(JSON.stringify(result)).not.toContain(privateMarker);
    expect(JSON.stringify(result)).not.toContain(sourceUrl);
    expect(question).not.toContain(privateMarker);
    expect(question).not.toContain(sourceUrl);
    expect(question).not.toContain("jobs.example.com");
    expect(question.length).toBeLessThanOrEqual(500);
    expect(question).toContain("이경민의 공개 포트폴리오");
    expect(result.requirements.slice(0, 3).some(({ label }) => question.includes(label))).toBe(true);
  });

  it("후속 질문에는 상위 공개 프로젝트명만 최대 2개 사용한다", () => {
    const result = analyzeJdAgainstPortfolio(representativeJd);
    const question = buildJdFollowupQuestion(result);
    const mentionedProjects = portfolioProjects.filter(({ title }) => question.includes(title));

    expect(mentionedProjects.length).toBeGreaterThan(0);
    expect(mentionedProjects.length).toBeLessThanOrEqual(2);
    expect(question.length).toBeLessThanOrEqual(500);
  });

  it("신호 부족 후속 질문도 원문 없이 500자 이하의 포트폴리오 질문이다", () => {
    const result = analyzeJdAgainstPortfolio("UNIQUE-RAW-JD-TEXT");
    const question = buildJdFollowupQuestion(result);

    expect(question).not.toContain("UNIQUE-RAW-JD-TEXT");
    expect(question).toContain("대표 프로젝트");
    expect(question.length).toBeLessThanOrEqual(500);
  });
});

describe("JD 파일 검증", () => {
  it.each(["application/pdf", "image/png", "image/jpeg", "image/webp"])(
    "5MB 이하 %s 파일을 허용한다",
    (type) => {
      const file = new File([new Uint8Array(32)], "jd", { type });
      expect(validateJdFile(file)).toBe(file);
    },
  );

  it("정확히 5MB인 지원 파일을 허용한다", () => {
    const file = { size: JD_FILE_MAX_BYTES, type: "application/pdf" } as File;
    expect(validateJdFile(file)).toBe(file);
  });

  it("5MB 초과, 빈 파일, 지원하지 않는 MIME을 거절한다", () => {
    expect(() =>
      validateJdFile({ size: JD_FILE_MAX_BYTES + 1, type: "application/pdf" } as File),
    ).toThrow("최대 5MB");
    expect(() => validateJdFile({ size: 0, type: "application/pdf" } as File)).toThrow(
      "내용이 있는 파일",
    );
    expect(() => validateJdFile({ size: 100, type: "image/gif" } as File)).toThrow(
      "PDF, PNG, JPEG, WebP",
    );
  });
});

describe("Jina Reader 추출", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("URL 앞에 Reader 주소를 붙이고 제한 헤더로 GET한다", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      responseWith("  AI   Product Manager\r\n\r\n\r\n  B2B 제품 기획  "),
    );

    await expect(
      extractJdTextFromUrl("https://jobs.example.com/pm", fetcher),
    ).resolves.toBe("AI Product Manager\n\nB2B 제품 기획");
    expect(fetcher).toHaveBeenCalledWith(
      "https://r.jina.ai/https://jobs.example.com/pm",
      expect.objectContaining({
        method: "GET",
        headers: { Accept: "text/plain", "x-max-tokens": "2500" },
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("파일을 file 필드 FormData로 Reader 루트에 POST한다", async () => {
    const file = new File(["public job description"], "jd.pdf", {
      type: "application/pdf",
    });
    const fetcher = vi.fn().mockResolvedValue(responseWith("제품 기획자"));

    await expect(extractJdTextFromFile(file, fetcher)).resolves.toBe("제품 기획자");

    const [url, init] = fetcher.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://r.jina.ai/");
    expect(init).toMatchObject({
      method: "POST",
      headers: { Accept: "text/plain", "x-max-tokens": "2500" },
      signal: expect.any(AbortSignal),
    });
    expect(init.body).toBeInstanceOf(FormData);
    expect((init.body as FormData).get("file")).toBe(file);
    expect(Object.keys(init.headers as Record<string, string>)).not.toContain("Content-Type");
  });

  it.each([
    ["data.content", { data: { content: "  요구 역량  " } }, "요구 역량"],
    ["data.markdown", { data: { markdown: "  프로젝트 관리  " } }, "프로젝트 관리"],
    ["content", { content: "  AI 서비스  " }, "AI 서비스"],
    ["text", { text: "  사업 개발  " }, "사업 개발"],
  ])("JSON %s 필드의 문자열을 처리한다", async (_name, body, expected) => {
    await expect(parseJinaReaderResponse(responseWith(JSON.stringify(body)))).resolves.toBe(expected);
  });

  it("지원 필드가 없는 JSON, 빈 본문과 실패 응답을 거절한다", async () => {
    await expect(
      parseJinaReaderResponse(responseWith(JSON.stringify({ data: { title: "JD" } }))),
    ).rejects.toMatchObject({ code: "empty_content" });
    await expect(parseJinaReaderResponse(responseWith("   \n  "))).rejects.toMatchObject({
      code: "empty_content",
    });
    await expect(parseJinaReaderResponse(responseWith("provider detail", false))).rejects.toMatchObject(
      { code: "reader_error" },
    );
  });
});

describe("JD 텍스트와 공개 근거 최소화", () => {
  it("추출문을 정규화하고 6500자로 제한한다", () => {
    const source = `  첫 줄\u00a0내용 \r\n\r\n\r\n ${"가".repeat(7_000)}`;
    const normalized = normalizeJdText(source);

    expect(normalized).toHaveLength(JD_TEXT_MAX_CHARACTERS);
    expect(normalized.startsWith("첫 줄 내용\n\n")).toBe(true);
    expect(normalized).not.toContain("\r");
  });

  it("공개 프로젝트에서 필요한 필드만 압축한다", () => {
    const evidence = getPublicPortfolioEvidence();

    expect(evidence).toHaveLength(portfolioProjects.length);
    expect(evidence.map(({ id }) => id)).toEqual(portfolioProjects.map(({ id }) => id));
    expect(evidence[0]).toEqual(
      expect.objectContaining({
        id: portfolioProjects[0].id,
        title: portfolioProjects[0].title,
        responsibility: portfolioProjects[0].involvement.value,
      }),
    );
    expect(evidence[0]).not.toHaveProperty("visual");
    expect(evidence[0]).not.toHaveProperty("link");
    expect(JSON.stringify(evidence)).not.toContain("supabase.co/storage");
  });

  it("브라우저 분석은 사용자 텍스트를 저장하거나 분석 이벤트로 보내지 않는다", () => {
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");
    const gtag = vi.fn();
    Object.defineProperty(window, "gtag", {
      configurable: true,
      writable: true,
      value: gtag,
    });

    analyzeJdAgainstPortfolio("공개 채용 공고 본문 AI 제품 기획 및 B2B 경험 우대");

    expect(storageSpy).not.toHaveBeenCalled();
    expect(gtag).not.toHaveBeenCalled();
  });
});
