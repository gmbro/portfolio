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

  it("sends the English form fields through EmailJS without a client-controlled recipient", async () => {
    const { default: Contact } = await import("@/components/Contact");
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Hiring Manager" } });
    fireEvent.change(screen.getByLabelText("Reply email"), {
      target: { value: "recruiter@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "I would like to discuss an AI Product Manager opportunity." },
    });
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /I agree that my name, email, and message may be transmitted through EmailJS and Gmail/i,
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Send inquiry" }));

    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));
    expect(sendMock).toHaveBeenCalledWith(
      "test-service",
      "test-template",
      expect.objectContaining({
        name: "Hiring Manager",
        email: "recruiter@example.com",
        from_name: "Hiring Manager",
        reply_to: "recruiter@example.com",
        message: "I would like to discuss an AI Product Manager opportunity.",
      }),
      expect.objectContaining({ publicKey: "test-public-key" }),
    );

    const templateParams = sendMock.mock.calls[0][2] as Record<string, unknown>;
    expect(templateParams).not.toHaveProperty("to_email");
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Your inquiry has been sent. I will reply from gmbro7942@gmail.com.",
    );
  });
});
