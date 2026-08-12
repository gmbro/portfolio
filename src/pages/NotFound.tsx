import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const robots = existingRobots ?? document.createElement("meta");
    const previousRobots = robots.content;

    robots.name = "robots";
    robots.content = "noindex, nofollow";
    if (!existingRobots) document.head.appendChild(robots);
    document.title = "페이지를 찾을 수 없습니다 | 이경민";
    return () => {
      document.title = previousTitle;
      if (!existingRobots) robots.remove();
      else robots.content = previousRobots;
    };
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-20 text-center text-white">
      <div className="w-full max-w-[760px] rounded-[2.5rem] border border-white/10 bg-[#0b0b0b] px-7 py-14 shadow-2xl shadow-black/50 md:rounded-[3rem] md:px-14 md:py-20">
        <p className="text-sm font-semibold tracking-[0.08em] text-[#ff6645] md:text-lg">404</p>
        <h1 className="mt-6 text-balance text-[2rem] font-extrabold leading-[1.2] tracking-tight text-white md:mt-7 md:text-5xl">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/55 md:mt-7 md:text-2xl">
          페이지가 이동했거나 주소가 올바르지 않을 수 있습니다.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] focus-visible:ring-offset-4 focus-visible:ring-offset-black md:mt-10 md:text-base"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
