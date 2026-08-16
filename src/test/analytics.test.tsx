import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("@typebot.io/react", () => ({
  Bubble: () => null,
}));

const measurementId = "G-C8EPGBXDJE";

const toCommand = (item: IArguments | unknown[]) => Array.from(item);

const loadAnalyticsModules = async () => {
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", measurementId);
  const analytics = await import("@/lib/analytics");
  analytics.setAnalyticsRouteEnabled(true);
  const { default: AnalyticsConsentBanner } = await import("@/components/AnalyticsConsent");
  return { analytics, AnalyticsConsentBanner };
};

describe("Google Analytics 동의 기반 연동", () => {
  afterEach(() => {
    document.getElementById("portfolio-google-analytics")?.remove();
    window.localStorage.clear();
    delete window.dataLayer;
    delete window.gtag;
    delete (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`];
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("동의 전과 거부 후에는 Google 태그를 불러오지 않는다", async () => {
    const { analytics, AnalyticsConsentBanner } = await loadAnalyticsModules();
    render(<AnalyticsConsentBanner />);

    expect(screen.getByRole("dialog", { name: "방문 분석 설정" })).toBeInTheDocument();
    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "거부" }));
    expect(screen.queryByRole("dialog", { name: "방문 분석 설정" })).not.toBeInTheDocument();
    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')).not.toBeInTheDocument();

    act(() => window.dispatchEvent(new Event(analytics.OPEN_ANALYTICS_SETTINGS_EVENT)));
    expect(screen.getByRole("dialog", { name: "방문 분석 설정" })).toBeInTheDocument();
  });

  it("허용하면 태그를 한 번만 로드하고 고정 공개 URL의 page_view만 큐에 넣는다", async () => {
    const { analytics, AnalyticsConsentBanner } = await loadAnalyticsModules();
    render(<AnalyticsConsentBanner />);

    fireEvent.click(screen.getByRole("button", { name: "분석 허용" }));

    await waitFor(() => {
      expect(document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')).toHaveLength(1);
    });
    analytics.initializeAnalytics();
    expect(document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')).toHaveLength(1);

    const commands = (window.dataLayer ?? []).map(toCommand);
    expect(commands[0]).toEqual([
      "consent",
      "default",
      expect.objectContaining({
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      }),
    ]);
    expect(commands).toContainEqual([
      "config",
      measurementId,
      expect.objectContaining({
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: "https://archilab.ai.kr/",
        page_title: "이경민 | AI Product Manager",
        page_referrer: "",
      }),
    ]);
    expect(commands).toContainEqual([
      "event",
      "page_view",
      {
        page_location: "https://archilab.ai.kr/",
        page_title: "이경민 | AI Product Manager",
        page_referrer: "",
      },
    ]);

    const serialized = JSON.stringify(commands);
    expect(serialized).not.toContain("/p/");
    expect(serialized).not.toContain("@example.com");
  });

  it("채용 퍼널 이벤트는 고정된 익명 파라미터로 세션당 한 번만 전송한다", async () => {
    const { analytics } = await loadAnalyticsModules();
    analytics.initializeAnalytics();

    expect(analytics.trackPortfolioEvent("select_content")).toBe(true);
    expect(analytics.trackPortfolioEvent("select_content")).toBe(false);
    expect(analytics.trackPortfolioEvent("contact_start")).toBe(true);
    expect(analytics.trackPortfolioEvent("generate_lead")).toBe(true);

    const commands = (window.dataLayer ?? []).map(toCommand);
    expect(commands).toContainEqual([
      "event",
      "select_content",
      {
        content_type: "product_demo",
        content_id: "archi",
        page_location: "https://archilab.ai.kr/",
        page_title: "이경민 | AI Product Manager",
        page_referrer: "",
      },
    ]);
    expect(commands.filter((command) => command[1] === "select_content")).toHaveLength(1);
    expect(commands).toContainEqual([
      "event",
      "contact_start",
      {
        form_id: "portfolio_contact",
        page_location: "https://archilab.ai.kr/",
        page_title: "이경민 | AI Product Manager",
        page_referrer: "",
      },
    ]);
    expect(commands).toContainEqual([
      "event",
      "generate_lead",
      {
        lead_source: "portfolio_contact",
        page_location: "https://archilab.ai.kr/",
        page_title: "이경민 | AI Product Manager",
        page_referrer: "",
      },
    ]);
  });

  it("공개 루트에서 회사별 경로로 전환하면 분석 전송을 즉시 중지한다", async () => {
    const { analytics } = await loadAnalyticsModules();
    analytics.initializeAnalytics();

    analytics.setAnalyticsRouteEnabled(false);

    expect(analytics.trackPortfolioEvent("chat_open")).toBe(false);
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`]).toBe(true);

    const commands = (window.dataLayer ?? []).map(toCommand);
    expect(commands.at(-1)).toEqual([
      "consent",
      "update",
      expect.objectContaining({ analytics_storage: "denied" }),
    ]);

    const serialized = JSON.stringify(commands);
    expect(serialized).not.toContain("company-private-slug");
  });

  it("회사별 포트폴리오는 동의 UI와 Google 태그 진입점을 렌더링하지 않는다", async () => {
    await loadAnalyticsModules();
    const { default: Index } = await import("@/pages/Index");

    render(
      <MemoryRouter initialEntries={["/p/company-private-slug"]}>
        <Index analyticsEnabled={false} />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("dialog", { name: "방문 분석 설정" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "방문 분석 설정" })).not.toBeInTheDocument();
    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')).not.toBeInTheDocument();
  });

  it("공개 기본 포트폴리오도 분석 UI와 Google 태그를 기본 비활성화한다", async () => {
    await loadAnalyticsModules();
    const { default: Index } = await import("@/pages/Index");

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Index />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("dialog", { name: "방문 분석 설정" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "방문 분석 설정" })).not.toBeInTheDocument();
    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')).not.toBeInTheDocument();
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`]).toBe(true);
  });
});
