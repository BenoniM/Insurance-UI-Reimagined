import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface AnimatedBackgroundProps {
  variant?: "default" | "hero" | "dark" | "subtle";
}

const AnimatedBackground = ({ variant = "default" }: AnimatedBackgroundProps) => {
  const isDark = variant === "dark";
  const isHero = variant === "hero";
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    if (isHero) {
      gsap.to(q(".blob-1"), { scale: 1.05, x: 20, y: -15, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(q(".blob-2"), { scale: 1.08, x: -15, y: 20, duration: 12.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
      gsap.to(q(".blob-3"), { scale: 1.1, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
    }

    if (variant === "subtle") {
      gsap.to(q(".blob-subtle"), { scale: 1.04, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    if (variant === "default") {
      gsap.to(q(".blob-default"), { scale: 1.06, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
  }, [variant]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Qupe-style soft gradient blobs */}
      {isHero && (
        <>
          <div
            className="blob-1 absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)" }}
          />
          <div
            className="blob-2 absolute -bottom-48 -left-32 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(var(--teal-light) / 0.06) 0%, transparent 70%)" }}
          />
          <div
            className="blob-3 absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.04) 0%, transparent 70%)" }}
          />
        </>
      )}

      {isDark && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }} />
        </>
      )}

      {variant === "subtle" && (
        <>
          <div
            className="blob-subtle absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)" }}
          />
        </>
      )}

      {variant === "default" && (
        <div
          className="blob-default absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 70%)" }}
        />
      )}

      {/* Qupe dot pattern */}
      <div className="absolute inset-0 qupe-dots opacity-40" />
    </div>
  );
};

export default AnimatedBackground;
