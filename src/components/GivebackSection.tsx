import { useEffect, useState, useRef } from "react";
import { Heart, Droplet, GraduationCap, Stethoscope, ArrowRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";
import CTAButton from "./CTAButton";


const steps = [
  { n: "1", title: "Choose your cause", desc: "When you sign up for a WASS policy, pick a cause you care about.", image: "https://images.pexels.com/photos/7688374/pexels-photo-7688374.jpeg" },
  { n: "2", title: "We pool the leftovers", desc: "We take a flat fee. Whatever isn't paid out in claims goes into the Giveback pot.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80" },
  { n: "3", title: "Communities get funded", desc: "Once a year, every Birr left over flows directly to the nonprofits our customers chose.", image: "https://images.pexels.com/photos/9630216/pexels-photo-9630216.jpeg" },
];

const GivebackSection = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-step-index'));
            setActiveStepIndex(index);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );
    const stepTriggers = stepsContainerRef.current?.querySelectorAll('.step-scroll-trigger');
    stepTriggers?.forEach((child) => stepObserver.observe(child));

    return () => {
      stepObserver.disconnect();
    };
  }, []);

  return (
    <SectionWrapper id="giveback" className="relative">
            {/* Impact callout */}
      <ScrollReveal delay={0.2}>
        <div
          className="my-8 md:my-10 max-w-[85rem] mx-auto rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(201,78%,18%)] text-white shadow-xl relative overflow-hidden hover:scale-[1.005] transition-transform duration-300 mx-4 md:mx-8"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/15" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex-1 max-w-3xl flex flex-col items-center md:items-start">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-bold tracking-wider uppercase text-white/90 mb-3">
                IMPACT TO DATE
              </span>
              <h3 className="qupe-heading text-2xl md:text-3xl text-white mb-2 text-center md:text-left w-full">
                Over 4.2M Birr returned to Ethiopian communities
              </h3>
              <p className="text-white/75 text-sm md:text-base leading-relaxed text-center md:text-left">
                Funding clean water projects, scholarships, mobile clinics, and emergency response — chosen by you, the policyholder. Your coverage doesn't just protect you, it lifts up the country we all share.
              </p>
            </div>
            <div className="shrink-0">
              <CTAButton href="/quote" variant="secondary" size="lg" className="!bg-primary !text-[hsla(0, 0%, 100%, 1.00)] hover:!bg-primary/90">
                Join the movement <ArrowRight className="w-4 h-4 ml-1" />
              </CTAButton>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Backdrop accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[hsl(160,55%,45%)/0.04] to-transparent" />



      {/* Steps Scroll Showcase */}
      <div className="relative h-[250vh]" ref={stepsContainerRef}>
        {/* Invisible Triggers */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none z-0">
          <div className="h-[25vh]" />
          {steps.map((_, i) => (
            <div key={i} data-step-index={i} className="step-scroll-trigger w-full h-[60vh]" />
          ))}
        </div>

        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-8 md:py-0 z-10">
          <div className="text-center mb-8 md:mb-16 relative z-20 px-4 mt-8 md:mt-0">
            <ScrollReveal>
              <span className="section-badge mb-3 md:mb-4 inline-block">WASS GIVEBACK</span>
              <h2 className="qupe-heading text-3xl md:text-5xl text-foreground mt-2 md:mt-4">
                Insurance with a <span className="text-primary">Bigger Purpose</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg hidden md:block">
                Traditional insurers profit by paying out as little as possible. We flipped the model — what we don't pay in claims gets returned to causes our customers care about. Honesty is built into how we work.
              </p>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:hidden">
                What we don't pay in claims gets returned to causes our customers care about.
              </p>
            </ScrollReveal>
          </div>

          <div className="w-full max-w-[85rem] mx-auto relative px-6 md:px-8 shrink-0">
            <div className="flex flex-col divide-y divide-border/60">
              {steps.map((step, i) => {
                const isActive = activeStepIndex === i;
                
                return (
                  <div 
                    key={step.title} 
                    className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_minmax(0,1.2fr)_1fr] items-center gap-x-6 md:gap-x-16 py-6 relative"
                  >
                    {/* Number */}
                    <div className="flex justify-center md:justify-start self-start md:self-center">
                      <span 
                        className={`text-6xl md:text-[5.5rem] leading-none transition-colors duration-500 ${isActive ? 'text-[hsl(201,78%,23%)] font-medium' : 'text-muted-foreground/20 font-light'}`}
                        style={{ letterSpacing: "-0.04em" }}
                      >
                        {step.n}
                      </span>
                    </div>
                    
                    {/* Mobile Text */}
                    <div className="flex flex-col justify-center text-center md:hidden pb-2">
                      <h4 
                        className={`font-heading text-xl transition-colors duration-500 ${isActive ? 'text-[hsl(201,78%,23%)] font-bold' : 'text-foreground/80 font-semibold'}`}
                      >
                        {step.title}
                      </h4>
                      <div 
                        className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isActive ? 'max-h-32 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-muted-foreground text-sm leading-relaxed text-center">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Image */}
                    <div 
                      className={`col-span-2 md:col-span-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-2xl ${isActive ? 'h-[140px] opacity-100 mt-4 md:mt-0' : 'h-0 opacity-0 mt-0'}`}
                    >
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Desktop Text */}
                    <div className="hidden md:flex flex-col justify-center text-center">
                      <h4 
                        className={`font-heading text-xl transition-colors duration-500 ${isActive ? 'text-[hsl(201,78%,23%)] font-bold' : 'text-foreground/80 font-semibold'}`}
                      >
                        {step.title}
                      </h4>
                      <div 
                        className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isActive ? 'max-h-32 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-muted-foreground text-sm leading-relaxed text-center">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default GivebackSection;
