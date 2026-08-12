import { motion } from "framer-motion";

const workingRange = [
  {
    label: "제품·프로젝트",
    copy: "0→1 제품 정의부터 제안, 실행, 품질 검증, 종결까지 담당합니다.",
  },
  {
    label: "AI·데이터",
    copy: "STT, TTS, Retrieval, OCR, 데이터 워크플로를 팀이 운영할 수 있는 서비스로 전환합니다.",
  },
  {
    label: "사업화",
    copy: "B2C, B2B, B2G, SaaS, 공공조달, 보안 심사 경험을 갖추고 있습니다.",
  },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-20 bg-[#0a0a0a] px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"
        >
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">소개</p>
            <h2 className="mt-4 max-w-xl break-keep font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-5xl">
              제품과 운영, 사업화를 연결합니다.
            </h2>
          </div>

          <div>
            <div className="max-w-3xl space-y-5 break-keep font-body text-base leading-8 text-white/60 md:text-lg">
              <p>
                퍼포먼스 마케팅으로 커리어를 시작해 제품 운영, 0→1 AI 서비스, 데이터 구축,
                B2B·B2G 사업화로 경험을 확장했습니다.
              </p>
              <p>
                모호한 기술 기회를 요구사항과 운영 흐름으로 구체화하고, 팀이 다음 제품 결정을 내릴 수 있는
                근거로 구조화하는 데 강점이 있습니다.
              </p>
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
              {workingRange.map((item) => (
                <div key={item.label} className="bg-[#111111] p-6 md:min-h-44 md:p-7">
                  <dt className="font-display text-sm font-bold text-[#ff7a5f]">{item.label}</dt>
                  <dd className="mt-3 break-keep font-body text-sm leading-6 text-white/55">{item.copy}</dd>
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
