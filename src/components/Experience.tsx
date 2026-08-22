import { motion, useReducedMotion } from "framer-motion";
import { careerExperiences } from "@/data/portfolio";

const Experience = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="experience" className="portfolio-section-surface portfolio-section-surface--strong scroll-mt-20 px-6 py-16 text-white md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          data-section-reveal="experience"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-4xl md:mb-10"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
            Experience
          </span>
          <h2 className="mt-4 break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-4xl">
            다양한 회사를 경험하면서 성장했습니다.
          </h2>
          <div className="mt-5 max-w-3xl break-words text-pretty font-body text-base leading-7 text-white/65 md:text-lg">
            <p>
              카카오커머스에서 퍼포먼스 마케팅 인턴으로 시작해 서비스 운영, AI PM, 사업 개발 등의 직무를
              짧게는 3개월, 길게는 2년 이상 경험하며 조직에 필요한 업무를 수행해 왔습니다.
            </p>
          </div>
        </motion.div>

        <ol className="relative before:absolute before:bottom-0 before:left-[0.3125rem] before:top-2 before:w-px before:bg-white/10">
          {careerExperiences.map((experience, index) => {
            const isCurrent =
              experience.period.includes("Present") ||
              experience.period.includes("현재") ||
              experience.period.includes("진행 중");
            const headingId = `experience-${index}`;

            return (
              <motion.li
                key={`${experience.company}-${experience.period}`}
                data-section-reveal="experience-item"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
                className="relative grid gap-3 border-b border-white/[0.08] py-6 pl-8 last:border-b-0 last:pb-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-[1.875rem] h-3 w-3 rounded-full border-2 bg-[#070707] ${
                    isCurrent ? "border-[#ff6645] shadow-[0_0_0_5px_rgba(255,102,69,.1)]" : "border-white/35"
                  }`}
                />

                <div className="min-w-0">
                  <p className="break-words font-body text-sm font-medium leading-6 text-white/60">
                    {experience.period}
                  </p>
                  <span
                    data-experience-duration={experience.duration}
                    className={`mt-2 inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 font-body text-[10px] font-bold tracking-[0.08em] ${
                      isCurrent
                        ? "border-[#ff6645] bg-[#ff6645] text-white"
                        : "border-[#ff6645]/30 bg-[#ff6645]/10 text-[#ff9a83]"
                    }`}
                  >
                    {experience.duration}
                  </span>
                </div>

                <article aria-labelledby={headingId} className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 id={headingId} className="break-words font-display text-xl font-bold text-white md:text-2xl">
                      {experience.company}
                    </h3>
                    {experience.companyDesc && (
                      <span className="max-w-full rounded-full border border-white/10 px-3 py-1 font-body text-[11px] font-medium text-white/55">
                        <span className="break-words">{experience.companyDesc}</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-2 break-words font-body text-sm font-semibold leading-6 text-[#ff7a5f]">
                    {experience.title}
                    {experience.team && experience.team !== experience.title ? `, ${experience.team}` : ""}
                  </p>
                  <p className="mt-3 max-w-4xl break-words text-pretty font-body text-sm leading-7 text-white/70 md:text-base">
                    {experience.description}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </ol>

        <motion.aside
          data-section-reveal="career-direction"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mt-12 rounded-3xl border border-[#ff6645]/25 bg-[#ff6645]/[0.06] p-6 md:p-8"
          aria-labelledby="career-direction-title"
        >
          <p className="font-body text-[11px] font-bold tracking-[0.1em] text-[#ff8a70]">이런 조직을 선호합니다.</p>
          <h3
            id="career-direction-title"
            className="mt-3 max-w-3xl break-words text-balance font-display text-2xl font-bold leading-tight text-white md:text-3xl"
          >
            완벽한 조직이 아니어도 됩니다. 매출 규모가 크지 않아도 됩니다.
          </h3>
          <p className="mt-4 max-w-4xl break-words text-pretty font-body text-sm leading-7 text-white/70 md:text-base">
            지금까지의 이직은 잦았습니다. 이전에는 개인의 성장과 역량 향상을 위한 선택에 집중했다면, 다음에는
            고객의 문제를 정확히 이해하고 빠르게 검증할 수 있으며, 차별화된 기술 해자를 구축해 시장을 바꾸려는
            의지가 있는 조직을 원합니다.
          </p>
        </motion.aside>
      </div>
    </section>
  );
};

export default Experience;
