import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImageCards from "@/components/ImageCards";
import Experience from "@/components/Experience";
import Leadership from "@/components/Leadership";
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
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-[#ff6645] px-5 py-3 font-body text-sm font-bold text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero content={heroContent} />
        <ImageCards />
        <Leadership />
        <Experience />
        <Contact />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
