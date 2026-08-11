export const profile = {
  name: "이경민",
  englishName: "LEE GYEONGMIN",
  role: "AI Product & Project Manager",
  email: "gmbro7942@gmail.com",
  linkedin: "https://www.linkedin.com/in/gmbro",
  archiLab: "http://archi.best",
};

export const educationAndCertificates = [
  {
    title: "충남대학교 지질학과·의류학과",
    sub: "지질학 주전공 · 의류학 복수전공",
    year: "2006.03–2018.02",
  },
  {
    title: "Google Project Manager Certificate",
    sub: "Google",
    year: "2025",
  },
  {
    title: "Prompt Designer 2급",
    sub: "한국지식재산서비스협회",
    year: "2024",
  },
  {
    title: "Tableau 실전교육",
    sub: "Planit",
    year: "2020",
  },
  {
    title: "R 데이터 실무 분석",
    sub: "재직자직무교육",
    year: "2018",
  },
];

export interface FeaturedProject {
  category: string;
  period: string;
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
}

export const featuredProjects: FeaturedProject[] = [
  {
    category: "AI·데이터 운영",
    period: "2024.06–2025.01",
    title: "STT 기반 운영 구조로 맨먼스와 원가를 함께 줄였습니다.",
    challenge: "수작업 중심의 음성 전사 과정은 많은 인력과 반복 작업이 필요했습니다.",
    action:
      "STT 전사 프로덕트와 전처리·후처리 기준을 기획하고, Python 보완과 약 200명 어노테이터 운영·품질 체계를 설계했습니다.",
    result: "맨먼스를 기존의 약 1/10 수준으로 단축하고 운영 원가를 70% 이상 절감했습니다.",
    metrics: ["맨먼스 1/10", "원가 70%+", "약 200명 운영"],
    tags: ["STT", "Python", "데이터 구축", "운영 프로세스"],
  },
  {
    category: "AI 서비스 기획",
    period: "2021.09–2023.04",
    title: "AI 기술을 B2C 상담 경험으로 전환한 0→1 PoC를 기획했습니다.",
    challenge: "사내 B2B 챗봇 엔진을 실제 사용자가 경험할 수 있는 B2C 상담 서비스로 확장해야 했습니다.",
    action:
      "STT·TTS·Retrieval을 연결하고 서비스 범위, 대화 흐름, PRD, 와이어프레임과 대화데이터를 설계했습니다. 디지털휴먼·TTS·대학 산학연 제휴도 주도했습니다.",
    result: "B2C AI 상담사 PoC를 0에서 1까지 구축했으며 프로젝트 기여도는 90%입니다.",
    metrics: ["0→1 PoC", "기여도 90%"],
    tags: ["STT·TTS", "Retrieval", "대화데이터", "사업 제휴"],
  },
  {
    category: "AI MVP·시장 검증",
    period: "2026.06–진행 중",
    title: "운동강사의 수업 기록과 회원 관리를 돕는 AI 서비스를 만들고 있습니다.",
    challenge: "운동강사가 수업 기록과 회원 상태를 지속적으로 관리하기 어려운 문제를 확인했습니다.",
    action:
      "Codex를 활용해 MVP를 구현하고 Supabase로 기록 데이터를 구조화했습니다. 실제 러닝 교정 수업에 적용하면서 CESK·픽스니스·헬스보이짐과 제휴 가능성을 논의하고 있습니다.",
    result: "실제 사용 사례와 고객 반응을 확인하며 기능과 사업 방향을 검증하고 있습니다.",
    metrics: ["MVP 검증 중", "실사용 적용"],
    tags: ["Codex", "Supabase", "AI 서비스", "사업 제휴"],
    link: {
      label: "ArchiLab 보기",
      href: "http://archi.best",
    },
  },
  {
    category: "OCR·바이브 코딩",
    period: "2026.05–진행 중",
    title: "독서모임을 위한 러닝 기록 트래킹 MVP를 1인 프로젝트로 구현했습니다.",
    challenge: "커뮤니티 참여자가 학습 기록을 꾸준히 남기고 성취를 확인할 수 있는 흐름이 필요했습니다.",
    action:
      "바이브 코딩과 OCR을 활용해 러닝보드를 기획·구현하고, 참여자의 흥미를 높이기 위한 게이미피케이션 기능을 구성했습니다.",
    result: "독서모임에 솔루션을 제공했으며 다음 시즌 고도화와 다른 커뮤니티 적용을 준비하고 있습니다.",
    metrics: ["1인 프로젝트", "기여도 100%"],
    tags: ["OCR", "바이브 코딩", "게이미피케이션", "MVP"],
  },
  {
    category: "Vision AI 프로젝트 관리",
    period: "2025.06–2025.12",
    title: "Vision AI 도입 프로젝트를 제안부터 종결까지 관리했습니다.",
    challenge: "수동 신발 아웃솔 품질검사 공정을 개선하기 위한 AI Vision 사업을 수행해야 했습니다.",
    action:
      "제안서를 작성하고 7개월간 중간보고, PoC 결과, 고객 피드백과 주요 산출물을 관리했습니다. 수요기업·개발팀·NIPA 사이의 일정을 조율했습니다.",
    result: "PoC 결과와 피드백을 문서화하고 프로젝트 종결과 사업 정산을 지원했습니다.",
    metrics: ["7개월 수행", "제안→종결 관리"],
    tags: ["Vision AI", "PoC", "산출물 관리", "이해관계자 조율"],
  },
  {
    category: "대규모 서비스 운영",
    period: "2018.04–2020.04",
    title: "350만 MAU 서비스의 푸시 운영을 제품 개선 과제로 바꿨습니다.",
    challenge: "광고 푸시의 낮은 수신 효율, 서버 과부하와 반복적인 수작업 운영을 함께 개선해야 했습니다.",
    action:
      "유효 토큰 타기팅, 분산 발송과 사용자군 리타기팅 기능을 기획하고 발송 프로세스를 재설계했습니다.",
    result: "수신율 2배, 열람률 1.5배를 만들고 운영 시간을 기존의 1/10 수준으로 단축했습니다.",
    metrics: ["350만 MAU", "수신율 2배", "운영 1/10"],
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
    company: "제논",
    companyDesc: "클라우드·AI 사업",
    title: "Business Development",
    period: "2025.01–2026.05",
    team: "사업개발",
    description:
      "SaaS·클라우드의 공공시장 진입을 위한 B2B·B2G 사업개발, 보안인증 대응과 대외 마케팅을 담당했습니다.",
    achievements: [
      "CSAP IaaS·SaaS 심사 대응, 보안 문서와 증적자료 준비 주도",
      "나라장터 융합서비스 요건 검토와 등록 절차 관리",
      "공고 수집·Slack 알림 자동화로 반복 검색 시간 50% 이상 단축",
    ],
    tags: ["B2B·B2G", "SaaS", "CSAP 대응", "공공조달"],
  },
  {
    company: "셀렉트스타",
    companyDesc: "AI 데이터 전문기업",
    title: "Project Manager",
    period: "2024.06–2025.01",
    team: "프로젝트실",
    description:
      "음성 전사 데이터셋 구축을 STT 기반 프로덕트와 운영 구조로 전환했습니다.",
    achievements: [
      "STT 도입으로 맨먼스를 약 1/10 수준으로 단축",
      "기존 운영 원가 대비 70% 이상 절감",
      "약 200명 어노테이터 운영과 데이터 품질 체계 구축",
    ],
    tags: ["STT", "데이터 구축", "Python", "운영 설계"],
  },
  {
    company: "아들러",
    companyDesc: "3D SNS 스타트업",
    title: "Product Manager",
    period: "2023.04–2023.06",
    team: "제품팀",
    description:
      "3D SNS MVP의 출시 전 기획 보완과 QA, 개발 일정, 차기 버전의 UX·UI 개선을 관리했습니다.",
    achievements: [
      "CS 어드민·신고·차단 기능과 운영 프로세스 설계",
      "기능명세서·요구사항정의서·와이어프레임 작성",
      "WAU·DAU 기반 Engagement 대시보드와 전사 지표 정의",
    ],
    tags: ["MVP", "QA", "제품 운영", "지표 설계"],
  },
  {
    company: "스켈터랩스",
    companyDesc: "AI 기술기업",
    title: "Product Manager",
    period: "2021.09–2023.04",
    team: "Product",
    description:
      "STT·TTS·Retrieval을 결합한 B2C AI 상담사 PoC를 0에서 1까지 기획했습니다.",
    achievements: [
      "서비스 콘셉트·기능 범위·대화 흐름·PRD·와이어프레임 설계",
      "페르소나·심리테스트 기반 대화데이터 기획",
      "디지털휴먼·TTS·대학 산학연 제휴 주도",
    ],
    tags: ["AI 서비스", "0→1", "대화데이터", "사업 제휴"],
  },
  {
    company: "SK플래닛",
    companyDesc: "시럽월렛",
    title: "Operations Product Manager",
    period: "2018.04–2020.04",
    team: "시럽월렛 운영",
    description:
      "약 350만 MAU 규모의 광고 푸시 운영과 발송 기능 개선을 담당했습니다.",
    achievements: [
      "유효 토큰 타기팅으로 푸시 수신율 2배 향상",
      "분산 발송 기획으로 서버 과부하 해결",
      "리타기팅으로 열람률 1.5배, 운영 시간 1/10 개선",
    ],
    tags: ["350만 MAU", "B2C", "타기팅", "운영 자동화"],
  },
  {
    company: "카카오커머스",
    companyDesc: "선물하기",
    title: "Performance Marketer",
    period: "2017.05–2017.12",
    team: "선물하기 톡채널",
    description:
      "사용자 반응 데이터를 바탕으로 타깃과 메시지, 카드 노출 구조를 개선했습니다.",
    achievements: [
      "패션 콘텐츠 타깃·워딩 개선으로 카드 열람률 10배 향상",
      "카카오프렌즈 카드 노출 구조 재구성으로 구매전환율 3배 향상에 기여",
      "클릭 반응률 기반 대표 상품 선정과 시즌 프로모션 개선",
    ],
    tags: ["커머스", "퍼포먼스 마케팅", "콘텐츠", "전환 개선"],
  },
];

