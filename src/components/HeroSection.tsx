import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Award, Users, Handshake } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useRef, useState, useEffect, useCallback } from "react";
import CTAButton from "./CTAButton";
import heroHome from "@/assets/hero-home.jpg";
import heroHome2 from "@/assets/hero-home-2.jpg";
import heroHome3 from "@/assets/hero-home-3.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const heroImages = [heroHome, heroHome2, heroHome3];

const HeroSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Parallax effects
    gsap.to(bgRef.current, {
      y: 150,
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "start start",
        end: "end start",
        scrub: true,
      }
    });

    gsap.to(contentRef.current, {
      y: -80,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "start start",
        end: "60% start",
        scrub: true,
      }
    });

    // Initial load animations
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-badge", 
      { opacity: 0, y: 20, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.5 }
    )
    .fromTo(".hero-headline",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.2"
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
    .fromTo(".trust-badge-container",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.1"
    )
    .fromTo(".trust-badge",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      "-=0.2"
    );

    // Continuous animations
    gsap.to(".hero-highlight", {
      scale: 1.02,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.to(".scroll-indicator-dot", {
      y: 16,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.to(".scroll-indicator-container", {
      y: 10,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // Floating particles
    gsap.utils.toArray(".particle").forEach((particle: any, i) => {
      gsap.to(particle, {
        y: `-=${50 + i * 5}`,
        x: i % 2 === 0 ? 15 : -15,
        scale: 1.8,
        opacity: 0.6,
        duration: 2.5 + i * 0.25,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });

  }, { scope: sectionRef });

  const trustBadges = [
    { icon: Shield, label: t("hero.licensed"), value: "Licensed" },
    { icon: Award, label: t("hero.years"), value: "15+" },
    { icon: Users, label: t("hero.clients"), value: "50,000+" },
    { icon: Handshake, label: t("hero.partners"), value: "200+" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-screen parallax background with crossfade using CSS for simplicity */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <img
            key={img}
            src={img}
            alt="WASS Insurance Ethiopia"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            width={1920}
            height={1080}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Cinematic overlay — gradient for depth */}
      <div className="absolute inset-0 z-[1] bg-[#0D4969]/75" />

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[5] flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-primary w-6" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Floating light particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full opacity-10"
            style={{
              width: 3 + (i % 4) * 3,
              height: 3 + (i % 4) * 3,
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 5) * 18}%`,
              background: i % 2 === 0
                ? "hsl(var(--primary) / 0.3)"
                : "hsl(0 0% 100% / 0.15)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-20"
      >
        <div className="max-w-4xl">
          <div className="hero-badge mb-6 opacity-0">
            <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
              WASS INSURANCE
            </span>
          </div>

          <h1 className="hero-headline opacity-0 qupe-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-white">
            {t("hero.headline")}{" "}
            <span className="hero-highlight text-primary inline-block">
              {t("hero.headlineHighlight")}
            </span>{" "}
            {t("hero.headlineEnd")}
          </h1>

          <p className="hero-subtext opacity-0 mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
            {t("hero.subtext")}
          </p>

          <div className="hero-cta opacity-0 mt-10 flex flex-wrap gap-4">
            <CTAButton href="/quote" variant="primary" size="lg">
              {t("hero.getQuote")}
            </CTAButton>
            <CTAButton href="/about" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">
              Discover WASS
            </CTAButton>
          </div>
        </div>

        {/* Trust badges */}
        <div className="trust-badge-container opacity-0 mt-16 flex flex-wrap gap-4 md:gap-6">
          {trustBadges.map((badge, i) => (
            <div
              key={badge.label}
              className="trust-badge opacity-0 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 group hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              <div className="group-hover:rotate-12 transition-transform duration-300">
                <badge.icon className="w-5 h-5 text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all" />
              </div>
              <div>
                <p className="font-heading font-bold text-white">{badge.value}</p>
                <p className="text-xs text-white/60">{badge.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator-container absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="scroll-indicator-dot w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
