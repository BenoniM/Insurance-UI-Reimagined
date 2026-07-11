import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

import AIChatWidget from "@/components/AIChatWidget";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import ClaimsPage from "./pages/ClaimsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import NewsArticlePage from "./pages/NewsArticlePage";
import AuthPage from "./pages/AuthPage";
import QuotePage from "./pages/QuotePage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import GivebackPage from "./pages/GivebackPage";
import MediaPage from "./pages/MediaPage";
import ChannelPage from "./pages/ChannelPage";
import NewClaimPage from "./pages/NewClaimPage";
import ClaimDetailsPage from "./pages/ClaimDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentsPage from "./pages/PaymentsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Push the scroll event slightly down the call stack to ensure it fires after initial render
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // New page's components mount with their own ScrollTrigger instances, but GSAP
      // measures trigger positions against whatever layout existed at mount time. If
      // images on the new page haven't finished loading yet, those measurements go
      // stale and the scroll-revealed sections never fire (they stay opacity: 0)
      // until something else forces a recalculation, like a manual refresh.
      ScrollTrigger.refresh();
    }, 10);

    // Layout keeps shifting as each image on the new page finishes loading, so
    // refresh again every time one does. The "load" window event only fires once
    // per full page load and won't catch images on later client-side route changes,
    // so listen on the images themselves instead.
    const images = Array.from(document.images).filter((img) => !img.complete);
    const handleImageLoad = () => ScrollTrigger.refresh();
    images.forEach((img) => img.addEventListener("load", handleImageLoad, { once: true }));

    return () => {
      clearTimeout(timeout);
      images.forEach((img) => img.removeEventListener("load", handleImageLoad));
    };
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageTransition><Index /></PageTransition>} />
      <Route path="/products/:slug" element={<PageTransition><ProductPage /></PageTransition>} />
      <Route path="/claims" element={<PageTransition><ClaimsPage /></PageTransition>} />
      <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
      <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      <Route path="/news" element={<PageTransition><BlogPage /></PageTransition>} />
      <Route path="/news/:slug" element={<PageTransition><NewsArticlePage /></PageTransition>} />
      <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
      <Route path="/blog/:slug" element={<PageTransition><NewsArticlePage /></PageTransition>} />
      <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
      <Route path="/quote" element={<PageTransition><QuotePage /></PageTransition>} />
      <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
      <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
      <Route path="/giveback" element={<PageTransition><GivebackPage /></PageTransition>} />
      <Route path="/announcements" element={<PageTransition><MediaPage kind="announcements" /></PageTransition>} />
      <Route path="/gallery" element={<PageTransition><MediaPage kind="gallery" /></PageTransition>} />
      <Route path="/articles" element={<PageTransition><MediaPage kind="articles" /></PageTransition>} />
      <Route path="/channels/wia" element={<PageTransition><ChannelPage kind="wia" /></PageTransition>} />
      <Route path="/channels/broker-portal" element={<PageTransition><ChannelPage kind="broker" /></PageTransition>} />
      <Route path="/claims/new" element={<PageTransition><NewClaimPage /></PageTransition>} />
      <Route path="/claims/:id" element={<PageTransition><ClaimDetailsPage /></PageTransition>} />
      <Route path="/payments" element={<PageTransition><PaymentsPage /></PageTransition>} />
      <Route path="/payments/new" element={<PageTransition><PaymentPage /></PageTransition>} />
      <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
            <AIChatWidget />
            <AnalyticsProvider />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
