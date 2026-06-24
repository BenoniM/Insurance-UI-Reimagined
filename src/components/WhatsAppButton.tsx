import { MessageCircle } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const WhatsAppButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  
  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, 
      { opacity: 0, scale: 0 }, 
      { opacity: 1, scale: 1, duration: 0.6, delay: 1, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <a
      ref={ref}
      href="https://wa.me/251911234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,40%)] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;
