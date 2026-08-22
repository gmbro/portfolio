import { motion, useReducedMotion } from "framer-motion";

const aboutPortraitUrl =
  "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/me.png";

const productCapabilities = [
  {
    label: "문제를 구체화합니다",
    copy: "현장 피드백과 인터뷰를 통해 문제를 탐색하고, 우리 조직이 해결할 수 있는 문제에 집중합니다.",
  },
  {
    label: "우선순위를 정합니다",
    copy: "비즈니스 임팩트와 지속 가능성을 고려해 수행할 태스크를 구분합니다.",
  },
  {
    label: "결과를 검증합니다",
    copy: "목적과 지표를 설정한 뒤 결과를 빠르게 검증하고 다음 액션을 고민합니다.",
  },
];

const About = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="portfolio-section-surface portfolio-section-surface--soft scroll-mt-20 px-6 py-16 text-white md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          data-section-reveal="about"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16"
        >
          <div className="min-w-0">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">About</p>
            <h2 className="mt-4 max-w-xl break-words text-balance font-display text-[1.75rem] font-bold leading-tight tracking-[-0.03em] text-white sm:text-3xl md:text-4xl">
              저는 제너럴리스트이자 AI 스페셜리스트입니다.
            </h2>
            <figure
              data-about-portrait
              className="mt-8 flex justify-center sm:mt-9 lg:justify-start"
            >
              <div className="relative aspect-square w-44 shrink-0 overflow-hidden rounded-full border border-white/20 bg-[radial-gradient(circle_at_42%_38%,rgba(255,255,255,0.14),rgba(255,255,255,0.045)_62%,rgba(255,255,255,0.02))] shadow-[0_20px_52px_rgba(0,0,0,0.38)] sm:w-52 lg:w-[17rem]">
                <img
                  src={aboutPortraitUrl}
                  alt="발표 중인 이경민"
                  width={548}
                  height={548}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-full object-cover object-center grayscale contrast-[1.06] brightness-[0.96]"
                />
              </div>
            </figure>
          </div>

          <div className="min-w-0">
            <div className="max-w-3xl space-y-4 break-words text-pretty font-body text-base leading-7 text-white/70 md:text-lg md:leading-8">
              <p>
                제품과 기술은 수단입니다. 중요한 것은 고객의 문제를 얼마나 효과적으로 푸는가입니다.
              </p>
              <p>
                B2B·B2G·B2C 고객과 금융·공공·IT·커머스 등 여러 도메인을 경험하며 각 환경의 특수성을
                이해했습니다. 결국 시간과 비용을 줄이는 것이 사업의 핵심이라고 느꼈습니다.
              </p>
              <p>
                직무에 국한되지 않고 우리 팀이 풀어야 할 문제와 목표에 집중해 일하는 것을 좋아합니다.
              </p>
            </div>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 xl:grid-cols-3">
              {productCapabilities.map((item, index) => (
                <div key={item.label} className="flex gap-4 bg-[#111111] p-5 md:p-6">
                  <span className="shrink-0 whitespace-nowrap font-display text-xs font-extrabold tracking-[0.12em] text-[#ff6645]" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <dt className="font-display text-sm font-bold text-[#ff8a70]">{item.label}</dt>
                    <dd className="mt-2 break-words text-pretty font-body text-sm leading-6 text-white/65">{item.copy}</dd>
                  </div>
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
