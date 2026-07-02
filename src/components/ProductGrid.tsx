import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { getActiveProducts } from "@/data/products";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

import imgHospital from "@/assets/Coverage/Hospital-Clinic-1--Streamline-Milano-01.svg";
import imgLife from "@/assets/Coverage/Life-Coverage-01.svg";
import imgNetWorth from "@/assets/Coverage/Net-Worth--Streamline-Milano-01.svg";
import imgCar from "@/assets/Coverage/Speed-Go-Fast-4--Streamline-Milano-01.svg";

// TODO: swap in dedicated "Streamline Milano" style icons for Business
// (briefcase) and Investment (growth/plane) once available in
// src/assets/Coverage/. Reusing existing icons as placeholders for now.
const imgBusiness = imgNetWorth;
const imgInvestment = imgLife;

const imageMap: Record<string, string> = {
  Heart: imgLife,
  Car: imgCar,
  Home: imgNetWorth,
  Shield: imgHospital,
  Briefcase: imgBusiness,
  Plane: imgInvestment,
};

const ProductGrid = () => {
  const { t, lang } = useLanguage();
  const products = getActiveProducts();

  return (
    <SectionWrapper id="products" className="bg-slate-50/50 py-8 md:py-12">
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
                  "bg-emerald-500/10 hover:bg-emerald-500/20",
                  "bg-sky-500/10 hover:bg-sky-500/20",
                  "bg-teal-500/10 hover:bg-teal-500/20",
                  "bg-blue-500/10 hover:bg-blue-500/20",
                ][i % 4]} rounded-[24px] p-6 md:p-12 flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-400 h-full`}>
                  
                  {/* Image */}
                  <div className="h-32 w-32 mb-6 flex items-center justify-center">
                    <img 
                      src={imgSrc} 
                      alt={name} 
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out" 
                      style={{
                        filter: [
                          "invert(40%) sepia(55%) saturate(3200%) hue-rotate(167deg) brightness(75%) contrast(105%)", // bluish icon on greenish bg
                          "invert(43%) sepia(95%) saturate(420%) hue-rotate(124deg) brightness(72%) contrast(105%)", // greenish icon on bluish bg
                          "invert(20%) sepia(90%) saturate(4500%) hue-rotate(207deg) brightness(55%) contrast(120%)", // bluish icon on greenish bg, extra dark
                          "invert(45%) sepia(65%) saturate(500%) hue-rotate(113deg) brightness(75%) contrast(105%)", // greenish icon on bluish bg
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
                    
                    <button className="relative w-full bg-primary text-white font-semibold py-2.5 px-6 rounded-xl group-hover:-translate-y-1 transition-transform duration-300 shadow-md">
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