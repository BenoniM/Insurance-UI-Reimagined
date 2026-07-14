import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from '@/components/CTAButton';

import img1 from '@/assets/ClaimsHero/Gemini_Generated_Image_1dzsmg1dzsmg1dzs-Photoroom.png';
import img2 from '@/assets/ClaimsHero/Gemini_Generated_Image_dqlukdqlukdqlukd-Photoroom.png';
import img3 from '@/assets/ClaimsHero/Gemini_Generated_Image_ek8f00ek8f00ek8f-Photoroom.png';
import img4 from '@/assets/ClaimsHero/Gemini_Generated_Image_o12w0o12w0o12w0o-Photoroom.png';

const images = [img1, img2, img3, img4];

const NewsHeroAnimation = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage < 4) {
      const timer = setTimeout(() => {
        setStage((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const springConfig = {
    type: "spring",
    damping: 14,
    stiffness: 90,
    mass: 1.2,
  };

  const rotations = [-5, 4, -3, 6];

  return (
    <div className="relative w-full h-screen min-h-[500px] overflow-hidden bg-background flex items-center justify-center">

      <AnimatePresence>
        {images.map((img, index) => {
          if (stage < index || stage >= 4) return null;
          const baseScale = 1 + index * 0.4;
          return (
            <motion.img
              key={`img-${index}`}
              src={img}
              className="absolute top-1/2 left-1/2 object-contain max-h-[35%] max-w-[35%] pointer-events-none"
              initial={{
                opacity: 0,
                scale: baseScale - 0.5,
                x: "-50%",
                y: "-30%",
                rotate: rotations[index] * 2.5
              }}
              animate={{
                opacity: 1,
                scale: baseScale,
                x: "-50%",
                y: "-50%",
                rotate: rotations[index]
              }}
              exit={{
                opacity: 0,
                scale: baseScale + 5,
                filter: "blur(20px)",
                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
              }}
              transition={springConfig}
              style={{ zIndex: 10 + index }}
            />
          );
        })}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 4 && (
          <motion.div
            key="text-content"
            initial="hidden"
            animate="visible"
            className="relative z-20 flex flex-col items-center text-center px-4 max-w-3xl"
            variants={{
              hidden: { opacity: 0, scale: 0.5, filter: "blur(10px)" },
              visible: {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 14 } }
              }}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6"
            >
              NEWS & INSIGHTS
            </motion.span>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 14 } }
              }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl text-center"
            >
              Latest <span className="text-primary">News</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } }
              }}
              className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed text-center"
            >
              Company announcements, industry updates, insurance awareness articles, and CSR activities from WASS Insurance.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 120 } }
              }}
              className="flex justify-center gap-4"
            >
              <CTAButton href="#latest-news" size="lg">Explore News</CTAButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsHeroAnimation;
