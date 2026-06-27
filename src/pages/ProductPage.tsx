import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heart, Car, Home, Briefcase, Plane, Shield,
  CheckCircle, XCircle, Star, Clock, Users, Phone,
  ArrowRight, ArrowLeft,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import CTAButton from "@/components/CTAButton";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { trackProductView } from "@/components/AnalyticsProvider";
import heroProducts from "@/assets/hero-products.jpg";
import heroProducts2 from "@/assets/hero-products-2.jpg";
import NoSmoking from "@/assets/Pricing/No-Smoking--Streamline-Milano.png";
import Coverage from "@/assets/Pricing/Stack-Of-Money-2--Streamline-Milano.png";
import Term from "@/assets/Pricing/Work-Deadline-2--Streamline-Milano.png";
import imgHospital from "@/assets/Coverage/Hospital-Clinic-1--Streamline-Milano-01.svg";
import imgLife from "@/assets/Coverage/Life-Coverage-01.svg";
import imgNetWorth from "@/assets/Coverage/Net-Worth--Streamline-Milano-01.svg";
import imgCar from "@/assets/Coverage/Speed-Go-Fast-4--Streamline-Milano-01.svg";

const productImagesMap: Record<string, string> = {
  Heart: imgLife,
  Car: imgCar,
  Home: imgNetWorth,
  Shield: imgHospital,
};

const productColorMap: Record<string, string> = {
  Heart: "bg-sky-500/10",
  Car: "bg-emerald-500/10",
  Home: "bg-blue-500/10",
  Shield: "bg-teal-500/10",
};

const productFilterMap: Record<string, string> = {
  Heart: "invert(53%) sepia(48%) saturate(3020%) hue-rotate(167deg) brightness(98%) contrast(92%)",
  Car: "invert(58%) sepia(58%) saturate(452%) hue-rotate(113deg) brightness(97%) contrast(92%)",
  Home: "invert(41%) sepia(74%) saturate(3821%) hue-rotate(207deg) brightness(101%) contrast(98%)",
  Shield: "invert(56%) sepia(87%) saturate(389%) hue-rotate(124deg) brightness(94%) contrast(92%)",
};

const iconMap: Record<string, typeof Heart> = { Heart, Car, Home, Briefcase, Plane, Shield };

const whyChooseUs = [
  {
    icon: Shield,
    title: "NBE Licensed & Regulated",
    description: "Fully licensed by the National Bank of Ethiopia with strict compliance to all regulatory standards.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80",
  },
  {
    icon: Clock,
    title: "Fast Claims Settlement",
    description: "Our streamlined process ensures most claims are settled within 3–5 business days.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&auto=format&fit=crop&q=80",
  },
  {
    icon: Users,
    title: "Dedicated Support Team",
    description: "Personal account managers available via phone, WhatsApp, and at 12 branch offices.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&auto=format&fit=crop&q=80",
  },
  {
    icon: Star,
    title: "Competitive Premiums",
    description: "Affordable rates with flexible payment plans including Telebirr and CBE Birr.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&auto=format&fit=crop&q=80",
  },
];

// ─── Marquee Testimonials Data ────────────────────────────────────────────────

