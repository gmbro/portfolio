import { motion } from "framer-motion";
import { careerExperiences } from "@/data/portfolio";

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-20 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            EXPERIENCE
          </span>
          <h2 className="mt-3 break-keep font-display text-3xl font-bold text-foreground md:text-5xl">
            마케팅에서 AI·데이터와 사업개발까지 확장했습니다.
          </h2>
          <p className="mt-5 max-w-3xl break-keep font-body text-base leading-7 text-muted-foreground">
            사용자 반응을 읽는 일에서 시작해 제품 운영, 0→1 AI 서비스, 데이터 구축과 B2B·B2G 사업화로
            경험을 넓혀 왔습니다.
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {careerExperiences.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${experience.period}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.25) }}
              className="glass-card glass-card-hover rounded-2xl p-6 transition-all duration-500 md:p-10"
            >
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                      {experience.company}
                    </h3>
                    <span className="rounded-full border border-border px-2.5 py-1 font-body text-[11px] text-muted-foreground">
                      {experience.companyDesc}
                    </span>
                  </div>
                  <p className="font-body text-sm font-semibold text-primary">{experience.title}</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="font-body text-sm text-muted-foreground">{experience.period}</p>
                  <p className="mt-1 font-body text-xs text-muted-foreground/60">{experience.team}</p>
                </div>
              </div>

              <p className="mb-6 break-keep font-body text-sm leading-7 text-muted-foreground md:text-base">
                {experience.description}
              </p>

              <div className="mb-6 space-y-3">
                {experience.achievements.map((achievement) => (
                  <div key={achievement} className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 text-primary" aria-hidden="true">→</span>
                    <span className="break-keep font-body text-sm leading-6 text-foreground/90">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1.5 font-body text-[11px] font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
