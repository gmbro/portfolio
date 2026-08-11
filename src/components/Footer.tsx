import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";

const primaryLinks = [
  { label: "소개", id: "about" },
  { label: "대표 프로젝트", id: "case-studies" },
  { label: "경력", id: "experience" },
];

const secondaryLinks = [
  { label: "AI 역량", id: "skills" },
  { label: "활동·수상", id: "activities" },
  { label: "연락", id: "contact" },
];

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border px-6 pt-20 pb-32 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-3">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-accent">
                <span className="font-display text-sm font-bold text-primary-foreground">LG</span>
              </div>
              <span className="font-display text-base font-bold tracking-tight text-foreground">
                {profile.englishName}
              </span>
            </div>
            <p className="max-w-sm break-keep font-body text-sm leading-6 text-muted-foreground">
              AI 기술을 사용자 문제와 운영 성과로 연결하는 9년차 Product & Project Manager
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-foreground">바로가기</h4>
              <ul className="space-y-2.5">
                {primaryLinks.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className="min-h-8 text-left font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-foreground">더보기</h4>
              <ul className="space-y-2.5">
                {secondaryLinks.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className="min-h-8 text-left font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-foreground">연락처</h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${profile.email}`} className="break-all transition-colors hover:text-foreground">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.archiLab} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
                  ArchiLab
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 font-body text-xs text-muted-foreground/60 md:flex-row">
          <span>© 2026 {profile.englishName}. All rights reserved.</span>
          <div className="flex gap-6">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href={profile.archiLab} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
              ArchiLab
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
