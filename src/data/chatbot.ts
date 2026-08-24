export const chatbotAvatar =
  "https://s3.typebotstorage.com/public/workspaces/cmsodqtlt00000ajdy01a2oa5/typebots/cmsodrpss000004ji0579oaia/bubble-icon?v=1786441335928";

export const chatbotGuide = {
  title: "이경민 AI",
  intro:
    "궁금한 프로젝트나 역량을 선택하거나 직접 질문해 주세요. 확인된 경력·프로젝트를 기준으로 답합니다.",
  privacy:
    "질문은 답변을 위해 Typebot으로 전송됩니다. 이름·이메일·회사 내부 정보·비공개 채용 정보는 입력하지 마세요.",
  placeholder: "경력·프로젝트를 물어보세요",
  loading: "대화를 연결하는 중…",
  loadError: "챗봇을 연결하지 못했습니다. 다시 시도해 주세요.",
} as const;

export type ChatbotQuestionPath =
  | "arky-product"
  | "nipa-vision"
  | "selectstar-stt"
  | "skelter-counselor"
  | "syrup-operations"
  | "career-fit"
  | "hiring-summary"
  | "collaboration-style"
  | "jd-brief";

export type ChatAudienceMode = "recruiter" | "leader" | "partner";

export interface ChatbotAudienceMode {
  id: ChatAudienceMode;
  label: string;
  description: string;
  intro: string;
}

export const chatbotAudienceModes: readonly ChatbotAudienceMode[] = [
  {
    id: "recruiter",
    label: "채용 담당자",
    description: "경력 요약과 적합 근거",
    intro: "채용 판단에 필요한 경력 요약과 검증된 프로젝트 근거를 빠르게 찾아보세요.",
  },
  {
    id: "leader",
    label: "실무 리더",
    description: "문제·판단·실행 방식",
    intro: "프로젝트에서 어떤 문제를 정의하고 무엇을 판단·실행했는지 근거로 확인해 보세요.",
  },
  {
    id: "partner",
    label: "협업 파트너",
    description: "역할·책임·협업 방식",
    intro: "프로젝트 범위와 담당 업무, 이해관계자와 협업한 방식을 중심으로 살펴보세요.",
  },
] as const;

export interface ChatbotQuestion {
  id: string;
  label: string;
  question: string;
}

export interface ChatbotStarterQuestion extends ChatbotQuestion {
  path: ChatbotQuestionPath;
}

export const chatbotStarterQuestions: readonly ChatbotStarterQuestion[] = [
  {
    id: "arky-product",
    path: "arky-product",
    label: "아키 0→1·베타",
    question: "아키를 0→1로 기획·개발하고 베타 검증한 과정을 알려줘.",
  },
  {
    id: "nipa-vision",
    path: "nipa-vision",
    label: "Vision AI 프로젝트",
    question: "NIPA AI 바우처에서 Vision AI 품질검사 프로젝트를 어떻게 수행했는지 알려줘.",
  },
  {
    id: "selectstar-stt",
    path: "selectstar-stt",
    label: "STT 운영 효율화",
    question: "셀렉트스타에서 STT 제품과 데이터 구축 운영을 어떻게 개선했는지 알려줘.",
  },
  {
    id: "skelter-counselor",
    path: "skelter-counselor",
    label: "AI 상담사 PoC",
    question: "스켈터랩스에서 AI 상담사 PoC를 어떻게 0→1로 기획했는지 알려줘.",
  },
  {
    id: "syrup-operations",
    path: "syrup-operations",
    label: "350만 MAU 운영",
    question: "시럽월렛 350만 MAU 서비스의 광고 운영을 어떻게 개선했는지 알려줘.",
  },
  {
    id: "career-fit",
    path: "career-fit",
    label: "AI PM 커리어",
    question: "여러 직무 경험이 현재의 AI PM 역량으로 어떻게 연결되는지 알려줘.",
  },
  {
    id: "hiring-summary",
    path: "hiring-summary",
    label: "채용 판단 요약",
    question: "채용 담당자가 먼저 확인할 핵심 경력 근거와 강점을 프로젝트 기준으로 요약해줘.",
  },
  {
    id: "collaboration-style",
    path: "collaboration-style",
    label: "협업·책임 방식",
    question: "프로젝트에서 담당 범위를 정하고 이해관계자와 협업한 방식을 알려줘.",
  },
] as const;

