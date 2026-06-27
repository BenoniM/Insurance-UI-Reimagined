import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

import imgHospital from "@/assets/Coverage/Hospital-Clinic-1--Streamline-Milano-01.svg";
import imgLife from "@/assets/Coverage/Life-Coverage-01.svg";
import imgNetWorth from "@/assets/Coverage/Net-Worth--Streamline-Milano-01.svg";
import imgCar from "@/assets/Coverage/Speed-Go-Fast-4--Streamline-Milano-01.svg";

const imageMap: Record<string, string> = {
  Heart: imgLife,
  Car: imgCar,
  Home: imgNetWorth,
  Shield: imgHospital,
};

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
    <SectionWrapper id="products" className="bg-slate-50/50 py-20">
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
        {products.map((product, i) => {
          const name = lang === "am" && product.name_am ? product.name_am : product.name;
          const desc = lang === "am" && product.short_description_am ? product.short_description_am : product.short_description;
          const imgSrc = imageMap[product.icon] || imgHospital;

          return (
            <ScrollReveal key={product.slug} animation="fadeUp" delay={i * 0.08}>
              <Link to={`/products/${product.slug}`} className="group block h-full">
                <div className={`${[
                  "bg-sky-500/10 hover:bg-sky-500/20",
                  "bg-emerald-500/10 hover:bg-emerald-500/20",
                  "bg-blue-500/10 hover:bg-blue-500/20",
                  "bg-teal-500/10 hover:bg-teal-500/20",
                ][i % 4]} rounded-[24px] p-6 md:p-12 flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-400 h-full`}>
                  
                  {/* Image */}
                  <div className="h-32 w-32 mb-6 flex items-center justify-center">
                    <img 
                      src={imgSrc} 
                      alt={name} 
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out" 
                      style={{
                        filter: [
                          "invert(53%) sepia(48%) saturate(3020%) hue-rotate(167deg) brightness(98%) contrast(92%)", // bluish (sky-500)
                          "invert(58%) sepia(58%) saturate(452%) hue-rotate(113deg) brightness(97%) contrast(92%)", // greenish (emerald-500)
                          "invert(41%) sepia(74%) saturate(3821%) hue-rotate(207deg) brightness(101%) contrast(98%)", // bluish (blue-500)
                          "invert(56%) sepia(87%) saturate(389%) hue-rotate(124deg) brightness(94%) contrast(92%)", // greenish (teal-500)
                        ][i % 4]
                      }}
                    />
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="font-heading font-semibold text-2xl text-slate-900 mb-3">{name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
                    {desc}
                  </p>
                  
                  {/* Button */}
                  <div className="w-full relative mt-auto">
                    {/* Glow effect behind button */}
                    <div className="absolute inset-0 bg-primary/30 blur-lg rounded-xl translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <button className="relative w-full bg-primary text-white font-semibold py-3.5 px-6 rounded-xl group-hover:-translate-y-1 transition-transform duration-300 shadow-md">
                      {t("products.learnMore").toUpperCase()}
                    </button>
                  </div>
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
