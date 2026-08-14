import { render, screen, waitFor } from "@testing-library/react";
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
    expect(desktopNavigationLinks.indexOf("역량")).toBeLessThan(
      desktopNavigationLinks.indexOf("프로젝트"),
    );
    expect(desktopNavigationLinks).not.toContain("현재 제품");

    expect(screen.getByRole("heading", { name: "고객의 문제를 제품으로 해결합니다." })).toBeInTheDocument();
    expect(screen.getByText("제품의 시작부터 운영과 사업화까지, 서로 다른 문제를 맡아 왔습니다.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "무엇을 결정했고, 무엇이 달라졌는지 보여드립니다." })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Archi 베타 보기, 새 창에서 열기" })).toHaveAttribute(
      "href",
      "https://archi.best",
    );
    expect(container.querySelectorAll("[data-project-rank]")).toHaveLength(5);
    expect(container.querySelector('[data-project-rank="1"][id="arkylab-ai-coach"]')).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "다음 선택에서는 조직의 목표를 중요한 기준으로 봅니다." })).toBeInTheDocument();
    expect(observedSectionIds).toContain("arkylab-ai-coach");
    expect(observedSectionIds).not.toContain("product-proof");

    expect(await screen.findByTestId("typebot-bubble")).toBeInTheDocument();
    await waitFor(() => expect(bubbleProps).toHaveBeenCalledWith(
      expect.objectContaining({
        typebot: "gmbro",
        inlineStyle: {
          "--container-bottom": "var(--portfolio-chat-bottom)",
          "--bot-max-width": "min(400px, calc(100vw - 40px))",
          "--bot-max-height": "min(704px, calc(100vh - 120px))",
        },
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
