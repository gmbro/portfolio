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
            다양한 환경에서 제품과 사업의 문제를 해결해왔습니다.
          </h2>
          <div className="mt-5 max-w-3xl break-words text-pretty font-body text-base leading-7 text-white/65 md:text-lg">
            <p>
              커머스, 데이터, 클라우드·공공 SaaS, 헬스케어 제품 개발까지 다양한 도메인에서
              제품기획·사업개발·프로젝트 운영을 수행하며 고객의 시간과 비용을 줄이는 일에 집중해왔습니다.
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
          <p className="font-body text-[11px] font-bold tracking-[0.1em] text-[#ff8a70]">짧은 경험들을 하나의 방향으로 연결해왔습니다.</p>
          <h3
            id="career-direction-title"
            className="mt-3 max-w-3xl break-words text-balance font-display text-2xl font-bold leading-tight text-white md:text-3xl"
          >
            재직 기간이 짧아 보일 수 있지만, 제 커리어의 방향은 일관됐습니다.
          </h3>
          <div className="mt-4 max-w-4xl space-y-3 break-words text-pretty font-body text-sm leading-7 text-white/70 md:text-base">
            <p>여러 회사를 거치며 고객군과 도메인은 달랐지만, 제가 집중해온 문제는 일관됐습니다.</p>
            <p>고객의 시간과 비용을 줄이고, 기술을 실제 제품과 사업 성과로 연결하는 일입니다.</p>
            <p>
              공백기에는 짧게 재직한 스타트업 경험들과 다음 역할에 필요한 도메인 학습을 이어왔습니다. 어려운
              과정을 겪으면서 제가 가장 잘할 수 있는 일을 고민하였습니다.
            </p>
            <p>
              이제는 고객 문제를 깊게 이해하고 빠르게 검증하며, AI 기반의 차별화된 해결책을 함께 만들어갈 수
              있는 조직에서 장기적으로 기여하고 싶습니다.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default Experience;
