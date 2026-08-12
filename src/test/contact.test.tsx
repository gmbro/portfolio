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
    const { default: Contact } = await import("@/components/Contact");
    render(<Contact />);

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
      expect.objectContaining({ publicKey: "test-public-key" }),
    );

    const templateParams = sendMock.mock.calls[0][2] as Record<string, unknown>;
    expect(templateParams).not.toHaveProperty("to_email");
    expect(await screen.findByRole("status")).toHaveTextContent(
      "문의가 전송되었습니다. gmbro7942@gmail.com을 통해 답변드리겠습니다.",
    );
  });
});