export const aiCapabilities = [
  {
    title: "AI 서비스 흐름 설계",
    description:
      "STT·TTS·Retrieval·RAG·OCR의 활용 범위를 정의하고 서비스 콘셉트, 사용자 흐름, PRD와 데이터 구조로 구체화합니다.",
    evidence: "스켈터랩스 AI 상담사 PoC · ArchiLab",
  },
  {
    title: "AI·데이터 프로젝트 운영",
    description:
      "데이터 기준, 품질 프로세스, 일정과 산출물을 설계하고 개발팀·고객·외부 작업자 사이의 실행 구조를 관리합니다.",
    evidence: "셀렉트스타 STT 데이터 · Vision AI",
  },
  {
    title: "AI 도구 기반 MVP 검증",
    description:
      "Codex·Supabase·OCR 같은 도구를 활용해 아이디어를 빠르게 MVP로 만들고 실제 사용과 고객 반응으로 검증합니다.",
    evidence: "ArchiLab · 독서모임 러닝보드",
  },
  {
    title: "AI 신뢰성·안전성 검증",
    description:
      "Trustworthy AI와 Jailbreaking을 연구하고 RAG 챗봇을 제작했으며, 레드티밍으로 LLM의 취약점을 직접 확인했습니다.",
    evidence: "가짜연구소 · AI 레드팀 챌린지",
  },
];

