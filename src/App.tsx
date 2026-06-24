import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import AuthPage from "./pages/AuthPage";
import QuotePage from "./pages/QuotePage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import GivebackPage from "./pages/GivebackPage";
import NewClaimPage from "./pages/NewClaimPage";
import ClaimDetailsPage from "./pages/ClaimDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentsPage from "./pages/PaymentsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageTransition><Index /></PageTransition>} />
      <Route path="/products/:slug" element={<PageTransition><ProductPage /></PageTransition>} />
      <Route path="/claims" element={<PageTransition><ClaimsPage /></PageTransition>} />
      <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
      <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
      <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
      <Route path="/quote" element={<PageTransition><QuotePage /></PageTransition>} />
      <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
      <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
      <Route path="/giveback" element={<PageTransition><GivebackPage /></PageTransition>} />
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
