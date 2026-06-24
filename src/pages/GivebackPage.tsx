import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import CTAButton from "@/components/CTAButton";
import GivebackSection from "@/components/GivebackSection";
import { motion } from "framer-motion";
import {
  Heart,
  Droplet,
  GraduationCap,
  Stethoscope,
  TrendingUp,
  Users,
  ArrowRight,
  Quote as QuoteIcon,
  CheckCircle,
  Calendar,
} from "lucide-react";
import heroAbout from "@/assets/hero-about.jpg";
import heroAbout2 from "@/assets/hero-about-2.jpg";

const yearlyImpact = [
  { year: "2026", total: "4.2M ETB", projects: 38, beneficiaries: "12,400+" },
  { year: "2025", total: "3.1M ETB", projects: 27, beneficiaries: "9,200+" },
  { year: "2024", total: "1.8M ETB", projects: 14, beneficiaries: "5,600+" },
  { year: "2023", total: "640K ETB", projects: 6, beneficiaries: "1,900+" },
];

const causeBreakdown = [
  { icon: Droplet, title: "Clean Water", pct: 32, desc: "12 wells funded across Oromia & SNNPR.", color: "from-[hsl(205,65%,48%)] to-[hsl(201,78%,23%)]" },
  { icon: GraduationCap, title: "Education", pct: 28, desc: "1,840 scholarships and school-supply kits.", color: "from-[hsl(160,55%,45%)] to-[hsl(160,50%,55%)]" },
  { icon: Stethoscope, title: "Healthcare", pct: 24, desc: "4 mobile clinics serving rural districts.", color: "from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)]" },
  { icon: Heart, title: "Disaster Relief", pct: 16, desc: "Emergency grants during floods in Awash.", color: "from-[hsl(160,55%,45%)] to-[hsl(205,65%,48%)]" },
];

const updates = [
  {
    date: "March 2026",
    title: "Water access for Bishoftu villages",
    body: "Three solar-powered wells came online, serving 2,100 people who previously walked 6km daily for clean water.",
  },
  {
    date: "January 2026",
    title: "School supply drive — Addis Ababa",
    body: "Distributed 4,200 backpacks, notebooks, and uniforms to children entering Grade 1 across 18 public schools.",
  },
  {
    date: "November 2025",
    title: "Mobile clinic launches in Hawassa",
    body: "WASS Giveback funded a fully-equipped mobile health unit reaching 6 villages monthly with maternal care.",
  },
  {
    date: "September 2025",
    title: "Flood relief — Afar region",
    body: "Emergency disbursement of 480,000 ETB delivered tents, food, and medical supplies within 72 hours.",
  },
];

const testimonials = [
  {
    quote: "I never thought my insurance would help my daughter go to school. The scholarship from WASS Giveback changed our family.",
    name: "Almaz T.",
    role: "Policyholder, Adama",
  },
  {
    quote: "The mobile clinic comes to our village every month. My mother gets her diabetes medication without traveling four hours.",
    name: "Dawit G.",
    role: "Policyholder, Hawassa",
  },
];

const GivebackPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHero
        images={[heroAbout, heroAbout2]}
        badge="WASS GIVEBACK"
        title={<>Insurance with a <span className="text-primary">heart</span></>}
        subtitle="Every Birr we don't pay in claims goes back to causes our customers chose. Over 4.2M ETB returned to Ethiopian communities — and counting."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href="/quote" variant="primary" size="lg">Join the movement</CTAButton>
          <a
            href="#impact"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
          >
            See the impact <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </PageHero>

      {/* Reuse the homepage Giveback section for the "how it works" + causes */}
      <GivebackSection />

      {/* Yearly impact */}
      <SectionWrapper id="impact" className="bg-accent/30">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">YEAR-OVER-YEAR</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              Impact, in <span className="text-primary">numbers</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We publish our Giveback totals every year. Here's what your policy has helped fund.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {yearlyImpact.map((y, i) => (
            <ScrollReveal key={y.year} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                className="qupe-card !p-7 h-full text-center"
              >
                <div className="text-xs font-bold tracking-widest text-primary mb-2">{y.year}</div>
                <div className="font-heading text-3xl font-bold text-foreground mb-1">{y.total}</div>
                <div className="text-xs text-muted-foreground mb-4">returned to causes</div>
                <div className="border-t border-border pt-4 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Projects</span><span className="font-semibold text-foreground">{y.projects}</span></div>
                  <div className="flex justify-between"><span>Beneficiaries</span><span className="font-semibold text-foreground">{y.beneficiaries}</span></div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Cause breakdown */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">2026 ALLOCATION</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              Where the <span className="text-primary">money went</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Customers vote at signup. Here's how our 4.2M ETB was allocated this year.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {causeBreakdown.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-3xl p-7 bg-gradient-to-br ${c.color} text-white shadow-lg relative overflow-hidden h-full`}
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                    <c.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-heading font-semibold text-lg text-white mb-1">{c.title}</h4>
                  <div className="font-heading text-3xl font-bold text-white mb-2">{c.pct}%</div>
                  <div className="h-1.5 rounded-full bg-white/20 overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                      className="h-full bg-white"
                    />
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Recent updates */}
      <SectionWrapper className="bg-accent/30">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">FIELD UPDATES</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              Recent <span className="text-primary">impact updates</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Stories from the ground — what your premium has helped make happen this season.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {updates.map((u, i) => (
            <ScrollReveal key={u.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="qupe-card !p-6 flex gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-wider text-primary uppercase mb-1">{u.date}</div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1.5">{u.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{u.body}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Voices */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">VOICES FROM COMMUNITIES</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              Real <span className="text-primary">stories</span>, real change
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.08}>
              <div className="qupe-card !p-8 h-full relative">
                <QuoteIcon className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
                <p className="text-foreground/90 text-base leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div>
                  <div className="font-heading font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Transparency */}
      <SectionWrapper className="bg-accent/30">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="section-badge mb-4 inline-block">TRANSPARENCY</span>
              <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
                How we keep ourselves <span className="text-primary">honest</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Annual third-party audit by an independent Ethiopian firm.",
                "Live impact tracker — updated quarterly on this page.",
                "100% of unclaimed premiums (after fixed fee) go to causes.",
                "Nonprofit partners are vetted and publicly listed.",
                "Customers vote on causes during signup — no surprises.",
                "Field reports published for every funded project.",
              ].map((item) => (
                <div key={item} className="flex gap-3 p-4 rounded-2xl bg-card border border-border">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/85">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(160,55%,40%)]" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <ScrollReveal animation="scaleUp">
            <h2 className="qupe-heading text-3xl md:text-4xl text-white mb-4">
              Your premium can do more than protect you.
            </h2>
            <p className="text-white/75 mb-8 max-w-xl mx-auto">
              Get a quote, pick your cause, and join 50,000+ Ethiopians lifting up the country we share.
            </p>
            <CTAButton href="/quote" variant="primary" size="lg" className="!bg-white !text-[hsl(201,78%,23%)] hover:!bg-white/90">
              Start your quote <ArrowRight className="w-4 h-4 ml-1" />
            </CTAButton>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GivebackPage;
