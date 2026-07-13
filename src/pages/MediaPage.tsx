import { BriefcaseBusiness, Camera, FileText, Landmark, Megaphone, Newspaper } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import ScrollReveal from "@/components/ScrollReveal";

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
  <SectionWrapper>
    <div className="grid gap-6 lg:grid-cols-3">
      {announcementSections.map((section, index) => (
        <ScrollReveal key={section.title} delay={index * 0.08}>
          <div className="h-full rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <section.icon className="mb-5 h-8 w-8 text-[hsl(160,55%,45%)]" />
            <h2 className="font-heading text-2xl font-bold text-[hsl(201,78%,20%)]">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{section.description}</p>
            <div className="mt-6 space-y-4">
              {section.items.map((item) => (
                <article key={item.title} className="rounded-lg border border-gray-100 bg-[hsl(201,78%,98%)] p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[hsl(160,55%,35%)]">
                    {item.meta}
                  </span>
                  <h3 className="mt-2 font-heading text-base font-bold text-[hsl(201,78%,20%)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </SectionWrapper>
);

const MediaPage = ({ kind }: { kind: MediaPageKind }) => {
  const content = mediaPageContent[kind];
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-12 bg-[hsl(201,78%,98%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
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
