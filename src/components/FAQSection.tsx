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
  {
    question: "How do I file a claim?",
    answer: "Three easy ways: (1) chat with our AI assistant in the app or on WhatsApp, (2) call our 24/7 hotline at +251 11 123 4567, or (3) walk into any of our 12 branch offices. Most claims need just an ID, a short description, and a photo — that's it.",
  },
  {
    question: "How are premiums calculated?",
    answer: "We look at the type of coverage, the value of what's insured, your location, and your risk profile — nothing more. No hidden fees, no mysterious adjustments. Use our quote tool to see your exact price in seconds.",
  },
  {
    question: "Is WASS Insurance licensed and regulated?",
    answer: "Yes. WASS Insurance is fully licensed and regulated by the National Bank of Ethiopia (NBE) and meets every capital, solvency, and reporting standard required to underwrite policies in Ethiopia.",
  },
  {
    question: "Can I manage everything from my phone?",
    answer: "Absolutely. Buy a policy, file a claim, make payments, download documents, and chat with support — all from the WASS dashboard or via WhatsApp/Telegram. Branches are there if you want them, not because you have to use them.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "TeleBirr, CBE Birr, bank transfer, and cash at any branch. Pay monthly, quarterly, or annually — your choice, no penalty for switching.",
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
