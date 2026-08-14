import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

const { bubbleProps } = vi.hoisted(() => ({
  bubbleProps: vi.fn(),
}));

vi.mock("@typebot.io/react", () => ({
  Bubble: (props: unknown) => {
    bubbleProps(props);
    return <div data-testid="typebot-bubble" />;
  },
}));

describe("기본 포트폴리오 정보 구조", () => {
  beforeEach(() => {
    bubbleProps.mockClear();
    class OutOfViewObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0];
      constructor(private readonly callback: IntersectionObserverCallback) {}
      disconnect() {}
      observe(target: Element) {
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

  it("역량 다음에 Archi 현재 제품과 핵심 프로젝트를 한 번씩 보여주고 챗봇을 고정한다", async () => {
    const { default: Index } = await import("@/pages/Index");

    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Index />
      </MemoryRouter>,
    );

    const about = container.querySelector("#about");
    const productProof = container.querySelector("#product-proof");
    expect(about).toBeTruthy();
    expect(productProof).toBeTruthy();
    expect(about?.compareDocumentPosition(productProof as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const caseStudies = container.querySelector("#case-studies");
    expect(productProof?.compareDocumentPosition(caseStudies as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const navigation = screen.getByRole("navigation", { name: "주요 메뉴" });
    const desktopNavigationLinks = Array.from(
      navigation.querySelectorAll<HTMLButtonElement>("div.hidden button"),
    ).map((button) => button.textContent?.trim());
    expect(desktopNavigationLinks.indexOf("역량")).toBeLessThan(
      desktopNavigationLinks.indexOf("프로젝트"),
    );
    expect(desktopNavigationLinks).toContain("현재 제품");

    expect(screen.getByRole("heading", { name: "고객의 문제를 제품으로 해결합니다" })).toBeInTheDocument();
    expect(screen.getByText("무엇을 만들지, 만들지 않을지까지 결정합니다.")).toBeInTheDocument();

    expect(screen.getByText("현재 제품 · Archi(아키)")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Archi(아키) 베타 새 창에서 보기" })).toHaveAttribute(
      "href",
      "https://archi.best",
    );
    expect(container.querySelectorAll("[data-project-rank]")).toHaveLength(4);
    expect(container.querySelector('[data-project-rank][id="arkylab-ai-coach"]')).not.toBeInTheDocument();

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
