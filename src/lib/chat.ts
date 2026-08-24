import type { ChatbotQuestionPath } from "@/data/chatbot";

export const PORTFOLIO_OPEN_CHAT_EVENT = "portfolio:open-chat";

export interface PortfolioOpenChatDetail {
  trigger?: HTMLElement;
  prefill?: {
    path: ChatbotQuestionPath;
    question: string;
    questionId?: string;
  };
}

export const openPortfolioChat = (
  trigger?: HTMLElement,
  prefill?: PortfolioOpenChatDetail["prefill"],
) => {
  window.dispatchEvent(
    new CustomEvent<PortfolioOpenChatDetail>(PORTFOLIO_OPEN_CHAT_EVENT, {
      detail: { trigger, prefill },
    }),
  );
};
