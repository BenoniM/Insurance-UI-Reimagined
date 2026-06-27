import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CTAButton from "./CTAButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ExpandingHeroProps {
  images: string[];
  badge: string;
  headline: string; // raw HTML string, rendered via dangerouslySetInnerHTML
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

const ExpandingHero = ({
  images,
  badge,
  headline,
  subtitle,
  ctaLabel,
  ctaHref,
}: ExpandingHeroProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Crossfade image cycling
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length]);

  useGSAP(
    () => {
      if (!wrapperRef.current || !cardRef.current || !textRef.current) return;

      // Initial state — card centred, rounded, 60% × 70vh
      gsap.set(cardRef.current, {
        width: "60%",
        height: "70vh",
        borderRadius: "1.5rem",
        xPercent: -50,
        left: "50%",
        top: "50%",
        yPercent: -50,
        position: "absolute",
      });

      gsap.set(overlayRef.current, { opacity: 0 });

      // Keep track of text visibility purely in GSAP to avoid React state closure issues
      let isTextVisible = false;

      // Scroll-driven expansion
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress; // 0 → 1

          const w = 60 + (94 - 60) * p; // 60% → 94%
          const h = 70 + (94 - 70) * p; // 70vh → 94vh
          const r = 1.5 + (2 - 1.5) * p; // 1.5rem → 2rem
          const top = 50 - 47 * p; // 50% → 3% (tighter but still has air)
          const yPct = -50 + 50 * p; // -50% → 0%

          gsap.set(cardRef.current, {
            width: `${w}%`,
            height: `${h}vh`,
            borderRadius: `${r}rem`,
            top: `${top}%`,
            yPercent: yPct,
          });

          // Overlay darkens as it expands
          gsap.set(overlayRef.current, { opacity: Math.min(p * 1.2, 0.55) });

          // Reveal/Hide text based on progress
          if (p >= 0.45 && !isTextVisible) {
            isTextVisible = true;
            gsap.set(textRef.current, { pointerEvents: "auto" });
            const els = textRef.current?.querySelectorAll<HTMLElement>(
              ".eh-badge, .eh-headline, .eh-subtitle, .eh-cta"
            );
            if (els) {
              gsap.fromTo(
                els,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.12, overwrite: true }
              );
            }
          } else if (p < 0.45 && isTextVisible) {
            isTextVisible = false;
            gsap.set(textRef.current, { pointerEvents: "none" });
            const els = textRef.current?.querySelectorAll<HTMLElement>(
              ".eh-badge, .eh-headline, .eh-subtitle, .eh-cta"
            );
            if (els) {
              gsap.to(els, { opacity: 0, y: 20, duration: 0.4, ease: "power2.out", overwrite: true });
            }
          }
        },
      });
    },
    { scope: wrapperRef, dependencies: [] }
  );

  return (
    /**
     * Outer wrapper — tall enough to give ScrollTrigger room to scrub.
     * height: 200vh so user scrolls through 100vh of the animation.
     */
    <div ref={wrapperRef} style={{ minHeight: "200vh", position: "relative" }}>
      {/* Sticky container — stays pinned while user scrolls */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "hsl(var(--background))",
        }}
      >
        {/* The expanding card */}
        <div
          ref={cardRef}
          style={{
            position: "absolute",
            overflow: "hidden",
            willChange: "width, height, border-radius, top",
          }}
        >
          {/* Crossfading images */}
          {images.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              loading={idx === 0 ? "eager" : "lazy"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: idx === currentIndex ? 1 : 0,
                transition: "opacity 1.2s ease-in-out",
              }}
            />
          ))}

          {/* Dark overlay (grows with expansion) */}
          <div
            ref={overlayRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              zIndex: 1,
            }}
          />

          {/* Text content — absolute centered over the image card */}
          <div
            ref={textRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none", // will toggle to "auto" when visible
            }}
          >
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center px-4">
              <span
                className="eh-badge inline-block mb-6 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md"
                style={{ opacity: 0 }}
              >
                {badge}
              </span>

              <h1
                className="eh-headline font-hero text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-white font-medium tracking-wide capitalize"
                style={{ opacity: 0 }}
                dangerouslySetInnerHTML={{ __html: headline }}
              />

              <p
                className="eh-subtitle mt-6 text-xl text-white/90 max-w-2xl leading-relaxed capitalize"
                style={{ opacity: 0 }}
              >
                {subtitle}
              </p>

              <div className="eh-cta mt-10" style={{ opacity: 0 }}>
                <CTAButton href={ctaHref} variant="primary" size="lg">
                  {ctaLabel}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandingHero;