const starterPriorityByAudience: Readonly<Record<ChatAudienceMode, readonly ChatbotQuestionPath[]>> = {
  recruiter: [
    "hiring-summary",
    "career-fit",
    "arky-product",
    "nipa-vision",
    "selectstar-stt",
    "skelter-counselor",
    "syrup-operations",
    "collaboration-style",
  ],
  leader: [
    "arky-product",
    "nipa-vision",
    "selectstar-stt",
    "skelter-counselor",
    "syrup-operations",
    "career-fit",
    "hiring-summary",
    "collaboration-style",
  ],
  partner: [
    "collaboration-style",
    "nipa-vision",
    "selectstar-stt",
    "skelter-counselor",
    "arky-product",
    "syrup-operations",
    "career-fit",
    "hiring-summary",
  ],
} as const;

export const getChatbotStarterQuestions = (audience: ChatAudienceMode) => {
  const priority = starterPriorityByAudience[audience];
  return [...chatbotStarterQuestions].sort(
    (left, right) => priority.indexOf(left.path) - priority.indexOf(right.path),
  );
};

export const chatbotFollowupQuestionsByPath: Readonly<
  Record<ChatbotQuestionPath, readonly [ChatbotQuestion, ChatbotQuestion, ChatbotQuestion]>
> = {
  "arky-product": [
    {
      id: "arky-architecture",
      label: "AI 기술 구조",
      question: "아키에 Gemini와 MediaPipe를 어떤 구조로 적용했는지 알려줘.",
    },
    {
      id: "arky-beta-feedback",
      label: "베타 피드백 반영",
      question: "운동 강사 15명의 베타 피드백으로 무엇을 바꿨는지 알려줘.",
    },
    {
      id: "arky-commercialization",
      label: "상용화 검증",
      question: "아키의 상용화 가설과 현재 검증 중인 수요를 알려줘.",
    },
  ],
  "nipa-vision": [
    {
      id: "nipa-proposal",
      label: "제안·산출물 역할",
      question: "NIPA AI 바우처 제안서와 주요 산출물에서 맡은 역할을 알려줘.",
    },
    {
      id: "nipa-stakeholders",
      label: "이해관계자 조율",
      question: "수요기업·개발팀·NIPA 이해관계자를 어떻게 조율했는지 알려줘.",
    },
    {
      id: "nipa-result",
      label: "PoC 검증·정산",
      question: "Vision AI PoC의 검증 결과와 사업 정산 경험을 알려줘.",
    },
  ],
  "selectstar-stt": [
    {
      id: "selectstar-bottleneck",
      label: "운영 병목 정의",
      question: "1000시간 음성 데이터 구축의 운영 병목을 어떻게 정의했는지 알려줘.",
    },
    {
      id: "selectstar-product",
      label: "폐쇄망 STT 기획",
      question: "폐쇄망 STT 제품의 전처리·후처리 기준을 어떻게 기획했는지 알려줘.",
    },
    {
      id: "selectstar-result",
      label: "원가 절감 성과",
      question: "맨먼스 1/10과 운영 원가 70% 절감이 가능했던 실행을 알려줘.",
    },
  ],
  "skelter-counselor": [
    {
      id: "skelter-architecture",
      label: "상담사 기술 구조",
      question: "LLM 이전에 STT·TTS·Retrieval을 어떻게 연결했는지 알려줘.",
    },
    {
      id: "skelter-design",
      label: "PRD·대화 설계",
      question: "AI 상담사의 PRD·대화 흐름·대화 데이터를 어떻게 설계했는지 알려줘.",
    },
    {
      id: "skelter-partnership",
      label: "PoC·사업 제휴",
      question: "AI 상담사 PoC 시연 이후 사업 제휴 가능성을 어떻게 만들었는지 알려줘.",
    },
  ],
  "syrup-operations": [
    {
      id: "syrup-targeting",
      label: "푸시 타겟팅",
      question: "유효 토큰 타겟팅으로 푸시 수신율을 어떻게 높였는지 알려줘.",
    },
    {
      id: "syrup-distribution",
      label: "분산 발송",
      question: "분산 발송으로 서버 과부하를 어떻게 줄였는지 알려줘.",
    },
    {
      id: "syrup-admin",
      label: "어드민·운영 개선",
      question: "광고 어드민과 운영 프로세스를 어떻게 개선했는지 알려줘.",
    },
  ],
  "career-fit": [
    {
      id: "career-generalist",
      label: "제너럴리스트 강점",
      question: "사업기획·제품기획·프로젝트 관리 경험이 어떻게 연결되는지 알려줘.",
    },
    {
      id: "career-customer-types",
      label: "고객·도메인 경험",
      question: "B2B·B2G·B2C 고객 경험에서 얻은 강점을 알려줘.",
    },
    {
      id: "career-direction",
      label: "다음 커리어 방향",
      question: "다음 조직에서 장기적으로 기여하고 싶은 문제를 알려줘.",
    },
  ],
  "hiring-summary": [
    {
      id: "hiring-strong-evidence",
      label: "가장 강한 근거",
      question: "채용 판단에서 가장 강하게 확인할 수 있는 프로젝트 근거 3가지를 알려줘.",
    },
    {
      id: "hiring-role-range",
      label: "역할 범위",
      question: "제품 기획·프로젝트 관리·사업 개발 경험이 실제 업무에서 어떻게 연결됐는지 알려줘.",
    },
    {
      id: "hiring-interview",
      label: "면접 확인 질문",
      question: "공개 포트폴리오 근거를 더 검증하기 위한 면접 질문 3가지를 제안해줘.",
    },
  ],
  "collaboration-style": [
    {
      id: "collaboration-scope",
      label: "담당 범위 설정",
      question: "프로젝트에서 본인의 담당 범위와 팀의 역할을 어떻게 구분했는지 알려줘.",
    },
    {
      id: "collaboration-stakeholders",
      label: "이해관계자 조율",
      question: "고객사·개발팀·수행기관 사이의 요구사항을 조율한 사례를 알려줘.",
    },
    {
      id: "collaboration-deliverables",
      label: "산출물·진행 관리",
      question: "제안서·PRD·보고서·운영 기준 같은 산출물을 어떻게 관리했는지 알려줘.",
    },
  ],
  "jd-brief": [
    {
      id: "jd-brief-evidence",
      label: "강한 적합 근거",
      question: "이 채용 공고에서 가장 강한 적합 근거 3가지를 경력 증거와 연결해줘.",
    },
    {
      id: "jd-brief-gaps",
      label: "보완·검증 질문",
      question: "이 채용 공고 기준으로 부족하거나 면접에서 확인할 지점을 알려줘.",
    },
    {
      id: "jd-brief-interview",
      label: "면접 브리프",
      question: "이 채용 공고와 경력을 바탕으로 면접 질문과 답변 근거를 만들어줘.",
    },
  ],
} as const;

