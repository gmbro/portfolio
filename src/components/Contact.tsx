import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? "",
};

const isEmailJsConfigured = Object.values(emailJsConfig).every(Boolean);

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type SubmitStatus = {
  type: "idle" | "success" | "error" | "fallback";
  message: string;
  fallbackHref?: string;
};

const initialForm: FormState = { name: "", email: "", message: "", website: "" };

const buildMailtoUrl = (form: FormState) => {
  const subject = encodeURIComponent(`[포트폴리오 문의] ${form.name}`);
  const body = encodeURIComponent(`보낸 사람: ${form.name}\n회신 이메일: ${form.email}\n\n${form.message}`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
};

const getEmailJsErrorStatus = (error: unknown) => {
  if (!error || typeof error !== "object" || !("status" in error)) return null;

  const status = (error as { status?: unknown }).status;
  return typeof status === "number" ? status : null;
};

const getEmailJsErrorMessage = (status: number | null) => {
  if (status === 429) {
    return "요청이 너무 빠르게 반복되었습니다. 10초 후 다시 시도하거나 아래 이메일로 직접 보내 주세요.";
  }

  if (status === 451) {
    return "현재 브라우저에서 자동 전송을 완료하지 못했습니다. 아래 이메일 링크로 작성한 내용을 보내 주세요.";
  }

  if (status && [400, 401, 403, 404, 412, 422].includes(status)) {
    return "이메일 전송 설정을 확인하지 못했습니다. 작성한 내용은 유지됩니다. 아래 이메일로 직접 보내 주세요.";
  }

  return "자동 전송에 실패했습니다. 작성한 내용은 유지됩니다. 아래 이메일로 직접 보내 주세요.";
};

const Contact = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [consented, setConsented] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({ type: "idle", message: "" });

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status.type !== "idle") setStatus({ type: "idle", message: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const cleaned = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      website: form.website.trim(),
    };

    if (cleaned.website) {
      setStatus({ type: "success", message: "문의가 접수되었습니다." });
      return;
    }

    if (cleaned.name.length < 2 || cleaned.message.length < 10 || !cleaned.email) {
      setStatus({
        type: "error",
        message: "이름, 회신 이메일, 10자 이상의 문의 내용을 확인해 주세요.",
      });
      return;
    }

    if (!consented) {
      setStatus({ type: "error", message: "전송 전에 개인정보 전송 안내에 동의해 주세요." });
      return;
    }

    if (!isEmailJsConfigured) {
      setStatus({
        type: "fallback",
        message: "이메일 전송 설정을 확인 중입니다. 작성한 내용으로 이메일 앱을 엽니다.",
      });
      window.location.href = buildMailtoUrl(cleaned);
      return;
    }

    setSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          name: cleaned.name,
          email: cleaned.email,
          from_name: cleaned.name,
          reply_to: cleaned.email,
          message: cleaned.message,
          subject: `[포트폴리오 문의] ${cleaned.name}`,
        },
        {
          publicKey: emailJsConfig.publicKey,
          limitRate: { id: "portfolio-contact", throttle: 10_000 },
        },
      );

      setForm(initialForm);
      setConsented(false);
      setStatus({
        type: "success",
        message: `문의가 전송되었습니다. ${profile.email}을 통해 답변드리겠습니다.`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: getEmailJsErrorMessage(getEmailJsErrorStatus(error)),
        fallbackHref: buildMailtoUrl(cleaned),
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-[#070707] px-6 py-24 text-white md:px-12 md:py-32">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-[#ff6645]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="font-body text-xs font-semibold tracking-[0.3em] text-[#ff6645]">문의</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            문의하기
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-3xl border border-white/10 bg-[#111111] p-5 md:p-8"
        >
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="contact-website">웹사이트</label>
            <input
              id="contact-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block font-body text-xs uppercase tracking-widest text-white/45">
                이름
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={60}
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/25 px-5 py-4 font-body text-base text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#ff6645]/55"
                placeholder="이름을 입력해 주세요"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block font-body text-xs uppercase tracking-widest text-white/45">
                회신 이메일
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/25 px-5 py-4 font-body text-base text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#ff6645]/55"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="contact-message" className="mb-2 block font-body text-xs uppercase tracking-widest text-white/45">
              문의 내용
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={6}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="w-full resize-y rounded-xl border border-white/10 bg-black/25 px-5 py-4 font-body text-base text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#ff6645]/55"
              placeholder="채용, 프로젝트 협업 또는 사업 제휴에 대해 알려주세요."
            />
            <p className="mt-2 text-right font-body text-xs text-white/55">{form.message.length} / 2000</p>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
            <input
              type="checkbox"
              required
              checked={consented}
              onChange={(event) => setConsented(event.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff6645]"
            />
            <span className="font-body text-xs leading-5 text-white/45">
              답변을 위해 이름, 이메일, 문의 내용이 EmailJS와 Gmail을 통해 전송되는 데 동의합니다.
            </span>
          </label>

          {status.type !== "idle" && (
            <div
              role={status.type === "success" ? "status" : "alert"}
              aria-live="polite"
              className={`mt-5 rounded-xl border px-4 py-3 font-body text-sm leading-6 ${
                status.type === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-[#ff6645]/30 bg-[#ff6645]/10 text-white/80"
              }`}
            >
              {status.message}
              {status.fallbackHref && (
                <a
                  href={status.fallbackHref}
                  aria-label={`작성한 내용으로 ${profile.email}에 이메일 보내기`}
                  className="ml-1 font-semibold text-[#ff8a70] underline underline-offset-4"
                >
                  {profile.email}
                </a>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            aria-busy={sending}
            className="mt-6 flex min-h-14 w-full items-center justify-center rounded-full bg-[#ff6645] px-6 py-4 font-body text-sm font-bold text-white transition-colors hover:bg-[#ff7a5f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6645] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending && <LoaderCircle size={18} className="mr-2 animate-spin" aria-hidden="true" />}
            문의하기
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
