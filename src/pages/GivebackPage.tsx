import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpandingHero from "@/components/ExpandingHero";
import GivebackSection from "@/components/GivebackSection";
import ScrollReveal from "@/components/ScrollReveal";
import { useEffect, useState, useRef } from "react";
import {
  Heart,
  Droplet,
  GraduationCap,
  Stethoscope,
  Quote as QuoteIcon,
  CheckCircle,
  Calendar,
} from "lucide-react";

const yearlyImpact = [
  { year: "2026", total: "4.2M ETB", projects: 38, beneficiaries: "12,400+" },
  { year: "2025", total: "3.1M ETB", projects: 27, beneficiaries: "9,200+" },
  { year: "2024", total: "1.8M ETB", projects: 14, beneficiaries: "5,600+" },
  { year: "2023", total: "640K ETB", projects: 6, beneficiaries: "1,900+" },
];

const causeBreakdown = [
  { icon: Droplet, title: "Clean Water", pct: 32, desc: "12 wells funded across Oromia & SNNPR.", image: "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=600&q=80" },
  { icon: GraduationCap, title: "Education", pct: 28, desc: "1,840 scholarships and school-supply kits.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" },
  { icon: Stethoscope, title: "Healthcare", pct: 24, desc: "4 mobile clinics serving rural districts.", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80" },
  { icon: Heart, title: "Disaster Relief", pct: 16, desc: "Emergency grants during floods in Awash.", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80" },
];

const updates = [
  { date: "March 2026", title: "Water access for Bishoftu villages", body: "Three solar-powered wells came online, serving 2,100 people who previously walked 6km daily for clean water." },
  { date: "January 2026", title: "School supply drive — Addis Ababa", body: "Distributed 4,200 backpacks, notebooks, and uniforms to children entering Grade 1 across 18 public schools." },
  { date: "November 2025", title: "Mobile clinic launches in Hawassa", body: "WASS Giveback funded a fully-equipped mobile health unit reaching 6 villages monthly with maternal care." },
  { date: "September 2025", title: "Flood relief — Afar region", body: "Emergency disbursement of 480,000 ETB delivered tents, food, and medical supplies within 72 hours." },
];

const testimonials = [
  { quote: "I never thought my insurance would help my daughter go to school. The scholarship from WASS Giveback changed our family.", name: "Almaz T.", role: "Policyholder, Adama" },
  { quote: "The mobile clinic comes to our village every month. My mother gets her diabetes medication without traveling four hours.", name: "Dawit G.", role: "Policyholder, Hawassa" },
];

const transparencyPanels = [
  {
    n: "01",
    label: "AUDIT",
    title: "Third-party verified.",
    body: "Annual audit by an independent Ethiopian firm — every birr accounted for.",
    image: "https://images.pexels.com/photos/6077915/pexels-photo-6077915.jpeg",
  },
  {
    n: "02",
    label: "TRACKING",
    title: "Live impact tracker.",
    body: "Quarterly updates published on this page so you always know where your premium went.",
    image: "https://images.pexels.com/photos/5036927/pexels-photo-5036927.jpeg",
  },
  {
    n: "03",
    label: "ALLOCATION",
    title: "100% unclaimed to causes.",
    body: "After our fixed operating fee, every unclaimed-premium birr flows directly to funded projects.",
    image: "https://images.pexels.com/photos/7821701/pexels-photo-7821701.jpeg",
  },
  {
    n: "04",
    label: "PARTNERS",
    title: "Vetted & public.",
    body: "Every nonprofit partner is independently assessed and listed openly — no hidden relationships.",
    image: "https://images.pexels.com/photos/9064715/pexels-photo-9064715.jpeg",
  },
  {
    n: "05",
    label: "CHOICE",
    title: "You vote on causes.",
    body: "Policyholders choose which causes receive funding during signup — no surprises, ever.",
    image: "https://images.pexels.com/photos/4669113/pexels-photo-4669113.jpeg",
  },
  {
    n: "06",
    label: "REPORTING",
    title: "Field reports, always.",
    body: "A published field report follows every funded project so impact is never just a number.",
    image: "https://images.pexels.com/photos/7948038/pexels-photo-7948038.jpeg",
  },
];

// ─── Parallax Image ────────────────────────────────────────────────────────────
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (rect.top + rect.height / 2 - viewH / 2) / viewH;
      setOffset(progress * 60);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          inset: "-30px 0",
          width: "100%",
          height: "calc(100% + 60px)",
          objectFit: "cover",
          transform: `translateY(${offset}px)`,
          transition: "transform 0.05s linear",
          willChange: "transform",
        }}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const GivebackPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const isMobile = window.innerWidth < 768;
    const triggers = containerRef.current?.querySelectorAll(
      isMobile ? ".cause-row-mobile" : ".cause-trigger"
    );
    triggers?.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <ExpandingHero
        images={[
          "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1600&q=80",
          "https://images.pexels.com/photos/12431091/pexels-photo-12431091.jpeg",
          "https://images.pexels.com/photos/9353491/pexels-photo-9353491.jpeg",
          "https://images.pexels.com/photos/14896176/pexels-photo-14896176.jpeg",
        ]}
        badge="GIVEBACK"
        headline={'Insurance That <span class="text-primary">Gives Back</span>'}
        subtitle="Earn rewards for healthy living and a claims-free year. WASS puts people first."
        ctaLabel="Learn More"
        ctaHref="/quote"
      />

      {/* How it works + causes + impact callout */}
      <GivebackSection />

      {/* YEAR-OVER-YEAR — minimal data table */}
      <section id="impact" className="py-16 px-6 border-t border-border" style={{ background: "hsl(var(--surface))" }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3">YEAR-OVER-YEAR</p>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground" style={{ letterSpacing: "-0.025em" }}>
                  Impact, in numbers.
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                We publish our Giveback totals every year. Here's what your policy has helped fund.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-4 pb-3 border-b border-border">
            {["Year", "Total Returned", "Projects", "Beneficiaries"].map((h) => (
              <span key={h} className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{h}</span>
            ))}
          </div>
          <div className="divide-y divide-border">
            {yearlyImpact.map((y, i) => (
              <ScrollReveal key={y.year} delay={i * 0.06}>
                <div className="grid grid-cols-4 py-5 items-baseline group hover:bg-accent/40 transition-colors duration-200 rounded-sm px-1 -mx-1 cursor-default">
                  <span className="text-xs font-bold tracking-widest text-primary">{y.year}</span>
                  <span className="font-heading font-bold text-xl md:text-3xl text-foreground" style={{ letterSpacing: "-0.03em" }}>{y.total}</span>
                  <span className="font-heading font-bold text-xl md:text-3xl text-foreground" style={{ letterSpacing: "-0.03em" }}>{y.projects}</span>
                  <span className="font-heading font-bold text-lg md:text-2xl text-foreground" style={{ letterSpacing: "-0.03em" }}>{y.beneficiaries}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 ALLOCATION — Pinned scroll showcase */}
      <section className="relative border-t border-border bg-background h-auto md:h-[280vh]" ref={containerRef}>
        {/* Invisible Triggers (Desktop Only) */}
        <div className="hidden md:flex absolute top-0 left-0 w-full h-full flex-col pointer-events-none">
          <div className="h-[20vh]" />
          {causeBreakdown.map((_, i) => (
            <div key={i} data-index={i} className="cause-trigger w-full h-[60vh]" />
          ))}
        </div>

        {/* Sticky Visual Content */}
        <div className="md:sticky md:top-0 md:h-screen w-full flex items-center justify-center overflow-hidden py-24 md:py-0">
          <div className="w-full max-w-[90rem] mx-auto px-6 relative">
            {/* Section Header */}
            <div className="md:absolute md:-top-[25vh] md:left-6 mb-12 md:mb-0">
              <ScrollReveal>
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3">2026 ALLOCATION</p>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground" style={{ letterSpacing: "-0.025em" }}>
                  Where the money went.
                </h2>
              </ScrollReveal>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between w-full">
              {/* Col 1: Percentage */}
              <div className="hidden md:flex flex-col w-[15%]">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Allocated</p>
                <div
                  className="font-heading font-bold transition-colors duration-500 text-5xl lg:text-6xl"
                  style={{ color: activeIndex % 2 === 0 ? "hsl(var(--primary))" : "hsl(160 55% 55%)", letterSpacing: "-0.03em" }}
                >
                  {causeBreakdown[activeIndex].pct}%
                </div>
              </div>

              {/* Col 2: Titles */}
              <div className="w-full md:w-[40%] flex flex-col justify-center items-start gap-2 md:gap-1 z-10">
                {causeBreakdown.map((c, i) => {
                  const isActive = activeIndex === i;
                  const activeColor = i % 2 === 0 ? "hsl(var(--primary))" : "hsl(160 55% 55%)";
                  return (
                    <h3
                      key={c.title}
                      data-index={i}
                      onClick={() => setActiveIndex(i)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className="cause-row-mobile font-heading font-bold transition-all duration-500 whitespace-nowrap cursor-pointer py-4 md:py-0"
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
                        lineHeight: "1.05",
                        letterSpacing: "-0.02em",
                        color: isActive ? activeColor : "hsl(var(--foreground))",
                        opacity: isActive ? 1 : 0.2,
                        transform: isActive ? "translateX(10px)" : "translateX(0px)",
                      }}
                    >
                      <span className="text-[0.5em] opacity-80 md:hidden mr-4 align-middle" style={{ letterSpacing: "-0.03em" }}>
                        {c.pct}%
                      </span>
                      {c.title}
                    </h3>
                  );
                })}
              </div>

              {/* Col 3: Image */}
              <div className="w-full md:w-[25%] flex justify-center mt-12 md:mt-0">
                <div className="relative w-full max-w-[280px] aspect-[1/1] shrink-0 rounded-xl overflow-hidden bg-accent/20 transition-all duration-500 shadow-2xl">
                  {causeBreakdown.map((c, i) => (
                    <img
                      key={c.title}
                      src={c.image}
                      alt={c.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                      style={{ opacity: activeIndex === i ? 1 : 0 }}
                    />
                  ))}
                </div>
              </div>

              {/* Col 4: Description */}
              <div className="w-full md:w-[20%] text-center md:text-left mt-8 md:mt-0 md:pl-6">
                <div className="relative w-full min-h-[80px]">
                  {causeBreakdown.map((c, i) => (
                    <p
                      key={c.title}
                      className="absolute inset-x-0 top-0 md:top-1/2 md:-translate-y-1/2 text-sm lg:text-base text-muted-foreground md:text-foreground font-medium leading-relaxed transition-all duration-500"
                      style={{
                        opacity: activeIndex === i ? 1 : 0,
                        pointerEvents: activeIndex === i ? "auto" : "none",
                      }}
                    >
                      {c.desc}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* FIELD UPDATES — Lemonade-style 4-column icon row */}
<section className="py-20 px-24 border-t border-border" style={{ background: "hsl(var(--surface))" }}>
  <ScrollReveal>
    <div className="mb-16 pl-0">
      <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3">FIELD UPDATES</p>
      <h2 className="font-heading font-bold text-3xl md:text-4xl capitalize text-foreground" style={{ letterSpacing: "-0.025em" }}>
        Recent impact updates.
      </h2>
    </div>
  </ScrollReveal>

  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-4 gap-6">
      {[
        {
          icon: "/src/assets/FieldUpdates/Water-Conservation--Streamline-Milano.png",
          date: "March 2026",
          title: "Water access for Bishoftu villages",
          body: "Three solar-powered wells came online, serving 2,100 people who previously walked 6km daily for clean water.",
        },
        {
          icon: "/src/assets/FieldUpdates/School-Bus--Streamline-Milano.png",
          date: "January 2026",
          title: "School supply drive — Addis Ababa",
          body: "Distributed 4,200 backpacks, notebooks, and uniforms to children entering Grade 1 across 18 public schools.",
        },
        {
          icon: "/src/assets/FieldUpdates/Ambulance--Streamline-Milano.png",
          date: "November 2025",
          title: "Mobile clinic launches in Hawassa",
          body: "WASS Giveback funded a fully-equipped mobile health unit reaching 6 villages monthly with maternal care.",
        },
        {
          icon: "/src/assets/FieldUpdates/Relief-2--Streamline-Milano.png",
          date: "September 2025",
          title: "Flood relief — Afar region",
          body: "Emergency disbursement of 480,000 ETB delivered tents, food, and medical supplies within 72 hours.",
        },
      ].map((item, i) => (
        <ScrollReveal key={item.title} delay={i * 0.07}>
          <div className="flex flex-col items-center text-center gap-4">
            {/* Circle icon container */}
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "hsl(220 14% 93%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src={item.icon}
                alt={item.title}
                style={{ width: "68px", height: "68px", objectFit: "contain" }}
              />
            </div>

            {/* Date badge */}
            <span className="text-xs font-bold tracking-wider text-primary uppercase">{item.date}</span>

            {/* Title */}
            <h3
              className="font-heading font-bold text-foreground leading-tight"
              style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", letterSpacing: "-0.02em" }}
            >
              {item.title}
            </h3>

            {/* Body */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.body}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </div>
</section>

      {/* TRANSPARENCY — header on white */}
      <section className="py-16 px-24 border-t border-border bg-background">
        <div>
          <ScrollReveal>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3">
              TRANSPARENCY
            </p>
            <h2
              className="font-heading font-bold text-3xl md:text-4xl text-foreground"
              style={{ letterSpacing: "-0.025em" }}
            >
              How we keep ourselves honest.
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* TRANSPARENCY — 3-col × 2-row editorial grid with parallax images */}
      <section className="bg-secondary px-12">
        {/* 3 × 2 Panel Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto",
          }}
        >
          {transparencyPanels.map((p, i) => (
            <div
              key={p.n}
              style={{
                borderLeft: i % 3 !== 0 ? "1px solid hsl(201 65% 20%)" : "none",
                borderTop: i >= 3 ? "1px solid hsl(201 65% 20%)" : "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Text card */}
              <div className="bg-secondary"
                style={{
                  padding: "2.25rem 2rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "hsl(160 55% 55%)",
                  }}
                >
                  {p.label}
                </span>

                <h3
                  className="font-heading"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 1.6vw, 1.45rem)",
                    letterSpacing: "-0.02em",
                    color: "hsl(30 20% 97%)",
                    lineHeight: 1.2,
                    margin: 0,
                    textTransform: "capitalize",
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                    color: "hsl(201 30% 72%)",
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>

                <button
                  style={{
                    alignSelf: "flex-start",
                    marginTop: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.5rem 1.1rem",
                    border: "1px solid hsl(201 50% 35%)",
                    background: "transparent",
                    color: "hsl(30 20% 90%)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "hsl(201 60% 18%)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(160 55% 45%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(201 50% 35%)";
                  }}
                >
                  Learn more
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1.4rem",
                      height: "1.4rem",
                      fontSize: "0.8rem",
                      lineHeight: 1,
                    }}
                  >
                    →
                  </span>
                </button>
              </div>

              {/* Parallax image */}
              <ParallaxImage src={p.image} alt={p.title} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GivebackPage;