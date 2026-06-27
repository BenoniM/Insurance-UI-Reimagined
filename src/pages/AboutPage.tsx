import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ExpandingHero from "@/components/ExpandingHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Users, Award, Target } from "lucide-react";
import aboutHero from "@/assets/hero-about.jpg";
import aboutHero2 from "@/assets/hero-about-2.jpg";
import heroHome2 from "@/assets/hero-home-2.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const stats = [
  { value: "15+", label: "Years of Service" },
  { value: "50K+", label: "Satisfied Clients" },
  { value: "200+", label: "Partner Network" },
  { value: "12", label: "Branch Offices" },
  { value: "98%", label: "Claims Approval" },
  { value: "24/7", label: "Customer Support" },
];

const values = [
  {
    icon: Shield,
    title: "Provide",
    description:
      "Provide the best health focused insurance policy for every client we serve.",
  },
  {
    icon: Users,
    title: "Maximize",
    description:
      "Maximize the return to shareholders investment through efficient insurance services provision.",
  },
  {
    icon: Award,
    title: "Reverse",
    description:
      "Reverses the traditional insurance model — putting health and people first in every decision.",
  },
  {
    icon: Target,
    title: "Many More",
    description:
      "Different other insurance business lines to meet the diverse needs of our clients.",
  },
];

const milestones = [
  {
    year: "2010",
    event:
      "WASS Insurance founded in Addis Ababa, licensed by the National Bank of Ethiopia",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1600&q=80",
  },
  {
    year: "2013",
    event: "Expanded to 5 branch offices across major Ethiopian cities",
    image:
      "https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=1600&q=80",
  },
  {
    year: "2016",
    event: "Launched comprehensive motor and property insurance products",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&q=80",
  },
  {
    year: "2018",
    event: "Reached 20,000 active policyholders milestone",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80",
  },
  {
    year: "2020",
    event:
      "Introduced digital claims processing and Telebirr payment integration",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
  },
  {
    year: "2023",
    event:
      "Grew partner network to 200+ institutions, serving 50,000+ clients",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80",
  },
  {
    year: "2025",
    event:
      "12 branches nationwide, leading innovation in Ethiopian insurance",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
  },
];

const leadership = [
  {
    name: "አቶ ሄኖክ ተካ",
    nameEn: "Ato Henok Teka",
    role: "የአደራጅ ኮሚቴው ሰብሳቢና አስተባባሪ",
    roleEn: "Founding Committee Chair & Coordinator",
    description:
      "Leading the formation of WASS Insurance with a vision to deliver the best health-focused insurance products in Ethiopia.",
  },
  {
    name: "ዶ/ር አብዲ ኤርሞሎ",
    nameEn: "Dr. Abdi Ermolo",
    role: "የአደራጅ ኮሚቴው ምክትል ሰብሳቢ",
    roleEn: "Deputy Chair, Founding Committee",
    description:
      "Bringing expert leadership and strategic direction to guide WASS Insurance's foundational development.",
  },
  {
    name: "አቶ አማረ ሃበ",
    nameEn: "Ato Amare Habe",
    role: "የአደራጅ ኮሚቴ አባል እና የፕሮጀክት ሥራ አስኪያጅ",
    roleEn: "Founding Committee Member & Project Manager",
    description:
      "Overseeing project operations and ensuring the company's formation milestones are achieved on time.",
  },
];

