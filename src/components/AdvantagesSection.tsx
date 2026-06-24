import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  Database,
  Zap,
  Plug,
} from "lucide-react";
import { ArrowRight } from "lucide-react";

const advantages = [
  {
    icon: BarChart3,
    title: "Actionable Risk Intelligence",
    description:
      "Transform static data into dynamic, real-time insights to manage portfolio performance and reduce loss ratios by a proven 20%.",
  },
  {
    icon: Users,
    title: "Enhanced Customer Engagement",
    description:
      "Enable active client engagement with digital insights and enhanced service offerings that foster lasting value and loyalty.",
  },
  {
    icon: Database,
    title: "Increased Data Efficiency",
    description:
      "Optimize the process of gathering risk survey information, ensuring data is standardized, relevant, and consistent — improving accuracy by up to 50%.",
  },
  {
    icon: Zap,
    title: "Become More Productive",
    description:
      "Surveyors conduct 15% more surveys on average with reduced admin burden, opening more time for valuable consultancy services.",
  },
  {
    icon: Plug,
    title: "Hassle-Free Integration",
    description:
      "Cloud-native SaaS platform integrates with underwriting, policy administration, claims, and pricing systems. Connect to IoT devices and third-party tools.",
  },
];

const AdvantagesSection = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-coral font-heading text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Advantages
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold text-foreground"
          >
            Why Choose RiskGuard
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="w-11 h-11 rounded-lg coral-gradient flex items-center justify-center mb-4">
                <adv.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {adv.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {adv.description}
              </p>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.a
            href="#demo"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="coral-gradient rounded-xl p-6 flex flex-col justify-center items-center text-center group hover:opacity-90 transition-opacity"
          >
            <span className="font-heading text-xl font-bold text-primary-foreground mb-2">
              Request Demo
            </span>
            <ArrowRight className="w-6 h-6 text-primary-foreground group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
