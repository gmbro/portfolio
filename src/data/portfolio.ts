export const profile = {
  name: "이경민",
  englishName: "LEE GYEONGMIN",
  role: "AI 프로덕트·프로젝트 매니저",
  email: "gmbro7942@gmail.com",
  linkedin: "https://www.linkedin.com/in/gmbro",
  arkylab: "https://archi.best",
};

export type ProjectVisualType = "image" | "video";

export interface FeaturedProjectVisual {
  title: string;
  type: ProjectVisualType;
  src?: string;
  poster?: string;
  alt: string;
  caption?: string;
  placeholderItems: string[];
}

export interface FeaturedProject {
  category: string;
  period: string;
  organizationLabel: "수행 회사" | "수행 주체" | "지원 사업";
  organization: string;
  involvement: {
    label: "기여도" | "역할 범위";
    value: string;
  };
  title: string;
  challenge: string;
  action: string;
  result: string;
  metrics: string[];
  tags: string[];
  link?: {
    label: string;
    href: string;
  };
  visual?: FeaturedProjectVisual;
}

export const featuredProjects: FeaturedProject[] = [
  {
    category: "AI 제품 · 실사용 베타",
    period: "2026.06–진행 중",
    organizationLabel: "수행 주체",
    organization: "Arkylab",
    involvement: { label: "역할 범위", value: "제품 기획 · MVP 개발" },
    title: "운동 강사의 수업 기록과 회원 관리를 돕는 AI 제품을 만들고 있습니다.",
    challenge: "운동 강사가 수업 기록과 회원 상태를 지속적으로 관리하기 어려운 문제를 확인했습니다.",
    action:
      "Codex로 MVP를 구현하고 Supabase로 기록 데이터를 구조화했습니다. 실제 러닝 교정 운동 수업에서 사용하며 CESK·FIXNESS·HEALTHBOYGYM과 검증 및 제휴 가능성을 논의했습니다.",
    result: "베타 서비스를 운영하며 실사용 결과를 바탕으로 기능과 사업 방향을 검증하고 있습니다.",
    metrics: ["베타 운영 중", "실사용 검증"],
    tags: ["Codex", "Supabase", "AI 제품", "MVP 검증"],
    link: {
      label: "Arkylab 보기",
      href: "https://archi.best",
    },
    visual: {
      title: "AI 기록 제품 자료",
      type: "image",
      alt: "Arkylab AI 기록 제품의 사용 흐름과 베타 검증 자료",
      placeholderItems: ["제품 화면", "운동 강사 사용 흐름", "베타 검증 결과"],
    },
  },
  {
    category: "OCR · AI 도구 기반 구현",
    period: "2026.05–진행 중",
    organizationLabel: "수행 주체",
    organization: "Arkylab · 독립 구축",
    involvement: { label: "기여도", value: "100%" },
    title: "독서 커뮤니티를 위한 학습 기록 관리 MVP를 1인 프로젝트로 구현했습니다.",
    challenge: "커뮤니티 참여자가 학습 기록을 꾸준히 남기고 성취를 확인할 수 있는 흐름이 필요했습니다.",
    action:
      "AI 도구와 OCR을 활용해 기록 도구를 기획·구현하고, 참여를 지속할 수 있도록 게이미피케이션 기능을 추가했습니다.",
    result: "트레바리 독서 커뮤니티에 솔루션을 제공했으며 다음 시즌과 다른 커뮤니티 적용을 준비하고 있습니다.",
    metrics: ["1인 기획·구현"],
    tags: ["OCR", "AI 도구 활용", "게이미피케이션", "MVP"],
    visual: {
      title: "학습 기록 관리 자료",
      type: "image",
      alt: "OCR 학습 기록 흐름과 게이미피케이션 및 커뮤니티 적용 자료",
      placeholderItems: ["OCR 기록 흐름", "게이미피케이션 화면", "커뮤니티 사용 사례"],
    },
  },
  {
    category: "Vision AI · 프로젝트 관리",
    period: "2025.06–2025.12",
    organizationLabel: "지원 사업",
    organization: "NIPA 지원 사업",
    involvement: { label: "역할 범위", value: "제안→종결 관리" },
    title: "Vision AI 도입 프로젝트를 제안부터 종결까지 관리했습니다.",
    challenge: "수작업 신발 아웃솔 품질 검사 공정을 개선하기 위한 Vision AI 사업을 수행해야 했습니다.",
    action:
      "제안서를 작성하고 7개월간 중간 보고, PoC 결과, 고객 피드백과 주요 산출물을 관리했습니다. 수요 기업·내부 개발팀·NIPA 간 커뮤니케이션을 조율했습니다.",
    result: "PoC 결과와 고객 피드백을 문서화하고 프로젝트 종결과 사업 정산을 지원했습니다.",
    metrics: ["7개월 수행", "제안→종결 관리"],
    tags: ["Vision AI", "PoC", "산출물 관리", "이해관계자 조율"],
    visual: {
      title: "Vision AI 수행 자료",
      type: "image",
      alt: "Vision AI 검사 흐름과 PoC 산출물 및 프로젝트 일정 자료",
      placeholderItems: ["검사 프로세스", "PoC 산출물", "프로젝트 일정"],
    },
  },
  {
    category: "AI 데이터 · 운영",
    period: "2024.06–2025.01",
    organizationLabel: "수행 회사",
    organization: "Selectstar · 프로젝트실",
    involvement: { label: "기여도", value: "100%" },
    title: "STT 기반 운영 구조로 맨먼스와 원가를 함께 줄였습니다.",
    challenge: "수작업 중심의 음성 전사 과정에는 많은 인력과 반복 작업이 필요했습니다.",
    action:
      "STT 전사 제품과 전처리·후처리 기준을 기획하고 Python 기반 작업을 추가했습니다. 약 200명의 어노테이터 운영 및 품질 관리 체계도 구축했습니다.",
    result: "맨먼스를 기존의 약 1/10 수준으로 단축하고 운영 원가를 70% 이상 절감했습니다.",
    metrics: ["맨먼스 약 1/10", "운영 원가 70%+ 절감", "약 200명 운영"],
    tags: ["STT", "Python", "데이터 구축", "운영 설계"],
    visual: {
      title: "STT 운영 개선 자료",
      type: "image",
      alt: "STT 운영 전후 흐름과 검증된 비용 및 시간 개선 자료",
      placeholderItems: ["개선 전후 프로세스", "운영 화면", "비용·시간 개선 자료"],
    },
  },
  {
    category: "AI 제품 · 0→1",
    period: "2021.09–2023.04",
    organizationLabel: "수행 회사",
    organization: "Skelter Labs · 제품",
    involvement: { label: "기여도", value: "90%" },
    title: "AI 기술을 B2C 상담 경험으로 전환한 0→1 PoC를 기획했습니다.",
    challenge: "사내 B2B 챗봇 엔진을 사용자가 직접 경험할 수 있는 B2C 상담 서비스로 확장해야 했습니다.",
    action:
      "STT·TTS·Retrieval을 연결하고 서비스 범위, 대화 흐름, PRD, 와이어프레임과 대화 데이터를 설계했습니다. 디지털 휴먼·TTS·대학 산학연 제휴도 주도했습니다.",
    result: "B2C AI 상담사 PoC를 0에서 1까지 구축했습니다.",
    metrics: ["0→1 PoC"],
    tags: ["STT · TTS", "Retrieval", "대화 데이터", "사업 제휴"],
  },
  {
    category: "대규모 제품 운영",
    period: "2018.04–2020.04",
    organizationLabel: "수행 회사",
    organization: "SK Planet · Syrup Wallet",
    involvement: { label: "기여도", value: "100%" },
    title: "350만 MAU 서비스의 푸시 운영을 제품 개선 과제로 전환했습니다.",
    challenge: "광고 푸시의 수신 효율, 서버 과부하와 반복적인 수작업 운영을 함께 개선해야 했습니다.",
    action: "유효 토큰 타기팅, 분산 발송과 사용자군 리타기팅 기능을 기획하고 운영 프로세스를 재설계했습니다.",
    result: "수신율을 2배, 열람률을 1.5배 높이고 운영 시간을 기존의 1/10 수준으로 단축했습니다.",
    metrics: ["약 350만 MAU", "수신율 2배", "운영 시간 1/10"],
    tags: ["B2C", "서비스 운영", "타기팅", "프로세스 개선"],
  },
];

