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

import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#FBFAFA]">
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

      <Footer />
    </div>
  );
};

export default Index;