const testimonials = [
  {
    quote: {
      en: "WASS made filing my motor insurance claim effortless. The settlement was fast and the team was incredibly supportive throughout.",
      am: "የመኪና ጥያቄዬን ቀላል አደረጉት። ክፍያው ፈጣን ነበር።",
    },
    name: "Abebe Kebede",
    handle: "@abebe_kebede",
    initials: "AK",
    color: "hsl(201 78% 23%)",
  },
  {
    quote: {
      en: "We've trusted WASS with our family's health and life insurance for over 5 years. Their coverage and service are unmatched in Addis.",
      am: "ከ5 ዓመት በላይ ዋስን እናምናለን። አገልግሎታቸው አቻ የለውም።",
    },
    name: "Sara Tadesse",
    handle: "@sara_tadesse",
    initials: "ST",
    color: "hsl(160 55% 45%)",
  },
  {
    quote: {
      en: "Managing insurance for our 40+ vehicle fleet is seamless with WASS. Their commercial motor package saves us both time and money.",
      am: "40+ ተሽከርካሪዎቻችን ኢንሹራንስ ቀላል ሆኗል። ጊዜና ገንዘብ ቆጥበናል።",
    },
    name: "Daniel Mekonnen",
    handle: "@daniel_mek",
    initials: "DM",
    color: "hsl(205 65% 48%)",
  },
  {
    quote: {
      en: "Filed my motor claim from my phone at 8am. Money in my account by lunch. I genuinely couldn't believe it.",
      am: "የመኪና ጥያቄዬን በስልኬ አቀረብኩ። በምሳ ሰዓት ገንዘቡ መጣ።",
    },
    name: "Meron Alemu",
    handle: "@meron_a",
    initials: "MA",
    color: "hsl(201 78% 35%)",
  },
  {
    quote: {
      en: "Finally — an insurance company that talks like a human. No fine print games. WASS just gets it.",
      am: "በመጨረሻ እንደ ሰው የሚናገር የኢንሹራንስ ድርጅት።",
    },
    name: "Yohannes Girma",
    handle: "@yohannes_g",
    initials: "YG",
    color: "hsl(160 60% 35%)",
  },
];

