import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";

const navItems = [
  { label: "역량", id: "about" },
  { label: "현재 제품", id: "product-proof" },
  { label: "프로젝트", id: "case-studies" },
  { label: "경력", id: "experience" },
  { label: "문의", id: "contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 bg-background/70 backdrop-blur-xl border-b border-border"
      aria-label="주요 메뉴"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            {profile.name}
          </span>
        </div>

        {/* Center nav links — desktop */}
        <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="inline-flex min-h-10 items-center rounded-lg px-2 text-[13px] font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA — right */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="hidden min-h-11 sm:block px-5 py-2 text-xs font-body font-semibold uppercase tracking-wider bg-gradient-accent text-primary-foreground rounded-full hover:shadow-[var(--shadow-glow)] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            문의하기
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
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
              type="button"
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex min-h-11 items-center text-sm font-body text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
