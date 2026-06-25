import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    question: "How is WASS different from a traditional insurance company?",
    answer: "Traditional insurers profit from whatever's left after paying claims — which puts them in conflict with you. WASS works on a flat fee model: we take a fixed percentage of your premium for operating costs, use the rest to pay claims, and any leftover goes to causes our customers care about through our Giveback program. No conflict, no incentive to fight your claim.",
  },
  {
    question: "How fast can I actually get insured?",
    answer: "Most policies are active in under 5 minutes. Get a quote online, answer a few simple questions, pay via TeleBirr, CBE Birr, or bank transfer, and your coverage starts immediately. No paperwork, no branch visit required.",
  },
  {
    question: "How fast do you really pay claims?",
    answer: "Simple claims are reviewed by our AI within minutes and many are paid in under 48 hours. More complex claims involve a human reviewer and typically settle in 3–5 business days. We commit to keeping you updated at every step — no silence, no surprises.",
  },
  {
    question: "What is the WASS Giveback program?",
    answer: "Each year, the leftover money from unclaimed premiums goes to nonprofits chosen by our customers — supporting clean water access, education, healthcare, and disaster relief across Ethiopia. Since launch, our community has helped fund real impact in dozens of communities.",
  },
  {
    question: "What types of insurance does WASS offer?",
    answer: "Life, Health, Motor, Property, Travel, and Commercial/Business insurance — all designed specifically for Ethiopian individuals, families, and businesses. Bundle multiple policies and save up to 25%.",
  },
];

const FAQItem = ({ faq, index, isOpen, onToggle }: { faq: typeof faqs[0]; index: number; isOpen: boolean; onToggle: () => void }) => (
  <ScrollReveal delay={index * 0.05}>
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-primary/30 bg-gradient-to-br from-[hsl(201,78%,23%)/0.04] to-[hsl(160,55%,45%)/0.04]"
          : "border-border bg-card hover:border-primary/15"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
      >
        <span className={`font-heading font-semibold text-base transition-colors ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
          {faq.question}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 transform ${isOpen ? "rotate-180" : ""} ${
            isOpen
              ? "bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)] text-white"
              : "bg-primary/10 text-primary"
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6">
            <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  </ScrollReveal>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="section-badge mb-6 inline-block">FAQ</span>
            <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
              Common <span className="text-primary">Questions</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
              Everything you need to know about our insurance products, claims process, and coverage options.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQSection;
