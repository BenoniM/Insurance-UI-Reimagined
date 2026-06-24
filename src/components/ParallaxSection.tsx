import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

const ParallaxSection = ({ children, className, speed = 0.3, direction = "up" }: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !targetRef.current) return;
    
    const factor = direction === "up" ? -1 : 1;
    const yOffset = speed * 100 * factor;

    gsap.fromTo(targetRef.current, 
      { y: -yOffset },
      {
        y: yOffset,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  }, [speed, direction]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div ref={targetRef}>{children}</div>
    </div>
  );
};

export default ParallaxSection;
