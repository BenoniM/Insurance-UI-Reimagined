import { Globe, CreditCard, MapPin, Languages } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";
import localImg from "@/assets/local-advantage.jpg";

const LocalTrust = () => {
  const { t } = useLanguage();
  const advantages = [
    { icon: Languages, title: t("local.multilingual"), description: t("local.multilingualDesc") },
    { icon: CreditCard, title: t("local.payments"), description: t("local.paymentsDesc") },
    { icon: MapPin, title: t("local.coverage"), description: t("local.coverageDesc") },
    { icon: Globe, title: t("local.digital"), description: t("local.digitalDesc") },
  ];

  return (
    <SectionWrapper>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <ScrollReveal animation="fadeLeft">
            <span className="section-badge mb-6 inline-block">LOCAL ADVANTAGE</span>
            <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
              {t("local.title")} <span className="text-primary">{t("local.titleHighlight")}</span> {t("local.titleEnd")}
            </h2>
          </ScrollReveal>
          <div className="space-y-4 mt-10">
            {advantages.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="flex gap-4 p-4 rounded-2xl hover:bg-accent/50 hover:translate-x-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <ScrollReveal animation="fadeRight" delay={0.15}>
          <div className="rounded-3xl overflow-hidden shadow-xl shadow-foreground/5 hover:scale-[1.02] transition-transform duration-300">
            <img src={localImg} alt="Addis Ababa cityscape" className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" loading="lazy" width={1024} height={768} />
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
};

export default LocalTrust;
