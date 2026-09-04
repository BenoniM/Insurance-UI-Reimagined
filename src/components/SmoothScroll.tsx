import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

let globalLenis: Lenis | null = null;
export const getGlobalLenis = () => globalLenis;

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with gentle dampening and reduced wheelMultiplier to slow down rapid scrolling
    const lenis = new Lenis({
      duration: 1.25, // Natural deceleration time
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease-out
      wheelMultiplier: 0.75, // Slows down distance per wheel notch so the page doesn't fly by too quickly
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    // Synchronize Lenis scroll positions with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis animations via GSAP's central requestAnimationFrame ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      globalLenis = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
