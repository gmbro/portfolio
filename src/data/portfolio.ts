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
  kind?: "evidence" | "concept-mockup";
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
  category: "제품, 베타서비스",
  period: "2026.06–진행 중",
  organizationLabel: "수행 주체",
  organization: "아키랩, FIXNESS",
  involvement: { label: "담당 책임", value: "제품 기획·개발·사업·운영 전담" },
  title: "운동 강사를 위한 AI 기록 솔루션",
  challenge:
    "운동 강사의 수업 기록은 대부분 메모, 영상, 기억에 의존해 파편화됩니다. 이로 인해 회원의 자세 변화와 운동 처방 내용을 체계적으로 관리하기 어렵고, 강사의 전문성을 데이터로 증명하는 데 한계가 있었습니다.",
  action:
    "이 문제를 해결하기 위해 운동 수업을 자동으로 기록하고 분석하는 AI SaaS를 기획·개발했습니다. 수업 중 발생하는 자세 변화, 교정 포인트, 운동 처방 내용을 하나의 기록으로 정리해 강사와 회원이 함께 확인할 수 있도록 했습니다.",
  result:
    "2026년 6월부터 1인 개발을 시작해, 2026년 8월 기준 운동 강사 15명의 피드백을 바탕으로 기능을 고도화하고 있습니다. 특히 교정운동 전후 비교, 수업 기록 자동화, 회원 공유 기능에 대한 수요를 확인했으며, 운동 강사의 전문성 기록과 회원 관리에 활용 가능한 SaaS로 상용화를 검증하고 있습니다.",
  metrics: ["제품 개발", "사업 제휴", "베타서비스 운영"],
  tags: ["Codex", "Supabase", "Gemini", "React"],
  link: {
    label: "베타서비스 보기",
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
    title: "AI Vision 기반 신발 아웃솔 품질검사 효율화 프로젝트",
    challenge:
      "신발 아웃솔 품질검사는 수작업 의존도가 높아 검수 시간과 작업자 편차를 줄이는 데 한계가 있었습니다. 따라서 주관사의 AI Vision을 활용해 불량 여부를 더 빠르고 일관되게 검토할 수 있는 구조가 필요했습니다.",
    action:
      "문제를 효과적으로 해결하기 위해 NIPA AI 바우처 사업에 지원하였습니다. 아웃솔 품질검사 공정에 AI Vision 솔루션을 적용하는 PoC 프로젝트를 수행하였고 제안서와 발표자료 작성 및 7개월간 중간보고서, PoC 결과서, 고객 피드백, 주요 산출물을 관리했습니다.",
    result:
      "PoC 결과와 고객 피드백을 문서화해 프로젝트 검증, 최종보고, 사업비 정산을 지원했습니다. 최종적으로 주관사의 AI Vision 기반 품질검사의 적용 가능성을 확인하고, 수작업 검사 공정 개선을 위한 사업 수행 경험을 확보했습니다.",
    metrics: ["제안서 작성", "PoC·산출물 관리"],
    tags: ["Vision AI", "PoC", "산출물 관리", "사업 수행"],
    visual: {
      title: "Vision AI 수행 자료",
      type: "image",
      alt: "Vision AI 검사 흐름과 PoC 산출물 및 이해관계자 조율 자료",
      items: [
        {
          id: "nipa-vision-ai-concept-mockup",
          src: "/evidence/nipa-vision-ai-poc/mockup-overview.png",
          alt: "개념 목업: AI Vision 기반 신발 아웃솔 품질검사 대시보드",
          width: 1600,
          height: 1200,
          kind: "concept-mockup",
        },
      ],
      placeholderItems: [],
    },
  },
  {
    id: "selectstar-stt-operations",
    category: "AI 데이터 가공, 프로젝트 관리",
    period: "2024.06–2025.01",
    organizationLabel: "수행 회사",
    organization: "셀렉터스타 · LG유플러스",
    involvement: { label: "담당 책임", value: "프로젝트 수행·STT 제품 기획" },
    title: "음성 전사 데이터셋 구축 프로젝트",
    challenge:
      "약 1000시간 정도의 음성 전사 데이터셋 구축 과정은 수작업 비중이 높아 많은 인력과 반복 작업이 필요합니다. 따라서 프로젝트 운영 비용을 줄이면서도 데이터 품질을 안정적으로 관리할 수 있는 프로세스가 필요했습니다.",
    action:
      "STT 전사 제품의 전처리·후처리 기준을 기획하고, Python 기반 데이터 처리 작업을 추가했습니다. 작업 기준과 프로젝트 구조를 문서화하고, 약 200명의 어노테이터 운영 및 품질 관리 체계를 구축했습니다. 내부 개발팀, 데이터 가공 인력, 고객사 사이의 커뮤니케이션을 조율하며 데이터 구축의 전과정을 주도했습니다.",
    result:
      "폐쇄망 환경에서의 STT제품 기획을 하여 필요 맨먼스를 기존 대비 약 1/10 수준으로 줄이고 운영 원가를 70% 이상 절감했습니다. STT 데이터셋 구축 프로세스를 표준화해 대규모 음성 전사 작업의 생산성과 운영 효율을 높였습니다.",
    metrics: ["프로젝트 수행", "STT 제품 기획", "작업자 관리"],
    tags: ["STT", "Python", "폐쇄망작업", "프로젝트 설계"],
    visual: {
      title: "STT 운영 개선 자료",
      type: "image",
      alt: "STT 운영 전후 흐름과 검증된 비용 및 시간 개선 자료",
      items: [
        {
          id: "selectstar-stt-concept-mockup",
          src: "/evidence/selectstar-stt-operations/mockup-overview.png",
          alt: "개념 목업: STT 데이터 전처리·후처리와 품질관리 운영 화면",
          width: 1600,
          height: 1200,
          kind: "concept-mockup",
        },
      ],
      placeholderItems: [],
    },
  },
  {
    id: "skelter-ai-counselor",
    category: "제품 기획, PoC, 사업 제휴",
    period: "2021.09–2023.04",
    organizationLabel: "수행 회사",
    organization: "스켈터랩스 · 네오사피엔스",
    involvement: { label: "담당 책임", value: "제품·대화 설계 및 제휴 주도" },
    title: "Retrieval 기술을 활용한 AI 상담사 PoC",
    challenge:
      "사내 B2B 챗봇 엔진을 사용자가 직접 경험할 수 있는 B2C 상담 서비스로 확장해야 했습니다. 기술 데모를 넘어 실제 고객 경험으로 보여줄 수 있는 AI 상담사 PoC가 필요했습니다.",
    action:
      "당시 LLM이라는 개념이 보편화되지 않았습니다. 직접 제로베이스에서 데이터가공, STT, TTS, Retrieval 기술을 연결해 사용자가 음성으로 질문하고 AI 상담사가 답변하는 서비스 구조를 기획했습니다. 서비스 범위, 대화 흐름, PRD, 와이어프레임, 페르소나·심리테스트 기반 대화 데이터를 설계했습니다. 내부 개발 부서와 요구사항을 조율하고 대화데이터 검증에 필요한 대학 산학협력 기관과의 커뮤니케이션을 주도했습니다.",
    result:
      "B2C AI 상담사 PoC를 0에서 1까지 구축하고, 기술을 고객이 직접 경험할 수 있는 서비스 형태로 구체화했습니다. 제품 PoC와 성공적으로 시연하여 외부 파트너와의 후속 사업 진행 가능성을 만들었습니다.",
    metrics: ["제품 기획", "사업 제휴", "PoC", "대화 데이터 제작"],
    tags: [],
    visual: {
      title: "AI 상담사 PoC 자료",
      type: "image",
      alt: "B2C AI 상담사 PoC의 PRD와 대화 흐름 및 제휴 범위 자료",
      items: [
        {
          id: "skelter-ai-counselor-concept-mockup",
          src: "/evidence/skelter-ai-counselor/mockup-overview.png",
          alt: "개념 목업: 음성 질의와 Retrieval 흐름을 연결한 AI 상담사 PoC 화면",
          width: 1600,
          height: 1200,
          kind: "concept-mockup",
        },
      ],
      placeholderItems: [],
    },
  },
  {
    id: "sk-planet-syrup-wallet",
    category: "서비스 운영, 푸시 광고, 운영 효율화",
    period: "2018.04–2020.04",
    organizationLabel: "수행 회사",
    organization: "SK Planet · Syrup Wallet",
    involvement: { label: "담당 책임", value: "푸시 기능 기획·운영 개선" },
    title: "시럽월렛 광고 운영 효율화",
    challenge:
      "광고 푸시 운영 과정에서 낮은 수신 효율, 서버 과부하, 반복적인 수작업 문제가 발생했습니다. 안정적인 푸시 서비스를 제공하고 광고 성과를 높이면서도 운영자가 더 적은 시간으로 안정적으로 캠페인을 관리할 수 있는 구조가 필요했습니다.",
    action:
      "낮은 수신 효율을 개선하기 위해 유효 토큰 기반 타겟팅 방식을 기획했고 서버 과부하를 줄이기 위해 푸시 분산 발송 기능을 적용했습니다. 또한 반복적인 수작업을 줄이기 위해 광고팀이 직접 광고 소재를 등록할 수 있는 어드민 기능을 추가했습니다. 즉, 운영 과정에서 발생하는 병목을 정리하고, 광고 발송·소재 등록·운영 관리 프로세스를 개선했습니다.",
    result:
      "광고 푸시 수신율을 2배, 열람률을 1.5배 높였습니다. 반복 운영 시간을 기존 대비 약 1/10 수준으로 단축해 광고 운영 효율을 크게 개선했습니다.",
    metrics: ["제품 운영", "타겟팅 기획", "운영 효율화"],
    tags: ["어드민운영", "내외부 커뮤니케이션", "푸시 기능 고도화", "운영 프로세스 개선"],
    visual: {
      title: "대규모 제품 운영 자료",
      type: "image",
      alt: "대규모 제품의 푸시 운영 전후 흐름과 타기팅 및 분산 발송 구조 자료",
      items: [
        {
          id: "sk-planet-syrup-concept-mockup",
          src: "/evidence/sk-planet-syrup-wallet/mockup-overview.png",
          alt: "개념 목업: 푸시 타겟팅·분산 발송과 광고 소재 운영 어드민 화면",
          width: 1600,
          height: 1200,
          kind: "concept-mockup",
        },
      ],
      placeholderItems: [],
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
