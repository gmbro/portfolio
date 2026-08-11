const Marquee = () => {
  const text = "Product Strategy ✦ User Research ✦ Data Analysis ✦ A/B Testing ✦ Roadmap Planning ✦ Stakeholder Management ✦ OKR 설정 ✦ Growth Hacking ✦ ";
  const repeated = text.repeat(6);

  return (
    <div className="w-full overflow-hidden pt-24 pb-5 border-y border-border bg-[hsl(0_0%_5%)]">
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
