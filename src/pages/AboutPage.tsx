import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import CTAButton from "@/components/CTAButton";

import ScrollReveal from "@/components/ScrollReveal";
import AboutMilestones from "@/components/AboutMilestones";
import { 
  Shield, Users, Heart, ChevronDown, CheckCircle, Activity, 
  MapPin, Laptop, Factory, HeartPulse, Leaf, Building2, 
  Landmark, Globe, Truck, FileText, PieChart, BookOpen, 
  Briefcase, Scale, ArrowRight, FileDown 
} from "lucide-react";
import aboutHeroVideo from "@/assets/AboutHero/magnific_animate-start-image-for-w_cDGiAeS0eP.mp4";

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
    title: "Integrity",
    description:
      "We uphold the highest standards of honesty and transparency in all our actions.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "We put our customers at the center of everything we do, ensuring exceptional service.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "We are committed to the well-being and development of the communities we serve.",
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
    bio: "አቶ ሄኖክ ተካ የአደራጅ ኮሚቴው ሰብሳቢና አስተባባሪ ከጎንደር ዩኒቨርሲቲ በፋርማሲ የመጀመሪያ ዲግሪ ያጠናቀቁ ሲሆን በዲላ ዩኒቨርሲቲ ሆስፒታል በፋርማሲስትነት እና መምህርነት ፣ በቀድሞ የመድኃኒት ፈንድ እና አቅርቦት ኤጀንሲ በፋርማሲቲካልስ ኳንቲፊኬሽን ኦፊሰርነት ፣በአንዱ የኬሚካል አስመጪ ድርጅት ማርኬቲንግ ሥራ አስኪያጅነት ያገለገሉ ሲሆን በአሁኑ ወቅት ድሮጋ ፋርማ እና ኤማ ኮንስትራክሽን ትሬዲንግ ኃላ.የተ.የግ.ማህበር ትረስት ፋርማሲቲካልስ ማኑፋችቸሪን ኃላ.የተ.የግ.ማ. በማቋቋም እየመሩ ይገኛሉ፡፡",
  },
  {
    name: "ዶ/ር አብዲ ኤርሞሎ",
    nameEn: "Dr. Abdi Ermolo",
    role: "የአደራጅ ኮሚቴው ምክትል ሰብሳቢ",
    roleEn: "Deputy Chair, Founding Committee",
    description:
      "Bringing expert leadership and strategic direction to guide WASS Insurance's foundational development.",
    bio: "ዶ/ር አብዲ ኤርሞሎ በህክምና የመጀመሪያ ዲግሪያቸውን ከጎንደር ዩኒቨርሲቲ ያገኙ ሲሆን በጎንደር ዩኒቨርሲቲ በመምህርነት አገልግለዋል ከዚህም በተጨማሪ በአዲስ አበባ ዩኒቨርሲቲ ጥቁር አንበሳ ስፔሻላይዝድ ሆስፒታል በአንጎልና ህብረሰረሰር ቀዶ ጥገና የስፔሻላይዜሽን ትምርህታቸውን ለ5 አመታት የተከታተሉ ሲሆን በአሁን ወቅት በቅዱስ ጴጥሮስ ስፔሻላይዝድ ሆስፒታል በአንጎልና ህብረሰረሰር ቀዶ ጥገና እያገለግሉ ነው። በተጨማሪም ድሮጋ ፋርማ እና ኤማ ኮንስትራክሽን እና ትሬዲንግ ኃላ.የተ.የግ.ማህበር ትረስት ፋርማሲቲካልስ ማኑፋችቸሪን ኃላ.የተ.የግ.ማ. በማቋቋም እየመሩ ይገኛሉ፡፡",
  },
  {
    name: "አቶ አማረ ሃበ",
    nameEn: "Ato Amare Habe",
    role: "የአደራጅ ኮሚቴ አባል እና የፕሮጀክት ሥራ አስኪያጅ",
    roleEn: "Founding Committee Member & Project Manager",
    description:
      "Overseeing project operations and ensuring the company's formation milestones are achieved on time.",
    bio: "አቶ አማረ ሃበ የአደራጅ ኮሚቴው አባልና የፕሮጀክት ሥራ አስኪያጅ ከአዲስ አበባ ዩኒቨርስቲ በኢኮኖሚክስ ቢ.ኤ. ስኮትላንድ ከሚገኘው ከግላሰጎው ዩኒቨርስቲ ከዲቨሎፕመንት ፖሊሲ ድኀረ ዲግሪ ዲፕሎማ/ Post Graduate Diploma እና እንግሊዝ አገር ከሚገኘው ኬንት ዩኒቨርስቲ በዲቨሎፕመንት ኢኮኖሚክስ የማስተርስ ዲግሪ እንዲሁም ከዩኒቲ ዩኒቨርስቲ በሕግ ዲግሪ በእጅግ በጣም ከፍተኛ ማዕረግ ያጠናቀቁ ሲሆን በአዲስ አበባ ዩኒቨርስቲ በስነ-ልቦና ትምህርት ክፍል የሥነ ልቦና አማካሪነት/Counseling Psychology/ በማስተርስ ዲግሪ የመመረቂያ ጽሁፍ ይቀራቸዋል፡፡ በስራ ልምድም በኢኮኖሚ ፕላን ኢኮኖሚክስት የዋጋ ጥናት ፖሊሲ ኢንስቲትዩት ማኔጂንግ ዳይሬክተር፣ በንግድ ሚኒስቴር የውጭ ንግድ ማስፋፊያ መምሪያ ኃላፊ እንዲሁም የአንዱ የመድኃኒት አስመጪና አከፋፋይ አክሲዮን ማህበር በዋና ሥራ አስኪያጅነት ለ8 ዓመታት ሰርተዋል፡፡ ከዚህ በተጨማሪ በሶስት የመንግስት የልማት ድርጅቶች የሥራ አመራር ቦርድ ሰብሳቢ በአራቱ ደግሞ የሥራ አመራር ቦርድ አባል ሆነው የሰሩ ሲሆን በአዲስ አበባ ንግድ ምክር ቤት በቦርድ አባልነት አገልግለዋል፡፡ ላለፉት 7 ዓመታትም የዘመን ባንክ የቦርድ ሊቀመንበርና (3 ዓመት) የቦርድ አባል (3 ዓመት ከ7 ወር) ያገለገሉ ሲሆን በቅርቡ ተቋቁሞ የኢንሹራንስ ኢንዱስትውን የተቀላቀለው የዘመን ኢንሹራንስ አክሲዮን ማህበር የአደራጅ ኮሚቴው ሰብሳቢና አስተባባሪ ሆነው አገልግለዋል፡፡",
  },
];

