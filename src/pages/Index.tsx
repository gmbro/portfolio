import { useLayoutEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductProof from "@/components/ProductProof";
import ImageCards from "@/components/ImageCards";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TypebotBubble from "@/components/TypebotBubble";
import AnalyticsConsentBanner from "@/components/AnalyticsConsent";
import { setAnalyticsRouteEnabled } from "@/lib/analytics";
import type { HeroContent } from "@/types/portfolio";

interface IndexProps {
  heroContent?: HeroContent;
  analyticsEnabled?: boolean;
}

const Index = ({ heroContent, analyticsEnabled = true }: IndexProps) => {
  useLayoutEffect(() => {
    setAnalyticsRouteEnabled(analyticsEnabled);
    return () => setAnalyticsRouteEnabled(false);
  }, [analyticsEnabled]);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-[#ff6645] px-5 py-3 font-body text-sm font-bold text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white"
      >
        본문 바로가기
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero content={heroContent} />
        <About />
        <ProductProof />
        <ImageCards />
        <Experience />
        <Contact />
      </main>
      <Footer showAnalyticsSettings={analyticsEnabled} />
      <TypebotBubble />
      {analyticsEnabled && <AnalyticsConsentBanner />}
    </div>
  );
};

export default Index;
