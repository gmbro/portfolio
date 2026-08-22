export const PORTFOLIO_OPEN_CHAT_EVENT = "portfolio:open-chat";

export const openPortfolioChat = () => {
  window.dispatchEvent(new CustomEvent(PORTFOLIO_OPEN_CHAT_EVENT));
};