const AboutPage = () => {
  const tlSectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const section = tlSectionRef.current;
    if (!section) return;

const onScroll = () => {
  const { top, height } = section.getBoundingClientRect();
  const scrolled = -top;
  const scrollable = height - window.innerHeight;
  const progress = Math.max(0, Math.min(1, scrolled / scrollable));

  // active index
  const idx = Math.min(
    milestones.length - 1,
    Math.floor(progress * milestones.length)
  );
  setActiveIndex(idx);

  // parallax: simple continuous offset from total progress
  // as you scroll down the page, images drift downward 0 → 80px
  const parallaxY = progress * 80;
  setParallaxOffset(parallaxY);
};

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (i) => {
    const section = tlSectionRef.current;
    if (!section) return;
    const scrollable = section.offsetHeight - window.innerHeight;
    const target =
      section.offsetTop + (scrollable * i) / milestones.length;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <ExpandingHero
        images={[
          "https://images.pexels.com/photos/8124412/pexels-photo-8124412.jpeg",
          "https://images.pexels.com/photos/7979460/pexels-photo-7979460.jpeg",
          "https://images.pexels.com/photos/9488846/pexels-photo-9488846.jpeg",
          "https://images.pexels.com/photos/8124247/pexels-photo-8124247.jpeg",
        ]}
        badge="ABOUT WASS"
        headline={'Ethiopia\'s Trusted <span class="text-primary">Insurance Partner</span>'}
        subtitle="WASS Insurance is under formation with a principal aim of providing the best health focused insurance policy."
        ctaLabel="Get a Free Quote"
        ctaHref="/quote"
      />

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="w-full min-h-16 py-4 bg-gray-50 border-y border-gray-100 flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 flex justify-center items-center gap-x-6 md:gap-x-12 gap-y-4 flex-wrap">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} animation="fadeUp" delay={i * 0.05}>
              <div className="group flex items-baseline gap-1.5 whitespace-nowrap opacity-80 hover:opacity-100 transition-all cursor-default font-hero">
                <span className="text-lg md:text-xl font-bold tracking-tight text-gray-500 group-hover:text-[#288A69] transition-colors">{stat.value}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#288A69]/80 transition-colors font-sans">{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────────── */}
      <section className="about-story-section">
        <div className="about-container-full">
          <div className="about-story-layout">

            <div className="about-zone-1">
              <ScrollReveal animation="fadeLeft">
                <span className="about-eyebrow">WHY CHOOSE US</span>
                <h2 className="about-huge-title">
                  Why You Should Choose <br className="hidden lg:block" />
                  <span className="text-primary">WASS Insurance</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="fadeUp" delay={0.1}>
                <div className="about-story-image-wrap mt-8 lg:mt-12">
                  <img
                    src="https://images.pexels.com/photos/7971363/pexels-photo-7971363.jpeg"
                    alt="WASS Insurance team"
                    className="about-story-image"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="about-zone-2">
              <ScrollReveal animation="fadeRight" delay={0.2}>
                <p>
                  WASS Insurance is under formation with a principal aim of
                  providing the best health focused insurance policy and other
                  insurance business, and maximize the return to shareholders
                  investment through efficient insurance services provision.
                </p>
                <p>
                  We reverse the traditional insurance model — putting health,
                  people, and community first. Our approach combines deep local
                  expertise with a commitment to transparency, reliability, and
                  accessibility for every Ethiopian.
                </p>
                <p>
                  From comprehensive health coverage to motor, property, and
                  commercial insurance, WASS is building a network of partners
                  and services designed to protect Ethiopian families and
                  businesses for generations.
                </p>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────── */}
      <section className="tl-section" ref={tlSectionRef}>
        <div className="tl-sticky">

          {/* Background images */}
          <div className="tl-images">
{milestones.map((item, i) => (
  <div
    key={item.year}
    className={`tl-image${activeIndex === i ? " tl-image--active" : ""}`}
    style={{
      backgroundImage: `url(${item.image})`,
      transform: `translateY(${parallaxOffset}px)`,
    }}
  />
))}
            <div className="tl-image-overlay" />
          </div>

          <div className="absolute top-5 left-0 w-full flex justify-center z-10 pointer-events-none">
            <h2 className="text-primary text-5xl md:text-6xl font-hero font-bold opacity-95">Our Journey</h2>
          </div>

          {/* Top-left — giant year + eyebrow + date list */}
          <div className="tl-dates">
            <span className="text-primary font-bold text-2xl tracking-widest" style={{ marginTop: '0.8rem' }}>MILESTONES</span>
            <div className="tl-dates-list">
              {milestones.map((item, i) => (
                <button
                  key={item.year}
                  className={`tl-date${activeIndex === i ? " tl-date--active" : ""}`}
                  onClick={() => scrollToIndex(i)}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom-right — description */}
          <div className="tl-desc-wrap">
            <p className="tl-desc">{milestones[activeIndex]?.event}</p>
          </div>

        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────── */}
      <section className="about-values-section">
        <div className="about-container">
          <ScrollReveal>
            <div className="about-section-header">
              <span className="about-eyebrow about-eyebrow--light">
                OUR VALUES
              </span>
              <h2 className="about-section-heading about-section-heading--light">
                What Drives Us{" "}
                <span className="about-heading-accent">Every Day</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="about-values-grid">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} animation="fadeUp" delay={i * 0.08}>
                <div className="about-value-card">
                  <div className="about-value-index">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="about-value-icon-wrap">
                    <v.icon className="about-value-icon" />
                  </div>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ────────────────────────────────────────────── */}
      <section className="about-leadership-section">
        <div className="about-container">
          <ScrollReveal>
            <div className="about-section-header">
              <span className="about-eyebrow">LEADERSHIP</span>
              <h2 className="about-section-heading">
                Founding <span className="text-primary">Committee</span>
              </h2>
              <p className="about-section-sub">
                Led by experienced professionals committed to building
                Ethiopia's premier health-focused insurance company.
              </p>
            </div>
          </ScrollReveal>

          <div className="about-leadership-list">
            {leadership.map((person, i) => (
              <ScrollReveal key={person.name} delay={i * 0.06}>
                <div className="about-leader-row">
                  <div className="about-leader-index">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="about-leader-info">
                    <p className="about-leader-name">{person.name}</p>
                    <p className="about-leader-name-en">{person.nameEn}</p>
                    <p className="about-leader-role">{person.roleEn}</p>
                  </div>
                  <p className="about-leader-desc">{person.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>



      {/* ── STYLES ────────────────────────────────────────────────── */}
      <style>{`

        /* ─── Shared Layout ──────────────────────────────────── */
        .about-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .about-container-full {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        @media (min-width: 768px) { .about-container-full { padding: 0 3rem; } }
        @media (min-width: 1024px) { .about-container-full { padding: 0 4rem; } }

        /* ─── Eyebrow label ─────────────────────────────────── */
        .about-eyebrow {
          display: inline-block;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          margin-bottom: 1.25rem;
        }
        .about-eyebrow--light { color: hsl(var(--primary)); }
        .about-eyebrow--centered { display: block; text-align: center; }

        /* ─── Section headings ──────────────────────────────── */
        .about-section-heading {
          font-family: var(--font-heading, inherit);
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 700;
          line-height: 1.15;
          color: hsl(var(--foreground));
          margin: 0 0 1rem;
        }
        .about-section-heading--light { color: #fff; }
        .about-heading-accent { color: hsl(var(--primary)); }
        .about-section-header { margin-bottom: 3.5rem; }
        .about-section-sub {
          margin-top: 0.75rem;
          color: hsl(var(--muted-foreground));
          max-width: 36rem;
          line-height: 1.65;
          font-size: 0.9375rem;
        }

        /* ─── Divider ────────────────────────────────────────── */
        .about-divider {
          width: 2.5rem;
          height: 2px;
          background: hsl(var(--primary));
          margin: 1.5rem 0 2rem;
        }


        /* ─── STORY ──────────────────────────────────────────── */
        .about-story-section {
          padding: 6rem 0;
        }
        .about-story-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .about-story-layout {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 4rem;
            align-items: start;
          }
          .about-zone-1 {
            grid-column: 1 / 7;
          }
          .about-zone-2 {
            grid-column: 8 / 13;
            padding-top: 2.5rem;
          }
        }
        
        .about-huge-title {
          font-family: var(--font-heading, inherit);
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          font-weight: 800;
          line-height: 1.08;
          color: hsl(var(--foreground));
          margin: 0;
          letter-spacing: -0.02em;
        }

        .about-zone-2 p {
          font-size: 1.05rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .about-zone-2 p:last-child {
          margin-bottom: 0;
        }

        .about-story-image-wrap {
          overflow: hidden;
          width: 100%;
          max-width: 440px;
          aspect-ratio: 4/3;
          border-radius: 0.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .about-story-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .about-story-image-wrap:hover .about-story-image { transform: scale(1.02); }

        /* ─── TIMELINE ───────────────────────────────────────── */
        .tl-section {
          height: 700vh;
          position: relative;
        }
        .tl-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        /* Background images */
        .tl-images {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
.tl-image {
  position: absolute;
  inset: -10% 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: translateY(0px);
  transition: opacity 0.7s ease;
  will-change: opacity, transform;
}
        .tl-image--active {
          opacity: 1;
        }
        .tl-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.72) 0%,
            rgba(0,0,0,0.25) 45%,
            rgba(0,0,0,0.55) 100%
          );
        }

        /* Top-left: giant year + date list side by side */
        .tl-dates {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 1.5rem;
          padding: 0 0 0 5rem;
          margin-top: 18vh;
        }

        /* Giant year stamp left of list */
        .tl-milestone-year {
          font-family: var(--font-heading, inherit);
          font-size: clamp(7rem, 14vw, 12rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          color: rgba(74, 222, 128, 0.18);
          text-shadow: 0 0 80px rgba(74, 222, 128, 0.12);
          user-select: none;
          pointer-events: none;
          transition: color 0.5s ease;
          flex-shrink: 0;
          align-self: flex-end;
          padding-bottom: 0.1em;
        }

        /* Eyebrow + year button list column */
        .tl-dates-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-bottom: 0.5rem;
        }
        .tl-eyebrow {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.40);
          margin-bottom: 1.5rem;
          display: block;
        }
        .tl-date {
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 0.2rem 0;
          font-family: var(--font-heading, inherit);
          font-size: clamp(1rem, 1.8vw, 1.4rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.25);
          transition: color 0.35s ease, font-size 0.35s ease;
          line-height: 1.25;
        }
        .tl-date--active {
          color: #fff;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
        }

        /* Bottom-right description */
        .tl-desc-wrap {
          position: absolute;
          bottom: 6rem;
          right: 6rem;
          z-index: 1;
          max-width: 340px;
          text-align: left;
        }
        .tl-desc {
          color: rgba(255,255,255,0.85);
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          line-height: 1.75;
          margin: 0;
        }

        /* ─── VALUES ─────────────────────────────────────────── */
        .about-values-section {
          padding: 6rem 0;
          background: hsl(201 78% 14%);
          border-bottom: 1px solid hsl(201 78% 10%);
        }
        .about-values-section .about-section-header { margin-bottom: 4rem; }
        .about-values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: hsl(201 78% 10%);
          border: 1px solid hsl(201 78% 10%);
        }
        @media (min-width: 640px) {
          .about-values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .about-values-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .about-value-card {
          padding: 2.5rem 2rem;
          background: hsl(201 78% 17%);
          position: relative;
          transition: background 0.25s;
          height: 100%;
          box-sizing: border-box;
        }
        .about-value-card:hover { background: hsl(201 78% 20%); }
        .about-value-index {
          font-family: var(--font-heading, inherit);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: hsl(var(--primary) / 0.6);
          margin-bottom: 1.5rem;
        }
        .about-value-icon-wrap {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          border: 1px solid hsl(var(--primary) / 0.3);
        }
        .about-value-icon { width: 1.125rem; height: 1.125rem; color: hsl(var(--primary)); }
        .about-value-title {
          font-family: var(--font-heading, inherit);
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.875rem;
          letter-spacing: 0.01em;
        }
        .about-value-desc { font-size: 0.8125rem; color: rgba(255,255,255,0.55); line-height: 1.7; }

        /* ─── LEADERSHIP ─────────────────────────────────────── */
        .about-leadership-section {
          padding: 6rem 0;
          border-bottom: 1px solid hsl(var(--border));
        }
        .about-leadership-list { border-top: 1px solid hsl(var(--border)); }
        .about-leader-row {
          display: grid;
          grid-template-columns: 3rem 1fr;
          gap: 0 2rem;
          align-items: baseline;
          padding: 2rem 0;
          border-bottom: 1px solid hsl(var(--border));
          transition: background 0.2s;
        }
        @media (min-width: 768px) {
          .about-leader-row { grid-template-columns: 3rem 1fr 1fr; }
        }
        .about-leader-row:hover {
          background: hsl(var(--accent) / 0.3);
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          margin-left: -0.75rem;
          margin-right: -0.75rem;
        }
        .about-leader-index {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: hsl(var(--primary) / 0.6);
          padding-top: 0.1rem;
        }
        .about-leader-info { display: flex; flex-direction: column; gap: 0.2rem; }
        .about-leader-name {
          font-family: var(--font-heading, inherit);
          font-size: 1rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          line-height: 1.2;
        }
        .about-leader-name-en {
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
          margin-top: 0.1rem;
        }
        .about-leader-role {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          margin-top: 0.2rem;
        }
        .about-leader-desc {
          display: none;
          font-size: 0.8125rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.65;
        }
        @media (min-width: 768px) { .about-leader-desc { display: block; } }


      `}</style>

      <Footer />
    </div>
  );
};

export default AboutPage;