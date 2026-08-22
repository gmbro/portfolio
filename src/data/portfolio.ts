export const profile = {
  name: "이경민",
  englishName: "Kyoungmin Lee",
  role: "AI Product Manager",
  email: "gmbro7942@gmail.com",
  linkedin: "https://www.linkedin.com/in/gmbro",
};

export type ProjectVisualType = "image" | "video";

export interface FeaturedProjectVisualItem {
  id?: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface FeaturedProjectVisual {
  title: string;
  type: ProjectVisualType;
  src?: string;
  items?: readonly FeaturedProjectVisualItem[];
  poster?: string;
  alt: string;
  caption?: string;
  placeholderItems: string[];
}

export interface FeaturedProject {
  id: string;
  category: string;
  period: string;
  organizationLabel: "수행 회사" | "수행 주체" | "지원 사업";
  organization: string;
  involvement: {
    label: "담당 책임";
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

export const flagshipProject: FeaturedProject = {
  id: "arkylab-ai-coach",
  category: "아키 · 실사용 베타",
  period: "2026.06–진행 중",
  organizationLabel: "수행 주체",
  organization: "아키랩",
  involvement: { label: "담당 책임", value: "제품 기획·개발·사업·운영 전담" },
  title: "운동 강사를 위한 AI 기록 솔루션",
  challenge:
    "운동 강사의 수업 기록이 파편화되고 휘발되며, 수업 내용이 회원에게 공유되지 않아 강사의 전문성을 입증하는 데 한계가 발생합니다.",
  action:
    "Gemini API와 MediaPipe의 33개 관절 추적 기술을 결합해 수업 기록 환경을 구축했습니다. 강사의 음성 큐잉(Voice)을 텍스트로 변환한 데이터와 회원의 동작 변화(Vision)를 실시간으로 동기화하고, AI 기반 요약·분석 기능을 구현해 복잡한 운동 현장에서도 빠르게 기록하고 공유할 수 있도록 했습니다.",
  result:
    "2026년 6월부터 개발을 시작해 2026년 8월 기준 운동 강사 15명의 피드백으로 기능을 고도화하고 있습니다. 교정 운동 전후 비교 기능에 대한 수요를 확인했으며, 상용화 단계의 수익 가능성을 검증하고 있습니다.",
  metrics: ["베타 참여자 15명", "2026.06–진행 중", "제품 전 과정 1인 전담"],
  tags: ["Codex", "Supabase", "바이브코딩", "베타 검증"],
  link: {
    label: "아키 베타 보기",
    href: "https://archi.best",
  },
  visual: {
    title: "아키 제품 자료",
    type: "image",
    alt: "아키 AI 기록 제품의 사용 흐름과 베타 검증 자료",
    items: [
      {
        id: "arky-product-flow",
        src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/arky1.png",
        alt: "아키 로그인, 수업 캘린더와 AI 수업 기록 상세 화면",
        width: 1809,
        height: 1311,
      },
      {
        id: "arky-recording-proof",
        src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/arky2.png",
        alt: "모바일에서 아키 수업 기록 영상을 확인하는 사용 장면과 기록 시간·공유·보관 안내",
        width: 1355,
        height: 1311,
      },
      {
        id: "arky-user-manual",
        src: "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/arky3.png",
        alt: "회원가입부터 수업 기록·공유·설정까지 정리한 아키 이용 매뉴얼",
        width: 1784,
        height: 1311,
      },
    ],
    placeholderItems: [],
  },
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "nipa-vision-ai-poc",
    category: "Vision AI · 프로젝트 관리",
    period: "2025.06–2025.12",
    organizationLabel: "수행 회사",
    organization: "GenON · NIPA 지원사업 AI 바우처",
    involvement: { label: "담당 책임", value: "제안서·산출물·프로젝트 관리" },
    title: "Vision AI를 활용한 신발 아웃솔 품질 검사 효율화 프로젝트",
    challenge: "신발 아웃솔의 수작업 품질 검사 공정을 Vision AI로 개선해야 했습니다.",
    action:
      "제안서를 작성하고 7개월간 중간 보고, PoC 결과, 고객 피드백과 주요 산출물을 관리했습니다. 수요 기업·내부 개발팀·NIPA 사이의 커뮤니케이션을 조율했습니다.",
    result: "PoC 결과와 고객 피드백을 문서화하고 프로젝트 종결과 사업 정산을 지원했습니다.",
    metrics: ["7개월 수행", "PoC·산출물 관리"],
    tags: ["Vision AI", "PoC", "산출물 관리", "이해관계자 조율"],
    visual: {
      title: "Vision AI 수행 자료",
      type: "image",
      alt: "Vision AI 검사 흐름과 PoC 산출물 및 이해관계자 조율 자료",
      placeholderItems: ["검사 프로세스", "PoC 산출물", "이해관계자 흐름"],
    },
  },
  {
    id: "selectstar-stt-operations",
    category: "AI 데이터 가공",
    period: "2024.06–2025.01",
    organizationLabel: "수행 회사",
    organization: "셀렉터스타 · LG유플러스",
    involvement: { label: "담당 책임", value: "프로젝트 수행·STT 제품 기획" },
    title: "음성 전사 데이터셋 구축 프로젝트",
    challenge: "수작업 중심의 음성 전사 과정에는 많은 인력과 반복 작업이 필요했습니다.",
    action:
      "STT 전사 제품과 전처리·후처리 기준을 기획하고 Python 기반 작업을 추가했습니다. 약 200명의 어노테이터 운영 및 품질 관리 체계도 구축했습니다.",
    result: "필요 맨먼스를 기존의 약 1/10로 줄이고 운영 원가를 70% 이상 절감했습니다.",
    metrics: ["맨먼스 약 1/10", "운영 원가 70%+ 절감", "수행사 커뮤니케이션"],
    tags: ["STT", "Python", "데이터 구축", "운영 설계"],
    visual: {
      title: "STT 운영 개선 자료",
      type: "image",
      alt: "STT 운영 전후 흐름과 검증된 비용 및 시간 개선 자료",
      placeholderItems: ["개선 전후 프로세스", "운영 화면", "비용·시간 개선 자료"],
    },
  },
  {
    id: "skelter-ai-counselor",
    category: "Product 0 to 1",
    period: "2021.09–2023.04",
    organizationLabel: "수행 회사",
    organization: "스켈터랩스 · 네오사피엔스",
    involvement: { label: "담당 책임", value: "제품·대화 설계 및 제휴 주도" },
    title: "Retrieval 기술을 활용한 AI 상담사 PoC",
    challenge: "사내 B2B 챗봇 엔진을 사용자가 직접 경험할 수 있는 B2C 상담 서비스로 확장해야 했습니다.",
    action:
      "STT·TTS·Retrieval을 연결하고 서비스 범위, 대화 흐름, PRD, 와이어프레임과 대화 데이터를 설계했습니다. 디지털 휴먼·TTS 제휴와 대학 산학협력도 주도했습니다.",
    result: "B2C AI 상담사 PoC를 0에서 1까지 구축해 고객사와의 사업 제휴를 이끌어냈습니다.",
    metrics: ["제품 기획", "사업 제휴", "PoC", "챗봇"],
    tags: ["STT · TTS", "Retrieval", "대화 데이터", "사업 제휴"],
    visual: {
      title: "AI 상담사 PoC 자료",
      type: "image",
      alt: "B2C AI 상담사 PoC의 PRD와 대화 흐름 및 제휴 범위 자료",
      placeholderItems: ["PRD", "대화 흐름", "PoC"],
    },
  },
  {
    id: "sk-planet-syrup-wallet",
    category: "350만 MAU 제품 광고 운영",
    period: "2018.04–2020.04",
    organizationLabel: "수행 회사",
    organization: "SK Planet · Syrup Wallet",
    involvement: { label: "담당 책임", value: "푸시 기능 기획·운영 개선" },
    title: "시럽월렛 광고 운영",
    challenge: "광고 푸시의 낮은 수신 효율과 서버 과부하, 반복적인 수작업 운영을 함께 개선해야 했습니다.",
    action:
      "낮은 수신 효율을 개선하기 위해 유효 토큰 타기팅과 서버 과부하를 예방하는 분산 발송 기능을 기획했습니다. 반복적인 수작업을 없애기 위해 광고팀이 직접 에셋을 등록할 수 있는 어드민 기능을 추가해 운영 프로세스 개선을 주도했습니다.",
    result: "수신율을 2배, 열람률을 1.5배 높이고 운영 시간을 기존의 1/10 수준으로 단축했습니다.",
    metrics: ["제품 운영", "타겟팅 기획", "운영 효율화"],
    tags: ["B2C", "서비스 운영", "푸시 기능 개선", "프로세스 운영 개선"],
    visual: {
      title: "대규모 제품 운영 자료",
      type: "image",
      alt: "대규모 제품의 푸시 운영 전후 흐름과 타기팅 및 분산 발송 구조 자료",
      placeholderItems: ["푸시 운영 전후 흐름", "타기팅·분산 발송 구조", "성과 지표 산식"],
    },
  },
];

export const portfolioProjects: FeaturedProject[] = [flagshipProject, ...featuredProjects];

export interface CareerExperience {
  company: string;
  companyDesc: string;
  title: string;
  period: string;
  duration: string;
  team: string;
  description: string;
  achievements: string[];
  tags: string[];
}

export const careerExperiences: CareerExperience[] = [
  {
    company: "아키랩",
    companyDesc: "AI 제품 개발·운영",
    title: "대표",
    period: "2026.06–진행 중",
    duration: "3개월",
    team: "",
    description: "1인 사업자로 헬스케어·커뮤니티·법률 서비스를 개발해 운영하고 있습니다.",
    achievements: [
      "운동 강사를 위한 AI 기록 서비스 아키, 2026.06부터 참여자 15명과 베타 진행 중",
      "트레바리 독서 커뮤니티를 위한 AI 솔루션 제작 및 운영",
      "부당한 정책에 대해 환불받을 수 있도록 지원하는 B2C 법률 서비스 제작 및 납품",
    ],
    tags: ["AI 제품", "MVP 구축", "제품 운영", "B2C"],
  },
  {
    company: "GenON",
    companyDesc: "클라우드 · AI 사업",
    title: "프로.사업개발",
    period: "2025.01–2026.05",
    duration: "1년 6개월",
    team: "",
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
    companyDesc: "AI 데이터 가공",
    title: "프로젝트 매니저",
    period: "2024.06–2025.01",
    duration: "7개월",
    team: "프로젝트실",
    description: "음성 전사 데이터셋 구축 프로젝트를 수행하며 STT 제품 개발을 주도했습니다.",
    achievements: [
      "STT 도입으로 맨먼스를 기존의 약 1/10 수준으로 단축",
      "기존 운영 원가 대비 70% 이상 절감",
      "약 200명의 어노테이터 운영 및 데이터 품질 관리 체계 구축",
    ],
    tags: ["STT", "데이터 구축", "Python", "운영 설계"],
  },
  {
    company: "Skelter Labs",
    companyDesc: "B2B AI 챗봇 사업",
    title: "프로덕트 매니저",
    period: "2021.09–2023.04",
    duration: "1년 7개월",
    team: "제품팀",
    description:
      "STT·TTS·Retrieval을 결합한 B2C AI 상담사 PoC의 제품·대화 설계와 사업 제휴를 담당했습니다.",
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
    title: "운영 매니저",
    period: "2018.04–2020.04",
    duration: "2년",
    team: "서비스 운영팀",
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
    duration: "7개월",
    team: "선물하기팀",
    description:
      "선물하기 톡채널의 광고 발송을 운영하고 사용자 데이터를 활용해 클릭 전환율을 개선하는 업무를 담당했습니다.",
    achievements: [
      "패션 콘텐츠 타깃·문구 개선으로 카드 열람률 10배 향상",
      "카카오프렌즈 카드 노출 구조 재구성으로 구매전환율 3배 향상에 기여",
      "클릭 반응률을 기준으로 대표 상품을 선정하고 시즌 프로모션 개선",
    ],
    tags: ["커머스", "퍼포먼스 마케팅", "콘텐츠", "전환 개선"],
  },
];