const SME_FEATURES = [
  { text: "Comprehensive Coverage", icon: Shield },
  { text: "Dedicated Relationship Management", icon: Users },
  { text: "Fast Claims Settlement", icon: Activity },
  { text: "National Network", icon: MapPin },
  { text: "Digital Services", icon: Laptop },
];

const INDUSTRIES = [
  { name: "Manufacturing", icon: Factory },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Agriculture", icon: Leaf },
  { name: "Construction", icon: Building2 },
  { name: "Financial Institutions", icon: Landmark },
  { name: "NGOs", icon: Globe },
  { name: "Logistics", icon: Truck },
];

const CORPORATE_INFO = [
  { name: "Annual Reports", icon: PieChart },
  { name: "Financial Statements", icon: FileText },
  { name: "Corporate Profile", icon: BookOpen },
  { name: "Board of Directors", icon: Users },
  { name: "Executive Management", icon: Briefcase },
  { name: "Governance Framework", icon: Scale },
];

const AboutPage = () => {
  const [expandedLeader, setExpandedLeader] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 0, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.9, 1], [0, -50, -50]);
  const textPointer = useTransform(scrollYProgress, (v) => (v > 0.9 ? "none" : "auto"));
  // Image peeks up more at first, then scrolls to 0vh
  const imageY = useTransform(scrollYProgress, [0, 1], ["55vh", "0vh"]);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#FBFAFA]">
      <Navbar />

      {/* ── MOBILE HERO (static, no scroll animation) ── */}
      <div className="block md:hidden bg-[#F2F2F2] pt-56 pb-0 overflow-hidden">
        <div className="flex flex-col items-center text-center px-4">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6">
            ABOUT WASS
          </div>
          <h1
            className="text-4xl font-bold tracking-tight mb-6"
            dangerouslySetInnerHTML={{
              __html: 'Ethiopia\'s Trusted <span class="text-[#288A69]">Insurance Partner</span>',
            }}
          />
          <p className="text-lg text-muted-foreground mb-8">
            WASS Insurance is under formation with a principal aim of providing
            the best health focused insurance policy.
          </p>
          <CTAButton href="/quote" size="lg">
            Get a Free Quote
          </CTAButton>
        </div>
        {/* Video bleeds full width outside all horizontal padding */}
        <div className="w-screen mt-6">
          <video
            src={aboutHeroVideo}
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={(event) => {
              event.currentTarget.playbackRate = 0.7;
            }}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* ── DESKTOP HERO (scroll-animated) ── */}
      <div ref={heroRef} className="relative h-[240vh] hidden md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F2F2F2]">
          {/* Text Content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-4 pb-[15vh]"
            style={{ opacity: textOpacity, y: textY, pointerEvents: textPointer }}
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6 mt-16">
              ABOUT WASS
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl"
              dangerouslySetInnerHTML={{
                __html: 'Ethiopia\'s Trusted <span class="text-[#288A69]">Insurance Partner</span>',
              }}
            />
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              WASS Insurance is under formation with a principal aim of providing
              the best health focused insurance policy.
            </p>
            <CTAButton href="/quote" size="lg">
              Get a Free Quote
            </CTAButton>
          </motion.div>

          {/* Hero Video — desktop scroll-animated */}
          <motion.div
            className="absolute bottom-0 w-[108vw] left-1/2 z-20 flex flex-col justify-end"
            style={{ y: imageY, x: "-50%" }}
          >
            <video
              src={aboutHeroVideo}
              autoPlay
              loop
              muted
              playsInline
              onLoadedMetadata={(event) => {
                event.currentTarget.playbackRate = 0.7;
              }}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="w-full min-h-16 bg-gray-50 border-y border-gray-100 flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 flex justify-center items-center gap-x-6 md:gap-x-12 gap-y-4 flex-wrap">
          {stats.map((stat, i) => (
            <div key={stat.label} className="group flex items-baseline gap-1.5 whitespace-nowrap opacity-80 hover:opacity-100 transition-all cursor-default font-hero">
              <span className="text-lg md:text-xl font-bold tracking-tight text-gray-500 group-hover:text-[#288A69] transition-colors">{stat.value}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#288A69]/80 transition-colors font-sans">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────────── */}
      <section className="about-story-section">
        <div className="about-container-full">
          <div className="about-story-layout">

            <div className="about-zone-1">
              <ScrollReveal animation="fadeLeft">
                <span className="about-eyebrow">WHO WE ARE</span>
                <h2 className="about-huge-title">
                  Who We Are
                </h2>
              </ScrollReveal>
            </div>

            <div className="about-zone-2">
              <div className="about-story-copy-grid">
                <ScrollReveal animation="fadeRight" delay={0.2}>
                  <p className="about-story-intro">
                    Wass Insurance S.C. is a customer-focused insurance company committed to delivering innovative, reliable, and accessible insurance solutions that protect individuals, businesses, and communities throughout Ethiopia.
                  </p>
                </ScrollReveal>

                <div className="about-story-pillars">
                  <motion.article
                    className="about-story-card about-story-card--mission"
                    initial={{ opacity: 0, x: -42, rotate: -1.5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.03, y: -6 }}
                  >
                    <div className="about-story-card-pattern" aria-hidden="true">
                      <svg
                        className="about-story-ripple"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <circle cx="80" cy="80" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.35">
                          <animate attributeName="r" from="6" to="50" dur="3s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.35" to="0" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="80" cy="80" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.35">
                          <animate attributeName="r" from="6" to="50" dur="3s" begin="1s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.35" to="0" dur="3s" begin="1s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="80" cy="80" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.35">
                          <animate attributeName="r" from="6" to="50" dur="3s" begin="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.35" to="0" dur="3s" begin="2s" repeatCount="indefinite" />
                        </circle>
                      </svg>
                    </div>
                    <div className="about-story-card-content">
                      <h3>Mission</h3>
                      <p className="about-story-card-desc">
                        To provide affordable, innovative, and customer-centric insurance solutions that create peace of mind and long-term value.
                      </p>
                    </div>
                  </motion.article>

                  <motion.article
                    className="about-story-card about-story-card--vision"
                    initial={{ opacity: 0, y: 46, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.03, rotate: 0.35 }}
                  >
                    <div className="about-story-card-pattern" aria-hidden="true">
                      <svg
                        className="about-story-dots"
                        viewBox="0 0 80 80"
                        fill="none"
                      >
                        {Array.from({ length: 5 }).map((_, row) =>
                          Array.from({ length: 5 }).map((_, col) => {
                            const delay = (row + col) * 0.15;
                            return (
                              <circle
                                key={`${row}-${col}`}
                                cx={8 + col * 16}
                                cy={8 + row * 16}
                                r="2.2"
                                fill="currentColor"
                                opacity="0.25"
                              >
                                <animate
                                  attributeName="opacity"
                                  values="0.1;0.55;0.1"
                                  dur="2.4s"
                                  begin={`${delay}s`}
                                  repeatCount="indefinite"
                                />
                                <animate
                                  attributeName="r"
                                  values="1.4;2.6;1.4"
                                  dur="2.4s"
                                  begin={`${delay}s`}
                                  repeatCount="indefinite"
                                />
                              </circle>
                            );
                          })
                        )}
                      </svg>
                    </div>
                    <div className="about-story-card-content">
                      <h3>Vision</h3>
                      <p className="about-story-card-desc">
                        To become Ethiopia's most trusted and digitally enabled insurance company.
                      </p>
                    </div>
                  </motion.article>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────── */}
      <AboutMilestones />

      {/* ── VALUES ────────────────────────────────────────────────── */}
      <section className="about-values-section">
        <div className="about-container">
          <ScrollReveal>
            <div className="section-header about-section-header">
              <span className="about-eyebrow about-eyebrow--light">
                OUR VALUES
              </span>
              <h2 className="section-title text-white">
                What Drives Us{" "}
                <span className="text-primary">Every Day</span>
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

      {/* ── CORPORATE & SME SOLUTIONS ───────────────────────────── */}
      <section className="py-20 bg-background border-b border-border overflow-hidden relative">
        <div className="about-container-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="about-eyebrow about-eyebrow--centered">BUSINESS SOLUTIONS</span>
              <h2 className="about-section-heading">
                Corporate & <span className="text-primary">SME Solutions</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                Tailored insurance solutions to protect and grow your enterprise, no matter the scale or industry.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Why choose us */}
            <ScrollReveal animation="fadeRight">
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/15 border border-emerald-200/80 p-8 md:p-10 rounded-3xl shadow-lg shadow-emerald-900/5">
                <h3 className="text-2xl font-heading font-bold mb-8 text-emerald-950">Why Businesses Choose Wass</h3>
                <div className="space-y-6">
                  {SME_FEATURES.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-emerald-600/15 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <span className="text-base font-semibold text-emerald-950">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Industries Covered */}
            <ScrollReveal animation="fadeLeft" delay={0.1}>
              <div>
                <h3 className="text-2xl font-heading font-bold mb-8 text-sky-950">Industries Covered</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {INDUSTRIES.map((industry, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col items-center justify-center p-6 border rounded-2xl transition-all cursor-default text-center group shadow-sm hover:shadow-md ${
                        idx % 2 === 0
                          ? "bg-sky-500/10 border-sky-200 hover:bg-sky-500/20 hover:border-sky-400"
                          : "bg-teal-500/10 border-teal-200 hover:bg-teal-500/20 hover:border-teal-400"
                      }`}
                    >
                      <industry.icon className={`w-8 h-8 mb-3 transition-colors ${idx % 2 === 0 ? "text-sky-700 group-hover:text-sky-900" : "text-teal-700 group-hover:text-teal-900"}`} />
                      <span className="text-sm font-semibold text-slate-800 leading-tight">{industry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── INVESTOR & CORPORATE GOVERNANCE ──────────────────────── */}
      <section className="bg-white border-b border-border">
        <div className="about-container-full py-5 md:py-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 items-stretch">
            <ScrollReveal animation="fadeRight">
              <div className="claims-featured-img relative z-10 rounded-3xl overflow-hidden h-full !min-h-[250px] md:!min-h-[270px]">
                <div className="absolute inset-0 -z-10 pointer-events-none rounded-3xl overflow-hidden">
                  <div className="claims-featured-overlay" />
                  <div className="claims-featured-pattern" />
                </div>
                <div className="claims-featured-img-content relative z-10 gap-3 p-5 md:p-6">
                  <span className="claims-featured-tag rounded-full">Investor Relations</span>
                  <h2 className="claims-featured-title !text-[clamp(1.45rem,2vw,1.95rem)]">
                    Investor & Corporate <span className="claims-featured-title-accent">Governance</span>
                  </h2>
                  <p className="claims-featured-desc !leading-relaxed">
                    We are committed to transparency, accountability, and creating long-term value for our shareholders through robust governance practices.
                  </p>
                  <CTAButton variant="outline" className="w-fit border-white/30 !text-white hover:!border-white/60 hover:!bg-white/10">
                    View Full Investor Profile
                  </CTAButton>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeLeft" delay={0.1}>
              <div className="claims-docs-panel rounded-3xl p-5 md:p-6 h-full">
                <h3 className="claims-docs-title">Corporate Information</h3>
                <div className="claims-docs-list !gap-2">
                  {CORPORATE_INFO.map((info, idx) => (
                    <div key={idx} className="claims-docs-item rounded-xl px-3 py-2.5 group cursor-pointer transition-colors hover:bg-teal-500/10">
                      <div className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                        <info.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm">{info.name}</h4>
                        <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1 group-hover:text-teal-700 transition-colors">
                          Learn More <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ────────────────────────────────────────────── */}
      <section className="about-leadership-section">
        <div className="about-container-full">
          <ScrollReveal>
            <div className="section-header about-section-header">
              <span className="about-eyebrow">LEADERSHIP</span>
              <h2 className="section-title">
                Founding <span className="text-primary">Committee</span>
              </h2>
              <p className="section-description about-section-sub">
                Led by experienced professionals committed to building
                Ethiopia's premier health-focused insurance company.
              </p>
            </div>
          </ScrollReveal>

          <div className="about-leadership-list">
            {leadership.map((person, i) => {
              const isOpen = expandedLeader === i;
              return (
                <ScrollReveal key={person.name} delay={i * 0.06}>
                  <div className="about-leader-row">
                    <div className="about-leader-row-main">
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

                    <button
                      type="button"
                      className="about-leader-toggle"
                      onClick={() => setExpandedLeader(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span>{isOpen ? "መግለጫ ደብቅ" : "አጭር መግለጫ አሳይ"}</span>
                      <ChevronDown
                        className={`about-leader-toggle-icon ${
                          isOpen ? "about-leader-toggle-icon--open" : ""
                        }`}
                      />
                    </button>

                    <div
                      className="about-leader-bio-wrap"
                      style={{
                        maxHeight: isOpen ? "1000px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="about-leader-bio">{person.bio}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>



      {/* ── STYLES ────────────────────────────────────────────────── */}
      <style>{`

        /* ─── Shared Layout ──────────────────────────────────── */
        .about-container {
          max-width: 1300px;
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
          font-size: var(--type-section-title);
          font-weight: var(--weight-heading);
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
          font-size: var(--type-body);
          font-weight: var(--weight-body);
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
          padding: 6rem 0 3.25rem;
        }
         .about-story-layout {
           display: flex;
           flex-direction: column;
           gap: 3rem;
         }
         @media (min-width: 1024px) {
           .about-story-layout {
             gap: 3.5rem;
           }
           .about-zone-1 {
             text-align: center;
           }
           .about-zone-2 {
             width: 100%;
           }
         }

         .about-zone-1 {
           text-align: center;
         }
         .about-story-copy-grid {
           max-width: 1040px;
           margin: 0 auto;
           text-align: center;
         }
         .about-story-intro {
           max-width: 760px;
           margin: 0 auto 3.5rem !important;
           font-size: clamp(1.05rem, 1.8vw, 1.35rem) !important;
           line-height: 1.7 !important;
         }
         .about-story-pillars {
           display: grid;
           grid-template-columns: 1fr;
           gap: 1.25rem;
         }
         @media (min-width: 768px) {
           .about-story-pillars {
             grid-template-columns: repeat(2, 1fr);
             gap: 1.25rem;
           }
         }
         .about-story-card {
           position: relative;
           min-height: 300px;
           padding: 2rem;
           border-radius: 1rem;
           overflow: hidden;
           text-align: left;
           border: 1px solid transparent;
           box-shadow: 0 18px 50px -35px hsl(var(--foreground) / 0.5);
           transition: border-color 0.28s ease, box-shadow 0.28s ease;
           will-change: transform;
         }
         .about-story-card:hover {
           border-color: hsl(var(--primary) / 0.18);
           box-shadow: 0 24px 65px -36px hsl(var(--primary) / 0.45);
         }
         .about-story-card--mission {
           background: hsl(160 40% 90%);
         }
         .about-story-card--vision {
           background: hsl(201 78% 92%);
         }
         .about-story-card-pattern {
           position: absolute;
           inset: 0;
           pointer-events: none;
           overflow: hidden;
           color: hsl(201 78% 23%);
         }
         .about-story-ripple {
           position: absolute;
           width: 9.5rem;
           height: 9.5rem;
           right: -1.75rem;
           bottom: -1.75rem;
         }
         .about-story-dots {
           position: absolute;
           width: 8.75rem;
           height: 8.75rem;
           right: -1rem;
           bottom: -1rem;
         }
         .about-story-card-content {
           position: relative;
           z-index: 1;
           display: flex;
           min-height: 236px;
           flex-direction: column;
         }
         .about-story-card h3 {
           margin: 0 auto 0 0;
           font-family: var(--font-heading, inherit);
           font-size: clamp(1.6rem, 3vw, 2.25rem);
           font-weight: 700;
           line-height: 1.05;
           color: hsl(var(--foreground));
         }
         .about-zone-2 .about-story-card-desc {
           margin: 1.5rem 0 1.25rem;
           color: hsl(var(--muted-foreground));
           font-size: 0.95rem;
           line-height: 1.65;
         }
        
        .about-huge-title {
          font-family: var(--font-heading, inherit);
          font-size: var(--type-section-title);
          font-weight: var(--weight-heading);
          line-height: 1.08;
          color: hsl(var(--foreground));
          margin: 0;
          letter-spacing: -0.02em;
        }

        .about-zone-2 p {
          font-size: var(--type-body);
          font-weight: var(--weight-body);
          color: hsl(var(--muted-foreground));
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .about-zone-2 p:last-child {
          margin-bottom: 0;
        }

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
  gap: 1rem;
  background: transparent;
  border: none;
}
@media (min-width: 640px) {
  .about-values-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .about-values-grid { grid-template-columns: repeat(3, 1fr); }
}
        .about-value-card {
  padding: 2.5rem 2rem;
  background: hsl(201 78% 17%);
  position: relative;
  transition: background 0.25s;
  height: 100%;
  box-sizing: border-box;
  border-radius: 1rem;
  border: 1px solid hsl(201 78% 22%);
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
  border-radius: 0.5rem;
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
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 2rem 0;
          border-bottom: 1px solid hsl(var(--border));
          transition: background 0.2s;
        }
        .about-leader-row:hover {
          background: hsl(var(--accent) / 0.3);
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          margin-left: -0.75rem;
          margin-right: -0.75rem;
        }
        .about-leader-row-main {
          display: grid;
          grid-template-columns: 3rem 1fr;
          gap: 0 2rem;
          align-items: baseline;
        }
        @media (min-width: 768px) {
          .about-leader-row-main { grid-template-columns: 3rem 1fr 1fr; }
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

        /* ─── LEADERSHIP BIO TOGGLE ────────────────────────────── */
        .about-leader-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          align-self: flex-start;
          margin-top: 1rem;
          margin-left: 5rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem 0;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: hsl(var(--primary));
          text-transform: uppercase;
        }
        .about-leader-toggle:hover {
          opacity: 0.8;
        }
        .about-leader-toggle-icon {
          width: 0.875rem;
          height: 0.875rem;
          transition: transform 0.25s ease;
        }
        .about-leader-toggle-icon--open {
          transform: rotate(180deg);
        }

        .about-leader-bio-wrap {
          overflow: hidden;
          margin-left: 5rem;
          transition: max-height 0.4s ease, opacity 0.3s ease;
        }
        .about-leader-bio {
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.85;
          padding-top: 1rem;
          margin: 0;
        }

      `}</style>

      <Footer />
    </div>
  );
};

export default AboutPage;
