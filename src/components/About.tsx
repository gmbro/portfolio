import { motion } from "framer-motion";

const workingRange = [
  {
    label: "Product & Project",
    copy: "From 0→1 product definition to proposal, delivery, QA, and closeout.",
  },
  {
    label: "AI & Data",
    copy: "Turning STT, TTS, Retrieval, OCR, and data workflows into services teams can operate.",
  },
  {
    label: "Commercial Context",
    copy: "Experience across B2C, B2B, B2G, SaaS, public procurement, and security reviews.",
  },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-20 bg-[#0a0a0a] px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"
        >
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">ABOUT</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-5xl">
              I bridge product, operations, and commercialization.
            </h2>
          </div>

          <div>
            <div className="max-w-3xl space-y-5 font-body text-base leading-8 text-white/60 md:text-lg">
              <p>
                I began in performance marketing and expanded into product operations, 0→1 AI services,
                data delivery, and B2B/B2G commercialization.
              </p>
              <p>
                My strength is turning ambiguous technical opportunities into requirements, operating
                workflows, and evidence teams can use to decide what to build next.
              </p>
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
              {workingRange.map((item) => (
                <div key={item.label} className="bg-[#111111] p-6 md:min-h-44 md:p-7">
                  <dt className="font-display text-sm font-bold text-[#ff7a5f]">{item.label}</dt>
                  <dd className="mt-3 font-body text-sm leading-6 text-white/55">{item.copy}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
