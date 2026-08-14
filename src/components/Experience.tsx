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
            회사별 역할과 제품·운영의 맥락을 최신순으로 정리했습니다.
          </h2>
          <div className="mt-5 max-w-3xl space-y-2 break-words text-pretty font-body text-base leading-7 text-white/65 md:text-lg">
            <p>2018년 이후 회사 경력은 정규직이었으며, 현재는 1인 사업자로 Archi(아키)를 운영하고 있습니다.</p>
            <p>2017년 Kakao Commerce 인턴 경험을 포함해 제품과 책임 범위가 어떻게 확장됐는지 보여드립니다.</p>
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
                        <span className="break-words">{experience.companyDesc}</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-2 break-words font-body text-sm font-semibold leading-6 text-[#ff7a5f]">
                    {experience.title}
                    {experience.team && experience.team !== experience.title ? ` · ${experience.team}` : ""}
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
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mt-12 rounded-3xl border border-[#ff6645]/25 bg-[#ff6645]/[0.06] p-6 md:p-8"
          aria-labelledby="career-direction-title"
        >
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff8a70]">커리어 방향</p>
          <h3
            id="career-direction-title"
            className="mt-3 max-w-3xl break-words text-balance font-display text-2xl font-bold leading-tight text-white md:text-3xl"
          >
            다음 선택에서는 조직의 목표를 중요한 기준으로 봅니다.
          </h3>
          <p className="mt-4 max-w-4xl break-words text-pretty font-body text-sm leading-7 text-white/70 md:text-base">
            지금까지의 이직은 개인의 성장과 역량 향상을 위한 선택이었습니다. 향후 2~3년의 목표는 조직의 목표에
            깊이 기여하며, 고객 문제를 확실히 해결하는 완성도 높은 제품을 만드는 것입니다.
          </p>
        </motion.aside>
      </div>
    </section>
  );
};

export default Experience;
