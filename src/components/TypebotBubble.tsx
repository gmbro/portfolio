import {
  Component,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type ErrorInfo,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { BubbleProps } from "@typebot.io/react";
import {
  chatbotFollowupQuestions,
  chatbotGuide,
  chatbotStarterQuestions,
  validateChatbotQuestion,
} from "@/data/chatbot";
import { trackPortfolioEvent } from "@/lib/analytics";
import { PORTFOLIO_OPEN_CHAT_EVENT } from "@/lib/chat";

const TYPEBOT_ID = "portfolio-typebot";
const TYPEBOT_GUIDE_MOUNT_ID = "portfolio-chat-window-guide-mount";
const TYPEBOT_LOAD_TIMEOUT_MS = 10_000;
const TYPEBOT_REPLY_TIMEOUT_MS = 45_000;

type TypebotModule = typeof import("@typebot.io/react");

let typebotModulePromise: Promise<TypebotModule> | undefined;

const loadTypebotModule = () => {
  if (!typebotModulePromise) {
    typebotModulePromise = import("@typebot.io/react").catch((error) => {
      typebotModulePromise = undefined;
      throw error;
    });
  }

  return typebotModulePromise;
};

const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number) =>
  new Promise<T>((resolve, reject) => {
    const timeout = window.setTimeout(
      () => reject(new Error("Typebot load timeout")),
      timeoutMs,
    );

    promise.then(
      (value) => {
        window.clearTimeout(timeout);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timeout);
        reject(error);
      },
    );
  });

const chatbotAvatar =
  "https://s3.typebotstorage.com/public/workspaces/cmsodqtlt00000ajdy01a2oa5/typebots/cmsodrpss000004ji0579oaia/bubble-icon?v=1786441335928";

const closeIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='24' fill='%23f4f4f5'/%3E%3Cpath d='m17 17 14 14M31 17 17 31' fill='none' stroke='%23111111' stroke-width='2.6' stroke-linecap='round'/%3E%3C/svg%3E";

