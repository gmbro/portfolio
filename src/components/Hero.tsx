import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { portfolioExperienceLogos } from "@/data/heroLogos";
import { defaultHeroContent, type HeroContent } from "@/types/portfolio";

export const portfolioHeroBackground =
  "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/background.png";

interface HeroProps {
  content?: HeroContent;
  showExperienceLogos?: boolean;
}

const highlightHeadline = (line: string, highlight?: string) => {
  if (!highlight || !line.includes(highlight)) return line;

  const [before, ...afterParts] = line.split(highlight);
  return (
    <>
      {before}
      <span className="text-[#ff6645] [overflow-wrap:normal] [word-break:keep-all]">{highlight}</span>
      {afterParts.join(highlight)}
    </>
  );
};

const Hero = ({ content = defaultHeroContent, showExperienceLogos = true }: HeroProps) => {
  const headlineLines = content.headline.split("\n").filter(Boolean);
  const stats = content.stats ?? [];

  return (
    <section id="hero" className="relative flex min-h-[100svh] overflow-hidden bg-[#070707] px-6 pb-20 pt-28 text-white md:px-12 md:pb-24 md:pt-32">
      <img
        className="portfolio-hero__media pointer-events-none absolute inset-0 h-full w-full"
        src={portfolioHeroBackground}
        alt=""
        width="1720"
        height="764"
        decoding="async"
        {...{ fetchpriority: "high" }}
      />
      <div className="portfolio-hero__scrim pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black, transparent 78%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex max-w-full flex-wrap items-center gap-2"
        >
          <span className="max-w-full break-words rounded-full border border-[#ff6645]/35 bg-[#ff6645]/10 px-4 py-2 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff8a70] sm:text-xs md:text-sm">
            {content.roleLabel}
            {content.careerLabel && <span className="ml-2 text-white/45">{content.careerLabel}</span>}
          </span>
        </motion.div>

        <h1
          aria-label={headlineLines.join(" ")}
          className="mt-6 max-w-7xl break-words text-balance font-display text-[2.25rem] font-extrabold leading-[1.12] tracking-[-0.04em] text-white sm:text-5xl md:mt-8 md:text-[3.25rem] md:leading-[1.08] lg:text-[3.5rem] xl:text-[4.5rem]"
        >
          {headlineLines.map((line, index) => (
            <span key={`${line}-${index}`} className="block" aria-hidden="true">
              {highlightHeadline(line, content.highlight)}
            </span>
          ))}
        </h1>

        {content.subcopy.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-5 max-w-3xl space-y-1 break-words text-pretty font-body text-[0.95rem] leading-7 text-white/70 md:mt-6 md:text-lg md:leading-8"
          >
            {content.subcopy.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-5 flex flex-wrap gap-2 md:mt-6"
          aria-label="핵심 역량"
        >
          {content.keywords.map((keyword) => (
            <span
              key={keyword}
              className="max-w-full break-words rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-body text-xs font-semibold text-white/80 md:text-sm"
            >
              {keyword}
            </span>
          ))}
        </motion.div>

        {stats.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`mt-8 grid w-full gap-2 md:mt-12 md:gap-4 ${
              stats.length === 1
                ? "max-w-sm grid-cols-1"
                : stats.length === 2
                  ? "max-w-2xl grid-cols-2"
                  : "max-w-5xl grid-cols-3"
            }`}
          >
            {stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="flex min-h-[7.5rem] min-w-0 flex-col justify-between rounded-2xl border border-white/10 bg-[#111111]/90 px-3 py-4 shadow-[0_16px_60px_rgba(0,0,0,.25)] md:min-h-[7.875rem] md:rounded-3xl md:px-6 md:py-6"
              >
                <dd className="break-words font-display text-[1.35rem] font-extrabold leading-none tracking-[-0.03em] text-white sm:text-3xl md:text-5xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 break-keep font-body text-[10px] font-medium leading-4 text-white/55 [overflow-wrap:break-word] sm:text-xs md:text-sm md:leading-5">
                  {stat.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        )}

        {showExperienceLogos && (
          <div className="mt-7 w-full max-w-5xl md:mt-8">
            <h2
              id="hero-partner-title"
              className="font-body text-xs font-semibold tracking-[0.08em] text-white/60 md:text-sm"
            >
              수행 프로젝트 협업사
            </h2>
            <ul
              className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-10 md:mt-7 md:gap-x-12 md:gap-y-10"
              aria-labelledby="hero-partner-title"
            >
              {portfolioExperienceLogos.map((logo) => (
                <li key={logo.id} className="flex h-12 min-w-0 items-center justify-center sm:h-16">
                  <img
                    data-hero-logo={logo.id}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain brightness-0 invert opacity-75"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-white/55 md:flex">
        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em]">About</span>
        <ChevronDown size={14} aria-hidden="true" />
      </div>
    </section>
  );
};

export default Hero;
