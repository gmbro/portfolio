import { motion } from "framer-motion";

const workingRange = [
  {
    label: "문제 정의",
    copy: "사용자 반응과 운영 현장에서 반복되는 불편을 확인하고, 해결할 문제와 우선순위를 정의합니다.",
  },
  {
    label: "제품 설계",
    copy: "기술과 운영 조건을 사용자 흐름, 요구사항, 데이터 기준과 실행 계획으로 구체화합니다.",
  },
  {
    label: "성과 검증",
    copy: "출시·운영 결과를 사용자 반응, 품질, 시간과 비용의 변화로 확인하고 다음 결정을 만듭니다.",
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
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">소개</p>
            <h2 className="mt-4 max-w-xl break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-4xl">
              도메인은 달라도, 문제를 해결하는 방식은 일관됐습니다.
            </h2>
          </div>

          <div>
            <div className="max-w-xl space-y-4 break-words text-balance font-body text-base leading-7 text-white/70 md:text-lg md:leading-8">
              <p>
                퍼포먼스 마케팅, 대규모 제품 운영, 0→1 AI 서비스, 데이터 프로젝트와 B2B·B2G
                사업화까지 서로 다른 환경을 경험했습니다.
              </p>
              <p>
                고객 문제를 정의하고, 기술과 운영 조건을 제품 결정으로 구체화한 뒤 출시·운영 결과로
                검증하는 방식은 일관됐습니다.
              </p>
            </div>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
              {workingRange.map((item, index) => (
                <div key={item.label} className="flex gap-4 bg-[#111111] p-5 md:p-6">
                  <span className="font-display text-xs font-extrabold tracking-[0.12em] text-[#ff6645]" aria-hidden="true">
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
