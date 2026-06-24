import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import CTAButton from "@/components/CTAButton";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { FileText, Upload, Clock, CheckCircle, Phone, MessageCircle, Shield, AlertTriangle, HelpCircle, ArrowRight } from "lucide-react";
import heroClaims from "@/assets/hero-claims.jpg";
import heroClaims2 from "@/assets/hero-claims-2.jpg";

const steps = [
  { icon: Phone, number: "1", title: "Report the Incident", description: "Contact us within 48 hours of the incident via phone (+251 11 123 4567), WhatsApp, email, or visit any of our 12 branch offices across Ethiopia. Our agents are available 24/7 for emergency claims." },
  { icon: FileText, number: "2", title: "Submit Required Documents", description: "Provide all necessary documentation including your valid ID, original policy, police report (if applicable), photographs of damage, and completed claim form. You can submit digitally or in person." },
  { icon: Upload, number: "3", title: "Assessment & Investigation", description: "Our experienced claims team reviews your submission within 1–2 business days. For motor and property claims, a certified assessor will be assigned to evaluate the damage on-site." },
  { icon: Clock, number: "4", title: "Approval & Processing", description: "Once assessment is complete, your claim is reviewed by our underwriting team. You'll receive real-time status updates via SMS and email throughout the entire process." },
  { icon: CheckCircle, number: "5", title: "Settlement & Payment", description: "Approved claims are settled within 3–5 business days directly to your bank account, Telebirr, or CBE Birr. You'll receive a detailed settlement statement for your records." },
];

const documents = [
  "Valid ID (Kebele ID, Passport, or Driver's License)",
  "Original insurance policy document or policy number",
  "Completed claim form (available at branches or download online)",
  "Police report (required for theft, accidents, and third-party claims)",
  "Photographs and/or video evidence of damage or loss",
  "Medical reports, prescriptions, and hospital bills (health/life claims)",
  "Vehicle inspection report from authorized garage (motor claims)",
  "Repair cost estimates from at least two authorized service providers",
  "Death certificate and beneficiary documents (life insurance claims)",
  "Fire brigade report (fire and property damage claims)",
];

const faqs = [
  { q: "How long does the claims process take?", a: "Most claims are processed within 3–5 business days after all required documents are submitted. Complex claims involving investigations may take up to 15 business days." },
  { q: "Can I file a claim online?", a: "Yes! You can initiate a claim through our website, WhatsApp, or by calling our 24/7 claims hotline. You can also visit any of our 12 branch offices." },
  { q: "What if my claim is denied?", a: "If your claim is denied, you'll receive a detailed explanation letter. You can appeal the decision within 30 days by providing additional documentation or evidence." },
  { q: "Do I need a police report?", a: "A police report is required for theft, traffic accidents, and third-party liability claims. For other types of claims, it depends on the nature of the incident." },
];

const ClaimsPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <PageHero
      images={[heroClaims, heroClaims2]}
      badge="CLAIMS"
      title={<>File a <span className="text-primary">Claim</span></>}
      subtitle="We make the claims process as simple and fast as possible. Our dedicated team of claims specialists is here to guide you every step of the way — from initial report to final settlement."
    >
      <div className="flex flex-wrap gap-4">
        <CTAButton href="/claims/new" variant="primary" size="lg">File a Claim Online</CTAButton>
        <a href="tel:+251111234567" className="inline-flex items-center gap-2 bg-white text-[hsl(201,78%,23%)] px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all">
          <Phone className="w-4 h-4" /> Call Claims Hotline
        </a>
        <a href="https://wa.me/251911234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[hsl(142,70%,40%)] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>
    </PageHero>

    {/* Claims Process Steps */}
    <SectionWrapper>
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="section-badge mb-4 inline-block">STEP BY STEP</span>
          <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
            Claims <span className="text-primary">Process</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Our streamlined 5-step process ensures your claim is handled quickly, fairly, and transparently.</p>
        </div>
      </ScrollReveal>
      <div className="max-w-3xl mx-auto space-y-4">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.08}>
            <motion.div
              whileHover={{ x: 6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-3xl p-6 flex gap-6 items-start group bg-gradient-to-r from-card to-accent/30 border border-border/50 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)] flex items-center justify-center shrink-0 text-white shadow-md">
                <step.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {step.number}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>

    {/* Required Documents */}
    <SectionWrapper className="bg-accent/30">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">DOCUMENTATION</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              Required <span className="text-primary">Documents</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Prepare these documents before filing your claim to ensure fast processing.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-3">
            {documents.map((doc, i) => (
              <motion.div
                key={doc}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border/50 group hover:border-primary/30 transition-colors"
              >
                <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-foreground/80 text-sm">{doc}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>

    {/* Important Notice */}
    <SectionWrapper>
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-3xl p-8 bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)] text-white relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
                <h3 className="font-heading text-xl font-bold text-white">Important Notice</h3>
              </div>
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" />Report all incidents within 48 hours for timely processing</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" />Do not authorize repairs without prior approval from WASS Insurance</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" />Keep all original documents — photocopies may delay your claim</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" />False or exaggerated claims are subject to legal action under Ethiopian law</li>
              </ul>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </SectionWrapper>

    {/* FAQ */}
    <SectionWrapper className="bg-accent/30">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">FAQ</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              Claims <span className="text-primary">FAQ</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.q} delay={i * 0.06}>
              <div className="qupe-card">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>

    {/* CTA */}
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(201,78%,16%)]" />
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <ScrollReveal animation="scaleUp">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Need Help Filing a Claim?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">Our claims specialists are available 24/7. Call us now or visit your nearest branch office.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton href="/claims/new" variant="primary" size="lg">Start Your Claim</CTAButton>
            <a href="tel:+251111234567" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all">
              <Phone className="w-4 h-4" /> +251 11 123 4567
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
  </div>
);

export default ClaimsPage;
