import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import CTAButton from "./CTAButton";

const Footer = () => {
  const { t, lang } = useLanguage();

  const footerProducts = [
    { label: { en: "Life Insurance", am: "የህይወት ኢንሹራንስ" }, href: "/products/life-insurance" },
    { label: { en: "Health Insurance", am: "የጤና ኢንሹራንስ" }, href: "/products/health-insurance" },
    { label: { en: "Motor Insurance", am: "የመኪና ኢንሹራንስ" }, href: "/products/motor-insurance" },
    { label: { en: "Property Insurance", am: "የንብረት ኢንሹራንስ" }, href: "/products/property-insurance" },
  ];

  return (
    <footer className="w-full bg-white pb-6 pt-10 lg:pt-16">
      <div className="w-full max-w-[1800px] mx-auto px-4 lg:px-8">
        
        {/* Unified CTA & Footer Container */}
        <div className="flex flex-col items-center w-full mx-auto drop-shadow-xl">
          
          {/* CTA Section */}
          <div className="w-full bg-[hsl(201,78%,20%)] rounded-3xl p-8 lg:p-12 relative z-10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
            
            <div className="text-left relative z-10 max-w-2xl">
              <h2 className="qupe-heading text-2xl md:text-3xl lg:text-4xl text-white mb-3">
                Protect What Matters Most
              </h2>
              <p className="text-white/70 text-sm md:text-base">
                Ready to find the right coverage? Get a free quote today or contact our support team.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 relative z-10 shrink-0">
               <a href="/quote" className="bg-primary text-primary-foreground border-none shadow-md font-semibold px-8 py-3 rounded-xl">
                 Get a Quote
               </a>
               <a href="/contact" className="bg-white text-black border-none shadow-md font-semibold px-8 py-3 rounded-xl">
                 Contact Us
               </a>
            </div>
          </div>

          {/* Bridge (Rectangle connecting them) */}
          <div className="h-6 w-[calc(100%-3rem)] bg-[hsl(201,78%,20%)] relative z-0 -my-2" />

          {/* Footer Navigation Section */}
          <div className="w-full bg-[hsl(201,78%,20%)] rounded-3xl px-8 lg:px-12 pt-12 pb-8 relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2">
                <Link to="/" className="inline-block mb-4">
                  <img src="/images/wass-logo.svg" alt="WASS Insurance" className="h-10 w-auto brightness-0 invert" />
                </Link>
                <p className="text-sm leading-relaxed text-white/50 max-w-xs">{t("footer.description")}</p>
                <div className="flex flex-col gap-3 mt-6">
                  <a href="tel:+251111234567" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" /> +251 11 123 4567
                  </a>
                  <a href="mailto:info@wassinsurance.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" /> info@wassinsurance.com
                  </a>
                  <span className="flex items-start gap-2 text-sm text-white/50">
                    <MapPin className="w-4 h-4 mt-0.5" /> Bole Road, Addis Ababa, Ethiopia
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-heading text-sm font-semibold text-white mb-4">{t("footer.products")}</h4>
                <ul className="space-y-2.5">
                  {footerProducts.map((item) => (
                    <li key={item.href}>
                      <Link to={item.href} className="text-sm text-white/50 hover:text-white transition-colors">{item.label[lang]}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-heading text-sm font-semibold text-white mb-4">{t("footer.claims")}</h4>
                <ul className="space-y-2.5">
                  <li><Link to="/claims" className="text-sm text-white/50 hover:text-white transition-colors">{t("footer.fileClaim")}</Link></li>
                  <li><Link to="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors">{t("footer.trackClaim")}</Link></li>
                  <li><Link to="/claims" className="text-sm text-white/50 hover:text-white transition-colors">{t("footer.requiredDocs")}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-heading text-sm font-semibold text-white mb-4">{t("footer.company")}</h4>
                <ul className="space-y-2.5">
                  <li><Link to="/about" className="text-sm text-white/50 hover:text-white transition-colors">{t("footer.aboutUs")}</Link></li>
                  <li><Link to="/giveback" className="text-sm text-white/50 hover:text-white transition-colors">{lang === "am" ? "ጊቨባክ" : "Giveback"}</Link></li>
                  <li><Link to="/contact" className="text-sm text-white/50 hover:text-white transition-colors">{t("nav.contact")}</Link></li>
                  <li><Link to="/blog" className="text-sm text-white/50 hover:text-white transition-colors">{t("nav.blog")}</Link></li>
                  <li><Link to="/about" className="text-sm text-white/50 hover:text-white transition-colors">{t("footer.careers")}</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-white/30">{t("footer.copyright")}</p>
              <div className="flex gap-6">
                <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">{t("footer.terms")}</a>
                <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">{t("footer.privacy")}</a>
                <a href="#" className="text-xs text-white/30 hover:text-white transition-colors">{t("footer.cookies")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

