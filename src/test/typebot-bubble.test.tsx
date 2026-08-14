import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { bubbleProps, trackPortfolioEvent, bubbleShouldThrow } = vi.hoisted(() => ({
  bubbleProps: vi.fn(),
  trackPortfolioEvent: vi.fn(),
  bubbleShouldThrow: { value: false },
}));

vi.mock("@/lib/analytics", () => ({ trackPortfolioEvent }));

vi.mock("@typebot.io/react", () => ({
  Bubble: (props: unknown) => {
    if (bubbleShouldThrow.value) throw new Error("Typebot load failure");
    bubbleProps(props);
    return <div data-testid="typebot-bubble" />;
  },
}));

interface ObserverController {
  callback: IntersectionObserverCallback;
  targets: Element[];
}

const observers: ObserverController[] = [];

class ControlledIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0.02];
  private readonly controller: ObserverController;

  constructor(callback: IntersectionObserverCallback) {
    this.controller = { callback, targets: [] };
    observers.push(this.controller);
  }

  disconnect() {
    this.controller.targets.length = 0;
  }

  observe(target: Element) {
    this.controller.targets.push(target);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(target: Element) {
    this.controller.targets = this.controller.targets.filter((item) => item !== target);
  }
}

const latestBubbleProps = () => bubbleProps.mock.calls.at(-1)?.[0] as {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  theme: { button: { isHidden: boolean } };
  [key: string]: unknown;
};

const renderTypebot = async () => {
  const { default: TypebotBubble } = await import("@/components/TypebotBubble");
  return render(
    <>
      <a href="https://archi.best" data-chat-exclusion="true">Archi 베타 보기</a>
      <section id="contact">문의</section>
      <TypebotBubble />
    </>,
  );
};

const setTargetVisibility = (selector: string, isIntersecting: boolean) => {
  const observer = observers.find(({ targets }) => targets.some((target) => target.matches(selector)));
  const target = observer?.targets.find((item) => item.matches(selector));
  if (!observer || !target) throw new Error(`${selector} observer was not registered`);

  act(() => {
    observer.callback(
      [{ target, isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
};

describe("Typebot launcher", () => {
  beforeEach(() => {
    bubbleProps.mockClear();
    trackPortfolioEvent.mockClear();
    bubbleShouldThrow.value = false;
    observers.length = 0;
    window.history.replaceState({}, "", "/");
    window.sessionStorage.clear();
    vi.stubGlobal("IntersectionObserver", ControlledIntersectionObserver);
  });

  afterEach(() => {
    document.querySelector('typebot-bubble#portfolio-typebot')?.remove();
    document.querySelector('[data-analytics-consent-banner="true"]')?.remove();
    vi.unstubAllGlobals();
    window.history.replaceState({}, "", "/");
  });

  it("외부 코드를 불러오기 전에도 첫 화면에 로컬 launcher를 표시한다", async () => {
    await renderTypebot();

    expect(screen.getByRole("button", { name: "물어보기 열기" })).toBeInTheDocument();
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();
    expect(trackPortfolioEvent).not.toHaveBeenCalled();
  });

  it("사용자 클릭 뒤에만 query를 제거하고 Typebot과 chat_open을 한 번 실행한다", async () => {
    window.history.replaceState({}, "", "/?email=private@example.com&company=secret");
    window.sessionStorage.setItem("typebot-botOpened", "true");
    await renderTypebot();

    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();
    expect(trackPortfolioEvent).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "물어보기 열기" }));

    expect(window.location.search).toBe("");
    expect(await screen.findByTestId("typebot-bubble")).toBeInTheDocument();
    expect(trackPortfolioEvent).not.toHaveBeenCalled();

    const host = document.createElement("typebot-bubble");
    host.id = "portfolio-typebot";
    const root = host.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.setAttribute("part", "button");
    button.setAttribute("aria-pressed", "true");
    root.appendChild(button);
    document.body.appendChild(host);

    await waitFor(() => expect(trackPortfolioEvent).toHaveBeenCalledTimes(1));
    expect(trackPortfolioEvent).toHaveBeenCalledWith("chat_open");
    expect(root.activeElement).toBe(button);
    expect(latestBubbleProps()).toMatchObject({
      id: "portfolio-typebot",
      isOpen: true,
    });
    expect(latestBubbleProps()).not.toHaveProperty("prefilledVariables");
  });

  it("문의 구간에서는 닫힌 launcher만 숨기고 열린 대화는 유지한다", async () => {
    await renderTypebot();
    fireEvent.click(screen.getByRole("button", { name: "물어보기 열기" }));
    await screen.findByTestId("typebot-bubble");

    act(() => latestBubbleProps().onOpen());
    await waitFor(() => expect(screen.queryByRole("button", { name: "물어보기 열기" })).not.toBeInTheDocument());

    setTargetVisibility("#contact", true);
    await waitFor(() => expect(latestBubbleProps().theme.button.isHidden).toBe(false));

    act(() => latestBubbleProps().onClose());
    await waitFor(() => expect(latestBubbleProps().theme.button.isHidden).toBe(true));
  });

  it("외부 프로젝트 CTA가 보일 때 닫힌 launcher를 숨긴다", async () => {
    await renderTypebot();
    expect(screen.getByRole("button", { name: "물어보기 열기" })).toBeInTheDocument();

    setTargetVisibility("[data-chat-exclusion]", true);

    expect(screen.queryByRole("button", { name: "물어보기 열기" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Archi 베타 보기" })).toBeInTheDocument();
  });

  it("방문 분석 동의 배너가 보일 때 launcher를 숨기고 선택 후 복원한다", async () => {
    await renderTypebot();
    expect(screen.getByRole("button", { name: "물어보기 열기" })).toBeInTheDocument();

    const banner = document.createElement("aside");
    banner.setAttribute("data-analytics-consent-banner", "true");
    document.body.appendChild(banner);

    await waitFor(() =>
      expect(screen.queryByRole("button", { name: "물어보기 열기" })).not.toBeInTheDocument(),
    );

    banner.remove();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "물어보기 열기" })).toBeInTheDocument(),
    );
  });

  it("IntersectionObserver를 지원하지 않는 브라우저에서도 launcher를 표시한다", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    await renderTypebot();

    expect(screen.getByRole("button", { name: "물어보기 열기" })).toBeInTheDocument();
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();
  });

  it("Typebot 로드 실패가 포트폴리오 렌더링을 중단시키지 않는다", async () => {
    bubbleShouldThrow.value = true;
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    await renderTypebot();

    fireEvent.click(screen.getByRole("button", { name: "물어보기 열기" }));

    expect(await screen.findByRole("status")).toHaveTextContent("챗봇을 불러오지 못했습니다");
    expect(screen.getByRole("button", { name: "물어보기 열기" })).toBeInTheDocument();
    consoleError.mockRestore();
  });
});
