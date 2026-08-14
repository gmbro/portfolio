import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { trackPortfolioEvent } from "@/lib/analytics";

const LazyBubble = lazy(async () => {
  const typebot = await import("@typebot.io/react");
  return { default: typebot.Bubble };
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

const TypebotBubble = () => {
  const [contactVisible, setContactVisible] = useState(false);
  const [externalActionVisible, setExternalActionVisible] = useState(false);
  const [analyticsConsentVisible, setAnalyticsConsentVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasRequestedBot, setHasRequestedBot] = useState(false);
  const [bubbleReady, setBubbleReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const userRequestedOpen = useRef(false);

  useLayoutEffect(() => {
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
  }, []);

  useEffect(() => {
    if (analyticsConsentVisible) setIsOpen(false);
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
    if (!hasRequestedBot) return;

    let shadowObserver: MutationObserver | undefined;
    let retryTimer: number | undefined;

    const localizeTypebotLabels = () => {
      const root = document.querySelector("typebot-bubble#portfolio-typebot")?.shadowRoot;
      if (!root) return false;

      const syncLabels = () => {
        const button = root.querySelector<HTMLButtonElement>('button[part="button"]');
        if (button) {
          const label = button.getAttribute("aria-pressed") === "true" ? "물어보기 닫기" : "물어보기 열기";
          if (button.getAttribute("aria-label") !== label) button.setAttribute("aria-label", label);
          setBubbleReady(true);
          if (userRequestedOpen.current) {
            button.focus({ preventScroll: true });
            userRequestedOpen.current = false;
            trackPortfolioEvent("chat_open");
          }
        }

        const previewClose = root.querySelector<HTMLButtonElement>('[part="preview-message-close-button"]');
        if (previewClose?.getAttribute("aria-label") !== "미리보기 닫기") {
          previewClose?.setAttribute("aria-label", "미리보기 닫기");
        }

        root.querySelectorAll<HTMLImageElement>('img[part="button-icon"]').forEach((image) => {
          if (image.alt !== "") image.alt = "";
        });
      };

      if (!shadowObserver) {
        shadowObserver = new MutationObserver(syncLabels);
        shadowObserver.observe(root, {
          attributes: true,
          attributeFilter: ["aria-label", "aria-pressed", "alt"],
          childList: true,
          subtree: true,
        });
      }

      syncLabels();
      return true;
    };

    const hostObserver = new MutationObserver(() => {
      if (localizeTypebotLabels()) hostObserver.disconnect();
    });
    hostObserver.observe(document.body, { childList: true, subtree: true });

    if (localizeTypebotLabels()) hostObserver.disconnect();
    retryTimer = window.setInterval(() => {
      if (localizeTypebotLabels() && retryTimer !== undefined) {
        window.clearInterval(retryTimer);
        retryTimer = undefined;
      }
    }, 250);

    return () => {
      hostObserver.disconnect();
      shadowObserver?.disconnect();
      if (retryTimer !== undefined) window.clearInterval(retryTimer);
    };
  }, [hasRequestedBot]);

  const hideClosedLauncher =
    !isOpen && (contactVisible || externalActionVisible || analyticsConsentVisible);
  const showLocalLauncher = !bubbleReady && !hideClosedLauncher;

  const handleLocalLauncherClick = () => {
    stripQueryBeforeThirdPartyLoad();
    setLoadFailed(false);
    setIsOpen(true);
    setHasRequestedBot(true);
    userRequestedOpen.current = true;
  };

  const handleLoadError = () => {
    setHasRequestedBot(false);
    setBubbleReady(false);
    setIsOpen(false);
    setLoadFailed(true);
    userRequestedOpen.current = false;
  };

  return (
    <>
      {showLocalLauncher && (
        <button
          type="button"
          className="portfolio-chat-launcher"
          aria-label={hasRequestedBot ? "물어보기 불러오는 중" : "물어보기 열기"}
          aria-expanded={isOpen}
          aria-busy={hasRequestedBot}
          aria-controls="portfolio-typebot"
          disabled={hasRequestedBot}
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

      {loadFailed &&
        !contactVisible &&
        !externalActionVisible &&
        !analyticsConsentVisible && (
        <p className="portfolio-chat-status" role="status">
          챗봇을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      {hasRequestedBot && (
        <TypebotErrorBoundary onError={handleLoadError}>
          <Suspense fallback={null}>
            <LazyBubble
              id="portfolio-typebot"
              typebot="gmbro"
              apiHost="https://typebot.io"
              isOpen={isOpen}
              inlineStyle={{
                "--container-bottom": "var(--portfolio-chat-bottom)",
                "--bot-max-width": "min(400px, calc(100vw - 40px))",
                "--bot-max-height": "min(704px, calc(100vh - 120px))",
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
          </Suspense>
        </TypebotErrorBoundary>
      )}
    </>
  );
};

export default TypebotBubble;
