import { useState } from "react";
import featureSurveys from "@/assets/feature-surveys.jpg";
import featureConfig from "@/assets/feature-config.jpg";
import featureAnalytics from "@/assets/feature-analytics.jpg";
import ScrollReveal from "./ScrollReveal";

const tabs = [
  { id: "engineers", label: "Risk Engineers" },
  { id: "underwriting", label: "Underwriting" },
];

const features = {
  engineers: [
    {
      image: featureSurveys,
      title: "Streamlined Risk Surveys & Field Inspections",
      description:
        "Go digital. Design, assign, and complete surveys via mobile or desktop. Real-time sync improves field efficiency.",
    },
    {
      image: featureConfig,
      title: "Configurable Risk Engineering Tools",
      description:
        "Tailor your risk engineering forms, checklists, and logic to match regional or client-specific requirements.",
    },
    {
      image: featureAnalytics,
      title: "Actionable Insights, Not Just Data",
      description:
        "Auto-generate recommendations and risk scores. Help clients act faster and close more controls.",
    },
  ],
  underwriting: [
    {
      image: featureAnalytics,
      title: "Portfolio-Wide Risk Analytics",
      description:
        "View aggregated risk data across your entire portfolio with powerful filtering and visualization capabilities.",
    },
    {
      image: featureConfig,
      title: "Automated Risk Scoring",
      description:
        "Leverage machine learning models to automatically score and prioritize risks for faster underwriting decisions.",
    },
    {
      image: featureSurveys,
      title: "Integrated Survey Workflows",
      description:
        "Seamlessly connect underwriting workflows with risk engineering surveys for end-to-end visibility.",
    },
  ],
};

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState<"engineers" | "underwriting">("engineers");

  return (
    <section id="features" className="section-dark py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "engineers" | "underwriting")}
              className={`relative font-heading text-sm md:text-base font-medium px-6 py-3 rounded-full transition-all ${
                activeTab === tab.id
                  ? "text-primary-foreground coral-gradient"
                  : "text-hero-muted hover:text-hero-foreground bg-dark-surface-light"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feature cards */}
        <div
          key={activeTab}
          className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500"
        >
          {features[activeTab].map((feature, i) => (
            <ScrollReveal key={feature.title} animation="fadeUp" delay={i * 0.1}>
              <div className="dark-card rounded-xl overflow-hidden group h-full">
                <div className="overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    width={1536}
                    height={1024}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-hero-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-hero-muted text-sm leading-relaxed font-body">
                    {feature.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
