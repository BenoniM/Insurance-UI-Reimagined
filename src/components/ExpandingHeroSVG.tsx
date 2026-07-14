import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CTAButton from "./CTAButton";
import svgContent from "@/assets/GivebackHero/illustration-01.svg?raw";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ExpandingHeroSVGProps {
  badge: string;
  headline: string; // raw HTML string, rendered via dangerouslySetInnerHTML
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

const ExpandingHeroSVG = ({
  badge,
  headline,
  subtitle,
  ctaLabel,
  ctaHref,
}: ExpandingHeroSVGProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !svgContainerRef.current || !textRef.current) return;

      const svgEl = svgContainerRef.current.querySelector("svg");
      if (svgEl) {
        svgEl.style.width = "100%";
        svgEl.style.height = "100%";
        svgEl.style.overflow = "visible";
        svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
      }

      const isMobile = window.innerWidth < 768;

      const layers = [
        { id: "#Layer_1_xA0_Image", tx: 309, ty: 1, w: 766, h: 966, isCenter: true },
        { id: "#Layer_2_xA0_Image", tx: 498, ty: 143, w: 425, h: 271 },
        { id: "#Layer_3_xA0_Image", tx: 717, ty: 272, w: 232, h: 415 },
        { id: "#Layer_4_xA0_Image", tx: 540, ty: 404, w: 355, h: 445 },
        { id: "#Layer_5_xA0_Image", tx: 154, ty: 115, w: 557, h: 311 },
        { id: "#Layer_6_xA0_Image", tx: 428, ty: 191, w: 335, h: 163 },
        { id: "#Layer_7_xA0_Image", tx: 149, ty: 274, w: 233, h: 373 },
        { id: "#Layer_8_xA0_Image", tx: 193, ty: 352, w: 435, h: 517 },
        { id: "#Layer_9_xA0_Image", tx: 269, ty: 266, w: 317, h: 341 },
        { id: "#Layer_10_xA0_Image", tx: 348, ty: 543, w: 433, h: 251 },
      ];

      const canvasCenterX = 1075 / 2;
      const canvasCenterY = 976 / 2;

      // Set transform origin for each layer at its own center
      layers.forEach(layer => {
        const el = svgContainerRef.current?.querySelector<SVGGraphicsElement>(layer.id);
        if (!el) return;
        const cx = layer.tx + layer.w / 2;
        const cy = layer.ty + layer.h / 2;
        gsap.set(el, { svgOrigin: `${cx} ${cy}` });
      });

      // Initial state: text visible
      gsap.set(textRef.current, { pointerEvents: "auto" });
      const textEls = textRef.current.querySelectorAll<HTMLElement>(
        ".eh-badge, .eh-headline, .eh-subtitle, .eh-cta"
      );
      gsap.set(textEls, { opacity: 1, y: 0 });

      // Distance to scatter side images off screen
      const containerRect = svgContainerRef.current.getBoundingClientRect();
      const pxPerUnit = containerRect.width / 1075;
      const viewportDiagonal = Math.sqrt(
        window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight
      );
      const clearDist = (viewportDiagonal * 1.5) / pxPerUnit;

      // How far up the center image travels in SVG user-units
      const centerMoveUp = isMobile ? 200 : 250;
      const centerScaleTo = 0.62;

      // Center layer (Layer_1) sits at tx=309, w=766 → its center is at 692 in SVG coords.
      // Canvas center is 1075/2 = 537.5. Shift to center, then nudge right by 60 units.
      const centerLayerData = layers.find(l => l.isCenter)!;
      const centerLayerCX = centerLayerData.tx + centerLayerData.w / 2; // 692
      const rightNudge = 75; // shift slightly right after centering
      const offsetToCenter = canvasCenterX - centerLayerCX + rightNudge;

      // Pre-resolve all DOM elements so we don't query inside onUpdate
      type LayerEl = { el: Element; isCenter: boolean; dx: number; dy: number; len: number };
      const layerEls: LayerEl[] = [];
      layers.forEach(layer => {
        const el = svgContainerRef.current?.querySelector(layer.id);
        if (!el) return;
        const layerCX = layer.tx + layer.w / 2;
        const layerCY = layer.ty + layer.h / 2;
        const dx = layerCX - canvasCenterX;
        const dy = layerCY - canvasCenterY;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        layerEls.push({ el, isCenter: !!layer.isCenter, dx, dy, len });
      });

      // Ease function — power2.inOut computed manually so it runs in onUpdate
      const easeInOut = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      let isTextVisible = true;

      const updatePositions = (p: number) => {
        const e = 1 - easeInOut(p);
        layerEls.forEach(({ el, isCenter, dx, dy, len }) => {
          if (isCenter) {
            gsap.set(el, {
              x: e * offsetToCenter,
              y: e * -centerMoveUp,
              scale: 1 + e * (centerScaleTo - 1),
            });
          } else {
            gsap.set(el, {
              x: e * (dx / len) * clearDist,
              y: e * (dy / len) * clearDist,
              scale: 1 + e * 0.8,
            });
          }
        });
      };

      // Set initial dispersed state
      updatePositions(0);

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=90%",
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;
          updatePositions(p);

          // ── Text reveal ──────────────────────────────────────────────────
          if (p > 0.15 && isTextVisible) {
            isTextVisible = false;
            gsap.set(textRef.current, { pointerEvents: "none" });
            gsap.to(textEls, { opacity: 0, y: 30, duration: 0.4, ease: "power2.out", overwrite: true });
          } else if (p <= 0.15 && !isTextVisible) {
            isTextVisible = true;
            gsap.set(textRef.current, { pointerEvents: "auto" });
            gsap.to(textEls, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.12, overwrite: true });
          }
        },
      });
    },
    { scope: wrapperRef, dependencies: [] }
  );

  return (
    <div ref={wrapperRef} style={{ minHeight: "190vh", position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "hsl(var(--background))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* SVG illustration — centered, slightly smaller than viewport */}
        <div
          ref={svgContainerRef}
          className="w-[125%] sm:w-[110%] md:w-[90%] h-[125%] sm:h-[110%] md:h-[90%]"
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />

        {/* Text block — lifted up so image + text sit in the upper-middle zone */}
        <div
          ref={textRef}
          style={{
            position: "absolute",
            bottom: "15%",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div className="max-w-3xl flex flex-col items-center text-center px-4">
            <span className="eh-badge inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6 mt-16">
              {badge}
            </span>

            <h1
              className="eh-headline text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl text-[hsl(201,78%,20%)]"
              dangerouslySetInnerHTML={{ __html: headline }}
            />

            <p className="eh-subtitle text-xl text-muted-foreground max-w-2xl mb-8">
              {subtitle}
            </p>

            <div className="eh-cta">
              <CTAButton href={ctaHref} size="lg">
                {ctaLabel}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandingHeroSVG;
