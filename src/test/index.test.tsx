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
    expect(hero).toHaveClass("portfolio-hero");
    expect(screen.getByRole("heading", { name: "고객의 문제를 제품으로 해결합니다." })).toBeInTheDocument();
    const heroSummary = within(hero as HTMLElement).getByRole("list", {
      name: "포트폴리오 요약",
    });
    expect(Array.from(heroSummary.querySelectorAll("li")).map((item) => item.textContent)).toEqual([
      "Portfolio",
      "AI PM",
      "7 years of experience",
    ]);
    expect(
      Array.from(hero?.querySelectorAll("h1 > span > span") ?? []).map((part) => part.textContent),
    ).toEqual(["고객", "제품"]);
    expect(within(hero as HTMLElement).queryByText("제품의 제로투원과 350만 MAU 제품의 운영을 경험하고 제품 기획, 사업 개발, 퍼포먼스 마케팅 등 다양한 영역에서 역량을 키워왔습니다. B2B AI Project에 강점이 있으며 최근 직접 개발한 B2C Product로 헬스케어 데이터의 휘발성에 대한 문제를 풀고 있습니다.")).not.toBeInTheDocument();
    expect(hero?.querySelector('[aria-label="핵심 역량"]')).not.toBeInTheDocument();
    expect(
      Array.from(about?.querySelectorAll('[aria-label="핵심 역량"] span') ?? []).map(
        (keyword) => keyword.textContent,
      ),
    ).toEqual([
      "AI",
      "Product",
      "Project",
      "B2B",
      "B2C",
    ]);
    expect(within(hero as HTMLElement).queryByText("대표 프로젝트를 직접 살펴보거나, AI에게 필요한 경력 근거를 물어보세요.")).not.toBeInTheDocument();
    expect(within(hero as HTMLElement).queryAllByRole("button")).toHaveLength(0);
    expect(within(hero as HTMLElement).queryByText("프로젝트 증거 보기")).not.toBeInTheDocument();
    const statCards = Array.from(hero?.querySelectorAll("dl > div") ?? []);
    expect(statCards.map((card) => ({
      value: card.querySelector<HTMLElement>("[data-stat-final-value]")?.dataset.statFinalValue,
      label: card.querySelector("dt")?.textContent,
    }))).toEqual([
      { value: "5+", label: "수행 프로젝트" },
      { value: "3+", label: "제품 기획.운영" },
      { value: "13억", label: "매출 기여" },
    ]);
    statCards.forEach((card) => {
      expect(card.firstElementChild?.tagName).toBe("DT");
      expect(card.lastElementChild?.tagName).toBe("DD");
      expect(card.querySelector("dt")).not.toHaveClass("order-2");
      expect(card.querySelector("dd")).not.toHaveClass("order-1");
    });
    expect(
      Array.from(hero?.querySelectorAll<HTMLElement>("[data-count-up-target]") ?? []).map(
        (value) => value.dataset.countUpTarget,
      ),
    ).toEqual(["5", "3", "13"]);
    expect(screen.getByRole("button", { name: "Kyoungmin Lee, 처음으로" })).toHaveTextContent(
      "Kyoungmin Lee",
    );
    expect(screen.queryByRole("heading", { name: "Project partner company" })).not.toBeInTheDocument();
    expect(
      Array.from(hero?.querySelectorAll<HTMLElement>("[data-hero-logo]") ?? []).map(
        (logo) => logo.dataset.heroLogo,
      ),
    ).toEqual(["nipa", "neo", "lg", "kisa", "busan", "syrup", "nhn", "fixness"]);
    expect(screen.queryByRole("heading", { name: "역량을 선택해 연결된 프로젝트 증거를 확인하세요." })).not.toBeInTheDocument();
    expect(container.querySelector(".portfolio-ambient")).toBeInTheDocument();
    expect(container.querySelector<HTMLImageElement>("#hero .portfolio-hero__media")?.src).toBe(
      "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/background.png",
    );
    expect(
      screen.getByRole("heading", {
        name: "넓게 이해하고, 뾰족하게 실행합니다.",
      }),
    ).toBeInTheDocument();
    const aboutPortrait = within(about as HTMLElement).getByRole("img", {
      name: "발표 중인 이경민",
    });
    expect(aboutPortrait).toHaveAttribute(
      "src",
      "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/me.png",
    );
    expect(aboutPortrait).toHaveAttribute("width", "548");
    expect(aboutPortrait).toHaveAttribute("height", "548");
    expect(aboutPortrait).toHaveAttribute("loading", "lazy");
    expect(aboutPortrait).toHaveAttribute("decoding", "async");
    expect(aboutPortrait).toHaveClass("object-cover");
    expect(aboutPortrait).not.toHaveClass("grayscale", "contrast-[1.06]", "brightness-[0.96]");
    expect(aboutPortrait.closest("[data-about-portrait]")).toBeInTheDocument();
    expect(container.textContent).toContain(
      "저는 B2B·B2G·B2C 고객과 금융·공공·IT·커머스 등 다양한 도메인을 경험하며, 산업마다 다른 문제의 맥락과 의사결정 구조를 이해해왔습니다.",
    );
    expect(container.textContent).toContain(
      "AI와 데이터 등 기술을 활용해 고객의 시간과 비용을 줄이고, 실제 사업 성과로 연결하는 것입니다.",
    );
    expect(container.textContent).toContain(
      "저는 문제를 넓게 이해하는 제너럴리스트이자, AI를 업무와 제품에 적용해 성과를 만드는 AI 스페셜리스트입니다.",
    );
    expect(screen.getByText("현장 피드백과 인터뷰를 통해 문제를 탐색하고, 우리 조직이 해결할 수 있는 문제에 집중합니다.")).toBeInTheDocument();
    expect(screen.getByText("비즈니스 임팩트와 지속 가능성을 고려해 수행할 태스크를 구분합니다.")).toBeInTheDocument();
    expect(screen.getByText("목적과 지표를 설정한 뒤 결과를 빠르게 검증하고 다음 액션을 고민합니다.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "문제를 성과로 바꾼 프로젝트를 소개합니다." })).toBeInTheDocument();
    expect(screen.getByText("기술을 활용해 고객의 시간과 비용을 줄인 과정을 문제·판단·실행·성과 순서로 정리했습니다.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "채용·협업" })).toBeInTheDocument();
    expect(screen.getByText("AI 제품기획·프로젝트 수행에 강점이 있습니다. 고객 문제를 뾰족하게 정의하고, AI 기술을 활용해 실제 성과로 연결하는 일에 기여할 수 있습니다.")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "베타서비스 보기, 새 창에서 열기" })).toHaveAttribute(
      "href",
      "https://archi.best",
    );
    expect(container.querySelectorAll("[data-project-rank]")).toHaveLength(5);
    expect(container.querySelectorAll('[data-evidence-media-state="empty"]')).toHaveLength(0);
    expect(container.querySelectorAll('[data-evidence-media-state="ready"]')).toHaveLength(5);
    expect(screen.getAllByText("개념 목업")).toHaveLength(4);
    const flagship = container.querySelector<HTMLElement>('[data-project-rank="1"][id="arkylab-ai-coach"]');
    expect(flagship).toBeInTheDocument();
    expect(within(flagship as HTMLElement).getByRole("img", {
      name: "아키 로그인, 수업 캘린더와 AI 수업 기록 상세 화면",
    })).toHaveAttribute(
      "src",
      "https://ilxovhnlfvbvtmgqyddb.supabase.co/storage/v1/object/public/videi/arky/arky1.png",
    );
    expect(within(flagship as HTMLElement).getAllByRole("button", { name: /번째 이미지 보기/ })).toHaveLength(3);
    expect(within(flagship as HTMLElement).queryByText("랜딩 페이지")).not.toBeInTheDocument();
    expect(within(flagship as HTMLElement).queryByText("기록 화면")).not.toBeInTheDocument();
    expect(within(flagship as HTMLElement).queryByText("아키텍처")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "다양한 환경에서 제품과 사업의 문제를 해결해왔습니다." })).toBeInTheDocument();
    expect(container.textContent).toContain(
      "커머스, 데이터, 클라우드·공공 SaaS, 헬스케어 제품 개발까지 다양한 도메인에서 제품기획·사업개발·프로젝트 운영을 수행하며 고객의 시간과 비용을 줄이는 일에 집중해왔습니다.",
    );
    expect(screen.getByRole("heading", { name: "재직 기간이 짧아 보일 수 있지만, 제 커리어의 방향은 일관됐습니다." })).toBeInTheDocument();
    expect(screen.getByText("짧은 경험들을 하나의 방향으로 연결해왔습니다.")).toBeInTheDocument();
    expect(container.textContent).toContain(
      "이제는 고객 문제를 깊게 이해하고 빠르게 검증하며, AI 기반의 차별화된 해결책을 함께 만들어갈 수 있는 조직에서 장기적으로 기여하고 싶습니다.",
    );
    expect(
      Array.from(container.querySelectorAll<HTMLElement>("[data-experience-duration]")).map(
        (badge) => badge.dataset.experienceDuration,
      ),
    ).toEqual(["3개월", "1년 6개월", "7개월", "1년 7개월", "2년", "7개월"]);
    expect(container.querySelector("#experience")?.textContent).not.toContain("재직 중");
    [
      "프로덕트 매니저, 제품팀",
      "운영 매니저, 서비스 운영팀",
      "퍼포먼스 마케터, 선물하기팀",
    ].forEach((role) => expect(screen.getByText(role)).toBeInTheDocument());
    const experienceArticles = Array.from(container.querySelectorAll("#experience article"));
    expect(experienceArticles[0]?.querySelector("p")?.textContent).toBe("대표");
    expect(experienceArticles[1]?.querySelector("p")?.textContent).toBe("프로.사업개발");
    expect(container.querySelector("#experience")?.textContent).not.toContain("대표 · 제품");
    expect(container.querySelector("#experience")?.textContent).not.toContain("사업개발 · 사업개발");
    expect(container.querySelector("#experience")?.textContent).not.toContain("Adler");
    expect(container.querySelector("#experience")?.textContent).not.toContain("3D 소셜 MVP");
    expect(container.querySelector("#experience ol")?.querySelectorAll(":scope > li")).toHaveLength(6);
    expect(
      Array.from(container.querySelectorAll<HTMLElement>("[data-section-reveal]")).map(
        (element) => element.dataset.sectionReveal,
      ),
    ).toEqual(expect.arrayContaining([
      "about",
      "projects",
      "project-card",
      "experience",
      "experience-item",
      "career-direction",
      "contact",
      "contact-form",
    ]));
    expect(container.querySelector("#contact > div.relative.z-10")).toHaveClass("max-w-7xl");
    expect(container.querySelector("#contact form")).toHaveClass("w-full");
    expect(container.querySelector("#contact form")).not.toHaveClass("max-w-3xl");
    expect(container.textContent).not.toContain("Arkylab");
    expect(container.textContent).not.toContain("Archi");
    expect(container.textContent).not.toContain("2026 이경민");
    const chatButtons = screen.getAllByRole("button", { name: "이경민 AI" });
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

  it("회사별 맞춤 Hero에는 맞춤 역할 배지만 표시하고 기본 협업사 로고를 섞지 않는다", async () => {
    const { default: Index } = await import("@/pages/Index");
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Index
          heroContent={{
            roleLabel: "맞춤형 Product Manager",
            careerLabel: "검증 경력",
            headline: "검증된 문제를 해결합니다.",
            subcopy: ["회사별 근거를 확인합니다."],
            keywords: ["문제 정의", "제품 실행", "성과 검증"],
          }}
        />
      </MemoryRouter>,
    );

    const hero = container.querySelector<HTMLElement>("#hero");
    const summary = within(hero as HTMLElement).getByRole("list", { name: "포트폴리오 요약" });
    expect(Array.from(summary.querySelectorAll("li")).map((item) => item.textContent)).toEqual([
      "Portfolio",
      "맞춤형 Product Manager",
      "검증 경력",
    ]);
    expect(
      Array.from(hero?.querySelectorAll('[aria-label="핵심 역량"] span') ?? []).map(
        (keyword) => keyword.textContent,
      ),
    ).toEqual(["문제 정의", "제품 실행", "성과 검증"]);
    expect(container.querySelector('#about [aria-label="핵심 역량"]')).not.toBeInTheDocument();
    expect(hero?.querySelectorAll("[data-hero-logo]")).toHaveLength(0);
  });
});
