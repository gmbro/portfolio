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
import type { BubbleProps } from "@typebot.io/react";
import {
  chatbotGuide,
  chatbotStarterQuestions,
  validateChatbotQuestion,
} from "@/data/chatbot";
import { trackPortfolioEvent } from "@/lib/analytics";

const TYPEBOT_ID = "portfolio-typebot";
const TYPEBOT_LOAD_TIMEOUT_MS = 10_000;

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

interface TypebotErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

interface TypebotErrorBoundaryState {
  hasError: boolean;
}

class TypebotErrorBoundary extends Component<
  TypebotErrorBoundaryProps,
  TypebotErrorBoundaryState
> {
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
  const [guideOpen, setGuideOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasRequestedBot, setHasRequestedBot] = useState(false);
  const [bubbleReady, setBubbleReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [renderAttempt, setRenderAttempt] = useState(0);
  const [BubbleComponent, setBubbleComponent] =
    useState<ComponentType<BubbleProps> | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const guideInputRef = useRef<HTMLInputElement>(null);
  const moduleRef = useRef<TypebotModule>();
  const pendingQuestionRef = useRef<string>();
  const loadAttemptRef = useRef(0);
  const readyTimeoutRef = useRef<number>();
  const userRequestedOpen = useRef(false);
  const restoreLauncherFocus = useRef(false);

  const rememberTypebotModule = useCallback((typebot: TypebotModule) => {
    moduleRef.current = typebot;
    setBubbleComponent(() => typebot.Bubble);
    return typebot;
  }, []);

  const warmTypebot = useCallback(() => {
    void loadTypebotModule().then(rememberTypebotModule).catch(() => undefined);
  }, [rememberTypebotModule]);

  const cancelPendingConversation = useCallback(() => {
    loadAttemptRef.current += 1;
    if (readyTimeoutRef.current !== undefined) {
      window.clearTimeout(readyTimeoutRef.current);
      readyTimeoutRef.current = undefined;
    }
    pendingQuestionRef.current = undefined;
    userRequestedOpen.current = false;
    setHasRequestedBot(false);
    setBubbleReady(false);
    setIsOpen(false);
    setIsLoading(false);
  }, []);

  useEffect(
    () => () => {
      if (readyTimeoutRef.current !== undefined) {
        window.clearTimeout(readyTimeoutRef.current);
      }
    },
    [],
  );

  useLayoutEffect(() => {
    if (!observeAnalyticsConsent) {
      setAnalyticsConsentVisible(false);
      return;
    }

    const consentSelector = '[data-analytics-consent-banner="true"]';
    const syncConsentVisibility = () => {
      setAnalyticsConsentVisible(
        Boolean(document.querySelector(consentSelector)),
      );
    };

    const includesConsentBanner = (node: Node) =>
      node instanceof Element &&
      (node.matches(consentSelector) || Boolean(node.querySelector(consentSelector)));

    syncConsentVisibility();
    const observer = new MutationObserver((mutations) => {
      const consentChanged = mutations.some((mutation) =>
        [...mutation.addedNodes, ...mutation.removedNodes].some(includesConsentBanner),
      );
      if (consentChanged) syncConsentVisibility();
    });
    observer.observe(document.getElementById("root") ?? document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [observeAnalyticsConsent]);

  useEffect(() => {
    if (!analyticsConsentVisible) return;
    setGuideOpen(false);
    setIsOpen(false);
  }, [analyticsConsentVisible]);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact || typeof window.IntersectionObserver !== "function") return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.02 },
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const actions = Array.from(document.querySelectorAll("[data-chat-exclusion]"));
    if (!actions.length || typeof window.IntersectionObserver !== "function") return;

    const visibleActions = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleActions.add(entry.target);
          else visibleActions.delete(entry.target);
        });
        setExternalActionVisible(visibleActions.size > 0);
      },
      { threshold: 0.01 },
    );

    actions.forEach((action) => observer.observe(action));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!guideOpen) return;

    const focusTimer = window.requestAnimationFrame(() => {
      guideInputRef.current?.focus({ preventScroll: true });
    });

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isLoading) cancelPendingConversation();
      restoreLauncherFocus.current = true;
      setGuideOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [cancelPendingConversation, guideOpen, isLoading]);

  useEffect(() => {
    if (guideOpen || !restoreLauncherFocus.current) return;

    const focusTimer = window.requestAnimationFrame(() => {
      launcherRef.current?.focus({ preventScroll: true });
      restoreLauncherFocus.current = false;
    });
    return () => window.cancelAnimationFrame(focusTimer);
  }, [guideOpen]);

  const handleLoadError = useCallback(() => {
    loadAttemptRef.current += 1;
    if (readyTimeoutRef.current !== undefined) {
      window.clearTimeout(readyTimeoutRef.current);
      readyTimeoutRef.current = undefined;
    }
    pendingQuestionRef.current = undefined;
    userRequestedOpen.current = false;
    setHasRequestedBot(false);
    setBubbleReady(false);
    setIsOpen(false);
    setIsLoading(false);
    setLoadFailed(true);
    setGuideOpen(true);
  }, []);

  useEffect(() => {
    if (!hasRequestedBot || !BubbleComponent) return;

    let shadowObserver: MutationObserver | undefined;
    let retryTimer: number | undefined;
    let submitFrame: number | undefined;

    const syncTypebot = () => {
      const root = document.querySelector(`typebot-bubble#${TYPEBOT_ID}`)?.shadowRoot;
      if (!root) return false;

      const syncLabelsAndQuestion = () => {
        const button = root.querySelector<HTMLButtonElement>('button[part="button"]');
        if (button) {
          const label = button.getAttribute("aria-pressed") === "true"
            ? "물어보기 닫기"
            : "물어보기 열기";
          if (button.getAttribute("aria-label") !== label) {
            button.setAttribute("aria-label", label);
          }
          setBubbleReady(true);
          if (userRequestedOpen.current) {
            button.focus({ preventScroll: true });
            userRequestedOpen.current = false;
            trackPortfolioEvent("chat_open");
          }
        }

        const previewClose = root.querySelector<HTMLButtonElement>(
          '[part="preview-message-close-button"]',
        );
        if (previewClose?.getAttribute("aria-label") !== "미리보기 닫기") {
          previewClose?.setAttribute("aria-label", "미리보기 닫기");
        }

        root.querySelectorAll<HTMLImageElement>('img[part="button-icon"]').forEach((image) => {
          if (image.alt !== "") image.alt = "";
        });

        const input = root.querySelector<HTMLInputElement>(
          ".typebot-input-form input, .typebot-input-form textarea",
        );
        if (input) {
          if (input.placeholder !== chatbotGuide.placeholder) {
            input.placeholder = chatbotGuide.placeholder;
          }
          if (input.getAttribute("aria-label") !== chatbotGuide.placeholder) {
            input.setAttribute("aria-label", chatbotGuide.placeholder);
          }
        }

        const sendButton = root.querySelector<HTMLButtonElement>(
          ".typebot-input-form button.typebot-button",
        );
        if (sendButton?.getAttribute("aria-label") !== "질문 보내기") {
          sendButton?.setAttribute("aria-label", "질문 보내기");
        }

        const pendingQuestion = pendingQuestionRef.current;
        const typebot = moduleRef.current;
        if (!input || !pendingQuestion || !typebot) return;

        pendingQuestionRef.current = undefined;
        if (readyTimeoutRef.current !== undefined) {
          window.clearTimeout(readyTimeoutRef.current);
          readyTimeoutRef.current = undefined;
        }
        typebot.setInputValue(pendingQuestion, { id: TYPEBOT_ID });
        submitFrame = window.requestAnimationFrame(() => {
          typebot.submitInput({ id: TYPEBOT_ID });
          setQuestion("");
          setIsLoading(false);
          setGuideOpen(false);
        });
      };

      if (!shadowObserver) {
        shadowObserver = new MutationObserver(syncLabelsAndQuestion);
        shadowObserver.observe(root, {
          attributes: true,
          attributeFilter: ["aria-label", "aria-pressed", "alt", "placeholder"],
          childList: true,
          subtree: true,
        });
      }

      syncLabelsAndQuestion();
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
      if (submitFrame !== undefined) window.cancelAnimationFrame(submitFrame);
    };
  }, [BubbleComponent, hasRequestedBot, renderAttempt]);

  const hideClosedLauncher =
    !guideOpen &&
    !isOpen &&
    (contactVisible || externalActionVisible || analyticsConsentVisible);
  const showLocalLauncher = !guideOpen && !bubbleReady && !hideClosedLauncher;

  const handleLocalLauncherClick = () => {
    stripQueryBeforeThirdPartyLoad();
    setQuestionError("");
    setLoadFailed(false);
    setGuideOpen(true);
    warmTypebot();
  };

  const startConversation = (value: string) => {
    const validation = validateChatbotQuestion(value);
    setQuestion(validation.question);
    setQuestionError(validation.error);
    if (validation.error) {
      guideInputRef.current?.focus({ preventScroll: true });
      return;
    }

    stripQueryBeforeThirdPartyLoad();
    const loadAttempt = loadAttemptRef.current + 1;
    loadAttemptRef.current = loadAttempt;
    pendingQuestionRef.current = validation.question;
    userRequestedOpen.current = true;
    setLoadFailed(false);
    setIsLoading(true);
    setIsOpen(true);
    setHasRequestedBot(true);
    setRenderAttempt(loadAttempt);
    if (readyTimeoutRef.current !== undefined) {
      window.clearTimeout(readyTimeoutRef.current);
    }
    readyTimeoutRef.current = window.setTimeout(() => {
      if (
        loadAttemptRef.current === loadAttempt &&
        pendingQuestionRef.current
      ) {
        handleLoadError();
      }
    }, TYPEBOT_LOAD_TIMEOUT_MS);

    void withTimeout(loadTypebotModule(), TYPEBOT_LOAD_TIMEOUT_MS)
      .then((typebot) => {
        if (loadAttemptRef.current !== loadAttempt) return;
        rememberTypebotModule(typebot);
      })
      .catch(() => {
        if (loadAttemptRef.current === loadAttempt) handleLoadError();
      });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    startConversation(question);
  };

  const closeGuide = () => {
    if (isLoading) cancelPendingConversation();
    restoreLauncherFocus.current = true;
    setGuideOpen(false);
    setQuestionError("");
    setLoadFailed(false);
  };

  return (
    <>
      {showLocalLauncher && (
        <button
          ref={launcherRef}
          type="button"
          className="portfolio-chat-launcher"
          aria-label="물어보기 열기"
          aria-expanded={guideOpen}
          aria-controls="portfolio-chat-guide"
          onPointerEnter={warmTypebot}
          onFocus={warmTypebot}
          onClick={handleLocalLauncherClick}
        >
          <svg
            className="portfolio-chat-launcher__plane"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
          <span className="portfolio-chat-launcher__label">물어보기</span>
          <span className="portfolio-chat-launcher__avatar" aria-hidden="true">AI</span>
        </button>
      )}

      {guideOpen && (
        <section
          id="portfolio-chat-guide"
          className="portfolio-chat-guide"
          role="dialog"
          aria-labelledby="portfolio-chat-guide-title"
          aria-describedby="portfolio-chat-guide-description portfolio-chat-guide-privacy"
          aria-busy={isLoading}
        >
          <header className="portfolio-chat-guide__header">
            <span className="portfolio-chat-guide__avatar" aria-hidden="true">
              <span>AI</span>
              <img src={chatbotAvatar} alt="" width="48" height="48" decoding="async" />
            </span>
            <span className="portfolio-chat-guide__heading">
              <span>{chatbotGuide.eyebrow}</span>
              <strong id="portfolio-chat-guide-title">{chatbotGuide.title}</strong>
            </span>
            <button
              type="button"
              className="portfolio-chat-guide__close"
              aria-label="가이드 닫기"
              onClick={closeGuide}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>
          </header>

          <div className="portfolio-chat-guide__body">
            <p id="portfolio-chat-guide-description" className="portfolio-chat-guide__intro">
              {chatbotGuide.intro}
            </p>

            <div className="portfolio-chat-guide__starters" aria-label="추천 질문">
              {chatbotStarterQuestions.map((starter) => (
                <button
                  key={starter.id}
                  type="button"
                  disabled={isLoading}
                  aria-label={`${starter.label}: ${starter.question}`}
                  onClick={() => startConversation(starter.question)}
                >
                  <span>{starter.label}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>

            <form className="portfolio-chat-guide__form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="portfolio-chat-question">직접 질문하기</label>
              <div className="portfolio-chat-guide__input-row">
                <input
                  ref={guideInputRef}
                  id="portfolio-chat-question"
                  type="text"
                  value={question}
                  minLength={2}
                  maxLength={500}
                  autoComplete="off"
                  enterKeyHint="send"
                  placeholder={chatbotGuide.placeholder}
                  aria-invalid={Boolean(questionError)}
                  aria-describedby={
                    questionError
                      ? "portfolio-chat-question-error portfolio-chat-guide-privacy"
                      : "portfolio-chat-guide-privacy"
                  }
                  disabled={isLoading}
                  onChange={(event) => {
                    setQuestion(event.target.value);
                    if (questionError) setQuestionError("");
                  }}
                />
              </div>

              {questionError && (
                <p id="portfolio-chat-question-error" className="portfolio-chat-guide__error" role="alert">
                  {questionError}
                </p>
              )}

              {loadFailed && (
                <div className="portfolio-chat-guide__load-error" role="alert">
                  <p>{chatbotGuide.loadError}</p>
                  <a href="#case-studies" onClick={closeGuide}>프로젝트 직접 보기</a>
                </div>
              )}

              <button
                type="submit"
                className="portfolio-chat-guide__submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="portfolio-chat-guide__spinner" aria-hidden="true" />
                    {chatbotGuide.loading}
                  </>
                ) : (
                  <>
                    {loadFailed ? "다시 시도" : "질문 보내기"}
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </>
                )}
              </button>

              <p id="portfolio-chat-guide-privacy" className="portfolio-chat-guide__privacy">
                {chatbotGuide.privacy}
              </p>
            </form>
          </div>
        </section>
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
            onOpen={() => {
              setBubbleReady(true);
              setIsOpen(true);
            }}
            onClose={() => setIsOpen(false)}
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
    </>
  );
};

export default TypebotBubble;
