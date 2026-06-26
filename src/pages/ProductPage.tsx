import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Car, Home, Briefcase, Plane, Shield, CheckCircle, XCircle, Calculator, Info, Star, Clock, Users, Phone, ArrowRight, ArrowLeft } from "lucide-react";
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
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

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

const testimonials = [
  { name: "Abebe Kebede", role: "Business Owner", quote: "WASS made filing my motor insurance claim effortless. The settlement was fast and the team was incredibly supportive throughout.", rating: 5 },
  { name: "Sara Tadesse", role: "Family Policyholder", quote: "We've trusted WASS with our family's health and life insurance for over 5 years. Their coverage and service are unmatched in Addis.", rating: 5 },
  { name: "Daniel Mekonnen", role: "Fleet Manager", quote: "Managing insurance for our 40+ vehicle fleet is seamless with WASS. Their commercial motor package saves us both time and money.", rating: 5 },
];

const TOTAL = whyChooseUs.length;
const CLONED = [...whyChooseUs, ...whyChooseUs, ...whyChooseUs];

// Fixed strip height = center image (58vh) + card padding top+bottom (40px) + title (~28px) + desc (~60px) + gaps (~18px)
const STRIP_HEIGHT = "calc(58vh + 146px)";

// ─── Focal Spotlight Carousel ─────────────────────────────────────────────
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

  // Slight overshoot on the curve = a livelier, less mechanical resize
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

      {/* Card strip — fixed height, completely separate from the button row below */}
      <div style={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        height: STRIP_HEIGHT,
        overflow: "hidden",
      }}>

        <div style={{
          display: "flex",
          alignItems: "stretch",
          flex: 1,
          overflow: "hidden",
          gap: "10px",
        }}>
          {CLONED.map((item, i) => {
            const role     = getRole(i);
            const isCenter = role === "center";
            const isLeft   = role === "left";
            const isRight  = role === "right";
            const isVis    = role !== "hidden";
            const tr       = (p: string) => animated ? p : "none";

            const cardBg = isCenter
              ? "hsl(152, 48%, 78%)"
              : "hsl(152, 38%, 88%)";

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
                  justifyContent: "flex-start", // top-align everything, center and sides alike
                }}
              >
                {/* Card mat only — no button inside here anymore */}
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

                  {/* Image */}
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

                  {/* Text */}
                  <div style={{
                    paddingTop: isCenter ? "18px" : "10px",
                    transition: tr("padding 0.5s ease"),
                  }}>
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

      {/* Button row — a totally separate block beneath the strip.
          Buttons are pinned at fixed % anchors (matching where the side
          cards sit at rest) and never participate in any card transition,
          so they can't shake, drift, or jump no matter what the boxes do. */}
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

// ──────────────────────────────────────────────────────────────────────────────

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

  const Icon = iconMap[product.icon] || Shield;
  const name = lang === "am" && product.name_am ? product.name_am : product.name;
  const description = lang === "am" && product.full_description_am ? product.full_description_am : product.full_description;
  const coverageList: string[] = Array.isArray(product.coverage_list) ? product.coverage_list : [];
  const exclusions: string[] = Array.isArray(product.exclusions) ? product.exclusions : [];
  const pricingRules = product.pricing_rules || {};

  return (
    <div className="min-h-screen">
      <Navbar />

      <PageHero
        images={[heroProducts, heroProducts2]}
        badge={product.slug.replace(/-/g, " ").toUpperCase()}
        title={<>{name}</>}
        subtitle={description || "Comprehensive coverage tailored to your needs."}
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href="/quote" variant="primary" size="lg">{t("hero.getQuote")}</CTAButton>
          <CTAButton href="/contact" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">
            {t("contact.title") || "Talk to an Agent"}
          </CTAButton>
        </div>
      </PageHero>

      <KeyBenefitsSpotlight name={name} />

      {/* Coverage & Exclusions */}
      <SectionWrapper className="bg-accent/30">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <ScrollReveal animation="fadeLeft">
            <div className="qupe-card h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">{t("products.coverage") || "What's Covered"}</h2>
              </div>
              <ul className="space-y-3">
                {coverageList.map((item: string, i: number) => (
                  <li key={item} className="flex items-start gap-3 group animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}>
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeRight" delay={0.1}>
            <div className="qupe-card h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">{t("products.exclusions") || "Exclusions"}</h2>
              </div>
              <ul className="space-y-3">
                {exclusions.map((item: string, i: number) => (
                  <li key={item} className="flex items-start gap-3 animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${150 + i * 60}ms`, animationFillMode: "backwards" }}>
                    <XCircle className="w-5 h-5 text-destructive/70 mt-0.5 shrink-0" />
                    <span className="text-foreground/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Pricing Explanation */}
      {pricingRules.base_rate && (
        <SectionWrapper>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <Calculator className="w-7 h-7 text-primary" />
                <h2 className="font-heading text-3xl font-bold text-foreground">{t("products.pricingTitle") || "How Pricing Works"}</h2>
              </div>
              <div className="qupe-card space-y-6">
                <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-heading font-semibold text-foreground mb-1">{t("products.pricingBase") || "Base Rate"}</p>
                    <p className="text-muted-foreground text-sm">Starting from <span className="font-bold text-primary">ETB {pricingRules.base_rate?.toLocaleString()}</span> per year</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">{t("products.pricingFactors") || "Factors that affect your premium:"}</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {pricingRules.fields?.map((field: string) => (
                      <div key={field} className="flex items-center gap-3 p-3 bg-accent/50 rounded-xl border border-border animate-in zoom-in-95 duration-500">
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span className="text-sm text-foreground capitalize">{field.replace(/_/g, " ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
                  {t("products.pricingDisclaimer") || "Final premium is calculated based on your specific details. Get an instant quote for your exact price."}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* Customer Testimonials Carousel */}
      <SectionWrapper className="bg-accent/30">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">TESTIMONIALS</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="max-w-4xl mx-auto">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {testimonials.map((item) => (
                <CarouselItem key={item.name} className="md:basis-1/2">
                  <div className="qupe-card h-full transition-all duration-300 hover:-translate-y-1">
                    <div className="flex gap-1 mb-4">
                      {[...Array(item.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground/80 italic mb-6 leading-relaxed">"{item.quote}"</p>
                    <div>
                      <p className="font-heading font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(201,78%,16%)]" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <ScrollReveal animation="scaleUp">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              {t("products.ctaTitle") || "Ready to Get Protected?"}
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Get a personalized quote for {name.toLowerCase()} in minutes. Our agents are standing by to help you find the perfect coverage.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTAButton href="/quote" variant="primary" size="lg">{t("hero.getQuote")}</CTAButton>
              <CTAButton href="/contact" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> Talk to an Agent
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductPage;