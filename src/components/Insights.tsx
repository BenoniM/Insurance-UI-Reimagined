import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

const Insights = () => {
  const { t, lang } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("articles").select("*").eq("published", true).order("created_at", { ascending: false }).limit(3).then(({ data }) => {
      if (data) setArticles(data);
    });
  }, []);

  return (
    <SectionWrapper id="blog">
      <div className="text-center mb-16">
        <ScrollReveal>
          <span className="section-badge mb-6 inline-block">INSIGHTS & RESOURCES</span>
          <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
            Insurance Knowledge <span className="text-primary">Hub</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">Expert tips, industry updates, and guides to help you make informed insurance decisions in Ethiopia.</p>
        </ScrollReveal>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {articles.map((article, i) => (
          <ScrollReveal key={article.slug} animation="fadeUp" delay={i * 0.08}>
            <Link to={`/blog/${article.slug}`} className="group block h-full">
              <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="qupe-card-warm h-full flex flex-col">
                <span className="inline-block text-xs font-semibold text-primary bg-primary/8 rounded-full px-3 py-1 mb-4 w-fit">{article.category}</span>
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {lang === "am" && article.title_am ? article.title_am : article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                  {lang === "am" && article.intro_am ? article.intro_am : article.intro}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  {t("insights.readMore")} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Insights;
