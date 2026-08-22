import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioProjects, type FeaturedProject } from "@/data/portfolio";
import { trackPortfolioEvent } from "@/lib/analytics";
import EvidenceMediaGallery, { type EvidenceMediaItem } from "@/components/EvidenceMediaGallery";

const ProjectVisual = ({ project }: { project: FeaturedProject }) => {
  const visual = project.visual;
  if (!visual) return null;

  if (visual.src && visual.type === "video") {
    return (
      <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <video
          controls
          preload="metadata"
          poster={visual.poster}
          className="aspect-[16/10] w-full bg-black object-contain"
          aria-label={visual.alt}
        >
          <source src={visual.src} />
        </video>
        {visual.caption && <figcaption className="px-4 py-3 text-xs leading-5 text-white/60">{visual.caption}</figcaption>}
      </figure>
    );
  }

  const items: EvidenceMediaItem[] = visual.src
    ? [{ src: visual.src, alt: visual.alt, caption: visual.caption }]
    : [];

  return (
    <div data-visual-slot={project.title}>
      <EvidenceMediaGallery projectTitle={visual.title} items={items} />
      {items.length === 0 && visual.placeholderItems.length > 0 && (
        <ul className="mt-3 grid gap-2 rounded-2xl border border-white/[0.08] bg-black/20 p-4">
          {visual.placeholderItems.map((item) => (
            <li key={item} className="flex items-start gap-2 font-body text-xs leading-5 text-white/55">
              <span className="text-[#ff6645]" aria-hidden="true">+</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: FeaturedProject; index: number }) => {
  const isPriority = index === 0;
  const showsVisual = Boolean(project.visual);
  const evidence = (
    <dl className={`grid gap-6 ${isPriority ? "lg:grid-cols-3" : ""}`}>
      <div>
        <dt className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">문제</dt>
        <dd className="break-words text-pretty font-body text-sm leading-6 text-white/70">{project.challenge}</dd>
      </div>
      <div>
        <dt className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">판단·실행</dt>
        <dd className="break-words text-pretty font-body text-sm leading-6 text-white/72">{project.action}</dd>
      </div>
      <div>
        <dt className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff8a70]">성과</dt>
        <dd className="break-words text-pretty font-body text-sm font-medium leading-6 text-white/88">{project.result}</dd>
      </div>
    </dl>
  );

  return (
    <motion.article
      id={project.id}
      data-project-rank={index + 1}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.18) }}
      className={`min-w-0 scroll-mt-24 rounded-3xl border bg-[#111111] p-6 md:p-8 ${
        isPriority ? "lg:col-span-2 lg:p-10" : "border-white/10"
      } ${index === 0 ? "border-[#ff6645]/45 shadow-[0_20px_80px_rgba(255,102,69,.08)]" : "border-white/10"}`}
    >
      <div className={isPriority && showsVisual ? "grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10" : ""}>
        <div className="min-w-0">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-[#ff6645]/30 bg-[#ff6645]/10 px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.1em] text-[#ff8a70]">
              {project.category}
            </span>
            <span className="font-body text-xs font-medium text-white/55">{project.period}</span>
          </header>

          <h3
            className={`mt-6 break-words text-balance font-display font-bold leading-[1.25] tracking-[-0.025em] text-white ${
              isPriority ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
            }`}
          >
            {project.title}
          </h3>

          <dl className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-black/25 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <dt className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                {project.organizationLabel}
              </dt>
              <dd className="mt-1 break-words font-body text-sm font-semibold leading-5 text-white/85">{project.organization}</dd>
            </div>
            <div className="w-fit max-w-full shrink-0 rounded-xl border border-[#ff6645]/25 bg-[#ff6645]/10 px-3 py-2 sm:max-w-[48%] sm:text-right">
              <dt className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff9a83]">
                {project.involvement.label}
              </dt>
              <dd className="mt-0.5 break-words font-display text-sm font-bold leading-5 text-white">
                {project.involvement.value}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-2" aria-label="검증된 성과">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="max-w-full break-words text-pretty rounded-xl border border-[#ff6645]/20 bg-[#ff6645]/[0.08] px-3 py-2 font-display text-xs font-bold text-[#ff9a83]"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>

        {isPriority && showsVisual && <ProjectVisual project={project} />}
      </div>

      {!isPriority && showsVisual && <div className="mt-6"><ProjectVisual project={project} /></div>}

      <div className="mt-8">{evidence}</div>

      <footer className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-white/[0.07] pt-6">
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {project.tags.map((tag) => (
            <span key={tag} className="break-words font-body text-[11px] text-white/50">
              #{tag}
            </span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer"
            data-chat-exclusion="true"
            onClick={() => {
              if (project.id === "arkylab-ai-coach") trackPortfolioEvent("select_content");
            }}
            aria-label={project.id === "arkylab-ai-coach" ? "Archi 베타 보기, 새 창에서 열기" : undefined}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-body text-xs font-bold text-white transition-colors hover:border-[#ff6645]/60 hover:text-[#ff8a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
          >
            {project.link.label}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
      </footer>
    </motion.article>
  );
};

const ImageCards = () => {
  return (
    <section id="case-studies" className="portfolio-section-surface scroll-mt-20 px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div id="product-proof" className="scroll-mt-24" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-4xl md:mb-16"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
            프로젝트
          </span>
          <h2 className="mt-4 break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-5xl">
            무엇을 결정했고, 무엇이 달라졌는지 보여드립니다.
          </h2>
          <p className="mt-6 max-w-3xl break-words text-balance font-body text-base leading-7 text-white/65 md:text-lg">
            최신 AI 프로젝트부터 대규모 제품 운영까지, 문제·판단·실행·성과 순서로 확인할 수 있습니다.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCards;
