import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SectionWrapper from "./SectionWrapper";
import ScrollReveal from "./ScrollReveal";
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  { quote: { en: "Filed my motor claim from my phone at 8am. Money in my account by lunch. I genuinely couldn't believe it.", am: "የመኪና ጥያቄዬን በስልኬ አቀረብኩ። በምሳ ሰዓት ገንዘቡ መጣ። ማመን አልቻልኩም።" }, name: "Abebe Tadesse", role: { en: "Motor Insurance Client", am: "የመኪና ኢንሹራንስ ደንበኛ" }, gradient: "from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)]" },
  { quote: { en: "Finally — an insurance company that talks like a human. No fine print games. WASS just gets it.", am: "በመጨረሻ እንደ ሰው የሚናገር የኢንሹራንስ ድርጅት።" }, name: "Sara Mohammed", role: { en: "Business Insurance Client", am: "የንግድ ኢንሹራንስ ደንበኛ" }, gradient: "from-[hsl(160,55%,45%)] to-[hsl(160,50%,55%)]" },
  { quote: { en: "Family emergency at 2am. WhatsApp'd WASS, had pre-approval before sunrise. They actually care.", am: "በ2am የቤተሰብ ድንገተኛ ነበር። ዋስ ቀደም ብሎ ፈቀደ።" }, name: "Daniel Bekele", role: { en: "Health Insurance Client", am: "የጤና ኢንሹራንስ ደንበኛ" }, gradient: "from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)]" },
  { quote: { en: "Switched from a legacy insurer and saved 30%. The app alone is worth switching for.", am: "ከቀድሞ ኢንሹራንስ ቀይሬ 30% ቀንሻለሁ።" }, name: "Meron Alemu", role: { en: "Life Insurance Client", am: "የህይወት ኢንሹራንስ ደንበኛ" }, gradient: "from-[hsl(205,65%,48%)] to-[hsl(201,78%,23%)]" },
  { quote: { en: "I love that part of my premium funds clean water in rural Ethiopia. My insurance has a soul now.", am: "ከፕሪሚየሜ ክፍል ለንጹህ ውሃ መዋሉን እወዳለሁ።" }, name: "Yohannes Girma", role: { en: "Property Insurance Client", am: "የንብረት ኢንሹራንስ ደንበኛ" }, gradient: "from-[hsl(160,55%,45%)] to-[hsl(205,65%,48%)]" },
];

const Testimonials = () => {
  const { lang } = useLanguage();
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(201,78%,23%)/0.03] to-[hsl(160,55%,45%)/0.05]" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="section-badge mb-6 inline-block">CLIENT STORIES</span>
            <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
              Trusted by <span className="text-primary">Thousands</span> of
              <br />Ethiopian Families & Businesses
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
              Hear from real policyholders about their experience with WASS Insurance.
            </p>
          </ScrollReveal>
        </div>
        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]} className="max-w-5xl mx-auto">
          <CarouselContent className="-ml-4">
            {testimonials.map((tm, i) => (
              <CarouselItem key={tm.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`h-full flex flex-col rounded-3xl p-8 bg-gradient-to-br ${tm.gradient} text-white shadow-lg`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-white/80 text-white/80" />)}
                  </div>
                  <p className="text-white/85 text-sm leading-relaxed mb-6 flex-1 italic">"{tm.quote[lang]}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-heading font-bold text-white text-sm">
                      {tm.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm text-white">{tm.name}</p>
                      <p className="text-xs text-white/65">{tm.role[lang]}</p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12" />
          <CarouselNext className="-right-4 md:-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
