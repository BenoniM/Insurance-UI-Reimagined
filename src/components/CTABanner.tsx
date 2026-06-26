import CTAButton from "./CTAButton";

const CTABanner = () => (
  <section className="relative py-20 overflow-hidden bg-white">
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <div className="rounded-3xl !p-12 text-center max-w-3xl mx-auto bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
        <h2 className="qupe-heading text-3xl md:text-4xl text-white mb-4 relative z-10">
          Protect What Matters Most — Get Covered Today
        </h2>
        <p className="text-white/70 max-w-lg mx-auto mb-8 relative z-10">
          Join over 50,000 Ethiopians who trust WASS Insurance for comprehensive, affordable coverage.
        </p>
        <div className="relative z-10">
          <CTAButton href="/quote" variant="primary" size="lg" className="bg-white text-white">
            Get Your Free Quote
          </CTAButton>
        </div>
      </div>
    </div>
  </section>
);

export default CTABanner;
