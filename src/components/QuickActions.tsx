import React, { useRef, useState, MouseEvent } from "react";
import { Calculator, FileText, MapPin, Phone, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "./ScrollReveal";

import imgQuote from "@/assets/QuickAction/Quote.png";
import imgFile from "@/assets/QuickAction/File.png";
import imgBranch from "@/assets/QuickAction/Branch.png";
import imgCall from "@/assets/QuickAction/Call.png";

const TiltCard = ({ action }: { action: any }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <a
      ref={cardRef}
      href={action.href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d'
      }}
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden group h-[190px] sm:h-[300px] md:h-[420px] block w-full shadow-lg hover:shadow-2xl hover:z-10 bg-white"
    >
      <img
        src={action.image}
        alt={action.label}
        className="absolute inset-0 w-full h-full object-cover brightness-110 transition-all duration-500 group-hover:scale-110 group-hover:blur-md"
      />
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundColor: isHovered ? action.hoverColor : '#000000',
          opacity: isHovered ? 0.4 : 0.2
        }}
      />

      {/* See more overlay text */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 z-20 pointer-events-none"
        style={{ transform: 'translateZ(30px)' }}
      >
        <span className="text-white font-medium text-lg px-6 py-2">
          See more
        </span>
      </div>

      <div
        className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start gap-1 sm:gap-4 bg-black/40 backdrop-blur-md w-full px-2 sm:px-6 py-3 sm:py-5 transition-all duration-500 group-hover:bg-transparent group-hover:backdrop-blur-none">
          <h3 className="text-white font-heading font-medium text-sm sm:text-lg sm:max-w-[60%] text-center sm:text-left leading-tight drop-shadow-md">
            {action.label}
          </h3>
          {/* <span className="text-white/90 text-xs sm:text-sm font-medium sm:whitespace-nowrap text-center sm:text-left drop-shadow-md">
            {action.description}
          </span> */}
        </div>

        <div className="flex justify-start sm:justify-start px-4 sm:px-6 pb-4 sm:pb-6">
          <action.icon
            className={`w-7 h-7 sm:w-8 sm:h-8 ${action.iconColor === "green"
                ? "text-[#a8f5dbff]"
                : "text-[#96cdf4ff]"
              }`}
          />
        </div>
      </div>
    </a>
  );
};

const QuickActions = () => {
  const { t } = useLanguage();

  const actions = [
    {
      icon: Calculator,
      label: "Get a Quote",
      description: "Get an instant estimate",
      href: "/quote",
      image: imgQuote,
      hoverColor: "#2983C4",
      iconColor: "green", // 1st
    },
    {
      icon: ShoppingCart,
      label: "Buy Insurance",
      description: "Explore our insurance plans",
      href: "/products",
      image: imgBranch,
      hoverColor: "#34B288",
      iconColor: "blue", // 2nd
    },
    {
      icon: FileText,
      label: "Report a Claim",
      description: "Start your claim process",
      href: "/claims/new",
      image: imgFile,
      hoverColor: "#34B288",
      iconColor: "blue", // 3rd
    },
    {
      icon: Phone,
      label: "Contact Us",
      description: "Get in touch with our team",
      href: "/contact",
      image: imgCall,
      hoverColor: "#2983C4",
      iconColor: "green", // 4th
    },
  ];

  return (
    <section className="relative z-20 px-2 sm:px-4 lg:px-8 py-8 md:py-10">
      <div className="w-full mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {actions.map((action, i) => (
            <ScrollReveal key={action.label} animation="scaleUp" delay={i * 0.06}>
              <TiltCard action={action} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
