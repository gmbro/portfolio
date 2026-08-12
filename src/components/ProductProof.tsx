import type { MouseEvent } from "react";
import { ArrowDownRight } from "lucide-react";

interface ProofStep {
  step: string;
  capability: string;
  project: string;
  evidence: string;
  targetId: string;
}

const proofSteps: ProofStep[] = [
  {
    step: "01",
    capability: "고객 문제 발견",
    project: "Arkylab",
    evidence: "실사용 베타",
    targetId: "arkylab-ai-coach",
  },
  {
    step: "02",
    capability: "제품 정의·0→1",
    project: "Skelter Labs",
    evidence: "0→1 PoC",
    targetId: "skelter-ai-counselor",
  },
  {
    step: "03",
    capability: "운영·성장",
    project: "SK Planet",
    evidence: "350만 MAU",
    targetId: "sk-planet-syrup-wallet",
  },
  {
    step: "04",
    capability: "측정·개선",
    project: "Selectstar",
    evidence: "운영 원가 70%+ 절감",
    targetId: "selectstar-stt-operations",
  },
];

const ProductProof = () => {
  const moveToProject = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.history.pushState(null, "", `#${targetId}`);
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="product-proof" className="bg-[#0b0b0b] px-6 py-20 text-white md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-4xl">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
            제품으로 검증한 PM 역량
          </span>
          <h2 className="mt-4 break-keep font-display text-3xl font-bold leading-tight tracking-[-0.03em] md:text-5xl">
            고객 문제 발견부터 측정과 개선까지,
            <span className="block text-white/55">제품을 만드는 전체 흐름으로 증명합니다.</span>
          </h2>
          <p className="mt-6 max-w-3xl break-keep font-body text-base leading-7 text-white/55 md:text-lg">
            기술 이름보다 어떤 고객 문제를 발견했고, 제품으로 정의해 운영 성과까지 연결했는지를 대표 경험으로
            보여드립니다.
          </p>
        </header>

        <ol className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {proofSteps.map((proof) => (
            <li key={proof.targetId} className="min-w-0">
              <a
                href={`#${proof.targetId}`}
                onClick={(event) => moveToProject(event, proof.targetId)}
                aria-label={`${proof.capability}: ${proof.project} ${proof.evidence} 프로젝트로 이동`}
                className="group flex h-full min-h-44 flex-col rounded-3xl border border-white/10 bg-[#111111] p-6 transition-colors hover:border-[#ff6645]/55 hover:bg-[#151210] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0b] motion-reduce:transition-none md:min-h-52 md:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-sm font-extrabold tracking-[0.12em] text-[#ff6645]">
                    {proof.step}
                  </span>
                  <ArrowDownRight
                    size={20}
                    className="text-white/35 transition-colors group-hover:text-[#ff8a70] motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-6 break-keep font-display text-xl font-bold leading-snug text-white md:text-2xl">
                  {proof.capability}
                </h3>

                <div className="mt-auto flex min-h-11 items-end justify-between gap-3 pt-7">
                  <span className="min-w-0 font-body text-sm font-semibold text-white/70">{proof.project}</span>
                  <span className="shrink-0 rounded-full border border-[#ff6645]/25 bg-[#ff6645]/10 px-3 py-2 font-body text-[11px] font-bold text-[#ff9a83]">
                    {proof.evidence}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProductProof;
