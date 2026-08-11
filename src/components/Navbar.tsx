import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { profile } from "@/data/portfolio";

const navItems = [
  { label: "소개", id: "about" },
  { label: "대표 프로젝트", id: "case-studies" },
  { label: "경력", id: "experience" },
  { label: "AI 역량", id: "skills" },
  { label: "활동·수상", id: "activities" },
  { label: "연락", id: "contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 bg-background/70 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            {profile.englishName}
          </span>
        </div>

        {/* Center nav links — desktop */}
        <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-[13px] font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA — right */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300"
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden sm:block px-5 py-2 text-xs font-body font-semibold uppercase tracking-wider bg-gradient-accent text-primary-foreground rounded-full hover:shadow-[var(--shadow-glow)] transition-all duration-500"
          >
            협업 문의
          </button>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-h-[calc(100vh-5rem)] overflow-y-auto lg:hidden mt-4 pb-4 flex flex-col gap-2 border-t border-border pt-4"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex min-h-11 items-center text-sm font-body text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="sm:hidden px-5 py-2 text-xs font-body font-semibold uppercase tracking-wider bg-gradient-accent text-primary-foreground rounded-full w-fit hover:shadow-[var(--shadow-glow)] transition-all duration-500"
          >
            협업 문의
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
