import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import MultiImg from "@/assets/Insights/e00d5838-0e91-4083-a6c8-e57942d59ab9.png";

/* ─── slide data ─────────────────────────────────────────────── */
const slides = [
  {
    title: "Multilingual Support",
    description:
      "Services available in Amharic, English, and Oromifa — so every Ethiopian family can understand their coverage.",
    img: MultiImg,
    imgAlt: "Team collaborating around a table",
  },
  {
    title: "Flexible Payments",
    description:
      "Pay via bank transfer, Telebirr, CBE Birr, or cash at any branch. We meet you where you are.",
    img: "https://images.pexels.com/photos/11363562/pexels-photo-11363562.jpeg",
    imgAlt: "Mobile payment on a smartphone",
  },
  {
    title: "Nationwide Coverage",
    description:
      "Branches across Addis Ababa, regional capitals, and growing. Protection wherever life takes you.",
    img: "https://images.pexels.com/photos/35368834/pexels-photo-35368834.jpeg",
    imgAlt: "Ethiopian cityscape at dusk",
  },
  {
    title: "Digital First",
    description:
      "Manage policies, file claims, and pay premiums entirely online. Insurance that moves as fast as you do.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imgAlt: "Person using laptop for digital services",
  },
];

export default function LocalTrust() {
  const { t } = useLanguage();

  /* refs */
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  /* active slide (0-based) */
  const [active, setActive] = useState(0);
  /* progress within the whole section 0→1 */
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      // how far we've scrolled into the section
      const scrolled = Math.max(0, -rect.top);
      const p = Math.min(1, Math.max(0, scrolled / totalScrollable));

      setProgress(p);
      // which slide is active
      const idx = Math.min(
        slides.length - 1,
        Math.floor(p * slides.length)
      );
      setActive(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Per-slide local progress (0→1 within that slide's band).
   * Special-case: at the very end (p=1) the modulo wraps to 0,
   * so clamp the last slide to 1 instead.
   */
  const rawSlide = progress * slides.length;
  const slideProgress =
    progress >= 1 ? 1 : rawSlide % 1;

  return (
    /*
     * The outer wrapper is tall so the browser gives us scroll distance.
     * 100vh   = one viewport for the "pin" itself
     * N×140vh = scroll distance for N slides (slower fill)
     */
    <div
      ref={sectionRef}
      style={{ height: `${100 + slides.length * 105}vh` }}
      className="relative bg-white"
    >
      {/* ── STICKY VIEWPORT ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex flex-col"
      >
        {/* ── HEADER ── */}
        <div className="section-header pt-16 pb-8 px-4">
          <span className="section-badge mb-4 inline-block">LOCAL ADVANTAGE</span>
          <h2 className="section-title mt-3">
            {t("local.title")}{" "}
            <span className="text-primary">{t("local.titleHighlight")}</span>
            {t("local.titleEnd") ? ` ${t("local.titleEnd")}` : ""}
          </h2>
          <p className="section-description mt-3 max-w-xl">
            Proudly local. Rigorously compliant. Built for every corner of Ethiopia.
          </p>
        </div>

        {/* ── THREE-COLUMN BODY ── */}
        <div className="flex-1 container mx-auto px-4 lg:px-8 flex gap-0 md:gap-8 overflow-hidden pb-12">

          {/* ── COL 1: vertical progress line + logo traveller ── */}
          <div className="flex-none flex flex-col items-center w-10 md:w-14 relative">
            {/* grey track */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-border rounded-full" />

            {/* green fill — grows downward */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] rounded-full transition-none"
              style={{
                height: `${progress * 100}%`,
                background: "hsl(160 55% 45%)",
              }}
            />

            {/* logo traveller */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-10 transition-none"
              style={{ top: `clamp(0px, calc(${progress * 100}% - 18px), calc(100% - 36px))` }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "hsl(160 55% 97%)",
                }}
              >
                <img
                  src="/images/wass-cropped.svg"
                  alt="WASS logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
          </div>

          {/* ── COL 2: sliding text ── */}
          <div className="flex-1 relative flex flex-col justify-center overflow-hidden min-w-0">
            {slides.map((slide, i) => {
              /* current slide: based on local progress, translate up & fade out as we leave */
              let opacity = 0;
              let translateY = "40px";

              if (i === active) {
                const isFirst = i === 0;
                const isLast  = i === slides.length - 1;

                /* fade in — skip for very first slide (start fully visible) */
                if (!isFirst && slideProgress < 0.15) {
                  opacity = slideProgress / 0.15;
                  translateY = `${(1 - slideProgress / 0.15) * 24}px`;
                /* fade out — skip for very last slide (end fully visible) */
                } else if (!isLast && slideProgress > 0.75) {
                  const fade = (slideProgress - 0.75) / 0.25;
                  opacity = 1 - fade;
                  translateY = `-${fade * 24}px`;
                } else {
                  opacity = 1;
                  translateY = "0px";
                }
              }

              return (
                <div
                  key={i}
                  aria-hidden={i !== active}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    opacity,
                    transform: `translateY(${translateY})`,
                    transition: "none",
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                >
                  {/* slide number */}
                  <span
                    className="text-xs font-semibold tracking-widest uppercase mb-3"
                    style={{ color: "hsl(160 55% 45%)" }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </span>
                  <h3 className="qupe-heading text-3xl md:text-4xl text-foreground mb-4">
                    {slide.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
                    {slide.description}
                  </p>

                  {/* dot indicators */}
                  <div className="flex gap-2 mt-8">
                    {slides.map((_, di) => (
                      <div
                        key={di}
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          width: di === active ? "2rem" : "0.5rem",
                          background:
                            di === active
                              ? "hsl(160 55% 45%)"
                              : "hsl(160 55% 45% / 0.2)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── COL 3: image box — pure push-up, no gaps ── */}
          <div className="flex-none hidden md:block w-[40%] lg:w-[44%] relative">
            <div
              className="h-full rounded-3xl overflow-hidden shadow-xl shadow-foreground/8 relative"
              style={{ background: "hsl(var(--muted))" }}
            >
              {slides.map((slide, i) => {
                /*
                 * Pure translateY — no opacity fading.
                 * Transition zone starts at slideProgress=0.75.
                 * • active image  → slides from 0% → -100%
                 * • next image    → rises from +100% → 0% simultaneously
                 * • past images   → parked at -100%
                 * • future images → parked at +100%
                 * This guarantees the box is always fully covered.
                 */
                const ZONE_START = 0.72;
                const isLast = i === slides.length - 1;

                let ty: string;

                if (i === active) {
                  if (!isLast && slideProgress >= ZONE_START) {
                    // slide outward upward
                    const t = (slideProgress - ZONE_START) / (1 - ZONE_START);
                    ty = `-${t * 100}%`;
                  } else {
                    ty = "0%"; // fully visible
                  }
                } else if (i === active + 1 && slideProgress >= ZONE_START) {
                  // next image rises from below in sync with current leaving
                  const t = (slideProgress - ZONE_START) / (1 - ZONE_START);
                  ty = `${(1 - t) * 100}%`;
                } else if (i < active) {
                  ty = "-100%"; // already gone above
                } else {
                  ty = "100%"; // waiting below
                }

                return (
                  <img
                    key={i}
                    src={slide.img}
                    alt={slide.imgAlt}
                    loading={i === 0 ? "eager" : "lazy"}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: `translateY(${ty})`,
                      transition: "none",
                      willChange: "transform",
                    }}
                  />
                );
              })}

              {/* subtle green overlay gradient — sits on top of all images */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl z-10"
                style={{
                  background:
                    "linear-gradient(to top, hsl(160 55% 45% / 0.18) 0%, transparent 40%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
