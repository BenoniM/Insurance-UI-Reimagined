import { useEffect, useRef } from "react";
import gsap from "gsap";

import ethioTelecom from "../assets/PartnerLogo/Ethio-Telecom.png";
import cbe from "../assets/PartnerLogo/CBE.png";
import awash from "../assets/PartnerLogo/Awash_International_Bank.png";
import zemen from "../assets/PartnerLogo/Zemen.png";
import ethAirlines from "../assets/PartnerLogo/Eth Airlines.png";
import abyssinia from "../assets/PartnerLogo/Abyssinia.png";
import nbe from "../assets/PartnerLogo/National_Bank_of_Ethiopia.png";
import dashen from "../assets/PartnerLogo/Dashen_Bank.png";
import mof from "../assets/PartnerLogo/Ministry_of_Finance_(Ethiopia)_Flag.png";
import oromia from "../assets/PartnerLogo/Oromia-Bank.png";

// ─── Partner data ──────────────────────────────────────────────────────────
const partners = [
  { name: "National Bank of Ethiopia",   color: "#141E2A", logo: nbe },
  { name: "Ethiopian Airlines",          color: "#009A44", logo: ethAirlines },
  { name: "Commercial Bank of Ethiopia", color: "#9C1E88", logo: cbe },
  { name: "Ethio Telecom",               color: "#8DC14D", logo: ethioTelecom },
  { name: "Dashen Bank",                 color: "#004B87", logo: dashen },
  { name: "Awash Bank",                  color: "#F69139", logo: awash },
  { name: "Ministry of Finance",         color: "#0D2D5C", logo: mof },
  { name: "Zemen Bank",                  color: "#D32850", logo: zemen },
  { name: "Bank of Abyssinia",           color: "#f1ae1c", logo: abyssinia },
  { name: "Oromia Bank",                 color: "#4E58A0", logo: oromia },
];

const trackData = [...partners, ...partners, ...partners];

interface CardProps {
  name: string;
  brand: string;
  logo: string;
  onPause: () => void;
  onResume: () => void;
}

function PartnerCard({ name, brand, logo, onPause, onResume }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onPause();
    const card = cardRef.current;
    const ripple = rippleRef.current;
    if (!card || !ripple) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = Math.max(x, rect.width - x);
    const dy = Math.max(y, rect.height - y);
    const finalSize = Math.sqrt(dx * dx + dy * dy) * 2.2;

    tween.current?.kill();
    const isGradient = brand.includes("gradient");

    gsap.set(ripple, {
      left: x,
      top: y,
      width: 0,
      height: 0,
      opacity: 1,
      backgroundColor: isGradient ? "transparent" : brand,
      backgroundImage: isGradient ? brand : "none",
    });

    tween.current = gsap.to(ripple, {
      width: finalSize,
      height: finalSize,
      duration: 0.52,
      ease: "power2.out",
      onStart: () => card.classList.add("is-hovered"),
    });
  };

  const handleMouseLeave = () => {
    onResume();
    const card = cardRef.current;
    const ripple = rippleRef.current;
    if (!card || !ripple) return;

    tween.current?.kill();
    tween.current = gsap.to(ripple, {
      width: 0,
      height: 0,
      opacity: 0,
      duration: 0.38,
      ease: "power2.in",
      onComplete: () => card.classList.remove("is-hovered"),
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative inline-flex items-center justify-center shrink-0 w-[180px] h-[100px] md:w-[280px] md:h-[140px] cursor-default overflow-hidden group bg-white rounded-xl md:rounded-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={rippleRef} 
        className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 w-0 h-0 opacity-100" 
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 z-10 transition-opacity duration-300 group-[.is-hovered]:opacity-0">
        <img 
          src={logo} 
          alt={name} 
          className="w-full h-full object-contain" 
        />
      </div>
      <span className="relative z-10 text-[13px] md:text-[15px] tracking-[0.05em] md:tracking-[0.1em] select-none duration-300 opacity-0 group-[.is-hovered]:opacity-100 group-[.is-hovered]:text-white text-center px-2 md:px-4">
        {name}
      </span>
    </div>
  );
}

export default function PartnerMarquee({ className = "" }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const setWidth = el.scrollWidth / 3;
    gsap.set(el, { x: 0 });

    tweenRef.current = gsap.to(el, {
      x: -setWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((v) => parseFloat(v) % setWidth),
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const pause = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.resume();

  return (
    <div className={`relative w-full bg-gray-500 rounded-2xl overflow-hidden ${className}`}>
      {/* Edge Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-[10px] z-20 pointer-events-none bg-gradient-to-r from-[#f3f4f6] via-[#f3f4f6]/50 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-[10px] z-20 pointer-events-none bg-gradient-to-l from-[#f3f4f6] via-[#f3f4f6]/50 to-transparent" />
      
      <div className="overflow-hidden w-full">
        <div 
          ref={trackRef} 
          className="flex flex-nowrap w-max will-change-transform" 
        >
          {trackData.map((p, i) => (
            <PartnerCard
              key={`${p.name}-${i}`}
              name={p.name}
              brand={p.color}
              logo={p.logo}
              onPause={pause}
              onResume={resume}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
