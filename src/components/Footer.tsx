import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t, lang } = useLanguage();

  const footerProducts = [
    { label: { en: "Life Insurance", am: "የህይወት ኢንሹራንስ" }, href: "/products/life-insurance" },
    { label: { en: "Health Insurance", am: "የጤና ኢንሹራንስ" }, href: "/products/health-insurance" },
    { label: { en: "Motor Insurance", am: "የመኪና ኢንሹራንስ" }, href: "/products/motor-insurance" },
    { label: { en: "Property Insurance", am: "የንብረት ኢንሹራንስ" }, href: "/products/property-insurance" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[hsl(201,78%,23%)] to-[hsl(201,78%,16%)] text-white/80 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src="/images/wass-logo.svg" alt="WASS Insurance" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">{t("footer.description")}</p>
            <div className="flex flex-col gap-3 mt-6">
              <a href="tel:+251111234567" className="flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> +251 11 123 4567
              </a>
              <a href="mailto:info@wassinsurance.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors">
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
                  <Link to={item.href} className="text-sm text-white/50 hover:text-primary transition-colors">{item.label[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-white mb-4">{t("footer.claims")}</h4>
            <ul className="space-y-2.5">
              <li><Link to="/claims" className="text-sm text-white/50 hover:text-primary transition-colors">{t("footer.fileClaim")}</Link></li>
              <li><Link to="/dashboard" className="text-sm text-white/50 hover:text-primary transition-colors">{t("footer.trackClaim")}</Link></li>
              <li><Link to="/claims" className="text-sm text-white/50 hover:text-primary transition-colors">{t("footer.requiredDocs")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-white mb-4">{t("footer.company")}</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-sm text-white/50 hover:text-primary transition-colors">{t("footer.aboutUs")}</Link></li>
              <li><Link to="/giveback" className="text-sm text-white/50 hover:text-primary transition-colors">{lang === "am" ? "ጊቨባክ" : "Giveback"}</Link></li>
              <li><Link to="/contact" className="text-sm text-white/50 hover:text-primary transition-colors">{t("nav.contact")}</Link></li>
              <li><Link to="/blog" className="text-sm text-white/50 hover:text-primary transition-colors">{t("nav.blog")}</Link></li>
              <li><Link to="/about" className="text-sm text-white/50 hover:text-primary transition-colors">{t("footer.careers")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-primary transition-colors">{t("footer.terms")}</a>
            <a href="#" className="text-xs text-white/30 hover:text-primary transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="text-xs text-white/30 hover:text-primary transition-colors">{t("footer.cookies")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
