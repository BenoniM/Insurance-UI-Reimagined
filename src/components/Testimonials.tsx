import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "./ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: { en: "Filed my motor claim from my phone at 8am. Money in my account by lunch. I genuinely couldn't believe it.", am: "የመኪና ጥያቄዬን በስልኬ አቀረብኩ። በምሳ ሰዓት ገንዘቡ መጣ። ማመን አልቻልኩም።" },
    name: "Abebe Tadesse",
    handle: "@abebe_tadesse",
    initials: "AT",
    color: "hsl(201 78% 23%)",
  },
  {
    quote: { en: "Finally — an insurance company that talks like a human. No fine print games. WASS just gets it.", am: "በመጨረሻ እንደ ሰው የሚናገር የኢንሹራንስ ድርጅት།" },
    name: "Sara Mohammed",
    handle: "@sara_m",
    initials: "SM",
    color: "hsl(160 55% 45%)",
  },
  {
    quote: { en: "Family emergency at 2am. WhatsApp'd WASS, had pre-approval before sunrise. They actually care.", am: "በ2am የቤተሰብ ድንገተኛ ነበር። ዋስ ቀደም ብሎ ፈቀደ።" },
    name: "Daniel Bekele",
    handle: "@daniel_bk",
    initials: "DB",
    color: "hsl(205 65% 48%)",
  },
  {
    quote: { en: "Switched from a legacy insurer and saved 30%. The app alone is worth switching for.", am: "ከቀድሞ ኢንሹራንስ ቀይሬ 30% ቀንሻለሁ።" },
    name: "Meron Alemu",
    handle: "@meron_a",
    initials: "MA",
    color: "hsl(201 78% 35%)",
  },
  {
    quote: { en: "I love that part of my premium funds clean water in rural Ethiopia. My insurance has a soul now.", am: "ከፕሪሚየሜ ክፍል ለንጹህ ውሃ መዋሉን እወዳለሁ།" },
    name: "Yohannes Girma",
    handle: "@yohannes_g",
    initials: "YG",
    color: "hsl(160 60% 35%)",
  },
];

/**
 * All 5 stars in ONE SVG — pixel-perfect spacing, zero gap.
 * ViewBox: 500 wide × 100 tall. Each star slot = 100 units.
 * Star center at x = 50, 150, 250, 350, 450; y = 50.
 * Outer R=44, inner r=18.
 */
const SLOT = 125; // width per star in viewBox units

// Generate star polygon points for a star centered at (cx, 50)
function starPoints(cx: number): string {
  const outerR = 40;
  const innerR = 16;
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const outerAngle = (i * 72 - 90) * (Math.PI / 180);
    const innerAngle = (i * 72 - 90 + 36) * (Math.PI / 180);
    pts.push(`${(cx + outerR * Math.cos(outerAngle)).toFixed(1)},${(50 + outerR * Math.sin(outerAngle)).toFixed(1)}`);
    pts.push(`${(cx + innerR * Math.cos(innerAngle)).toFixed(1)},${(50 + innerR * Math.sin(innerAngle)).toFixed(1)}`);
  }
  return pts.join(" ");
}

const STAR_DATA = [0, 1, 2, 3, 4].map(i => ({
  cx: SLOT * i + SLOT / 2,
  points: starPoints(SLOT * i + SLOT / 2),
  clipId: `star-clip-${i}`,
  rectX: SLOT * i,      // clip rect starts at left edge of this star's slot
}));

/** Five-star row rendered in a single SVG — no flex gaps possible */
const FiveStars = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRefs = useRef<(SVGRectElement | null)[]>([]);

  useGSAP(() => {
    const trigger = svgRef.current;
    if (!trigger) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top 80%",
        toggleActions: "restart none none reset",
      }
    });

    STAR_DATA.forEach((star, i) => {
      const rect = rectRefs.current[i];
      if (!rect) return;
      tl.fromTo(rect, 
        { attr: { width: 0 } },
        {
          attr: { width: SLOT },
          duration: 0.5,
          ease: "power3.out",
        },
        i * 0.09
      );
    });

  }, { scope: svgRef });

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SLOT * 5} 100`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-16 md:h-20 lg:h-24"
      style={{ display: "block" }}
    >
      <defs>
        {STAR_DATA.map((star, i) => (
          <clipPath key={star.clipId} id={star.clipId}>
            <rect
              ref={el => { rectRefs.current[i] = el; }}
              x={star.rectX}
              y="0"
              width="0"
              height="100"
            />
          </clipPath>
        ))}
      </defs>

      {STAR_DATA.map((star) => (
        <g key={star.clipId}>
          {/* Ghost (grey) star */}
          <polygon
            points={star.points}
            fill="hsl(160 10% 88%)"
            stroke="hsl(160 10% 88%)"
            strokeWidth="12"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Teal fill, clipped left→right */}
          <polygon
            points={star.points}
            fill="hsl(160 55% 45%)"
            stroke="hsl(160 55% 45%)"
            strokeWidth="12"
            strokeLinejoin="round"
            strokeLinecap="round"
            clipPath={`url(#${star.clipId})`}
          />
        </g>
      ))}
    </svg>
  );
};

/** One testimonial card */
const TestimonialCard = ({
  tm,
  lang,
}: {
  tm: (typeof testimonials)[number];
  lang: "en" | "am";
}) => (
  <div className="w-72 md:w-80 shrink-0 flex flex-col rounded-2xl bg-white border border-[hsl(200,10%,92%)] p-6 shadow-sm select-none">
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm shrink-0"
        style={{ background: tm.color }}
      >
        {tm.initials}
      </div>
      <div>
        <p className="font-heading font-bold text-[hsl(201,78%,23%)] text-sm leading-tight">{tm.name}</p>
        <p className="text-xs text-muted-foreground leading-tight mt-0.5">{tm.handle}</p>
      </div>
    </div>
    <p className="text-[hsl(200,10%,35%)] text-sm leading-relaxed flex-1">{tm.quote[lang]}</p>
    <div className="flex gap-0.5 mt-4">
      {[...Array(5)].map((_, j) => (
        <svg key={j} viewBox="0 0 24 24" className="w-4 h-4">
          <polygon
            points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"
            fill="hsl(160 55% 45%)"
            stroke="hsl(160 55% 45%)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  </div>
);

const Testimonials = () => {
  const { lang } = useLanguage();
  const starsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(201,78%,23%)]/[0.03] to-[hsl(160,55%,45%)]/[0.05]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <ScrollReveal>
            <span className="section-badge mb-6 inline-block">CLIENT STORIES</span>
            <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
              Trusted by <span className="text-primary">Thousands</span> of
              <br />Ethiopian Families &amp; Businesses
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
              Hear from real policyholders about their experience with WASS Insurance.
            </p>
          </ScrollReveal>
        </div>

        {/* Stars — single SVG, zero gap */}
        <div ref={starsRef} className="w-full mb-12">
          <FiveStars containerRef={starsRef} />
        </div>
      </div>

      {/* Infinite marquee — full viewport width */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[hsl(var(--background))] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[hsl(var(--background))] to-transparent" />
        <div className="testimonials-track gap-4 py-2 px-2">
          {[...testimonials, ...testimonials].map((tm, i) => (
            <TestimonialCard key={i} tm={tm} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
