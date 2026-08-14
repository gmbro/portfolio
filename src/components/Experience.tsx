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
            사용자 반응 분석에서 AI 제품 기획·운영까지 확장해 온 경력입니다.
          </h2>
          <p className="mt-5 max-w-3xl break-words text-balance font-body text-base leading-7 text-white/65 md:text-lg">
            최신순으로 각 회사에서 맡은 역할과 제품·운영 맥락을 정리했습니다.
          </p>
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
                initial={{ opacity: 0, y: 18 }}
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
                  {isCurrent && (
                    <span className="mt-2 inline-flex rounded-full bg-[#ff6645] px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                      재직 중
                    </span>
                  )}
                </div>

                <article aria-labelledby={headingId} className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 id={headingId} className="break-words font-display text-xl font-bold text-white md:text-2xl">
                      {experience.company}
                    </h3>
                    {experience.companyDesc && (
                      <span className="max-w-full rounded-full border border-white/10 px-3 py-1 font-body text-[11px] font-medium text-white/55">
                        <span className="break-words [overflow-wrap:anywhere]">{experience.companyDesc}</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-2 break-words font-body text-sm font-semibold leading-6 text-[#ff7a5f]">
                    {experience.title}
                    {experience.team && experience.team !== experience.title ? ` · ${experience.team}` : ""}
                  </p>
                  <p className="mt-3 max-w-4xl break-words text-pretty [overflow-wrap:anywhere] font-body text-sm leading-7 text-white/70 md:text-base">
                    {experience.description}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
