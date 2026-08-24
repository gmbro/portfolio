import { portfolioProjects, type FeaturedProject } from "@/data/portfolio";

export const JINA_READER_ENDPOINT = "https://r.jina.ai/";
export const JD_READER_MAX_TOKENS = 2_500;
export const JD_FILE_MAX_BYTES = 5 * 1024 * 1024;
export const JD_TEXT_MAX_CHARACTERS = 6_500;
export const JD_URL_MAX_CHARACTERS = 2_000;
export const JD_READER_TIMEOUT_MS = 25_000;

const supportedJdFileTypes = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

const readerHeaders = {
  Accept: "text/plain",
  "x-max-tokens": String(JD_READER_MAX_TOKENS),
} as const;

const sensitiveQueryParameterNames = new Set([
  "access_token",
  "api_key",
  "apikey",
  "auth",
  "authorization",
  "email",
  "key",
  "password",
  "passwd",
  "session",
  "sig",
  "signature",
  "token",
]);

export type JdBriefErrorCode =
  | "invalid_url"
  | "unsupported_file"
  | "file_too_large"
  | "empty_file"
  | "reader_error"
  | "empty_content";

export class JdBriefError extends Error {
  readonly code: JdBriefErrorCode;

  constructor(code: JdBriefErrorCode, message: string) {
    super(message);
    this.name = "JdBriefError";
    this.code = code;
  }
}

export type JdBriefFetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export interface PublicPortfolioEvidence {
  id: string;
  title: string;
  category: string;
  period: string;
  organization: string;
  responsibility: string;
  problem: string;
  execution: string;
  outcome: string;
  metrics: string[];
  tags: string[];
}

const normalizeText = (value: string, maxCharacters: number) =>
  value
    .normalize("NFKC")
    .split(String.fromCharCode(0))
    .join("")
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .split("\n")
    .map((line) => line.replace(/[\t\f\v ]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxCharacters);

export const normalizeJdText = (value: string) =>
  normalizeText(value, JD_TEXT_MAX_CHARACTERS);

const normalizeHostname = (hostname: string) =>
  hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.+$/g, "");

const isIpAddress = (hostname: string) => {
  if (hostname.includes(":")) return true;

  const parts = hostname.split(".");
  return (
    parts.length === 4 &&
    parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255)
  );
};

/**
 * 공개 채용 공고 URL만 Jina Reader로 전달하기 위한 브라우저 측 방어선입니다.
 * 실제 서버 프록시를 추가할 경우 DNS 재바인딩과 redirect hop도 서버에서 다시 검사해야 합니다.
 */
export const validatePublicJdUrl = (input: string) => {
  let url: URL;
  const normalizedInput = input.trim();

  if (normalizedInput.length > JD_URL_MAX_CHARACTERS) {
    throw new JdBriefError("invalid_url", "채용 공고 URL은 2,000자까지 입력할 수 있습니다.");
  }

  try {
    url = new URL(normalizedInput);
  } catch {
    throw new JdBriefError("invalid_url", "유효한 공개 채용 공고 URL을 입력해 주세요.");
  }

  if (url.protocol !== "https:") {
    throw new JdBriefError("invalid_url", "HTTPS 공개 채용 공고 URL만 사용할 수 있습니다.");
  }

  if (url.username || url.password) {
    throw new JdBriefError("invalid_url", "인증 정보가 포함된 URL은 사용할 수 없습니다.");
  }

  if (url.port && url.port !== "443") {
    throw new JdBriefError("invalid_url", "표준 HTTPS 포트의 공개 URL만 사용할 수 있습니다.");
  }

  const hostname = normalizeHostname(url.hostname);
  const isLocalHostname =
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "local" ||
    hostname.endsWith(".local");

  if (!hostname || isLocalHostname || isIpAddress(hostname)) {
    throw new JdBriefError("invalid_url", "로컬 주소나 IP 주소는 사용할 수 없습니다.");
  }

  const sensitiveQueryKey = Array.from(url.searchParams.keys()).find((key) =>
    sensitiveQueryParameterNames.has(key.toLowerCase()),
  );
  if (sensitiveQueryKey) {
    throw new JdBriefError(
      "invalid_url",
      "인증·개인정보 query가 포함된 링크는 사용할 수 없습니다. 누구나 열 수 있는 공개 링크를 입력해 주세요.",
    );
  }

  url.hash = "";
  return url;
};

