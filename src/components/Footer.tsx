import { profile } from "@/data/portfolio";
import { OPEN_ANALYTICS_SETTINGS_EVENT } from "@/lib/analytics";

interface FooterProps {
  showAnalyticsSettings?: boolean;
}

const Footer = ({ showAnalyticsSettings = true }: FooterProps) => {
  return (
    <footer className="border-t border-white/10 bg-[rgba(7,7,7,0.82)] px-6 pb-32 pt-8 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 font-body text-xs text-white/50">
        <span>© 2026 {profile.name}</span>
        {showAnalyticsSettings && (
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_ANALYTICS_SETTINGS_EVENT))}
            className="min-h-11 rounded-full px-3 py-2 text-white/65 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
          >
            방문 분석 설정
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
