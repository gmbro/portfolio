export const profile = {
  name: "LEE GYEONGMIN",
  englishName: "LEE GYEONGMIN",
  role: "AI Product & Project Manager",
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
  organizationLabel: "Company" | "Owner" | "Program";
  organization: string;
  involvement: {
    label: "Contribution" | "Scope";
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
    category: "AI Product · Live Beta",
    period: "Jun 2026–Present",
    organizationLabel: "Owner",
    organization: "Arkylab",
    involvement: { label: "Scope", value: "Product strategy · MVP development" },
    title: "Building an AI product that helps fitness instructors maintain class and member records.",
    challenge:
      "Fitness instructors need a practical way to keep class notes and member status current over time.",
    action:
      "Built the MVP with Codex, structured record data in Supabase, and used it in live coaching sessions while exploring validation and partnership opportunities with CESK, FIXNESS, and HEALTHBOYGYM.",
    result: "The product is in beta, with real use informing feature and business-direction decisions.",
    metrics: ["Live beta", "Live-use validation"],
    tags: ["Codex", "Supabase", "AI Product", "MVP Validation"],
    link: {
      label: "Visit Arkylab",
      href: "https://archi.best",
    },
    visual: {
      title: "AI record product evidence",
      type: "image",
      alt: "Arkylab AI record product workflow and beta validation evidence",
      placeholderItems: ["Product screen", "Instructor workflow", "Beta learning snapshot"],
    },
  },
  {
    category: "OCR · AI-assisted Delivery",
    period: "May 2026–Present",
    organizationLabel: "Owner",
    organization: "Arkylab · Independent build",
    involvement: { label: "Contribution", value: "100%" },
    title: "Built an independent learning-tracking MVP for a reading community.",
    challenge:
      "Community participants needed a repeatable way to record learning and see their progress.",
    action:
      "Designed and built the tracker with AI-assisted development and OCR, then added gamification to support sustained participation.",
    result:
      "Delivered the solution to a Trevari-hosted reading community and prepared the next iteration for a future season and additional community use cases.",
    metrics: ["Independent end-to-end build"],
    tags: ["OCR", "AI-assisted Development", "Gamification", "MVP"],
    visual: {
      title: "Learning tracker evidence",
      type: "image",
      alt: "OCR learning tracker flow, gamification, and community use evidence",
      placeholderItems: ["OCR capture flow", "Gamification screen", "Community use snapshot"],
    },
  },
  {
    category: "Vision AI · Project Delivery",
    period: "Jun–Dec 2025",
    organizationLabel: "Program",
    organization: "NIPA-supported project",
    involvement: { label: "Scope", value: "Proposal-to-close delivery" },
    title: "Managed a Vision AI implementation from proposal through project close.",
    challenge:
      "The project aimed to improve a manual shoe-outsole quality-inspection process with Vision AI.",
    action:
      "Prepared the proposal and managed seven months of interim reports, PoC results, customer feedback, and core deliverables while coordinating the client, development team, and NIPA schedule.",
    result: "Documented the PoC results and feedback, and supported project closure and program settlement.",
    metrics: ["7-month delivery", "Proposal-to-close"],
    tags: ["Vision AI", "PoC", "Deliverables", "Stakeholder Coordination"],
    visual: {
      title: "Vision AI delivery evidence",
      type: "image",
      alt: "Vision AI inspection workflow, PoC deliverable, and project timeline",
      placeholderItems: ["Inspection workflow", "PoC deliverable", "Project timeline"],
    },
  },
  {
    category: "AI Data · Operations",
    period: "Jun 2024–Jan 2025",
    organizationLabel: "Company",
    organization: "Selectstar · Project Office",
    involvement: { label: "Contribution", value: "100%" },
    title: "Reduced both man-months and operating cost with an STT-based delivery system.",
    challenge: "Manual voice transcription required substantial staffing and repetitive work.",
    action:
      "Designed the STT transcription product and pre-/post-processing standards, added Python-assisted steps, and established the operating and quality system for approximately 200 annotators.",
    result: "Reduced man-months to roughly one tenth of the previous level and cut operating cost by 70%+.",
    metrics: ["~1/10 man-months", "70%+ lower cost", "~200 annotators"],
    tags: ["STT", "Python", "Data Delivery", "Operations Design"],
    visual: {
      title: "STT operations evidence",
      type: "image",
      alt: "STT operations workflow and verified cost and time improvements",
      placeholderItems: ["Before-and-after workflow", "Operations view", "Cost-and-time evidence"],
    },
  },
  {
    category: "AI Product · 0→1",
    period: "Sep 2021–Apr 2023",
    organizationLabel: "Company",
    organization: "Skelter Labs · Product",
    involvement: { label: "Contribution", value: "90%" },
    title: "Turned AI capabilities into a 0→1 B2C advisor PoC.",
    challenge:
      "An internal B2B chatbot engine needed to become a consumer-facing advisory experience that people could use directly.",
    action:
      "Connected STT, TTS, and Retrieval; defined the service scope and conversation flow; created the PRD, wireframes, and dialogue data; and led digital-human, TTS, and university-industry partnership work.",
    result: "Built the B2C AI advisor PoC from zero to one.",
    metrics: ["0→1 PoC"],
    tags: ["STT · TTS", "Retrieval", "Dialogue Data", "Partnerships"],
  },
  {
    category: "Large-scale Product Operations",
    period: "Apr 2018–Apr 2020",
    organizationLabel: "Company",
    organization: "SK Planet · Syrup Wallet",
    involvement: { label: "Contribution", value: "100%" },
    title: "Turned push operations for a 3.5M-MAU service into a product-improvement program.",
    challenge:
      "Push delivery needed better reach while the team also addressed server overload and repetitive manual work.",
    action:
      "Planned valid-token targeting, distributed delivery, and audience retargeting, then redesigned the operating workflow.",
    result: "Doubled the receive rate, increased the open rate by 1.5×, and reduced operating time to one tenth.",
    metrics: ["~3.5M MAU", "2× receive rate", "1/10 operating time"],
    tags: ["B2C", "Service Operations", "Targeting", "Process Improvement"],
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
    companyDesc: "Independent AI Products",
    title: "Owner",
    period: "Jun 2026–Present",
    team: "Product",
    description:
      "Building and operating AI-enabled products from problem discovery and MVP delivery through live beta validation.",
    achievements: [
      "Developing and operating an AI record-keeping solution for fitness instructors; currently in beta",
      "Building and operating an AI solution for a Trevari-hosted reading community",
      "Built and delivered a B2C legal-information and refund-support service for consumers challenging unfair policies",
    ],
    tags: ["AI Products", "MVP Delivery", "Product Operations", "B2C"],
  },
  {
    company: "GenON",
    companyDesc: "Cloud · AI Business",
    title: "Business Development",
    period: "Jan 2025–May 2026",
    team: "Business Development",
    description:
      "Led B2B and B2G business development, security-certification response, and external marketing for SaaS and cloud products entering the public market.",
    achievements: [
      "Led CSAP IaaS and SaaS audit response, including security documentation and evidence preparation",
      "Reviewed Korea ON-line E-Procurement System requirements and managed the registration process for bundled services",
      "Reduced repetitive bid-search time by 50%+ through automated notice collection and Slack alerts",
    ],
    tags: ["B2B · B2G", "SaaS", "CSAP", "Public Procurement"],
  },
  {
    company: "Selectstar",
    companyDesc: "AI Data Company",
    title: "Project Manager",
    period: "Jun 2024–Jan 2025",
    team: "Project Office",
    description: "Moved voice-transcription dataset delivery to an STT-based product and operating system.",
    achievements: [
      "Reduced man-months to roughly one tenth through STT adoption",
      "Reduced operating cost by 70%+",
      "Built the operating and data-quality system for approximately 200 annotators",
    ],
    tags: ["STT", "Data Delivery", "Python", "Operations Design"],
  },
  {
    company: "Adler",
    companyDesc: "3D Social Startup",
    title: "Product Manager",
    period: "Apr–Jun 2023",
    team: "Product",
    description:
      "Managed pre-launch planning, QA, development scheduling, and next-version UX/UI improvements for a 3D social MVP.",
    achievements: [
      "Designed the customer-support admin, reporting and blocking features, and operating workflow",
      "Produced feature specifications, requirements, and wireframes",
      "Defined company-wide WAU/DAU metrics and an engagement dashboard",
    ],
    tags: ["MVP", "QA", "Product Operations", "Metric Design"],
  },
  {
    company: "Skelter Labs",
    companyDesc: "AI Technology Company",
    title: "Product Manager",
    period: "Sep 2021–Apr 2023",
    team: "Product",
    description: "Planned a 0→1 B2C AI advisor PoC combining STT, TTS, and Retrieval.",
    achievements: [
      "Defined the service concept, feature scope, conversation flow, PRD, and wireframes",
      "Designed persona- and psychology-test-based dialogue data",
      "Led digital-human, TTS, and university-industry partnerships",
    ],
    tags: ["AI Product", "0→1", "Dialogue Data", "Partnerships"],
  },
  {
    company: "SK Planet",
    companyDesc: "Syrup Wallet",
    title: "Operations Product Manager",
    period: "Apr 2018–Apr 2020",
    team: "Syrup Wallet Operations",
    description: "Managed advertising-push operations and delivery improvements for a service with approximately 3.5M MAU.",
    achievements: [
      "Doubled the push receive rate through valid-token targeting",
      "Resolved server overload through distributed-delivery planning",
      "Increased the open rate by 1.5× and reduced operating time to one tenth through retargeting",
    ],
    tags: ["~3.5M MAU", "B2C", "Targeting", "Operations Automation"],
  },
  {
    company: "Kakao Commerce",
    companyDesc: "KakaoTalk Gift",
    title: "Performance Marketer",
    period: "May–Dec 2017",
    team: "Gift Talk Channel",
    description: "Improved targeting, messaging, and card placement using behavioral-response data.",
    achievements: [
      "Improved fashion-content card open rate by 10× through audience and copy changes",
      "Contributed to a 3× purchase-conversion improvement by restructuring Kakao Friends card placement",
      "Used click-response data to select lead products and improve seasonal promotions",
    ],
    tags: ["Commerce", "Performance Marketing", "Content", "Conversion"],
  },
];

