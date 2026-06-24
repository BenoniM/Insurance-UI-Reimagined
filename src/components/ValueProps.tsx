import { Zap, Clock, ShieldCheck, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "./ScrollReveal";

const cardStyles = [
  { bg: "bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)]", iconBg: "bg-white/20", text: "text-white", muted: "text-white/70" },
  { bg: "bg-gradient-to-br from-[hsl(160,55%,45%)] to-[hsl(160,50%,55%)]", iconBg: "bg-white/20", text: "text-white", muted: "text-white/70" },
  { bg: "qupe-card-warm", iconBg: "bg-primary/10", text: "text-foreground", muted: "text-muted-foreground" },
  { bg: "bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)]", iconBg: "bg-white/20", text: "text-white", muted: "text-white/70" },
];

const ValueProps = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Zap, title: t("value.fastClaims"), proof: t("value.fastClaimsProof"), stat: "48h" },
    { icon: ShieldCheck, title: t("value.licensed"), proof: t("value.licensedProof"), stat: "100%" },
    { icon: Clock, title: t("value.support"), proof: t("value.supportProof"), stat: "24/7" },
    { icon: HeartHandshake, title: t("value.local"), proof: t("value.localProof"), stat: "15yr" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(160,55%,45%)/0.03] to-transparent" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="section-badge mb-6 inline-block">A NEW KIND OF INSURANCE</span>
            <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
              Insurance that's <span className="text-primary">Instant, Honest & Caring</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
              We took everything that's broken about insurance — the forms, the fine print, the fight over claims — and built the opposite. Powered by technology, grounded in trust.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {values.map((item, i) => {
            const style = cardStyles[i];
            const isGradient = style.bg.startsWith("bg-gradient");
            return (
              <ScrollReveal key={item.title} animation="fadeUp" delay={i * 0.08}>
                <div
                  className={`${isGradient ? style.bg + " rounded-3xl p-8 shadow-lg" : style.bg} text-center relative overflow-hidden group cursor-default hover:-translate-y-2 hover:scale-[1.03] active:scale-95 transition-all duration-300`}
                >
                  {isGradient && (
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20" />
                      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/15" />
                    </div>
                  )}

                  <div className={`absolute top-4 right-4 text-xs font-bold ${isGradient ? "text-white/30" : "text-primary/30"} font-heading`}>
                    {item.stat}
                  </div>

                  <div
                    className={`relative z-10 w-14 h-14 rounded-2xl ${style.iconBg} flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-115`}
                  >
                    <item.icon className={`w-7 h-7 ${isGradient ? "text-white" : "text-primary"}`} />
                  </div>
                  <h3 className={`relative z-10 font-heading font-semibold text-lg ${style.text} mb-2`}>{item.title}</h3>
                  <p className={`relative z-10 text-sm ${style.muted} leading-relaxed`}>{item.proof}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
