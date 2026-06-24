import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import CTAButton from "./CTAButton";

const products = [
  { label: { en: "Life Insurance", am: "የህይወት ኢንሹራንስ" }, href: "/products/life-insurance" },
  { label: { en: "Health Insurance", am: "የጤና ኢንሹራንስ" }, href: "/products/health-insurance" },
  { label: { en: "Motor Insurance", am: "የመኪና ኢንሹራንስ" }, href: "/products/motor-insurance" },
  { label: { en: "Property Insurance", am: "የንብረት ኢንሹራንስ" }, href: "/products/property-insurance" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { label: t("nav.products"), href: "/products", hasDropdown: true },
    { label: t("nav.claims"), href: "/claims" },
    { label: lang === "am" ? "ጊቨባክ" : "Giveback", href: "/giveback" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 py-3">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-card/95 backdrop-blur-xl shadow-lg shadow-foreground/5 border border-border"
            : "bg-card/85 backdrop-blur-lg border border-border/60"
        }`}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-4 lg:px-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/wass-logo.svg" alt="WASS Insurance" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-xl hover:bg-accent/50">
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-xl shadow-foreground/5 p-2"
                      >
                        {products.map((p) => (
                          <Link
                            key={p.href}
                            to={p.href}
                            className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-primary hover:bg-accent/50 rounded-xl transition-colors"
                          >
                            {p.label[lang]}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-xl hover:bg-accent/50"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-semibold border border-border rounded-xl text-foreground/60 hover:border-primary/30 hover:text-primary transition-all"
            >
              {t("nav.switchLang")}
            </button>

            {user ? (
              <div className="flex items-center gap-1">
                {isAdmin && (
                  <Link to="/admin" className="px-3 py-1.5 text-xs font-medium text-secondary hover:text-secondary/80 transition-colors">
                    Admin
                  </Link>
                )}
                <Link to="/dashboard" className="px-3 py-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                  {t("nav.dashboard")}
                </Link>
                <Link to="/payments" className="px-3 py-1.5 text-xs font-medium text-foreground/70 hover:text-primary transition-colors">
                  Payments
                </Link>
                <button onClick={signOut} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-xl" aria-label="Log out">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                {t("nav.login")}
              </Link>
            )}

            <CTAButton href="/quote" variant="primary" size="default">
              {t("nav.getQuote")}
            </CTAButton>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <CTAButton href="/quote" variant="primary" size="default" icon={false} className="text-xs px-4 py-2">
              {t("nav.getQuote")}
            </CTAButton>
            <button className="text-foreground p-1.5 rounded-xl hover:bg-accent/50 transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 mx-auto max-w-6xl bg-card border border-border rounded-2xl shadow-xl shadow-foreground/5 overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-foreground/70 hover:text-foreground rounded-xl transition-colors"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="ml-4 border-l-2 border-primary/20 pl-4 space-y-1">
                        {products.map((p) => (
                          <Link key={p.href} to={p.href} className="block py-2 text-sm text-foreground/60 hover:text-primary" onClick={() => setMobileOpen(false)}>
                            {p.label[lang]}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.label} to={link.href} className="px-4 py-3 text-foreground/70 hover:text-foreground rounded-xl transition-colors" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                )
              )}

              {user ? (
                <>
                  <Link to="/dashboard" className="px-4 py-3 text-primary font-medium" onClick={() => setMobileOpen(false)}>
                    {t("nav.dashboard")}
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="px-4 py-3 text-secondary font-medium" onClick={() => setMobileOpen(false)}>
                      Admin
                    </Link>
                  )}
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="px-4 py-3 text-foreground/60 hover:text-primary text-left">
                    {t("auth.logout")}
                  </button>
                </>
              ) : (
                <Link to="/auth" className="px-4 py-3 text-primary font-medium" onClick={() => setMobileOpen(false)}>
                  {t("nav.login")}
                </Link>
              )}

              <button onClick={toggleLang} className="px-4 py-3 text-sm text-foreground/60 hover:text-primary text-left">
                {t("nav.switchToAm")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
