import { useEffect } from "react";
import Lenis from "lenis";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import Marquee from "@/components/portfolio/Marquee";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import Skills from "@/components/portfolio/Skills";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="grain bg-cream text-ink min-h-screen" data-testid="portfolio-home">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
