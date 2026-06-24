import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, ReactNode, useState, useEffect, useCallback } from "react";

interface PageHeroProps {
  images: string[];
  badge: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
  interval?: number;
}

const PageHero = ({ images, badge, title, subtitle, children, interval = 5000 }: PageHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref as any, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [nextSlide, interval, images.length]);

  return (
    <section ref={ref as any} className="relative min-h-[75vh] md:min-h-[85vh] flex items-end overflow-hidden">
      {/* Parallax background images with crossfade */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Dark scrim — stronger for text legibility */}
      <div className="absolute inset-0 z-[1] bg-[#0D4969]/75" />

      {/* Animated particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + (i % 3) * 2,
              height: 2 + (i % 3) * 2,
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
              background: i % 2 === 0
                ? "hsl(var(--primary) / 0.35)"
                : "hsl(0 0% 100% / 0.2)",
            }}
            animate={{
              y: [0, -40 - i * 5, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.15, 0.7, 0.15],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[5] flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-primary w-6" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container mx-auto px-4 lg:px-8 relative z-10 pb-16 md:pb-24"
      >
        <motion.span
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md"
        >
          {badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="qupe-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-4xl leading-[1.08]"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/25 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-1 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default PageHero;
