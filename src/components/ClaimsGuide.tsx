import { FileText, Upload, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "./ScrollReveal";

const ClaimsGuide = () => {
  const { t, lang } = useLanguage();

  const claimSteps = [
    {
      icon: FileText,
      num: "01",
      title: lang === "am" ? "ክስተቱን ያሳውቁ" : "Report the Incident",
      description:
        lang === "am"
          ? "ክስተቱ ከተከሰተ በ48 ሰዓት ውስጥ በስልክ፣ WhatsApp ወይም በመስመር ላይ ያሳውቁን።"
          : "Notify us within 48 hours of the event via phone, WhatsApp, or online.",
      step: lang === "am" ? "ደረጃ 1" : "Step 1",
    },
    {
      icon: Upload,
      num: "02",
      title: lang === "am" ? "ሰነዶችን ያስገቡ" : "Submit Documents",
      description:
        lang === "am"
          ? "የሚያስፈልጉ ሰነዶችን ያቅርቡ፡ መታወቂያ፣ የፖሊሲ ቁጥር፣ የክስተት ሪፖርት፣ ፎቶዎች።"
          : "Provide required documents: ID, policy number, incident report, photos.",
      step: lang === "am" ? "ደረጃ 2" : "Step 2",
    },
    {
      icon: Clock,
      num: "03",
      title: lang === "am" ? "የጥያቄ ግምገማ" : "Claim Assessment",
      description:
        lang === "am"
          ? "ቡድናችን ጥያቄዎን በ3-5 የስራ ቀናት ውስጥ ይገመግማል።"
          : "Our team reviews and assesses your claim within 3–5 business days.",
      step: lang === "am" ? "ደረጃ 3" : "Step 3",
    },
    {
      icon: CheckCircle,
      num: "04",
      title: lang === "am" ? "ክፍያ ይቀበሉ" : "Receive Payment",
      description:
        lang === "am"
          ? "የተፈቀዱ ጥያቄዎች በቀጥታ ወደ ባንክ ሂሳብዎ ይከፈላሉ።"
          : "Approved claims are paid directly to your bank account.",
      step: lang === "am" ? "ደረጃ 4" : "Step 4",
    },
  ];

  const requiredDocs =
    lang === "am"
      ? [
        "ትክክለኛ መታወቂያ (የቀበሌ መታወቂያ ወይም ፓስፖርት)",
        "ዋና የፖሊሲ ሰነድ",
        "የክስተት/የፖሊስ ሪፖርት",
        "የጉዳት ፎቶዎች (ካለ)",
        "የህክምና ሪፖርቶች (ለጤና/ህይወት ጥያቄዎች)",
        "የጥገና ግምቶች (ለመኪና/ንብረት)",
      ]
      : [
        "Valid ID (Kebele ID or Passport)",
        "Original policy document",
        "Incident/Police report",
        "Photos of damage (if applicable)",
        "Medical reports (for health/life claims)",
        "Repair estimates (for motor/property)",
      ];

  return (
    <section className="claims-section bg-white">

      {/* ── Main editorial layout ── */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-10 py-8 md:py-10">

        {/* ══ TOP: Featured panel (left) + Required Documents (right) ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-6 md:mb-8">

          {/* LEFT: Featured hero panel */}
          <ScrollReveal animation="fadeLeft">
            <div className="claims-featured-img relative z-10 rounded-3xl overflow-hidden h-full">
              {/* Edge-to-edge background overlays */}
              <div className="absolute inset-0 -z-10 pointer-events-none rounded-3xl overflow-hidden">
                <div className="claims-featured-overlay" />
                <div className="claims-featured-pattern" />
              </div>
              <div className="claims-featured-img-content relative z-10 p-5 md:p-8">
                <span className="claims-featured-tag rounded-full">
                  {lang === "am" ? "ፈጣን ሂደት" : "Fast Process"}
                </span>
                <h2 className="claims-featured-title">
                  {t("claims.title")}{" "}
                  <span className="claims-featured-title-accent">
                    {t("claims.titleHighlight")}
                  </span>
                </h2>
                <p className="claims-featured-desc">{t("claims.subtitle")}</p>
                <a href="/claims" className="claims-featured-cta rounded-full">
                  {t("claims.startClaim")}
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Required Documents panel */}
          <ScrollReveal animation="fadeRight" delay={0.1}>
            <div className="claims-docs-panel rounded-3xl p-5 md:p-8 h-full">
              <h3 className="claims-docs-title">{t("claims.requiredDocs")}</h3>
              <ul className="claims-docs-list">
                {requiredDocs.map((doc) => (
                  <li key={doc} className="claims-docs-item rounded-xl px-3 py-1.5">
                    <CheckCircle className="claims-docs-check" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

        </div>

        {/* ══ BOTTOM: 4-across step cards ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {claimSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.num} delay={i * 0.08}>
                <div className="claims-card rounded-2xl p-4 md:p-5 h-full">
                  <div className="claims-card-top">
                    <span className="claims-card-step rounded-full px-3 py-1">{step.step}</span>
                  </div>
                  <div className="claims-card-icon-wrap rounded-full">
                    <Icon className="claims-card-icon" />
                  </div>
                  <h3 className="claims-card-title">{step.title}</h3>
                  <p className="claims-card-desc">{step.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ClaimsGuide;