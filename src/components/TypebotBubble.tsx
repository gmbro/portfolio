import { Bubble, open } from "@typebot.io/react";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TypebotBubble = () => {
  const { pathname } = useLocation();
  const isPublicPortfolio = pathname === "/" || pathname.startsWith("/p/");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setIsChatOpen(false);
  }, [pathname]);

  if (!isPublicPortfolio) return null;

  return (
    <>
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
          },
        }}
      />

      {!isChatOpen && (
        <button
          type="button"
          onClick={() => open()}
          aria-label="AI 포트폴리오 챗봇 열기: 경력과 프로젝트 질문하기"
          className="fixed bottom-9 right-[5.75rem] z-[424241] inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-black/90 px-3 py-2 font-body text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-colors hover:border-[#ff6645]/70 hover:text-[#ff9a83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          <MessageCircle size={14} strokeWidth={2.5} aria-hidden="true" />
          경력·프로젝트 Q&amp;A
        </button>
      )}
    </>
  );
};

export default TypebotBubble;
