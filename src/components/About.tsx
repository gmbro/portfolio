import { motion } from "framer-motion";

const productCapabilities = [
  {
    label: "문제를 발견합니다",
    copy: "사용자 행동과 현장 피드백에서 반복되는 불편을 찾고, 해결할 문제를 구체화합니다.",
  },
  {
    label: "범위를 결정합니다",
    copy: "만들 기능만큼 만들지 않을 기능도 정하며 제품의 복잡도를 관리합니다.",
  },
  {
    label: "결과로 다시 판단합니다",
    copy: "사용자 반응과 운영 지표를 확인하고, 그 결과를 다음 기능과 운영 방식의 결정으로 연결합니다.",
  },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-20 bg-[#0a0a0a] px-6 py-16 text-white md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16"
        >
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">역량</p>
            <h2 className="mt-4 max-w-xl break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-4xl">
              무엇을 만들지, 만들지 않을지까지 결정합니다.
            </h2>
          </div>

          <div>
            <p className="max-w-2xl break-words text-pretty font-body text-base leading-7 text-white/70 md:text-lg md:leading-8">
              7년 동안 AI 제품 0→1, 350만 MAU 운영, STT 운영 원가 70%+ 절감으로 제품 판단을
              실행과 결과에 연결해 왔습니다. 현재는 Archi 베타의 피드백을 기능 추가와 제외 결정으로 바꾸고 있습니다.
            </p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-3">
              {productCapabilities.map((item, index) => (
                <div key={item.label} className="flex gap-4 bg-[#111111] p-5 md:p-6">
                  <span className="shrink-0 whitespace-nowrap font-display text-xs font-extrabold tracking-[0.12em] text-[#ff6645]" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
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
