import { motion } from "framer-motion";
import { Calculator, FileText, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "./ScrollReveal";

const QuickActions = () => {
  const { t } = useLanguage();

  const actions = [
    { icon: Calculator, label: t("quick.getQuote"), description: t("quick.instantEstimate"), href: "/quote", gradient: "from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)]" },
    { icon: FileText, label: t("quick.fileClaim"), description: t("quick.startClaim"), href: "/claims", gradient: "from-[hsl(160,55%,45%)] to-[hsl(160,50%,55%)]" },
    { icon: MapPin, label: t("quick.findBranch"), description: t("quick.nearestOffice"), href: "/contact#branches", gradient: "from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)]" },
    { icon: Phone, label: t("quick.callNow"), description: "+251 11 123 4567", href: "tel:+251111234567", gradient: "from-[hsl(205,65%,48%)] to-[hsl(201,78%,23%)]" },
  ];

  return (
    <section className="relative z-20 px-4 lg:px-8 py-16">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {actions.map((action, i) => (
            <ScrollReveal key={action.label} animation="scaleUp" delay={i * 0.06}>
              <motion.a
                href={action.href}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`rounded-3xl p-5 md:p-6 flex flex-col items-center text-center gap-3 cursor-pointer group relative overflow-hidden bg-gradient-to-br ${action.gradient} text-white shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative z-10 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all"
                >
                  <action.icon className="w-5 h-5 text-white" />
                </motion.div>
                <span className="relative z-10 font-heading font-semibold text-sm text-white">{action.label}</span>
                <span className="relative z-10 text-xs text-white/70 hidden sm:block">{action.description}</span>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
