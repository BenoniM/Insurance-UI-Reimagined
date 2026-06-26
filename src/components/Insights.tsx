import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

const Insights = () => {
  const { lang } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setArticles(data);
      });
  }, []);

  return (
    <SectionWrapper id="blog" className="bg-white">
      <div className="text-center mb-16">
        <ScrollReveal>
          <span className="section-badge mb-6 inline-block">INSIGHTS & RESOURCES</span>
          <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
            Insurance Knowledge <span className="text-primary">Hub</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
            Expert tips, industry updates, and guides to help you make informed insurance decisions in Ethiopia.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {articles.map((article, i) => (
          <ScrollReveal key={article.slug} animation="fadeUp" delay={i * 0.08}>
            <Link to={`/blog/${article.slug}`} className="group block h-full">
              <div className="insights-card h-full flex flex-col">
                <h3 className="font-heading font-semibold text-foreground text-lg leading-snug mb-auto">
                  {lang === "am" && article.title_am ? article.title_am : article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-6 mb-5">
                  {lang === "am" && article.intro_am ? article.intro_am : article.intro}
                </p>
                <div className="mt-auto">
                  <span className="inline-block text-sm font-semibold text-secondary border-b-[1.5px] border-primary pb-0.5 transition-colors group-hover:text-secondary/80 group-hover:border-primary/80">
                    {lang === "am" ? "ተጨማሪ ያንብቡ" : "Read More"}
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Insights;
