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

  const accentColor = "hsl(201 78% 23%)";
  const cardBackgrounds = [
    "bg-[hsl(160,40%,90%)]",
    "bg-[hsl(201,78%,92%)]",
    "bg-[hsl(205,65%,88%)]",
  ];

  // Three distinct animated decorative patterns, cycled by card index, all bottom-right
  const patterns = [
    // Ripple circles — expand outward and fade, looping
    <svg
      className="absolute -bottom-6 -right-6 w-32 h-32"
      style={{ color: accentColor }}
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
    </svg>,
    // Dot grid — each dot pulses in and out with a stagger
    <svg
      className="absolute -bottom-4 -right-4 w-28 h-28"
      style={{ color: accentColor }}
      viewBox="0 0 80 80"
      fill="none"
    >
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => {
          const delay = (row + col) * 0.15;
          return (
            <circle key={`${row}-${col}`} cx={8 + col * 16} cy={8 + row * 16} r="2.2" fill="currentColor" opacity="0.25">
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
    </svg>,
    // Diagonal lines — extend and retract from the corner
    <svg
      className="absolute -bottom-6 -right-6 w-32 h-32"
      style={{ color: accentColor }}
      viewBox="0 0 100 100"
      fill="none"
    >
      {Array.from({ length: 6 }).map((_, i) => {
        const delay = i * 0.18;
        return (
          <line
            key={i}
            x1={20 + i * 14}
            y1="100"
            x2={20 + i * 14}
            y2="100"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.3"
          >
            <animate
              attributeName="x2"
              values={`${20 + i * 14};${0 + i * 14};${20 + i * 14}`}
              dur="2.8s"
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values="100;0;100"
              dur="2.8s"
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}
    </svg>,
  ];

  return (
    <SectionWrapper id="news" className="bg-white">
      <div className="text-center mb-16">
        <ScrollReveal>
          <span className="section-badge mb-6 inline-block">NEWS & INSIGHTS</span>
          <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
            Latest News <span className="text-primary">& Insights</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
            Company announcements, industry updates, awareness articles, and CSR activities from WASS Insurance.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {articles.map((article, i) => (
          <ScrollReveal key={article.slug} animation="fadeUp" delay={i * 0.08}>
            <Link to={`/news/${article.slug}`} className="group block h-full">
              <div className={`insights-card relative h-full flex flex-col overflow-hidden ${cardBackgrounds[i % cardBackgrounds.length]}`}>
                {/* Decorative animated pattern, behind content */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {patterns[i % patterns.length]}
                </div>

                <div className="relative z-10 flex flex-col h-full">
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
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Insights;
