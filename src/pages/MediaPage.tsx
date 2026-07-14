import { BriefcaseBusiness, Camera, FileText, Landmark, Megaphone, Newspaper } from "lucide-react";
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
        detail: "Assist WIA agents, brokers, and online customers with quote, policy, and payment workflows.",
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

const AnnouncementsContent = () => (
  <>

    {announcementSections.map((section, index) => {
      const Icon = section.icon;
      return (
        <section key={section.title} className={index % 2 === 0 ? "bg-white" : "bg-[hsl(201,78%,98%)]"}>
          <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
            <ScrollReveal>
              <div className="mb-7 flex max-w-3xl flex-col gap-4 md:flex-row md:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(160,55%,45%)] text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(160,55%,35%)]">Announcements · {String(index + 1).padStart(2, "0")}</span>
                  <h2 className="mt-2 font-heading text-3xl font-bold text-[hsl(201,78%,20%)]">{section.title}</h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-gray-600">{section.description}</p>
                </div>
              </div>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-2">
              {section.items.map((item, itemIndex) => (
                <ScrollReveal key={item.title} delay={itemIndex * 0.08}>
                  <article className="h-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <span className="inline-flex rounded-full bg-[hsl(160,55%,96%)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[hsl(160,55%,35%)]">
                      {item.meta}
                    </span>
                    <h3 className="mt-4 font-heading text-xl font-bold text-[hsl(201,78%,20%)]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.detail}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      );
    })}
  </>
);

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
