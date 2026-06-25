import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import PartnerMarquee from "./PartnerMarquee";

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    gsap.to(sectionRef.current.querySelectorAll(".ps-anim-up"), {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 md:py-[100px] bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div 
          className="text-center mb-16 ps-anim-up" 
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <span className="section-badge mb-6 inline-block">OUR PARTNERS</span>
          <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
            Backed By <span className="text-primary">Industry Leaders</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">
            We collaborate with the most reliable enterprises, financial institutions, and health networks across Ethiopia to bring you comprehensive coverage and absolute peace of mind.
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="ps-anim-up" style={{ opacity: 0, transform: "translateY(20px)" }}>
          <PartnerMarquee />
        </div>

      </div>    
    </section>
  );
}
