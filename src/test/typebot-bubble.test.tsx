import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  bubbleProps,
  trackChatInteraction,
  trackPortfolioEvent,
  bubbleShouldThrow,
  setInputValue,
  submitInput,
  inputBridgeCalls,
} = vi.hoisted(() => ({
  bubbleProps: vi.fn(),
  trackChatInteraction: vi.fn(),
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

vi.mock("@/lib/analytics", () => ({ trackChatInteraction, trackPortfolioEvent }));

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
      <button type="button" onClick={(event) => openPortfolioChat(event.currentTarget)}>이경민 AI</button>
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
  fireEvent.click(screen.getByRole("button", { name: "이경민 AI" }));
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
    trackChatInteraction.mockClear();
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
    expect(root.querySelector(".portfolio-chat-window-guide")).toHaveAttribute("aria-modal", "true");
    expect(root.querySelector('[part="button"]')).not.toBeInTheDocument();
    expect(root.textContent).toContain("이경민 AI");
    expect(root.querySelector(".portfolio-chat-window-guide__avatar")?.textContent).toBe("");
    expect(root.querySelector(".portfolio-chat-window-guide__message-avatar")?.textContent).toBe("");
    expect(Array.from(root.querySelectorAll<HTMLImageElement>(
      ".portfolio-chat-window-guide__avatar img, .portfolio-chat-window-guide__message-avatar img",
    )).map((image) => image.src)).toEqual([
      expect.stringContaining("bubble-icon"),
      expect.stringContaining("bubble-icon"),
    ]);
    expect(root.textContent).toContain("확인된 경력·프로젝트를 기준으로 답합니다");
    expect(shadowButton(root, /^경력 질문$/)).toHaveAttribute("aria-selected", "true");
    expect(shadowButton(root, /^채용 브리프 Beta$/)).toHaveAttribute("aria-selected", "false");
    expect(root.textContent).toContain("추천 질문 6개");
    expect(root.textContent).toContain("아키 0→1·베타");
    expect(root.textContent).toContain("Vision AI 프로젝트");
    expect(root.textContent).toContain("STT 운영 효율화");
    expect(root.textContent).toContain("AI 상담사 PoC");
    expect(root.textContent).toContain("350만 MAU 운영");
    expect(root.textContent).toContain("AI PM 커리어");
    expect(root.querySelectorAll(".portfolio-chat-window-guide__starters button")).toHaveLength(6);
    expect(root.querySelector(".portfolio-chat-window-guide__intro-composer input")).not.toBeNull();
    expect(root.querySelector('style[data-portfolio-chat-window-guide="true"]')?.textContent)
      .not.toMatch(/lite-badge[^}]*display:\s*none|Made with Typebot[^}]*display:\s*none/i);
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

  it("공개 LINK 또는 PDF·이미지로 JD를 읽고 브라우저에서 근거를 분석한 뒤 최소 정보만 Typebot에 전송한다", async () => {
    const extractedJd = [
      "주요 업무: AI 기반 B2B SaaS 제품 기획과 PRD 작성",
      "필수 역량: 프로젝트 관리, 이해관계자 커뮤니케이션, 데이터 기반 의사결정",
      "우대 사항: 사업 개발과 서비스 운영 효율화 경험",
      "CONFIDENTIAL-JD-8472 https://jobs.example.com/private-role?token=secret",
    ].join("\n");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue(extractedJd),
    });
    vi.stubGlobal("fetch", fetchMock);
    await renderTypebot();
    const { root } = await openChatWithHost();

    fireEvent.click(shadowButton(root, /^채용 브리프 Beta$/));

    const jdTab = shadowButton(root, /^채용 브리프 Beta$/);
    expect(jdTab).toHaveAttribute("role", "tab");
    expect(jdTab).toHaveAttribute("aria-selected", "true");
    expect(root.textContent).toContain("공개 채용 공고로 경력 근거를 비교");
    expect(root.textContent).toContain("개인정보·회사 내부 문서·비공개 JD");
    expect(root.textContent).toContain("Jina Reader");
    expect(root.textContent).toContain("근거 매핑은 브라우저에서 처리");
    expect(root.textContent).toContain("JD 원문·링크·파일명은 전송하지 않습니다");

    fireEvent.click(shadowButton(root, /^PDF·이미지$/));
    const fileInput = root.querySelector<HTMLInputElement>('input[type="file"]');
    expect(fileInput).not.toBeNull();
    expect(fileInput?.accept).toContain("application/pdf");
    expect(fileInput?.accept).toContain("image/webp");
    const oversizedFile = new File(["public jd"], "public-jd.pdf", { type: "application/pdf" });
    Object.defineProperty(oversizedFile, "size", { value: 5 * 1024 * 1024 + 1 });
    fireEvent.change(fileInput!, { target: { files: [oversizedFile] } });
    fireEvent.submit(root.querySelector<HTMLFormElement>(".portfolio-jd-brief__reader-form")!);
    await waitFor(() => expect(root.textContent).toContain("파일은 최대 5MB"));
    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.click(shadowButton(root, /^공개 LINK$/));
    const urlInput = root.querySelector<HTMLInputElement>('input[type="url"]');
    const readerForm = root.querySelector<HTMLFormElement>(".portfolio-jd-brief__reader-form");
    if (!urlInput || !readerForm) throw new Error("JD URL form not found");

    fireEvent.change(urlInput, { target: { value: "https://localhost/private-jd" } });
    fireEvent.submit(readerForm);
    await waitFor(() => expect(root.textContent).toContain("로컬 주소나 IP 주소는 사용할 수 없습니다"));
    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.change(urlInput, { target: { value: "https://jobs.example.com/ai-pm" } });
    fireEvent.submit(readerForm);

    await waitFor(() => expect(root.textContent).toContain("자 추출됨"));
    expect(fetchMock).toHaveBeenCalledWith(
      "https://r.jina.ai/https://jobs.example.com/ai-pm",
      expect.objectContaining({ method: "GET" }),
    );

    fireEvent.click(shadowButton(root, /^근거 적합도 분석하기/));
    expect(submitInput).not.toHaveBeenCalled();
    await waitFor(() => expect(root.textContent).toContain("공개 경력 근거 적합도"));
    expect(root.textContent).toContain("채용 확률이나 사람에 대한 평가가 아니라");
    expect(root.textContent).toContain("제품 기획");
    expect(root.textContent).toContain("중요도 상");
    expect(root.querySelector(".portfolio-jd-result__requirement li strong")?.textContent).toBeTruthy();
    expect(root.querySelectorAll(".portfolio-jd-result__requirement").length).toBeGreaterThan(0);
    expect(root.querySelectorAll(".portfolio-jd-result__requirement").length).toBeLessThanOrEqual(5);

    fireEvent.click(shadowButton(root, /^이 근거를 AI에게 더 묻기/));
    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(1));
    const sentQuestion = setInputValue.mock.calls.at(-1)?.[0] as string;
    expect(sentQuestion.length).toBeLessThanOrEqual(500);
    expect(sentQuestion).toContain("이경민의 공개 포트폴리오");
    expect(sentQuestion).toContain("제품 기획");
    expect(sentQuestion).not.toContain("CONFIDENTIAL-JD-8472");
    expect(sentQuestion).not.toContain("private-role");
    expect(sentQuestion).not.toContain("jobs.example.com");
    expect(trackChatInteraction).toHaveBeenCalledWith("jd_brief_start", {
      path: "jd-brief",
      source: "jd-brief",
      inputKind: "url",
    });
    expect(trackChatInteraction).toHaveBeenCalledWith("jd_brief_ready", {
      path: "jd-brief",
      source: "jd-brief",
      inputKind: "url",
    });
    expect(trackChatInteraction).toHaveBeenCalledWith("chat_start", {
      path: "jd-brief",
      source: "jd-brief",
      questionIndex: 1,
    });
    expect(trackChatInteraction).toHaveBeenCalledWith("chat_question_submit", {
      path: "jd-brief",
      source: "jd-brief",
      questionIndex: 1,
    });
    expect(JSON.stringify(trackChatInteraction.mock.calls)).not.toContain("jobs.example.com");
    expect(JSON.stringify(trackChatInteraction.mock.calls)).not.toContain("CONFIDENTIAL-JD-8472");

    const conversation = root.querySelector(".portfolio-chat-window-guide--conversation");
    expect(conversation).toHaveTextContent("강한 적합 근거");
    expect(conversation).toHaveTextContent("보완·검증 질문");
    expect(conversation).toHaveTextContent("면접 브리프");
    expect(
      conversation?.querySelectorAll(".portfolio-chat-window-guide__followups button"),
    ).toHaveLength(3);
  });

  it("JD 신호가 부족하면 점수를 만들거나 Typebot에 전송하지 않는다", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue("함께 성장할 성실한 동료를 찾습니다."),
    });
    vi.stubGlobal("fetch", fetchMock);
    await renderTypebot();
    const { root } = await openChatWithHost();

    fireEvent.click(shadowButton(root, /^채용 브리프 Beta$/));
    const urlInput = root.querySelector<HTMLInputElement>('input[type="url"]')!;
    fireEvent.change(urlInput, { target: { value: "https://jobs.example.com/general" } });
    fireEvent.submit(root.querySelector<HTMLFormElement>(".portfolio-jd-brief__reader-form")!);
    await waitFor(() => expect(root.textContent).toContain("자 추출됨"));
    fireEvent.click(shadowButton(root, /^근거 적합도 분석하기/));

    await waitFor(() => expect(root.textContent).toContain("요구역량 신호가 부족합니다"));
    expect(root.textContent).toContain("근거가 부족할 때는 점수를 만들지 않습니다");
    expect(root.textContent).not.toContain("/100");
    expect(submitInput).not.toHaveBeenCalled();
  });

  it("Tab과 Shift+Tab이 열린 대화상자 안에서 순환한다", async () => {
    await renderTypebot();
    const { root } = await openChatWithHost();
    const dialog = root.querySelector<HTMLElement>(".portfolio-chat-window-guide")!;
    const close = shadowButton(root, /^채팅 닫기$/);
    const submit = dialog.querySelector<HTMLButtonElement>(".portfolio-chat-window-guide__submit")!;

    submit.focus();
    expect(root.activeElement).toBe(submit);
    fireEvent.keyDown(window, { key: "Tab" });
    expect(root.activeElement).toBe(close);

    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(root.activeElement).toBe(submit);
  });

  it("추천 질문 전송 뒤에도 같은 헤더·예상 질문 3개·넓은 입력폼을 유지한다", async () => {
    window.history.replaceState({}, "", "/?email=private@example.com&company=secret");
    await renderTypebot();
    const { root, botWindow, form } = await openChatWithHost();

    expect(window.location.search).toBe("");
    fireEvent.click(shadowButton(root, /아키 0→1·베타/));

    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(1));
    expect(inputBridgeCalls).toEqual([
      ["set", "아키를 0→1로 기획·개발하고 베타 검증한 과정을 알려줘.", "portfolio-typebot"],
      ["submit", "portfolio-typebot"],
    ]);
    expect(trackPortfolioEvent).toHaveBeenCalledTimes(1);
    expect(trackPortfolioEvent).toHaveBeenCalledWith("chat_open");
    expect(trackChatInteraction).toHaveBeenCalledWith("chat_recommendation_click", {
      path: "arky-product",
      source: "starter",
      questionId: "arky-product",
      position: 1,
    });
    const conversation = root.querySelector(".portfolio-chat-window-guide--conversation");
    expect(conversation).not.toBeNull();
    expect(conversation).toHaveTextContent("이경민 AI");
    expect(conversation).toHaveTextContent("이어서 이런 질문을 해보세요");
    expect(conversation).toHaveTextContent("AI 기술 구조");
    expect(conversation).toHaveTextContent("베타 피드백 반영");
    expect(conversation).toHaveTextContent("상용화 검증");
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

    fireEvent.click(shadowButton(root, /Gemini와 MediaPipe/));
    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(2));
    expect(inputBridgeCalls.slice(-2)).toEqual([
      ["set", "아키에 Gemini와 MediaPipe를 어떤 구조로 적용했는지 알려줘.", "portfolio-typebot"],
      ["submit", "portfolio-typebot"],
    ]);
  });

  it("질문 전송 예약 직후 닫으면 외부 전송을 취소하고 입력 값을 비운다", async () => {
    await renderTypebot();
    const { root } = await openChatWithHost();

    fireEvent.click(shadowButton(root, /아키 0→1·베타/));
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
    const trigger = screen.getByRole("button", { name: "이경민 AI" });
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
    expect(screen.getByRole("button", { name: "이경민 AI" })).toBeInTheDocument();
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

    fireEvent.click(screen.getByRole("button", { name: "이경민 AI" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("챗봇을 연결하지 못했습니다");
    expect(screen.getByRole("link", { name: "프로젝트 직접 보기" })).toHaveAttribute("href", "#case-studies");
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();
    consoleError.mockRestore();
  });

  it("Typebot host가 10초 안에 준비되지 않으면 무한 로딩 대신 복구 경로를 보여준다", async () => {
    vi.useFakeTimers();
    await renderTypebot();
    fireEvent.click(screen.getByRole("button", { name: "이경민 AI" }));
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
