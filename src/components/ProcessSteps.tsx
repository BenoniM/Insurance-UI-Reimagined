import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    titleKey: "process.step1" as const,
    descKey: "process.step1Desc" as const,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    imageAlt: "Browsing insurance plans on a laptop",
  },
  {
    titleKey: "process.step2" as const,
    descKey: "process.step2Desc" as const,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    imageAlt: "Getting an instant insurance quote",
  },
  {
    titleKey: "process.step3" as const,
    descKey: "process.step3Desc" as const,
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",
    imageAlt: "Submitting documents for insurance application",
  },
  {
    titleKey: "process.step4" as const,
    descKey: "process.step4Desc" as const,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    imageAlt: "Covered and protected by insurance",
  },
];

// Darker navy-blue tinted border colour — visible but not harsh
const BORDER = "hsl(201 78% 23% / 0.22)";
const BORDER_STYLE = { borderColor: BORDER };

const ProcessSteps = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    /*
      section has NO horizontal padding so every border line
      runs truly edge-to-edge of the viewport.
      Vertical spacing reduced: small top gap (pt-6) since
      ValueProps already gives bottom breathing room.
    */
    <section className="pt-6 pb-20 overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row w-full">

        {/* ── LEFT column ── */}
        {/* border-t top, border-b bottom → matches the right-side lines */}
        <div
          className="
            lg:w-5/12 flex flex-col justify-start
            px-4 sm:px-8 lg:pl-12 xl:pl-16 lg:pr-16
            pt-8 pb-10 lg:pb-10
            border-t border-b
          "
          style={BORDER_STYLE}
        >
          <ScrollReveal>
            <span className="section-badge mb-5 inline-block">HOW IT WORKS</span>
            <h2 className="qupe-heading text-4xl md:text-[2.75rem] text-foreground mt-3 leading-tight">
              {t("process.title")}
            </h2>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed max-w-xs">
              {t("process.subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* ── vertical divider ── */}
        <div
          className="hidden lg:block w-px shrink-0 self-stretch"
          style={{ background: BORDER }}
        />

        {/* ── RIGHT column ── */}
        <div className="lg:flex-1 flex flex-col">

          {/* top border — aligns with left column's top border */}
          <div className="border-t" style={BORDER_STYLE} />

          {steps.map((step, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="border-b"
                style={BORDER_STYLE}
              >
                {/* header row */}
                <button
                  className="w-full flex items-center py-5 px-4 sm:px-8 lg:px-10 xl:pr-16 text-left"
                  onClick={() => setOpenIndex(i)}
                  aria-expanded={isOpen}
                >
                  {/* square bullet */}
                  <span className="flex items-center justify-center w-6 mr-5 shrink-0">
                    <span
                      className="w-[7px] h-[7px] rounded-[1px] transition-all duration-300"
                      style={{
                        background: isOpen ? BORDER.replace("0.22", "1") : "transparent",
                        border: `1.5px solid ${BORDER.replace("0.22", "0.5")}`,
                      }}
                    />
                  </span>

                  {/* title */}
                  <span
                    className={`flex-1 font-heading font-semibold text-xl transition-colors duration-200 ${
                      isOpen ? "text-foreground" : "text-foreground/50"
                    }`}
                  >
                    {t(step.titleKey)}
                  </span>

                  {/* +/− */}
                  <span
                    className={`text-2xl font-extralight leading-none w-6 text-right shrink-0 transition-colors duration-200 ${
                      isOpen ? "text-foreground" : "text-foreground/30"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* expanded body — grid-rows, no bounce */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-6 items-start px-4 sm:px-8 lg:px-10 xl:pr-16 pl-16 pb-7">
                      {/* description */}
                      <p className="text-muted-foreground leading-relaxed text-sm sm:flex-1">
                        {t(step.descKey)}
                      </p>

                      {/* image */}
                      <div
                        className="w-full sm:w-44 shrink-0 overflow-hidden rounded-sm"
                        style={{ aspectRatio: "4/3" }}
                      >
                        <img
                          src={step.image}
                          alt={step.imageAlt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

        </div>{/* end right */}
      </div>
    </section>
  );
};

export default ProcessSteps;
