import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { defaultHeroContent, type HeroContent } from "@/types/portfolio";

interface HeroProps {
  content?: HeroContent;
}

const highlightHeadline = (line: string, highlight?: string) => {
  if (!highlight || !line.includes(highlight)) return line;

  const [before, ...afterParts] = line.split(highlight);
  return (
    <>
      {before}
      <span className="text-[#ff6645]">{highlight}</span>
      {afterParts.join(highlight)}
    </>
  );
};

const Hero = ({ content = defaultHeroContent }: HeroProps) => {
  const headlineLines = content.headline.split("\n").filter(Boolean);
  const stats = content.stats ?? [];

  return (
    <section className="relative flex min-h-[100svh] overflow-hidden bg-[#070707] px-6 pb-20 pt-28 text-white md:px-12 md:pb-24 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at 12% 16%, rgba(255,102,69,.23), transparent 32%), radial-gradient(circle at 86% 78%, rgba(255,129,10,.12), transparent 30%), #070707",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
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
          className="flex flex-wrap items-center gap-2"
        >
          <span className="rounded-full border border-[#ff6645]/35 bg-[#ff6645]/10 px-4 py-2 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-[#ff8a70] sm:text-xs md:text-sm">
            {content.roleLabel}
            {content.careerLabel && <span className="ml-2 text-white/45">{content.careerLabel}</span>}
          </span>
        </motion.div>

        <motion.h1
          aria-label={headlineLines.join(" ")}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          className="mt-7 max-w-6xl break-keep font-display text-[2.5rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:mt-9 md:text-6xl lg:text-[5rem]"
        >
          {headlineLines.map((line, index) => (
            <span key={`${line}-${index}`} className="block" aria-hidden="true">
              {highlightHeadline(line, content.highlight)}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-7 max-w-3xl space-y-1 break-keep font-body text-base leading-7 text-white/65 md:text-lg md:leading-8"
        >
          {content.subcopy.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-6 flex flex-wrap gap-2"
          aria-label="핵심 역량"
        >
          {content.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-body text-xs font-semibold text-white/80 md:text-sm"
            >
              {keyword}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="mt-8"
        >
          <button
            type="button"
            onClick={() => {
              const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              document
                .getElementById(content.ctaTarget)
                ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
            }}
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ff6645] px-6 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-[#ff7a5f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] focus-visible:ring-offset-4 focus-visible:ring-offset-[#070707] md:min-h-14 md:px-8"
          >
            {content.ctaLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </button>
        </motion.div>

        {stats.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid w-full max-w-5xl grid-cols-3 gap-2 md:mt-14 md:gap-4"
          >
            {stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="min-w-0 rounded-2xl border border-white/10 bg-[#111111]/90 px-2 py-4 shadow-[0_16px_60px_rgba(0,0,0,.25)] md:rounded-3xl md:px-6 md:py-6"
              >
                <dd className="whitespace-nowrap font-display text-[1.35rem] font-extrabold tracking-[-0.03em] text-white sm:text-3xl md:text-5xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 font-body text-[10px] font-medium leading-4 text-white/50 sm:text-xs md:mt-2 md:text-sm md:leading-5">
                  {stat.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        )}
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-white/55 md:flex">
        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em]">대표 프로젝트</span>
        <ChevronDown size={14} aria-hidden="true" />
      </div>
    </section>
  );
};

export default Hero;