const questionPathMatchers: readonly [ChatbotQuestionPath, RegExp][] = [
  ["jd-brief", /\[채용\s*브리프\s*Beta\]|채용\s*브리프|JD\s*적합/i],
  ["hiring-summary", /채용\s*(담당자|판단|요약)|핵심\s*경력\s*근거|강한\s*근거/i],
  ["collaboration-style", /협업|담당\s*범위|이해관계자|산출물/i],
  ["arky-product", /아키|운동\s*강사|mediapipe|gemini/i],
  ["nipa-vision", /nipa|vision|비전|아웃솔|품질\s*검사/i],
  ["skelter-counselor", /스켈터|skelter|상담사|retrieval|tts/i],
  ["selectstar-stt", /셀렉트스타|selectstar|stt|음성\s*전사|데이터\s*구축/i],
  ["syrup-operations", /시럽|syrup|350만|푸시|광고\s*운영/i],
] as const;

export const resolveChatbotQuestionPath = (question: string): ChatbotQuestionPath =>
  questionPathMatchers.find(([, matcher]) => matcher.test(question))?.[0] ?? "career-fit";

export const getChatbotFollowupQuestions = (path: ChatbotQuestionPath) =>
  chatbotFollowupQuestionsByPath[path];

export interface ChatbotEvidenceSource {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  href: `#${string}`;
}

