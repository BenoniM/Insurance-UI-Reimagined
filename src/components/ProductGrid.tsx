import { Heart, Car, Home, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

const iconMap: Record<string, typeof Heart> = { Heart, Car, Home, Shield };

const cardGradients = [
  "from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)]",
  "from-[hsl(160,55%,45%)] to-[hsl(160,50%,55%)]",
  "from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)]",
  "from-[hsl(205,65%,48%)] to-[hsl(201,78%,23%)]",
];

const ProductGrid = () => {
  const { t, lang } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setProducts(data);
      });
  }, []);

  return (
    <SectionWrapper id="products">
      <div className="text-center mb-16">
        <ScrollReveal>
          <span className="section-badge mb-6 inline-block">INSURANCE SOLUTIONS</span>
          <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
            Comprehensive Coverage for
            <br />
            <span className="text-primary">Every Need</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-lg">
            From life and health to motor and property — we offer tailored insurance products designed to protect what matters most to Ethiopian families and businesses.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product, i) => {
          const Icon = iconMap[product.icon] || Shield;
          const name = lang === "am" && product.name_am ? product.name_am : product.name;
          const desc = lang === "am" && product.short_description_am ? product.short_description_am : product.short_description;
          const gradient = cardGradients[i % cardGradients.length];

          return (
            <ScrollReveal key={product.slug} animation="fadeUp" delay={i * 0.08}>
              <Link to={`/products/${product.slug}`} className="group block h-full">
                <div
                  className="rounded-3xl h-full flex flex-col relative overflow-hidden p-8 bg-gradient-to-br text-white shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${gradient.includes("201") ? "hsl(201,78%,23%)" : "hsl(160,55%,45%)"}, ${gradient.includes("205") ? "hsl(205,65%,48%)" : "hsl(160,50%,55%)"})`
                  }}
                >
                  {/* Glass overlay pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
                  </div>

                  <div
                    className="relative z-10 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="relative z-10 font-heading font-semibold text-lg text-white mb-2">{name}</h3>
                  <p className="relative z-10 text-sm text-white/75 leading-relaxed flex-1 mb-5">{desc}</p>
                  <span
                    className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    {t("products.learnMore")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default ProductGrid;
