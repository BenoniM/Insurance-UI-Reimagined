import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { navCategories, type NavSubcategory } from "@/data/products";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [accountsOpen, setAccountsOpen] = useState(false);
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY > 60 && currentScrollY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setAccountsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      clearProps: "transform"
    });
  }, []);

  const navLinks = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.products"), href: "/products", hasDropdown: true },
    { label: t("nav.claims"), href: "/claims" },
    { label: lang === "am" ? "ጊቨባክ" : "Giveback", href: "/giveback" },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <>
      {/* ─── DESKTOP NAVBAR ─────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-center pointer-events-none"
        style={{ height: "88px" }}
      >
        {/*
          Layout:
          [LEFT PILL: Logo]  ───bridge───  [CENTER PILL: Nav Links]  ───bridge───  [RIGHT PILL: Lang + Account + CTA]

          The three pills sit on the same horizontal baseline.
          A continuous white "bridge" line connects them.
          We achieve this with a relative container and absolute bridges.
        */}
        <div
          className={`relative flex items-center justify-center gap-0 pointer-events-auto transition-transform duration-300 ease-in-out ${
            hidden ? "-translate-y-[120px]" : "translate-y-0"
          }`}
          style={{ width: "calc(100vw - 48px)", maxWidth: "1400px" }}
        >
          <div 
            className="relative flex items-center justify-center gap-0 transition-all duration-300"
            style={{
              filter: scrolled 
                ? "drop-shadow(0 16px 40px rgba(0,0,0,0.2))" 
                : "drop-shadow(0 12px 32px rgba(0,0,0,0.15))",
            }}
          >
            {/* ── LEFT PILL: Logo ── */}
            <div
              className="relative flex items-center justify-center shrink-0"
              onMouseEnter={() => setHoveredLeft(true)}
              onMouseLeave={() => setHoveredLeft(false)}
              style={{
                zIndex: 2,
                background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,1)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: "12px",
                height: "56px",
                padding: "0 24px",
                boxShadow: "none",
                border: "none",
                transform: hoveredLeft ? "translateX(-12px)" : "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Bridge to Center — concave top/bottom notches */}
              <svg
                className="absolute left-full top-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  height: "90%",
                  width: hoveredLeft ? "24px" : "12px",
                  marginLeft: "-6px",
                  zIndex: -1,
                  overflow: "visible",
                  transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                viewBox="0 0 12 56"
                preserveAspectRatio="none"
              >
                <path d="M 0,0 Q 6,24 12,0 L 12,56 Q 6,32 0,56 Z" fill={scrolled ? "rgba(255,255,255,0.98)" : "white"} />
              </svg>
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img
                src="/images/wass-logo.svg"
                alt="WASS Insurance"
                className="h-9 w-auto"
              />
            </Link>
          </div>

            {/* ── CENTER: One big box for all nav links ── */}
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                zIndex: 2,
                gap: "4px",
                background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,1)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: "12px",
                height: "56px",
                padding: "0 12px",
                boxShadow: "none",
                border: "none",
                transition: "all 0.4s ease",
              }}
            >

            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="h-full flex items-center group"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "var(--font-heading)",
                      whiteSpace: "nowrap",
                      color: productsOpen ? "hsl(160 55% 35%)" : location.pathname.startsWith(link.href) ? "hsl(160,55%,45%)" : "rgb(11, 63, 91)",
                      background: "transparent",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "hsl(160 55% 35%)";
                    }}
                    onMouseLeave={(e) => {
                      if (!productsOpen) {
                        (e.currentTarget as HTMLButtonElement).style.color = location.pathname.startsWith(link.href) ? "hsl(160,55%,45%)" : "rgb(11, 63, 91)";
                      }
                    }}
                  >
                    <span className="relative inline-block">
                      {link.label}
                      <span 
                        className={`absolute -bottom-1 left-0 h-[3px] bg-[hsl(160,55%,45%)] rounded-full transition-all duration-300 ease-out ${
                          location.pathname.startsWith(link.href) ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Products Dropdown */}
                  <div
                    className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-[2px] py-6 px-8 transition-all duration-200 origin-top grid grid-cols-12 gap-8"
                    style={{
                      width: "calc(100vw - 48px)",
                      maxWidth: "850px",
                      background: "rgba(255,255,255,1)",
                      borderRadius: "16px",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                      border: "none",
                      opacity: productsOpen ? 1 : 0,
                      transform: productsOpen ? "scaleY(1) translateX(-50%)" : "scaleY(0.92) translateX(-50%)",
                      visibility: productsOpen ? "visible" : "hidden",
                    }}
                  >
                    {navCategories.map((category) => {
                      const isGeneralInsurance = category.slug === "general-insurance";
                      return (
                      <div key={category.slug} className={`flex flex-col text-left ${isGeneralInsurance ? 'col-span-6' : 'col-span-3'}`}>
                        <h3 className="font-heading font-bold text-[hsl(160,55%,45%)] text-[13px] uppercase tracking-wider mb-5 border-b border-gray-100 pb-3">
                          {lang === "en" ? category.label : category.label_am}
                        </h3>
                        <div className={isGeneralInsurance ? "grid grid-cols-2 gap-x-4 gap-y-3" : "flex flex-col gap-4"}>
                          {category.subcategories.map((sub) => {
                            const hasChildren = Boolean(sub.children?.length);
                            const isActive = sub.href ? location.pathname === sub.href : sub.children?.some(c => location.pathname === c.href);
                            const collapseChildren = isGeneralInsurance && hasChildren;
                            return (
                              <div key={sub.label} className={`flex flex-col ${collapseChildren ? "group/general-sub gap-0" : "gap-1.5"}`}>
                                {sub.href ? (
                                  <Link
                                    to={sub.href}
                                    className="font-semibold text-[13px] transition-colors"
                                    style={{ color: isActive ? "hsl(160,55%,45%)" : "hsl(201,78%,20%)" }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(160,55%,45%)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? "hsl(160,55%,45%)" : "hsl(201,78%,20%)"; }}
                                  >
                                    {lang === "en" ? sub.label : sub.label_am}
                                  </Link>
                                ) : (
                                  <>
                                    <span className="flex items-center justify-between gap-2 font-semibold text-[13px] text-[hsl(201,78%,20%)] cursor-default transition-colors group-hover/general-sub:text-[hsl(160,55%,45%)]">
                                      <span>{lang === "en" ? sub.label : sub.label_am}</span>
                                      {collapseChildren && (
                                        <ChevronDown className="w-3 h-3 shrink-0 transition-transform duration-200 group-hover/general-sub:rotate-180" />
                                      )}
                                    </span>
                                    <div className={`${collapseChildren ? "max-h-0 opacity-0 mt-0 overflow-hidden transition-all duration-200 group-hover/general-sub:max-h-80 group-hover/general-sub:opacity-100 group-hover/general-sub:mt-2" : "mt-1"} flex flex-col pl-3 border-l-2 border-gray-100 gap-1`}>
                                      {sub.children?.map(child => {
                                        const isChildActive = location.pathname === child.href;
                                        return (
                                          <Link
                                            key={child.href}
                                            to={child.href}
                                            className="text-[12px] transition-colors py-0.5"
                                            style={{ color: isChildActive ? "hsl(160,55%,45%)" : "hsl(200,10%,40%)" }}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(160,55%,45%)"; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isChildActive ? "hsl(160,55%,45%)" : "hsl(200,10%,40%)"; }}
                                          >
                                            {lang === "en" ? child.label : child.label_am}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div key={link.label} className="h-full flex items-center group">
                  <Link
                    to={link.href}
                    style={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "var(--font-heading)",
                      whiteSpace: "nowrap",
                      color: location.pathname.startsWith(link.href) ? "hsl(160,55%,45%)" : "rgb(11, 63, 91)",
                      background: "transparent",
                      border: "none",
                      borderRadius: "8px",
                      display: "inline-block",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "hsl(160 55% 35%)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = location.pathname.startsWith(link.href) ? "hsl(160,55%,45%)" : "rgb(11, 63, 91)";
                    }}
                  >
                    <span className="relative inline-block">
                      {link.label}
                      <span 
                        className={`absolute -bottom-1 left-0 h-[3px] bg-[hsl(160,55%,45%)] rounded-full transition-all duration-300 ease-out ${
                          location.pathname.startsWith(link.href) ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </span>
                  </Link>
                </div>
              )
            )}

            {/* Get Quote — standalone capsule pill with gradient */}
            <div className="h-full flex items-center ml-1">
              <a
                href="/quote"
                style={{
                  padding: "10px 20px",
                  fontSize: "12px",
                  fontWeight: 500,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                  color: "#fff",
                  background: location.pathname === "/quote" ? "linear-gradient(135deg, hsl(205,65%,48%), hsl(201,78%,35%))" : "linear-gradient(135deg, hsl(160,55%,35%), hsl(160,55%,45%))",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(40, 138, 105, 0.20)",
                  display: "inline-block",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 16px rgba(40, 138, 105, 0.30)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(40, 138, 105, 0.20)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {t("nav.getQuote")}
              </a>
            </div>
          </div>


            {/* ── RIGHT PILL: Accounts + Language ── */}
            <div
              className="relative flex items-center justify-center gap-2 shrink-0"
              onMouseEnter={() => setHoveredRight(true)}
              onMouseLeave={() => setHoveredRight(false)}
              style={{
                zIndex: 2,
                background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,1)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: "12px",
                height: "56px",
                padding: "0 20px",
                boxShadow: "none",
                border: "none",
                transform: hoveredRight ? "translateX(12px)" : "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Bridge to Center — concave top/bottom notches */}
              <svg
                className="absolute right-full top-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  height: "90%",
                  width: hoveredRight ? "24px" : "12px",
                  marginRight: "-6px",
                  zIndex: -1,
                  overflow: "visible",
                  transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                viewBox="0 0 12 56"
                preserveAspectRatio="none"
              >
                <path d="M 0,0 Q 6,24 12,0 L 12,56 Q 6,32 0,56 Z" fill={scrolled ? "rgba(255,255,255,0.98)" : "white"} />
              </svg>

              {/* Accounts dropdown */}
              <div
                onMouseEnter={() => setAccountsOpen(true)}
                onMouseLeave={() => setAccountsOpen(false)}
              >
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    color: accountsOpen ? "hsl(160 55% 38%)" : "hsl(201 78% 20%)",
                    background: "transparent",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {user ? (
                    <span className="max-w-[80px] truncate">
                      {(user as any).user_metadata?.full_name || (user as any).user_metadata?.name || (user as any).displayName || user.email?.split("@")[0] || "Account"}
                    </span>
                  ) : (
                    "Accounts"
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      accountsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accounts Dropdown Menu */}
                <div
                  className="absolute top-[100%] right-0 mt-2 py-2 min-w-[190px] transition-all duration-200 origin-top-right flex flex-col items-stretch"
                  style={{
                    background: "rgba(255,255,255,1)",
                    borderRadius: "12px",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    opacity: accountsOpen ? 1 : 0,
                    transform: accountsOpen ? "scaleY(1)" : "scaleY(0.92)",
                    visibility: accountsOpen ? "visible" : "hidden",
                  }}
                >
                  {user ? (
                    <>
                      <DropdownItem to="/dashboard" label={t("nav.dashboard")} />
                      <DropdownItem to="/wifa" label="WIFA Agent" />
                      <DropdownItem to="/payments" label="Payments" />
                      {isAdmin && (
                        <DropdownItem to="/admin" label="Admin Panel" />
                      )}

                      {/* Logout */}
                      <div
                        className="mt-1 pt-1"
                        style={{ borderTop: "1px solid hsl(201 78% 20% / 0.08)" }}
                      >
                        <button
                          onClick={signOut}
                          className="flex items-center justify-center w-full px-4 py-3.5 transition-all duration-150"
                          style={{
                            color: "hsl(0 80% 50%)",
                            fontFamily: "var(--font-heading)",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "hsl(0 80% 40%)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "hsl(0 80% 50%)";
                          }}
                        >
                          {t("auth.logout")}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <DropdownItem to="/auth" label={t("nav.login")} />
                      <DropdownItem to="/dashboard" label={t("nav.dashboard")} />
                      <DropdownItem to="/payments" label="Payments" />
                      {/* Logout (greyed out when no user) */}
                      <div
                        className="mt-1 pt-1"
                        style={{ borderTop: "1px solid hsl(201 78% 20% / 0.08)" }}
                      >
                        <div
                          className="flex items-center justify-center w-full px-4 py-3.5 opacity-40 cursor-not-allowed select-none"
                          style={{
                            color: "hsl(0 80% 50%)",
                            fontFamily: "var(--font-heading)",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Logout
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "1px",
                  height: "24px",
                  background: "hsl(201 78% 20% / 0.12)",
                }}
              />

              {/* Language toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02]"
                style={{
                  color: "hsl(201 78% 20%)",
                  border: "none",
                  background: "transparent",
                  fontFamily: "var(--font-heading)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "hsl(160 55% 38%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "hsl(201 78% 20%)";
                }}
              >
                {lang === "en" ? "አማርኛ" : "English"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── MOBILE NAVBAR ──────────────────────────────────────────── */}
      {/* Mobile Overlay Backdrop */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ease-in-out ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(11, 63, 91, 0.4)", // Primary color with opacity
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        onClick={() => setMobileOpen(false)}
      />

      <nav 
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden px-4 py-4 transition-transform duration-300 ease-in-out ${
          hidden && !mobileOpen ? "-translate-y-[120px]" : "translate-y-0"
        }`}
      >
        <div 
          className="relative flex items-center w-full gap-0 transition-all duration-300"
          style={{
            filter: scrolled 
              ? "drop-shadow(0 16px 40px rgba(0,0,0,0.2))" 
              : "drop-shadow(0 12px 32px rgba(0,0,0,0.15))",
          }}
        >
          {/* ── LEFT PILL: Logo ── */}
          <div
            className="relative flex items-center shrink-0 flex-1"
            style={{
              zIndex: 2,
              background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,1)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "16px",
              height: "64px",
              padding: "0 24px",
              boxShadow: "none",
              border: "none",
            }}
          >
            {/* Bridge to Right */}
            <svg
              className="absolute left-full top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                height: "90%",
                width: "12px",
                marginLeft: "-6px",
                zIndex: -1,
                overflow: "visible",
              }}
              viewBox="0 0 12 64"
              preserveAspectRatio="none"
            >
              <path d="M 0,0 Q 6,28 12,0 L 12,64 Q 6,36 0,64 Z" fill={scrolled ? "rgba(255,255,255,0.98)" : "white"} />
            </svg>
            <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <img src="/images/wass-logo.svg" alt="WASS Insurance" className="h-10 w-auto" />
            </Link>
          </div>

          {/* ── RIGHT PILL: Hamburger ── */}
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{
              zIndex: 2,
              background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,1)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "16px",
              height: "64px",
              padding: "0 20px",
              boxShadow: "none",
              border: "none",
            }}
          >
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl transition-colors"
              style={{ color: "hsl(201 78% 20%)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="mt-3 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
              border: "none",
              animation: "slideDown 0.2s ease-out",
            }}
          >
            <div className="flex flex-col p-3 gap-1">
              {/* --- NAV LINKS --- */}
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="group flex items-center justify-between w-full px-4 py-3 text-base font-semibold rounded-xl transition-colors"
                      style={{
                        color: location.pathname.startsWith(link.href) ? "hsl(160,55%,45%)" : "hsl(201 78% 20%)",
                      }}
                    >
                      <span className="relative inline-block">
                        {link.label}
                        <span 
                          className={`absolute -bottom-1 left-0 h-[3px] bg-[hsl(160,55%,45%)] rounded-full transition-all duration-300 ease-out ${
                            location.pathname.startsWith(link.href) ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          productsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {productsOpen && (
                      <div className="ml-4 pl-4 py-2 flex flex-col gap-4 text-left"
                        style={{ borderLeft: "2px solid hsl(160 55% 45% / 0.2)" }}>
                        {navCategories.map((category) => (
                          <div key={category.slug} className="flex flex-col gap-2">
                            <h4 className="text-xs font-bold text-[hsl(160,55%,45%)] uppercase tracking-wider">
                              {lang === "en" ? category.label : category.label_am}
                            </h4>
                            <div className="flex flex-col gap-3">
                              {category.subcategories.map((sub) => (
                                <div key={sub.label} className="flex flex-col gap-1 ml-2">
                                  {sub.href ? (
                                    <Link
                                      to={sub.href}
                                      className="text-sm font-semibold transition-colors"
                                      style={{ color: location.pathname === sub.href ? "hsl(160,55%,45%)" : "hsl(201,78%,30%)" }}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {lang === "en" ? sub.label : sub.label_am}
                                    </Link>
                                  ) : (
                                    <>
                                      <span className="text-sm font-semibold text-[hsl(201,78%,30%)]">
                                        {lang === "en" ? sub.label : sub.label_am}
                                      </span>
                                      <div className="flex flex-col pl-3 border-l border-gray-200 gap-2 mt-1">
                                        {sub.children?.map(child => (
                                          <Link
                                            key={child.href}
                                            to={child.href}
                                            className="text-xs transition-colors"
                                            style={{ color: location.pathname === child.href ? "hsl(160,55%,45%)" : "hsl(200,10%,40%)" }}
                                            onClick={() => setMobileOpen(false)}
                                          >
                                            {lang === "en" ? child.label : child.label_am}
                                          </Link>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="group block px-4 py-3 text-base font-semibold rounded-xl transition-colors"
                    style={{
                      color: location.pathname.startsWith(link.href) ? "hsl(160,55%,45%)" : "hsl(201 78% 20%)",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="relative inline-block">
                      {link.label}
                      <span 
                        className={`absolute -bottom-1 left-0 h-[3px] bg-[hsl(160,55%,45%)] rounded-full transition-all duration-300 ease-out ${
                          location.pathname.startsWith(link.href) ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </span>
                  </Link>
                )
              )}

              {/* --- ACCOUNT SECTION --- */}
              <div
                className="my-2 mx-2"
                style={{ height: "1px", background: "hsl(201 78% 20% / 0.15)" }}
              />

              {user ? (
                <div className="flex flex-col gap-1 rounded-xl p-1" style={{ background: "rgba(11, 63, 91, 0.03)" }}>
                  <div className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wider" style={{ color: "hsl(201 78% 40%)" }}>
                    {(user as any).user_metadata?.full_name || (user as any).user_metadata?.name || (user as any).displayName || user.email?.split("@")[0] || "Account"}
                  </div>
                  <Link
                    to="/dashboard"
                    className="px-3 py-2.5 text-base font-semibold rounded-lg"
                    style={{ color: "hsl(160 55% 38%)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <Link
                    to="/wifa"
                    className="px-3 py-2.5 text-base font-semibold rounded-lg"
                    style={{ color: "hsl(201 78% 20%)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    WIFA Agent
                  </Link>
                  <Link
                    to="/payments"
                    className="px-3 py-2.5 text-base font-semibold rounded-lg"
                    style={{ color: "hsl(201 78% 20%)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Payments
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-3 py-2.5 text-base font-semibold rounded-lg"
                      style={{ color: "hsl(201 78% 20%)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2.5 text-base font-semibold rounded-lg text-left mt-1"
                    style={{ color: "hsl(0 80% 50%)"}}
                  >
                    {t("auth.logout")}
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="px-4 py-3 text-base font-semibold rounded-xl text-center mx-1 border-2 border-dashed"
                  style={{ color: "hsl(160 55% 38%)", borderColor: "hsl(160 55% 38% / 0.3)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.login")}
                </Link>
              )}

              {/* --- BOTTOM ROW (Get Quote & Language) --- */}
              <div className="flex items-center gap-2 mt-2 pt-2 mx-1" style={{ borderTop: "1px solid hsl(201 78% 20% / 0.08)" }}>
                <a
                  href="/quote"
                  className="flex-1 text-center px-4 py-3 text-base font-bold rounded-xl text-white transition-transform hover:scale-[1.02]"
                  style={{
                    background: location.pathname === "/quote" ? "linear-gradient(135deg, hsl(205,65%,48%), hsl(201,78%,35%))" : "linear-gradient(135deg, hsl(160,55%,35%), hsl(160,55%,45%))",
                    boxShadow: "0 4px 12px rgba(40, 138, 105, 0.20)",
                  }}
                >
                  {t("nav.getQuote")}
                </a>
                <button
                  onClick={toggleLang}
                  className="flex items-center justify-center px-4 py-3 text-base font-bold rounded-xl transition-transform hover:scale-[1.02]"
                  style={{ 
                    color: "hsl(201 78% 20%)",
                    background: "rgba(11, 63, 91, 0.06)",
                  }}
                >
                  {lang === "en" ? "አማርኛ" : "EN"}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

// Small helper for dropdown items
const DropdownItem = ({
  to,
  label,
}: {
  to: string;
  label: string;
}) => (
  <Link
    to={to}
    className="flex items-center justify-center px-4 py-3.5 transition-all duration-150"
    style={{
      color: "hsl(201 78% 20%)",
      fontFamily: "var(--font-heading)",
      fontSize: "14px",
      fontWeight: 600,
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.color = "hsl(160 55% 38%)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.color = "hsl(201 78% 20%)";
    }}
  >
    {label}
  </Link>
);

export default Navbar;
