import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section id="testimonial" className="section-dark py-20 md:py-28 border-t border-dark-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Quote className="w-10 h-10 text-coral mx-auto mb-6" />
          <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl font-medium text-hero-foreground leading-relaxed">
            "Using RiskGuard has enhanced the technical support we offer to our
            clients as well as providing us with the ability to deliver key
            benchmarking metrics of our insured risks."
          </blockquote>
          <p className="mt-8 text-hero-muted font-body text-sm">
            Chief Loss Control Officer
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
