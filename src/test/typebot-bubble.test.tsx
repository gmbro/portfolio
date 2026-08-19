import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  bubbleProps,
  trackPortfolioEvent,
  bubbleShouldThrow,
  setInputValue,
  submitInput,
  inputBridgeCalls,
} = vi.hoisted(() => ({
  bubbleProps: vi.fn(),
  trackPortfolioEvent: vi.fn(),
  bubbleShouldThrow: { value: false },
  setInputValue: vi.fn((value: string, options?: { id?: string }) => {
    inputBridgeCalls.push(["set", value, options?.id]);
  }),
  submitInput: vi.fn((options?: { id?: string }) => {
    inputBridgeCalls.push(["submit", options?.id]);
  }),
  inputBridgeCalls: [] as unknown[][],
}));

vi.mock("@/lib/analytics", () => ({ trackPortfolioEvent }));

vi.mock("@typebot.io/react", () => ({
  Bubble: (props: unknown) => {
    if (bubbleShouldThrow.value) throw new Error("Typebot load failure");
    bubbleProps(props);
    return <div data-testid="typebot-bubble" />;
  },
  setInputValue,
  submitInput,
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

const renderTypebot = async (observeAnalyticsConsent = false) => {
  const { default: TypebotBubble } = await import("@/components/TypebotBubble");
  return render(
    <>
      <a href="https://archi.best" data-chat-exclusion="true">Archi 베타 보기</a>
      <section id="contact">문의</section>
      <TypebotBubble observeAnalyticsConsent={observeAnalyticsConsent} />
    </>,
  );
};

const attachTypebotHost = () => {
  const host = document.createElement("typebot-bubble");
  host.id = "portfolio-typebot";
  const root = host.attachShadow({ mode: "open" });

  const button = document.createElement("button");
  button.setAttribute("part", "button");
  button.setAttribute("aria-pressed", "true");
  root.appendChild(button);

  const form = document.createElement("form");
  form.className = "typebot-input-form";
  const input = document.createElement("input");
  input.placeholder = "질문을 입력해주세요!";
  const send = document.createElement("button");
  send.className = "typebot-button";
  send.setAttribute("aria-label", "Send");
  form.append(input, send);
  root.appendChild(form);
  document.body.appendChild(host);

  return { host, root, button, input, send };
};

const chooseStarter = async (name = /AI 제품 0→1 경험/) => {
  fireEvent.click(screen.getByRole("button", { name }));
  await screen.findByTestId("typebot-bubble");
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

describe("Typebot launcher와 질문 가이드", () => {
  beforeEach(() => {
    bubbleProps.mockClear();
    trackPortfolioEvent.mockClear();
    setInputValue.mockClear();
    submitInput.mockClear();
    inputBridgeCalls.length = 0;
    bubbleShouldThrow.value = false;
    observers.length = 0;
    window.history.replaceState({}, "", "/");
    window.sessionStorage.clear();
    vi.stubGlobal("IntersectionObserver", ControlledIntersectionObserver);
  });

  afterEach(() => {
    vi.useRealTimers();
    document.querySelector('typebot-bubble#portfolio-typebot')?.remove();
    document.querySelector('[data-analytics-consent-banner="true"]')?.remove();
    vi.unstubAllGlobals();
    window.history.replaceState({}, "", "/");
  });

  it("외부 챗봇을 열기 전에 로컬 가이드와 검증 근거 질문을 즉시 표시한다", async () => {
    await renderTypebot();

    expect(screen.getByRole("button", { name: "물어보기 열기" })).toBeInTheDocument();
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "물어보기 열기" }));

    expect(screen.getByRole("dialog", { name: "경력·프로젝트 가이드" })).toBeInTheDocument();
    expect(screen.getByText(/확인된 경력·프로젝트를 기준으로 답합니다/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /AI 제품 0→1 경험/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /대규모 제품 운영 성과/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /데이터·운영 개선 사례/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /B2B·B2G 사업화 경험/ })).toBeInTheDocument();
    expect(screen.getByText(/이름·이메일·회사 내부 정보/)).toBeInTheDocument();
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();
    expect(trackPortfolioEvent).not.toHaveBeenCalled();
  });

  it("추천 질문을 같은 id의 setInputValue→submitInput 순서로 한 번만 전달한다", async () => {
    window.history.replaceState({}, "", "/?email=private@example.com&company=secret");
    await renderTypebot();

    fireEvent.click(screen.getByRole("button", { name: "물어보기 열기" }));
    expect(window.location.search).toBe("");
    await chooseStarter();

    const { root, input, send } = attachTypebotHost();

    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(1));
    expect(inputBridgeCalls).toEqual([
      ["set", "AI 제품 0→1 경험을 보여줘.", "portfolio-typebot"],
      ["submit", "portfolio-typebot"],
    ]);
    expect(trackPortfolioEvent).toHaveBeenCalledTimes(1);
    expect(trackPortfolioEvent).toHaveBeenCalledWith("chat_open");
    expect(input.placeholder).toBe("경력·프로젝트를 물어보세요");
    expect(input).toHaveAttribute("aria-label", "경력·프로젝트를 물어보세요");
    expect(send).toHaveAttribute("aria-label", "질문 보내기");
    expect(root.activeElement).toBe(root.querySelector('[part="button"]'));
    expect(screen.queryByRole("dialog", { name: "경력·프로젝트 가이드" })).not.toBeInTheDocument();
    expect(latestBubbleProps()).toMatchObject({
      id: "portfolio-typebot",
      isOpen: true,
    });
    expect(latestBubbleProps()).not.toHaveProperty("prefilledVariables");
  });

  it("직접 입력은 trim과 길이 검증 후에만 전송한다", async () => {
    await renderTypebot();
    fireEvent.click(screen.getByRole("button", { name: "물어보기 열기" }));

    const input = screen.getByRole("textbox", { name: "직접 질문하기" });
    fireEvent.change(input, { target: { value: " " } });
    fireEvent.click(screen.getByRole("button", { name: "질문 보내기" }));
    expect(screen.getByRole("alert")).toHaveTextContent("2자 이상");
    expect(input).toHaveFocus();
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "  대표 프로젝트를 알려줘  " } });
    fireEvent.click(screen.getByRole("button", { name: "질문 보내기" }));
    await screen.findByTestId("typebot-bubble");
    attachTypebotHost();

    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(1));
    expect(setInputValue).toHaveBeenCalledWith("대표 프로젝트를 알려줘", {
      id: "portfolio-typebot",
    });
  });

  it("Escape로 가이드를 닫고 launcher에 포커스를 돌려준다", async () => {
    await renderTypebot();
    const launcher = screen.getByRole("button", { name: "물어보기 열기" });
    fireEvent.click(launcher);
    await waitFor(() => expect(screen.getByRole("textbox", { name: "직접 질문하기" })).toHaveFocus());

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog", { name: "경력·프로젝트 가이드" })).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole("button", { name: "물어보기 열기" })).toHaveFocus());
  });

  it("문의 구간에서는 닫힌 launcher만 숨기고 열린 대화는 유지한다", async () => {
    await renderTypebot();
    fireEvent.click(screen.getByRole("button", { name: "물어보기 열기" }));
    await chooseStarter();
    attachTypebotHost();
    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(1));

    act(() => latestBubbleProps().onOpen());
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

  it("분석 기능을 켠 경우에만 동의 배너를 감시하고 launcher를 숨긴다", async () => {
    await renderTypebot(true);
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

  it("Typebot 렌더 실패를 격리하고 정적 프로젝트 경로를 제공한다", async () => {
    bubbleShouldThrow.value = true;
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    await renderTypebot();

    fireEvent.click(screen.getByRole("button", { name: "물어보기 열기" }));
    fireEvent.click(screen.getByRole("button", { name: /AI 제품 0→1 경험/ }));

    expect(await screen.findByRole("alert")).toHaveTextContent("챗봇을 연결하지 못했습니다");
    expect(screen.getByRole("link", { name: "프로젝트 직접 보기" })).toHaveAttribute(
      "href",
      "#case-studies",
    );
    expect(screen.getByRole("dialog", { name: "경력·프로젝트 가이드" })).toBeInTheDocument();
    consoleError.mockRestore();
  });

  it("Typebot 입력이 10초 안에 준비되지 않으면 무한 로딩 대신 복구 경로를 보여준다", async () => {
    vi.useFakeTimers();
    await renderTypebot();

    fireEvent.click(screen.getByRole("button", { name: "물어보기 열기" }));
    fireEvent.click(screen.getByRole("button", { name: /AI 제품 0→1 경험/ }));
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(screen.getByTestId("typebot-bubble")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(10_001));

    expect(screen.getByRole("alert")).toHaveTextContent("챗봇을 연결하지 못했습니다");
    expect(screen.getByRole("button", { name: "다시 시도" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "프로젝트 직접 보기" })).toBeInTheDocument();
  });
});
