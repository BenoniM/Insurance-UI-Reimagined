import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from '@/components/CTAButton';
import claimsBg from '@/assets/ClaimsHero/ChatGPT Image Jul 14, 2026, 10_45_52 AM.webp';

const ClaimsHeroAnimation = () => {
  return (
    <div className="relative w-full h-screen min-h-[500px] overflow-hidden bg-[#FBFAFA] flex items-center justify-center">
      {/* Background image */}
      <img
        src={claimsBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ transform: "translateY(18%)" }}
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
      />
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center text-center px-4 max-w-3xl"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.8,
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
          CLAIMS
        </motion.span>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 14 } }
          }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl text-center"
        >
          Fast, Fair <span className="text-primary">Claims Processing</span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } }
          }}
          className="text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed text-center"
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
    </div>
  );
};

export default ClaimsHeroAnimation;

