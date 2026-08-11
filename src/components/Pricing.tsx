import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For startups testing digital marketing",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    features: [
      "SEO Audit & Strategy",
      "5 Blog Posts / Month",
      "Google Ads Management",
      "Monthly Reporting",
      "Dedicated Account Manager",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For scaling B2B companies",
    monthlyPrice: 5999,
    yearlyPrice: 4799,
    features: [
      "Everything in Starter",
      "Full SEO Implementation",
      "15 Blog Posts / Month",
      "Multi-Channel Paid Media",
      "CRO & A/B Testing",
      "Bi-Weekly Strategy Calls",
      "Custom Analytics Dashboard",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For market-leading organizations",
    monthlyPrice: 12999,
    yearlyPrice: 10399,
    features: [
      "Everything in Growth",
      "Full Content Team",
      "Brand Strategy & Design",
      "Executive Reporting",
      "Dedicated Growth Team",
      "24/7 Priority Support",
      "Quarterly Business Reviews",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-28 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-primary font-body mb-3"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold font-display text-foreground"
          >
            Transparent <span className="text-gradient">pricing</span>
          </motion.h2>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 inline-flex items-center gap-3 p-1 rounded-full glass-card"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-xs font-body font-semibold tracking-wide transition-all duration-300 ${
                !isYearly
                  ? "bg-gradient-accent text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-xs font-body font-semibold tracking-wide transition-all duration-300 ${
                isYearly
                  ? "bg-gradient-accent text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="ml-1.5 text-[10px] opacity-70">Save 20%</span>
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 transition-all duration-500 flex flex-col ${
                plan.highlighted
                  ? "glass-card border-primary/40 bg-[hsl(8_78%_58%/0.05)] scale-[1.02]"
                  : "glass-card glass-card-hover"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-accent text-[10px] font-body font-bold uppercase tracking-wider text-primary-foreground">
                  Most Popular
                </div>
              )}

              {/* Glow for highlighted */}
              {plan.highlighted && (
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,hsl(8_78%_58%/0.08)_0%,transparent_60%)] pointer-events-none" />
              )}

              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-xl font-display font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground font-body mt-1">{plan.description}</p>

                <div className="mt-6 mb-8">
                  <span className="text-4xl md:text-5xl font-display font-extrabold text-foreground">
                    ${isYearly ? plan.yearlyPrice.toLocaleString() : plan.monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground font-body ml-1">/mo</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-body text-muted-foreground">
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3.5 rounded-full text-sm font-body font-semibold tracking-wide transition-all duration-500 ${
                    plan.highlighted
                      ? "bg-gradient-accent text-primary-foreground hover:shadow-[var(--shadow-glow)]"
                      : "border border-[hsl(0_0%_100%/0.1)] text-foreground hover:border-[hsl(0_0%_100%/0.25)] hover:bg-[hsl(0_0%_100%/0.03)]"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
