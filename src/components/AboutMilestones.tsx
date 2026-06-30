import { useRef, useEffect, useState } from "react";

const STACK_ROTATIONS = [-4, 3, -2.5, 2];

const milestones = [
  {
    year: "2023",
    event: "Grew partner network to 200+ institutions, serving 50,000+ clients",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80",
  },
  {
    year: "2025",
    event: "12 branches nationwide, leading innovation in Ethiopian insurance",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
  },
];

const AboutMilestones = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(-1);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      const stickyStart = -rect.top;
      const stickyZone = rect.height - windowH;

      if (stickyStart <= 0) {
        setScrollProgress(0);
        setActiveCard(-1);
        return;
      }

      if (stickyStart >= stickyZone) {
        setScrollProgress(1);
        setActiveCard(milestones.length - 1);
        return;
      }

      const progress = stickyStart / stickyZone;
      setScrollProgress(progress);

      const cardZoneStart = 0.2;
      const cardZoneLength = 1 - cardZoneStart;
      const cardProgress = Math.max(0, (progress - cardZoneStart) / cardZoneLength);
      const cardIndex = Math.floor(cardProgress * milestones.length);
      setActiveCard(Math.min(cardIndex, milestones.length - 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const handleResize = () => setWindowHeight(window.innerHeight);
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardZoneStart = 0.2;
  const blurProgress = Math.max(0, (scrollProgress - cardZoneStart) / (1 - cardZoneStart));
  const headerBlur = Math.min(blurProgress * 18, 18);
  const headerScale = 1 - blurProgress * 0.08;
  const headerOpacity = blurProgress > 0.8 ? 1 - (blurProgress - 0.8) / 0.2 : 1;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: `${100 + 20 + milestones.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(160 55% 45% / 0.04) 0%, transparent 70%)",
          }}
        />

        {/* ── HEADER ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
          style={{
            filter: `blur(${headerBlur}px)`,
            transform: `scale(${headerScale})`,
            opacity: headerOpacity,
            transition: "none",
          }}
        >
          <span className="section-badge mb-6 inline-block pointer-events-auto uppercase">
            Milestones
          </span>
          <h2 className="qupe-heading text-4xl md:text-5xl lg:text-6xl text-foreground mt-4 max-w-3xl leading-tight">
            Our <span className="text-primary">Journey</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Take a look at how far we've come. We continue to grow, innovate, and lead the way in Ethiopian insurance.
          </p>

          <div
            className="mt-10 flex flex-col items-center gap-2 pointer-events-none"
            style={{
              opacity: scrollProgress < 0.08 ? 1 : 0,
              transition: "opacity 0.4s",
            }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-primary/0 via-primary to-primary/0 animate-pulse" />
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Scroll
            </span>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
          {milestones.map((item, i) => {
            const cardZone = 1 - cardZoneStart;
            const cardStart = cardZoneStart + (i / milestones.length) * cardZone;
            const cardEnd = cardZoneStart + ((i + 1) / milestones.length) * cardZone;
            const localProgress = Math.max(
              0,
              Math.min(1, (scrollProgress - cardStart) / (cardEnd - cardStart))
            );

            const isEntering = i === activeCard;
            const isBuried   = i < activeCard;
            const depth = isBuried ? activeCard - i : 0;

            let translateY: number;
            let scale: number;
            let rotation: number;

            if (isEntering) {
              const offScreen = windowHeight;
              translateY = offScreen * (1 - localProgress);
              scale      = 0.95 + localProgress * 0.05;
              rotation   = 0;
            } else if (isBuried) {
              translateY = -depth * 10;
              scale      = 1 - depth * 0.04;
              rotation   = STACK_ROTATIONS[i % STACK_ROTATIONS.length];
            } else {
              translateY = windowHeight;
              scale      = 0.95;
              rotation   = 0;
            }

            return (
              <div
                key={item.year}
                className="absolute"
                style={{
                  transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
                  transition: "transform 0.45s ease-out",
                  zIndex: 10 + i,
                  pointerEvents: i === activeCard ? "auto" : "none",
                }}
              >
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    width: "clamp(320px, 45vw, 600px)",
                    height: "clamp(400px, 60vh, 500px)",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.year}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                    <h3
                      className="font-heading font-black leading-none mb-6 text-white"
                      style={{ fontSize: "clamp(4rem, 8vw, 6rem)", textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                    >
                      {item.year}
                    </h3>
                    <p
                      className="text-white/90 font-medium leading-relaxed max-w-sm"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                    >
                      {item.event}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutMilestones;
