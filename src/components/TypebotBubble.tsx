import { Bubble } from "@typebot.io/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TypebotBubble = () => {
  const { pathname } = useLocation();
  const isPublicPortfolio = pathname === "/" || pathname.startsWith("/p/");
  const [showBubble, setShowBubble] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!isPublicPortfolio) {
      setShowBubble(false);
      return;
    }

    const updateVisibility = () => {
      const selectedWork = document.getElementById("case-studies");
      if (!selectedWork) {
        setShowBubble(false);
        return;
      }

      const selectedWorkEnd = selectedWork.offsetTop + selectedWork.offsetHeight;
      const contact = document.getElementById("contact");
      const contactIsApproaching = contact
        ? window.scrollY + window.innerHeight * 0.85 >= contact.offsetTop
        : false;

      setShowBubble(window.scrollY >= selectedWorkEnd - 8 && !contactIsApproaching);
    };

    updateVisibility();
    const observer = new MutationObserver(updateVisibility);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [isPublicPortfolio, pathname]);

  if (!isPublicPortfolio) return null;

  return (
    <Bubble
      typebot="gmbro"
      apiHost="https://typebot.io"
      onOpen={() => setIsChatOpen(true)}
      onClose={() => setIsChatOpen(false)}
      theme={{
        button: {
          backgroundColor: "#0042DA",
          customIconSrc:
            "https://s3.typebotstorage.com/public/workspaces/cmsodqtlt00000ajdy01a2oa5/typebots/cmsodrpss000004ji0579oaia/bubble-icon?v=1786441335928",
          size: "large",
          isHidden: !showBubble && !isChatOpen,
        },
      }}
    />
  );
};

export default TypebotBubble;
