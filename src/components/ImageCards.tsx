import { motion } from "framer-motion";
import { Rocket, Link, User } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const cards = [
  {
    icon: Rocket,
    title: "Proven Track Record",
    description: "검증된 성과로 신뢰를 쌓아왔습니다.",
  },
  {
    icon: Link,
    title: "Tailored Solutions",
    description: "목표와 고객에 맞춘 맞춤형 전략을 제공합니다.",
  },
  {
    icon: User,
    title: "Client-Centered",
    description: "고객의 성공이 우리의 최우선 과제입니다.",
  },
];

const ImageCards = () => {
  return (
    <section id="case-studies" className="relative h-[760px] scroll-mt-20 sm:h-[680px] md:h-[700px]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Orange overlay */}
      <div className="absolute inset-0 z-[1] bg-[rgba(180,70,0,0.55)]" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] h-1/2 bg-gradient-to-b from-transparent to-[#0A0A0A]" />

      {/* 3 Cards */}
      <div className="absolute bottom-8 left-5 right-5 z-[3] md:bottom-10 md:left-10 md:right-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="rounded-2xl px-5 py-5 text-center backdrop-blur-[40px] border border-white/[0.12] md:px-6 md:py-8"
            >
              <div className="w-14 h-14 rounded-xl border border-[#E85442]/40 flex items-center justify-center mx-auto mb-5">
                <card.icon size={26} className="text-[#E85442]" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-sm font-body text-white/75 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCards;
