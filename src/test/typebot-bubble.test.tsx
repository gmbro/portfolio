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
      <button type="button" onClick={(event) => openPortfolioChat(event.currentTarget)}>물어보기</button>
      <button
        type="button"
        onClick={(event) => openPortfolioChat(event.currentTarget, {
          path: "nipa-vision",
          question: "NIPA Vision AI 프로젝트의 수행 근거를 알려줘.",
          questionId: "nipa-vision",
        })}
      >
        프로젝트 AI
      </button>
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
  fireEvent.click(screen.getByRole("button", { name: "물어보기" }));
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
    expect(root.textContent).toContain("추천 질문 8개");
    expect(root.textContent).toContain("채용 담당자");
    expect(root.textContent).toContain("실무 리더");
    expect(root.textContent).toContain("협업 파트너");
    expect(root.textContent).toContain("아키 0→1·베타");
    expect(root.textContent).toContain("Vision AI 프로젝트");
    expect(root.textContent).toContain("STT 운영 효율화");
    expect(root.textContent).toContain("AI 상담사 PoC");
    expect(root.textContent).toContain("350만 MAU 운영");
    expect(root.textContent).toContain("AI PM 커리어");
    expect(root.textContent).toContain("채용 판단 요약");
    expect(root.textContent).toContain("협업·책임 방식");
    expect(root.querySelectorAll(".portfolio-chat-window-guide__starters button")).toHaveLength(8);
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

  it("사용자 모드에 따라 추천 질문 8개의 우선순위를 바꾼다", async () => {
    await renderTypebot();
    const { root } = await openChatWithHost();
    const starterLabels = () => Array.from(
      root.querySelectorAll<HTMLButtonElement>(".portfolio-chat-window-guide__starters button"),
    ).map((button) => button.textContent?.replace("↗", "").trim());

    expect(shadowButton(root, /^채용 담당자$/)).toHaveAttribute("aria-pressed", "true");
    expect(starterLabels()[0]).toBe("채용 판단 요약");

    await act(async () => {
      fireEvent.click(shadowButton(root, /^실무 리더$/));
      await Promise.resolve();
    });
    expect(shadowButton(root, /^실무 리더$/)).toHaveAttribute("aria-pressed", "true");
    expect(starterLabels()[0]).toBe("아키 0→1·베타");
    expect(trackChatInteraction).toHaveBeenCalledWith("chat_mode_select", {
      path: "career-fit",
      audience: "leader",
    });

    await act(async () => {
      fireEvent.click(shadowButton(root, /^협업 파트너$/));
      await Promise.resolve();
    });
    expect(starterLabels()[0]).toBe("협업·책임 방식");
  });

  it("프로젝트 CTA는 관련 질문을 전송하지 않고 입력창에 준비한다", async () => {
    await renderTypebot();
    fireEvent.click(screen.getByRole("button", { name: "프로젝트 AI" }));
    await screen.findByTestId("typebot-bubble");
    const { root } = attachTypebotHost();
    await waitFor(() => expect(root.querySelector(".portfolio-chat-window-guide")).toBeTruthy());

    expect(root.querySelector<HTMLInputElement>("#portfolio-chat-window-question")?.value)
      .toBe("NIPA Vision AI 프로젝트의 수행 근거를 알려줘.");
    expect(shadowButton(root, /^실무 리더$/)).toHaveAttribute("aria-pressed", "true");
    expect(submitInput).not.toHaveBeenCalled();
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
    expect(root.textContent).toContain("붙여넣은 본문과 근거 매핑은 브라우저에서만 처리");
    expect(root.textContent).toContain("JD 원문·링크·파일명은 전송하지 않습니다");
    expect(shadowButton(root, /^본문 붙여넣기$/)).toBeInTheDocument();

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
    expect(trackChatInteraction).toHaveBeenCalledWith("jd_brief_generate", {
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

  it("추출문 품질이 부족하면 분석 버튼을 막고 점수나 Typebot 질문을 만들지 않는다", async () => {
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

    await waitFor(() => expect(root.textContent).toContain("분석 전 본문을 보완해 주세요"));
    expect(root.textContent).toContain("본문이 너무 짧습니다");
    expect(shadowButton(root, /^근거 적합도 분석하기/)).toBeDisabled();
    expect(root.textContent).not.toContain("/100");
    expect(submitInput).not.toHaveBeenCalled();
  });

  it("공개 JD 본문을 브라우저에서만 확인하고 미리보기·품질 게이트·근거 공백을 제공한다", async () => {
    const pastedJd = `
      주요업무
      - AI 기반 B2B SaaS 제품의 로드맵과 PRD를 작성합니다.
      - 프로젝트 일정과 이해관계자 커뮤니케이션을 담당합니다.
      자격요건
      - 제품 기획 및 데이터 기반 의사결정 경험이 필요합니다.
      - 항공 산업의 안전 인증 심사 경험이 필요합니다.
      우대사항
      - 사업 개발과 서비스 운영 효율화 경험을 우대합니다.
      - 해외 지사 설립 경험을 우대합니다.
    `;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await renderTypebot();
    const { root } = await openChatWithHost();

    fireEvent.click(shadowButton(root, /^채용 브리프 Beta$/));
    fireEvent.click(shadowButton(root, /^본문 붙여넣기$/));
    const textarea = root.querySelector<HTMLTextAreaElement>(".portfolio-jd-brief__field textarea");
    if (!textarea) throw new Error("JD paste textarea not found");

    fireEvent.change(textarea, { target: { value: pastedJd } });
    fireEvent.submit(root.querySelector<HTMLFormElement>(".portfolio-jd-brief__reader-form")!);

    await waitFor(() => expect(root.textContent).toContain("자 확인됨"));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(root.textContent).toContain("추출 미리보기");
    expect(root.textContent).toContain("주요업무 · 자격요건 · 우대사항");
    expect(root.textContent).toContain("항공 산업의 안전 인증 심사 경험");
    expect(root.textContent).toContain("붙여넣은 본문과 근거 매핑은 브라우저에서만 처리");

    fireEvent.click(shadowButton(root, /^근거 적합도 분석하기/));
    await waitFor(() => expect(root.textContent).toContain("공개 경력 근거 적합도"));
    expect(root.textContent).toContain("JD 요구사항 근거 공백: 항공 산업의 안전 인증 심사 경험");
    expect(root.textContent).toContain("JD 요구사항 근거 공백: 해외 지사 설립 경험");
    expect(trackChatInteraction).toHaveBeenCalledWith("jd_brief_start", {
      path: "jd-brief",
      source: "jd-brief",
      inputKind: "paste",
    });
    expect(trackChatInteraction).toHaveBeenCalledWith("jd_brief_ready", {
      path: "jd-brief",
      source: "jd-brief",
      inputKind: "paste",
    });
    expect(submitInput).not.toHaveBeenCalled();
  });

  it("Reader가 200 응답 안에 감춘 403 오류문을 추출 성공으로 표시하지 않는다", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue(JSON.stringify({
        code: 200,
        data: {
          title: "The request could not be satisfied",
          warning: "Target URL returned error 403: Forbidden",
          content: "403 ERROR Generated by cloudfront",
        },
      })),
    });
    vi.stubGlobal("fetch", fetchMock);
    await renderTypebot();
    const { root } = await openChatWithHost();

    fireEvent.click(shadowButton(root, /^채용 브리프 Beta$/));
    const urlInput = root.querySelector<HTMLInputElement>('input[type="url"]')!;
    fireEvent.change(urlInput, { target: { value: "https://www.wanted.co.kr/wd/378800" } });
    fireEvent.submit(root.querySelector<HTMLFormElement>(".portfolio-jd-brief__reader-form")!);

    await waitFor(() => expect(root.textContent).toContain("공고 사이트가 자동 읽기를 제한했습니다"));
    expect(root.textContent).toContain("본문을 붙여넣거나 PDF·이미지");
    expect(root.textContent).not.toContain("자 추출됨");
    expect(shadowButton(root, /^근거 적합도 분석하기/)).toBeDisabled();
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
      position: 3,
    });
    const conversation = root.querySelector(".portfolio-chat-window-guide--conversation");
    expect(conversation).not.toBeNull();
    expect(conversation).toHaveTextContent("이경민 AI");
    expect(conversation).toHaveTextContent("이어서 이런 질문을 해보세요");
    expect(conversation).toHaveTextContent("AI 기술 구조");
    expect(conversation).toHaveTextContent("베타 피드백 반영");
    expect(conversation).toHaveTextContent("상용화 검증");
    expect(conversation).toHaveTextContent("프로젝트 출처");
    expect(conversation).toHaveTextContent("운동 강사를 위한 AI 기록 솔루션");
    expect(conversation).toHaveTextContent("근거 보기");
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

  it("대화 화면 헤더의 뒤로가기로 추천 질문 첫 화면에 복귀한다", async () => {
    await renderTypebot();
    const { root, botWindow } = await openChatWithHost();

    expect(Array.from(root.querySelectorAll("button")).some((button) =>
      button.getAttribute("aria-label") === "첫 화면으로 돌아가기",
    )).toBe(false);

    fireEvent.click(shadowButton(root, /아키 0→1·베타/));
    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(1));

    const backButton = shadowButton(root, /^첫 화면으로 돌아가기$/);
    expect(backButton).toBeVisible();
    expect(root.querySelector(".portfolio-chat-window-guide__header--with-back")).not.toBeNull();

    fireEvent.click(backButton);

    await waitFor(() => {
      expect(root.querySelector(".portfolio-chat-window-guide--intro")).not.toBeNull();
      expect(botWindow).toHaveAttribute("data-portfolio-chat-mode", "intro");
    });
    expect(root.textContent).toContain("추천 질문 8개");
    expect(shadowButton(root, /^경력 질문$/)).toHaveAttribute("aria-selected", "true");
    expect(root.querySelector(".portfolio-chat-window-guide__header--with-back")).toBeNull();
  });

  it("답변 출처 카드에서 공개 프로젝트 근거로 이동한다", async () => {
    await renderTypebot();
    const target = document.createElement("article");
    target.id = "arkylab-ai-coach";
    document.body.appendChild(target);
    const { root } = await openChatWithHost();

    fireEvent.click(shadowButton(root, /아키 0→1·베타/));
    await waitFor(() => expect(submitInput).toHaveBeenCalledTimes(1));
    const evidenceLink = root.querySelector<HTMLAnchorElement>(
      '.portfolio-chat-window-guide__source-card a[href="#arkylab-ai-coach"]',
    );
    expect(evidenceLink).not.toBeNull();

    fireEvent.click(evidenceLink!);
    expect(trackChatInteraction).toHaveBeenCalledWith("evidence_card_open", {
      path: "arky-product",
      projectId: "arkylab-ai-coach",
    });
    await waitFor(() => expect(latestBubbleProps().isOpen).toBe(false));
    target.remove();
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
    const trigger = screen.getByRole("button", { name: "물어보기" });
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
    expect(screen.getByRole("button", { name: "물어보기" })).toBeInTheDocument();
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

    fireEvent.click(screen.getByRole("button", { name: "물어보기" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("챗봇을 연결하지 못했습니다");
    expect(screen.getByRole("link", { name: "프로젝트 직접 보기" })).toHaveAttribute("href", "#case-studies");
    expect(screen.queryByTestId("typebot-bubble")).not.toBeInTheDocument();
    consoleError.mockRestore();
  });

  it("Typebot host가 10초 안에 준비되지 않으면 무한 로딩 대신 복구 경로를 보여준다", async () => {
    vi.useFakeTimers();
    await renderTypebot();
    fireEvent.click(screen.getByRole("button", { name: "물어보기" }));
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
