import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

const { bubbleProps } = vi.hoisted(() => ({
  bubbleProps: vi.fn(),
}));

const observedSectionIds: string[] = [];

vi.mock("@typebot.io/react", () => ({
  Bubble: (props: unknown) => {
    bubbleProps(props);
    return <div data-testid="typebot-bubble" />;
  },
  setInputValue: vi.fn(),
  submitInput: vi.fn(),
}));

describe("기본 포트폴리오 정보 구조", () => {
  beforeEach(() => {
    bubbleProps.mockClear();
    observedSectionIds.length = 0;
    class OutOfViewObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0];
      constructor(private readonly callback: IntersectionObserverCallback) {}
      disconnect() {}
      observe(target: Element) {
        observedSectionIds.push(target.id);
        this.callback([{ target, isIntersecting: false } as IntersectionObserverEntry], this);
      }
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
      unobserve() {}
    }
    vi.stubGlobal("IntersectionObserver", OutOfViewObserver);
  });

  afterEach(() => vi.unstubAllGlobals());

  it("Archi를 첫 프로젝트로 통합하고 경력 방향까지 한 흐름으로 보여준다", async () => {
    const { default: Index } = await import("@/pages/Index");

    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Index />
      </MemoryRouter>,
    );

    const about = container.querySelector("#about");
    expect(about).toBeTruthy();
    const caseStudies = container.querySelector("#case-studies");
    expect(caseStudies).toBeTruthy();
    expect(about?.compareDocumentPosition(caseStudies as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector("#product-proof")).toBeInTheDocument();

    const navigation = screen.getByRole("navigation", { name: "주요 메뉴" });
    const desktopNavigationLinks = Array.from(
      navigation.querySelectorAll<HTMLButtonElement>("div.hidden button"),
    ).map((button) => button.textContent?.trim());
    expect(desktopNavigationLinks.indexOf("역량·근거")).toBeLessThan(
      desktopNavigationLinks.indexOf("프로젝트"),
    );
    expect(desktopNavigationLinks).not.toContain("현재 제품");

    expect(screen.getByRole("heading", { name: "고객의 문제를 제품으로 해결해 온 AI PM 이경민입니다." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "이경민 AI PM 포트폴리오, 처음으로" })).toBeInTheDocument();
    expect(container.querySelector("#evidence")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "역량을 선택해 연결된 프로젝트 증거를 확인하세요." })).toBeInTheDocument();
    expect(container.querySelector(".portfolio-ambient")).toBeInTheDocument();
    expect(container.querySelector<HTMLImageElement>("#hero .portfolio-hero__media")?.src).toBe(
      "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/background.png",
    );
    expect(screen.getByText("제품의 시작부터 운영과 사업화까지, 서로 다른 문제를 맡아 왔습니다.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "무엇을 결정했고, 무엇이 달라졌는지 보여드립니다." })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Archi 베타 보기, 새 창에서 열기" })).toHaveAttribute(
      "href",
      "https://archi.best",
    );
    expect(container.querySelectorAll("[data-project-rank]")).toHaveLength(5);
    expect(container.querySelectorAll('[data-evidence-media-state="empty"]')).toHaveLength(5);
    expect(container.querySelector('[data-project-rank="1"][id="arkylab-ai-coach"]')).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "다음 선택에서는 조직의 목표를 중요한 기준으로 봅니다." })).toBeInTheDocument();
    const experienceArticles = Array.from(container.querySelectorAll("#experience article"));
    expect(experienceArticles[0]?.querySelector("p")?.textContent).toBe("대표");
    expect(experienceArticles[1]?.querySelector("p")?.textContent).toBe("프로.사업개발");
    expect(container.querySelector("#experience")?.textContent).not.toContain("대표 · 제품");
    expect(container.querySelector("#experience")?.textContent).not.toContain("사업개발 · 사업개발");
    expect(observedSectionIds).toContain("contact");

    const localLauncher = screen.getByRole("button", { name: "물어보기 열기" });
    expect(localLauncher).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();

    fireEvent.click(localLauncher);
    expect(await screen.findByTestId("typebot-bubble")).toBeInTheDocument();
    await waitFor(() => expect(bubbleProps).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "portfolio-typebot",
        typebot: "gmbro",
        isOpen: true,
        inlineStyle: expect.objectContaining({
          "--container-bottom": "var(--portfolio-chat-bottom)",
          "--bot-max-width": "min(400px, calc(100vw - 40px))",
          "--bot-max-height": "min(704px, calc(100vh - 120px))",
          "--typebot-container-font-family": '"Pretendard Variable", Pretendard',
        }),
        theme: expect.objectContaining({
          position: "fixed",
          button: expect.objectContaining({
            backgroundColor: "#FFFFFF",
            iconColor: "#111111",
            customIconSrc: expect.stringContaining("bubble-icon"),
            customCloseIconSrc: expect.stringContaining("data:image/svg+xml"),
            isHidden: false,
          }),
        }),
      }),
    ));
  });
});
