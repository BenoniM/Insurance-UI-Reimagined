import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface ScrollFocusHeroProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  intro?: React.ReactNode;
  cta?: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  bgColor?: string;
}

export const ScrollFocusHero: React.FC<ScrollFocusHeroProps> = ({
  badge,
  title,
  subtitle,
  intro,
  cta,
  imageSrc,
  imageAlt = "Hero background",
  imageClassName = "",
  imageStyle,
  bgColor = "#FBFAFA",
}) => {
  // Track viewport height for responsive scroll boundaries
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const updateVh = () => {
      setVh(window.innerHeight || 800);
    };
    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  // Global window scroll — robust, monotonic, never resets when scrolled past
  const { scrollY } = useScroll();

  // Hold transition boundaries:
  // Container is 180vh, so sticky hold lasts for 80vh (0.8 * vh) of scroll
  const textFadeEnd = vh * 0.35;
  const imageFadeStart = vh * 0.1;
  const imageFadeEnd = vh * 0.65;

  // Text: starts at 1, fades smoothly to 0 by textFadeEnd, stays strictly 0
  const textOpacity = useTransform(scrollY, (y) => {
    if (y <= 0) return 1;
    if (y >= textFadeEnd) return 0;
    return 1 - y / textFadeEnd;
  });

  const textY = useTransform(scrollY, (y) => {
    if (y <= 0) return 0;
    if (y >= textFadeEnd) return -35;
    return (y / textFadeEnd) * -35;
  });

  const textPointerEvents = useTransform(scrollY, (y) => (y >= textFadeEnd * 0.8 ? "none" : "auto"));

  // Background image: starts at 0, fades in to 1 by imageFadeEnd, holds at 1 until hold finishes
  const imageOpacity = useTransform(scrollY, (y) => {
    if (y <= imageFadeStart) return 0;
    if (y >= imageFadeEnd) return 1;
    return (y - imageFadeStart) / (imageFadeEnd - imageFadeStart);
  });

  return (
    <div
      className="relative h-[180vh] w-full"
      style={{ backgroundColor: bgColor }}
    >
      {/* Pinned viewport: holds in place while the transition completes */}
      <div className="sticky top-0 h-[100dvh] md:h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image: Initially hidden (0), comes into focus on scroll */}
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            opacity: imageOpacity,
            willChange: "opacity",
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-full h-full object-cover object-top ${imageClassName}`}
            style={imageStyle}
            fetchPriority="high"
            loading="eager"
          />
        </motion.div>

        {/* Hero Text: Visible at start (1), fades away as user scrolls */}
        <motion.div
          className="relative z-10 container mx-auto px-4 lg:px-8 flex flex-col items-center text-center max-w-4xl pt-16 md:pt-0"
          style={{
            opacity: textOpacity,
            y: textY,
            pointerEvents: textPointerEvents,
            willChange: "opacity, transform",
          }}
        >
          {badge && (
            <div className="mb-6">
              {typeof badge === "string" ? (
                <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide border-transparent bg-[#288A69]/10 text-[#288A69]">
                  {badge}
                </span>
              ) : (
                badge
              )}
            </div>
          )}

          {title && (
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[hsl(201,78%,20%)] mb-6 max-w-4xl">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="text-lg md:text-xl font-semibold text-[hsl(160,55%,35%)] mb-4 max-w-2xl">
              {subtitle}
            </p>
          )}

          {intro && (
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              {intro}
            </p>
          )}

          {cta && (
            <div className="flex justify-center gap-4 mt-2">
              {cta}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollFocusHero;
