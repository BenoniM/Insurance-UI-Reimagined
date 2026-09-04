import React from "react";
import CTAButton from "@/components/CTAButton";
import claimsBg from "@/assets/New/wass_insurance_sketch_final.png";
import ScrollFocusHero from "@/components/ScrollFocusHero";

const ClaimsHeroAnimation: React.FC = () => {
  return (
    <ScrollFocusHero
      badge="CLAIMS"
      title={
        <>
          Fast, Fair <span className="text-primary">Claims Processing</span>
        </>
      }
      intro="We handle your claims with speed and transparency — so you can focus on what matters."
      cta={
        <a href="#digital-claims-center">
          <CTAButton size="lg">File a Claim</CTAButton>
        </a>
      }
      imageSrc={claimsBg}
      imageAlt="WASS Insurance Claims Illustration"
      bgColor="#FBFAFA"
    />
  );
};

export default ClaimsHeroAnimation;
