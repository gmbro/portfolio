import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const items = [
  {
    title: "전략적 로드맵 설계 및 병렬 프로세스 관리",
  },
  {
    title: "21명 규모의 대규모 프로덕트 팀 리소스 최적화",
  },
  {
    title: "데이터 기반의 사후 관리 및 지속적 성장 견인",
  },
];

const phases = [
  {
    label: "Strategy & Definition",
    bars: [
      { text: "Stakeholder interviews & briefing", width: "45%" },
      { text: "User & market research", width: "60%" },
      { text: "Creative & strategic exploration", width: "80%" },
    ],
  },
  {
    label: "Product Alignment",
    bars: [
      { text: "Direction alignment", width: "65%" },
      { text: "Concept refinement", width: "85%" },
    ],
  },
  {
    label: "Execution",
    bars: [
      { text: "Design systems", width: "55%" },
      { text: "Iterative testing & QA", width: "75%" },
    ],
  },
  {
    label: "Launch",
    bars: [
      { text: "Rollout & support", width: "65%" },
      { text: "Post-launch optimisations", width: "85%" },
    ],
  },
];

const Leadership = () => {
  return (
    <section id="skills" className="scroll-mt-20 py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-amber-500/15 to-yellow-400/10" />
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full bg-orange-500/25 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -40, 30, 0], y: [0, 30, -30, 0], scale: [1, 0.85, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-[65%] h-[65%] rounded-full bg-amber-400/20 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 20, -30, 0], y: [0, -20, 40, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50%] h-[50%] rounded-full bg-yellow-500/15 blur-[80px]"
        />
        <motion.div
          animate={{ x: [0, -15, 25, 0], y: [0, 25, -15, 0], scale: [1.1, 0.9, 1.05, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-1/4 w-[40%] h-[40%] rounded-full bg-orange-400/20 blur-[90px]"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top: central diamond node */}
        <div className="flex flex-col items-center mb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-36 h-36 flex items-center justify-center"
          >
            <div className="absolute inset-0 rotate-45 rounded-2xl border border-border bg-secondary/50 backdrop-blur-sm" />
            <div className="relative z-10 text-center px-2">
              <span className="font-display text-lg font-bold text-foreground">PM</span>
              <span className="text-primary font-display text-lg font-bold">.</span>
            </div>
          </motion.div>
          <div className="w-px h-16 bg-border" />
          <div className="relative w-full max-w-4xl">
            <div className="absolute top-0 left-[16.66%] right-[16.66%] h-px bg-border" />
            <div className="flex justify-between px-[16.66%]">
              <div className="w-px h-8 bg-border" />
              <div className="w-px h-8 bg-border" />
              <div className="w-px h-8 bg-border" />
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm md:text-base font-body text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-12 break-keep"
        >
          최대 21명 규모의 팀을 리딩하며, 제품 생애 주기 전반의 마일스톤을 설계하고 불확실성을 통제했습니다.
        </motion.p>

        {/* Three cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative min-w-0"
            >
              <div className="flex justify-center mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 border-2 border-border" />
              </div>
              <div className="glass-card rounded-2xl p-6 md:p-8 text-center h-full">
                <h3 className="font-display text-sm md:text-[clamp(0.7rem,1.1vw,1rem)] font-bold text-foreground leading-relaxed break-keep">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Gantt Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 glass-card rounded-2xl p-8 md:p-12"
        >
          {/* Description */}
          <div className="mb-10 max-w-3xl">
            <p className="text-sm md:text-base font-body text-muted-foreground leading-relaxed">
              7년차 PM으로서 최대 21명의 프로덕트 팀을 리드하며, 제품 생애 주기 전반의 마일스톤을 체계적으로 설계했습니다.
            </p>
            <p className="text-sm md:text-base font-body text-muted-foreground leading-relaxed mt-4">
              단순히 일정을 나열하는 것을 넘어 기획, 디자인, 개발 간의 병목 현상을 최소화하기 위해 전략적 우선순위를 결정하고 리소스를 최적화했습니다. 'Direction Alignment'를 통한 이해관계자 싱크와 'Post-launch' 단계의 지속적 최적화를 프로세스화하여, 일회성 배포가 아닌 비즈니스의 지속적인 성장을 견인했습니다.
            </p>
          </div>

          {/* Gantt-style timeline */}
          <div className="relative">
            {/* Central vertical timeline line */}
            <div className="absolute left-[calc(50%)] top-0 bottom-0 w-px bg-primary/40" />
            {/* Top dot */}
            <div className="absolute left-[calc(50%-5px)] -top-1 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />

            <div className="space-y-8 pt-6">
              {phases.map((phase, phaseIdx) => (
                <motion.div
                  key={phase.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: phaseIdx * 0.1 }}
                  className="relative"
                >
                  {/* Phase label */}
                  <h4 className="font-display text-sm md:text-base font-bold text-foreground mb-3">
                    {phase.label}
                  </h4>

                  {/* Bars */}
                  <div className="space-y-2">
                    {phase.bars.map((bar, barIdx) => (
                      <motion.div
                        key={bar.text}
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: phaseIdx * 0.1 + barIdx * 0.08,
                          ease: "easeOut",
                        }}
                        style={{
                          "--bar-width": bar.width,
                          transformOrigin: "left",
                        } as CSSProperties}
                        className="h-10 w-full rounded-lg bg-background/30 border border-foreground/20 backdrop-blur-md flex items-center px-4 transition-colors md:w-[var(--bar-width)] md:hover:bg-background/40"
                      >
                        <span className="text-xs md:text-sm font-body text-muted-foreground whitespace-nowrap">
                          {bar.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;