const guideStyles = `
  #${TYPEBOT_GUIDE_MOUNT_ID} {
    position: absolute;
    inset: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    font-family: "Pretendard Variable", Pretendard, sans-serif;
    pointer-events: none;
  }

  #${TYPEBOT_GUIDE_MOUNT_ID}:empty { display: none; }

  .portfolio-chat-window-guide {
    display: flex;
    height: 100%;
    min-height: 0;
    flex-direction: column;
    overflow: hidden;
    border: 0;
    border-radius: 23px;
    background: #ffffff;
    color: #111111;
    box-shadow: none;
    word-break: keep-all;
    animation: portfolio-chat-window-guide-in 180ms ease-out both;
    pointer-events: none;
  }

  .portfolio-chat-window-guide--intro { background: #ffffff; }

  .portfolio-chat-window-guide--conversation { background: transparent; }

  [part="bot"] * {
    font-family: "Pretendard Variable", Pretendard, sans-serif !important;
  }

  [part="bot"][data-portfolio-chat-mode="conversation"] .typebot-container {
    padding-top: 92px !important;
    padding-bottom: 370px !important;
    background: #ffffff !important;
  }

  [part="bot"][data-portfolio-chat-mode="conversation"] .typebot-input-form {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  [part="bot"] .typebot-button {
    background: linear-gradient(135deg, #e94f35 0%, #ff6645 54%, #ff9b45 100%) !important;
    color: #ffffff !important;
  }

  .portfolio-chat-window-guide__header {
    display: grid;
    min-height: 92px;
    grid-template-columns: 46px minmax(0, 1fr) 44px;
    gap: 12px;
    align-items: center;
    padding: 16px 18px;
    background: linear-gradient(135deg, #e94f35 0%, #ff6645 54%, #ff9b45 100%);
    color: #ffffff;
    pointer-events: auto;
  }

  .portfolio-chat-window-guide__avatar {
    position: relative;
    display: grid;
    width: 46px;
    height: 46px;
    overflow: hidden;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 0.72);
    border-radius: 16px;
    background: #111111;
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
  }

  .portfolio-chat-window-guide__avatar img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .portfolio-chat-window-guide__heading {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 3px;
  }

  .portfolio-chat-window-guide__heading span {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.14em;
    opacity: 0.78;
  }

  .portfolio-chat-window-guide__heading strong {
    overflow-wrap: anywhere;
    font-size: 18px;
    font-weight: 800;
    line-height: 1.3;
  }

  .portfolio-chat-window-guide__close {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 0.28);
    border-radius: 9999px;
    background: rgb(17 17 17 / 0.16);
    color: #ffffff;
    cursor: pointer;
  }

  .portfolio-chat-window-guide__close svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2;
    stroke-linecap: round;
  }

  .portfolio-chat-window-guide__body {
    min-height: 0;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 18px;
    background: #ffffff;
    pointer-events: auto;
  }

  .portfolio-chat-window-guide__message {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 9px;
    align-items: start;
  }

  .portfolio-chat-window-guide__message-avatar {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 11px;
    background: #111111;
    color: #ffffff;
    font-size: 9px;
    font-weight: 800;
  }

  .portfolio-chat-window-guide__intro {
    padding: 13px 14px;
    border-radius: 4px 17px 17px;
    background: #f4f4f5;
    color: #27272a;
    font-size: 14px;
    font-weight: 520;
    line-height: 1.55;
  }

  .portfolio-chat-window-guide__label {
    margin: 16px 0 8px;
    color: #52525b;
    font-size: 12px;
    font-weight: 750;
  }

  .portfolio-chat-window-guide__starters {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .portfolio-chat-window-guide__starters button {
    display: flex;
    min-width: 0;
    min-height: 58px;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 11px;
    border: 1px solid #e4e4e7;
    border-radius: 14px;
    background: #ffffff;
    color: #27272a;
    font-family: inherit;
    font-size: 12px;
    font-weight: 750;
    line-height: 1.35;
    text-align: left;
    cursor: pointer;
  }

  .portfolio-chat-window-guide__starters button span:last-child {
    flex: 0 0 auto;
    color: #ff6645;
    font-size: 15px;
  }

  .portfolio-chat-window-guide__form { margin-top: 14px; }

  .portfolio-chat-window-guide__conversation {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;
    padding: 12px 14px 62px;
    border-top: 1px solid #e4e4e7;
    background: rgb(255 255 255 / 0.98);
    box-shadow: 0 -14px 32px rgb(24 24 27 / 0.08);
    pointer-events: auto;
  }

  .portfolio-chat-window-guide__followup-label {
    margin: 0;
    color: #52525b;
    font-size: 11px;
    font-weight: 750;
    line-height: 1.35;
  }

  .portfolio-chat-window-guide__followups {
    display: grid;
    gap: 5px;
  }

  .portfolio-chat-window-guide__followups button {
    display: flex;
    width: 100%;
    min-width: 0;
    min-height: 32px;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 10px;
    border: 1px solid #e4e4e7;
    border-radius: 10px;
    background: #fff8f6;
    color: #3f3f46;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.35;
    text-align: left;
    cursor: pointer;
  }

  .portfolio-chat-window-guide__followups button span:first-child {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .portfolio-chat-window-guide__followups button span:last-child {
    flex: 0 0 auto;
    color: #ff6645;
  }

  .portfolio-chat-window-guide__conversation .portfolio-chat-window-guide__form {
    margin-top: 0;
  }

  .portfolio-chat-window-guide__form label {
    display: block;
    margin-bottom: 7px;
    color: #3f3f46;
    font-size: 12px;
    font-weight: 750;
  }

  .portfolio-chat-window-guide__form input {
    width: 100%;
    min-height: 50px;
    padding: 0 14px;
    border: 1px solid #d4d4d8;
    border-radius: 14px;
    background: #fafafa;
    color: #111111;
    font-family: inherit;
    font-size: 16px;
    line-height: 1.4;
  }

  .portfolio-chat-window-guide__form input::placeholder { color: #8b8b92; opacity: 1; }

  .portfolio-chat-window-guide__error {
    margin-top: 7px;
    color: #b42318;
    font-size: 12px;
    font-weight: 650;
    line-height: 1.4;
  }

  .portfolio-chat-window-guide__status,
  .portfolio-chat-window-guide__privacy {
    margin-top: 8px;
    color: #71717a;
    font-size: 10px;
    line-height: 1.45;
  }

  .portfolio-chat-window-guide__submit {
    display: inline-flex;
    width: 100%;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 9px;
    border: 0;
    border-radius: 14px;
    background: linear-gradient(135deg, #e94f35 0%, #ff6645 52%, #ff9b45 100%);
    color: #ffffff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
  }

  .portfolio-chat-window-guide__submit svg {
    width: 19px;
    height: 19px;
    fill: none;
    stroke: currentcolor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .portfolio-chat-window-guide button:disabled,
  .portfolio-chat-window-guide input:disabled { cursor: wait; opacity: 0.58; }

  .portfolio-chat-window-guide button:focus-visible,
  .portfolio-chat-window-guide input:focus-visible { outline: 2px solid #111111; outline-offset: 3px; }

  @keyframes portfolio-chat-window-guide-in {
    from { opacity: 0; transform: translateY(8px) scale(0.99); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 639px) {
    .portfolio-chat-window-guide { border-radius: 22px; }
    .portfolio-chat-window-guide__header { min-height: 84px; padding: 14px 16px; }
    .portfolio-chat-window-guide__body { padding: 15px; }
    [part="bot"][data-portfolio-chat-mode="conversation"] .typebot-container {
      padding-top: 84px !important;
      padding-bottom: 364px !important;
    }
    .portfolio-chat-window-guide__conversation { padding: 10px 12px 60px; }
  }

  @media (hover: hover) and (pointer: fine) {
    .portfolio-chat-window-guide__starters button:hover:not(:focus-visible) {
      border-color: rgb(255 102 69 / 0.42);
      background: #fff8f6;
    }
    .portfolio-chat-window-guide__followups button:hover:not(:focus-visible) {
      border-color: rgb(255 102 69 / 0.46);
      background: #fff1ed;
    }
    .portfolio-chat-window-guide__submit:hover:not(:focus-visible) { filter: brightness(1.04); }
  }

  @media (prefers-reduced-motion: reduce) {
    .portfolio-chat-window-guide,
    .portfolio-chat-window-guide button { animation: none; transition: none; }
  }
`;

