import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpandingHeroSVG from "@/components/ExpandingHeroSVG";
import GivebackSection from "@/components/GivebackSection";
import ScrollReveal from "@/components/ScrollReveal";
import CTAButton from "@/components/CTAButton";
import csrHeroImage from "@/assets/GivebackHero/ChatGPT Image Aug 7, 2026, 11_36_03 AM (1).png";

import { useEffect, useState, useRef } from "react";
import {
  Quote as QuoteIcon,
  CheckCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";

const yearlyImpact = [
  { year: "2026", total: "4.2M ETB", projects: 38, beneficiaries: "12,400+" },
  { year: "2025", total: "3.1M ETB", projects: 27, beneficiaries: "9,200+" },
  { year: "2024", total: "1.8M ETB", projects: 14, beneficiaries: "5,600+" },
  { year: "2023", total: "640K ETB", projects: 6, beneficiaries: "1,900+" },
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

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      {/* ── MOBILE HERO (image below text, no cropping) ── */}
      <section className="block md:hidden bg-[#FBFAFA] overflow-hidden">
        <div className="flex flex-col items-center text-center px-4 pt-28 pb-6">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6">
            GIVEBACK
          </span>
          <h1
            className="text-4xl font-bold tracking-tight text-[hsl(201,78%,20%)] mb-6 max-w-4xl"
            dangerouslySetInnerHTML={{ __html: 'Insurance That <span class="text-[#288A69]">Gives Back</span>' }}
          />
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Earn rewards for healthy living and a claims-free year. WASS puts people first.
          </p>
          <CTAButton href="/quote" size="lg">
            Learn More
          </CTAButton>
        </div>
        {/* Full-width image at natural aspect ratio — no cropping */}
        <div className="w-screen">
          <img
            src={csrHeroImage}
            alt="CSR Background"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
      </section>

      {/* ── DESKTOP HERO (full-screen background image) ── */}
      <section className="hidden md:flex relative h-screen items-center justify-center overflow-hidden px-4 bg-[#FBFAFA]">
        <div className="absolute inset-0 z-0">
          <img
            src={csrHeroImage}
            alt="CSR Background"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6">
            GIVEBACK
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-[hsl(201,78%,20%)] mb-6 max-w-4xl"
            dangerouslySetInnerHTML={{ __html: 'Insurance That <span class="text-[#288A69]">Gives Back</span>' }}
          />
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Earn rewards for healthy living and a claims-free year. WASS puts people first.
          </p>
          <CTAButton href="/quote" size="lg">
            Learn More
          </CTAButton>
        </div>
      </section>

      {/* How it works + causes + impact callout */}
      <GivebackSection />

      {/* Impact callout */}
      <ScrollReveal delay={0.2}>
        <div
          className="relative mx-auto my-8 w-full max-w-[1450px] overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(201,78%,18%)] p-8 text-white shadow-xl md:my-10 md:p-10"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/15" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex-1 max-w-3xl flex flex-col items-center md:items-start">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-bold tracking-wider uppercase text-white/90 mb-3">
                IMPACT TO DATE
              </span>
              <h3 className="qupe-heading text-2xl md:text-3xl text-white mb-2 text-center md:text-left w-full">
                Over 4.2M Birr returned to Ethiopian communities
              </h3>
              <p className="text-white/75 text-sm md:text-base leading-relaxed text-center md:text-left">
                Funding clean water projects, scholarships, mobile clinics, and emergency response — chosen by you, the policyholder. Your coverage doesn't just protect you, it lifts up the country we all share.
              </p>
            </div>
            <div className="shrink-0">
              <CTAButton href="/quote" variant="secondary" size="lg" className="!bg-primary !text-[hsla(0, 0%, 100%, 1.00)] hover:!bg-primary/90">
                Join the movement <ArrowRight className="w-4 h-4 ml-1" />
              </CTAButton>
            </div>
          </div>
        </div>
      </ScrollReveal>


      {/* TRANSPARENCY — header on white */}
      <section className="py-10 px-6 md:px-12 lg:px-24 border-t border-border bg-background">
        <div className="flex flex-col items-center text-center w-full">
          <ScrollReveal>
            <div className="flex flex-col items-center">
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3">
                TRANSPARENCY
              </p>
              <h2
                className="section-title text-foreground capitalize"
                style={{ letterSpacing: "-0.025em" }}
              >
                How we keep ourselves honest.
              </h2>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TRANSPARENCY — 3-col × 2-row editorial grid with parallax images */}
      <section className="px-4 sm:px-8 md:px-12 pb-8 md:pb-12" style={{
        background: `
          radial-gradient(circle at 12% 18%, hsl(var(--teal) / 0.42) 0%, transparent 32%),
          radial-gradient(circle at 88% 82%, hsl(var(--sky) / 0.4) 0%, transparent 34%),
          linear-gradient(135deg, hsl(201 78% 12%) 0%, hsl(var(--navy)) 42%, hsl(201 70% 18%) 68%, hsl(var(--teal-dark)) 100%)
        `,
      }}>
        {/* 3 × 2 Panel Grid — never more than three panels per row */}
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {transparencyPanels.map((p, i) => (
            <div
              key={p.n}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Text card */}
              <div
                style={{
                  padding: "2.25rem 2rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  flex: 1,
                  minHeight: "280px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "hsl(160 55% 55%)",
                    textAlign: "center",
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
                    textAlign: "center",
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
                    textAlign: "center",
                  }}
                >
                  {p.body}
                </p>

                <button
                  style={{
                    alignSelf: "center",
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
              <div style={{ borderRadius: "1.5rem", overflow: "hidden" }}>
                <ParallaxImage src={p.image} alt={p.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GivebackPage;
