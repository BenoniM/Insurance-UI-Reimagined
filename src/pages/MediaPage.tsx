import { useState, useMemo } from "react";
import { BriefcaseBusiness, Camera, FileText, Landmark, Megaphone, Newspaper, Sparkles, ArrowRight, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import mediaIcon1 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_09.png";
import mediaIcon2 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_09.png";
import mediaIcon3 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_10.png";
import mediaIcon4 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_10.png";
import mediaIcon5 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_11.png";
import mediaIcon6 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_11.png";
import mediaIcon7 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_12.png";
import mediaIcon8 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_12.png";
import ExpandingHero from "@/components/ExpandingHero";
import ExpandingHeroSVG from "@/components/ExpandingHeroSVG";
import contactHero1 from "@/assets/ContactHero/ChatGPT Image Jul 10, 2026, 09_02_04 AM (2).png";
import contactHero2 from "@/assets/ContactHero/ChatGPT Image Jul 10, 2026, 09_38_55 AM (2).png";
import contactHero3 from "@/assets/ContactHero/ChatGPT Image Jul 10, 2026, 09_38_56 AM (3).png";


const mediaPageContent = {
  announcements: {
    badge: "MEDIA",
    title: "Announcements",
    intro: "Official updates from WASS Insurance, including service launches, partnerships, branch news, and company notices.",
    icon: Megaphone,
    items: ["Company notices", "New service updates", "Partnership announcements", "Branch and operational news"],
  },
  gallery: {
    badge: "MEDIA",
    title: "Gallery",
    intro: "A visual collection of WASS Insurance events, CSR activities, community programs, and company moments.",
    icon: Camera,
    items: ["CSR activities", "Company events", "Community programs", "Customer and team moments"],
  },
  articles: {
    badge: "MEDIA",
    title: "Articles",
    intro: "Insurance awareness articles, practical guides, and expert insights to help customers make confident protection decisions.",
    icon: Newspaper,
    items: ["Insurance guides", "Risk awareness", "Claims education", "Customer protection tips"],
  },
  downloads: {
    badge: "MEDIA",
    title: "Downloads",
    intro: "Access essential insurance forms, policy documents, brochures, and important resources.",
    icon: Download,
    items: ["Claim Forms", "Policy Documents", "Brochures", "Corporate Reports"],
  },
};

type MediaPageKind = keyof typeof mediaPageContent;

const mediaHeroImages = [mediaIcon1, mediaIcon2, mediaIcon3, mediaIcon4, mediaIcon5, mediaIcon6, mediaIcon7, mediaIcon8];
const mediaHeroPositions = [
  "left-[3%] top-[19%] h-20 w-20 md:h-28 md:w-28",
  "left-[14%] top-[55%] h-16 w-16 md:h-24 md:w-24",
  "left-[28%] top-[10%] h-14 w-14 md:h-20 md:w-20",
  "left-[31%] bottom-[9%] h-14 w-14 md:h-20 md:w-20",
  "right-[3%] top-[20%] h-20 w-20 md:h-28 md:w-28",
  "right-[14%] top-[55%] h-16 w-16 md:h-24 md:w-24",
  "right-[28%] top-[10%] h-14 w-14 md:h-20 md:w-20",
  "right-[31%] bottom-[9%] h-14 w-14 md:h-20 md:w-20",
];

const announcementSections = [
  {
    title: "Bid",
    icon: FileText,
    description: "Procurement notices, tender invitations, bid clarifications, and award announcements from WASS Insurance.",
    items: [
      {
        title: "Invitation to bid for digital claims support services",
        meta: "Open bid",
        detail: "Qualified vendors are invited to submit proposals for customer support, document handling, and claims workflow services.",
      },
      {
        title: "Office equipment and branch supplies procurement",
        meta: "Vendor notice",
        detail: "Registered suppliers may submit sealed bids for office equipment, stationery, and branch operational materials.",
      },
    ],
  },
  {
    title: "Vacancy",
    icon: BriefcaseBusiness,
    description: "Career opportunities, internship announcements, and recruitment notices across WASS branches and digital teams.",
    items: [
      {
        title: "Claims Officer",
        meta: "Addis Ababa",
        detail: "Support claim intake, document review, customer follow-up, and settlement coordination.",
      },
      {
        title: "Digital Sales & Channel Support Associate",
        meta: "Hybrid",
        detail: "Assist WIIA agents, brokers, and online customers with quote, policy, and payment workflows.",
      },
    ],
  },
  {
    title: "Industry Updates",
    icon: Landmark,
    description: "Insurance market updates, regulatory news, risk trends, and sector insights relevant to customers and partners.",
    items: [
      {
        title: "New digital service standards for insurance customers",
        meta: "Industry note",
        detail: "A short update on faster online service expectations for policy, claims, payment, and complaint handling.",
      },
      {
        title: "Medical and motor insurance demand continues to grow",
        meta: "Market insight",
        detail: "WASS highlights customer trends shaping healthcare, mobility, and business protection needs.",
      },
    ],
  },
];

const articleSections = [
  {
    title: "Insurance Guides",
    icon: FileText,
    description: "Step-by-step guides on choosing the right coverage and understanding your policy.",
    items: [
      {
        title: "How to choose the best car insurance",
        meta: "Auto Insurance",
        detail: "A comprehensive guide on evaluating comprehensive vs third-party insurance for your vehicle.",
      },
      {
        title: "Understanding health insurance limits",
        meta: "Health Insurance",
        detail: "What you need to know about inpatient, outpatient, and specialized medical limits.",
      },
    ],
  },
  {
    title: "Risk Awareness",
    icon: Megaphone,
    description: "Insights on identifying and mitigating risks in your personal and business life.",
    items: [
      {
        title: "Fire safety for small businesses",
        meta: "Business Protection",
        detail: "Top 5 ways to prevent electrical and accidental fires in retail and office spaces.",
      },
      {
        title: "Monsoon season driving tips",
        meta: "Auto Safety",
        detail: "How to navigate heavy rains and flooded roads safely this kiremt season.",
      },
    ],
  },
  {
    title: "Claims Education",
    icon: BriefcaseBusiness,
    description: "Everything you need to know about filing a claim and getting settled fast.",
    items: [
      {
        title: "What to do immediately after a car accident",
        meta: "Claims Process",
        detail: "A quick checklist of the necessary steps from calling traffic police to notifying your insurer.",
      },
      {
        title: "Documenting property damage for quick claims",
        meta: "Property Claims",
        detail: "Learn the right way to take photos and prepare documentation to speed up your claim.",
      },
    ],
  },
  {
    title: "Customer Protection Tips",
    icon: Landmark,
    description: "Learn how to safeguard your data, recognize fraud, and protect your family.",
    items: [
      {
        title: "How to spot insurance fraud",
        meta: "Security",
        detail: "Common red flags and how WASS is leveraging technology to protect honest customers.",
      },
      {
        title: "Keeping your personal data secure",
        meta: "Privacy",
        detail: "Our commitment to data privacy and steps you can take to secure your online interactions.",
      },
    ],
  },
];

const downloadSections = [
  {
    title: "Claim Forms",
    icon: FileText,
    description: "Standard forms required for filing and processing your insurance claims.",
    items: [
      {
        title: "Motor Insurance Claim Form",
        meta: "PDF • 1.2 MB",
        detail: "Required for all vehicle-related accident and damage claims.",
      },
      {
        title: "Health Insurance Claim Form",
        meta: "PDF • 0.8 MB",
        detail: "Standard form for inpatient and outpatient medical claims reimbursement.",
      },
    ],
  },
  {
    title: "Policy Documents",
    icon: BriefcaseBusiness,
    description: "Detailed policy wordings, terms and conditions, and product manuals.",
    items: [
      {
        title: "Comprehensive Motor Policy Booklet",
        meta: "PDF • 3.5 MB",
        detail: "Full terms, conditions, and coverage details for comprehensive motor policies.",
      },
      {
        title: "General Liability Policy Wordings",
        meta: "PDF • 2.1 MB",
        detail: "Coverage terms and exclusions for business liability policies.",
      },
    ],
  },
  {
    title: "Brochures",
    icon: Megaphone,
    description: "Product overviews and promotional materials for our insurance solutions.",
    items: [
      {
        title: "WASS Corporate Profile",
        meta: "PDF • 5.0 MB",
        detail: "Overview of WASS Insurance, our mission, vision, and corporate achievements.",
      },
      {
        title: "Travel Insurance Brochure",
        meta: "PDF • 1.5 MB",
        detail: "Quick guide to our international travel insurance packages and benefits.",
      },
    ],
  },
];

const AnnouncementsContent = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allItems = useMemo(() => {
    return announcementSections.flatMap(section => 
      section.items.map(item => ({
        ...item,
        category: section.title,
        icon: section.icon,
      }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return allItems;
    return allItems.filter(item => item.category === activeCategory);
  }, [activeCategory, allItems]);

  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    announcementSections.forEach(section => {
      counts[section.title] = section.items.length;
    });
    return counts;
  };
  const categoryCounts = getCategoryCounts();

  return (
    <SectionWrapper id="latest-announcements" className="bg-white py-16">
      <div className="mb-10">
        <ScrollReveal>
          <div className="section-header mb-8">
            <span className="section-badge mb-4 inline-block">LATEST UPDATES</span>
            <h2 className="section-title">
              Announcements
            </h2>
            <p className="section-description">
              Official updates from WASS Insurance, including service launches, partnerships, branch news, and company notices.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
              activeCategory === "all"
                ? "border-foreground bg-foreground text-background shadow-lg shadow-foreground/10"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            All Announcements
            <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeCategory === "all" ? "bg-background/15" : "bg-muted text-muted-foreground"}`}>
              {allItems.length}
            </span>
          </button>
          
          {announcementSections.map((section) => (
            <button
              key={section.title}
              type="button"
              onClick={() => setActiveCategory(section.title)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                activeCategory === section.title
                  ? "border-[hsl(160,55%,45%)] bg-[hsl(160,55%,45%)] text-white shadow-lg shadow-[hsl(160,55%,45%)]/20"
                  : "border-border bg-card text-[hsl(160,55%,45%)] hover:bg-muted"
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.title}
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeCategory === section.title ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                {categoryCounts[section.title] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, i) => {
          const CategoryIcon = item.icon;
          return (
            <ScrollReveal key={item.title} animation="fadeUp" delay={i * 0.06}>
              <div className="qupe-card h-full flex flex-col transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 bg-[hsl(160,55%,96%)] text-[hsl(160,55%,35%)]">
                    <CategoryIcon className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 bg-muted/50 text-muted-foreground border border-border/50">
                    {item.meta}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">{item.detail}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all cursor-pointer">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

const ArticlesContent = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allItems = useMemo(() => {
    return articleSections.flatMap(section => 
      section.items.map(item => ({
        ...item,
        category: section.title,
        icon: section.icon,
      }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return allItems;
    return allItems.filter(item => item.category === activeCategory);
  }, [activeCategory, allItems]);

  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    articleSections.forEach(section => {
      counts[section.title] = section.items.length;
    });
    return counts;
  };
  const categoryCounts = getCategoryCounts();

  return (
    <SectionWrapper id="latest-articles" className="bg-white py-16">
      <div className="mb-10">
        <ScrollReveal>
          <div className="section-header mb-8">
            <span className="section-badge mb-4 inline-block">INSIGHTS & GUIDES</span>
            <h2 className="section-title">
              Articles
            </h2>
            <p className="section-description">
              Insurance awareness articles, practical guides, and expert insights to help customers make confident protection decisions.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
              activeCategory === "all"
                ? "border-foreground bg-foreground text-background shadow-lg shadow-foreground/10"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            All Articles
            <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeCategory === "all" ? "bg-background/15" : "bg-muted text-muted-foreground"}`}>
              {allItems.length}
            </span>
          </button>
          
          {articleSections.map((section) => (
            <button
              key={section.title}
              type="button"
              onClick={() => setActiveCategory(section.title)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                activeCategory === section.title
                  ? "border-[hsl(160,55%,45%)] bg-[hsl(160,55%,45%)] text-white shadow-lg shadow-[hsl(160,55%,45%)]/20"
                  : "border-border bg-card text-[hsl(160,55%,45%)] hover:bg-muted"
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.title}
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeCategory === section.title ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                {categoryCounts[section.title] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, i) => {
          const CategoryIcon = item.icon;
          return (
            <ScrollReveal key={item.title} animation="fadeUp" delay={i * 0.06}>
              <div className="qupe-card h-full flex flex-col transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 bg-[hsl(160,55%,96%)] text-[hsl(160,55%,35%)]">
                    <CategoryIcon className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 bg-muted/50 text-muted-foreground border border-border/50">
                    {item.meta}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">{item.detail}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all cursor-pointer">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

const DownloadsContent = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allItems = useMemo(() => {
    return downloadSections.flatMap(section => 
      section.items.map(item => ({
        ...item,
        category: section.title,
        icon: section.icon,
      }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return allItems;
    return allItems.filter(item => item.category === activeCategory);
  }, [activeCategory, allItems]);

  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    downloadSections.forEach(section => {
      counts[section.title] = section.items.length;
    });
    return counts;
  };
  const categoryCounts = getCategoryCounts();

  return (
    <SectionWrapper id="latest-downloads" className="bg-white py-16">
      <div className="mb-10">
        <ScrollReveal>
          <div className="section-header mb-8">
            <span className="section-badge mb-4 inline-block">RESOURCES</span>
            <h2 className="section-title">
              Downloads
            </h2>
            <p className="section-description">
              Access essential insurance forms, policy documents, brochures, and important resources.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
              activeCategory === "all"
                ? "border-foreground bg-foreground text-background shadow-lg shadow-foreground/10"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            All Downloads
            <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeCategory === "all" ? "bg-background/15" : "bg-muted text-muted-foreground"}`}>
              {allItems.length}
            </span>
          </button>
          
          {downloadSections.map((section) => (
            <button
              key={section.title}
              type="button"
              onClick={() => setActiveCategory(section.title)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                activeCategory === section.title
                  ? "border-[hsl(160,55%,45%)] bg-[hsl(160,55%,45%)] text-white shadow-lg shadow-[hsl(160,55%,45%)]/20"
                  : "border-border bg-card text-[hsl(160,55%,45%)] hover:bg-muted"
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.title}
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeCategory === section.title ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                {categoryCounts[section.title] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, i) => {
          const CategoryIcon = item.icon;
          return (
            <ScrollReveal key={item.title} animation="fadeUp" delay={i * 0.06}>
              <div className="qupe-card h-full flex flex-col transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 bg-[hsl(160,55%,96%)] text-[hsl(160,55%,35%)]">
                    <CategoryIcon className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 bg-muted/50 text-muted-foreground border border-border/50">
                    {item.meta}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">{item.detail}</p>
                <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all cursor-pointer">
                  Download <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

const MediaPage = ({ kind }: { kind: MediaPageKind }) => {
  const content = mediaPageContent[kind];
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {kind === "gallery" ? (
        <ExpandingHero
          images={[
            contactHero1,
            contactHero2,
            contactHero3,
          ]}
          badge={content.badge}
          headline={content.title}
          subtitle={content.intro}
          ctaLabel="Explore Moments"
          ctaHref="#gallery-grid"
        />
      ) : kind === "announcements" ? (
        <ExpandingHeroSVG
          badge={content.badge}
          headline={content.title}
          subtitle={content.intro}
          ctaLabel="View Updates"
          ctaHref="#updates"
        />
      ) : (
        <section className="relative flex min-h-screen overflow-hidden bg-white">
          <style>{`
            @keyframes media-image-fade {
              0%, 100% { opacity: 0; transform: scale(.78) translateY(10px); }
              18%, 64% { opacity: .72; transform: scale(1) translateY(0); }
              82% { opacity: 0; transform: scale(.9) translateY(-8px); }
            }
            .media-hero-image { animation: media-image-fade 12s ease-in-out infinite; }
            @media (prefers-reduced-motion: reduce) { .media-hero-image { animation: none; opacity: .5; } }
          `}</style>
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {mediaHeroImages.map((image, index) => (
              <img key={image} src={image} alt="" className={`media-hero-image absolute object-contain ${mediaHeroPositions[index]}`} style={{ animationDelay: `${index * -1.5}s` }} />
            ))}
          </div>
          <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-24 lg:px-8">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6">
                {content.badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[hsl(201,78%,20%)] mb-6 max-w-4xl">
                {content.title}
              </h1>
              <p className="text-xl leading-relaxed text-gray-600 max-w-2xl">
                {content.intro}
              </p>
            </div>
          </div>
        </section>
      )}

      {kind === "announcements" ? (
        <AnnouncementsContent />
      ) : kind === "articles" ? (
        <ArticlesContent />
      ) : kind === "downloads" ? (
        <DownloadsContent />
      ) : (
        <SectionWrapper>
          <ScrollReveal>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {content.items.map((item) => (
                <div key={item} className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
                  <Icon className="mb-4 h-7 w-7 text-[hsl(160,55%,45%)]" />
                  <h2 className="font-heading text-lg font-bold text-[hsl(201,78%,20%)]">
                    {item}
                  </h2>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </SectionWrapper>
      )}
      <Footer />
    </div>
  );
};

export default MediaPage;
