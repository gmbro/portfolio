import { motion } from "framer-motion";

const navCol1 = [
  { label: "소개", id: "about" },
  { label: "경력", id: "experience" },
  { label: "케이스 스터디", id: "case-studies" },
];

const navCol2 = [
  { label: "스킬", id: "skills" },
  { label: "추천사", id: "testimonials" },
  { label: "연락하기", id: "contact" },
];

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="pt-20 pb-8 px-6 md:px-16 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
          {/* Left — brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-accent flex items-center justify-center">
                <span className="font-display text-sm font-bold text-primary-foreground">JS</span>
              </div>
              <span className="font-display text-base font-bold tracking-tight text-foreground">
                KIM JISOO
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              데이터 기반으로 제품을 성장시키는 7년차 Product Manager
            </p>
          </motion.div>

          {/* Center — nav links 2 cols */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-widest mb-4">
                바로가기
              </h4>
              <ul className="space-y-2.5">
                {navCol1.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="text-sm text-muted-foreground font-body hover:text-foreground transition-colors duration-300"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-widest mb-4">
                더보기
              </h4>
              <ul className="space-y-2.5">
                {navCol2.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="text-sm text-muted-foreground font-body hover:text-foreground transition-colors duration-300"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — contact */}
          <div>
            <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-widest mb-4">
              연락처
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground font-body">
              <li>jisoo.kim@email.com</li>
              <li>linkedin.com/in/jisoo-kim-pm</li>
              <li>서울, 대한민국</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/50 font-body">
          <span>© 2025 Kim Jisoo. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Brunch</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
