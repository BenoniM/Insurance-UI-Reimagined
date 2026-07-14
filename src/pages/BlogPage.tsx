import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import CTAButton from "@/components/CTAButton";
import NewsHeroAnimation from "@/components/NewsHeroAnimation";
import { ArrowRight, Building2, HandHeart, Landmark, Newspaper, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import newsIcon1 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_13.png";
import newsIcon2 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_13.png";
import newsIcon3 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_14.png";
import newsIcon4 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_14.png";
import newsIcon5 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_15.png";
import newsIcon6 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_15.png";
import newsIcon7 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_16.png";
import newsIcon8 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_16.png";

const newsHeroIcons = [newsIcon1, newsIcon2, newsIcon3, newsIcon4, newsIcon5, newsIcon6, newsIcon7, newsIcon8];
const newsHeroPositions = [
  "left-[3%] top-[19%] h-20 w-20 md:h-28 md:w-28",
  "left-[14%] top-[55%] h-16 w-16 md:h-24 md:w-24",
  "left-[28%] top-[10%] h-14 w-14 md:h-20 md:w-20",
  "left-[31%] bottom-[9%] h-14 w-14 md:h-20 md:w-20",
  "right-[3%] top-[20%] h-20 w-20 md:h-28 md:w-28",
  "right-[14%] top-[55%] h-16 w-16 md:h-24 md:w-24",
  "right-[28%] top-[10%] h-14 w-14 md:h-20 md:w-20",
  "right-[31%] bottom-[9%] h-14 w-14 md:h-20 md:w-20",
];

const newsCategories = [
  {
    id: "company",
    title: "Company Announcements",
    shortLabel: "Company",
    description: "Official updates from WASS Insurance, new services, partnerships, and branch news.",
    icon: Building2,
    aliases: ["company", "announcement", "announcements", "company announcements"],
    background: "linear-gradient(145deg, hsl(205 65% 92%) 0%, hsl(201 78% 88%) 100%)",
    accent: "linear-gradient(135deg, hsl(var(--navy)), hsl(var(--sky)))",
    accentColor: "hsl(201 78% 20%)",
    badgeBackground: "hsl(205 65% 92%)",
  },
  {
    id: "industry",
    title: "Industry Updates",
    shortLabel: "Industry",
    description: "Insurance market changes, regulatory developments, and trends affecting Ethiopia.",
    icon: Landmark,
    aliases: ["industry", "industry updates", "market", "regulation", "regulatory"],
    background: "linear-gradient(145deg, hsl(160 55% 91%) 0%, hsl(160 50% 87%) 100%)",
    accent: "linear-gradient(135deg, hsl(var(--teal-dark)), hsl(var(--teal-light)))",
    accentColor: "hsl(160 55% 35%)",
    badgeBackground: "hsl(160 55% 91%)",
  },
  {
    id: "awareness",
    title: "Insurance Awareness Articles",
    shortLabel: "Awareness",
    description: "Practical guides that help customers understand coverage, claims, and risk protection.",
    icon: Newspaper,
    aliases: ["awareness", "insurance awareness", "insurance awareness articles", "education", "guide", "guides", "article", "articles"],
    background: "linear-gradient(145deg, hsl(201 78% 90%) 0%, hsl(205 65% 86%) 100%)",
    accent: "linear-gradient(135deg, hsl(var(--navy)), hsl(var(--sky)))",
    accentColor: "hsl(201 78% 20%)",
    badgeBackground: "hsl(201 78% 90%)",
  },
  {
    id: "csr",
    title: "CSR Activities",
    shortLabel: "CSR",
    description: "Community impact stories, giveback programs, and social responsibility initiatives.",
    icon: HandHeart,
    aliases: ["csr", "csr activities", "community", "giveback", "social responsibility"],
    background: "linear-gradient(145deg, hsl(160 60% 89%) 0%, hsl(160 55% 85%) 100%)",
    accent: "linear-gradient(135deg, hsl(var(--teal-dark)), hsl(var(--teal-light)))",
    accentColor: "hsl(160 55% 35%)",
    badgeBackground: "hsl(160 60% 89%)",
  },
];

const BlogPage = () => {
  const { lang } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  useEffect(() => {
    supabase.from("articles").select("*").eq("published", true).order("created_at", { ascending: false }).then(({ data }) => { if (data) setArticles(data); });
  }, []);

  const getCategoryConfig = (category?: string | null) => {
    const normalized = (category || "").toLowerCase().trim();
    return newsCategories.find((item) =>
      item.aliases.some((alias) => normalized.includes(alias))
    );
  };

  const categoryCounts = useMemo(() => {
    return newsCategories.reduce<Record<string, number>>((counts, category) => {
      counts[category.id] = articles.filter((article) => getCategoryConfig(article.category)?.id === category.id).length;
      return counts;
    }, {});
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") return articles;
    return articles.filter((article) => getCategoryConfig(article.category)?.id === activeCategory);
  }, [activeCategory, articles]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <NewsHeroAnimation />

      <SectionWrapper id="latest-news">
        <div className="mb-10">
          <ScrollReveal>
            <div className="section-header mb-8">
              <span className="section-badge mb-4 inline-block">LATEST NEWS</span>
              <h2 className="section-title">
                News & Insights
              </h2>
              <p className="section-description">
                Follow WASS Insurance updates and learn more about the ideas shaping smarter protection for Ethiopian families and businesses.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap gap-3">
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
              All News
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeCategory === "all" ? "bg-background/15" : "bg-muted text-muted-foreground"}`}>
                {articles.length}
              </span>
            </button>
            {newsCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  background: activeCategory === category.id ? category.accent : category.background,
                  borderColor: activeCategory === category.id ? "transparent" : `${category.accentColor}33`,
                  color: activeCategory === category.id ? "white" : category.accentColor,
                  boxShadow: activeCategory === category.id ? `0 18px 36px -18px ${category.accentColor}` : "none",
                }}
              >
                <category.icon className="w-4 h-4" />
                {category.shortLabel}
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${activeCategory === category.id ? "bg-white/20 text-white" : "bg-white/70"}`}>
                  {categoryCounts[category.id] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArticles.map((article, i) => {
            const category = getCategoryConfig(article.category);
            const CategoryIcon = category?.icon || Newspaper;
            return (
              <ScrollReveal key={article.slug} animation="fadeUp" delay={i * 0.06}>
                <Link to={`/news/${article.slug}`} className="group block">
                  <div className="qupe-card h-full flex flex-col transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1"
                        style={{
                          background: category?.badgeBackground || "hsl(var(--muted))",
                          color: category?.accentColor || "hsl(var(--muted-foreground))",
                        }}
                      >
                        <CategoryIcon className="w-3.5 h-3.5" />
                        {category?.shortLabel || article.category || "News"}
                      </span>
                      <span className="text-xs text-muted-foreground">{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{lang === "am" && article.title_am ? article.title_am : article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{lang === "am" && article.intro_am ? article.intro_am : article.intro}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
        {articles.length === 0 && <div className="text-center py-16 text-muted-foreground"><p>No news published yet. Check back soon!</p></div>}
        {articles.length > 0 && filteredArticles.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p>No articles are published in this category yet.</p>
          </div>
        )}
      </SectionWrapper>
      <Footer />
    </div>
  );
};

export default BlogPage;
