import { motion, useReducedMotion } from "framer-motion";
import {
  chatbotFollowupQuestionsByPath,
  chatbotStarterQuestions,
} from "@/data/chatbot";
import { portfolioProjects } from "@/data/portfolio";

const improvementStages = [
  {
    title: "Evidence-first",
    copy: "경력 근거를 프로젝트의 문제·판단·실행·성과로 구조화했습니다.",
  },
  {
    title: "Chat-first",
    copy: "질문에서 관련 경력과 프로젝트 근거로 이어지는 탐색을 만들었습니다.",
  },
  {
    title: "JD Brief Beta",
    copy: "공개 JD의 요구역량과 포트폴리오에 기재된 프로젝트 근거를 연결하는 Beta를 제공합니다.",
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
  {
    label: "사용 지표 측정",
    value: "현재 미수집",
    copy: "분석 비활성 · 측정 설계 완료",
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
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
              Portfolio Product Lab
            </p>
            <h2
              id="portfolio-product-lab-title"
              className="mt-4 max-w-2xl break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-white md:text-5xl"
            >
              이 포트폴리오도 검증하며 성장합니다.
            </h2>
            <p className="mt-6 max-w-2xl break-words text-pretty font-body text-base leading-7 text-white/65 md:text-lg md:leading-8">
              채용 의사결정에 필요한 경력 근거를 더 빠르게 찾도록 기능과 탐색 흐름을 개선합니다.
              추천 클릭률·대화 시작률·평균 질문 수는 개인정보 없이 측정하도록 설계했으며,
              분석이 활성화되어 충분한 베이스라인이 쌓인 뒤 실제 수치만 공개합니다.
            </p>
          </div>

          <dl
            role="group"
            aria-label="현재 제품 커버리지"
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
          >
            {productCoverage.map((item) => (
              <div key={item.label} className="min-w-0 bg-[#111111] p-4 sm:p-5 md:p-6">
                <dt className="break-words font-body text-xs font-bold leading-5 text-white/55 md:text-sm">
                  {item.label}
                </dt>
                <dd className="mt-2 break-words font-display text-xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-2xl">
                  {item.value}
                </dd>
                <p className="mt-2 break-words font-body text-xs leading-5 text-white/45 md:text-sm">
                  {item.copy}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <ol
          aria-label="포트폴리오 개선 기록"
          className="mt-8 grid overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:mt-10 md:grid-cols-3"
        >
          {improvementStages.map((stage, index) => (
            <li
              key={stage.title}
              className="min-w-0 border-b border-white/10 bg-[#111111] p-5 last:border-b-0 md:border-b-0 md:border-r md:p-6 md:last:border-r-0"
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-display text-xs font-extrabold tracking-[0.14em] text-[#ff6645]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-bold text-[#ff8a70] md:text-lg">
                  {stage.title}
                </h3>
              </div>
              <p className="mt-3 break-words text-pretty font-body text-sm leading-6 text-white/65 md:text-base md:leading-7">
                {stage.copy}
              </p>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
};

export default PortfolioProductLab;
