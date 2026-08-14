export const ANALYTICS_CONSENT_STORAGE_KEY = "portfolio-analytics-consent-v1";
export const OPEN_ANALYTICS_SETTINGS_EVENT = "portfolio:open-analytics-settings";

const GA_SCRIPT_ID = "portfolio-google-analytics";
const CANONICAL_PAGE_LOCATION = "https://archilab.ai.kr/";
const CANONICAL_PAGE_TITLE = "이경민 | AI Product Manager";
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? "";

export type AnalyticsConsent = "granted" | "denied";
export type PortfolioAnalyticsEvent =
  | "select_content"
  | "chat_open"
  | "contact_start"
  | "generate_lead";

type DataLayerItem = IArguments | unknown[];

declare global {
  interface Window {
    dataLayer?: DataLayerItem[];
    gtag?: (...args: unknown[]) => void;
  }
}

const eventParameters: Record<PortfolioAnalyticsEvent, Record<string, string>> = {
  select_content: { content_type: "product_demo", content_id: "archi" },
  chat_open: { surface: "floating" },
  contact_start: { form_id: "portfolio_contact" },
  generate_lead: { lead_source: "portfolio_contact" },
};

const sentEvents = new Set<PortfolioAnalyticsEvent>();
let initialized = false;
let analyticsAllowed = false;
let analyticsRouteEnabled = false;

const safePageContext = {
  page_location: CANONICAL_PAGE_LOCATION,
  page_title: CANONICAL_PAGE_TITLE,
  page_referrer: "",
} as const;

const setGoogleAnalyticsDisabled = (disabled: boolean) => {
  if (typeof window === "undefined" || !measurementId) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = disabled;
};

export const isAnalyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId);

export const readAnalyticsConsent = (): AnalyticsConsent | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
};

export const saveAnalyticsConsent = (consent: AnalyticsConsent) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
};

const ensureGtag = () => {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag() {
    // Google Tag consumes the native arguments object used by the official gtag snippet.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  return window.gtag;
};

const deniedConsent = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

export const initializeAnalytics = () => {
  if (
    typeof window === "undefined" ||
    !isAnalyticsConfigured ||
    !analyticsRouteEnabled
  ) {
    return false;
  }

  const gtag = ensureGtag();
  analyticsAllowed = true;
  setGoogleAnalyticsDisabled(false);

  if (initialized) {
    gtag("consent", "update", { ...deniedConsent, analytics_storage: "granted" });
    return true;
  }

  gtag("consent", "default", deniedConsent);
  gtag("js", new Date());
  gtag("consent", "update", { ...deniedConsent, analytics_storage: "granted" });
  gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...safePageContext,
  });

  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  gtag("event", "page_view", safePageContext);

  initialized = true;
  return true;
};

const clearAnalyticsCookies = () => {
  if (typeof document === "undefined") return;

  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name?.startsWith("_ga")));

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.archilab.ai.kr; SameSite=Lax`;
  });
};

export const disableAnalytics = () => {
  analyticsAllowed = false;
  setGoogleAnalyticsDisabled(true);
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", deniedConsent);
  }
  clearAnalyticsCookies();
};

export const setAnalyticsRouteEnabled = (enabled: boolean) => {
  analyticsRouteEnabled = enabled;
  if (!enabled) disableAnalytics();
};

export const trackPortfolioEvent = (eventName: PortfolioAnalyticsEvent) => {
  if (
    !analyticsRouteEnabled ||
    !analyticsAllowed ||
    !window.gtag ||
    sentEvents.has(eventName)
  ) {
    return false;
  }

  window.gtag("event", eventName, {
    ...eventParameters[eventName],
    ...safePageContext,
  });
  sentEvents.add(eventName);
  return true;
};
