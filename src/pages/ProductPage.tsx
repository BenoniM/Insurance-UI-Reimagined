import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Car, Home, Briefcase, Plane, Shield, CheckCircle, XCircle, Calculator, Info, Star, Clock, Users, Phone, ArrowRight } from "lucide-react";
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
  { icon: Shield, title: "NBE Licensed & Regulated", description: "Fully licensed by the National Bank of Ethiopia with strict compliance to all regulatory standards." },
  { icon: Clock, title: "Fast Claims Settlement", description: "Our streamlined process ensures most claims are settled within 3–5 business days." },
  { icon: Users, title: "Dedicated Support Team", description: "Personal account managers available via phone, WhatsApp, and at 12 branch offices." },
  { icon: Star, title: "Competitive Premiums", description: "Affordable rates with flexible payment plans including Telebirr and CBE Birr." },
];

const testimonials = [
  { name: "Abebe Kebede", role: "Business Owner", quote: "WASS made filing my motor insurance claim effortless. The settlement was fast and the team was incredibly supportive throughout.", rating: 5 },
  { name: "Sara Tadesse", role: "Family Policyholder", quote: "We've trusted WASS with our family's health and life insurance for over 5 years. Their coverage and service are unmatched in Addis.", rating: 5 },
  { name: "Daniel Mekonnen", role: "Fleet Manager", quote: "Managing insurance for our 40+ vehicle fleet is seamless with WASS. Their commercial motor package saves us both time and money.", rating: 5 },
];

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

      {/* Key Benefits Carousel */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-block">KEY BENEFITS</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
              Why Choose <span className="text-primary">{name}</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="max-w-5xl mx-auto">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {whyChooseUs.map((item, i) => (
                <CarouselItem key={item.title} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <ScrollReveal delay={i * 0.08}>
                    <div className="rounded-3xl p-8 h-full bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)] text-white shadow-lg relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]">
                      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/10" />
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 relative z-10">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-white mb-2 relative z-10">{item.title}</h3>
                      <p className="text-sm text-white/75 leading-relaxed relative z-10">{item.description}</p>
                    </div>
                  </ScrollReveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </SectionWrapper>

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
              {testimonials.map((item, i) => (
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
