import { useRef, ReactNode, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PageHeroProps {
  images: string[];
  badge: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
  interval?: number;
}

const PageHero = ({ images, badge, title, subtitle, children, interval = 5000 }: PageHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [nextSlide, interval, images.length]);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Parallax
    gsap.to(bgRef.current, {
      y: 120,
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(textRef.current, {
      y: -60,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Initial load animations
    const textElements = gsap.utils.selector(textRef.current);
    gsap.fromTo(textElements(".hero-badge"), { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
    gsap.fromTo(textElements(".hero-title"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power3.out" });
    gsap.fromTo(textElements(".hero-subtitle"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.25 });
    if (children) {
       gsap.fromTo(textElements(".hero-children"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.4 });
    }

    // Scroll indicator animation
    gsap.to(scrollIndicatorRef.current, { y: 8, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });
    const scrollDot = scrollIndicatorRef.current?.querySelector('.scroll-dot');
    if (scrollDot) gsap.to(scrollDot, { y: 12, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Particles animation
    if (particlesRef.current) {
      const particles = gsap.utils.toArray(particlesRef.current.children);
      particles.forEach((p: any, i) => {
        gsap.to(p, {
          y: -40 - i * 5,
          x: (i % 2 === 0 ? 10 : -10),
          opacity: 0.7,
          scale: 1.8,
          duration: 4 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }

  }, [children]);

  return (
    <>
      {/* ── MOBILE HERO (image below text, no cropping) ── */}
      <div className="block md:hidden bg-slate-900 overflow-hidden">
        <div
          ref={textRef}
          className="flex flex-col items-start px-4 pt-28 pb-6"
        >
          <span className="hero-badge inline-block mb-5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
            {badge}
          </span>
          <h1 className="hero-title qupe-heading text-4xl text-white max-w-4xl leading-[1.08]">
            {title}
          </h1>
          <p className="hero-subtitle mt-5 text-lg text-white/90 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          {children && (
            <div className="hero-children mt-8">
              {children}
            </div>
          )}
        </div>
        {/* Full-width image at natural aspect ratio — no cropping */}
        <div className="w-screen relative">
          {images.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              className="w-full h-auto absolute top-0 left-0 transition-opacity duration-1500 ease-in-out"
              style={{ opacity: idx === currentIndex ? 1 : 0, position: idx === 0 ? "relative" : "absolute" }}
              loading="eager"
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP HERO (full-screen parallax background) ── */}
      <section ref={containerRef} className="hidden md:flex relative min-h-[85vh] items-end overflow-hidden bg-slate-900">
        {/* Parallax background images with crossfade */}
        <div ref={bgRef} className="absolute inset-0 z-0">
          {images.map((src, idx) => (
             <img
               key={src}
               src={src}
               alt=""
               className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out"
               style={{ opacity: idx === currentIndex ? 1 : 0 }}
               loading="eager"
               width={1920}
               height={1080}
             />
          ))}
        </div>

        {/* Dark scrim — stronger for text legibility */}
        <div className="absolute inset-0 z-[1] bg-[#0D4969]/75" />

        {/* Animated particles */}
        <div ref={particlesRef} className="absolute inset-0 z-[2] pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-15"
              style={{
                width: 2 + (i % 3) * 2,
                height: 2 + (i % 3) * 2,
                left: `${10 + i * 11}%`,
                top: `${15 + (i % 4) * 20}%`,
                background: i % 2 === 0
                  ? "hsl(var(--primary) / 0.35)"
                  : "hsl(0 0% 100% / 0.2)",
              }}
            />
          ))}
        </div>

        {/* Slide indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[5] flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-primary w-6" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div
          ref={textRef}
          className="container mx-auto px-4 lg:px-8 relative z-10 pb-16 md:pb-24"
        >
          <span className="hero-badge inline-block mb-5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
            {badge}
          </span>

          <h1 className="hero-title qupe-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-4xl leading-[1.08]">
            {title}
          </h1>

          <p className="hero-subtitle mt-5 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
            {subtitle}
          </p>

          {children && (
            <div className="hero-children mt-8">
              {children}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/25 flex items-start justify-center p-1">
            <div className="scroll-dot w-1 h-1 rounded-full bg-primary" />
          </div>
        </div>
      </section>
    </>
  );
};

export default PageHero;
