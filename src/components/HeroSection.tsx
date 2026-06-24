import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useRef } from "react";
import CTAButton from "./CTAButton";
import leftHero from "@/hero/left-hero.svg";
import rightHero from "@/hero/Business-Deal-4--Streamline-Milano.svg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Initial load animations
    const tl = gsap.timeline();

    tl.fromTo(".hero-headline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".hero-subtext",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.2"
      )
      .fromTo(".hero-images",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(".trust-strip",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
  }, { scope: sectionRef });

  const trustBadges = [
    { label: t("hero.licensed"), value: "Licensed" },
    { label: t("hero.years"), value: "15+" },
    { label: t("hero.clients"), value: "50,000+" },
    { label: t("hero.partners"), value: "200+" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Content */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center pb-20">
          <h1 className="hero-headline opacity-0 font-hero text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] text-gray-800 font-medium tracking-wide capitalize">
            <span className="hero-highlight text-primary">WASS</span> is reimagining <span className="hero-highlight text-primary">insurance</span> <span className="inline-block">for Ethiopian families</span>
          </h1>

          <p className="hero-subtext opacity-0 mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed capitalize">
            Fewer forms, faster payouts, and a fairer model.
          </p>

          <div className="hero-cta opacity-0 mt-10">
            <CTAButton 
              href="/quote" 
              variant="primary"
              size="lg"
            >
              {t("hero.getQuote")}
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Side Images */}
      <div className="hero-images opacity-0 absolute inset-x-0 bottom-16 pointer-events-none z-0 flex justify-center">
        <div className="container mx-auto relative w-full h-[25vh] sm:h-[30vh] md:h-[40vh] lg:h-[45vh]">
          <img 
            src={leftHero} 
            alt="House illustration left" 
            className="absolute bottom-0 left-4 lg:left-8 w-auto h-full max-w-[42vw] object-contain object-left-bottom"
          />
          <img 
            src={rightHero} 
            alt="House illustration right" 
            className="absolute bottom-0 right-4 lg:right-8 w-auto h-full max-w-[42vw] object-contain object-right-bottom"
          />
        </div>
      </div>

      {/* Trust Badges Strip (Numbers) */}
      <div className="trust-strip opacity-0 absolute bottom-0 left-0 w-full h-16 bg-gray-50 border-t border-gray-100 flex items-center justify-center z-10 overflow-hidden">
        <div className="container mx-auto px-4 flex justify-center items-center gap-x-8 md:gap-x-16 gap-y-2 opacity-70">
          {trustBadges.map((badge, i) => (
            <div key={i} className="group flex items-baseline gap-1.5 whitespace-nowrap opacity-80 hover:opacity-100 transition-all cursor-default font-hero">
              <span className="text-lg md:text-xl font-bold tracking-tight text-gray-500 group-hover:text-[#288A69] transition-colors">{badge.value}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#288A69]/80 transition-colors font-sans">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
