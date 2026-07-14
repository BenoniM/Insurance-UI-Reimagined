import ScrollReveal from "@/components/ScrollReveal";
import journeyPanorama from "@/assets/Journey/ChatGPT Image Jul 14, 2026, 12_39_47 PM.png";

const AboutMilestones = () => {
  return (
    <section className="pt-12 pb-24 bg-[#F5F3F4] relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-badge mb-4 inline-block uppercase">
            Milestones
          </span>
          <h2 className="section-title text-foreground">
            Our <span className="text-primary">Journey</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Take a look at how far we've come. We continue to grow, innovate, and lead the way in Ethiopian insurance.
          </p>
        </div>

        <ScrollReveal animation="fadeUp" delay={0.1}>
          <div className="relative left-1/2 right-1/2 w-screen -mx-[50vw] px-4 md:px-8 lg:px-12">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={journeyPanorama}
                alt="Oromia Insurance journey panorama"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        <div className="relative left-1/2 right-1/2 mt-10 grid w-screen -mx-[50vw] grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-8 lg:px-12">
          <ScrollReveal animation="fadeUp" delay={0.15}>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-3 text-foreground font-hero">2023</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
                Grew partner network to 200+ institutions, serving 50,000+ clients.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.2}>
            <div className="text-center md:text-right">
              <h3 className="text-3xl font-bold mb-3 text-foreground font-hero">2025</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto md:mr-0">
                12 branches nationwide, leading innovation in Ethiopian insurance.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMilestones;
