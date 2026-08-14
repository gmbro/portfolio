import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock("@emailjs/browser", () => ({
  default: {
    send: (...args: unknown[]) => sendMock(...args),
  },
}));

vi.mock("@typebot.io/react", () => ({
  hidePreviewMessage: vi.fn(),
}));

const renderContact = async () => {
  const { default: Contact } = await import("@/components/Contact");
  render(<Contact />);
};

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText("이름"), { target: { value: "채용 담당자" } });
  fireEvent.change(screen.getByLabelText("회신 이메일"), {
    target: { value: "recruiter@example.com" },
  });
  fireEvent.change(screen.getByLabelText("문의 내용"), {
    target: { value: "AI 프로덕트 매니저 채용에 대해 이야기하고 싶습니다." },
  });
  fireEvent.click(
    screen.getByRole("checkbox", {
      name: /답변을 위해 이름, 이메일, 문의 내용이 EmailJS와 Gmail을 통해 전송되는 데 동의합니다/,
    }),
  );
};

describe("Contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ status: 200, text: "OK" });
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "test-service");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "test-template");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "test-public-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("클라이언트가 수신자를 지정하지 않고 한국어 문의 폼을 EmailJS로 전송한다", async () => {
    await renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "문의하기" }));

    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));
    expect(sendMock).toHaveBeenCalledWith(
      "test-service",
      "test-template",
      expect.objectContaining({
        name: "채용 담당자",
        email: "recruiter@example.com",
        from_name: "채용 담당자",
        reply_to: "recruiter@example.com",
        message: "AI 프로덕트 매니저 채용에 대해 이야기하고 싶습니다.",
      }),
      expect.objectContaining({
        publicKey: "test-public-key",
        limitRate: { id: "portfolio-contact", throttle: 10_000 },
      }),
    );

    const templateParams = sendMock.mock.calls[0][2] as Record<string, unknown>;
    const options = sendMock.mock.calls[0][3] as Record<string, unknown>;
    expect(templateParams).not.toHaveProperty("to_email");
    expect(options).not.toHaveProperty("blockHeadless");
    expect(await screen.findByRole("status")).toHaveTextContent(
      "문의가 전송되었습니다. gmbro7942@gmail.com을 통해 답변드리겠습니다.",
    );
  });

  it("요청이 너무 빠르면 입력을 유지하고 10초 후 재시도 안내와 작성 내용이 담긴 이메일 링크를 제공한다", async () => {
    sendMock.mockRejectedValueOnce({ status: 429, text: "Too Many Requests" });
    await renderContact();
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: "문의하기" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("10초 후 다시 시도");
    expect(screen.getByLabelText("이름")).toHaveValue("채용 담당자");
    expect(screen.getByLabelText("회신 이메일")).toHaveValue("recruiter@example.com");
    expect(screen.getByLabelText("문의 내용")).toHaveValue(
      "AI 프로덕트 매니저 채용에 대해 이야기하고 싶습니다.",
    );

    const fallbackLink = screen.getByRole("link", {
      name: "작성한 내용으로 gmbro7942@gmail.com에 이메일 보내기",
    });
    const decodedHref = decodeURIComponent(fallbackLink.getAttribute("href") ?? "");
    expect(decodedHref).toContain("subject=[포트폴리오 문의] 채용 담당자");
    expect(decodedHref).toContain("회신 이메일: recruiter@example.com");
    expect(decodedHref).toContain("AI 프로덕트 매니저 채용에 대해 이야기하고 싶습니다.");
  });

  it("현재 브라우저에서 차단된 경우에도 입력을 보존하고 이메일 대체 경로를 제공한다", async () => {
    sendMock.mockRejectedValueOnce({ status: 451, text: "Unavailable For Headless Browser" });
    await renderContact();
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: "문의하기" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "현재 브라우저에서 자동 전송을 완료하지 못했습니다.",
    );
    expect(
      screen.getByRole("link", {
        name: "작성한 내용으로 gmbro7942@gmail.com에 이메일 보내기",
      }),
    ).toHaveAttribute("href", expect.stringContaining("subject="));
  });

  it("honeypot이 채워진 자동 제출은 EmailJS를 호출하지 않고 일반 성공 응답으로 처리한다", async () => {
    await renderContact();
    fillValidForm();
    fireEvent.change(document.getElementById("contact-website") as HTMLInputElement, {
      target: { value: "https://spam.example" },
    });

    fireEvent.click(screen.getByRole("button", { name: "문의하기" }));

    expect(await screen.findByRole("status")).toHaveTextContent("문의가 접수되었습니다.");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("문의 내용은 5자부터 전송하고 4자 이하는 안내한다", async () => {
    await renderContact();
    fillValidForm();

    const message = screen.getByLabelText("문의 내용");
    expect(message).toHaveAttribute("minLength", "5");

    fireEvent.change(message, { target: { value: "문의해요" } });
    fireEvent.submit(message.closest("form") as HTMLFormElement);
    expect(await screen.findByRole("alert")).toHaveTextContent("5자 이상의 문의 내용");
    expect(sendMock).not.toHaveBeenCalled();

    fireEvent.change(message, { target: { value: "문의드려요" } });
    fireEvent.submit(message.closest("form") as HTMLFormElement);
    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));
    expect(sendMock.mock.calls[0][2]).toEqual(expect.objectContaining({ message: "문의드려요" }));
  });
});