const chatbotEvidenceSources: Readonly<Partial<Record<ChatbotQuestionPath, ChatbotEvidenceSource>>> = {
  "arky-product": {
    id: "arkylab-ai-coach",
    eyebrow: "프로젝트 출처",
    title: "운동 강사를 위한 AI 기록 솔루션",
    summary: "아키랩·FIXNESS · 제품 기획·개발·사업·운영 전담",
    href: "#arkylab-ai-coach",
  },
  "nipa-vision": {
    id: "nipa-vision-ai-poc",
    eyebrow: "프로젝트 출처",
    title: "AI Vision 기반 신발 아웃솔 품질 검사",
    summary: "GenON·NIPA AI 바우처 · 제안서·산출물·프로젝트 관리",
    href: "#nipa-vision-ai-poc",
  },
  "selectstar-stt": {
    id: "selectstar-stt-operations",
    eyebrow: "프로젝트 출처",
    title: "음성 전사 데이터셋 구축 프로젝트",
    summary: "셀렉트스타·LG유플러스 · 프로젝트 수행·STT 제품 기획",
    href: "#selectstar-stt-operations",
  },
  "skelter-counselor": {
    id: "skelter-ai-counselor",
    eyebrow: "프로젝트 출처",
    title: "Retrieval 기술을 활용한 AI 상담사 PoC",
    summary: "스켈터랩스·네오사피엔스 · 제품·대화 설계 및 제휴",
    href: "#skelter-ai-counselor",
  },
  "syrup-operations": {
    id: "sk-planet-syrup-wallet",
    eyebrow: "프로젝트 출처",
    title: "시럽월렛 광고 운영 효율화",
    summary: "SK Planet·Syrup Wallet · 푸시 기능 기획·운영 개선",
    href: "#sk-planet-syrup-wallet",
  },
  "career-fit": {
    id: "experience",
    eyebrow: "경력 출처",
    title: "Experience · 경력 타임라인",
    summary: "커머스·데이터·AI·공공 SaaS·헬스케어 경험",
    href: "#experience",
  },
  "hiring-summary": {
    id: "case-studies",
    eyebrow: "공개 근거 모음",
    title: "Projects · 검증된 프로젝트 5개",
    summary: "문제·판단·실행·성과와 증거 이미지 기준",
    href: "#case-studies",
  },
  "collaboration-style": {
    id: "case-studies",
    eyebrow: "협업 근거 모음",
    title: "Projects · 수행 회사와 담당 업무",
    summary: "프로젝트별 담당 범위와 이해관계자 조율 근거",
    href: "#case-studies",
  },
};

export const getChatbotEvidenceSource = (path: ChatbotQuestionPath) =>
  chatbotEvidenceSources[path];

const projectQuestionPathById: Readonly<Record<string, ChatbotQuestionPath>> = {
  "arkylab-ai-coach": "arky-product",
  "nipa-vision-ai-poc": "nipa-vision",
  "selectstar-stt-operations": "selectstar-stt",
  "skelter-ai-counselor": "skelter-counselor",
  "sk-planet-syrup-wallet": "syrup-operations",
};

export const getProjectChatPrompt = (projectId: string) => {
  const path = projectQuestionPathById[projectId];
  const starter = chatbotStarterQuestions.find((question) => question.path === path);
  return path && starter
    ? { path, question: starter.question, questionId: starter.id }
    : undefined;
};

export const validateChatbotQuestion = (value: string, maxLength = 500) => {
  const question = value.trim();

  if (question.length < 2) {
    return { question, error: "질문을 2자 이상 입력해 주세요." } as const;
  }

  if (question.length > maxLength) {
    return {
      question,
      error: `질문은 ${maxLength.toLocaleString("ko-KR")}자까지 입력할 수 있습니다.`,
    } as const;
  }

  return { question, error: "" } as const;
};
