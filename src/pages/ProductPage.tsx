import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heart, Car, Home, Briefcase, Plane, Shield,
  CheckCircle, XCircle, Star, Clock, Users, Phone,
  ArrowRight, ArrowLeft,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getProductBySlug } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import CTAButton from "@/components/CTAButton";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { trackProductView } from "@/components/AnalyticsProvider";
import heroProducts from "@/assets/hero-products.jpg";
import heroProducts2 from "@/assets/hero-products-2.jpg";
import NoSmoking from "@/assets/Pricing/No-Smoking--Streamline-Milano.png";
import Coverage from "@/assets/Pricing/Stack-Of-Money-2--Streamline-Milano.png";
import Term from "@/assets/Pricing/Work-Deadline-2--Streamline-Milano.png";
import imgHospital from "@/assets/Products/Gemini_Generated_Image_6wjalo6wjalo6wja-Photoroom.png";
import imgLife from "@/assets/Products/Gemini_Generated_Image_oq6fqfoq6fqfoq6f-Photoroom.png";
import imgNetWorth from "@/assets/Products/Gemini_Generated_Image_onpwheonpwheonpw-Photoroom.png";
import imgCar from "@/assets/Products/Gemini_Generated_Image_cmkms6cmkms6cmkm-Photoroom.png";
import videoMotor from "@/assets/Products/magnific_use-the-provided-image-as_9RllHD3NYZ.mp4";
import videoLife from "@/assets/Products/magnific_use-the-provided-image-as_kLfa5HX16B.mp4";
import videoHealth from "@/assets/Products/magnific_use-the-provided-image-as_ohccbjt829.mp4";
import videoProperty from "@/assets/Products/magnific_animate-this-reference-im_ubooflmQLD.mp4";
import videoBusinessAsset from "@/assets/Products/magnific_use-the-uploaded-illustra_5xa8Xi6Kxe.mp4";
import videoInvestmentAsset from "@/assets/Products/magnific_use-the-uploaded-illustra_PiskgtX42C.mp4";

// TODO: replace these placeholder assignments with dedicated Business/Investment
// assets once available (drop new files into src/assets/Products/ and import
// them above, then point these at the new imports). Reusing existing assets
// in the meantime so the page renders correctly instead of silently falling
// back to the Property visuals.
const imgBusiness = imgNetWorth;
const imgInvestment = imgHospital;
const videoBusiness = videoBusinessAsset;
const videoInvestment = videoInvestmentAsset;

const SlowVideo = ({ src, className }: { src: string; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      onLoadedMetadata={() => {
        if (ref.current) ref.current.playbackRate = 0.75;
      }}
      className={className}
      style={{ mixBlendMode: "darken" }}
    />
  );
};

const productImagesMap: Record<string, string> = {
  Heart: imgLife,
  Car: imgCar,
  Home: imgNetWorth,
  Shield: imgHospital,
  Briefcase: imgBusiness,
  Plane: imgInvestment,
};

const productColorMap: Record<string, string> = {
  Heart: "bg-sky-500/10",
  Car: "bg-emerald-500/10",
  Home: "bg-blue-500/10",
  Shield: "bg-teal-500/10",
  Briefcase: "bg-amber-500/10",
  Plane: "bg-violet-500/10",
};

