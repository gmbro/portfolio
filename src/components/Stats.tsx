import { motion } from "framer-motion";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Projects Delivered" },
  { value: "$50M+", label: "Revenue Generated" },
  { value: "98%", label: "Client Retention" },
];

const clientLogos = [
  "TechCorp", "DataFlow", "CloudSync", "NetScale", "PixelForge", "Quantum AI",
];

const Stats = () => {
  return (
    <section className="py-28 px-6 md:px-16 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(8_78%_58%/0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-8 rounded-2xl glass-card"
            >
              <span className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-gradient block">
                {stat.value}
              </span>
              <p className="text-xs md:text-sm text-muted-foreground font-body mt-3 tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20"
        >
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground/50 font-body mb-10">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {clientLogos.map((logo) => (
              <span
                key={logo}
                className="text-lg md:text-xl font-display font-bold text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors duration-500 cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
