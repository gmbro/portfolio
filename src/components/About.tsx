import { motion } from "framer-motion";
import { BarChart3, Users, Zap, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: BarChart3,
    title: "데이터 기반 의사결정",
    description:
      "직관보다 데이터를 우선합니다. 모든 기획의 출발점은 명확한 지표와 측정 가능한 가설입니다.",
  },
  {
    icon: Users,
    title: "사용자 중심 사고",
    description:
      "제품의 성공은 사용자의 문제를 얼마나 깊이 이해하느냐에 달려 있습니다. 현장 인터뷰를 즐깁니다.",
  },
  {
    icon: Zap,
    title: "빠른 실험과 학습",
    description:
      "완벽한 기획보다 빠른 검증을 선호합니다. 실패에서 배우고, 그 인사이트를 다음 스프린트에 반영합니다.",
  },
  {
    icon: HeartHandshake,
    title: "팀과 함께 성장",
    description:
      "PM은 혼자 만드는 역할이 아닙니다. 개발·디자인·비즈니스 팀과의 신뢰 관계가 좋은 제품의 기반입니다.",
  },
];

const education = [
  { title: "연세대학교 경영학과", sub: "부전공: 컴퓨터과학", year: "2013–2017" },
  { title: "Google Analytics Certification", sub: "", year: "2019" },
  { title: "SQL for Data Analysis", sub: "Mode Analytics", year: "2020" },
];

const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body"
        >
          ABOUT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-display text-foreground leading-tight mb-16"
        >
          저는 이런 <span className="text-gradient">PM입니다</span>.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — intro + education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base font-body text-muted-foreground leading-relaxed mb-10">
              안녕하세요, 7년차 Product Manager 김지수입니다. 국내 주요 테크
              기업에서 커머스, 핀테크, B2B SaaS 도메인의 제품을 기획하고
              성장시켜왔습니다. 저는 '왜 이 기능을 만들어야 하는가'에
              집착합니다. 사용자 인터뷰와 데이터 분석을 통해 진짜 문제를
              발굴하고, 그 문제를 해결하는 가장 단순한 방법을 찾는 것이 PM의
              핵심 역할이라고 믿습니다.
            </p>

            <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-5 font-body">
              학력 & 자격
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.title}
                  className="flex items-start justify-between gap-4 pb-4 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-display font-bold text-foreground">
                      {edu.title}
                    </p>
                    {edu.sub && (
                      <p className="text-xs font-body text-muted-foreground mt-0.5">
                        {edu.sub}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-body text-muted-foreground whitespace-nowrap">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — 2x2 value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl glass-card"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-primary" />
                </div>
                <h4 className="text-sm font-display font-bold text-foreground mb-2">
                  {v.title}
                </h4>
                <p className="text-xs font-body text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
