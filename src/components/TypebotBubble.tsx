import { Bubble, hidePreviewMessage, showPreviewMessage } from "@typebot.io/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TypebotBubble = () => {
  const { pathname } = useLocation();
  const isPublicPortfolio = pathname === "/" || pathname.startsWith("/p/");

  useEffect(() => {
    let previewTimer: number | undefined;

    const hidePreviewAfterHero = () => {
      if (window.scrollY <= 120) return;
      if (previewTimer !== undefined) window.clearTimeout(previewTimer);
      hidePreviewMessage();
    };

    if (window.scrollY <= 120) {
      previewTimer = window.setTimeout(() => {
        if (window.scrollY <= 120) showPreviewMessage();
      }, 2500);
    } else {
      hidePreviewMessage();
    }

    window.addEventListener("scroll", hidePreviewAfterHero, { passive: true });
    return () => {
      if (previewTimer !== undefined) window.clearTimeout(previewTimer);
      window.removeEventListener("scroll", hidePreviewAfterHero);
    };
  }, [pathname]);

  if (!isPublicPortfolio) return null;

  return (
    <Bubble
      typebot="gmbro"
      apiHost="https://typebot.io"
      previewMessage={{
        message: "답변해드립니다",
      }}
      theme={{
        button: {
          backgroundColor: "#0042DA",
          customIconSrc:
            "https://s3.typebotstorage.com/public/workspaces/cmsodqtlt00000ajdy01a2oa5/typebots/cmsodrpss000004ji0579oaia/bubble-icon?v=1786441335928",
          size: "large",
        },
        previewMessage: {
          backgroundColor: "#FFFFFF",
          textColor: "#111111",
        },
      }}
    />
  );
};

export default TypebotBubble;
