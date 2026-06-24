import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AnimationType = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "stagger";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

const ScrollReveal = ({ children, animation = "fadeUp", delay = 0, className }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    let fromVars: gsap.TweenVars = { opacity: 0 };
    let toVars: gsap.TweenVars = { 
      opacity: 1, 
      duration: 0.6, 
      delay, 
      ease: "power2.out", 
      scrollTrigger: { 
        trigger: ref.current, 
        start: "top 85%" 
      } 
    };

    switch (animation) {
      case "fadeUp":
        fromVars.y = 40;
        toVars.y = 0;
        break;
      case "fadeLeft":
        fromVars.x = -40;
        toVars.x = 0;
        break;
      case "fadeRight":
        fromVars.x = 40;
        toVars.x = 0;
        break;
      case "scaleUp":
        fromVars.scale = 0.85;
        toVars.scale = 1;
        toVars.duration = 0.5;
        break;
      case "stagger":
        fromVars.y = 20;
        toVars.y = 0;
        toVars.duration = 0.4;
        break;
    }

    gsap.fromTo(ref.current, fromVars, toVars);
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
