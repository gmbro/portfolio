export const PORTFOLIO_OPEN_CHAT_EVENT = "portfolio:open-chat";

export interface PortfolioOpenChatDetail {
  trigger?: HTMLElement;
}

export const openPortfolioChat = (trigger?: HTMLElement) => {
  window.dispatchEvent(
    new CustomEvent<PortfolioOpenChatDetail>(PORTFOLIO_OPEN_CHAT_EVENT, {
      detail: { trigger },
    }),
  );
};
