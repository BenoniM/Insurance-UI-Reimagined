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

      {/* ── Main editorial grid ── */}
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-20">
        <div className="claims-grid">

          {/* ══ LEFT: Featured panel ══ */}
          <ScrollReveal animation="fadeLeft" className="claims-featured">
            <div className="claims-featured-inner">

              {/* Dark hero area */}
              <div className="claims-featured-img relative z-10">
                {/* Edge-to-edge background overlays */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                  <div className="claims-featured-overlay" />
                  <div className="claims-featured-pattern" />
                </div>
                <div className="claims-featured-img-content relative z-10">
                  <span className="claims-featured-tag">
                    {lang === "am" ? "ፈጣን ሂደት" : "Fast Process"}
                  </span>
                  <h2 className="claims-featured-title">
                    {t("claims.title")}{" "}
                    <span className="claims-featured-title-accent">
                      {t("claims.titleHighlight")}
                    </span>
                  </h2>
                  <p className="claims-featured-desc">{t("claims.subtitle")}</p>
                  <a href="/claims" className="claims-featured-cta">
                    {t("claims.startClaim")}
                  </a>
                </div>
              </div>

              {/* Required Documents panel */}
              <div className="claims-docs-panel">
                <h3 className="claims-docs-title">{t("claims.requiredDocs")}</h3>
                <ul className="claims-docs-list">
                  {requiredDocs.map((doc) => (
                    <li key={doc} className="claims-docs-item">
                      <CheckCircle className="claims-docs-check" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          </ScrollReveal>

          {/* ══ RIGHT: 2×2 step cards ══ */}
          <div className="claims-cards-grid">
            {claimSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.num} delay={i * 0.08}>
                  <div className="claims-card">
                    <div className="claims-card-top">
                      <span className="claims-card-step">{step.step}</span>
                    </div>
                    <div className="claims-card-icon-wrap">
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
      </div>
    </section>
  );
};

export default ClaimsGuide;
