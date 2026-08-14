import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { parsePortfolioPageContent, type PortfolioPublication } from "@/types/portfolio";
import Index from "@/pages/Index";

const usePageMetadata = (title: string, noindex = true) => {
  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const robots = existingRobots ?? document.createElement("meta");
    const previousRobots = robots.content;

    robots.name = "robots";
    robots.content = noindex ? "noindex, nofollow" : "index, follow";
    if (!existingRobots) document.head.appendChild(robots);
    document.title = title;

    return () => {
      document.title = previousTitle;
      if (!existingRobots) robots.remove();
      else robots.content = previousRobots;
    };
  }, [noindex, title]);
};

interface StateScreenProps {
  title: string;
  description: string;
  showHomeLink?: boolean;
}

const StateScreen = ({ title, description, showHomeLink = false }: StateScreenProps) => (
  <main className="flex min-h-screen items-center justify-center bg-black px-6 py-20 text-center text-white">
    <div className="w-full max-w-[760px] rounded-[2.5rem] border border-white/10 bg-[#0b0b0b] px-7 py-14 shadow-2xl shadow-black/50 md:rounded-[3rem] md:px-14 md:py-20">
      <p className="text-sm font-semibold tracking-[0.08em] text-[#ff6645] md:text-lg">포트폴리오</p>
      <h1 className="mt-6 break-words text-balance text-[2rem] font-extrabold leading-[1.2] tracking-tight text-white md:mt-7 md:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-2xl break-words text-pretty text-base leading-relaxed text-white/55 md:mt-7 md:text-2xl">
        {description}
      </p>
      {showHomeLink && (
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] focus-visible:ring-offset-4 focus-visible:ring-offset-black md:mt-10 md:text-base"
        >
          기본 포트폴리오 보기
        </Link>
      )}
    </div>
  </main>
);

const CompanyPortfolio = () => {
  const { slug = "" } = useParams();

  const publicationQuery = useQuery({
    queryKey: ["portfolio-publication", slug],
    enabled: isSupabaseConfigured && Boolean(slug),
    queryFn: async () => {
      if (!supabase) throw new Error("Supabase 연결이 설정되지 않았습니다.");

      const { data, error } = await supabase
        .rpc("get_public_portfolio_by_slug", { p_slug: slug })
        .maybeSingle();

      if (error) throw error;
      return data as PortfolioPublication | null;
    },
  });

  const pageContent = publicationQuery.data
    ? parsePortfolioPageContent(publicationQuery.data.published_content)
    : null;

  usePageMetadata(
    pageContent?.meta?.pageTitle ??
      (pageContent?.meta?.roleTitle
        ? `${pageContent.meta.roleTitle} 맞춤 포트폴리오 | 이경민`
        : "맞춤 포트폴리오 | 이경민"),
    publicationQuery.data?.noindex ?? true,
  );

  if (!isSupabaseConfigured) {
    return <StateScreen title="연결 확인이 필요합니다" description="포트폴리오 데이터 연결을 확인해 주세요." />;
  }

  if (publicationQuery.isLoading) {
    return <StateScreen title="포트폴리오를 불러오는 중입니다" description="잠시만 기다려 주세요." />;
  }

  if (publicationQuery.isError) {
    return <StateScreen title="포트폴리오를 열 수 없습니다" description="잠시 후 다시 시도해 주세요." />;
  }

  if (!publicationQuery.data) {
    return (
      <StateScreen
        title="유효하지 않은 링크입니다"
        description="링크가 중지되었거나 만료되었을 수 있습니다."
        showHomeLink
      />
    );
  }

  if (!pageContent) {
    return (
      <StateScreen
        title="포트폴리오를 업데이트하고 있습니다"
        description="이 포트폴리오 버전은 아직 공개되지 않았습니다."
      />
    );
  }

  return <Index heroContent={pageContent.hero} />;
};

export default CompanyPortfolio;
