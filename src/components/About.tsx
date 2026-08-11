import { motion } from "framer-motion";
import { BrainCircuit, Handshake, Network, PackageCheck } from "lucide-react";
import { educationAndCertificates } from "@/data/portfolio";

const strengths = [
  {
    icon: PackageCheck,
    title: "제품 관리",
    description:
      "문제 정의부터 요구사항, 사용자 흐름, PRD, QA와 지표까지 제품의 실행 구조를 설계합니다.",
  },
  {
    icon: Network,
    title: "프로젝트 관리",
    description:
      "개발팀·고객·외부 작업자·공공기관 사이의 일정, 산출물과 품질 기준을 관리합니다.",
  },
  {
    icon: Handshake,
    title: "사업 제휴",
    description:
      "제품 기획을 기술·콘텐츠 제휴와 B2B·B2G 사업화, 공공조달 요건까지 연결합니다.",
  },
  {
    icon: BrainCircuit,
    title: "AI 서비스 기획",
    description:
      "AI 모델 개발이 아니라 기술의 활용 범위, 데이터 구조와 실제 서비스 경험을 구체화합니다.",
  },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          ABOUT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 break-keep font-display text-3xl font-bold leading-tight text-foreground md:mb-16 md:text-5xl"
        >
          기술과 사업 사이에서 <span className="text-gradient">실행 구조를 만드는 PM</span>입니다.
        </motion.h2>

        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 break-keep font-body text-base leading-8 text-muted-foreground md:text-lg">
              저는 퍼포먼스 마케팅으로 사용자 반응을 읽는 일에서 시작해 350만 MAU 서비스 운영,
              AI 서비스 기획, 데이터 구축, SaaS·공공사업까지 경험을 확장한 9년차 PM입니다.
            </p>
            <p className="mb-10 break-keep font-body text-base leading-8 text-muted-foreground md:text-lg">
              AI 모델을 직접 개발하기보다 STT·TTS·Retrieval·RAG·OCR 같은 기술을 사용자 흐름과
              운영 프로세스에 연결하고, 요구사항·데이터 기준·협업 구조를 설계해 서비스를 검증해 왔습니다.
            </p>

            <h3 className="mb-5 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
              교육 & 자격
            </h3>
            <div className="space-y-4">
              {educationAndCertificates.map((item) => (
                <div
                  key={`${item.title}-${item.year}`}
                  className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="break-keep font-display text-sm font-bold text-foreground">{item.title}</p>
                    <p className="mt-1 break-keep font-body text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                  <span className="shrink-0 font-body text-xs text-muted-foreground">{item.year}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {strengths.map((strength, index) => (
              <motion.article
                key={strength.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <strength.icon size={20} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-display text-base font-bold text-foreground">{strength.title}</h3>
                <p className="break-keep font-body text-sm leading-6 text-muted-foreground">
                  {strength.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