interface TypebotErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

interface TypebotErrorBoundaryState {
  hasError: boolean;
}

class TypebotErrorBoundary extends Component<TypebotErrorBoundaryProps, TypebotErrorBoundaryState> {
  state: TypebotErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): TypebotErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

const stripQueryBeforeThirdPartyLoad = () => {
  if (typeof window === "undefined" || !window.location.search) return;
  const cleanUrl = `${window.location.pathname}${window.location.hash}`;
  window.history.replaceState(window.history.state, "", cleanUrl);
};

interface TypebotBubbleProps {
  observeAnalyticsConsent?: boolean;
}

const TypebotBubble = ({ observeAnalyticsConsent = false }: TypebotBubbleProps) => {
  const [contactVisible, setContactVisible] = useState(false);
  const [externalActionVisible, setExternalActionVisible] = useState(false);
  const [analyticsConsentVisible, setAnalyticsConsentVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasRequestedBot, setHasRequestedBot] = useState(false);
  const [bubbleReady, setBubbleReady] = useState(false);
  const [inputReady, setInputReady] = useState(false);
  const [guideVisible, setGuideVisible] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [renderAttempt, setRenderAttempt] = useState(0);
  const [guidePortalTarget, setGuidePortalTarget] = useState<HTMLElement | null>(null);
  const [BubbleComponent, setBubbleComponent] = useState<ComponentType<BubbleProps> | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const guideInputRef = useRef<HTMLInputElement>(null);
  const guideCloseRef = useRef<HTMLButtonElement>(null);
  const moduleRef = useRef<TypebotModule>();
  const loadAttemptRef = useRef(0);
  const readyTimeoutRef = useRef<number>();
  const replyTimeoutRef = useRef<number>();
  const submitFrameRef = useRef<number>();
  const focusFrameRef = useRef<number>();
  const bubbleReadyRef = useRef(false);
  const userRequestedOpen = useRef(false);
  const trackedOpen = useRef(false);
  const mountedRef = useRef(true);
  const awaitingReplyRef = useRef(false);

  const clearReadyTimeout = useCallback(() => {
    if (readyTimeoutRef.current === undefined) return;
    window.clearTimeout(readyTimeoutRef.current);
    readyTimeoutRef.current = undefined;
  }, []);

  const clearReplyTimeout = useCallback(() => {
    if (replyTimeoutRef.current === undefined) return;
    window.clearTimeout(replyTimeoutRef.current);
    replyTimeoutRef.current = undefined;
  }, []);

  const rememberTypebotModule = useCallback((typebot: TypebotModule) => {
    if (!mountedRef.current) return typebot;
    moduleRef.current = typebot;
    setBubbleComponent(() => typebot.Bubble);
    return typebot;
  }, []);

  const warmTypebot = useCallback(() => {
    void loadTypebotModule().then(rememberTypebotModule).catch(() => undefined);
  }, [rememberTypebotModule]);

  const focusTypebotButton = useCallback(() => {
    if (focusFrameRef.current !== undefined) window.cancelAnimationFrame(focusFrameRef.current);
    focusFrameRef.current = window.requestAnimationFrame(() => {
      const button = document
        .querySelector(`typebot-bubble#${TYPEBOT_ID}`)
        ?.shadowRoot?.querySelector<HTMLButtonElement>('button[part="button"]');
      (button ?? launcherRef.current)?.focus({ preventScroll: true });
      focusFrameRef.current = undefined;
    });
  }, []);

  const cancelPendingSubmission = useCallback(() => {
    if (submitFrameRef.current !== undefined) {
      window.cancelAnimationFrame(submitFrameRef.current);
      submitFrameRef.current = undefined;
      moduleRef.current?.setInputValue("", { id: TYPEBOT_ID });
    }
    awaitingReplyRef.current = false;
    clearReplyTimeout();
    setIsLoading(false);
  }, [clearReplyTimeout]);

  const closeChat = useCallback(() => {
    cancelPendingSubmission();
    clearReadyTimeout();
    clearReplyTimeout();
    userRequestedOpen.current = false;
    setIsOpen(false);
    setQuestionError("");
    setIsLoading(false);

    if (!bubbleReadyRef.current) {
      loadAttemptRef.current += 1;
      setHasRequestedBot(false);
      setBubbleReady(false);
      setInputReady(false);
      setGuidePortalTarget(null);
    }

    focusTypebotButton();
  }, [cancelPendingSubmission, clearReadyTimeout, clearReplyTimeout, focusTypebotButton]);

  const handleLoadError = useCallback(() => {
    loadAttemptRef.current += 1;
    clearReadyTimeout();
    cancelPendingSubmission();
    userRequestedOpen.current = false;
    bubbleReadyRef.current = false;
    setHasRequestedBot(false);
    setBubbleReady(false);
    setInputReady(false);
    setGuidePortalTarget(null);
    setIsOpen(false);
    setIsLoading(false);
    setGuideVisible(true);
    setLoadFailed(true);
  }, [cancelPendingSubmission, clearReadyTimeout]);

  useEffect(
    () => () => {
      mountedRef.current = false;
      loadAttemptRef.current += 1;
      clearReadyTimeout();
      clearReplyTimeout();
      if (submitFrameRef.current !== undefined) window.cancelAnimationFrame(submitFrameRef.current);
      if (focusFrameRef.current !== undefined) window.cancelAnimationFrame(focusFrameRef.current);
    },
    [clearReadyTimeout, clearReplyTimeout],
  );

  useLayoutEffect(() => {
    if (!observeAnalyticsConsent) {
      setAnalyticsConsentVisible(false);
      return;
    }
    const consentSelector = '[data-analytics-consent-banner="true"]';
    const syncConsentVisibility = () => setAnalyticsConsentVisible(Boolean(document.querySelector(consentSelector)));
    const includesConsentBanner = (node: Node) =>
      node instanceof Element && (node.matches(consentSelector) || Boolean(node.querySelector(consentSelector)));
    syncConsentVisibility();
    const observer = new MutationObserver((mutations) => {
      const consentChanged = mutations.some((mutation) =>
        [...mutation.addedNodes, ...mutation.removedNodes].some(includesConsentBanner),
      );
      if (consentChanged) syncConsentVisibility();
    });
    observer.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [observeAnalyticsConsent]);

  useEffect(() => {
    if (analyticsConsentVisible && isOpen) closeChat();
  }, [analyticsConsentVisible, closeChat, isOpen]);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact || typeof window.IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { threshold: 0.02 });
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const actions = Array.from(document.querySelectorAll("[data-chat-exclusion]"));
    if (!actions.length || typeof window.IntersectionObserver !== "function") return;
    const visibleActions = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleActions.add(entry.target);
        else visibleActions.delete(entry.target);
      });
      setExternalActionVisible(visibleActions.size > 0);
    }, { threshold: 0.01 });
    actions.forEach((action) => observer.observe(action));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeChat();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeChat, isOpen]);

  useEffect(() => {
    if (!guidePortalTarget || !isOpen) return;
    const focusFrame = window.requestAnimationFrame(() => {
      const focusTarget = inputReady ? guideInputRef.current : guideCloseRef.current;
      focusTarget?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(focusFrame);
  }, [guidePortalTarget, guideVisible, inputReady, isOpen]);

  useEffect(() => {
    const botWindow = guidePortalTarget?.parentElement;
    if (!botWindow || !isOpen) return;
    botWindow.dataset.portfolioChatMode = guideVisible ? "intro" : "conversation";
    return () => {
      delete botWindow.dataset.portfolioChatMode;
    };
  }, [guidePortalTarget, guideVisible, isOpen]);

  useEffect(() => {
    if (!guidePortalTarget || !guideVisible || !isOpen || inputReady) return;
    const fallbackTimer = window.setTimeout(handleLoadError, TYPEBOT_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(fallbackTimer);
  }, [guidePortalTarget, guideVisible, handleLoadError, inputReady, isOpen]);

  useEffect(() => {
    const botWindow = guidePortalTarget?.parentElement;
    if (!botWindow || !guideVisible || !isOpen) return;

    const previousState = new Map<HTMLElement, { inert: boolean; ariaHidden: string | null }>();
    const protectManagedChildren = () => {
      Array.from(botWindow.children).forEach((child) => {
        if (!(child instanceof HTMLElement) || child === guidePortalTarget) return;
        if (!previousState.has(child)) {
          previousState.set(child, {
            inert: child.hasAttribute("inert"),
            ariaHidden: child.getAttribute("aria-hidden"),
          });
        }
        child.setAttribute("inert", "");
        child.setAttribute("aria-hidden", "true");
      });
    };

    protectManagedChildren();
    const observer = new MutationObserver(protectManagedChildren);
    observer.observe(botWindow, { childList: true });

    return () => {
      observer.disconnect();
      previousState.forEach(({ inert, ariaHidden }, child) => {
        if (!inert) child.removeAttribute("inert");
        if (ariaHidden === null) child.removeAttribute("aria-hidden");
        else child.setAttribute("aria-hidden", ariaHidden);
      });
    };
  }, [guidePortalTarget, guideVisible, isOpen]);

  useEffect(() => {
    if (!hasRequestedBot || !BubbleComponent) return;
    let shadowObserver: MutationObserver | undefined;
    let retryTimer: number | undefined;
    let mountPoint: HTMLDivElement | undefined;

    const syncTypebot = () => {
      const root = document.querySelector(`typebot-bubble#${TYPEBOT_ID}`)?.shadowRoot;
      if (!root) return false;

      if (!root.querySelector('style[data-portfolio-chat-window-guide="true"]')) {
        const style = document.createElement("style");
        style.dataset.portfolioChatWindowGuide = "true";
        style.textContent = guideStyles;
        root.appendChild(style);
      }

      const button = root.querySelector<HTMLButtonElement>('button[part="button"]');
      const botWindow = root.querySelector<HTMLElement>('[part="bot"]');
      if (botWindow) {
        mountPoint = botWindow.querySelector<HTMLDivElement>(`#${TYPEBOT_GUIDE_MOUNT_ID}`) ?? undefined;
        if (!mountPoint) {
          mountPoint = document.createElement("div");
          mountPoint.id = TYPEBOT_GUIDE_MOUNT_ID;
          botWindow.appendChild(mountPoint);
        }
        setGuidePortalTarget((current) => (current === mountPoint ? current : mountPoint ?? null));
      }
      if (button) {
        const label = button.getAttribute("aria-pressed") === "true" ? "물어보기 닫기" : "물어보기 열기";
        if (button.getAttribute("aria-label") !== label) button.setAttribute("aria-label", label);
      }

      const previewClose = root.querySelector<HTMLButtonElement>('[part="preview-message-close-button"]');
      if (previewClose?.getAttribute("aria-label") !== "미리보기 닫기") {
        previewClose?.setAttribute("aria-label", "미리보기 닫기");
      }
      root.querySelectorAll<HTMLImageElement>('img[part="button-icon"]').forEach((image) => {
        if (image.alt !== "") image.alt = "";
      });

      const input = root.querySelector<HTMLInputElement>(".typebot-input-form input, .typebot-input-form textarea");
      if (input) {
        if (input.placeholder !== chatbotGuide.placeholder) input.placeholder = chatbotGuide.placeholder;
        if (input.getAttribute("aria-label") !== chatbotGuide.placeholder) input.setAttribute("aria-label", chatbotGuide.placeholder);
      }
      const sendButton = root.querySelector<HTMLButtonElement>(".typebot-input-form button.typebot-button");
      if (sendButton?.getAttribute("aria-label") !== "질문 보내기") sendButton?.setAttribute("aria-label", "질문 보내기");
      if (!input) setInputReady(false);
      else if (!awaitingReplyRef.current) setInputReady(true);

      if (button && botWindow) {
        bubbleReadyRef.current = true;
        setBubbleReady(true);
        if (!awaitingReplyRef.current) setIsLoading(false);
        clearReadyTimeout();
        if (userRequestedOpen.current) {
          userRequestedOpen.current = false;
          if (!trackedOpen.current) {
            trackedOpen.current = true;
            trackPortfolioEvent("chat_open");
          }
        }
      }

      if (!shadowObserver) {
        shadowObserver = new MutationObserver(syncTypebot);
        shadowObserver.observe(root, {
          attributes: true,
          attributeFilter: ["aria-label", "aria-pressed", "alt", "placeholder"],
          childList: true,
          subtree: true,
        });
      }
      return true;
    };

    const hostObserver = new MutationObserver(() => {
      if (syncTypebot()) hostObserver.disconnect();
    });
    hostObserver.observe(document.body, { childList: true, subtree: true });
    if (syncTypebot()) hostObserver.disconnect();
    retryTimer = window.setInterval(() => {
      if (syncTypebot() && retryTimer !== undefined) {
        window.clearInterval(retryTimer);
        retryTimer = undefined;
      }
    }, 250);

    return () => {
      hostObserver.disconnect();
      shadowObserver?.disconnect();
      if (retryTimer !== undefined) window.clearInterval(retryTimer);
      mountPoint?.remove();
      setGuidePortalTarget(null);
    };
  }, [BubbleComponent, clearReadyTimeout, hasRequestedBot, renderAttempt]);

  const hideClosedLauncher = !isOpen && (contactVisible || externalActionVisible || analyticsConsentVisible);
  const showLocalLauncher = !bubbleReady && !hideClosedLauncher;

  const openChat = () => {
    if (isLoading) return;
    stripQueryBeforeThirdPartyLoad();
    const loadAttempt = loadAttemptRef.current + 1;
    loadAttemptRef.current = loadAttempt;
    userRequestedOpen.current = true;
    bubbleReadyRef.current = false;
    setQuestionError("");
    setLoadFailed(false);
    setGuideVisible(true);
    setInputReady(false);
    setIsLoading(true);
    setIsOpen(true);
    setHasRequestedBot(true);
    setRenderAttempt(loadAttempt);
    clearReadyTimeout();
    readyTimeoutRef.current = window.setTimeout(() => {
      if (loadAttemptRef.current === loadAttempt && !bubbleReadyRef.current) handleLoadError();
    }, TYPEBOT_LOAD_TIMEOUT_MS);

    void withTimeout(loadTypebotModule(), TYPEBOT_LOAD_TIMEOUT_MS)
      .then((typebot) => {
        if (loadAttemptRef.current === loadAttempt) rememberTypebotModule(typebot);
      })
      .catch(() => {
        if (loadAttemptRef.current === loadAttempt) handleLoadError();
      });
  };

  useEffect(() => {
    window.addEventListener(PORTFOLIO_OPEN_CHAT_EVENT, openChat);
    return () => window.removeEventListener(PORTFOLIO_OPEN_CHAT_EVENT, openChat);
  });

  const startConversation = (value: string) => {
    const validation = validateChatbotQuestion(value);
    setQuestion(validation.question);
    setQuestionError(validation.error);
    if (validation.error) {
      guideInputRef.current?.focus({ preventScroll: true });
      return;
    }

    const typebot = moduleRef.current;
    if (!typebot || !inputReady) {
      setQuestionError("채팅 입력을 준비하고 있습니다. 잠시 후 다시 시도해 주세요.");
      guideInputRef.current?.focus({ preventScroll: true });
      return;
    }

    awaitingReplyRef.current = true;
    clearReplyTimeout();
    setInputReady(false);
    setIsLoading(true);
    typebot.setInputValue(validation.question, { id: TYPEBOT_ID });
    submitFrameRef.current = window.requestAnimationFrame(() => {
      typebot.submitInput({ id: TYPEBOT_ID });
      submitFrameRef.current = undefined;
      setQuestion("");
      setQuestionError("");
      setGuideVisible(false);
      replyTimeoutRef.current = window.setTimeout(() => {
        if (!awaitingReplyRef.current) return;
        setQuestionError("답변이 늦어지고 있습니다. 잠시 후 다시 시도해 주세요.");
      }, TYPEBOT_REPLY_TIMEOUT_MS);
    });
  };

  const handleNewInputBlock = useCallback(() => {
    awaitingReplyRef.current = false;
    clearReplyTimeout();
    setInputReady(true);
    setIsLoading(false);
    setQuestionError("");
  }, [clearReplyTimeout]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoading) startConversation(question);
  };

  const questionForm = (isConversation: boolean) => (
    <form
      className={`portfolio-chat-window-guide__form${isConversation ? " portfolio-chat-window-guide__form--conversation" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor="portfolio-chat-window-question">
        {isConversation ? "후속 질문" : "직접 질문하기"}
      </label>
      <input
        ref={guideInputRef}
        id="portfolio-chat-window-question"
        type="text"
        value={question}
        minLength={2}
        maxLength={500}
        autoComplete="off"
        enterKeyHint="send"
        placeholder={chatbotGuide.placeholder}
        aria-invalid={Boolean(questionError)}
        aria-describedby={questionError
          ? "portfolio-chat-window-question-error portfolio-chat-window-guide-privacy"
          : "portfolio-chat-window-guide-privacy"}
        disabled={!inputReady || isLoading}
        onChange={(event) => {
          setQuestion(event.target.value);
          if (questionError) setQuestionError("");
        }}
      />
      {questionError && (
        <p id="portfolio-chat-window-question-error" className="portfolio-chat-window-guide__error" role="alert">{questionError}</p>
      )}
      {!inputReady && (
        <p className="portfolio-chat-window-guide__status" role="status">
          {isLoading && !guideVisible ? "답변을 준비하고 있어요." : "채팅 입력을 준비하고 있어요."}
        </p>
      )}
      <button type="submit" className="portfolio-chat-window-guide__submit" disabled={!inputReady || isLoading}>
        질문 보내기
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
      </button>
      <p id="portfolio-chat-window-guide-privacy" className="portfolio-chat-window-guide__privacy">
        {isConversation ? "개인정보·회사 내부 정보는 입력하지 마세요." : chatbotGuide.privacy}
      </p>
    </form>
  );

  const guidePortal = guidePortalTarget && isOpen
    ? createPortal(
        <section
          className={`portfolio-chat-window-guide ${guideVisible ? "portfolio-chat-window-guide--intro" : "portfolio-chat-window-guide--conversation"}`}
          role="dialog"
          aria-labelledby="portfolio-chat-window-guide-title"
          aria-describedby={guideVisible ? "portfolio-chat-window-guide-description portfolio-chat-window-guide-privacy" : undefined}
          aria-busy={isLoading}
        >
          <header className="portfolio-chat-window-guide__header">
            <span className="portfolio-chat-window-guide__avatar" aria-hidden="true">
              <span>AI</span>
              <img src={chatbotAvatar} alt="" width="46" height="46" decoding="async" />
            </span>
            <span className="portfolio-chat-window-guide__heading">
              <span>{chatbotGuide.eyebrow}</span>
              <strong id="portfolio-chat-window-guide-title">{chatbotGuide.title}</strong>
            </span>
            <button ref={guideCloseRef} type="button" className="portfolio-chat-window-guide__close" aria-label="채팅 닫기" onClick={closeChat}>
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 7 10 10M17 7 7 17" /></svg>
            </button>
          </header>

          {guideVisible ? <div className="portfolio-chat-window-guide__body">
            <div className="portfolio-chat-window-guide__message">
              <span className="portfolio-chat-window-guide__message-avatar" aria-hidden="true">AI</span>
              <p id="portfolio-chat-window-guide-description" className="portfolio-chat-window-guide__intro">{chatbotGuide.intro}</p>
            </div>

            <p className="portfolio-chat-window-guide__label">추천 질문</p>
            <div className="portfolio-chat-window-guide__starters">
              {chatbotStarterQuestions.map((starter) => (
                <button
                  key={starter.id}
                  type="button"
                  disabled={!inputReady || isLoading}
                  aria-label={`${starter.label}: ${starter.question}`}
                  onClick={() => startConversation(starter.question)}
                >
                  <span>{starter.label}</span><span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>

            {questionForm(false)}
          </div> : (
            <div className="portfolio-chat-window-guide__conversation">
              <p id="portfolio-chat-window-followup-label" className="portfolio-chat-window-guide__followup-label">
                이어서 이런 질문을 해보세요
              </p>
              <div className="portfolio-chat-window-guide__followups" aria-labelledby="portfolio-chat-window-followup-label">
                {chatbotFollowupQuestions.map((followup) => (
                  <button
                    key={followup.id}
                    type="button"
                    disabled={!inputReady || isLoading}
                    aria-label={followup.question}
                    onClick={() => startConversation(followup.question)}
                  >
                    <span>{followup.label}</span><span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
              {questionForm(true)}
            </div>
          )}
        </section>,
        guidePortalTarget,
      )
    : null;

  return (
    <>
      {showLocalLauncher && (
        <button
          ref={launcherRef}
          type="button"
          className="portfolio-chat-launcher"
          aria-label={loadFailed ? "챗봇 다시 연결하기" : "물어보기 열기"}
          aria-expanded={isOpen}
          aria-controls={hasRequestedBot ? TYPEBOT_ID : undefined}
          aria-busy={isLoading}
          disabled={isLoading}
          onPointerEnter={warmTypebot}
          onFocus={warmTypebot}
          onClick={openChat}
        >
          <svg className="portfolio-chat-launcher__plane" aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
          </svg>
          <span className="portfolio-chat-launcher__label">{isLoading ? "연결 중…" : loadFailed ? "다시 시도" : "물어보기"}</span>
          <span className="portfolio-chat-launcher__avatar" aria-hidden="true">AI</span>
        </button>
      )}

      {loadFailed && showLocalLauncher && (
        <div className="portfolio-chat-load-error" role="alert">
          <p>{chatbotGuide.loadError}</p>
          <a href="#case-studies">프로젝트 직접 보기</a>
        </div>
      )}

      {hasRequestedBot && BubbleComponent && (
        <TypebotErrorBoundary key={renderAttempt} onError={handleLoadError}>
          <BubbleComponent
            id={TYPEBOT_ID}
            typebot="gmbro"
            apiHost="https://typebot.io"
            isOpen={isOpen}
            inlineStyle={{
              "--container-bottom": "var(--portfolio-chat-bottom)",
              "--bot-max-width": "min(400px, calc(100vw - 40px))",
              "--bot-max-height": "min(704px, calc(100vh - 120px))",
              "--typebot-container-font-family": '"Pretendard Variable", Pretendard',
              "--typebot-container-bg-color": "#ffffff",
              "--typebot-host-bubble-bg-rgb": "244, 244, 245",
              "--typebot-host-bubble-color": "#111111",
              "--typebot-host-bubble-border-radius": "18px",
              "--typebot-guest-bubble-bg-rgb": "255, 102, 69",
              "--typebot-guest-bubble-color": "#ffffff",
              "--typebot-guest-bubble-border-radius": "18px",
              "--typebot-input-bg-color": "#ffffff",
              "--typebot-input-bg-rgb": "255, 255, 255",
              "--typebot-input-color": "#111111",
              "--typebot-input-placeholder-color": "#71717a",
              "--typebot-input-border-rgb": "212, 212, 216",
              "--typebot-input-border-opacity": "1",
              "--typebot-input-border-radius": "16px",
              "--typebot-button-bg-rgb": "255, 102, 69",
              "--typebot-button-bg-color": "#ff6645",
              "--typebot-button-color": "#ffffff",
              "--typebot-button-border-radius": "16px",
            }}
            onOpen={() => setIsOpen(true)}
            onClose={closeChat}
            onNewInputBlock={handleNewInputBlock}
            theme={{
              position: "fixed",
              button: {
                backgroundColor: "#FFFFFF",
                iconColor: "#111111",
                customIconSrc: chatbotAvatar,
                customCloseIconSrc: closeIcon,
                isHidden: hideClosedLauncher,
                size: "large",
              },
            }}
          />
        </TypebotErrorBoundary>
      )}

      {guidePortal}
    </>
  );
};

export default TypebotBubble;
