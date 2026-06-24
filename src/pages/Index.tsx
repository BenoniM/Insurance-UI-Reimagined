import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnerMarquee from "@/components/PartnerMarquee";
import QuickActions from "@/components/QuickActions";
import ProductGrid from "@/components/ProductGrid";
import StatsDashboard from "@/components/StatsDashboard";
import ValueProps from "@/components/ValueProps";
import ProcessSteps from "@/components/ProcessSteps";
import ClaimsGuide from "@/components/ClaimsGuide";
import Testimonials from "@/components/Testimonials";
import GivebackSection from "@/components/GivebackSection";
import FAQSection from "@/components/FAQSection";
import Insights from "@/components/Insights";
import LocalTrust from "@/components/LocalTrust";
import ContactBlock from "@/components/ContactBlock";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <QuickActions />
      <ProductGrid />
      <StatsDashboard />
      <ValueProps />
      <ProcessSteps />
      <ClaimsGuide />
      <Testimonials />
      <GivebackSection />
      <FAQSection />
      <Insights />
      <LocalTrust />
      <PartnerMarquee />
      <ContactBlock />
      <Footer />
    </div>
  );
};

export default Index;
