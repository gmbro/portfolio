import { useEffect, useRef, useState } from "react";

export const portfolioAmbientVideo =
  "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/colorflow-animation.mp4";

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

const PortfolioAmbient = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    let revealTimer: number | undefined;
    const revealAfterFirstLoad = () => {
      if (reduceMotion.matches || saveData) return;
      if (revealTimer !== undefined) window.clearTimeout(revealTimer);
      revealTimer = window.setTimeout(() => setShowVideo(true), 300);
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        if (revealTimer !== undefined) window.clearTimeout(revealTimer);
        setShowVideo(false);
        return;
      }
      if (document.readyState === "complete") revealAfterFirstLoad();
    };

    reduceMotion.addEventListener("change", handleMotionPreference);
    if (!reduceMotion.matches && !saveData) {
      if (document.readyState === "complete") revealAfterFirstLoad();
      else window.addEventListener("load", revealAfterFirstLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", revealAfterFirstLoad);
      reduceMotion.removeEventListener("change", handleMotionPreference);
      if (revealTimer !== undefined) window.clearTimeout(revealTimer);
    };
  }, []);

  useEffect(() => {
    if (!showVideo) return;

    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) video.pause();
      else if (!video.ended) void video.play().catch(() => undefined);
    };

    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [showVideo]);

  return (
    <div className="portfolio-ambient" aria-hidden="true">
      <div className="portfolio-ambient__fallback" />
      {showVideo && (
        <video
          ref={videoRef}
          className="portfolio-ambient__video"
          src={portfolioAmbientVideo}
          autoPlay
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          onError={() => setShowVideo(false)}
        />
      )}
      <div className="portfolio-ambient__veil" />
    </div>
  );
};

export default PortfolioAmbient;
