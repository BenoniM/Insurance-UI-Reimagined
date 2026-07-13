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

      // Initial state — card centred, rounded, 60% wide × 70vh tall
      // The sticky container uses flex centering, so we only manage width/height/radius here.
      gsap.set(cardRef.current, {
        width: "60%",
        height: "70vh",            // start at 70vh; animate to 94vh
        borderRadius: "1.5rem",
        position: "relative",
        transformOrigin: "center center",
      });

      gsap.set(overlayRef.current, { opacity: 0 });

      let isTextVisible = false;

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,                  // tighter scrub = more responsive feel
        onUpdate: (self) => {
          const p = self.progress;  // 0 → 1

          // Height: 70vh → 94vh
          const h = 70 + 24 * p;

          // Width: 60% → 94%
          const w = 60 + 34 * p;

          // Border radius: 1.5rem → 0.5rem (visually flatten as it expands)
          const r = 1.5 - 1 * p;

          gsap.set(cardRef.current, {
            width: `${w}%`,
            height: `${h}vh`,
            borderRadius: `${r}rem`,
          });

          // Overlay opacity
          gsap.set(overlayRef.current, { opacity: Math.min(p * 1.8, 0.85) });

          // Text reveal / hide
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* The expanding card */}
        <div
          ref={cardRef}
          style={{
            position: "absolute",
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          {/* Crossfading images */}
          {images.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt=""
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={idx === 0 ? "high" : "low"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: idx === currentIndex ? 1 : 0,
                transition: "opacity 1.2s ease-in-out",
                willChange: "opacity",
              }}
            />
          ))}

          {/* Dark overlay (grows with expansion) */}
          <div
            ref={overlayRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, hsl(201 78% 12%), hsl(160 60% 15%))",
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
                className="eh-badge inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6"
                style={{ opacity: 0 }}
              >
                {badge}
              </span>

              <h1
                className="eh-headline text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white max-w-4xl"
                style={{ opacity: 0 }}
                dangerouslySetInnerHTML={{ __html: headline }}
              />

              <p
                className="eh-subtitle mt-6 text-xl text-white/90 max-w-2xl leading-relaxed"
                style={{ opacity: 0 }}
              >
                {subtitle}
              </p>

              <div className="eh-cta mt-8 flex justify-center" style={{ opacity: 0 }}>
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
