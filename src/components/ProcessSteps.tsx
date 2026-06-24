import { motion } from "framer-motion";
import { ClipboardList, FileSearch, CheckCircle, Banknote } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

const gradients = [
  "from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)]",
  "from-[hsl(160,55%,45%)] to-[hsl(160,50%,55%)]",
  "from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)]",
  "from-[hsl(205,65%,48%)] to-[hsl(160,50%,55%)]",
];

const ProcessSteps = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: ClipboardList, number: "1", title: t("process.step1"), description: t("process.step1Desc") },
    { icon: FileSearch, number: "2", title: t("process.step2"), description: t("process.step2Desc") },
    { icon: CheckCircle, number: "3", title: t("process.step3"), description: t("process.step3Desc") },
    { icon: Banknote, number: "4", title: t("process.step4"), description: t("process.step4Desc") },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(201,78%,23%)/0.03] via-transparent to-[hsl(160,55%,45%)/0.05]" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="section-badge mb-6 inline-block">HOW IT WORKS</span>
            <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
              {t("process.title")}
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">{t("process.subtitle")}</p>
          </ScrollReveal>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="qupe-card !p-6 flex items-start gap-6 group relative overflow-hidden"
              >
                {/* Subtle gradient stripe on left */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${gradients[i]} opacity-0 group-hover:opacity-100 transition-opacity rounded-l-3xl`} />
                
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center shrink-0 font-heading font-bold text-white text-lg shadow-lg`}
                >
                  {step.number}
                </motion.div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