export const validateJdFile = (file: Pick<File, "size" | "type">) => {
  if (file.size <= 0) {
    throw new JdBriefError("empty_file", "내용이 있는 파일을 선택해 주세요.");
  }

  if (file.size > JD_FILE_MAX_BYTES) {
    throw new JdBriefError("file_too_large", "파일은 최대 5MB까지 업로드할 수 있습니다.");
  }

  if (!supportedJdFileTypes.has(file.type.toLowerCase())) {
    throw new JdBriefError(
      "unsupported_file",
      "PDF, PNG, JPEG, WebP 파일만 업로드할 수 있습니다.",
    );
  }

  return file;
};

const readSupportedJsonContent = (value: unknown): string | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const record = value as Record<string, unknown>;
  const data =
    record.data && typeof record.data === "object" && !Array.isArray(record.data)
      ? (record.data as Record<string, unknown>)
      : null;
  const candidates = [data?.content, data?.markdown, record.content, record.text];

  return candidates.find((candidate): candidate is string => typeof candidate === "string") ?? null;
};

export const parseJinaReaderResponse = async (response: Response) => {
  if (!response.ok) {
    throw new JdBriefError(
      "reader_error",
      "채용 공고를 읽지 못했습니다. 공개 URL이나 파일인지 확인해 주세요.",
    );
  }

  const rawBody = await response.text();
  let extracted = rawBody;

  try {
    const parsed = JSON.parse(rawBody) as unknown;
    extracted = readSupportedJsonContent(parsed) ?? "";
  } catch {
    // A non-JSON response is the expected Jina Reader text response.
  }

  const normalized = normalizeJdText(extracted);
  if (!normalized) {
    throw new JdBriefError("empty_content", "채용 공고 본문을 추출하지 못했습니다.");
  }

  return normalized;
};

