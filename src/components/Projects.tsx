import { motion } from "framer-motion";

const caseStudies = [
  { title: "SaaS Platform", metric: "+312% Organic Traffic", category: "SEO & Content", duration: "6 months" },
  { title: "FinTech Startup", metric: "5.2x ROAS", category: "Paid Media", duration: "3 months" },
  { title: "Enterprise SaaS", metric: "+187% MQL Growth", category: "Full Funnel", duration: "12 months" },
  { title: "B2B Marketplace", metric: "68% Lower CAC", category: "CRO & Analytics", duration: "4 months" },
];

const Projects = () => {
  return (
    <section id="work" className="py-32 px-8 md:px-16 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(8_78%_58%/0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body"
        >
          Case Studies
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-display text-foreground mb-20"
        >
          Results that <span className="text-gradient">speak</span>.
        </motion.h2>

        <div className="space-y-0 border-t border-[hsl(0_0%_100%/0.08)]">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-8 border-b border-[hsl(0_0%_100%/0.08)] cursor-pointer hover:pl-4 transition-all duration-500"
            >
              <div className="flex items-center gap-6 md:gap-8">
                <span className="text-muted-foreground/40 text-sm font-body w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                    {study.title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-body mt-1 block md:hidden">{study.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-8 mt-3 md:mt-0 pl-14 md:pl-0">
                <span className="text-sm text-primary font-body font-semibold">{study.metric}</span>
                <span className="text-xs text-muted-foreground font-body hidden md:block">{study.category}</span>
                <span className="text-xs text-muted-foreground/50 font-body">{study.duration}</span>
                <motion.span
                  className="text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
