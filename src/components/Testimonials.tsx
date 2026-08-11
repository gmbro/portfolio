import { motion } from "framer-motion";

const testimonials = [
  {
    name: "이준혁",
    role: "Engineering Manager, N사",
    quote:
      "지수님은 데이터를 단순히 읽는 것이 아니라, 그 안에서 제품의 방향을 찾아내는 능력이 탁월합니다. 검색 개인화 프로젝트에서 명확한 가설 수립과 빠른 실험 설계로 팀 전체의 속도를 끌어올렸습니다.",
  },
  {
    name: "박소연",
    role: "UX Designer, K사",
    quote:
      "온보딩 개선 프로젝트를 함께 진행하면서, 지수님이 사용자 인터뷰를 얼마나 깊이 있게 수행하는지 직접 목격했습니다. 단순한 기능 기획자가 아니라, 진짜 사용자 문제를 해결하는 PM입니다.",
  },
  {
    name: "최민준",
    role: "Head of Growth, B사",
    quote:
      "스테이크홀더가 많은 복잡한 프로젝트에서도 모든 팀의 이해관계를 조율하고 합의를 이끌어내는 능력이 뛰어납니다. 함께 일한 PM 중 가장 신뢰할 수 있는 파트너였습니다.",
  },
  {
    name: "김태호",
    role: "Backend Engineer, N사",
    quote:
      "지수님의 PRD는 개발팀이 읽기에 명확하고, 비즈니스 맥락까지 잘 담겨 있습니다. 요구사항의 '왜'를 항상 함께 설명해주기 때문에 팀 전체가 같은 방향을 보고 달릴 수 있었습니다.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body"
        >
          TESTIMONIAL
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-display text-foreground leading-tight mb-16"
        >
          함께 일한 동료들의 이야기
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative p-8 rounded-2xl glass-card"
            >
              {/* Orange quote mark */}
              <span className="absolute top-6 left-7 text-5xl font-display text-primary/40 leading-none select-none">
                "
              </span>

              <p className="text-sm md:text-base font-body text-muted-foreground leading-relaxed mt-8 mb-6">
                {t.quote}
              </p>

              <div>
                <p className="text-sm font-display font-bold text-foreground">
                  {t.name}
                </p>
                <p className="text-xs font-body text-muted-foreground mt-1">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
