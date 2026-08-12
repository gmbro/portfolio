import { motion } from "framer-motion";
import { BrainCircuit, Database, Sparkles } from "lucide-react";
import { aiCapabilities } from "@/data/portfolio";

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
            PM 역량
          </span>
          <h2 className="mt-4 break-keep font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-5xl">
            고객 문제를 제품 결정과 성과로 연결하는 방식입니다.
          </h2>
          <p className="mt-6 max-w-3xl break-keep font-body text-base leading-7 text-white/55 md:text-lg">
            AI가 필요한 지점을 정의하고 데이터와 실행 흐름을 구조화해, 출시·운영 결과를 다음 제품
            결정의 근거로 만듭니다.
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
                <h3 className="break-keep font-display text-xl font-bold text-white">{capability.title}</h3>
                <p className="mt-4 break-keep font-body text-sm leading-7 text-white/55">{capability.description}</p>
                <p className="mt-auto pt-8 font-body text-xs font-semibold leading-5 text-[#ff7a5f]">
                  근거: {capability.evidence}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
