import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { useState } from "react";

declare global {
  interface Window {
    emailjs: {
      send: (
        serviceId: string,
        templateId: string,
        params: Record<string, string>,
      ) => Promise<unknown>;
    };
  }
}

const contactCards = [
  { icon: Mail, label: "이메일", value: "jisoo.kim@email.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/jisoo-kim-pm" },
  { icon: MapPin, label: "위치", value: "서울, 대한민국" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
    };

    window.emailjs
      .send("service_bgj4nxo", "template_6gb1o2v", templateParams)
      .then(() => {
        alert("메일이 잘 전송되었어요!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        alert("전송에 실패했습니다. 다시 시도해주세요.");
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-16 relative overflow-hidden">
      {/* Orange gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[radial-gradient(ellipse,hsl(8_78%_58%/0.18)_0%,hsl(20_80%_55%/0.08)_40%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,hsl(15_80%_55%/0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 font-body"
        >
          CONTACT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold font-display text-foreground leading-tight mb-16"
        >
          함께 일할 <span className="text-gradient">기회를</span> 찾고 있습니다.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base font-body text-muted-foreground leading-relaxed mb-10">
              새로운 도전과 협업에 열려 있습니다. 프로덕트 매니저가 필요하시다면
              편하게 연락 주세요.
            </p>

            <div className="space-y-4">
              {contactCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-lg bg-white/5 backdrop-blur-md border border-white/40"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <card.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body uppercase tracking-widest">
                      {card.label}
                    </p>
                    <p className="text-sm font-body font-medium text-foreground mt-0.5">
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <div>
              <label className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-2 block">
                이름
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
                placeholder="홍길동"
              />
            </div>
            <div>
              <label className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-2 block">
                이메일
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-body text-muted-foreground uppercase tracking-widest mb-2 block">
                메시지
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full px-5 py-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all resize-none"
                placeholder="메시지를 입력해주세요..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 text-sm font-body font-semibold uppercase tracking-wider bg-gradient-accent text-primary-foreground rounded-full hover:shadow-[var(--shadow-glow)] transition-all duration-500 disabled:opacity-50"
            >
              {sending ? "전송 중..." : "메시지 보내기 →"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
