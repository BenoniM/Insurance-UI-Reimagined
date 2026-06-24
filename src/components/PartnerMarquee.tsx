import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const partners = [
  { name: "National Bank of Ethiopia", abbr: "NBE" },
  { name: "Ethiopian Airlines", abbr: "ET" },
  { name: "Commercial Bank of Ethiopia", abbr: "CBE" },
  { name: "Ethio Telecom", abbr: "ET" },
  { name: "Dashen Bank", abbr: "DB" },
  { name: "Awash Bank", abbr: "AB" },
  { name: "Ministry of Finance", abbr: "MoF" },
  { name: "Zemen Bank", abbr: "ZB" },
  { name: "Bank of Abyssinia", abbr: "BoA" },
  { name: "Oromia Bank", abbr: "OB" },
];

const PartnerMarquee = () => {
  const doubled = [...partners, ...partners];
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!marqueeRef.current) return;
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });
  }, { scope: marqueeRef });

  return (
    <section className="py-10 overflow-hidden border-y border-border/40 bg-gradient-to-r from-[hsl(201,78%,23%)/0.03] via-[hsl(160,55%,45%)/0.03] to-[hsl(201,78%,23%)/0.03]">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
          Trusted by leading Ethiopian institutions & partners
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={marqueeRef}
          className="flex gap-8 items-center w-max"
        >
          {doubled.map((partner, i) => (
            <div
              key={`${partner.abbr}-${i}`}
              className="flex items-center gap-3 shrink-0 px-6 py-3 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)] flex items-center justify-center font-heading font-bold text-xs text-white">
                {partner.abbr}
              </div>
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
