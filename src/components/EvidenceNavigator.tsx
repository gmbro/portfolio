import { ArrowDownRight, ChevronDown } from "lucide-react";
import { evidenceCapabilities } from "@/data/evidence";
import { portfolioProjects, type FeaturedProject } from "@/data/portfolio";

const projectById = new Map(portfolioProjects.map((project) => [project.id, project]));

const getEvidenceProject = (projectId: string): FeaturedProject => {
  const project = projectById.get(projectId);
  if (!project) throw new Error(`대표 프로젝트 근거를 찾을 수 없습니다: ${projectId}`);
  return project;
};

const EvidenceNavigator = () => {
  return (
    <section
      id="evidence"
      aria-labelledby="evidence-navigator-title"
      className="scroll-mt-20 bg-[rgba(7,7,7,0.7)] px-6 py-20 text-white md:px-12 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="max-w-4xl">
          <p className="font-body text-xs font-bold uppercase tracking-[0.24em] text-[#ff8a70]">
            Evidence Product
          </p>
          <h2
            id="evidence-navigator-title"
            className="mt-4 break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] md:text-5xl"
          >
            역량을 선택해 연결된 프로젝트 증거를 확인하세요.
          </h2>
          <p className="mt-5 max-w-3xl break-words text-pretty font-body text-base leading-7 text-white/65 md:text-lg md:leading-8">
            각 항목은 대표 프로젝트에 공개된 담당 책임과 성과를 그대로 연결합니다.
          </p>
        </header>

        <div className="mt-10 grid min-w-0 gap-3 md:mt-12 md:gap-4">
          {evidenceCapabilities.map((capability, capabilityIndex) => {
            const projects = capability.projectIds.map(getEvidenceProject);
            const panelId = `evidence-capability-${capability.id}`;

            return (
              <details
                key={capability.id}
                id={panelId}
                open={capabilityIndex === 0}
                className="group min-w-0 scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-[#101010]/95 open:border-[#ff6645]/40 md:rounded-3xl"
              >
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff6645] [&::-webkit-details-marker]:hidden md:min-h-24 md:px-7 md:py-5">
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-display text-xs font-extrabold tracking-[0.14em] text-[#ff6645]"
                    >
                      {String(capabilityIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block break-words font-display text-lg font-bold leading-6 text-white md:text-2xl">
                        {capability.label}
                      </span>
                      <span className="mt-1 block break-words text-xs leading-5 text-white/50 md:text-sm">
                        연결 프로젝트 {projects.length}개
                      </span>
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-white/55 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>

                <div className="min-w-0 border-t border-white/[0.08] px-4 py-5 md:px-7 md:py-7">
                  <div className={`grid min-w-0 gap-4 ${projects.length > 1 ? "xl:grid-cols-2" : ""}`}>
                    {projects.map((project) => {
                      const titleId = `${panelId}-${project.id}-title`;

                      return (
                        <article
                          key={project.id}
                          data-evidence-project={project.id}
                          aria-labelledby={titleId}
                          className="min-w-0 rounded-2xl border border-white/[0.09] bg-black/25 p-5 md:p-6"
                        >
                          <header className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                            <span className="max-w-full break-words rounded-full border border-[#ff6645]/25 bg-[#ff6645]/10 px-3 py-1.5 font-body text-[10px] font-bold leading-4 text-[#ff9a83]">
                              {project.category}
                            </span>
                            <span className="break-words font-body text-xs leading-5 text-white/50">
                              {project.period}
                            </span>
                          </header>

                          <h3
                            id={titleId}
                            className="mt-5 break-words [overflow-wrap:anywhere] text-pretty font-display text-xl font-bold leading-7 text-white md:text-2xl md:leading-8"
                          >
                            {project.title}
                          </h3>

                          <dl className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
                            <div className="min-w-0">
                              <dt className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                                {project.organizationLabel}
                              </dt>
                              <dd className="mt-1.5 break-words [overflow-wrap:anywhere] font-body text-sm font-semibold leading-6 text-white/80">
                                {project.organization}
                              </dd>
                            </div>
                            <div className="min-w-0">
                              <dt className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                                본인 역할
                              </dt>
                              <dd className="mt-1.5 break-words [overflow-wrap:anywhere] font-body text-sm font-semibold leading-6 text-white/80">
                                {project.involvement.value}
                              </dd>
                            </div>
                            <div className="min-w-0 sm:col-span-2">
                              <dt className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-[#ff8a70]">
                                확인된 성과
                              </dt>
                              <dd className="mt-1.5 break-words [overflow-wrap:anywhere] text-pretty font-body text-sm leading-6 text-white/72">
                                {project.result}
                              </dd>
                            </div>
                          </dl>

                          <ul
                            className="mt-5 flex min-w-0 flex-wrap gap-2"
                            aria-label={`${project.title} 성과 지표`}
                          >
                            {project.metrics.map((metric) => (
                              <li
                                key={metric}
                                className="max-w-full break-words [overflow-wrap:anywhere] rounded-xl border border-[#ff6645]/20 bg-[#ff6645]/[0.08] px-3 py-2 font-body text-xs font-bold leading-5 text-[#ff9a83]"
                              >
                                {metric}
                              </li>
                            ))}
                          </ul>

                          <a
                            href={`#${project.id}`}
                            aria-label={`${project.title} 프로젝트로 이동`}
                            className="mt-6 inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-body text-xs font-bold text-white transition-colors hover:border-[#ff6645]/55 hover:text-[#ff9a83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
                          >
                            <span className="min-w-0 break-words">전체 프로젝트에서 확인</span>
                            <ArrowDownRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                          </a>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EvidenceNavigator;
