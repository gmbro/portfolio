import emailjs from "@emailjs/browser";
import { hidePreviewMessage } from "@typebot.io/react";
import { motion } from "framer-motion";
import { ExternalLink, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
};

const initialForm: FormState = { name: "", email: "", message: "", website: "" };

const contactCards = [
  {
    icon: Mail,
    label: "이메일",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/gmbro",
    href: profile.linkedin,
  },
  {
    icon: ExternalLink,
    label: "현재 프로젝트",
    value: "archi.best",
    href: profile.archiLab,
  },
];

const buildMailtoUrl = (form: FormState) => {
  const subject = encodeURIComponent(`[포트폴리오 문의] ${form.name}`);
  const body = encodeURIComponent(`보낸 사람: ${form.name}\n회신 이메일: ${form.email}\n\n${form.message}`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
};

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [consented, setConsented] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>({ type: "idle", message: "" });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) hidePreviewMessage();
      },
      { threshold: 0.08 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
      setStatus({ type: "error", message: "이름, 회신 이메일과 10자 이상의 문의 내용을 확인해 주세요." });
      return;
    }

    if (!consented) {
      setStatus({ type: "error", message: "문의 전송을 위한 개인정보 수집·이용에 동의해 주세요." });
      return;
    }

    if (!isEmailJsConfigured) {
      setStatus({
        type: "fallback",
        message: "현재 자동 전송 설정을 확인 중입니다. 작성한 내용으로 이메일 앱을 엽니다.",
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
          page_url: window.location.href,
          sent_at: new Date().toLocaleString("ko-KR"),
        },
        {
          publicKey: emailJsConfig.publicKey,
          blockHeadless: true,
          limitRate: { id: "portfolio-contact", throttle: 10_000 },
        },
      );

      setForm(initialForm);
      setConsented(false);
      setStatus({
        type: "success",
        message: `문의가 전송되었습니다. ${profile.email}에서 확인 후 회신드리겠습니다.`,
      });
    } catch {
      setStatus({
        type: "error",
        message: "자동 전송에 실패했습니다. 입력 내용은 유지했습니다. 아래 이메일로 직접 보내 주세요.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24 md:px-16 md:py-32"
    >
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,hsl(8_78%_58%/0.18)_0%,hsl(20_80%_55%/0.08)_40%,transparent_70%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[600px] rounded-full bg-[radial-gradient(ellipse,hsl(15_80%_55%/0.12)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          CONTACT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 break-keep font-display text-3xl font-bold leading-tight text-foreground md:mb-16 md:text-5xl"
        >
          함께 해결할 <span className="text-gradient">문제를 들려주세요.</span>
        </motion.h2>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-10 break-keep font-body text-base leading-8 text-muted-foreground">
              AI·SaaS 제품 기획, 데이터 구축, 프로젝트 관리, B2B·B2G 사업개발과 공공조달·보안 분야의
              채용, 프로젝트 협업과 사업 제휴에 열려 있습니다.
            </p>

            <div className="space-y-4">
              {contactCards.map((card, index) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="glass-card flex min-h-20 items-center gap-4 rounded-xl p-5 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <card.icon size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">{card.label}</p>
                    <p className="mt-1 break-all font-body text-sm font-medium text-foreground">{card.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5"
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

            <div>
              <label htmlFor="contact-name" className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
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
                className="w-full rounded-xl border border-border bg-background/45 px-5 py-4 font-body text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="이름을 입력해 주세요"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
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
                className="w-full rounded-xl border border-border bg-background/45 px-5 py-4 font-body text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">
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
                className="w-full resize-y rounded-xl border border-border bg-background/45 px-5 py-4 font-body text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="채용 포지션, 프로젝트 또는 제휴 내용을 알려 주세요."
              />
              <p className="mt-2 text-right font-body text-xs text-muted-foreground">{form.message.length} / 2000</p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background/30 p-4">
              <input
                type="checkbox"
                required
                checked={consented}
                onChange={(event) => setConsented(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
              />
              <span className="break-keep font-body text-xs leading-5 text-muted-foreground">
                회신을 위해 이름·이메일·문의 내용이 EmailJS와 Gmail로 전송되는 것에 동의합니다.
              </span>
            </label>

            {status.type !== "idle" && (
              <div
                role={status.type === "success" ? "status" : "alert"}
                aria-live="polite"
                className={`rounded-xl border px-4 py-3 font-body text-sm leading-6 ${
                  status.type === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-primary/30 bg-primary/10 text-foreground"
                }`}
              >
                {status.message}
                {status.type === "error" && (
                  <a href={`mailto:${profile.email}`} className="ml-1 font-semibold text-primary underline underline-offset-4">
                    {profile.email}
                  </a>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-accent px-6 py-4 font-body text-sm font-semibold text-primary-foreground transition-all duration-500 hover:shadow-[var(--shadow-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "전송 중..." : isEmailJsConfigured ? "EmailJS로 문의 보내기 →" : "이메일 앱으로 문의하기 →"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
