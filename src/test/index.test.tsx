import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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
  setInputValue: vi.fn(),
  submitInput: vi.fn(),
}));

describe("기본 포트폴리오 정보 구조", () => {
  beforeEach(() => {
    bubbleProps.mockClear();
  });

  afterEach(() => vi.unstubAllGlobals());

  it("About·Projects·Experience·Contact를 Evidence Product와 푸터 없이 한 흐름으로 보여준다", async () => {
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
    const experience = container.querySelector("#experience");
    const contact = container.querySelector("#contact");
    expect(about?.compareDocumentPosition(caseStudies as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(caseStudies?.compareDocumentPosition(experience as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(experience?.compareDocumentPosition(contact as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector("#evidence")).not.toBeInTheDocument();
    expect(container.querySelector("#product-proof")).not.toBeInTheDocument();
    expect(container.textContent).not.toContain("Evidence Product");

    const navigation = screen.getByRole("navigation", { name: "주요 메뉴" });
    const desktopNavigationLinks = Array.from(
      navigation.querySelectorAll<HTMLButtonElement>("div.hidden button"),
    ).map((button) => button.textContent?.trim());
    expect(desktopNavigationLinks).toEqual(["About", "Projects", "Experience", "Contact"]);

    const hero = container.querySelector<HTMLElement>("#hero");
    expect(hero).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI 역량이 우수한 제너럴리스트로서 고객의 문제를 제품으로 해결합니다." })).toBeInTheDocument();
    expect(within(hero as HTMLElement).getByText("AI Product & Project Manager")).toBeInTheDocument();
    expect(within(hero as HTMLElement).queryByText("제품의 제로투원과 350만 MAU 제품의 운영을 경험하고 제품 기획, 사업 개발, 퍼포먼스 마케팅 등 다양한 영역에서 역량을 키워왔습니다. B2B AI Project에 강점이 있으며 최근 직접 개발한 B2C Product로 헬스케어 데이터의 휘발성에 대한 문제를 풀고 있습니다.")).not.toBeInTheDocument();
    expect(
      Array.from(hero?.querySelectorAll('[aria-label="핵심 역량"] span') ?? []).map((keyword) => keyword.textContent),
    ).toEqual([
      "프로덕트의 제로투원 경험",
      "350만 MAU 제품 운영",
      "B2B&B2G 프로젝트",
      "B2C Product 기획·개발",
    ]);
    expect(within(hero as HTMLElement).queryByText("대표 프로젝트를 직접 살펴보거나, AI에게 필요한 경력 근거를 물어보세요.")).not.toBeInTheDocument();
    expect(within(hero as HTMLElement).queryAllByRole("button")).toHaveLength(0);
    expect(within(hero as HTMLElement).queryByText("프로젝트 증거 보기")).not.toBeInTheDocument();
    expect(Array.from(hero?.querySelectorAll("dl > div") ?? []).map((card) => ({
      value: card.querySelector("dd")?.textContent,
      label: card.querySelector("dt")?.textContent,
    }))).toEqual([
      { value: "5개", label: "수행 프로젝트" },
      { value: "3개", label: "프로덕트 기획 및 운영" },
      { value: "3억", label: "매출 기여" },
    ]);
    expect(screen.getByRole("button", { name: "Lee Kyoungmin Portfolio, 처음으로" })).toHaveTextContent(
      "Lee Kyoungmin Portfolio",
    );
    expect(screen.getByRole("heading", { name: "수행 프로젝트 협업사" })).toBeInTheDocument();
    const heroLogos = Array.from(hero?.querySelectorAll<HTMLImageElement>("[data-hero-logo]") ?? []);
    expect(heroLogos.map((logo) => logo.dataset.heroLogo)).toEqual([
      "nipa",
      "busan",
      "lg",
      "kisa",
      "neo",
      "nhn",
      "syrup",
      "fixness",
    ]);
    expect(heroLogos.every((logo) => logo.alt.endsWith("로고"))).toBe(true);
    expect(heroLogos.map((logo) => new URL(logo.src).pathname)).toEqual([
      "/logos/partners/nipa.webp",
      "/logos/partners/busan.webp",
      "/logos/partners/lg.webp",
      "/logos/partners/kisa.webp",
      "/logos/partners/neo.webp",
      "/logos/partners/nhn.webp",
      "/logos/partners/syrup.webp",
      "/logos/partners/fixness.webp",
    ]);
    expect(
      heroLogos.every(
        (logo) =>
          logo.getAttribute("loading") === "lazy" && logo.getAttribute("decoding") === "async",
      ),
    ).toBe(true);
    expect(screen.queryByRole("heading", { name: "역량을 선택해 연결된 프로젝트 증거를 확인하세요." })).not.toBeInTheDocument();
    expect(container.querySelector(".portfolio-ambient")).toBeInTheDocument();
    expect(container.querySelector<HTMLImageElement>("#hero .portfolio-hero__media")?.src).toBe(
      "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/background.png",
    );
    expect(screen.getByText("제품의 시작부터 운영과 사업화까지, 서로 다른 문제를 맡아 왔습니다.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "무엇을 결정했고, 무엇이 달라졌는지 보여드립니다." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "채용·협업" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "아키 베타 보기, 새 창에서 열기" })).toHaveAttribute(
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
    expect(container.textContent).not.toContain("Arkylab");
    expect(container.textContent).not.toContain("Archi");
    expect(container.textContent).not.toContain("2026 이경민");
    const chatButtons = screen.getAllByRole("button", { name: "AI에게 묻기" });
    expect(chatButtons).toHaveLength(1);
    expect(chatButtons[0]).toHaveAttribute("aria-haspopup", "dialog");
    expect(chatButtons[0].querySelector("img")?.src).toContain("bubble-icon");
    expect(screen.queryByRole("button", { name: "AI에게 경력 묻기" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "물어보기 열기" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();

    fireEvent.click(chatButtons[0]);
    expect(await screen.findByTestId("typebot-bubble")).toBeInTheDocument();
    await waitFor(() => expect(bubbleProps).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "portfolio-typebot",
        typebot: "gmbro",
        isOpen: true,
        inlineStyle: expect.objectContaining({
          "--container-bottom": "var(--portfolio-chat-bottom)",
          "--bot-max-width": "min(480px, calc(100vw - 24px))",
          "--bot-max-height": "min(820px, calc(100dvh - 24px))",
          "--typebot-container-font-family": '"Pretendard Variable", Pretendard',
        }),
        theme: expect.objectContaining({
          position: "fixed",
          button: expect.objectContaining({
            backgroundColor: "#FFFFFF",
            iconColor: "#111111",
            customIconSrc: expect.stringContaining("bubble-icon"),
            customCloseIconSrc: expect.stringContaining("data:image/svg+xml"),
            isHidden: true,
          }),
        }),
      }),
    ));
  });
});
