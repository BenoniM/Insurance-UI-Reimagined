import { Camera, Megaphone, Newspaper } from "lucide-react";
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

const MediaPage = ({ kind }: { kind: MediaPageKind }) => {
  const content = mediaPageContent[kind];
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-12 bg-[hsl(201,78%,98%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-badge mb-5 inline-block">{content.badge}</span>
            <h1 className="font-hero text-4xl md:text-6xl text-[hsl(201,78%,20%)]">
              {content.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              {content.intro}
            </p>
          </div>
        </div>
      </section>

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
      <Footer />
    </div>
  );
};

export default MediaPage;
