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

const latestBubbleProps = () => bubbleProps.mock.calls.at(-1)?.[0] as {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNewInputBlock: () => void;
  theme: { button: { isHidden: boolean } };
  inlineStyle: Record<string, string>;
  [key: string]: unknown;
};

const renderTypebot = async (observeAnalyticsConsent = false) => {
  const [{ default: TypebotBubble }, { openPortfolioChat }] = await Promise.all([
    import("@/components/TypebotBubble"),
    import("@/lib/chat"),
  ]);
  return render(
    <>
      <button type="button" onClick={(event) => openPortfolioChat(event.currentTarget)}>AI에게 묻기</button>
      <TypebotBubble observeAnalyticsConsent={observeAnalyticsConsent} />
    </>,
  );
};

const attachTypebotHost = () => {
  const host = document.createElement("typebot-bubble");
  host.id = "portfolio-typebot";
  const root = host.attachShadow({ mode: "open" });

  const botWindow = document.createElement("div");
  botWindow.setAttribute("part", "bot");
  const form = document.createElement("form");
  form.className = "typebot-input-form";
  const input = document.createElement("input");
  input.placeholder = "질문을 입력해주세요!";
  const send = document.createElement("button");
  send.className = "typebot-button";
  send.setAttribute("aria-label", "Send");
  form.append(input, send);
  botWindow.append(form);
  root.append(botWindow);
  document.body.appendChild(host);

  return { host, root, botWindow, form, input, send };
};

const openChatWithHost = async () => {
  fireEvent.click(screen.getByRole("button", { name: "AI에게 묻기" }));
  await screen.findByTestId("typebot-bubble");
  const attached = attachTypebotHost();
  await waitFor(() => {
    expect(attached.root.querySelector(".portfolio-chat-window-guide")).toBeTruthy();
  });
  return attached;
};

const shadowButton = (root: ShadowRoot, label: RegExp) => {
  const button = Array.from(root.querySelectorAll<HTMLButtonElement>("button")).find((item) =>
    label.test(item.getAttribute("aria-label") ?? item.textContent ?? ""),
  );
  if (!button) throw new Error(`shadow button not found: ${label}`);
  return button;
};

