import { Bubble } from "@typebot.io/react";
import { useEffect } from "react";

const chatbotAvatar =
  "https://s3.typebotstorage.com/public/workspaces/cmsodqtlt00000ajdy01a2oa5/typebots/cmsodrpss000004ji0579oaia/bubble-icon?v=1786441335928";

const closeIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='24' fill='%23f4f4f5'/%3E%3Cpath d='m17 17 14 14M31 17 17 31' fill='none' stroke='%23111111' stroke-width='2.6' stroke-linecap='round'/%3E%3C/svg%3E";

const TypebotBubble = () => {
  useEffect(() => {
    let shadowObserver: MutationObserver | undefined;
    let retryTimer: number | undefined;

    const localizeTypebotLabels = () => {
      const root = document.querySelector("typebot-bubble")?.shadowRoot;
      if (!root) return;

      const syncLabels = () => {
        const button = root.querySelector<HTMLButtonElement>('button[part="button"]');
        if (button) {
          const label = button.getAttribute("aria-pressed") === "true" ? "메시지 닫기" : "메시지 열기";
          if (button.getAttribute("aria-label") !== label) button.setAttribute("aria-label", label);
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
        shadowObserver.observe(root, { attributes: true, childList: true, subtree: true });
      }
      syncLabels();
    };

    const hostObserver = new MutationObserver(localizeTypebotLabels);
    hostObserver.observe(document.body, { childList: true, subtree: true });
    localizeTypebotLabels();
    retryTimer = window.setInterval(() => {
      localizeTypebotLabels();
      if (shadowObserver && retryTimer !== undefined) {
        window.clearInterval(retryTimer);
        retryTimer = undefined;
      }
    }, 250);

    return () => {
      hostObserver.disconnect();
      shadowObserver?.disconnect();
      if (retryTimer !== undefined) window.clearInterval(retryTimer);
    };
  }, []);

  return (
    <Bubble
      typebot="gmbro"
      apiHost="https://typebot.io"
      inlineStyle={{ "--container-bottom": "var(--portfolio-chat-bottom)" }}
      theme={{
        position: "fixed",
        button: {
          backgroundColor: "#FFFFFF",
          iconColor: "#111111",
          customIconSrc: chatbotAvatar,
          customCloseIconSrc: closeIcon,
          size: "large",
        },
      }}
    />
  );
};

export default TypebotBubble;