const medicalInsuranceProducts = [
  {
    slug: "individual-medical-insurance",
    title: "Individual Medical Insurance",
    description: "Comprehensive medical coverage for a single person.",
    listTitle: "Plans",
    items: [
      "Bronze Plan - Essential healthcare cover",
      "Silver Plan - Enhanced outpatient and specialist cover",
      "Gold Plan - Comprehensive inpatient and outpatient cover",
      "Platinum Plan - Premium healthcare cover",
      "Executive Plan - VIP healthcare and international benefits",
    ],
  },
  {
    slug: "family-medical-insurance",
    title: "Family Medical Insurance",
    description: "Healthcare protection for the insured member, spouse, and children under one policy.",
    listTitle: "Plans",
    items: ["Family Bronze", "Family Silver", "Family Gold", "Family Platinum", "Family Executive"],
    secondaryTitle: "Optional Benefits",
    secondaryItems: ["Maternity Cover", "Child Wellness & Vaccination", "Chronic Disease Management"],
  },
  {
    slug: "corporate-medical-insurance",
    title: "Corporate Medical Insurance",
    description: "Customized healthcare solutions for organizations and their employees.",
    listTitle: "Plans",
    items: [
      "SME Health Plan (Small & Medium Businesses)",
      "Corporate Bronze",
      "Corporate Silver",
      "Corporate Gold",
      "Corporate Platinum",
      "Corporate Executive",
    ],
    secondaryTitle: "Optional Benefits",
    secondaryItems: ["Executive Health Cover", "Annual Medical Checkups", "Employee Wellness Programs", "Occupational Health Services"],
  },
  {
    slug: "specialized-medical-insurance",
    title: "Specialized Medical Insurance",
    description: "Targeted solutions for specific healthcare needs.",
    listTitle: "Products",
    items: [
      "Maternal & Child Health Insurance",
      "Senior Citizen Health Insurance",
      "Student Health Insurance",
      "Chronic Disease Care Plan",
      "Travel Medical Insurance",
      "Micro Health Insurance",
    ],
  },
];

