const Marquee = () => {
  const text = "AI SERVICE PLANNING ✦ STT·TTS ✦ RETRIEVAL·RAG ✦ DATA OPERATIONS ✦ CODEX·SUPABASE ✦ B2B·B2G ✦ SAAS·CSAP ✦ PROJECT MANAGEMENT ✦ ";
  const repeated = text.repeat(6);

  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-[hsl(0_0%_5%)] py-6" aria-label="검증된 핵심 역량">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-sm md:text-base font-display font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
          {repeated}
        </span>
        <span className="text-sm md:text-base font-display font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
          {repeated}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
