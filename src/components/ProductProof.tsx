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
    capability: "측정·개선",
    project: "Selectstar",
    evidence: "운영 원가 70%+ 절감",
    targetId: "selectstar-stt-operations",
  },
  {
    step: "04",
    capability: "운영·성장",
    project: "SK Planet",
    evidence: "350만 MAU",
    targetId: "sk-planet-syrup-wallet",
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
    <section id="product-proof" className="scroll-mt-20 bg-[#0b0b0b] px-6 py-16 text-white md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6645]">
              제품으로 검증한 PM 역량
            </span>
            <h2 className="mt-4 break-keep font-display text-3xl font-bold leading-tight tracking-[-0.03em] md:text-4xl">
              고객 문제 발견부터 측정과 개선까지,
              <span className="block text-white/55">제품을 만드는 전체 흐름으로 증명합니다.</span>
            </h2>
          </div>
          <p className="max-w-3xl break-keep font-body text-base leading-7 text-white/65 md:text-lg">
            기술 이름보다 어떤 고객 문제를 발견했고, 제품으로 정의해 운영 성과까지 연결했는지를 대표 경험으로
            보여드립니다.
          </p>
        </header>

        <ol className="mt-8 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-2 xl:grid-cols-4">
          {proofSteps.map((proof) => (
            <li key={proof.targetId} className="min-w-0">
              <a
                href={`#${proof.targetId}`}
                onClick={(event) => moveToProject(event, proof.targetId)}
                aria-label={`${proof.capability}: ${proof.project} ${proof.evidence} 프로젝트로 이동`}
                className="group flex h-full min-h-20 items-center gap-4 rounded-2xl border border-white/10 bg-[#111111] p-4 transition-colors hover:border-[#ff6645]/55 hover:bg-[#151210] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0b0b] motion-reduce:transition-none md:p-5"
              >
                <span className="shrink-0 font-display text-sm font-extrabold tracking-[0.12em] text-[#ff6645]">
                  {proof.step}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="break-keep font-display text-base font-bold leading-snug text-white md:text-lg">
                    {proof.capability}
                  </h3>
                  <p className="mt-1 break-keep font-body text-xs font-semibold leading-5 text-white/60">
                    {proof.project} · {proof.evidence}
                  </p>
                </div>
                <ArrowDownRight
                  size={18}
                  className="shrink-0 text-white/40 transition-colors group-hover:text-[#ff8a70] motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProductProof;
