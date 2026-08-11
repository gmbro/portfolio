import { Bubble } from "@typebot.io/react";
import { useLocation } from "react-router-dom";

const TypebotBubble = () => {
  const { pathname } = useLocation();
  const isPublicPortfolio = pathname === "/" || pathname.startsWith("/p/");

  if (!isPublicPortfolio) return null;

  return (
    <Bubble
      typebot="gmbro"
      apiHost="https://typebot.io"
      theme={{
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