const MedicalInsuranceProductsSection = ({ currentSlug }: { currentSlug: string }) => (
  <section className="py-10 md:py-14 bg-[hsl(201,78%,98%)]">
    <div className="container mx-auto px-4 lg:px-8">
      <ScrollReveal>
        <div className="max-w-3xl mb-10">
          <span className="section-badge mb-4 inline-block">WASS MEDICAL INSURANCE PRODUCTS</span>
          <h2 className="qupe-heading text-3xl md:text-4xl text-foreground">
            Medical Insurance
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-600">
            Wass Medical Insurance provides affordable, comprehensive, and premium healthcare solutions for Individuals,
            Families, and Organizations, ensuring access to quality healthcare whenever it is needed.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {medicalInsuranceProducts.map((item) => {
          const isCurrent = currentSlug === item.slug;
          return (
            <article
              key={item.slug}
              className={`rounded-lg border bg-white p-5 shadow-sm transition-all duration-200 ${
                isCurrent
                  ? "border-[hsl(160,55%,45%)] shadow-[0_16px_40px_rgba(40,138,105,0.16)]"
                  : "border-gray-100 hover:border-[hsl(160,55%,45%)] hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading text-lg font-bold text-[hsl(201,78%,20%)]">
                  {item.title}
                </h3>
                {isCurrent && (
                  <span className="rounded-full bg-[hsl(160,55%,45%)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>

              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[hsl(160,55%,35%)]">
                  {item.listTitle}
                </h4>
                <ul className="mt-3 space-y-2">
                  {item.items.map((listItem) => (
                    <li key={listItem} className="flex gap-2 text-sm leading-snug text-gray-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(160,55%,45%)]" />
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {item.secondaryItems && (
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[hsl(201,78%,28%)]">
                    {item.secondaryTitle}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {item.secondaryItems.map((listItem) => (
                      <li key={listItem} className="flex gap-2 text-sm leading-snug text-gray-700">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(201,78%,38%)]" />
                        <span>{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const productFilterMap: Record<string, string> = {
  Heart: "invert(53%) sepia(48%) saturate(3020%) hue-rotate(167deg) brightness(98%) contrast(92%)",
  Car: "invert(58%) sepia(58%) saturate(452%) hue-rotate(113deg) brightness(97%) contrast(92%)",
  Home: "invert(41%) sepia(74%) saturate(3821%) hue-rotate(207deg) brightness(101%) contrast(98%)",
  Shield: "invert(56%) sepia(87%) saturate(389%) hue-rotate(124deg) brightness(94%) contrast(92%)",
  Briefcase: "invert(65%) sepia(60%) saturate(1400%) hue-rotate(10deg) brightness(98%) contrast(94%)",
  Plane: "invert(48%) sepia(45%) saturate(2200%) hue-rotate(235deg) brightness(94%) contrast(96%)",
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
  <section className="py-8 md:py-12 w-full">
    <div className="w-full max-w-[1800px] mx-auto px-4 lg:px-8">
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
        className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 max-w-6xl mx-auto mt-14"
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
        <div className="flex flex-col items-center gap-6 mt-10">
          <p className="text-center text-lg md:text-xl text-muted-foreground">
            Premiums start from{" "}
            <span className="font-semibold text-primary underline underline-offset-16">
              ETB {pricingRules.base_rate.toLocaleString()}
            </span>{" "}
            per year.
          </p>
          <a
            href="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{ background: "hsl(152, 48%, 38%)" }}
          >
            Get Your Exact Quote
            <ArrowRight size={18} strokeWidth={2.5} />
          </a>
        </div>
      )}
    </div>
  </section>
);

// ─── Focal Spotlight Carousel ─────────────────────────────────────────────────

const TOTAL = whyChooseUs.length;
const CLONED = [...whyChooseUs, ...whyChooseUs, ...whyChooseUs];
const STRIP_HEIGHT = "calc(58vh + 146px)";

const KeyBenefitsSpotlightMobile = ({ name }: { name: string }) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <section className="pt-8 md:hidden overflow-hidden w-full max-w-[1800px] mx-auto">
      <ScrollReveal>
        <div className="text-center mb-8 px-4">
          <span className="section-badge mb-4 inline-block">KEY BENEFITS</span>
          <h2 className="qupe-heading text-3xl text-foreground mt-4">
            Why Choose <span className="text-primary">{name}</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="overflow-hidden w-full pl-4" ref={emblaRef}>
        <div className="flex touch-pan-y" style={{ marginLeft: "-1rem" }}>
          {whyChooseUs.map((item, i) => (
            <div key={i} className="flex-[0_0_85%] min-w-0 pl-4">
              <div className="bg-[hsl(152,48%,78%)] rounded-[14px] p-4 flex flex-col h-full shadow-[0_12px_30px_-10px_rgba(0,0,0,0.2)]">
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-lg mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-12" />
    </section>
  );
};

const KeyBenefitsSpotlightDesktop = ({ name }: { name: string }) => {
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
    if (activeIndex < TOTAL) target = activeIndex + TOTAL;
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
    if (d === 0) return "center";
    if (d === -1) return "left";
    if (d === 1) return "right";
    return "hidden";
  };

  const EASE = "cubic-bezier(0.33, 1.4, 0.45, 1)";

  return (
    <section className="hidden md:block pt-8 md:pt-12 overflow-hidden w-full max-w-[1800px] mx-auto">
      <ScrollReveal>
        <div className="text-center mb-12 px-4 lg:px-8">
          <span className="section-badge mb-4 inline-block">KEY BENEFITS</span>
          <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
            Why Choose <span className="text-primary">{name}</span>
          </h2>
        </div>
      </ScrollReveal>

      <div style={{ display: "flex", alignItems: "stretch", width: "100%", height: STRIP_HEIGHT, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "stretch", flex: 1, overflow: "hidden", gap: "10px" }}>
          {CLONED.map((item, i) => {
            const role = getRole(i);
            const isCenter = role === "center";
            const isLeft = role === "left";
            const isRight = role === "right";
            const isVis = role !== "hidden";
            const tr = (p: string) => animated ? p : "none";
            const cardBg = isCenter ? "hsl(152, 48%, 78%)" : "hsl(152, 38%, 88%)";

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
    </section>
  );
};

const KeyBenefitsSpotlight = ({ name }: { name: string }) => {
  return (
    <>
      <KeyBenefitsSpotlightMobile name={name} />
      <KeyBenefitsSpotlightDesktop name={name} />
    </>
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
  return (
    <div className="bg-secondary w-full rounded-3xl overflow-hidden drop-shadow-xl grid grid-cols-1 lg:grid-cols-2 text-white">
      {/* WHAT'S COVERED COLUMN */}
      <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-6 xl:gap-8">
          <div>
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-white/60">
              {t("products.coverage") || "WHAT'S COVERED"}
            </h3>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Coverage Highlights</h4>
            <ul className="text-white/70 text-sm leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              {coverageList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* EXCLUSIONS COLUMN */}
      <div className="p-8 lg:p-12 bg-primary">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-6 xl:gap-8">
          <div>
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-white/60">
              {t("products.exclusions") || "EXCLUSIONS"}
            </h3>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Standard Exclusions</h4>
            <ul className="text-white/70 text-sm leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              {exclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProductPage = () => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const product = getProductBySlug(slug);

  const isGreenCTA = slug === "property" || slug === "health";

  const ctaClass = isGreenCTA
    ? "bg-secondary text-white hover:bg-secodnary/90"
    : "bg-primary text-white hover:bg-primary/90";

  useEffect(() => {
    if (product) trackProductView(product.slug);
  }, [product]);

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
  const exclusions: string[] = Array.isArray(product.exclusions) ? product.exclusions : [];
  const pricingRules = product.pricing_rules || {};

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-10 md:pb-12 bg-white overflow-hidden">
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
                <a
                  href="/quote"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-heading font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-white shadow-lg ${product?.name === "Property Insurance" ||
                      product?.name === "Health Insurance"
                      ? "bg-gradient-to-r from-[hsl(160,55%,35%)] to-[hsl(160,55%,45%)] hover:opacity-90 shadow-[hsl(160,55%,35%)/0.2]"
                      : "bg-gradient-to-r from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)] hover:opacity-90 shadow-[hsl(201,78%,23%)/0.2]"
                    }`}
                >
                  {t("hero.getQuote")}
                  <ArrowRight className="w-4 h-4" />
                </a>

                <CTAButton href="/contact" variant="outline" size="lg" className="border border-gray-200 bg-white text-gray-800 hover:bg-gray-50">
                  {t("contact.title") || "Talk to an Agent"}
                </CTAButton>
              </div>
            </div>

            {/* Right side: Image/Icon */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:items-start z-10">
              {product.icon === "Car" ? (
                <SlowVideo
                  src={videoMotor}
                  className="w-full max-w-2xl aspect-square object-cover hover:scale-110 transition-transform duration-500 ease-out rounded-3xl mix-blend-multiply mix-blend-darken -mt-8 lg:-mt-16"
                />
              ) : product.icon === "Heart" ? (
                <SlowVideo
                  src={videoLife}
                  className="w-full max-w-2xl aspect-square object-cover hover:scale-110 transition-transform duration-500 ease-out rounded-3xl mix-blend-multiply mix-blend-darken -mt-8 lg:-mt-16"
                />
              ) : product.icon === "Shield" ? (
                <SlowVideo
                  src={videoHealth}
                  className="w-full max-w-2xl aspect-square object-cover hover:scale-110 transition-transform duration-500 ease-out rounded-3xl mix-blend-multiply mix-blend-darken -mt-8 lg:-mt-16"
                />
              ) : product.icon === "Briefcase" ? (
                <SlowVideo
                  src={videoBusiness}
                  className="w-full max-w-2xl aspect-square object-cover hover:scale-110 transition-transform duration-500 ease-out rounded-3xl mix-blend-multiply mix-blend-darken -mt-8 lg:-mt-16"
                />
              ) : product.icon === "Plane" ? (
                <SlowVideo
                  src={videoInvestment}
                  className="w-full max-w-2xl aspect-square object-cover hover:scale-110 transition-transform duration-500 ease-out rounded-3xl mix-blend-multiply mix-blend-darken -mt-8 lg:-mt-16"
                />
              ) : (
                <SlowVideo
                  src={videoProperty}
                  className="w-full max-w-2xl aspect-square object-cover hover:scale-110 transition-transform duration-500 ease-out rounded-3xl mix-blend-multiply mix-blend-darken -mt-8 lg:-mt-16"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <KeyBenefitsSpotlight name={name} />

      {product.category_slug === "medical-insurance" && (
        <MedicalInsuranceProductsSection currentSlug={product.slug} />
      )}

      {/* Coverage & Exclusions */}
      <section className="py-8 md:py-12 w-full">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">COVERAGE DETAILS</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              What's <span className="text-primary">Included & Excluded</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="w-full max-w-[1800px] mx-auto px-4 lg:px-8">
          <CoverageAndExclusions coverageList={coverageList} exclusions={exclusions} t={t} />
        </div>
      </section>

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
