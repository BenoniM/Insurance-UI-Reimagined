import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import CTAButton from "@/components/CTAButton";
import ClaimsHeroAnimation from "@/components/ClaimsHeroAnimation";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  FileText, CheckCircle, AlertTriangle, ArrowRight,
  Smartphone, Laptop, CreditCard, ShieldCheck, Download,
  User, Car, Activity, Home, Plane, FileDown
} from "lucide-react";

// Matches the ProcessSteps border treatment
const FAQ_BORDER = "hsl(201 78% 23% / 0.22)";
const FAQ_BORDER_STYLE = { borderColor: FAQ_BORDER };


const steps = [
  { 
    number: "1", 
    title: "Report the Incident", 
    description: "Contact us within 48 hours of the incident via phone (+251 11 123 4567), WhatsApp, email, or visit any of our 12 branch offices across Ethiopia. Our agents are available 24/7 for emergency claims.",
    image: "https://images.pexels.com/photos/8960941/pexels-photo-8960941.jpeg"
  },
  { 
    number: "2", 
    title: "Submit Required Documents", 
    description: "Provide all necessary documentation including your valid ID, original policy, police report (if applicable), photographs of damage, and completed claim form. You can submit digitally or in person.",
    image: "https://images.pexels.com/photos/2928232/pexels-photo-2928232.jpeg" 
  },
  { 
    number: "3", 
    title: "Assessment & Investigation", 
    description: "Our experienced claims team reviews your submission within 1–2 business days. For motor and property claims, a certified assessor will be assigned to evaluate the damage on-site.",
    image: "https://images.pexels.com/photos/8369520/pexels-photo-8369520.jpeg" 
  },
  { 
    number: "4", 
    title: "Approval & Processing", 
    description: "Once assessment is complete, your claim is reviewed by our underwriting team. You'll receive real-time status updates via SMS and email throughout the entire process.",
    image: "https://images.pexels.com/photos/5510476/pexels-photo-5510476.jpeg" 
  },
  { 
    number: "5", 
    title: "Settlement & Payment", 
    description: "Approved claims are settled within 3–5 business days directly to your bank account, Telebirr, or CBE Birr. You'll receive a detailed settlement statement for your records.",
    image: "https://images.pexels.com/photos/5198284/pexels-photo-5198284.jpeg" 
  },
];

const standardDocuments = [
  "Valid ID (Kebele ID, Passport, or Driver's License)",
  "Original insurance policy document or policy number",
  "Completed claim form (available at branches or download online)",
  "Police report (required for theft, accidents, and third-party claims)",
  "Photographs and/or video evidence of damage or loss",
];

const specificDocuments = [
  "Medical reports, prescriptions, and hospital bills (health/life claims)",
  "Vehicle inspection report from authorized garage (motor claims)",
  "Repair cost estimates from at least two authorized service providers",
  "Death certificate and beneficiary documents (life insurance claims)",
  "Fire brigade report (fire and property damage claims)",
];

