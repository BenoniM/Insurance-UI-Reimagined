import ScrollReveal from "@/components/ScrollReveal";
import video2023 from "@/assets/Journey/magnific-2023.mp4";
import video2025 from "@/assets/Journey/magnific-2025.mp4";

const AboutMilestones = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="section-badge mb-4 inline-block uppercase">
            Milestones
          </span>
          <h2 className="qupe-heading text-4xl md:text-5xl lg:text-6xl text-foreground">
            Our <span className="text-primary">Journey</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Take a look at how far we've come. We continue to grow, innovate, and lead the way in Ethiopian insurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 2023 Video */}
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <div className="flex flex-col items-center group">
              <div className="w-full aspect-[21/9] overflow-hidden mb-6 relative flex items-center justify-center">
                <video 
                  src={video2023} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-foreground font-hero">2023</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                Grew partner network to 200+ institutions, serving 50,000+ clients.
              </p>
            </div>
          </ScrollReveal>

          {/* 2025 Video */}
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <div className="flex flex-col items-center group">
              <div className="w-full aspect-[21/9] overflow-hidden mb-6 relative flex items-center justify-center">
                <video 
                  src={video2025} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-foreground font-hero">2025</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
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
