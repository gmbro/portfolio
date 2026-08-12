import { Bubble } from "@typebot.io/react";
import { useEffect } from "react";

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
          const label = button.getAttribute("aria-pressed") === "true" ? "챗봇 닫기" : "챗봇 열기";
          if (button.getAttribute("aria-label") !== label) button.setAttribute("aria-label", label);
        }

        const previewClose = root.querySelector<HTMLButtonElement>('[part="preview-message-close-button"]');
        if (previewClose?.getAttribute("aria-label") !== "미리보기 닫기") {
          previewClose?.setAttribute("aria-label", "미리보기 닫기");
        }

        root
          .querySelectorAll<HTMLImageElement>('img[alt="Bot avatar"], img[alt="Bubble button icon"]')
          .forEach((image) => {
            if (image.alt !== "챗봇 프로필") image.alt = "챗봇 프로필";
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
      theme={{
        position: "fixed",
        button: {
          backgroundColor: "#0042DA",
          customIconSrc:
            "https://s3.typebotstorage.com/public/workspaces/cmsodqtlt00000ajdy01a2oa5/typebots/cmsodrpss000004ji0579oaia/bubble-icon?v=1786441335928",
          size: "large",
        },
      }}
    />
  );
};

export default TypebotBubble;
