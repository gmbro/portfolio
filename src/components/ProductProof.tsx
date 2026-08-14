import { ArrowUpRight } from "lucide-react";
import { trackPortfolioEvent } from "@/lib/analytics";

const productDecisions = [
  {
    step: "01",
    label: "실사용 검증",
    copy: "2026년 7월부터 6명과 베타를 진행하며 실제 수업에서 필요한 기록 방식을 확인하고 있습니다.",
  },
  {
    step: "02",
    label: "기능 추가",
    copy: "회원의 운동 전 체형을 분석하고 싶다는 요청을 반영해 그리드 배경 촬영 기능을 추가했습니다.",
  },
  {
    step: "03",
    label: "기능 제외",
    copy: "운동마다 기록 방식이 달라 시퀀스를 추가하면 복잡해진다는 피드백을 반영해 도입하지 않기로 했습니다.",
  },
  {
    step: "04",
    label: "현재 집중",
    copy: "현재는 실제 수업에서 바로 사용할 수 있는 영상 기록 경험에 집중하고 있습니다.",
  },
];

const ProductProof = () => {
  return (
    <section id="product-proof" className="scroll-mt-20 bg-[#0b0b0b] px-6 py-20 text-white md:px-12 md:py-28">
      <div id="arkylab-ai-coach" className="mx-auto max-w-7xl scroll-mt-24">
        <header className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
              현재 제품 · Archi(아키)
            </span>
            <h2 className="mt-4 max-w-4xl break-words text-balance font-display text-3xl font-bold leading-tight tracking-[-0.03em] md:text-5xl">
              더 많이 만들기보다,
              <span className="block text-white/65">실제로 쓰이는 기능만 남깁니다.</span>
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="break-words text-pretty font-body text-base leading-7 text-white/65 md:text-lg md:leading-8">
              운동 강사의 기록 업무를 돕는 AI 제품 Archi(아키)를 만들고 있습니다. 제품 기획부터
              개발·사업·운영까지 1인으로 맡아, 베타 피드백을 기능의 추가와 제외 결정으로 연결합니다.
            </p>
            <a
              href="https://archi.best"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackPortfolioEvent("select_content")}
              aria-label="Archi(아키) 베타 새 창에서 보기"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 font-body text-sm font-bold text-white transition-colors hover:border-[#ff6645]/60 hover:text-[#ff8a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0b]"
            >
              Archi 베타 보기
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </header>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          <div className="bg-[#111111] p-5 md:p-6">
            <dt className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">베타 참여</dt>
            <dd className="mt-2 font-display text-2xl font-extrabold text-white md:text-3xl">6명</dd>
          </div>
          <div className="bg-[#111111] p-5 md:p-6">
            <dt className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">검증 기간</dt>
            <dd className="mt-2 break-words font-display text-xl font-extrabold text-white md:text-2xl">2026.07–진행 중</dd>
          </div>
          <div className="bg-[#111111] p-5 md:p-6">
            <dt className="font-body text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">담당 범위</dt>
            <dd className="mt-2 break-words text-pretty font-display text-base font-bold leading-6 text-white md:text-lg">
              1인 제품 기획·개발·사업·운영 전담
            </dd>
          </div>
        </dl>

        <ol className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {productDecisions.map((decision) => (
            <li key={decision.step} className="min-w-0 rounded-2xl border border-white/10 bg-[#111111] p-5 md:p-6">
              <div className="flex items-center gap-3">
                <span className="shrink-0 whitespace-nowrap font-display text-xs font-extrabold tracking-[0.12em] text-[#ff6645]" aria-hidden="true">
                  {decision.step}
                </span>
                <h3 className="font-display text-base font-bold text-white md:text-lg">{decision.label}</h3>
              </div>
              <p className="mt-4 break-words text-pretty font-body text-sm leading-6 text-white/70">{decision.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProductProof;
