import { motion } from "framer-motion";
import { BrainCircuit, Database, ShieldCheck, Sparkles } from "lucide-react";
import { aiCapabilities, verifiedSkillGroups } from "@/data/portfolio";

const capabilityIcons = [BrainCircuit, Database, Sparkles, ShieldCheck];

const Leadership = () => {
  return (
    <section id="skills" className="relative scroll-mt-20 overflow-hidden px-6 py-24 md:px-12 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/15 via-amber-500/10 to-transparent" />
      <div className="absolute -left-40 top-12 h-96 w-96 rounded-full bg-orange-500/15 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-amber-400/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-4xl text-center md:mb-16"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            AI CAPABILITIES
          </span>
          <h2 className="mt-4 break-keep font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
            AI를 모델이 아니라 <span className="text-gradient">서비스와 운영의 관점</span>에서 다룹니다.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl break-keep font-body text-base leading-7 text-muted-foreground md:text-lg">
            제가 맡아온 역할은 기술의 활용 범위를 정의하고, 사용자 흐름과 데이터 기준을 설계하며,
            개발팀·고객·사업 파트너가 실행할 수 있는 구조로 연결하는 일입니다.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {aiCapabilities.map((capability, index) => {
            const Icon = capabilityIcons[index];
            return (
              <motion.article
                key={capability.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card flex h-full min-w-0 flex-col rounded-2xl p-6 md:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <Icon size={22} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="break-keep font-display text-lg font-bold text-foreground">{capability.title}</h3>
                <p className="mt-3 break-keep font-body text-sm leading-6 text-muted-foreground">
                  {capability.description}
                </p>
                <p className="mt-auto pt-6 font-body text-xs font-semibold leading-5 text-primary">
                  {capability.evidence}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card mt-12 rounded-[1.75rem] p-6 md:mt-16 md:p-10"
        >
          <div className="mb-8 max-w-3xl">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              VERIFIED TOOLKIT
            </span>
            <h3 className="mt-3 break-keep font-display text-2xl font-bold text-foreground md:text-3xl">
              도구 이름보다 무엇을 빠르게 검증했는지 설명합니다.
            </h3>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {verifiedSkillGroups.map((group) => (
              <div key={group.label}>
                <h4 className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {group.label}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border bg-background/35 px-3 py-2 font-body text-xs text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 break-keep rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 font-body text-xs leading-5 text-muted-foreground">
            CSAP 경험은 최종 인증 취득이 아니라 IaaS·SaaS 심사 대응과 예비인증 준비 체계를 주도한 경험으로 설명합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;
