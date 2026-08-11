import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    title: "SaaS Platform Rebrand",
    category: "SEO & Content",
    metric: "60%",
    metricLabel: "Traffic Increase",
    description: "Complete SEO overhaul and content strategy that drove massive organic growth in 6 months.",
  },
  {
    title: "FinTech Lead Generation",
    category: "Paid Media",
    metric: "5.2x",
    metricLabel: "Return on Ad Spend",
    description: "Precision-targeted LinkedIn and Google campaigns delivering exceptional ROI for B2B fintech.",
  },
  {
    title: "Enterprise SaaS Growth",
    category: "Full Funnel",
    metric: "187%",
    metricLabel: "MQL Growth",
    description: "End-to-end marketing transformation across SEO, paid, and CRO for enterprise software.",
  },
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-28 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-primary font-body mb-3"
          >
            Case Studies
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl glass-card glass-card-hover overflow-hidden transition-all duration-500 cursor-pointer"
            >
              {/* Metric header */}
              <div className="p-8 pb-4">
                <span className="text-xs font-body font-medium text-muted-foreground uppercase tracking-widest">
                  {study.category}
                </span>
                <div className="mt-4">
                  <span className="text-5xl md:text-6xl font-display font-extrabold text-gradient block leading-none">
                    {study.metric}
                  </span>
                  <span className="text-sm text-muted-foreground font-body mt-1 block">
                    {study.metricLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-4 border-t border-[hsl(0_0%_100%/0.06)]">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-display font-bold text-foreground">
                    {study.title}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1"
                  />
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mt-2">
                  {study.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
