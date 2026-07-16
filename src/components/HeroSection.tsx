import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useRef } from "react";
import CTAButton from "./CTAButton";
import heroVideo from "@/assets/Hero/magnific_using-the-provided-vector_hEoMlukvqL.mp4";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroSection = () => {
  const { t } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current) return;

    if (heroVideoRef.current) {
      heroVideoRef.current.playbackRate = 0.6;
    }

    // Initial load animations
    const tl = gsap.timeline();

    tl.fromTo(".hero-headline",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.25, ease: "power3.out" }
    )
      .fromTo(".hero-subtext",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85 },
        "-=0.55"
      )
      .fromTo(".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75 },
        "-=0.3"
      )
      .fromTo(".hero-images",
        { opacity: 0 },
        { opacity: 1, duration: 1.35 },
        "-=0.55"
      )
      .fromTo(".trust-strip",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.5"
      );
  }, { scope: wrapperRef });

  const trustBadges = [
    { label: t("hero.licensed"), value: "Licensed" },
    { label: t("hero.years"), value: "15+" },
    { label: t("hero.clients"), value: "50,000+" },
    { label: t("hero.partners"), value: "200+" },
  ];

  return (
    <div ref={wrapperRef}>
      {/* ── MOBILE HERO (video below text, no cropping) ── */}
      <section className="block md:hidden bg-[#FDFDFD] overflow-hidden min-h-[100dvh] flex flex-col justify-between">
        {/* Text content */}
        <div className="flex flex-col items-center justify-center text-center px-4 pt-28 pb-6 flex-grow">
          <span className="hero-badge inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6">
            INSURANCE FOR EVERY TOMORROW
          </span>
          <h1 className="hero-headline opacity-0 text-4xl font-bold tracking-tight text-secondary max-w-4xl leading-tight">
            Your Tomorrow. <span className="hero-highlight text-primary">Protected!</span>
          </h1>
          <p className="hero-subtext opacity-0 mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
            Innovative Insurance Solutions for Individuals, Families, Businesses, and Communities Across Ethiopia.
          </p>
          <div className="hero-cta opacity-0 mt-8 flex justify-center">
            <CTAButton href="/quote" variant="primary" size="lg">
              Get a Quote
            </CTAButton>
          </div>
        </div>

        {/* Full-width video at natural aspect ratio — no cropping */}
        <div className="hero-images opacity-0 w-full">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={(e) => { e.currentTarget.playbackRate = 0.6; }}
            className="w-full h-auto"
          />
        </div>

        {/* Trust strip */}
        <div className="trust-strip opacity-0 w-full min-h-[4rem] py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
          <div className="container mx-auto px-4 grid grid-cols-2 justify-items-center items-center gap-x-4 gap-y-3 opacity-70">
            {trustBadges.map((badge, i) => (
              <div key={i} className="group flex items-baseline gap-1.5 whitespace-nowrap opacity-80 hover:opacity-100 transition-all cursor-default font-hero">
                <span className="text-lg font-bold tracking-tight text-gray-500 group-hover:text-[#288A69] transition-colors">{badge.value}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#288A69]/80 transition-colors font-sans">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESKTOP HERO (full-screen background video) ── */}
      <section className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden bg-[#DDE2E6]">
        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center">
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
              <CTAButton href="/quote" variant="primary" size="lg">
                Get a Quote
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Background Video */}
        <div className="hero-images opacity-0 absolute inset-0 pointer-events-none z-0">
          <video
            ref={heroVideoRef}
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-screen object-cover object-center"
            style={{ transform: "translateY(0%)" }}
          />
          {/* Subtle overlay to help text readability */}
          <div className="absolute inset-0 bg-white/20"></div>
        </div>

        {/* Trust Badges Strip (Numbers) */}
        <div className="trust-strip opacity-0 absolute bottom-0 left-0 w-full min-h-[4rem] py-3 md:py-0 md:h-16 bg-gray-50 border-t border-gray-100 flex items-center justify-center z-10">
          <div className="container mx-auto px-4 md:flex md:flex-row justify-items-center justify-center items-center gap-x-4 gap-y-3 md:gap-x-16 opacity-70">
            {trustBadges.map((badge, i) => (
              <div key={i} className="group flex items-baseline gap-1.5 whitespace-nowrap opacity-80 hover:opacity-100 transition-all cursor-default font-hero">
                <span className="text-lg sm:text-xl md:text-xl font-bold tracking-tight text-gray-500 group-hover:text-[#288A69] transition-colors">{badge.value}</span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#288A69]/80 transition-colors font-sans">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
