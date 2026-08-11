import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImageCards from "@/components/ImageCards";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import Leadership from "@/components/Leadership";
import Activities from "@/components/Activities";
import About from "@/components/About";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { HeroContent } from "@/types/portfolio";

interface IndexProps {
  heroContent?: HeroContent;
}

const Index = ({ heroContent }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero content={heroContent} />
      <About />
      <ImageCards />
      <Marquee />
      <Experience />
      <Leadership />
      <Activities />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
