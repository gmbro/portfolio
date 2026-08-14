import { useEffect, useState } from "react";
import {
  disableAnalytics,
  initializeAnalytics,
  isAnalyticsConfigured,
  OPEN_ANALYTICS_SETTINGS_EVENT,
  readAnalyticsConsent,
  saveAnalyticsConsent,
  type AnalyticsConsent,
} from "@/lib/analytics";

const AnalyticsConsentBanner = () => {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(() => readAnalyticsConsent());
  const [isOpen, setIsOpen] = useState(() => isAnalyticsConfigured && consent === null);

  useEffect(() => {
    if (consent === "granted") initializeAnalytics();
  }, [consent]);

  useEffect(() => {
    const openSettings = () => setIsOpen(true);
    window.addEventListener(OPEN_ANALYTICS_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_ANALYTICS_SETTINGS_EVENT, openSettings);
  }, []);

  if (!isAnalyticsConfigured || !isOpen) return null;

  const chooseConsent = (nextConsent: AnalyticsConsent) => {
    saveAnalyticsConsent(nextConsent);
    setConsent(nextConsent);
    if (nextConsent === "granted") initializeAnalytics();
    else {
      disableAnalytics();
      if (consent === "granted") {
        window.location.reload();
        return;
      }
    }
    setIsOpen(false);
  };

  return (
    <aside
      data-analytics-consent-banner="true"
      role="dialog"
      aria-label="방문 분석 설정"
      aria-modal="false"
      className="fixed inset-x-3 bottom-3 z-[424244] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#111111]/95 p-5 text-white shadow-2xl shadow-black/60 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <div className="sm:flex sm:items-end sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-white md:text-lg">방문 분석 설정</p>
          <p className="mt-2 break-words text-pretty font-body text-sm leading-6 text-white/70">
            포트폴리오를 개선하기 위해 Google Analytics로 공개 페이지 조회와 상호작용을 측정합니다. 허용 시
            분석용 쿠키를 사용할 수 있으며, 이름·이메일·문의 내용·회사별 지원 링크는 보내지 않습니다.
          </p>
          <a
            href="https://policies.google.com/privacy?hl=ko"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-[#ff8a70] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
          >
            Google 개인정보처리방침
          </a>
        </div>

        <div className="mt-4 grid shrink-0 grid-cols-2 gap-2 sm:mt-0 sm:flex">
          <button
            type="button"
            onClick={() => chooseConsent("denied")}
            className="min-h-11 rounded-full border border-white/20 px-4 py-2.5 font-body text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645]"
          >
            {consent === "granted" ? "분석 중지" : "거부"}
          </button>
          <button
            type="button"
            onClick={() => chooseConsent("granted")}
            className="min-h-11 rounded-full bg-[#ff6645] px-4 py-2.5 font-body text-sm font-bold text-white transition-colors hover:bg-[#ff7a5f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {consent === "granted" ? "계속 허용" : "분석 허용"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AnalyticsConsentBanner;