export const aiCapabilities = [
  {
    title: "AI Product Flow Design",
    description:
      "Define where STT, TTS, Retrieval, RAG, and OCR create value, then turn that scope into a service concept, user flow, PRD, and data structure.",
    evidence: "Skelter Labs AI advisor PoC · Arkylab",
  },
  {
    title: "AI & Data Project Operations",
    description:
      "Design data standards, quality processes, schedules, and deliverables while managing execution across development teams, clients, and external contributors.",
    evidence: "Selectstar STT data · Vision AI",
  },
  {
    title: "AI-assisted MVP Validation",
    description:
      "Use Codex, Supabase, and OCR to turn ideas into working MVPs, then validate them through real use and customer response.",
    evidence: "Arkylab · Learning Tracker",
  },
];

export const verifiedSkillGroups = [
  {
    label: "AI & Data",
    items: ["STT", "TTS", "Retrieval", "RAG", "OCR", "Dialogue Data", "Python"],
  },
  {
    label: "Product Delivery",
    items: ["Product Management", "Project Management", "PRD", "Requirements", "Figma", "QA"],
  },
  {
    label: "MVP & Automation",
    items: ["Codex", "Supabase", "LangChain", "Slack Integration", "Web Automation"],
  },
  {
    label: "Commercialization",
    items: ["B2B", "B2C", "B2G", "SaaS", "CSAP", "Public Procurement", "Partnerships"],
  },
];
