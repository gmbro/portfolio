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

  it("sends verified form fields through EmailJS without a client-controlled recipient", async () => {
    const { default: Contact } = await import("@/components/Contact");
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("이름"), { target: { value: "채용 담당자" } });
    fireEvent.change(screen.getByLabelText("회신 이메일"), { target: { value: "recruiter@example.com" } });
    fireEvent.change(screen.getByLabelText("문의 내용"), {
      target: { value: "AI Product Manager 포지션에 대해 이야기하고 싶습니다." },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "문의하기" }));

    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));
    const templateParams = sendMock.mock.calls[0][2] as Record<string, unknown>;
    expect(templateParams.reply_to).toBe("recruiter@example.com");
    expect(templateParams).not.toHaveProperty("to_email");
    expect(await screen.findByRole("status")).toHaveTextContent("문의가 전송되었습니다");
  });
});