const requestJinaReader = async (
  fetcher: JdBriefFetcher,
  input: RequestInfo | URL,
  init: RequestInit,
  externalSignal?: AbortSignal,
) => {
  const controller = new AbortController();
  const abortFromCaller = () => controller.abort();
  if (externalSignal?.aborted) controller.abort();
  else externalSignal?.addEventListener("abort", abortFromCaller, { once: true });
  const timeout = globalThis.setTimeout(() => controller.abort(), JD_READER_TIMEOUT_MS);

  try {
    return await fetcher(input, { ...init, signal: controller.signal });
  } catch (error) {
    const timedOut = controller.signal.aborted;
    throw new JdBriefError(
      "reader_error",
      timedOut
        ? "채용 공고 읽기 시간이 초과되었습니다. 파일 크기나 공개 상태를 확인해 주세요."
        : "채용 공고를 읽지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );
  } finally {
    globalThis.clearTimeout(timeout);
    externalSignal?.removeEventListener("abort", abortFromCaller);
  }
};

export const extractJdTextFromUrl = async (
  input: string,
  fetcher: JdBriefFetcher = fetch,
  signal?: AbortSignal,
) => {
  const publicUrl = validatePublicJdUrl(input);
  const response = await requestJinaReader(fetcher, `${JINA_READER_ENDPOINT}${publicUrl.href}`, {
    method: "GET",
    headers: readerHeaders,
  }, signal);

  return parseJinaReaderResponse(response);
};

export const extractJdTextFromFile = async (
  file: File,
  fetcher: JdBriefFetcher = fetch,
  signal?: AbortSignal,
) => {
  validateJdFile(file);

  const body = new FormData();
  body.append("file", file);

  const response = await requestJinaReader(fetcher, JINA_READER_ENDPOINT, {
    method: "POST",
    headers: readerHeaders,
    body,
  }, signal);

  return parseJinaReaderResponse(response);
};

const compactField = (value: string, maxCharacters: number) =>
  normalizeText(value, maxCharacters);

const toPublicEvidence = (project: FeaturedProject): PublicPortfolioEvidence => ({
  id: project.id,
  title: compactField(project.title, 100),
  category: compactField(project.category, 80),
  period: compactField(project.period, 40),
  organization: compactField(
    `${project.organizationLabel}: ${project.organization}`,
    140,
  ),
  responsibility: compactField(project.involvement.value, 140),
  problem: compactField(project.challenge, 420),
  execution: compactField(project.action, 520),
  outcome: compactField(project.result, 420),
  metrics: project.metrics.slice(0, 4).map((metric) => compactField(metric, 80)),
  tags: project.tags.slice(0, 4).map((tag) => compactField(tag, 60)),
});

/** 공개 포트폴리오에서 채용 근거 매칭에 필요한 필드만 선택합니다. */
export const getPublicPortfolioEvidence = (): PublicPortfolioEvidence[] =>
  portfolioProjects.map(toPublicEvidence);

export type JdCompetencyId =
  | "product-planning"
  | "ai-data"
  | "project-management"
  | "business-development"
  | "service-operations"
  | "marketing-growth";

export type JdCompetencyImportance = "상" | "중" | "하";

interface JdCompetencyTaxonomy {
  id: JdCompetencyId;
  label: string;
  keywords: readonly string[];
}

export interface JdProjectEvidence {
  projectId: string;
  projectTitle: string;
  organization: string;
  responsibility: string;
  matchedKeywords: string[];
  fact: string;
}

export interface JdCompetencyAnalysis {
  id: JdCompetencyId;
  label: string;
  importance: JdCompetencyImportance;
  signalKeywords: string[];
  strongEvidence: JdProjectEvidence[];
}

export interface JdPortfolioAnalysisResult {
  insufficient_signal: boolean;
  evidenceFitScore: number | null;
  scoreLabel: "근거 적합도";
  scoreFormula: string;
  requirements: JdCompetencyAnalysis[];
  evidenceGaps: string[];
  interviewQuestions: string[];
}

const jdCompetencyTaxonomy: readonly JdCompetencyTaxonomy[] = [
  {
    id: "product-planning",
    label: "제품 기획",
    keywords: [
      "제품 기획",
      "프로덕트 기획",
      "서비스 기획",
      "product manager",
      "product management",
      "product planning",
      "prd",
      "roadmap",
      "로드맵",
      "mvp",
      "poc",
      "0 to 1",
      "0→1",
      "zero to one",
      "와이어프레임",
      "wireframe",
    ],
  },
  {
    id: "ai-data",
    label: "AI·데이터",
    keywords: [
      "ai",
      "인공지능",
      "machine learning",
      "머신러닝",
      "llm",
      "생성형 ai",
      "generative ai",
      "데이터",
      "data",
      "stt",
      "tts",
      "retrieval",
      "rag",
      "vision ai",
      "computer vision",
      "python",
      "gemini",
      "mediapipe",
      "annotation",
      "어노테이터",
    ],
  },
  {
    id: "project-management",
    label: "프로젝트 관리",
    keywords: [
      "프로젝트 관리",
      "프로젝트 매니저",
      "project management",
      "project manager",
      "pmo",
      "이해관계자",
      "stakeholder",
      "일정 관리",
      "schedule management",
      "산출물",
      "deliverable",
      "리스크 관리",
      "risk management",
      "제안서",
      "중간 보고",
      "품질 관리",
      "quality management",
    ],
  },
  {
    id: "business-development",
    label: "사업 개발·B2B·B2G",
    keywords: [
      "사업 개발",
      "business development",
      "b2b",
      "b2g",
      "사업 제휴",
      "partnership",
      "파트너십",
      "제휴",
      "공공 사업",
      "public sector",
      "government",
      "saas",
      "사업화",
      "영업",
      "sales",
      "proposal",
      "고객사",
    ],
  },
  {
    id: "service-operations",
    label: "서비스 운영·효율화",
    keywords: [
      "서비스 운영",
      "제품 운영",
      "service operations",
      "product operations",
      "operations",
      "운영 효율",
      "운영 개선",
      "operational efficiency",
      "프로세스 개선",
      "process improvement",
      "어드민",
      "admin",
      "자동화",
      "automation",
      "비용 절감",
      "cost reduction",
      "대규모 운영",
    ],
  },
  {
    id: "marketing-growth",
    label: "마케팅·성장",
    keywords: [
      "마케팅",
      "marketing",
      "growth",
      "그로스",
      "광고",
      "advertising",
      "campaign",
      "캠페인",
      "퍼포먼스 마케팅",
      "performance marketing",
      "전환율",
      "conversion rate",
      "ctr",
      "retention",
      "리텐션",
      "mau",
      "푸시",
      "push",
      "타겟팅",
      "targeting",
    ],
  },
] as const;

const MINIMUM_JD_SIGNALS = 2;
const MINIMUM_STRONG_EVIDENCE_SIGNALS = 2;
const EVIDENCE_COVERAGE_SIGNAL_TARGET = 3;
const MAX_REQUIREMENTS = 5;
const MAX_STRONG_EVIDENCE_PER_REQUIREMENT = 2;

const importanceWeight: Record<JdCompetencyImportance, number> = {
  상: 3,
  중: 2,
  하: 1,
};

export const JD_EVIDENCE_FIT_FORMULA =
  "근거 적합도 = 반올림(100 × Σ(중요도 가중치 × 분류별 공개 근거 커버리지) ÷ Σ중요도 가중치). 중요도 가중치는 상=3·중=2·하=1이고, 공개 프로젝트에서 관련 신호가 2개 이상 확인된 경우만 강한 근거로 인정하며, 커버리지는 min(최대 근거 신호 수, 3) ÷ 3입니다.";

const escapeRegularExpression = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const containsKeyword = (text: string, keyword: string) => {
  const normalizedKeyword = keyword.toLowerCase();
  const isAsciiKeyword = /^[a-z0-9+#.\- ]+$/.test(normalizedKeyword);

  if (!isAsciiKeyword) return text.includes(normalizedKeyword);

  const escaped = escapeRegularExpression(normalizedKeyword).replace(/\\ /g, "\\s+");
  return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`, "i").test(text);
};

const matchedKeywordsFor = (text: string, taxonomy: JdCompetencyTaxonomy) =>
  taxonomy.keywords.filter((keyword) => containsKeyword(text, keyword));

const highImportanceContext =
  /(필수|자격[\s·]*요건|주요[\s·]*업무|핵심[\s·]*역량|must|required|requirements?|responsibilit(?:y|ies))/i;
const preferredContext = /(우대|preferred|nice[ -]to[ -]have|plus)/i;

const resolveImportance = (
  jdText: string,
  taxonomy: JdCompetencyTaxonomy,
  signals: readonly string[],
): JdCompetencyImportance => {
  const contexts = jdText.split(/[\n.!?。]+/).filter(Boolean);
  const appearsInContext = (pattern: RegExp) =>
    contexts.some(
      (context) =>
        pattern.test(context) &&
        taxonomy.keywords.some((keyword) => containsKeyword(context, keyword)),
    );

  if (appearsInContext(highImportanceContext) || signals.length >= 4) return "상";
  if (appearsInContext(preferredContext) || signals.length >= 2) return "중";
  return "하";
};

const searchableProjectText = (project: PublicPortfolioEvidence) =>
  [
    project.title,
    project.category,
    project.period,
    project.organization,
    project.responsibility,
    project.problem,
    project.execution,
    project.outcome,
    ...project.metrics,
    ...project.tags,
  ]
    .join("\n")
    .toLowerCase();

const evidenceFactFor = (
  project: PublicPortfolioEvidence,
  matchedKeywords: readonly string[],
) =>
  [project.outcome, project.execution, project.problem].find((fact) =>
    matchedKeywords.some((keyword) => containsKeyword(fact.toLowerCase(), keyword)),
  ) ?? project.outcome;

const strongEvidenceFor = (
  taxonomy: JdCompetencyTaxonomy,
  projects: readonly PublicPortfolioEvidence[],
) =>
  projects
    .map((project, projectIndex) => {
      const matchedKeywords = matchedKeywordsFor(searchableProjectText(project), taxonomy);
      return {
        projectIndex,
        matchedKeywords,
        evidence: {
          projectId: project.id,
          projectTitle: project.title,
          organization: project.organization,
          responsibility: project.responsibility,
          matchedKeywords: matchedKeywords.slice(0, 6),
          fact: evidenceFactFor(project, matchedKeywords),
        } satisfies JdProjectEvidence,
      };
    })
    .filter(({ matchedKeywords }) => matchedKeywords.length >= MINIMUM_STRONG_EVIDENCE_SIGNALS)
    .sort(
      (left, right) =>
        right.matchedKeywords.length - left.matchedKeywords.length ||
        left.projectIndex - right.projectIndex,
    )
    .slice(0, MAX_STRONG_EVIDENCE_PER_REQUIREMENT)
    .map(({ evidence }) => evidence);

const genericInsufficientSignalQuestions = [
  "이 역할에서 가장 중요한 업무 세 가지와 각각의 성공 기준은 무엇인가요?",
  "필수 역량과 입사 후 학습해도 되는 역량을 어떻게 구분하나요?",
  "후보자의 프로젝트 경험에서 반드시 확인할 책임 범위와 성과 지표는 무엇인가요?",
];

const buildInterviewQuestions = (requirements: readonly JdCompetencyAnalysis[]) => {
  const questions: string[] = [];

  requirements.forEach((requirement) => {
    if (questions.length >= 2) return;
    const evidence = requirement.strongEvidence[0];
    if (!evidence) return;
    questions.push(
      `${evidence.projectTitle}에서 ${requirement.label}과 관련해 직접 결정한 범위와 협업 경계를 설명해 주세요.`,
    );
  });

  const gap = requirements.find(({ strongEvidence }) => strongEvidence.length === 0);
  if (gap) {
    questions.push(
      `${gap.label}은 공개 근거가 비어 있습니다. 관련 경험이 있다면 역할·행동·결과로 설명해 주세요.`,
    );
  }

  const firstEvidence = requirements.flatMap(({ strongEvidence }) => strongEvidence)[0];
  if (questions.length < 3 && firstEvidence) {
    questions.push(
      `${firstEvidence.projectTitle}의 공개 성과에서 본인의 기여와 팀의 기여를 어떻게 구분해 검증했나요?`,
    );
  }

  if (questions.length < 3 && requirements[0]) {
    questions.push(
      `${requirements[0].label} 경험을 새로운 도메인에 적용할 때 먼저 검증할 가설과 지표는 무엇인가요?`,
    );
  }

  genericInsufficientSignalQuestions.forEach((question) => {
    if (questions.length < 3) questions.push(question);
  });

  return questions.slice(0, 3);
};

/**
 * 사용자 JD를 저장하거나 외부 분석 이벤트로 전송하지 않는 브라우저 내 결정론적 분석입니다.
 * 점수는 사람이나 채용 가능성의 평가가 아니라 공개 프로젝트가 JD 신호를 덮는 비율입니다.
 */
export const analyzeJdAgainstPortfolio = (jdText: string): JdPortfolioAnalysisResult => {
  const normalizedJd = normalizeJdText(jdText).toLowerCase();
  const detected = jdCompetencyTaxonomy
    .map((taxonomy, taxonomyIndex) => {
      const signalKeywords = matchedKeywordsFor(normalizedJd, taxonomy);
      return {
        taxonomy,
        taxonomyIndex,
        signalKeywords,
        importance: resolveImportance(normalizedJd, taxonomy, signalKeywords),
      };
    })
    .filter(({ signalKeywords }) => signalKeywords.length > 0)
    .sort(
      (left, right) =>
        importanceWeight[right.importance] - importanceWeight[left.importance] ||
        right.signalKeywords.length - left.signalKeywords.length ||
        left.taxonomyIndex - right.taxonomyIndex,
    )
    .slice(0, MAX_REQUIREMENTS);

  const totalSignalCount = detected.reduce(
    (total, { signalKeywords }) => total + signalKeywords.length,
    0,
  );
  const insufficientSignal = totalSignalCount < MINIMUM_JD_SIGNALS;
  const publicProjects = getPublicPortfolioEvidence();
  const requirements: JdCompetencyAnalysis[] = detected
    .map(({ taxonomy, signalKeywords, importance }) => ({
      id: taxonomy.id,
      label: taxonomy.label,
      importance,
      signalKeywords: [...signalKeywords],
      strongEvidence: strongEvidenceFor(taxonomy, publicProjects),
    }))
    .sort(
      (left, right) =>
        Number(right.strongEvidence.length > 0) - Number(left.strongEvidence.length > 0) ||
        importanceWeight[right.importance] - importanceWeight[left.importance] ||
        Math.max(0, ...right.strongEvidence.map(({ matchedKeywords }) => matchedKeywords.length)) -
          Math.max(0, ...left.strongEvidence.map(({ matchedKeywords }) => matchedKeywords.length)),
    );

  if (insufficientSignal) {
    return {
      insufficient_signal: true,
      evidenceFitScore: null,
      scoreLabel: "근거 적합도",
      scoreFormula: JD_EVIDENCE_FIT_FORMULA,
      requirements,
      evidenceGaps: ["요구 역량을 판별할 JD 신호가 부족합니다."],
      interviewQuestions: [...genericInsufficientSignalQuestions],
    };
  }

  const totalWeight = requirements.reduce(
    (total, requirement) => total + importanceWeight[requirement.importance],
    0,
  );
  const weightedCoverage = requirements.reduce((total, requirement) => {
    const maximumEvidenceSignals = Math.max(
      0,
      ...requirement.strongEvidence.map(({ matchedKeywords }) => matchedKeywords.length),
    );
    const coverage =
      maximumEvidenceSignals >= MINIMUM_STRONG_EVIDENCE_SIGNALS
        ? Math.min(maximumEvidenceSignals, EVIDENCE_COVERAGE_SIGNAL_TARGET) /
          EVIDENCE_COVERAGE_SIGNAL_TARGET
        : 0;
    return total + importanceWeight[requirement.importance] * coverage;
  }, 0);
  const evidenceFitScore =
    totalWeight > 0 ? Math.round((100 * weightedCoverage) / totalWeight) : 0;

  return {
    insufficient_signal: false,
    evidenceFitScore,
    scoreLabel: "근거 적합도",
    scoreFormula: JD_EVIDENCE_FIT_FORMULA,
    requirements,
    evidenceGaps: requirements
      .filter(({ strongEvidence }) => strongEvidence.length === 0)
      .map(({ label }) => `${label}: 공개 포트폴리오에서 강한 근거를 확인하지 못했습니다.`),
    interviewQuestions: buildInterviewQuestions(requirements),
  };
};

export const buildJdFollowupQuestion = (result: JdPortfolioAnalysisResult) => {
  if (result.insufficient_signal || result.requirements.length === 0) {
    return "이경민의 공개 포트폴리오에서 대표 프로젝트와 담당 업무를 검증된 사실만 사용해 설명해줘. 확인할 수 없는 부분은 근거가 없다고 말해줘.";
  }

  const competencies = result.requirements
    .slice(0, 3)
    .map(({ label }) => label)
    .join(", ");
  const projectTitles = Array.from(
    new Set(
      result.requirements.flatMap(({ strongEvidence }) =>
        strongEvidence.map(({ projectTitle }) => projectTitle),
      ),
    ),
  )
    .slice(0, 2)
    .join(", ");
  const projectClause = projectTitles
    ? `${projectTitles}를 공개 근거로`
    : "공개 포트폴리오 프로젝트를 확인해";
  const question = `이경민의 공개 포트폴리오에서 ${competencies} 역량을 확인하고 싶습니다. ${projectClause} 관련 경험과 담당 업무를 검증된 사실만 사용해 설명해줘. 근거가 없는 부분은 공백으로 표시해줘.`;

  return question.length <= 500 ? question : `${question.slice(0, 499)}…`;
};

export const validateJdUrl = validatePublicJdUrl;
export const fetchJdFromUrl = extractJdTextFromUrl;
export const fetchJdFromFile = extractJdTextFromFile;
