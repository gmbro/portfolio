import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/portfolio";

const ImageCards = () => {
  return (
    <section id="case-studies" className="scroll-mt-20 bg-[hsl(0_0%_4%)] px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl md:mb-16"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
            SELECTED PROJECTS
          </span>
          <h2 className="mt-4 break-keep font-display text-3xl font-bold leading-tight md:text-5xl">
            AI 기술을 <span className="text-[#ff6645]">서비스와 운영 성과</span>로 연결한 경험입니다.
          </h2>
          <p className="mt-6 break-keep font-body text-base leading-7 text-white/60 md:text-lg">
            문제 정의, 제가 맡은 실행과 검증된 결과를 중심으로 정리했습니다. 모델 개발이 아니라
            서비스 기획, 기술 연계, 데이터 운영과 프로젝트 관리 역할을 구분해 설명합니다.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.3) }}
              className="flex h-full min-w-0 flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.18)] transition-colors hover:border-[#ff6645]/35 md:p-8"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full border border-[#ff6645]/30 bg-[#ff6645]/10 px-3 py-1.5 font-body text-[11px] font-semibold text-[#ff7a5f]">
                  {project.category}
                </span>
                <span className="font-body text-xs text-white/40">{project.period}</span>
              </div>

              <h3 className="break-keep font-display text-xl font-bold leading-snug text-white md:text-2xl">
                {project.title}
              </h3>

              <dl className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <dt className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    {project.organizationLabel}
                  </dt>
                  <dd className="mt-1 break-keep font-body text-sm font-semibold leading-5 text-white/90">
                    {project.organization}
                  </dd>
                </div>
                <div className="w-fit shrink-0 rounded-xl border border-[#ff6645]/30 bg-[#ff6645]/10 px-3 py-2 sm:text-right">
                  <dt className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff9a83]">
                    {project.involvement.label}
                  </dt>
                  <dd className="mt-0.5 whitespace-nowrap font-display text-sm font-bold text-white">
                    {project.involvement.value}
                  </dd>
                </div>
              </dl>

              <dl className="mt-7 space-y-5">
                <div>
                  <dt className="mb-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Challenge
                  </dt>
                  <dd className="break-keep font-body text-sm leading-6 text-white/65">{project.challenge}</dd>
                </div>
                <div>
                  <dt className="mb-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Action
                  </dt>
                  <dd className="break-keep font-body text-sm leading-6 text-white/75">{project.action}</dd>
                </div>
                <div>
                  <dt className="mb-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff7a5f]">
                    Result
                  </dt>
                  <dd className="break-keep font-body text-sm font-medium leading-6 text-white/90">{project.result}</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-display text-xs font-bold text-white"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-body text-[11px] text-white/40">
                      #{tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-body text-xs font-semibold text-white transition-colors hover:border-[#ff6645]/60 hover:text-[#ff7a5f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
                  >
                    {project.link.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCards;
