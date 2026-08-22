export const chatbotAvatar =
  "https://s3.typebotstorage.com/public/workspaces/cmsodqtlt00000ajdy01a2oa5/typebots/cmsodrpss000004ji0579oaia/bubble-icon?v=1786441335928";

export const chatbotGuide = {
  title: "이경민 AI",
  intro:
    "궁금한 역량을 선택하거나 직접 질문해 주세요. 확인된 경력·프로젝트를 기준으로 답합니다.",
  privacy:
    "질문은 답변을 위해 Typebot으로 전송됩니다. 이름·이메일·회사 내부 정보·비공개 채용 정보는 입력하지 마세요.",
  placeholder: "경력·프로젝트를 물어보세요",
  loading: "대화를 연결하는 중…",
  loadError: "챗봇을 연결하지 못했습니다. 다시 시도해 주세요.",
} as const;

export const chatbotStarterQuestions = [
  {
    id: "zero-to-one",
    label: "AI 제품 0→1 경험",
    question: "AI 제품 0→1 경험을 보여줘.",
  },
  {
    id: "large-scale-operations",
    label: "대규모 제품 운영 성과",
    question: "대규모 제품을 운영하며 만든 성과를 알려줘.",
  },
  {
    id: "data-operations",
    label: "데이터·운영 개선 사례",
    question: "데이터와 운영 구조를 개선한 사례를 알려줘.",
  },
  {
    id: "b2b-b2g",
    label: "B2B·B2G 사업화 경험",
    question: "GenON의 B2B·B2G 사업화 경험을 알려줘.",
  },
] as const;

export const chatbotFollowupQuestions = [
  {
    id: "followup-zero-to-one",
    label: "AI 제품 0→1 경험을 더 보여줘.",
    question: "AI 제품 0→1 경험을 더 보여줘.",
  },
  {
    id: "followup-data-operations",
    label: "데이터·운영 개선 성과를 알려줘.",
    question: "데이터와 운영 구조를 개선한 성과를 알려줘.",
  },
  {
    id: "followup-business",
    label: "B2B·B2G 사업화 역할을 알려줘.",
    question: "GenON에서 맡은 B2B·B2G 사업화 역할을 알려줘.",
  },
] as const;

export const validateChatbotQuestion = (value: string) => {
  const question = value.trim();

  if (question.length < 2) {
    return { question, error: "질문을 2자 이상 입력해 주세요." } as const;
  }

  if (question.length > 500) {
    return { question, error: "질문은 500자까지 입력할 수 있습니다." } as const;
  }

  return { question, error: "" } as const;
};
