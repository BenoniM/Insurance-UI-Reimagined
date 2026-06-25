import { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import QuickActions from "@/components/QuickActions";
import ProductGrid from "@/components/ProductGrid";
import StatsDashboard from "@/components/StatsDashboard";
import ValueProps from "@/components/ValueProps";
import ProcessSteps from "@/components/ProcessSteps";
import ClaimsGuide from "@/components/ClaimsGuide";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Insights from "@/components/Insights";
import LocalTrust from "@/components/LocalTrust";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Measure the footer height and expose it as a CSS variable so the
    // curtain (content div) has exactly the right padding-bottom to let
    // the user scroll it all the way up and fully expose the stage (footer).
    const sync = () => {
      if (footerRef.current) {
        document.documentElement.style.setProperty(
          "--footer-h",
          `${footerRef.current.offsetHeight}px`
        );
      }
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div className="fr-root">
      {/* ── THE CURTAIN: all page content, scrolls up on scroll-down ── */}
      <div className="fr-curtain">
        <Navbar />
        <HeroSection />
        <QuickActions />
        <ProductGrid />
        <StatsDashboard />
        <ValueProps />
        <ProcessSteps />
        <Testimonials />
        <ClaimsGuide />
        <FAQSection />
        <Insights />
        <LocalTrust />
        <PartnersSection />
        <CTABanner />
      </div>

      {/* ── THE STAGE: footer, fixed at bottom, revealed as curtain rises ── */}
      <div ref={footerRef} className="fr-stage">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