export interface CareerExperience {
  company: string;
  companyDesc: string;
  title: string;
  period: string;
  team: string;
  description: string;
  achievements: string[];
  tags: string[];
}

export const careerExperiences: CareerExperience[] = [
  {
    company: "Arkylab",
    companyDesc: "AI 제품 개발·운영",
    title: "대표",
    period: "2026.06–진행 중",
    team: "제품",
    description: "문제 발굴부터 MVP 제작과 실사용 베타 검증까지 AI 기반 제품을 직접 기획·운영하고 있습니다.",
    achievements: [
      "운동 강사를 위한 AI 기록 솔루션 개발 및 운영, 베타 서비스 진행 중",
      "트레바리 독서 커뮤니티를 위한 AI 솔루션 제작 및 운영",
      "부당한 정책에 대해 환불받을 수 있도록 지원하는 B2C 법률 서비스 제작 및 납품",
    ],
    tags: ["AI 제품", "MVP 구축", "제품 운영", "B2C"],
  },
  {
    company: "GenON",
    companyDesc: "클라우드 · AI 사업",
    title: "사업개발",
    period: "2025.01–2026.05",
    team: "사업개발",
    description: "SaaS·클라우드 제품의 공공 시장 진입을 위한 B2B·B2G 사업 개발, 보안 인증 대응과 대외 마케팅을 담당했습니다.",
    achievements: [
      "CSAP IaaS·SaaS 심사 대응과 보안 문서 및 증적 자료 준비 주도",
      "나라장터 융합서비스 요건 검토와 등록 절차 관리",
      "공고 수집·Slack 알림 자동화로 반복 검색 시간 50% 이상 단축",
    ],
    tags: ["B2B · B2G", "SaaS", "CSAP", "공공조달"],
  },
  {
    company: "Selectstar",
    companyDesc: "AI 데이터 전문 기업",
    title: "프로젝트 매니저",
    period: "2024.06–2025.01",
    team: "프로젝트실",
    description: "음성 전사 데이터셋 구축을 STT 기반 제품과 운영 구조로 전환했습니다.",
    achievements: [
      "STT 도입으로 맨먼스를 기존의 약 1/10 수준으로 단축",
      "기존 운영 원가 대비 70% 이상 절감",
      "약 200명의 어노테이터 운영 및 데이터 품질 관리 체계 구축",
    ],
    tags: ["STT", "데이터 구축", "Python", "운영 설계"],
  },
  {
    company: "Adler",
    companyDesc: "3D 소셜 스타트업",
    title: "프로덕트 매니저",
    period: "2023.04–2023.06",
    team: "제품",
    description: "3D 소셜 MVP의 출시 전 기획 보완, QA와 개발 일정, 차기 버전의 UX·UI 개선을 관리했습니다.",
    achievements: [
      "CS 어드민·신고·차단 기능과 운영 프로세스 설계",
      "기능 명세서·요구사항 정의서·와이어프레임 작성",
      "WAU·DAU 기반 전사 지표와 참여도 대시보드 정의",
    ],
    tags: ["MVP", "QA", "제품 운영", "지표 설계"],
  },
  {
    company: "Skelter Labs",
    companyDesc: "AI 기술 기업",
    title: "프로덕트 매니저",
    period: "2021.09–2023.04",
    team: "제품",
    description: "STT·TTS·Retrieval을 결합한 B2C AI 상담사 PoC를 0에서 1까지 기획했습니다.",
    achievements: [
      "서비스 콘셉트·기능 범위·대화 흐름·PRD·와이어프레임 설계",
      "페르소나·심리테스트 기반 대화 데이터 기획",
      "디지털 휴먼·TTS·대학 산학연 제휴 주도",
    ],
    tags: ["AI 제품", "0→1", "대화 데이터", "사업 제휴"],
  },
  {
    company: "SK Planet",
    companyDesc: "Syrup Wallet",
    title: "운영 PM",
    period: "2018.04–2020.04",
    team: "Syrup Wallet 운영",
    description: "약 350만 MAU 규모 서비스의 광고 푸시 운영과 발송 기능 개선을 담당했습니다.",
    achievements: [
      "유효 토큰 타기팅으로 푸시 수신율 2배 향상",
      "분산 발송 기획으로 서버 과부하 해결",
      "리타기팅으로 열람률 1.5배 향상, 운영 시간 1/10 수준으로 단축",
    ],
    tags: ["약 350만 MAU", "B2C", "타기팅", "운영 자동화"],
  },
  {
    company: "Kakao Commerce",
    companyDesc: "카카오톡 선물하기",
    title: "퍼포먼스 마케터",
    period: "2017.05–2017.12",
    team: "선물하기 톡채널",
    description: "사용자 반응 데이터를 바탕으로 타깃, 메시지와 카드 노출 구조를 개선했습니다.",
    achievements: [
      "패션 콘텐츠 타깃·문구 개선으로 카드 열람률 10배 향상",
      "카카오프렌즈 카드 노출 구조 재구성으로 구매전환율 3배 향상에 기여",
      "클릭 반응률을 기준으로 대표 상품을 선정하고 시즌 프로모션 개선",
    ],
    tags: ["커머스", "퍼포먼스 마케팅", "콘텐츠", "전환 개선"],
  },
];

