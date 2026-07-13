import ScrollReveal from "./ScrollReveal";

const articles = [
  {
    title: "The Future of Risk Engineering in a Digital World",
    excerpt:
      "How digital transformation is reshaping the way insurers approach risk assessment and management in commercial property.",
    tag: "Article",
  },
  {
    title: "Building Resilience: Climate Risk and Insurance",
    excerpt:
      "Senior underwriting and risk engineering professionals discuss emerging climate risks and adaptation strategies.",
    tag: "Article",
  },
  {
    title: "AI-Powered Risk Scoring: What Underwriters Need to Know",
    excerpt:
      "Exploring how artificial intelligence is enhancing risk evaluation accuracy and speeding up decision-making.",
    tag: "Article",
  },
  {
    title: "Bridging the Risk Engineering Talent Gap",
    excerpt:
      "Addressing the growing shortage of property risk engineers and how technology can help close the gap.",
    tag: "Article",
  },
];

const ResourcesSection = () => {
  return (
    <section id="resources" className="section-dark py-20 md:py-28 border-t border-dark-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-coral font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              Resources
            </p>
            <h2 className="section-title text-hero-foreground">
              Latest Insights
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={article.title} animation="fadeUp" delay={i * 0.1}>
              <a
                href="#"
                className="dark-card rounded-xl p-6 group hover:border-coral/40 transition-colors block h-full"
              >
                <span className="text-xs font-heading font-semibold text-coral uppercase tracking-wider">
                  {article.tag}
                </span>
                <h3 className="font-heading text-lg font-semibold text-hero-foreground mt-3 mb-2 group-hover:text-coral transition-colors">
                  {article.title}
                </h3>
                <p className="text-hero-muted text-sm font-body leading-relaxed">
                  {article.excerpt}
                </p>
                <span className="inline-block mt-4 text-coral text-sm font-heading font-medium">
                  Read more →
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
