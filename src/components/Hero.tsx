import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { defaultHeroContent, type HeroContent } from "@/types/portfolio";

interface HeroProps {
  content?: HeroContent;
}

const highlightHeadline = (line: string, highlight?: string) => {
  if (!highlight || !line.includes(highlight)) return line;

  const [before, ...afterParts] = line.split(highlight);
  return (
    <>
      {before}
      <span className="text-gradient">{highlight}</span>
      {afterParts.join(highlight)}
    </>
  );
};

const Hero = ({ content = defaultHeroContent }: HeroProps) => {
  const headlineLines = content.headline.split("\n").filter(Boolean);
  const stats = content.stats ?? [];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-16 pt-24 pb-20">
      {/* Shader Gradient Background */}
      <div className="absolute inset-0 z-0">
        <ShaderGradientCanvas
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <ShaderGradient
            animate="on"
            brightness={0.8}
            cAzimuthAngle={270}
            cDistance={0.5}
            cPolarAngle={180}
            cameraZoom={15.1}
            color1="#ff9d00"
            color2="#ff810a"
            color3="#f78316"
            envPreset="city"
            grain="on"
            lightType="env"
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            reflection={0.4}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            type="sphere"
            uAmplitude={3.2}
            uDensity={0.8}
            uFrequency={5.5}
            uSpeed={0.3}
            uStrength={0.3}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8"
      >
        <span className="inline-flex items-center gap-0 font-body font-bold text-sm md:text-base text-white">
          <span className="relative inline-block px-3 py-1.5">
            <span className="relative z-10">{content.roleLabel}</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-0 bg-primary origin-left -skew-x-3"
            />
          </span>
          {content.careerLabel && (
            <span className="relative inline-block px-3 py-1.5 -ml-1">
              <span className="relative z-10">{content.careerLabel}</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="absolute inset-0 bg-primary origin-left skew-x-2"
              />
            </span>
          )}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-4xl relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold font-display tracking-tight text-white break-keep" style={{ lineHeight: 1.35 }}>
          {headlineLines.map((line, index) => (
            <span key={`${line}-${index}`} className="block">
              {highlightHeadline(line, content.highlight)}
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Subheadline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 max-w-2xl text-white/85 font-body text-base md:text-lg leading-relaxed relative z-10"
      >
        {content.subcopy.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.7 }}
        className="relative z-10 mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-2"
        aria-label="핵심 역량"
      >
        {content.keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full border border-white/30 bg-black/30 px-4 py-2 text-xs font-semibold text-white/95 backdrop-blur-sm md:text-sm"
          >
            {keyword}
          </span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-10 relative z-10"
      >
        <button
          onClick={() => document.getElementById(content.ctaTarget)?.scrollIntoView({ behavior: "smooth" })}
          className="group px-8 py-4 text-sm font-body font-semibold uppercase tracking-wider bg-gradient-accent text-white shadow-lg rounded-full hover:shadow-[var(--shadow-glow)] transition-all duration-500 flex items-center gap-2"
        >
          {content.ctaLabel}
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </motion.div>

      {/* Stats */}
      {stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-2 flex max-w-full flex-wrap items-stretch justify-center gap-3 md:mt-16 md:gap-5 relative z-10"
        >
          {stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="min-w-[5.5rem] rounded-2xl border border-white/25 bg-black/45 px-4 py-2.5 text-center shadow-lg backdrop-blur-sm md:min-w-[8rem] md:px-6 md:py-4"
            >
              <div className="text-3xl md:text-4xl font-display font-extrabold text-white">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-body font-medium text-white/90 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-body text-white/40 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={16} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
