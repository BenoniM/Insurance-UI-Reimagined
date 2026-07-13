import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useRef } from "react";
import CTAButton from "./CTAButton";
import heroImage from "@/assets/Hero/magnific_you-will-receive-a-refere_kLFGvVr16B.png";

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
          <span className="hero-badge inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6">
            INSURANCE FOR EVERY TOMORROW
          </span>
          <h1 className="hero-headline opacity-0 text-4xl md:text-6xl font-bold tracking-tight text-secondary max-w-4xl leading-tight">
            Your Tomorrow. <span className="hero-highlight text-primary">Protected!</span>
          </h1>

          <p className="hero-subtext opacity-0 mt-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
            Innovative Insurance Solutions for Individuals, Families, Businesses, and Communities Across Ethiopia.
          </p>

          <div className="hero-cta opacity-0 mt-8 flex justify-center">
            <CTAButton
              href="/quote"
              variant="primary"
              size="lg"
            >
              Get a Quote
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="hero-images opacity-0 absolute inset-0 pointer-events-none z-0">
        <img
          src={heroImage}
          alt="Hero background"
          className="w-full h-full object-cover object-top"
        />
        {/* Subtle overlay to help text readability over the image */}
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* Trust Badges Strip (Numbers) */}
      <div className="trust-strip opacity-0 absolute bottom-0 left-0 w-full min-h-[4rem] py-3 md:py-0 md:h-16 bg-gray-50 border-t border-gray-100 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 grid grid-cols-2 md:flex md:flex-row justify-items-center justify-center items-center gap-x-4 gap-y-3 md:gap-x-16 opacity-70">
          {trustBadges.map((badge, i) => (
            <div key={i} className="group flex items-baseline gap-1.5 whitespace-nowrap opacity-80 hover:opacity-100 transition-all cursor-default font-hero">
              <span className="text-lg sm:text-xl md:text-xl font-bold tracking-tight text-gray-500 group-hover:text-[#288A69] transition-colors">{badge.value}</span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#288A69]/80 transition-colors font-sans">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