export const activities = [
  {
    year: "2024",
    title: "과학기술정보통신부 AI 레드팀 챌린지",
    description: "국내 LLM을 대상으로 레드티밍을 수행해 33개 대화 시나리오 중 25개에서 공격에 성공했습니다.",
    highlight: "25 / 33",
  },
  {
    year: "2024",
    title: "가짜연구소 8기",
    description:
      "Trustworthy AI·Jailbreaking 논문을 리서치·발표하고 벨루가와 LangChain을 활용한 RAG 챗봇을 제작·시연했습니다.",
    highlight: "AI Research",
  },
  {
    year: "2018",
    title: "한국콘텐츠진흥원 챗봇 기획·개발 최우수상",
    description: "제주도 여행자의 위치를 바탕으로 주변 맛집을 추천하는 챗봇을 기획·개발했습니다.",
    highlight: "최우수상",
  },
  {
    year: "대학 연구",
    title: "R 기반 패션 콘텐츠 분석",
    description: "R을 활용한 패션 콘텐츠 분석 논문을 작성했으며 한국의류학회 초록에 등재되었습니다.",
    highlight: "R · Research",
  },
];

export const verifiedSkillGroups = [
  {
    label: "AI·데이터",
    items: ["STT", "TTS", "Retrieval", "RAG", "OCR", "대화데이터", "Python"],
  },
  {
    label: "기획·실행",
    items: ["제품 관리", "프로젝트 관리", "PRD", "요구사항정의", "Figma", "QA"],
  },
  {
    label: "MVP·자동화",
    items: ["Codex", "Supabase", "LangChain", "Slack 연동", "크롤링 자동화"],
  },
  {
    label: "사업화",
    items: ["B2B", "B2C", "B2G", "SaaS", "CSAP 대응", "공공조달", "사업 제휴"],
  },
];
