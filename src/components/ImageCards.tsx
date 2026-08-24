import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getProjectChatPrompt } from "@/data/chatbot";
import { portfolioProjects, type FeaturedProject } from "@/data/portfolio";
import { trackChatInteraction, trackPortfolioEvent } from "@/lib/analytics";
import { openPortfolioChat } from "@/lib/chat";
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
      </figure>
    );
  }

  const items: EvidenceMediaItem[] = visual.items?.length
    ? [...visual.items]
    : visual.src
      ? [{ src: visual.src, alt: visual.alt, caption: visual.caption }]
      : [];

  return (
    <div data-visual-slot={project.title}>
      <EvidenceMediaGallery
        projectTitle={visual.title}
        items={items}
        frameAspectRatio={visual.frameAspectRatio}
      />
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: FeaturedProject; index: number }) => {
  const prefersReducedMotion = useReducedMotion();
  const isPriority = index === 0;
  const showsVisual = Boolean(project.visual);
  const headingId = `${project.id}-title`;
  const chatPrompt = getProjectChatPrompt(project.id);
  const evidence = (
    <dl className="grid gap-6 xl:grid-cols-[0.85fr_1.55fr_1fr]">
      <div>
        <dt className="mb-2 font-body text-xs font-bold uppercase leading-5 tracking-[0.16em] text-white/50 md:text-sm">문제</dt>
        <dd className="break-words text-pretty font-body text-[15px] leading-7 text-white/70 md:text-[17px] md:leading-8">{project.challenge}</dd>
      </div>
      <div>
        <dt className="mb-2 font-body text-xs font-bold uppercase leading-5 tracking-[0.16em] text-white/50 md:text-sm">판단·실행</dt>
        <dd className="break-words text-pretty font-body text-[15px] leading-7 text-white/72 md:text-[17px] md:leading-8">{project.action}</dd>
      </div>
      <div>
        <dt className="mb-2 font-body text-xs font-bold uppercase leading-5 tracking-[0.16em] text-[#ff8a70] md:text-sm">성과</dt>
        <dd className="break-words text-pretty font-body text-[15px] font-medium leading-7 text-white/88 md:text-[17px] md:leading-8">{project.result}</dd>
      </div>
    </dl>
  );

  return (
    <motion.article
      id={project.id}
      aria-labelledby={headingId}
      data-section-reveal="project-card"
      data-project-rank={index + 1}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.18) }}
      className={`min-w-0 scroll-mt-24 rounded-3xl border bg-[#111111] p-6 md:p-8 ${
        isPriority ? "lg:p-10" : "border-white/10"
      } ${index === 0 ? "border-[#ff6645]/45 shadow-[0_20px_80px_rgba(255,102,69,.08)]" : "border-white/10"}`}
    >
      <div>
        <div className="min-w-0">
          <header className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <h3
              id={headingId}
              className={`min-w-0 break-words text-balance font-display font-bold leading-[1.25] tracking-[-0.025em] text-white ${
                isPriority ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
              }`}
            >
              {project.title}
            </h3>
            <p
              data-project-period="true"
              className="shrink-0 whitespace-nowrap font-body text-sm font-medium leading-6 tracking-[0.01em] text-white/70 md:text-base md:leading-7"
            >
              <span className="sr-only">프로젝트 기간 </span>
              {project.period}
            </p>
          </header>

          <dl
            data-project-meta="true"
            className="mt-6 grid overflow-hidden rounded-2xl border border-white/[0.08] bg-black/25 md:grid-cols-2"
          >
            <div data-project-meta-field="organization" className="min-w-0 px-4 py-4 md:px-5 md:py-5">
              <dt className="font-body text-xs font-bold uppercase leading-5 tracking-[0.14em] text-white/55 md:text-sm">
                {project.organizationLabel}
              </dt>
              <dd className="mt-2 break-words text-pretty font-body text-[15px] font-semibold leading-7 text-white/90 md:text-[17px] md:leading-8">
                {project.organization}
              </dd>
            </div>
            <div
              data-project-meta-field="responsibility"
              className="min-w-0 border-t border-white/[0.08] px-4 py-4 md:border-l md:border-t-0 md:px-5 md:py-5"
            >
              <dt className="font-body text-xs font-bold uppercase leading-5 tracking-[0.14em] text-white/55 md:text-sm">
                {project.involvement.label}
              </dt>
              <dd className="mt-2 break-words text-pretty font-body text-[15px] font-semibold leading-7 text-white/90 md:text-[17px] md:leading-8">
                {project.involvement.value}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {showsVisual && <div className="mt-8"><ProjectVisual project={project} /></div>}

      <div className="mt-8">{evidence}</div>

      {(chatPrompt || project.link) && (
        <footer className="mt-8 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          {chatPrompt && (
            <button
              type="button"
              data-chat-exclusion="true"
              onClick={(event) => {
                trackChatInteraction("project_ai_open", {
                  path: chatPrompt.path,
                  source: "project",
                  questionId: chatPrompt.questionId,
                  projectId: project.id,
                });
                openPortfolioChat(event.currentTarget, chatPrompt);
              }}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#fff1ed] px-4 py-2 font-body text-xs font-bold text-[#b93822] transition-colors hover:bg-[#ffe4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] sm:w-auto"
            >
              <Sparkles size={15} aria-hidden="true" />
              이 프로젝트를 AI에게 묻기
            </button>
          )}
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-chat-exclusion="true"
              onClick={() => {
                if (project.id === "arkylab-ai-coach") trackPortfolioEvent("select_content");
              }}
              aria-label={project.id === "arkylab-ai-coach" ? "베타 서비스 보기, 새 창에서 열기" : undefined}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 font-body text-xs font-bold text-white transition-colors hover:border-[#ff6645]/60 hover:text-[#ff8a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] sm:w-auto"
            >
              {project.link.label}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </footer>
      )}
    </motion.article>
  );
};

const ImageCards = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="case-studies" className="portfolio-section-surface scroll-mt-20 px-6 py-16 text-white md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          data-section-reveal="projects"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-4xl md:mb-10"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
            Projects
          </span>
          <h2 className="mt-4 break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-5xl">
            문제를 성과로 바꾼 프로젝트를 소개합니다.
          </h2>
          <p className="mt-6 max-w-3xl break-words text-balance font-body text-base leading-7 text-white/65 md:text-lg">
            기술을 활용해 고객의 시간과 비용을 줄인 과정을 문제·판단·실행·성과 순서로 정리했습니다.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:gap-6">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCards;
