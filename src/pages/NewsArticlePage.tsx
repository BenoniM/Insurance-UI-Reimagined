import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

const NewsArticlePage = () => {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        setArticle(data || null);
        setLoading(false);
      });
  }, [slug]);

  const title = lang === "am" && article?.title_am ? article.title_am : article?.title;
  const intro = lang === "am" && article?.intro_am ? article.intro_am : article?.intro;
  const content = lang === "am" && article?.content_am ? article.content_am : article?.content;

  return (
    <div className="min-h-screen">
      <Navbar />
      <SectionWrapper className="pt-32">
        <div className="max-w-3xl mx-auto">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          ) : article ? (
            <article>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {article.category && (
                  <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1">
                    {article.category}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(article.created_at).toLocaleDateString()}
                </span>
                {article.author && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <UserRound className="w-3.5 h-3.5" />
                    {article.author}
                  </span>
                )}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
                {title}
              </h1>
              {intro && <p className="text-lg text-muted-foreground leading-relaxed mb-8">{intro}</p>}
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="prose prose-slate max-w-none text-foreground">
                  {(content || intro || "").split("\n").filter(Boolean).map((paragraph: string, index: number) => (
                    <p key={index} className="leading-relaxed text-muted-foreground mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ) : (
            <div className="text-center py-20 rounded-2xl border border-border bg-card">
              <h1 className="font-heading text-2xl font-bold mb-2">News article not found</h1>
              <p className="text-muted-foreground mb-6">The article may have been moved or unpublished.</p>
              <Link to="/news" className="text-primary font-semibold">
                View latest news
              </Link>
            </div>
          )}
        </div>
      </SectionWrapper>
      <Footer />
    </div>
  );
};

export default NewsArticlePage;
