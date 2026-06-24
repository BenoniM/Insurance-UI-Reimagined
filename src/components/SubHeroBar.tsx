import { motion } from "framer-motion";

const SubHeroBar = () => {
  return (
    <section className="section-dark py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-hero-muted text-base md:text-lg max-w-4xl mx-auto leading-relaxed font-body"
        >
          Our advanced solutions streamline risk engineering processes to improve
          efficiency up to <span className="text-coral font-semibold">50%</span> and provide
          consistent and accurate information to enhance your underwriting
          precision to increase profitability by up to{" "}
          <span className="text-coral font-semibold">20%</span>
        </motion.p>
      </div>
    </section>
  );
};

export default SubHeroBar;
