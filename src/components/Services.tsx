import { motion } from "framer-motion";
import { Search, FileText, Palette, BarChart3, Globe, Megaphone } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Dominate search rankings with technical SEO, keyword strategy, and link building that drives qualified organic traffic.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    description: "Authority-building content strategies from blogs to whitepapers that educate, engage, and convert your target audience.",
  },
  {
    icon: Palette,
    title: "Web Design",
    description: "High-converting, visually stunning websites built for performance, accessibility, and maximum lead generation.",
  },
  {
    icon: BarChart3,
    title: "Analytics & CRO",
    description: "Data-driven conversion optimization with A/B testing, funnel analysis, and actionable insights that boost ROI.",
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    description: "Precision-targeted campaigns across Google, LinkedIn, and Meta optimized for cost-efficient customer acquisition.",
  },
  {
    icon: Globe,
    title: "Social Media",
    description: "Strategic social presence management that builds brand authority and drives engagement across key B2B platforms.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-28 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-primary font-body mb-3"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold font-display text-foreground"
          >
            What we <span className="text-gradient">deliver</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-7 rounded-2xl glass-card glass-card-hover transition-all duration-500 cursor-pointer"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,hsl(8_78%_58%/0.06)_0%,transparent_60%)] pointer-events-none" />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-[hsl(8_78%_58%/0.1)] flex items-center justify-center mb-5 group-hover:bg-[hsl(8_78%_58%/0.15)] transition-colors duration-500">
                  <service.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
