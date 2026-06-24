import { FileText, Upload, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SectionWrapper from "./SectionWrapper";
import CTAButton from "./CTAButton";
import ScrollReveal from "./ScrollReveal";
import AnimatedBackground from "./AnimatedBackground";

const ClaimsGuide = () => {
  const { t, lang } = useLanguage();

  const claimSteps = [
    { icon: FileText, title: lang === "am" ? "ክስተቱን ያሳውቁ" : "Report the Incident", description: lang === "am" ? "ክስተቱ ከተከሰተ በ48 ሰዓት ውስጥ በስልክ፣ WhatsApp ወይም በመስመር ላይ ያሳውቁን።" : "Notify us within 48 hours of the event via phone, WhatsApp, or online." },
    { icon: Upload, title: lang === "am" ? "ሰነዶችን ያስገቡ" : "Submit Documents", description: lang === "am" ? "የሚያስፈልጉ ሰነዶችን ያቅርቡ፡ መታወቂያ፣ የፖሊሲ ቁጥር፣ የክስተት ሪፖርት፣ ፎቶዎች።" : "Provide required documents: ID, policy number, incident report, photos." },
    { icon: Clock, title: lang === "am" ? "የጥያቄ ግምገማ" : "Claim Assessment", description: lang === "am" ? "ቡድናችን ጥያቄዎን በ3-5 የስራ ቀናት ውስጥ ይገመግማል።" : "Our team reviews and assesses your claim within 3–5 business days." },
    { icon: CheckCircle, title: lang === "am" ? "ክፍያ ይቀበሉ" : "Receive Payment", description: lang === "am" ? "የተፈቀዱ ጥያቄዎች በቀጥታ ወደ ባንክ ሂሳብዎ ይከፈላሉ።" : "Approved claims are paid directly to your bank account." },
  ];

  const requiredDocs = lang === "am"
    ? ["ትክክለኛ መታወቂያ (የቀበሌ መታወቂያ ወይም ፓስፖርት)", "ዋና የፖሊሲ ሰነድ", "የክስተት/የፖሊስ ሪፖርት", "የጉዳት ፎቶዎች (ካለ)", "የህክምና ሪፖርቶች (ለጤና/ህይወት ጥያቄዎች)", "የጥገና ግምቶች (ለመኪና/ንብረት)"]
    : ["Valid ID (Kebele ID or Passport)", "Original policy document", "Incident/Police report", "Photos of damage (if applicable)", "Medical reports (for health/life claims)", "Repair estimates (for motor/property)"];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(201,78%,16%)]">
      <AnimatedBackground variant="dark" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <ScrollReveal animation="fadeLeft">
              <span className="section-badge !border-primary/30 mb-6 inline-block">CLAIMS</span>
              <h2 className="qupe-heading text-4xl md:text-5xl text-white mt-4">
                {t("claims.title")} <span className="text-primary">{t("claims.titleHighlight")}</span>
              </h2>
              <p className="mt-5 text-white/60 text-lg">{t("claims.subtitle")}</p>
            </ScrollReveal>

            <div className="space-y-4 mt-10">
              {claimSteps.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 0.1}>
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:translate-x-1 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-white/50">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.4}>
              <div className="mt-8">
                <CTAButton href="/claims" variant="secondary" className="animate-pulse-subtle">
                  {t("claims.startClaim")}
                </CTAButton>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fadeRight" delay={0.2}>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="font-heading font-semibold text-lg text-white mb-6">{t("claims.requiredDocs")}</h3>
              <ul className="space-y-3">
                {requiredDocs.map((doc, i) => (
                  <ScrollReveal key={doc} animation="fadeUp" delay={0.3 + i * 0.05}>
                    <li className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-white/60">{doc}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium text-primary">⏱ {t("claims.processingTime")}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ClaimsGuide;
