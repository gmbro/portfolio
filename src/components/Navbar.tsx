import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";
import { chatbotAvatar } from "@/data/chatbot";
import { openPortfolioChat } from "@/lib/chat";

const navItems = [
  { label: "소개", id: "about" },
  { label: "프로젝트", id: "case-studies" },
  { label: "경력", id: "experience" },
  { label: "Contact", id: "contact" },
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
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[rgba(7,7,7,0.9)] px-4 py-3 sm:px-6 md:px-10 lg:px-12"
      aria-label="주요 메뉴"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          aria-label="7년차 PM 이경민의 포트폴리오입니다. 처음으로"
          className="flex min-h-11 shrink-0 items-center rounded-lg text-left font-display text-[11px] font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm md:text-base"
        >
          <span className="md:hidden">{profile.name} · 7년차 PM</span>
          <span className="hidden md:inline">7년차 PM {profile.name}의 포트폴리오입니다.</span>
        </button>

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
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <button
            type="button"
            onClick={(event) => openPortfolioChat(event.currentTarget)}
            aria-haspopup="dialog"
            data-portfolio-chat-trigger="true"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-gradient-accent py-1.5 pl-1.5 pr-3 font-body text-[11px] font-semibold tracking-tight text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-2.5 sm:pr-4 sm:text-xs"
          >
            <img
              src={chatbotAvatar}
              alt=""
              width="32"
              height="32"
              decoding="async"
              className="h-8 w-8 rounded-full border border-white/45 bg-white object-cover"
            />
            AI에게 묻기
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
