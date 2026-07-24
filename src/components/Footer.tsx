import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Send, ShieldCheck, Lock, Cookie } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageContext";
import CTAButton from "./CTAButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { navCategories } from "@/data/products";

type PolicyKey = "terms" | "privacy" | "cookies";

const Footer = () => {
  const { t, lang } = useLanguage();
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  const policyContent: Record<PolicyKey, { title: string; eyebrow: string; summary: string; points: string[]; icon: typeof ShieldCheck }> = {
    terms: {
      title: "Terms of Service",
      eyebrow: "Protection Promise",
      summary: "These terms outline how our insurance services, claims support, and digital access are provided to you with clarity and care.",
      points: [
        "You agree to use our portal and services for legitimate insurance, claims, and policy support needs.",
        "Coverage, premiums, and claims outcomes remain subject to policy terms and underwriting approval.",
        "Our team may update service guidance, documentation, and support workflows as needed.",
      ],
      icon: ShieldCheck,
    },
    privacy: {
      title: "Privacy Policy",
      eyebrow: "Private & Protected",
      summary: "We safeguard your personal and policy information and use it only to support secure insurance services.",
      points: [
        "We collect only the information needed to process quotes, policies, claims, and account access.",
        "Your data is protected with secure systems and restricted internal access.",
        "You can request review or update of your personal details through your account or support team.",
      ],
      icon: Lock,
    },
    cookies: {
      title: "Cookie Policy",
      eyebrow: "Digital Comfort",
      summary: "Cookies help us remember your preferences and improve your experience while browsing our insurance portal.",
      points: [
        "We use cookies to keep your session, language preference, and recent activity consistent.",
        "These tools help us improve navigation, quotations, and support journeys.",
        "You can manage or disable cookies in your browser settings at any time.",
      ],
      icon: Cookie,
    },
  };

  const activePolicyData = activePolicy ? policyContent[activePolicy] : null;

  return (
    <>
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
            <div className="grid grid-cols-2 lg:grid-cols-7 gap-x-6 gap-y-10">
              <div className="col-span-2 lg:col-span-2">
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

                {/* Social links — directly below address, no label */}
                <div className="flex gap-3 mt-6">
                  <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a href="#" aria-label="Telegram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                    <Send className="w-4 h-4 -ml-0.5" />
                  </a>
                  <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                    <FaYoutube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Desktop view for links */}
              <div className="hidden lg:block col-span-1">
                <h4 className="font-heading text-[14px] font-semibold text-white mb-4">{lang === 'en' ? navCategories[0].label : navCategories[0].label_am}</h4>
                <ul className="space-y-2">
                  {navCategories[0].subcategories.map((sub) => (
                    <li key={sub.label}>
                      <Link to={sub.href || (sub.children && sub.children[0].href) || "#"} className="text-[13px] text-white/50 hover:text-white transition-colors">
                        {lang === 'en' ? sub.label : sub.label_am}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:block col-span-1">
                <h4 className="font-heading text-[14px] font-semibold text-white mb-4">{lang === 'en' ? navCategories[1].label : navCategories[1].label_am}</h4>
                <ul className="space-y-2">
                  {navCategories[1].subcategories.map((sub) => (
                    <li key={sub.label}>
                      <Link to={sub.href || (sub.children && sub.children[0].href) || "#"} className="text-[13px] text-white/50 hover:text-white transition-colors">
                        {lang === 'en' ? sub.label : sub.label_am}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:block col-span-1">
                <h4 className="font-heading text-[14px] font-semibold text-white mb-4">{lang === 'en' ? navCategories[2].label : navCategories[2].label_am}</h4>
                <ul className="space-y-2">
                  {navCategories[2].subcategories.map((sub) => (
                    <li key={sub.label}>
                      <Link to={sub.href || (sub.children && sub.children[0].href) || "#"} className="text-[13px] text-white/50 hover:text-white transition-colors leading-snug block">
                        {lang === 'en' ? sub.label : sub.label_am}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden lg:block col-span-1">
                <h4 className="font-heading text-[14px] font-semibold text-white mb-4">{t("footer.claims")}</h4>
                <ul className="space-y-2">
                  <li><Link to="/claims" className="text-[13px] text-white/50 hover:text-white transition-colors">{t("footer.fileClaim")}</Link></li>
                  <li><Link to="/dashboard" className="text-[13px] text-white/50 hover:text-white transition-colors">{t("footer.trackClaim")}</Link></li>
                  <li><Link to="/claims" className="text-[13px] text-white/50 hover:text-white transition-colors">{t("footer.requiredDocs")}</Link></li>
                  <li><Link to="/channels/wia" className="text-[13px] text-white/50 hover:text-white transition-colors">WIIA</Link></li>
                  <li><Link to="/channels/broker-portal" className="text-[13px] text-white/50 hover:text-white transition-colors">Broker Portal</Link></li>
                </ul>
              </div>

              <div className="hidden lg:block col-span-1">
                <h4 className="font-heading text-[14px] font-semibold text-white mb-4">{t("footer.company")}</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-[13px] text-white/50 hover:text-white transition-colors">{lang === "am" ? "ዋና ገጽ" : "Home"}</Link></li>
                  <li><Link to="/about" className="text-[13px] text-white/50 hover:text-white transition-colors">{t("footer.aboutUs")}</Link></li>
                  <li><Link to="/giveback" className="text-[13px] text-white/50 hover:text-white transition-colors">{lang === "am" ? "ጊቨባክ" : "Giveback"}</Link></li>
                  <li><Link to="/contact" className="text-[13px] text-white/50 hover:text-white transition-colors">{t("nav.contact")}</Link></li>
                  <li><Link to="/news" className="text-[13px] text-white/50 hover:text-white transition-colors">{t("nav.news")}</Link></li>
                  <li><Link to="/about" className="text-[13px] text-white/50 hover:text-white transition-colors">{t("footer.careers")}</Link></li>
                </ul>
              </div>

              {/* Mobile Accordion view for links */}
              <div className="col-span-2 lg:hidden w-full">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="products" className="border-white/10">
                    <AccordionTrigger className="text-white hover:no-underline font-heading text-sm font-semibold py-4">
                      {t("footer.products")}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-6 pb-2 pt-2">
                        {navCategories.map(category => (
                          <div key={category.slug}>
                            <h5 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-3">{lang === 'en' ? category.label : category.label_am}</h5>
                            <ul className="space-y-3">
                              {category.subcategories.map(sub => (
                                <li key={sub.label}>
                                  <Link to={sub.href || (sub.children && sub.children[0].href) || "#"} className="text-sm text-white/50 hover:text-white transition-colors block">
                                    {lang === 'en' ? sub.label : sub.label_am}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="claims" className="border-white/10">
                    <AccordionTrigger className="text-white hover:no-underline font-heading text-sm font-semibold py-4">
                      {t("footer.claims")}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pb-2 pt-2">
                        <li><Link to="/claims" className="text-sm text-white/50 hover:text-white transition-colors block">{t("footer.fileClaim")}</Link></li>
                        <li><Link to="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors block">{t("footer.trackClaim")}</Link></li>
                        <li><Link to="/claims" className="text-sm text-white/50 hover:text-white transition-colors block">{t("footer.requiredDocs")}</Link></li>
                        <li><Link to="/channels/wia" className="text-sm text-white/50 hover:text-white transition-colors block">WIIA</Link></li>
                        <li><Link to="/channels/broker-portal" className="text-sm text-white/50 hover:text-white transition-colors block">Broker Portal</Link></li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="company" className="border-white/10 border-b-0">
                    <AccordionTrigger className="text-white hover:no-underline font-heading text-sm font-semibold py-4">
                      {t("footer.company")}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3 pb-2 pt-2">
                        <li><Link to="/" className="text-sm text-white/50 hover:text-white transition-colors block">{lang === "am" ? "ዋና ገጽ" : "Home"}</Link></li>
                        <li><Link to="/about" className="text-sm text-white/50 hover:text-white transition-colors block">{t("footer.aboutUs")}</Link></li>
                        <li><Link to="/giveback" className="text-sm text-white/50 hover:text-white transition-colors block">{lang === "am" ? "ጊቨባክ" : "Giveback"}</Link></li>
                        <li><Link to="/contact" className="text-sm text-white/50 hover:text-white transition-colors block">{t("nav.contact")}</Link></li>
                        <li><Link to="/news" className="text-sm text-white/50 hover:text-white transition-colors block">{t("nav.news")}</Link></li>
                        <li><Link to="/about" className="text-sm text-white/50 hover:text-white transition-colors block">{t("footer.careers")}</Link></li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-white/30">{t("footer.copyright")}</p>
                <p className="text-xs text-white/30">
                  Licensed and regulated by the National Bank of Ethiopia (NBE).
                </p>
              </div>
              <div className="flex gap-6">
                <button type="button" onClick={() => setActivePolicy("terms")} className="text-xs text-white/30 hover:text-white transition-colors">{t("footer.terms")}</button>
                <button type="button" onClick={() => setActivePolicy("privacy")} className="text-xs text-white/30 hover:text-white transition-colors">{t("footer.privacy")}</button>
                <button type="button" onClick={() => setActivePolicy("cookies")} className="text-xs text-white/30 hover:text-white transition-colors">{t("footer.cookies")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    {activePolicyData && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(201,78%,20%)]/70 px-4 py-6 backdrop-blur-sm"
        onClick={() => setActivePolicy(null)}
      >
        <div
          className="w-full max-w-lg rounded-[28px] border border-white/20 bg-white p-6 shadow-[0_30px_90px_rgba(11,63,91,0.24)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-[hsl(160,55%,45%)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(160,55%,45%)]">
                {activePolicyData.eyebrow}
              </span>
              <h3 className="mt-3 text-2xl font-semibold text-[hsl(201,78%,20%)]">
                {activePolicyData.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setActivePolicy(null)}
              className="rounded-full border border-gray-200 p-2 text-gray-500 transition-colors hover:border-[hsl(160,55%,45%)] hover:text-[hsl(160,55%,45%)]"
              aria-label="Close policy details"
            >
              ×
            </button>
          </div>

          <div className="mt-5 rounded-2xl bg-[hsl(201,78%,98%)] p-4 text-sm leading-relaxed text-gray-600">
            <p>{activePolicyData.summary}</p>
          </div>

          <div className="mt-5 space-y-3">
            {activePolicyData.points.map((point) => (
              <div key={point} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[hsl(160,55%,45%)]/10 text-[hsl(160,55%,45%)]">
                  <activePolicyData.icon className="h-4 w-4" />
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-[hsl(160,55%,45%)] bg-[hsl(160,55%,97%)] p-4 text-sm text-gray-600">
            Need a hand? Contact our support team for a human explanation of any policy detail.
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Footer;
