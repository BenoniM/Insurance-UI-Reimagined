import dashboardPreview from "@/assets/dashboard-preview.jpg";
import ScrollReveal from "./ScrollReveal";

const ValueSection = () => {
  return (
    <section id="value" className="section-dark py-20 md:py-28 border-t border-dark-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-coral font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              How RiskGuard Delivers Value
            </p>
            <h2 className="section-title text-hero-foreground">
              Actionable Intelligence
            </h2>
            <p className="mt-4 text-hero-muted max-w-2xl mx-auto font-body">
              Gain real-time, portfolio-wide risk insights that guide smarter risk
              selection and pricing strategies with a proven 20% reduction in loss ratios.
            </p>
          </ScrollReveal>
        </div>

        {/* Stat highlight */}
        <ScrollReveal animation="fadeUp" delay={0.2}>
          <div className="flex justify-center mb-16">
            <div className="coral-gradient rounded-2xl px-12 py-8 text-center">
              <span className="font-heading text-6xl md:text-7xl font-bold text-primary-foreground">
                20%
              </span>
              <p className="text-primary-foreground/80 font-body mt-1 text-sm">
                Proven reduction in loss ratios
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Dashboard preview */}
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="rounded-2xl overflow-hidden border border-dark-surface shadow-2xl">
            <img
              src={dashboardPreview}
              alt="RiskGuard analytics dashboard"
              loading="lazy"
              width={1920}
              height={1080}
              className="w-full"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ValueSection;
