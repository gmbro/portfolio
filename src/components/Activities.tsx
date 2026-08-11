import { motion } from "framer-motion";
import { activities } from "@/data/portfolio";

const Activities = () => {
  return (
    <section id="activities" className="scroll-mt-20 px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl md:mb-16"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            ACTIVITIES & AWARDS
          </span>
          <h2 className="mt-4 break-keep font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
            AI를 활용하는 것과 함께 <span className="text-gradient">안전하게 검증하는 법</span>도 배웠습니다.
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {activities.map((activity, index) => (
            <motion.article
              key={`${activity.year}-${activity.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {activity.year}
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1.5 font-display text-xs font-bold text-primary">
                  {activity.highlight}
                </span>
              </div>
              <h3 className="break-keep font-display text-xl font-bold leading-snug text-foreground">
                {activity.title}
              </h3>
              <p className="mt-4 break-keep font-body text-sm leading-7 text-muted-foreground">
                {activity.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
