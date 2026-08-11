import { motion } from "framer-motion";
import { BrainCircuit, Database, Sparkles } from "lucide-react";
import { aiCapabilities, verifiedSkillGroups } from "@/data/portfolio";

const capabilityIcons = [BrainCircuit, Database, Sparkles];

const Leadership = () => {
  return (
    <section id="skills" className="relative scroll-mt-20 overflow-hidden bg-[#0a0a0a] px-6 py-24 text-white md:px-12 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 rounded-full bg-[#ff6645]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-4xl md:mb-16"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
            AI CAPABILITIES
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-5xl">
            AI becomes valuable when teams can ship it, operate it, and learn from it.
          </h2>
          <p className="mt-6 max-w-3xl font-body text-base leading-7 text-white/55 md:text-lg">
            My role is to define where AI belongs in the product, structure the data and delivery workflow,
            and create enough evidence to make the next business decision.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {aiCapabilities.map((capability, index) => {
            const Icon = capabilityIcons[index] ?? BrainCircuit;
            return (
              <motion.article
                key={capability.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="flex min-h-full flex-col rounded-3xl border border-white/10 bg-[#111111] p-6 md:p-8"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ff6645]/25 bg-[#ff6645]/10">
                  <Icon size={22} className="text-[#ff7a5f]" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{capability.title}</h3>
                <p className="mt-4 font-body text-sm leading-7 text-white/55">{capability.description}</p>
                <p className="mt-auto pt-8 font-body text-xs font-semibold leading-5 text-[#ff7a5f]">
                  Evidence: {capability.evidence}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 rounded-3xl border border-white/10 bg-[#111111] p-6 md:mt-8 md:p-8"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/35">
                VERIFIED TOOLKIT
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">
                Tools are shown in the context of what they helped validate.
              </h3>
            </div>

            <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-4">
              {verifiedSkillGroups.map((group) => (
                <div key={group.label}>
                  <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#ff7a5f]">
                    {group.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2 font-body text-xs text-white/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 rounded-xl border border-[#ff6645]/15 bg-[#ff6645]/[0.06] px-4 py-3 font-body text-xs leading-5 text-white/45">
            CSAP experience covers IaaS/SaaS review preparation and preliminary certification readiness;
            it does not claim responsibility for the final certification decision.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;
