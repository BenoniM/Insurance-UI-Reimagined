import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

// Track specific insurance events
export const trackQuoteStart = (product: string) => trackEvent("quote_start", "Quote", product);
export const trackQuoteComplete = (product: string, amount?: number) => trackEvent("quote_complete", "Quote", product, amount);
export const trackQuoteDropoff = (product: string, step: number) => trackEvent("quote_dropoff", "Quote", `${product}_step_${step}`, step);
export const trackClaimSubmit = () => trackEvent("claim_submit", "Claims");
export const trackContactForm = () => trackEvent("contact_form_submit", "Contact");
export const trackProductView = (product: string) => trackEvent("product_view", "Products", product);
export const trackCTAClick = (label: string) => trackEvent("cta_click", "CTA", label);

const AnalyticsProvider = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-XXXXXXXXXX", { page_path: location.pathname });
    }
  }, [location]);

  return null;
};

export default AnalyticsProvider;
