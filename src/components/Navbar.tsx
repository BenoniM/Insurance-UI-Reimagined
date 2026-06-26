import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const products = [
  { label: { en: "Life Insurance", am: "የህይወት ኢንሹራንስ" }, href: "/products/life-insurance" },
  { label: { en: "Health Insurance", am: "የጤና ኢንሹራንስ" }, href: "/products/health-insurance" },
  { label: { en: "Motor Insurance", am: "የመኪና ኢንሹራንስ" }, href: "/products/motor-insurance" },
  { label: { en: "Property Insurance", am: "የንብረት ኢንሹራንስ" }, href: "/products/property-insurance" },
];

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
    { label: t("nav.products"), href: "/products", hasDropdown: true },
    { label: t("nav.claims"), href: "/claims" },
    { label: lang === "am" ? "ጊቨባክ" : "Giveback", href: "/giveback" },
    { label: t("nav.about"), href: "/about" },
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
                  className="h-full flex items-center"
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
                      color: productsOpen ? "hsl(160 55% 35%)" : "rgb(11, 63, 91)",
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
                        (e.currentTarget as HTMLButtonElement).style.color = "rgb(11, 63, 91)";
                      }
                    }}
                  >
                    {link.label}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Products Dropdown */}
                  <div
                    className="absolute top-[100%] left-0 w-full mt-[2px] py-4 transition-all duration-200 origin-top flex flex-col items-center"
                    style={{
                      background: "rgba(255,255,255,1)",
                      borderRadius: "12px",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                      border: "none",
                      opacity: productsOpen ? 1 : 0,
                      transform: productsOpen ? "scaleY(1)" : "scaleY(0.92)",
                      visibility: productsOpen ? "visible" : "hidden",
                    }}
                  >
                    {products.map((p) => (
                      <Link
                        key={p.href}
                        to={p.href}
                        className="flex items-center justify-between px-4 py-3.5 transition-all duration-150 w-full"
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
                        <span>{p.label[lang]}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ flexShrink: 0, opacity: 0.5 }}
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={link.label} className="h-full flex items-center">
                  <Link
                    to={link.href}
                    style={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "var(--font-heading)",
                      whiteSpace: "nowrap",
                      color: "rgb(11, 63, 91)",
                      background: "transparent",
                      border: "none",
                      borderRadius: "8px",
                      display: "inline-block",
                      transition: "all 0.2s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "hsl(160 55% 35%)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgb(11, 63, 91)";
                    }}
                  >
                    {link.label}
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
                  background: "linear-gradient(135deg, hsl(160,55%,35%), hsl(160,55%,45%))",
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
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden px-4 py-3 transition-transform duration-300 ease-in-out ${
          hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className="flex items-center justify-between h-14 px-4 rounded-2xl transition-all duration-400"
          style={{
            background: scrolled
              ? "rgba(255,255,255,0.98)"
              : "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,0,0,0.2)"
              : "0 8px 24px rgba(0,0,0,0.15)",
            border: "1.5px solid rgba(255,255,255,0.9)",
          }}
        >
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/wass-logo.svg" alt="WASS Insurance" className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="/quote"
              className="px-4 py-2 text-xs font-bold rounded-xl text-white"
              style={{
                background: "linear-gradient(135deg, hsl(160,55%,35%), hsl(160,55%,45%))",
              }}
            >
              {t("nav.getQuote")}
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl transition-colors"
              style={{ color: "hsl(201 78% 20%)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
              border: "1.5px solid rgba(255,255,255,0.9)",
              animation: "slideDown 0.2s ease-out",
            }}
          >
            <div className="flex flex-col p-3 gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-xl transition-colors"
                      style={{ color: "hsl(201 78% 20%)" }}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          productsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {productsOpen && (
                      <div className="ml-4 pl-4 py-1 flex flex-col gap-1"
                        style={{ borderLeft: "2px solid hsl(160 55% 45% / 0.2)" }}>
                        {products.map((p) => (
                          <Link
                            key={p.href}
                            to={p.href}
                            className="block py-2 text-sm rounded-lg px-2 transition-colors"
                            style={{ color: "hsl(201 78% 30%)" }}
                            onClick={() => setMobileOpen(false)}
                          >
                            {p.label[lang]}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="px-4 py-3 text-sm font-semibold rounded-xl transition-colors"
                    style={{ color: "hsl(201 78% 20%)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}

              <div
                className="my-1"
                style={{ height: "1px", background: "hsl(201 78% 20% / 0.08)" }}
              />

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-3 text-sm font-semibold rounded-xl"
                    style={{ color: "hsl(160 55% 38%)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("nav.dashboard")}
                  </Link>
                  <Link
                    to="/payments"
                    className="px-4 py-3 text-sm font-semibold rounded-xl"
                    style={{ color: "hsl(201 78% 20%)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Payments
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-4 py-3 text-sm font-semibold rounded-xl"
                      style={{ color: "hsl(201 78% 20%)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl text-left"
                    style={{ color: "hsl(0 80% 50%)" }}
                  >
                    {t("auth.logout")}
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="px-4 py-3 text-sm font-semibold rounded-xl"
                  style={{ color: "hsl(160 55% 38%)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.login")}
                </Link>
              )}

              <button
                onClick={toggleLang}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-xl"
                style={{ color: "hsl(201 78% 30%)" }}
              >
                {lang === "en" ? "አማርኛ" : "English"}
              </button>
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
