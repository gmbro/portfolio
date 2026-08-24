import { motion, useReducedMotion } from "framer-motion";
import {
  chatbotFollowupQuestionsByPath,
  chatbotStarterQuestions,
} from "@/data/chatbot";
import { portfolioProjects } from "@/data/portfolio";

const productDefinition = [
  {
    label: "해결할 문제",
    title: "긴 포트폴리오에서 근거를 찾기 어렵다.",
    copy: "채용 담당자와 실무 리더는 제한된 시간 안에 역할·판단·성과의 근거를 찾아야 합니다.",
  },
  {
    label: "제품 가설",
    title: "대화형 증거 탐색이 이해 시간을 줄인다.",
    copy: "사용자 역할별 질문과 출처 카드가 관련 프로젝트 상세 도달을 높일 것이라고 가정합니다.",
  },
  {
    label: "북극성 지표",
    title: "검증된 경력 근거 도달률",
    copy: "챗봇을 시작한 세션 중 공개 프로젝트 근거 카드를 실제로 연 비율입니다.",
  },
] as const;

const supportingMetrics = [
  {
    label: "추천 질문 클릭률",
    formula: "추천 질문 클릭 ÷ 챗봇 첫 화면 노출",
  },
  {
    label: "근거 카드 열람률",
    formula: "근거 카드 열기 ÷ 챗봇 시작",
  },
  {
    label: "평균 질문 수",
    formula: "질문 제출 수 ÷ 대화 시작 세션",
  },
  {
    label: "브리프 생성률",
    formula: "근거 분석 생성 ÷ 채용 브리프 시작",
  },
] as const;

const improvementStages = [
  {
    date: "2026.08",
    title: "추천 질문·사용자 모드 개편",
    copy: "추천 질문을 6개에서 8개로 넓히고 채용 담당자·실무 리더·협업 파트너별 우선순위를 적용했습니다.",
  },
  {
    date: "2026.08",
    title: "답변 출처·프로젝트 CTA 연결",
    copy: "AI 답변을 공개 프로젝트 근거 카드로 재검증하고, 프로젝트에서 관련 질문을 바로 준비하도록 연결했습니다.",
  },
  {
    date: "2026.08",
    title: "JD Brief 추출 실패 복구",
    copy: "링크 자동 읽기 실패를 감지하고 PDF·이미지·본문 붙여넣기 대체 경로와 품질 게이트를 추가했습니다.",
  },
  {
    date: "측정 준비",
    title: "실제 수치만 공개",
    copy: "개인정보 없는 이벤트 기준을 준비했습니다. 분석이 활성화되고 베이스라인이 쌓이기 전에는 숫자를 공개하지 않습니다.",
  },
] as const;

const followupQuestionCount = Math.min(
  ...Object.values(chatbotFollowupQuestionsByPath).map((questions) => questions.length),
);

const productCoverage = [
  {
    label: "추천 질문",
    value: `${chatbotStarterQuestions.length}개`,
    copy: "첫 탐색을 돕는 질문",
  },
  {
    label: "문맥형 후속 질문",
    value: `${followupQuestionCount}개`,
    copy: "답변마다 이어지는 질문",
  },
  {
    label: "근거 연결 프로젝트",
    value: `${portfolioProjects.length}개`,
    copy: "공개 프로젝트 데이터 기준",
  },
] as const;

const PortfolioProductLab = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="portfolio-product-lab"
      aria-labelledby="portfolio-product-lab-title"
      className="portfolio-section-surface portfolio-section-surface--soft scroll-mt-20 px-6 py-16 text-white md:px-12 md:py-20"
    >
      <motion.div
        data-section-reveal="portfolio-product-lab"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-14">
          <div className="min-w-0">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
              Portfolio Product Lab
            </p>
            <h2
              id="portfolio-product-lab-title"
              className="mt-4 max-w-3xl break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-5xl"
            >
              포트폴리오 자체를 하나의 제품으로 운영합니다.
            </h2>
            <p className="mt-6 max-w-3xl break-words text-pretty font-body text-base leading-7 text-white/65 md:text-lg md:leading-8">
              채용 의사결정에 필요한 경력 근거를 더 빨리 찾도록 가설을 세우고 탐색 흐름을 개선합니다.
              실제 데이터가 쌓인 뒤에만 수치를 공개합니다.
            </p>
          </div>

          <dl
            role="group"
            aria-label="현재 제품 커버리지"
            className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
          >
            {productCoverage.map((item) => (
              <div key={item.label} className="min-w-0 bg-[#111111] p-3 text-center sm:p-4 md:min-w-32">
                <dt className="break-words font-body text-[10px] font-bold leading-4 text-white/55 md:text-xs">
                  {item.label}
                </dt>
                <dd className="mt-2 break-words font-display text-xl font-bold leading-tight text-white sm:text-2xl">
                  {item.value}
                </dd>
                <p className="sr-only">{item.copy}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3">
          {productDefinition.map((item, index) => (
            <article
              key={item.label}
              className={`min-w-0 rounded-2xl border p-5 md:p-6 ${
                index === 2
                  ? "border-[#ff6645]/55 bg-[#2a1713]"
                  : "border-white/10 bg-[#111111]"
              }`}
            >
              <p className="font-body text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ff8a70]">
                {item.label}
              </p>
              <h3 className="mt-3 break-words text-balance font-display text-lg font-bold leading-snug text-white md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 break-words text-pretty font-body text-sm leading-6 text-white/60 md:text-base md:leading-7">
                {item.copy}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#111111] p-5 md:mt-10 md:p-7" aria-labelledby="portfolio-product-metrics-title">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-body text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ff8a70]">Supporting Metrics</p>
              <h3 id="portfolio-product-metrics-title" className="mt-2 font-display text-xl font-bold text-white md:text-2xl">실제 사용 지표</h3>
            </div>
            <p className="font-body text-xs leading-5 text-white/45">분석 비활성 · 베이스라인 수집 전</p>
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {supportingMetrics.map((metric) => (
              <div key={metric.label} className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="break-words font-body text-sm font-bold text-white/85">{metric.label}</dt>
                <dd className="mt-3 font-display text-lg font-bold text-[#ff8a70]">수집 전</dd>
                <p className="mt-2 break-words font-body text-xs leading-5 text-white/45">{metric.formula}</p>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-8 md:mt-10" aria-labelledby="portfolio-improvements-title">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-body text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ff8a70]">Change Log</p>
              <h3 id="portfolio-improvements-title" className="mt-2 font-display text-xl font-bold text-white md:text-2xl">제품 개선 기록</h3>
            </div>
          </div>
          <ol aria-label="포트폴리오 개선 기록" className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {improvementStages.map((stage, index) => (
              <li key={stage.title} className="min-w-0 bg-[#111111] p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="font-display text-xs font-extrabold tracking-[0.14em] text-[#ff6645]" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-white/10 px-2 py-1 font-body text-[10px] font-bold text-white/50">{stage.date}</span>
                </div>
                <h4 className="mt-3 font-display text-base font-bold text-[#ff8a70] md:text-lg">{stage.title}</h4>
                <p className="mt-3 break-words text-pretty font-body text-sm leading-6 text-white/65 md:text-base md:leading-7">{stage.copy}</p>
              </li>
            ))}
          </ol>
        </section>
      </motion.div>
    </section>
  );
};

export default PortfolioProductLab;