// ─── Testimonial Card ─────────────────────────────────────────────────────────

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
    <p className="text-[hsl(200,10%,35%)] text-sm leading-relaxed flex-1">
      {tm.quote[lang as "en" | "am"] ?? tm.quote.en}
    </p>
    <div className="flex gap-0.5 mt-4">
      {[...Array(5)].map((_, j) => (
        <svg key={j} viewBox="0 0 20 20" className="w-3.5 h-3.5">
          <polygon
            points="10,1.5 12.2,7.2 18.5,7.6 13.9,11.6 15.5,17.8 10,14.4 4.5,17.8 6.1,11.6 1.5,7.6 7.8,7.2"
            fill="hsl(160 55% 45%)"
            stroke="hsl(160 55% 45%)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  </div>
);

// ─── Marquee Testimonials Section ─────────────────────────────────────────────

const TestimonialsMarquee = ({ lang }: { lang: string }) => (
  <SectionWrapper className="bg-accent/30 !pb-0 overflow-hidden">
    <ScrollReveal>
      <div className="text-center mb-12">
        <span className="section-badge mb-4 inline-block">TESTIMONIALS</span>
        <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
          What Our <span className="text-primary">Clients Say</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
          Hear from real policyholders about their experience with WASS Insurance.
        </p>
      </div>
    </ScrollReveal>

    {/* Marquee track — full bleed */}
    <div className="relative w-full overflow-hidden pb-16">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[hsl(var(--background))] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[hsl(var(--background))] to-transparent" />
      <div className="testimonials-track gap-4 py-2 px-2">
        {[...testimonials, ...testimonials].map((tm, i) => (
          <TestimonialCard key={i} tm={tm} lang={lang as "en" | "am"} />
        ))}
      </div>
    </div>
  </SectionWrapper>
);

// ─── SVG Illustrations ────────────────────────────────────────────────────────

const CoverageAmountImg = () => (
  <img src={Coverage} alt="Coverage amount" width={72} height={72} style={{ objectFit: "contain" }} />
);

const TermYearsImg = () => (
  <img src={Term} alt="Term years" width={72} height={72} style={{ objectFit: "contain" }} />
);

const SmokerImg = () => (
  <img src={NoSmoking} alt="Smoker status" width={72} height={72} style={{ objectFit: "contain" }} />
);

// ─── Pricing Factors Data ─────────────────────────────────────────────────────

const pricingFactors = [
  {
    id: "coverage",
    Illustration: CoverageAmountImg,
    headline: (
      <>
        Based on how much<br />you want covered
      </>
    ),
    description:
      "Higher coverage amounts mean a larger payout for your beneficiaries — and a slightly higher premium to match.",
  },
  {
    id: "term",
    Illustration: TermYearsImg,
    headline: (
      <>
        Based on how long<br />you need protection
      </>
    ),
    description:
      "Longer terms lock in your rate for more years. Shorter terms cost less upfront but may need renewal sooner.",
  },
  {
    id: "smoker",
    Illustration: SmokerImg,
    headline: (
      <>
        Based on whether<br />you smoke
      </>
    ),
    description:
      "Smokers carry higher health risk, which affects your premium. Quitting for 12+ months can qualify you for non-smoker rates.",
  },
];

// ─── Pricing Section ──────────────────────────────────────────────────────────

const PricingSection = ({ pricingRules, t }: { pricingRules: any; t: (key: string) => string }) => (
  <SectionWrapper>
    <div className="text-center mb-4">
      <span className="section-badge mb-4 inline-block">PRICING</span>
      <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4 capitalize">
        How your{" "}
        <span className="text-primary">premium</span>{" "}
        is calculated
      </h2>
      <p className="text-muted-foreground mt-4 max-w-md mx-auto text-base leading-relaxed">
        A few key details shape your quote — here's exactly what we look at.
      </p>
    </div>

    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 max-w-4xl mx-auto mt-14"
      style={{ borderTop: "1px solid #e5e5e5" }}
    >
      {pricingFactors.map(({ id, Illustration, headline, description }, i) => (
        <div
          key={id}
          className="flex flex-col items-center text-center px-10 py-12"
          style={{
            borderRight: i < pricingFactors.length - 1 ? "1px solid #e5e5e5" : "none",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <div
            className="flex items-center justify-center rounded-full mb-8"
            style={{ width: "112px", height: "112px", background: "#f4f4f4" }}
          >
            <Illustration />
          </div>
          <h3
            className="font-heading font-bold text-foreground mb-3 capitalize"
            style={{ fontSize: "1.1rem" }}
          >
            {headline}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      ))}
    </div>

    {pricingRules?.base_rate && (
      <div className="flex flex-col items-center gap-4 mt-10">
        <p className="text-center text-sm text-muted-foreground">
          Premiums start from{" "}
          <span className="font-semibold text-foreground">
            ETB {pricingRules.base_rate.toLocaleString()}
          </span>{" "}
          per year.
        </p>
        <a
          href="/quote"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "hsl(152, 48%, 38%)" }}
        >
          Get Your Exact Quote
          <ArrowRight size={15} strokeWidth={2.5} />
        </a>
      </div>
    )}
  </SectionWrapper>
);

// ─── Focal Spotlight Carousel ─────────────────────────────────────────────────

const TOTAL = whyChooseUs.length;
const CLONED = [...whyChooseUs, ...whyChooseUs, ...whyChooseUs];
const STRIP_HEIGHT = "calc(58vh + 146px)";

const KeyBenefitsSpotlight = ({ name }: { name: string }) => {
  const [activeIndex, setActiveIndex] = useState(TOTAL);
  const [animated, setAnimated] = useState(true);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scheduleAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => advance(1), 3200);
  };

  useEffect(() => {
    scheduleAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  useEffect(() => {
    if (!animated) return;
    let target: number | null = null;
    if (activeIndex >= TOTAL * 2) target = activeIndex - TOTAL;
    if (activeIndex < TOTAL)      target = activeIndex + TOTAL;
    if (target === null) return;

    const t = setTimeout(() => {
      setAnimated(false);
      setActiveIndex(target!);
    }, 620);
    return () => clearTimeout(t);
  }, [activeIndex, animated]);

  useEffect(() => {
    if (animated) return;
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimated(true));
    });
    return () => cancelAnimationFrame(t);
  }, [animated]);

  const advance = (dir: 1 | -1) => {
    setAnimated(true);
    setActiveIndex(prev => prev + dir);
    scheduleAuto();
  };

  const getRole = (i: number) => {
    const d = i - activeIndex;
    if (d === 0)  return "center";
    if (d === -1) return "left";
    if (d === 1)  return "right";
    return "hidden";
  };

  const EASE = "cubic-bezier(0.33, 1.4, 0.45, 1)";

  return (
    <SectionWrapper className="overflow-hidden !px-0 !pb-0">
      <ScrollReveal>
        <div className="text-center mb-12 px-6 lg:px-16">
          <span className="section-badge mb-4 inline-block">KEY BENEFITS</span>
          <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
            Why Choose <span className="text-primary">{name}</span>
          </h2>
        </div>
      </ScrollReveal>

      <div style={{ display: "flex", alignItems: "stretch", width: "100%", height: STRIP_HEIGHT, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "stretch", flex: 1, overflow: "hidden", gap: "10px" }}>
          {CLONED.map((item, i) => {
            const role     = getRole(i);
            const isCenter = role === "center";
            const isLeft   = role === "left";
            const isRight  = role === "right";
            const isVis    = role !== "hidden";
            const tr       = (p: string) => animated ? p : "none";
            const cardBg   = isCenter ? "hsl(152, 48%, 78%)" : "hsl(152, 38%, 88%)";

            return (
              <div
                key={i}
                style={{
                  flex: isCenter ? 5 : isVis ? 2.2 : 0,
                  minWidth: isVis && !isCenter ? "120px" : 0,
                  maxWidth: isVis ? "none" : 0,
                  opacity: isVis ? 1 : 0,
                  overflow: "hidden",
                  height: "100%",
                  transition: tr(`flex 0.6s ${EASE}, opacity 0.4s ease, min-width 0.6s ${EASE}`),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <div style={{
                  width: "100%",
                  height: isCenter ? "100%" : "74%",
                  background: cardBg,
                  borderRadius: isLeft ? "0 14px 14px 0" : isRight ? "14px 0 0 14px" : "14px",
                  padding: isCenter ? "20px" : "12px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  flexShrink: 0,
                  transform: isCenter ? "scale(1)" : "scale(0.97)",
                  boxShadow: isCenter
                    ? "0 18px 40px -12px rgba(0,0,0,0.25)"
                    : "0 6px 16px -8px rgba(0,0,0,0.12)",
                  transition: tr(`height 0.6s ${EASE}, transform 0.6s ${EASE}, border-radius 0.5s ease, padding 0.5s ease, background 0.5s ease, box-shadow 0.5s ease`),
                }}>
                  <div style={{
                    height: isCenter ? "58vh" : "auto",
                    flex: isCenter ? "none" : 1,
                    overflow: "hidden",
                    borderRadius: "8px",
                    flexShrink: 0,
                    transition: tr(`height 0.6s ${EASE}`),
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: isCenter ? "brightness(1)" : "brightness(0.92)",
                        transform: isCenter ? "scale(1)" : "scale(1.04)",
                        transition: tr("filter 0.5s ease, transform 0.6s ease"),
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: isCenter ? "18px" : "10px", transition: tr("padding 0.5s ease") }}>
                    <p
                      className="font-heading font-semibold text-foreground leading-snug"
                      style={{
                        fontSize: isCenter ? "1.05rem" : "0.78rem",
                        transition: tr("font-size 0.5s ease"),
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const,
                        marginBottom: isCenter ? "8px" : "0",
                      }}
                    >
                      {item.title}
                    </p>
                    <div style={{
                      maxHeight: isCenter ? "72px" : "0px",
                      opacity: isCenter ? 1 : 0,
                      transform: isCenter ? "translateY(0)" : "translateY(-6px)",
                      overflow: "hidden",
                      transition: tr("max-height 0.5s ease, opacity 0.35s ease, transform 0.45s ease"),
                    }}>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: "relative", height: "44px", marginTop: "-124px" }}>
        <button
          onClick={() => advance(-1)}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: "11.7%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "2.5px solid hsl(210, 72%, 50%)",
            background: "hsl(210, 72%, 94%)",
            cursor: "pointer",
            color: "hsl(210, 72%, 38%)",
            opacity: 0.92,
            boxShadow: "0 6px 16px -6px rgba(0,0,0,0.25)",
            transition: "opacity 0.2s, background 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.background = "hsl(210, 72%, 86%)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "0.92"; e.currentTarget.style.background = "hsl(210, 72%, 94%)"; }}
        >
          <ArrowLeft size={22} strokeWidth={2.6} />
        </button>

        <button
          onClick={() => advance(1)}
          aria-label="Next"
          style={{
            position: "absolute",
            right: "11.7%",
            transform: "translateX(50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "2.5px solid hsl(210, 72%, 50%)",
            background: "hsl(210, 72%, 94%)",
            cursor: "pointer",
            color: "hsl(210, 72%, 38%)",
            opacity: 0.92,
            boxShadow: "0 6px 16px -6px rgba(0,0,0,0.25)",
            transition: "opacity 0.2s, background 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.background = "hsl(210, 72%, 86%)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "0.92"; e.currentTarget.style.background = "hsl(210, 72%, 94%)"; }}
        >
          <ArrowRight size={22} strokeWidth={2.6} />
        </button>
      </div>

      <div style={{ height: "100px" }} />
    </SectionWrapper>
  );
};

// ─── Coverage & Exclusions ────────────────────────────────────────────────────

const CoverageAndExclusions = ({
  coverageList,
  exclusions,
  t,
}: {
  coverageList: string[];
  exclusions: string[];
  t: (key: string) => string;
}) => {
  const CoverageCard = () => {
    const [hovered, setHovered] = useState(false);
    return (
      <ScrollReveal animation="fadeLeft">
        <div
          className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src="https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?q=80&w=1171&auto=format&fit=crop"
            alt="Coverage"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            style={{ filter: hovered ? "brightness(0.25)" : "brightness(0.75)" }}
          />

          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{ opacity: hovered ? 0 : 1, pointerEvents: hovered ? "none" : "auto" }}
          >
            <div
              className="flex items-center gap-2 px-6 py-3 rounded-full"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(14px)",
                border: "1.5px solid rgba(255,255,255,0.35)",
              }}
            >
              <CheckCircle className="w-4 h-4 text-white" />
              <span className="font-heading font-semibold text-white text-sm tracking-wide">
                {t("products.coverage") || "What's Covered"}
              </span>
            </div>
          </div>

          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 py-4 transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none" }}
          >
            <div className="flex flex-col items-center max-w-xs w-full">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-white" />
                <h2 className="font-heading text-base md:text-lg font-bold text-white">
                  {t("products.coverage") || "What's Covered"}
                </h2>
              </div>
              <div className="w-full relative left-20 space-y-2 overflow-y-auto max-h-36 md:max-h-40 pr-1">
                {coverageList.map((item) => (
                  <div key={item} className="flex items-start gap-3 justify-start">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-white" />
                    <span className="text-xs md:text-sm text-white leading-relaxed text-left">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    );
  };

const ExclusionsCard = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal animation="fadeRight" delay={0.1}>
      <div
        className="relative w-full h-56 md:h-72 rounded-2xl overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="https://images.pexels.com/photos/8297426/pexels-photo-8297426.jpeg"
          alt="Exclusions"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{
            filter: hovered ? "brightness(0.25)" : "brightness(0.75)",
          }}
        />

        {/* Default State */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
          style={{
            opacity: hovered ? 0 : 1,
            pointerEvents: hovered ? "none" : "auto",
          }}
        >
          <div
            className="flex items-center gap-2 px-6 py-3 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(14px)",
              border: "1.5px solid rgba(255,255,255,0.35)",
            }}
          >
            <XCircle className="w-4 h-4 text-white" />
            <span className="font-heading font-semibold text-white text-sm tracking-wide">
              {t("products.exclusions") || "Exclusions"}
            </span>
          </div>
        </div>

        {/* Hover State */}
        <div
  className="absolute inset-0 flex items-center justify-center px-6 py-4 transition-opacity duration-500"
  style={{
    opacity: hovered ? 1 : 0,
    pointerEvents: hovered ? "auto" : "none",
  }}
