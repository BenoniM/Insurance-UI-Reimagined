import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from '@/components/CTAButton';

import img1 from '@/assets/ClaimsHero/Gemini_Generated_Image_1dzsmg1dzsmg1dzs-Photoroom.png';
import img2 from '@/assets/ClaimsHero/Gemini_Generated_Image_dqlukdqlukdqlukd-Photoroom.png';
import img3 from '@/assets/ClaimsHero/Gemini_Generated_Image_ek8f00ek8f00ek8f-Photoroom.png';
import img4 from '@/assets/ClaimsHero/Gemini_Generated_Image_o12w0o12w0o12w0o-Photoroom.png';

const images = [img1, img2, img3, img4];

const ClaimsHeroAnimation = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage < 4) {
      const timer = setTimeout(() => {
        setStage((prev) => prev + 1);
      }, 1000); // 1s per stage
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Modern spring transition for images
  const springConfig = {
    type: "spring",
    damping: 14,
    stiffness: 90,
    mass: 1.2,
  };

  // Rotation array to make the stack look organic (like dropping photos)
  const rotations = [-5, 4, -3, 6];

  return (
    <div className="relative w-full h-screen min-h-[500px] overflow-hidden bg-background flex items-center justify-center">
      
      <AnimatePresence>
        {images.map((img, index) => {
          // Only render the image if we have reached its stage, and we aren't at the final stage
          if (stage < index || stage >= 4) return null;

          // Base scale based on index so each is bigger than the last
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
                y: "-30%", // Start slightly lower
                rotate: rotations[index] * 2.5 // Start with exaggerated rotation
              }}
              animate={{ 
                opacity: 1, 
                scale: baseScale,
                x: "-50%",
                y: "-50%",
                rotate: rotations[index] // Settle into subtle organic rotation
              }}
              exit={{ 
                opacity: 0, 
                scale: baseScale + 5, // Massive zoom towards camera
                filter: "blur(20px)", // Intense motion blur as it flies past
                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } // Cinematic cubic bezier
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
                  ease: [0.76, 0, 0.24, 1], // Sync with image fly-past
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
              className="section-badge mb-5 inline-block"
            >
              CLAIMS
            </motion.span>
            
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 14 } }
              }}
              className="qupe-heading text-4xl md:text-6xl text-foreground mb-6 tracking-tight"
            >
              Fast, Fair <span className="text-primary">Claims Processing</span>
            </motion.h1>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } }
              }}
              className="text-foreground/80 font-medium text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed"
            >
              We handle your claims with speed and transparency — so you can focus on what matters.
            </motion.p>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 120 } }
              }}
              className="flex justify-center gap-4"
            >
              <a href="#digital-claims-center">
                <CTAButton size="lg">File a Claim</CTAButton>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClaimsHeroAnimation;
