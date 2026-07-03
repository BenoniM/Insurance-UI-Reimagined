import { useRef, useEffect, useState } from "react";
import { Zap, ShieldCheck, Clock, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

// Alternating tilt angles for the deck-of-cards look
const STACK_ROTATIONS = [-4, 3, -2.5, 2];

// Faded card backgrounds: alternating between washed-out navy/sky (blue) and teal (green)
const CARD_BACKGROUNDS = [
  // faded sky-blue
  "linear-gradient(145deg, hsl(205 65% 92%) 0%, hsl(201 78% 88%) 100%)",
  // faded teal-green
  "linear-gradient(145deg, hsl(160 55% 91%) 0%, hsl(160 50% 87%) 100%)",
  // faded sky-blue (slightly deeper)
  "linear-gradient(145deg, hsl(201 78% 90%) 0%, hsl(205 65% 86%) 100%)",
  // faded teal-green (slightly deeper)
  "linear-gradient(145deg, hsl(160 60% 89%) 0%, hsl(160 55% 85%) 100%)",
];

const ICON_GRADIENTS = [
  "linear-gradient(135deg, hsl(var(--navy)), hsl(var(--sky)))",
  "linear-gradient(135deg, hsl(var(--teal-dark)), hsl(var(--teal-light)))",
  "linear-gradient(135deg, hsl(var(--navy)), hsl(var(--sky)))",
  "linear-gradient(135deg, hsl(var(--teal-dark)), hsl(var(--teal-light)))",
];

const ValueProps = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Zap,
      title: t("value.fastClaims"),
      proof: t("value.fastClaimsProof"),
      stat: "48h",
      tags: ["Fast Payouts", "Easy Sign-up", "Zero Hassle"],
      number: "01",
    },
    {
      icon: ShieldCheck,
      title: t("value.licensed"),
      proof: t("value.licensedProof"),
      stat: "100%",
      tags: ["Transparent Pricing", "Plain Language", "Flat Fee"],
      number: "02",
    },
    {
      icon: Clock,
      title: t("value.support"),
      proof: t("value.supportProof"),
      stat: "24/7",
      tags: ["Phone", "WhatsApp", "Telegram"],
      number: "03",
    },
    {
      icon: HeartHandshake,
      title: t("value.local"),
      proof: t("value.localProof"),
      stat: "15yr",
      tags: ["NBE Licensed", "12 Branches", "Birr Payments"],
      number: "04",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(-1);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      const stickyStart = -rect.top;
      const stickyZone = rect.height - windowH;

      if (stickyStart <= 0) {
        setScrollProgress(0);
        setActiveCard(-1);
        return;
      }

      if (stickyStart >= stickyZone) {
        setScrollProgress(1);
        setActiveCard(values.length - 1);
        return;
      }

      const progress = stickyStart / stickyZone;
      setScrollProgress(progress);

      // Reserve the first 20% of scroll for the header to "breathe" before cards arrive.
      // Cards only begin appearing after that initial dwell period.
      const cardZoneStart = 0.2;
      const cardZoneLength = 1 - cardZoneStart;
      const cardProgress = Math.max(0, (progress - cardZoneStart) / cardZoneLength);
      const cardIndex = Math.floor(cardProgress * values.length);
      setActiveCard(Math.min(cardIndex, values.length - 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleResize = () => setWindowHeight(window.innerHeight);
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [values.length]);

  // Header blurs/shrinks ONLY once cards start arriving (after 20% scroll)
  const cardZoneStart = 0.2;
  const blurProgress = Math.max(0, (scrollProgress - cardZoneStart) / (1 - cardZoneStart));
  const headerBlur = Math.min(blurProgress * 18, 18);
  const headerScale = 1 - blurProgress * 0.08;
  const headerOpacity = blurProgress > 0.8 ? 1 - (blurProgress - 0.8) / 0.2 : 1;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      // Extra height = header dwell (1 screen) + one screen per card
      style={{ height: `${100 + 20 + values.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(160 55% 45% / 0.04) 0%, transparent 70%)",
          }}
        />

        {/* ── HEADER ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-start pt-[15vh] md:justify-center md:pt-0 text-center px-6 pointer-events-none select-none"
          style={{
            filter: `blur(${headerBlur}px)`,
            transform: `scale(${headerScale})`,
            opacity: headerOpacity,
            transition: "none",
          }}
        >
          <span className="section-badge mb-6 inline-block pointer-events-auto">
            A NEW KIND OF INSURANCE
          </span>
          <h2 className="qupe-heading text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 max-w-3xl leading-tight">
            Insurance That's{" "}
            <span className="text-primary">Instant, Honest &amp; Caring</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            We took everything that's broken about insurance — the forms, the
            fine print, the fight over claims — and built the opposite. Powered
            by technology, grounded in trust.
          </p>

          {/* Scroll hint pulse */}
          <div
            className="mt-10 flex flex-col items-center gap-2 pointer-events-none"
            style={{
              opacity: scrollProgress < 0.08 ? 1 : 0,
              transition: "opacity 0.4s",
            }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-primary/0 via-primary to-primary/0 animate-pulse" />
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Scroll
            </span>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
          {values.map((item, i) => {
            // Map card arrival to the card zone (starts at 20% scroll)
            const cardZone = 1 - cardZoneStart; // 0.8
            const cardStart = cardZoneStart + (i / values.length) * cardZone;
            const cardEnd = cardZoneStart + ((i + 1) / values.length) * cardZone;
            const localProgress = Math.max(
              0,
              Math.min(1, (scrollProgress - cardStart) / (cardEnd - cardStart))
            );

            // Three states:
            //  "entering" = this is the current top card, animate in via localProgress
            //  "buried"   = already in the stack below the top card
            //  "waiting"  = hasn't arrived yet
            const isEntering = i === activeCard;
            const isBuried   = i < activeCard;

            // Buried depth (how many cards are on top of it)
            const depth = isBuried ? activeCard - i : 0;

            let translateY: number;
            let scale: number;
            let rotation: number;

            if (isEntering) {
              // Start from fully below the viewport bottom, slide up to resting position
              // windowHeight/2 gets it to the bottom edge; add extra to clear the card itself
              const offScreen = windowHeight;
              translateY = offScreen * (1 - localProgress);
              scale      = 0.95 + localProgress * 0.05;
              rotation   = 0;
            } else if (isBuried) {
              // Settled in the stack — push up slightly and tilt
              translateY = -depth * 10;
              scale      = 1 - depth * 0.04;
              rotation   = STACK_ROTATIONS[i % STACK_ROTATIONS.length];
            } else {
              // Waiting — fully off-screen below the viewport
              translateY = windowHeight;
              scale      = 0.95;
              rotation   = 0;
            }

            // Always fully opaque — position alone controls visibility
            const opacity = 1;

            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="absolute"
                style={{
                  transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
                  opacity,
                  transition: "transform 0.45s ease-out",
                  zIndex: 10 + i,
                  pointerEvents: i === activeCard ? "auto" : "none",
                }}
              >
                {/* Card */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    width: "clamp(300px, 38vw, 500px)",
                    background: CARD_BACKGROUNDS[i % CARD_BACKGROUNDS.length],
                    border: "1px solid hsl(var(--border))",
                    boxShadow:
                      i === activeCard
                        ? "0 32px 80px -12px hsl(var(--navy) / 0.2), 0 8px 24px -4px hsl(var(--primary) / 0.12)"
                        : "0 8px 32px -4px hsl(var(--navy) / 0.1)",
                  }}
                >
                  <div className="p-8 pb-6">
                    {/* Icon + stat row */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        {/* Icon badge */}
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                          style={{ background: ICON_GRADIENTS[i % ICON_GRADIENTS.length] }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3
                          className="font-heading font-bold leading-tight text-foreground"
                          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)" }}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* Stat — smaller, fully visible */}
                      <div
                        className="font-heading font-black leading-none shrink-0 text-foreground/60"
                        style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)" }}
                      >
                        {item.stat}
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-foreground/70 leading-relaxed mb-8"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {item.proof}
                    </p>

                    {/* Footer: tags only */}
                    <div className="pt-5 border-t border-foreground/10">
                      <div className="flex flex-col gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-body text-sm text-foreground/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