const StandardDocsCard = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <ScrollReveal animation="fadeLeft">
      <div
        className="relative w-full h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Standard Documents"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{ filter: hovered ? "brightness(0.2)" : "brightness(0.7)" }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
          style={{ opacity: hovered ? 0 : 1, pointerEvents: hovered ? "none" : "auto" }}
        >
          <div
            className="flex items-center gap-2 px-6 py-3 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(255,255,255,0.35)",
            }}
          >
            <FileText className="w-4 h-4 text-white" />
            <span className="font-heading font-semibold text-white text-sm tracking-wide">
              Standard Requirements
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 py-6 transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none" }}
        >
          <div className="flex flex-col items-center max-w-sm w-full">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-white" />
              <h2 className="font-heading text-lg md:text-xl font-bold text-white">
                Standard Requirements
              </h2>
            </div>
            <div className="w-full relative space-y-3 overflow-y-auto max-h-48 md:max-h-56 pr-2 scrollbar-hide">
              {standardDocuments.map((item) => (
                <div key={item} className="flex items-start gap-3 justify-start">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-white" />
                  <span className="text-xs text-white leading-relaxed text-left">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const SpecificDocsCard = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <ScrollReveal animation="fadeRight" delay={0.1}>
      <div
        className="relative w-full h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="https://images.pexels.com/photos/9870226/pexels-photo-9870226.jpeg"
          alt="Specific Documents"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{ filter: hovered ? "brightness(0.2)" : "brightness(0.7)" }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
          style={{ opacity: hovered ? 0 : 1, pointerEvents: hovered ? "none" : "auto" }}
        >
          <div
            className="flex items-center gap-2 px-6 py-3 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(255,255,255,0.35)",
            }}
          >
            <AlertTriangle className="w-4 h-4 text-white" />
            <span className="font-heading font-semibold text-white text-sm tracking-wide">
              Claim-Specific Proofs
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 py-6 transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none" }}
        >
          <div className="flex flex-col items-center max-w-sm w-full">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-white" />
              <h2 className="font-heading text-lg md:text-xl font-bold text-white">
                Claim-Specific Proofs
              </h2>
            </div>
            <div className="w-full relative space-y-3 overflow-y-auto max-h-48 md:max-h-56 pr-2 scrollbar-hide">
              {specificDocuments.map((item) => (
                <div key={item} className="flex items-start gap-3 justify-start">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-white" />
                  <span className="text-xs text-white leading-relaxed text-left">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const faqs = [
  { q: "How long does the claims process take?", a: "Most claims are processed within 3–5 business days after all required documents are submitted. Complex claims involving investigations may take up to 15 business days." },
  { q: "Can I file a claim online?", a: "Yes! You can initiate a claim through our website, WhatsApp, or by calling our 24/7 claims hotline. You can also visit any of our 12 branch offices." },
  { q: "What if my claim is denied?", a: "If your claim is denied, you'll receive a detailed explanation letter. You can appeal the decision within 30 days by providing additional documentation or evidence." },
  { q: "Do I need a police report?", a: "A police report is required for theft, traffic accidents, and third-party liability claims. For other types of claims, it depends on the nature of the incident." },
];

const DigitalServices = () => {
  return (
    <div className="py-12 md:py-20 bg-background overflow-hidden">
      <ScrollReveal>
        <div className="text-center mb-10 md:mb-16 px-4">
          <span className="section-badge mb-3 inline-block">DIGITAL SERVICES</span>
          <h2 className="qupe-heading text-3xl md:text-5xl lg:text-6xl text-foreground mt-2">
            Online & <span className="text-primary">Mobile</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Access your insurance anywhere, anytime through our digital platforms.
          </p>
        </div>
      </ScrollReveal>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-8">
        {/* Online Services */}
        <ScrollReveal animation="fadeLeft">
          <div className="bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-colors h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Laptop className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold">Online Services</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Buy Insurance Online", icon: ShieldCheck },
                { name: "Policy Renewal", icon: Activity },
                { name: "Premium Payment", icon: CreditCard },
                { name: "Claims Tracking", icon: FileText },
                { name: "Download Certificates", icon: Download },
                { name: "Customer Portal", icon: User },
              ].map((service) => (
                <div key={service.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer border border-transparent hover:border-border">
                  <service.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile Services */}
        <ScrollReveal animation="fadeRight" delay={0.1}>
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 h-full relative overflow-hidden flex flex-col justify-center shadow-xl">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full justify-center items-start">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/30">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">Mobile Services</h3>
              <p className="text-primary-foreground/90 text-base md:text-lg mb-8 leading-relaxed max-w-md">
                Experience seamless insurance management on the go. Download our mobile app to file claims, check policy status, and get roadside assistance instantly.
              </p>
              <CTAButton variant="outline" className="w-fit bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary hover:border-white">
                Download App
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

const ClaimsCenter = () => {
  return (
    <div className="py-12 md:py-20 bg-accent/30 overflow-hidden border-t border-border border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <span className="section-badge mb-3 inline-block">CLAIMS CENTER</span>
            <h2 className="qupe-heading text-3xl md:text-5xl lg:text-6xl text-foreground mt-2">
              Submit & <span className="text-primary">Track</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Report your claim quickly and easily. Choose the type of claim to begin the process.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Quick Claim Reporting */}
          <ScrollReveal animation="fadeUp" delay={0}>
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 h-full shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Quick Claim Reporting
              </h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
                {[
                  { step: "1", title: "Notify us", desc: "Via app, web, or phone" },
                  { step: "2", title: "Submit Documents", desc: "Upload required forms" },
                  { step: "3", title: "Receive Settlement", desc: "Direct to your account" },
                ].map((item) => (
                  <div key={item.step} className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10 shrink-0 shadow-md">
                      {item.step}
                    </div>
                    <div className="pt-0.5">
                      <h4 className="font-bold text-foreground text-base">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Submit a Claim Types */}
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 h-full shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Submit a Claim
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { name: "Motor Claims", icon: Car },
                  { name: "Medical Claims", icon: Activity },
                  { name: "Property Claims", icon: Home },
                  { name: "Travel Claims", icon: Plane },
                ].map((type) => (
                  <div key={type.name} className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-center group bg-background">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <type.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-foreground">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Attached Forms */}
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-heading font-bold mb-2 flex items-center gap-2">
                <FileDown className="w-5 h-5 text-primary" />
                Attached Forms
              </h3>
              <p className="text-sm text-muted-foreground mb-6">Download all claim forms and requirements.</p>
              
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                {[
                  "Motor Claim Form.pdf",
                  "Medical Claim Form.pdf",
                  "Property Claim Form.pdf",
                  "Travel Claim Form.pdf",
                ].map((form) => (
                  <div key={form} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-foreground truncate">{form}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Download className="w-3.5 h-3.5 text-muted-foreground group-hover:text-current" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

const ClaimsPage = () => {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number>(0);

  return (
  <div className="min-h-screen">
    <Navbar />

    <ClaimsHeroAnimation />

    {/* Claims Process Steps */}
    <div className="py-12 md:py-20 bg-card border-b border-border overflow-hidden">
      <ScrollReveal>
        <div className="text-center mb-10 md:mb-16 px-4">
          <span className="section-badge mb-3 inline-block">STEP BY STEP</span>
          <h2 className="qupe-heading text-3xl md:text-5xl lg:text-6xl text-foreground mt-2">
            Claims <span className="text-primary">Process</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">Our streamlined 5-step process ensures your claim is handled quickly, fairly, and transparently.</p>
        </div>
      </ScrollReveal>
      <div className="flex flex-col border-b border-border">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.05}>
            <div className="group border-t border-border transition-colors duration-300 hover:bg-primary cursor-default">
              <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-[1400px] mx-auto">
                {/* Left Column (50%) */}
                <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border group-hover:border-primary-foreground/20 transition-colors">
                  <span className="text-sm font-bold text-foreground group-hover:text-primary-foreground/80 mb-6 md:mb-10 block transition-colors uppercase tracking-widest">
                    Step {step.number}
                  </span>
                  <div className="relative overflow-hidden pr-4 pb-1">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[120%] tracking-tight">
                      {step.title}
                    </h3>
                    <h3 className="absolute inset-0 text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-y-[120%] group-hover:translate-y-0 tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                </div>
                
                {/* Right Area (50%) */}
                <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2">
                  {/* Middle Column (Text) */}
                  <div className="p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 group-hover:border-primary-foreground/20 transition-colors">
                    <div>
                      <span className="text-xs font-bold text-muted-foreground group-hover:text-primary-foreground/60 block mb-3 transition-colors uppercase tracking-widest">
                        Details
                      </span>
                      <p className="text-sm md:text-base text-foreground/80 group-hover:text-primary-foreground/90 transition-colors leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Rightmost Column (Image) */}
                  <div className="p-6 md:p-8 flex items-center justify-center lg:justify-end">
                    <div className="aspect-[4/3] w-full max-w-[220px] overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-full object-cover filter grayscale-[10%] group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>

    {/* Required Documents */}
    <SectionWrapper className="bg-accent/30">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">DOCUMENTATION</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              Required <span className="text-primary">Documents</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Prepare these documents before filing your claim to ensure fast processing.</p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 w-full mt-8">
          <StandardDocsCard />
          <SpecificDocsCard />
        </div>
      </div>
    </SectionWrapper>

    <ClaimsCenter />

    {/* Important Notice */}
    <div className="w-full max-w-[1800px] mx-auto px-4 lg:px-8 my-8 lg:my-12">
      <ScrollReveal>
        <div className="w-full bg-[hsl(201,78%,20%)] rounded-3xl p-6 lg:p-8 relative overflow-hidden drop-shadow-xl">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="w-6 h-6 text-white/90 shrink-0" />
              <h2 className="qupe-heading text-xl md:text-2xl text-white">
                Important Notice
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                "Report all incidents within 48 hours for timely processing",
                "Do not authorize repairs without prior approval from WASS Insurance",
                "Keep all original documents — photocopies may delay your claim",
                "False or exaggerated claims are subject to legal action under Ethiopian law",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-white/60" />
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>

    <DigitalServices />

    {/* FAQ — ProcessSteps-style two-column accordion */}
    <section className="pt-6 pb-20 overflow-hidden bg-accent/30">
      <div className="flex flex-col lg:flex-row w-full">

        {/* ── LEFT column ── */}
        <div
          className="
            lg:w-5/12 flex flex-col justify-start
            px-4 sm:px-8 lg:pl-12 xl:pl-16 lg:pr-16
            pt-8 pb-10 lg:pb-10
            border-t border-b
          "
          style={FAQ_BORDER_STYLE}
        >
          <ScrollReveal>
            <span className="section-badge mb-5 inline-block">FAQ</span>
            <h2 className="qupe-heading text-4xl md:text-[2.75rem] text-foreground mt-3 leading-tight">
              Claims <span className="text-primary">FAQ</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed max-w-xs">
              Quick answers to the most common questions about filing and managing your insurance claims.
            </p>
          </ScrollReveal>
        </div>

        {/* ── vertical divider ── */}
        <div
          className="hidden lg:block w-px shrink-0 self-stretch"
          style={{ background: FAQ_BORDER }}
        />

        {/* ── RIGHT column — accordion rows ── */}
        <div className="lg:flex-1 flex flex-col">

          {/* top border aligns with left column's top border */}
          <div className="border-t" style={FAQ_BORDER_STYLE} />

          {faqs.map((faq, i) => {
            const isOpen = faqOpenIndex === i;
            return (
              <div key={faq.q} className="border-b" style={FAQ_BORDER_STYLE}>
                {/* header row */}
                <button
                  className="w-full flex items-center py-5 px-4 sm:px-8 lg:px-10 xl:pr-16 text-left"
                  onClick={() => setFaqOpenIndex(i)}
                  aria-expanded={isOpen}
                >
                  {/* square bullet */}
                  <span className="flex items-center justify-center w-6 mr-5 shrink-0">
                    <span
                      className="w-[7px] h-[7px] rounded-[1px] transition-all duration-300"
                      style={{
                        background: isOpen ? FAQ_BORDER.replace("0.22", "1") : "transparent",
                        border: `1.5px solid ${FAQ_BORDER.replace("0.22", "0.5")}`,
                      }}
                    />
                  </span>

                  {/* question */}
                  <span
                    className={`flex-1 font-heading font-semibold text-xl transition-colors duration-200 ${
                      isOpen ? "text-foreground" : "text-foreground/50"
                    }`}
                  >
                    {faq.q}
                  </span>

                  {/* +/− */}
                  <span
                    className={`text-2xl font-extralight leading-none w-6 text-right shrink-0 transition-colors duration-200 ${
                      isOpen ? "text-foreground" : "text-foreground/30"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* expanded body — smooth grid-rows animation */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-8 lg:px-10 xl:pr-16 pl-16 pb-7">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>{/* end right */}
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default ClaimsPage;