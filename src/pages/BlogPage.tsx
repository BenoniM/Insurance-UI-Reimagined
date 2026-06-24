import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import heroBlog from "@/assets/hero-blog.jpg";

const BlogPage = () => {
  const { lang } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("articles").select("*").eq("published", true).order("created_at", { ascending: false }).then(({ data }) => { if (data) setArticles(data); });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHero
        images={[heroBlog]}
        badge="BLOG"
        title={<>Insurance <span className="text-primary">Insights</span></>}
        subtitle="Stay informed with our latest articles, guides, and tips on protecting what matters most."
      />

      <SectionWrapper>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <ScrollReveal key={article.slug} animation="fadeUp" delay={i * 0.06}>
              <Link to={`/blog/${article.slug}`} className="group block">
                <div className="qupe-card h-full flex flex-col transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1">{article.category}</span>
                    <span className="text-xs text-muted-foreground">{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{lang === "am" && article.title_am ? article.title_am : article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{lang === "am" && article.intro_am ? article.intro_am : article.intro}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">Read More <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        {articles.length === 0 && <div className="text-center py-16 text-muted-foreground"><p>No articles published yet. Check back soon!</p></div>}
      </SectionWrapper>
      <Footer />
    </div>
  );
};

export default BlogPage;
