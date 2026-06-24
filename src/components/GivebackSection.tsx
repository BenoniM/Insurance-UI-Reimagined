import { Heart, Droplet, GraduationCap, Stethoscope, ArrowRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";
import CTAButton from "./CTAButton";

const causes = [
  { icon: Droplet, title: "Clean Water", desc: "Funding wells & water access in rural Ethiopia", color: "from-[hsl(205,65%,48%)] to-[hsl(201,78%,23%)]" },
  { icon: GraduationCap, title: "Education", desc: "School supplies & scholarships for children", color: "from-[hsl(160,55%,45%)] to-[hsl(160,50%,55%)]" },
  { icon: Stethoscope, title: "Healthcare", desc: "Mobile clinics & medical supplies for underserved communities", color: "from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)]" },
  { icon: Heart, title: "Disaster Relief", desc: "Rapid response support during emergencies", color: "from-[hsl(160,55%,45%)] to-[hsl(205,65%,48%)]" },
];

const steps = [
  { n: "1", title: "Choose your cause", desc: "When you sign up for a WASS policy, pick a cause you care about." },
  { n: "2", title: "We pool the leftovers", desc: "We take a flat fee. Whatever isn't paid out in claims goes into the Giveback pot." },
  { n: "3", title: "Communities get funded", desc: "Once a year, every Birr left over flows directly to the nonprofits our customers chose." },
];

const GivebackSection = () => {
  return (
    <SectionWrapper id="giveback" className="relative">
      {/* Backdrop accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[hsl(160,55%,45%)/0.04] to-transparent" />

      <div className="text-center mb-16">
        <ScrollReveal>
          <span className="section-badge mb-6 inline-block">WASS GIVEBACK</span>
          <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
            Insurance with a <span className="text-primary">Bigger Purpose</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-lg">
            Traditional insurers profit by paying out as little as possible. We flipped the model — what we don't pay in claims gets returned to causes our customers care about. Honesty is built into how we work.
          </p>
        </ScrollReveal>
      </div>

      {/* How it works */}
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16">
        {steps.map((step, i) => (
          <ScrollReveal key={step.n} delay={i * 0.08}>
            <div
              className="qupe-card !p-8 h-full text-center relative hover:-translate-y-1.5 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)] flex items-center justify-center mx-auto mb-5 font-heading font-bold text-white text-lg shadow-lg">
                {step.n}
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Causes grid */}
      <ScrollReveal>
        <h3 className="font-heading text-2xl md:text-3xl text-center text-foreground mb-8">
          Causes our community supports
        </h3>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {causes.map((cause, i) => (
          <ScrollReveal key={cause.title} animation="fadeUp" delay={i * 0.06}>
            <div
              className={`rounded-3xl p-7 bg-gradient-to-br ${cause.color} text-white shadow-lg relative overflow-hidden h-full group hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300`}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
              <div
                className="relative z-10 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              >
                <cause.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="relative z-10 font-heading font-semibold text-lg text-white mb-2">{cause.title}</h4>
              <p className="relative z-10 text-sm text-white/80 leading-relaxed">{cause.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Impact callout */}
      <ScrollReveal delay={0.2}>
        <div
          className="mt-16 max-w-5xl mx-auto rounded-3xl p-10 md:p-12 bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(201,78%,18%)] text-white shadow-xl relative overflow-hidden hover:scale-[1.005] transition-transform duration-300"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/15" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5" />

          <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-bold tracking-wider uppercase text-white/90 mb-4">
                IMPACT TO DATE
              </span>
              <h3 className="qupe-heading text-3xl md:text-4xl text-white mb-3">
                Over 4.2M Birr returned to Ethiopian communities
              </h3>
              <p className="text-white/75 leading-relaxed">
                Funding clean water projects, scholarships, mobile clinics, and emergency response — chosen by you, the policyholder. Your coverage doesn't just protect you, it lifts up the country we all share.
              </p>
            </div>
            <div className="flex md:justify-end">
              <CTAButton href="/quote" variant="primary" size="lg" className="!bg-white !text-[hsl(201,78%,23%)] hover:!bg-white/90">
                Join the movement <ArrowRight className="w-4 h-4 ml-1" />
              </CTAButton>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
};

export default GivebackSection;