>
  <div className="w-full max-w-xs">
    <div className="flex items-center gap-2 mb-3">
      <XCircle className="w-5 h-5 text-white shrink-0" />
      <h2 className="font-heading text-base md:text-lg font-bold text-white">
        {t("products.exclusions") || "Exclusions"}
      </h2>
    </div>

    <div className="space-y-2 overflow-y-auto max-h-36 md:max-h-40">
      {exclusions.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-white" />
          <span className="text-xs md:text-sm leading-relaxed text-white">
            {item}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>
      </div>
    </ScrollReveal>
  );
};

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 w-full">
      <CoverageCard />
      <ExclusionsCard />
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProductPage = () => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .single()
      .then(({ data }) => {
        setProduct(data);
        setLoading(false);
        if (data) trackProductView(data.slug);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-28 pb-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-4">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <SectionWrapper className="pt-32 text-center">
          <h1 className="font-heading text-3xl font-bold">{t("products.notFound") || "Product Not Found"}</h1>
          <p className="text-muted-foreground mt-4">The requested product doesn't exist.</p>
          <CTAButton href="/" className="mt-6">Back to Home</CTAButton>
        </SectionWrapper>
        <Footer />
      </div>
    );
  }

  const name = lang === "am" && product.name_am ? product.name_am : product.name;
  const description = lang === "am" && product.full_description_am ? product.full_description_am : product.full_description;
  const coverageList: string[] = Array.isArray(product.coverage_list) ? product.coverage_list : [];
  const exclusions: string[]   = Array.isArray(product.exclusions)    ? product.exclusions    : [];
  const pricingRules           = product.pricing_rules || {};

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left side: Text */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
              <span className="section-badge mb-6 inline-block">
                {product.slug.replace(/-/g, " ").toUpperCase()}
              </span>
              <h1 className="font-hero text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] text-gray-800 font-medium tracking-wide capitalize">
                {name}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                {description || "Comprehensive coverage tailored to your needs."}
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <CTAButton href="/quote" variant="primary" size="lg" className="bg-primary text-white hover:bg-primary/90">
                  {t("hero.getQuote")}
                </CTAButton>
                <CTAButton href="/contact" variant="outline" size="lg" className="border border-gray-200 bg-white text-gray-800 hover:bg-gray-50">
                  {t("contact.title") || "Talk to an Agent"}
                </CTAButton>
              </div>
            </div>
            
            {/* Right side: Image/Icon */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
              <img 
                src={productImagesMap[product.icon] || imgHospital} 
                alt={name} 
                className="w-full max-w-md aspect-square object-contain hover:scale-110 transition-transform duration-500 ease-out"
                style={{ filter: productFilterMap[product.icon] || "invert(53%) sepia(48%) saturate(3020%) hue-rotate(167deg) brightness(98%) contrast(92%)" }}
              />
            </div>
          </div>
        </div>
      </section>

      <KeyBenefitsSpotlight name={name} />

      {/* Coverage & Exclusions */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">COVERAGE DETAILS</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              What's <span className="text-primary">Included & Excluded</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <CoverageAndExclusions coverageList={coverageList} exclusions={exclusions} t={t} />
        </div>
      </SectionWrapper>

      {/* Pricing Section */}
      {pricingRules.base_rate && (
        <PricingSection pricingRules={pricingRules} t={t} />
      )}

      {/* Testimonials — marquee design */}
      <TestimonialsMarquee lang={lang} />



      <Footer />
    </div>
  );
};

export default ProductPage;