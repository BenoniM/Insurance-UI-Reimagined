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

const GivebackPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const isMobile = window.innerWidth < 768;
    const triggers = containerRef.current?.querySelectorAll(isMobile ? '.cause-row-mobile' : '.cause-trigger');
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
                        transform: isActive ? "translateX(10px)" : "translateX(0px)"
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
                        pointerEvents: activeIndex === i ? 'auto' : 'none'
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

      {/* FIELD UPDATES — 2-column editorial grid */}
      <section className="py-20 px-6 border-t border-border" style={{ background: "hsl(var(--surface))" }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3">FIELD UPDATES</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-12" style={{ letterSpacing: "-0.025em" }}>
              Recent impact updates.
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {updates.map((u, i) => (
              <ScrollReveal key={u.title} delay={i * 0.07}>
                <article className="group cursor-default">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-4 h-4 shrink-0 text-primary" />
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">{u.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                    {u.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{u.body}</p>
                  <div className="mt-4 h-[1px] bg-border w-0 group-hover:w-full transition-all duration-500" />
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VOICES — dark testimonials */}
      <section className="py-20 px-6 border-t border-border" style={{ background: "hsl(201 78% 14%)" }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "hsl(160 55% 55%)" }}>
              VOICES FROM COMMUNITIES
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-14 leading-tight" style={{ color: "hsl(30 20% 97%)", letterSpacing: "-0.025em" }}>
              Real stories, real change.
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div className="group">
                  <QuoteIcon className="w-6 h-6 mb-5 text-primary" />
                  <p className="font-heading text-xl md:text-2xl leading-relaxed mb-6 italic" style={{ color: "hsl(30 20% 88%)", letterSpacing: "-0.01em" }}>
                    "{t.quote}"
                  </p>
                  <div className="h-[1px] mb-5" style={{ background: "hsl(201 65% 24%)" }} />
                  <div className="font-heading font-semibold" style={{ color: "hsl(30 20% 97%)" }}>{t.name}</div>
                  <div className="text-xs tracking-widest uppercase mt-0.5" style={{ color: "hsl(201 60% 50%)" }}>{t.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY — 3-col numbered checklist */}
      <section className="py-20 px-6 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3">TRANSPARENCY</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-12" style={{ letterSpacing: "-0.025em" }}>
              How we keep ourselves honest.
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-0 divide-y sm:divide-y-0 divide-border border-t border-border">
            {[
              { n: "01", text: "Annual third-party audit by an independent Ethiopian firm." },
              { n: "02", text: "Live impact tracker — updated quarterly on this page." },
              { n: "03", text: "100% of unclaimed premiums (after fixed fee) go to causes." },
              { n: "04", text: "Nonprofit partners are vetted and publicly listed." },
              { n: "05", text: "Customers vote on causes during signup — no surprises." },
              { n: "06", text: "Field reports published for every funded project." },
            ].map((item) => (
              <ScrollReveal key={item.n}>
                <div className="flex gap-4 p-6 group cursor-default hover:bg-accent/40 transition-colors duration-200">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                  <div>
                    <p className="text-xs font-bold tracking-widest text-primary mb-1">{item.n}</p>
                    <p className="text-sm text-foreground/85 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GivebackPage;
