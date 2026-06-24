import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import CTAButton from "@/components/CTAButton";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Users, Award, Target, Building2, Handshake, Globe, TrendingUp, CheckCircle } from "lucide-react";
import aboutHero from "@/assets/hero-about.jpg";
import aboutHero2 from "@/assets/hero-about-2.jpg";
import heroHome2 from "@/assets/hero-home-2.jpg";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const stats = [
  { value: "15+", label: "Years of Service", gradient: "from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)]" },
  { value: "50,000+", label: "Satisfied Clients", gradient: "from-[hsl(160,55%,45%)] to-[hsl(160,50%,55%)]" },
  { value: "200+", label: "Partner Network", gradient: "from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)]" },
  { value: "12", label: "Branch Offices", gradient: "from-[hsl(205,65%,48%)] to-[hsl(201,78%,23%)]" },
  { value: "98%", label: "Claims Approval", gradient: "from-[hsl(160,55%,45%)] to-[hsl(201,78%,23%)]" },
  { value: "24/7", label: "Customer Support", gradient: "from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)]" },
];

const values = [
  { icon: Shield, title: "Integrity", description: "We operate with full transparency and honesty in every policyholder interaction, ensuring ethical business practices." },
  { icon: Users, title: "Customer First", description: "Our clients' protection needs drive every decision and product we design, with dedicated account managers for personalized service." },
  { icon: Award, title: "Excellence", description: "We maintain the highest standards in underwriting, claims processing, and service delivery across all our operations." },
  { icon: Target, title: "Innovation", description: "We leverage technology to deliver faster, smarter insurance experiences, including mobile payments and digital claims." },
];

const milestones = [
  { year: "2010", event: "WASS Insurance founded in Addis Ababa, licensed by the National Bank of Ethiopia" },
  { year: "2013", event: "Expanded to 5 branch offices across major Ethiopian cities" },
  { year: "2016", event: "Launched comprehensive motor and property insurance products" },
  { year: "2018", event: "Reached 20,000 active policyholders milestone" },
  { year: "2020", event: "Introduced digital claims processing and Telebirr payment integration" },
  { year: "2023", event: "Grew partner network to 200+ institutions, serving 50,000+ clients" },
  { year: "2025", event: "12 branches nationwide, leading innovation in Ethiopian insurance" },
];

const leadership = [
  { name: "Ato Bekele Worku", role: "Chief Executive Officer", description: "25+ years in Ethiopian insurance and finance. Former VP at Ethiopian Insurance Corporation." },
  { name: "W/ro Tigist Hailu", role: "Chief Operations Officer", description: "Expert in insurance operations and digital transformation with international experience." },
  { name: "Ato Dawit Assefa", role: "Chief Underwriting Officer", description: "Specialized in risk assessment and product development for the Ethiopian market." },
  { name: "W/ro Meron Tadesse", role: "Head of Claims", description: "Dedicated to fast, fair claims settlement with a 98% customer satisfaction rate." },
];

const AboutPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <PageHero
      images={[aboutHero, aboutHero2, heroHome2]}
      badge="ABOUT WASS"
      title={<>Ethiopia's Trusted <span className="text-primary">Insurance Partner</span></>}
      subtitle="Founded in 2010 and licensed by the National Bank of Ethiopia, WASS Insurance has grown to serve over 50,000 clients with comprehensive, affordable coverage across the nation."
    />

    {/* Stats */}
    <SectionWrapper>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} animation="scaleUp" delay={i * 0.06}>
            <div
              className={`rounded-3xl p-6 text-center bg-gradient-to-br ${stat.gradient} text-white shadow-lg relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03]`}
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
              <p className="font-heading text-3xl font-bold text-white relative z-10">{stat.value}</p>
              <p className="text-xs text-white/70 mt-1 relative z-10">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>

    {/* Our Story */}
    <SectionWrapper className="bg-accent/30">
      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
        <ScrollReveal animation="fadeLeft">
          <div>
            <span className="section-badge mb-6 inline-block">OUR STORY</span>
            <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4 mb-6">
              Protecting Ethiopian Families & Businesses Since <span className="text-primary">2010</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">WASS Insurance was founded with a clear mission: to make quality insurance accessible, transparent, and reliable for every Ethiopian. Licensed and regulated by the National Bank of Ethiopia (NBE), we combine deep local expertise with international best practices.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">From our humble beginnings with a single office in Addis Ababa, we've grown to operate 12 branch offices across the country, serving over 50,000 satisfied clients. Our team of 300+ insurance professionals is dedicated to providing personalized service.</p>
            <p className="text-muted-foreground leading-relaxed">We offer comprehensive coverage across life, health, motor, property, and commercial insurance — backed by a growing network of 200+ healthcare providers, repair facilities, and institutional partners.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal animation="fadeRight" delay={0.15}>
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {[aboutHero, aboutHero2, heroHome2].map((img, i) => (
                <CarouselItem key={i}>
                  <div className="rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <img src={img} alt={`WASS Insurance team ${i + 1}`} className="w-full aspect-[16/10] object-cover" loading="lazy" width={1280} height={720} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </ScrollReveal>
      </div>
    </SectionWrapper>

    {/* Timeline */}
    <SectionWrapper>
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="section-badge mb-4 inline-block">MILESTONES</span>
          <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">Our <span className="text-primary">Journey</span></h2>
        </div>
      </ScrollReveal>
      <div className="max-w-3xl mx-auto">
        {milestones.map((item, i) => (
          <ScrollReveal key={item.year} delay={i * 0.06}>
            <div className="flex gap-6 mb-6 items-start group transition-all duration-300 hover:translate-x-1">
              <div className="w-20 shrink-0 text-right">
                <span className="font-heading font-bold text-primary text-lg">{item.year}</span>
              </div>
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform" />
                {i < milestones.length - 1 && <div className="absolute top-5 left-[5px] w-0.5 h-12 bg-primary/20" />}
              </div>
              <p className="text-foreground/80 pt-0.5">{item.event}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>

    {/* Values */}
    <SectionWrapper className="bg-accent/30">
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="section-badge mb-4 inline-block">OUR VALUES</span>
          <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">What Drives Us <span className="text-primary">Every Day</span></h2>
        </div>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {values.map((v, i) => (
          <ScrollReveal key={v.title} animation="fadeUp" delay={i * 0.08}>
            <div
              className="rounded-3xl p-8 text-center bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)] text-white shadow-lg relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02]"
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/10" />
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 relative z-10">
                <v.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-white mb-2 relative z-10">{v.title}</h3>
              <p className="text-sm text-white/75 relative z-10">{v.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>

    {/* Leadership */}
    <SectionWrapper>
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="section-badge mb-4 inline-block">LEADERSHIP</span>
          <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">Our <span className="text-primary">Team</span></h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Led by experienced professionals with decades of combined expertise in Ethiopian insurance and finance.</p>
        </div>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {leadership.map((person, i) => (
          <ScrollReveal key={person.name} animation="fadeUp" delay={i * 0.08}>
            <div className="qupe-card text-center h-full transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)] flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{person.name}</h3>
              <p className="text-sm text-primary font-medium mb-3">{person.role}</p>
              <p className="text-xs text-muted-foreground">{person.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>

    {/* CTA */}
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(201,78%,16%)]" />
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <ScrollReveal animation="scaleUp">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Join 50,000+ Ethiopians Who Trust WASS</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">Get comprehensive insurance coverage tailored to your needs. Our agents are ready to help you find the perfect plan.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton href="/quote" variant="primary" size="lg">Get a Free Quote</CTAButton>
            <CTAButton href="/contact" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">Contact Us</CTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
  </div>
);

export default AboutPage;