export const aiCapabilities = [
  {
    title: "AI 제품 흐름 설계",
    description:
      "STT·TTS·Retrieval·RAG·OCR이 가치를 만드는 지점을 정의하고 서비스 콘셉트, 사용자 흐름, PRD와 데이터 구조로 구체화합니다.",
    evidence: "Skelter Labs AI 상담사 PoC · Arkylab",
  },
  {
    title: "AI·데이터 프로젝트 운영",
    description:
      "데이터 기준, 품질 프로세스, 일정과 산출물을 설계하고 개발팀·고객·외부 작업자 사이의 실행 구조를 관리합니다.",
    evidence: "Selectstar STT 데이터 · Vision AI",
  },
  {
    title: "AI 도구 기반 MVP 검증",
    description:
      "Codex·Supabase·OCR을 활용해 아이디어를 작동하는 MVP로 구현하고 실사용과 고객 반응을 통해 검증합니다.",
    evidence: "Arkylab · 학습 기록 관리 MVP",
  },
];

export const verifiedSkillGroups = [
  {
    label: "AI · 데이터",
    items: ["STT", "TTS", "Retrieval", "RAG", "OCR", "대화 데이터", "Python"],
  },
  {
    label: "제품 · 프로젝트 실행",
    items: ["제품 관리", "프로젝트 관리", "PRD", "요구사항 정의", "Figma", "QA"],
  },
  {
    label: "MVP · 자동화",
    items: ["Codex", "Supabase", "LangChain", "Slack 연동", "웹 자동화"],
  },
  {
    label: "사업화",
    items: ["B2B", "B2C", "B2G", "SaaS", "CSAP", "공공조달", "사업 제휴"],
  },
];
