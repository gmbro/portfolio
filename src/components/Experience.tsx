import { motion } from "framer-motion";

interface ExperienceCard {
  company: string;
  companyDesc: string;
  title: string;
  period: string;
  team: string;
  description: string;
  achievements: string[];
  tags: string[];
}

const experiences: ExperienceCard[] = [
  {
    company: "N사",
    companyDesc: "네이버 계열 커머스",
    title: "Senior Product Manager",
    period: "2021.03 — 현재",
    team: "쇼핑 검색 & 추천 팀",
    description:
      "쇼핑 검색 알고리즘 개선 및 개인화 추천 시스템 기획 주도. 월간 활성 사용자 1,200만 명 규모 서비스 담당.",
    achievements: [
      "검색→구매 전환율 +34% 개선 (6개월)",
      "개인화 추천 CTR +52% 향상",
      "신규 카테고리 탐색 기능 론칭 (MAU 280만)",
    ],
    tags: ["B2C", "커머스", "추천 시스템", "검색"],
  },
  {
    company: "K사",
    companyDesc: "카카오 계열 핀테크",
    title: "Product Manager",
    period: "2019.07 — 2021.02",
    team: "간편결제 & 송금 팀",
    description:
      "간편결제 온보딩 플로우 리디자인 및 송금 기능 개선 담당. 사용자 이탈 원인 분석으로 핵심 전환 포인트 개선.",
    achievements: [
      "온보딩 완료율 +41% 개선",
      "D7 리텐션 +28% 향상",
      "QR 결제 기능 신규 론칭 (3개월 내 MAU 50만)",
    ],
    tags: ["핀테크", "B2C", "온보딩", "결제"],
  },
  {
    company: "B사",
    companyDesc: "스타트업, Series B",
    title: "Junior Product Manager",
    period: "2017.09 — 2019.06",
    team: "코어 프로덕트 팀",
    description:
      "B2B SaaS 협업 툴 초기 기획 및 PMF 탐색. 고객 인터뷰 100+ 건 직접 수행.",
    achievements: [
      "유료 전환율 3.2% → 8.7% 개선",
      "핵심 기능 3개 신규 개발",
      "NPS 점수 +22점 향상",
    ],
    tags: ["B2B SaaS", "스타트업", "PMF", "협업 툴"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-[0.3em] text-primary">
            EXPERIENCE
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            경력 사항
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-2xl p-8 md:p-10 transition-all duration-500"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {exp.company}
                    </h3>
                    <span className="text-xs font-body text-muted-foreground px-2.5 py-0.5 rounded-full border border-border">
                      {exp.companyDesc}
                    </span>
                  </div>
                  <p className="text-primary font-body font-semibold text-sm">
                    {exp.title}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-body text-muted-foreground">{exp.period}</p>
                  <p className="text-xs font-body text-muted-foreground/60 mt-0.5">{exp.team}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Achievements */}
              <div className="space-y-2.5 mb-6">
                {exp.achievements.map((a) => (
                  <div key={a} className="flex items-start gap-2.5">
                    <span className="text-primary mt-0.5 shrink-0">→</span>
                    <span className="text-sm font-body text-foreground/90">{a}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-body font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
