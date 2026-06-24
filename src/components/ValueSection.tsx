import { motion } from "framer-motion";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const ValueSection = () => {
  return (
    <section id="value" className="section-dark py-20 md:py-28 border-t border-dark-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-coral font-heading text-sm font-semibold tracking-widest uppercase mb-3"
          >
            How RiskGuard Delivers Value
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold text-hero-foreground"
          >
            Actionable Intelligence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-hero-muted max-w-2xl mx-auto font-body"
          >
            Gain real-time, portfolio-wide risk insights that guide smarter risk
            selection and pricing strategies with a proven 20% reduction in loss ratios.
          </motion.p>
        </div>

        {/* Stat highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="coral-gradient rounded-2xl px-12 py-8 text-center">
            <span className="font-heading text-6xl md:text-7xl font-bold text-primary-foreground">
              20%
            </span>
            <p className="text-primary-foreground/80 font-body mt-1 text-sm">
              Proven reduction in loss ratios
            </p>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl overflow-hidden border border-dark-surface shadow-2xl"
        >
          <img
            src={dashboardPreview}
            alt="RiskGuard analytics dashboard"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ValueSection;