describe("상단 CTA와 채팅창 내부 가이드", () => {
  beforeEach(() => {
    bubbleProps.mockClear();
    trackPortfolioEvent.mockClear();
    setInputValue.mockClear();
    submitInput.mockClear();
    inputBridgeCalls.length = 0;
    bubbleShouldThrow.value = false;
    window.history.replaceState({}, "", "/");
    window.sessionStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.querySelector('typebot-bubble#portfolio-typebot')?.remove();
    document.querySelector('[data-analytics-consent-banner="true"]')?.remove();
    vi.unstubAllGlobals();
    window.history.replaceState({}, "", "/");
  });

  it("상단 CTA 클릭으로 native launcher 없이 Bubble과 guide를 shadow 채팅창 안에 렌더한다", async () => {
    await renderTypebot();
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "물어보기 열기" })).not.toBeInTheDocument();

    const { root, botWindow, form, input, send } = await openChatWithHost();

    expect(document.querySelector(".portfolio-chat-guide")).not.toBeInTheDocument();
    expect(root.querySelector('[part="button"]')).not.toBeInTheDocument();
    expect(root.textContent).toContain("AI PM 이경민");
    expect(root.textContent).toContain("확인된 경력·프로젝트를 기준으로 답합니다");
    expect(root.textContent).toContain("AI 제품 0→1 경험");
    expect(root.textContent).toContain("대규모 제품 운영 성과");
    expect(root.textContent).toContain("데이터·운영 개선 사례");
    expect(root.textContent).toContain("B2B·B2G 사업화 경험");
    expect(root.textContent).toContain("이름·이메일·회사 내부 정보");
    expect(
      botWindow.querySelector("#portfolio-chat-window-guide-mount"),
    ).not.toBeNull();
    expect(
      root.querySelector("#portfolio-chat-window-guide-mount")?.parentElement,
    ).toBe(botWindow);
    expect(form).toHaveAttribute("inert");
    expect(form).toHaveAttribute("aria-hidden", "true");
    expect(input.placeholder).toBe("경력·프로젝트를 물어보세요");
    expect(input).toHaveAttribute("tabindex", "-1");
    expect(send).toHaveAttribute("aria-label", "질문 보내기");
    expect(send).toHaveAttribute("tabindex", "-1");
    expect(latestBubbleProps()).toMatchObject({
      id: "portfolio-typebot",
      isOpen: true,
      theme: { button: { isHidden: true } },
    });
  });

  it("추천 질문 전송 뒤에도 같은 헤더·예상 질문 3개·넓은 입력폼을 유지한다", async () => {
    window.history.replaceState({}, "", "/?email=private@example.com&company=secret");
    await renderTypebot();
    const { root, botWindow, form } = await openChatWithHost();

    expect(window.location.search).toBe("");
    fireEvent.click(shadowButton(root, /AI 제품 0→1 경험/));

    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(1));
    expect(inputBridgeCalls).toEqual([
      ["set", "AI 제품 0→1 경험을 보여줘.", "portfolio-typebot"],
      ["submit", "portfolio-typebot"],
    ]);
    expect(trackPortfolioEvent).toHaveBeenCalledTimes(1);
    expect(trackPortfolioEvent).toHaveBeenCalledWith("chat_open");
    const conversation = root.querySelector(".portfolio-chat-window-guide--conversation");
    expect(conversation).not.toBeNull();
    expect(conversation).toHaveTextContent("AI PM 이경민");
    expect(conversation).toHaveTextContent("이어서 이런 질문을 해보세요");
    expect(conversation).toHaveTextContent("AI 제품 0→1 경험을 더 보여줘.");
    expect(conversation).toHaveTextContent("데이터·운영 개선 성과를 알려줘.");
    expect(conversation).toHaveTextContent("B2B·B2G 사업화 역할을 알려줘.");
    expect(
      conversation?.querySelectorAll(".portfolio-chat-window-guide__followups button"),
    ).toHaveLength(3);
    expect(
      conversation?.querySelector(".portfolio-chat-window-guide__form--conversation input"),
    ).toBeDisabled();
    expect(root.querySelector('style[data-portfolio-chat-window-guide="true"]')?.textContent)
      .toContain(".portfolio-chat-window-guide__form input");
    expect(root.querySelector('style[data-portfolio-chat-window-guide="true"]')?.textContent)
      .toContain("width: 100%");
    expect(root.querySelector('style[data-portfolio-chat-window-guide="true"]')?.textContent)
      .toContain("overflow-x: auto");
    expect(root.querySelector('style[data-portfolio-chat-window-guide="true"]')?.textContent)
      .toContain("scroll-snap-type: inline proximity");
    expect(botWindow).toHaveAttribute("data-portfolio-chat-mode", "conversation");
    await waitFor(() => expect(form).not.toHaveAttribute("inert"));
    expect(form).toHaveAttribute("aria-hidden", "true");
    expect(latestBubbleProps()).not.toHaveProperty("prefilledVariables");
    expect(latestBubbleProps().inlineStyle).toMatchObject({
      "--typebot-container-font-family": '"Pretendard Variable", Pretendard',
      "--typebot-guest-bubble-bg-rgb": "255, 102, 69",
      "--typebot-host-bubble-bg-rgb": "244, 244, 245",
    });

    act(() => latestBubbleProps().onNewInputBlock());
    const followupInput = conversation?.querySelector<HTMLInputElement>(
      ".portfolio-chat-window-guide__form--conversation input",
    );
    await waitFor(() => expect(followupInput).toBeEnabled());

    fireEvent.click(shadowButton(root, /데이터와 운영 구조를 개선한 성과/));
    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(2));
    expect(inputBridgeCalls.slice(-2)).toEqual([
      ["set", "데이터와 운영 구조를 개선한 성과를 알려줘.", "portfolio-typebot"],
      ["submit", "portfolio-typebot"],
    ]);
  });

  it("질문 전송 예약 직후 닫으면 외부 전송을 취소하고 입력 값을 비운다", async () => {
    await renderTypebot();
    const { root } = await openChatWithHost();

    fireEvent.click(shadowButton(root, /AI 제품 0→1 경험/));
    fireEvent.keyDown(window, { key: "Escape" });

    await act(async () => undefined);
    expect(submitInput).not.toHaveBeenCalled();
    expect(setInputValue).toHaveBeenLastCalledWith("", { id: "portfolio-typebot" });
    expect(latestBubbleProps().isOpen).toBe(false);
  });

  it("채팅창 내부 직접 입력은 trim과 길이 검증 후에만 전송한다", async () => {
    await renderTypebot();
    const { root } = await openChatWithHost();
    const input = root.querySelector<HTMLInputElement>("#portfolio-chat-window-question");
    if (!input) throw new Error("guide input not found");

    const form = root.querySelector<HTMLFormElement>(
      ".portfolio-chat-window-guide__form",
    );
    expect(form).not.toBeNull();

    fireEvent.change(input, { target: { value: " " } });
    fireEvent.submit(form!);
    expect(root.textContent).toContain("질문을 2자 이상 입력해 주세요.");
    expect(root.activeElement).toBe(input);
    expect(submitInput).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "  대표 프로젝트를 알려줘  " } });
    fireEvent.submit(form!);
    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(1));
    expect(setInputValue).toHaveBeenCalledWith("대표 프로젝트를 알려줘", { id: "portfolio-typebot" });
  });

  it("Escape로 실제 채팅창을 닫고 상단 CTA에 포커스를 돌려준다", async () => {
    await renderTypebot();
    const trigger = screen.getByRole("button", { name: "AI에게 묻기" });
    const { root } = await openChatWithHost();
    expect(root.querySelector(".portfolio-chat-window-guide")).toBeTruthy();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => expect(latestBubbleProps().isOpen).toBe(false));
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("분석 동의 배너가 나타나면 열린 대화를 닫되 상단 CTA는 유지한다", async () => {
    await renderTypebot(true);
    await openChatWithHost();
    expect(latestBubbleProps().isOpen).toBe(true);
    const banner = document.createElement("aside");
    banner.setAttribute("data-analytics-consent-banner", "true");
    await act(async () => {
      document.body.appendChild(banner);
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });
    await waitFor(() => expect(latestBubbleProps().isOpen).toBe(false));
    expect(screen.getByRole("button", { name: "AI에게 묻기" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "물어보기 열기" })).not.toBeInTheDocument();
    await act(async () => {
      banner.remove();
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });
  });

  it("Typebot 렌더 실패를 격리하고 정적 프로젝트 경로를 제공한다", async () => {
    bubbleShouldThrow.value = true;
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    await renderTypebot();

    fireEvent.click(screen.getByRole("button", { name: "AI에게 묻기" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("챗봇을 연결하지 못했습니다");
    expect(screen.getByRole("link", { name: "프로젝트 직접 보기" })).toHaveAttribute("href", "#case-studies");
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();
    consoleError.mockRestore();
  });

  it("Typebot host가 10초 안에 준비되지 않으면 무한 로딩 대신 복구 경로를 보여준다", async () => {
    vi.useFakeTimers();
    await renderTypebot();
    fireEvent.click(screen.getByRole("button", { name: "AI에게 묻기" }));
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(screen.getByTestId("typebot-bubble")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(10_001));

    expect(screen.getByRole("alert")).toHaveTextContent("챗봇을 연결하지 못했습니다");
    expect(screen.getByRole("button", { name: "다시 연결" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "프로젝트 직접 보기" })).toBeInTheDocument();
  });
});
