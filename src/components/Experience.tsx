import { motion } from "framer-motion";
import { careerExperiences } from "@/data/portfolio";

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-20 bg-[#070707] px-6 py-16 text-white md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-4xl md:mb-10"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
            경력
          </span>
          <h2 className="mt-4 break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-4xl">
            AI 제품, 데이터 운영, 사업화를 아우르며 쌓아온 경력입니다.
          </h2>
          <p className="mt-5 max-w-3xl break-words text-balance font-body text-base leading-7 text-white/65 md:text-lg">
            최신순으로 정리했으며, 각 경험의 업무 맥락과 주도한 역할, 함께 만든 성과를 보여드립니다.
          </p>
        </motion.div>

        <div className="space-y-3">
          {careerExperiences.map((experience, index) => {
            const isCurrent =
              experience.period.includes("Present") ||
              experience.period.includes("현재") ||
              experience.period.includes("진행 중");
            const roleDetails = (
              <>
                {!isCurrent && (
                  <p className="mt-3 max-w-4xl break-words text-pretty font-body text-sm leading-7 text-white/70 md:text-base">
                    {experience.description}
                  </p>
                )}

                <ul className="mt-4 grid gap-3 md:grid-cols-3">
                  {experience.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex min-h-full items-start gap-3 rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                    >
                      <span className="mt-0.5 text-[#ff6645]" aria-hidden="true">
                        →
                      </span>
                      <span className="break-words text-pretty [overflow-wrap:anywhere] font-body text-sm leading-6 text-white/72">{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.05] px-3 py-1.5 font-body text-[11px] font-medium text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            );

            return (
              <motion.article
                key={`${experience.company}-${experience.period}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
                className={`rounded-2xl border bg-[#111111] p-5 md:p-6 ${
                  isCurrent ? "border-[#ff6645]/45 shadow-[0_18px_70px_rgba(255,102,69,.08)]" : "border-white/10"
                }`}
              >
                <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                        {experience.company}
                      </h3>
                      {experience.companyDesc && (
                        <span className="rounded-full border border-white/10 px-3 py-1 font-body text-[11px] font-medium text-white/55">
                          <span className="break-words [overflow-wrap:anywhere]">{experience.companyDesc}</span>
                        </span>
                      )}
                      {isCurrent && (
                        <span className="rounded-full bg-[#ff6645] px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                          재직 중
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-body text-sm font-semibold text-[#ff7a5f]">{experience.title}</p>
                  </div>

                  <div className="shrink-0 md:text-right">
                    <p className="font-body text-sm font-medium text-white/65">{experience.period}</p>
                    {experience.team && <p className="mt-1 font-body text-xs text-white/55">{experience.team}</p>}
                  </div>
                </header>

                {isCurrent && (
                  <p className="mt-4 max-w-4xl break-words text-pretty font-body text-sm leading-7 text-white/70 md:text-base">
                    {experience.description}
                  </p>
                )}

                <details className="group mt-4 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-2">
                  <summary className="min-h-11 cursor-pointer list-none py-2 font-body text-xs font-bold uppercase tracking-[0.14em] text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]">
                    <span className="inline-flex items-center gap-2">
                      경력 상세 보기
                      <span
                        className="text-[#ff6645] transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <div className="pb-3 pt-1">{roleDetails}</div>
                </details>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
