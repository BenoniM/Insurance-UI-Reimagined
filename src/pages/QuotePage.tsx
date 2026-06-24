import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Product {
  id: string;
  name: string;
  slug: string;
  name_am: string | null;
  pricing_rules: any;
}

const QuotePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.from("products").select("id, name, slug, name_am, pricing_rules").eq("active", true).order("sort_order").then(({ data }) => {
      if (data) {
        setProducts(data);
        const preselect = searchParams.get("product");
        if (preselect) {
          const found = data.find((p) => p.slug === preselect);
          if (found) setSelectedProduct(found.id);
        }
      }
    });
  }, [searchParams]);

  const currentProduct = products.find((p) => p.id === selectedProduct);
  const pricingRules = currentProduct?.pricing_rules as any;
  const fields: string[] = pricingRules?.fields || [];

  const fieldLabels: Record<string, { en: string; am: string }> = {
    age: { en: "Your Age", am: "ዕድሜዎ" },
    family_size: { en: "Family Size", am: "የቤተሰብ ብዛት" },
    pre_existing_conditions: { en: "Pre-existing Conditions?", am: "ቀድሞ ያሉ ሁኔታዎች?" },
    vehicle_type: { en: "Vehicle Type", am: "የተሽከርካሪ ዓይነት" },
    vehicle_year: { en: "Vehicle Age", am: "የተሽከርካሪ ዕድሜ" },
    vehicle_value: { en: "Vehicle Value (ETB)", am: "የተሽከርካሪ ዋጋ (ብር)" },
    coverage_type: { en: "Coverage Type", am: "የሽፋን ዓይነት" },
    coverage_amount: { en: "Coverage Amount (ETB)", am: "የሽፋን መጠን (ብር)" },
    term_years: { en: "Term (Years)", am: "ዘመን (ዓመታት)" },
    smoker: { en: "Smoker?", am: "ሲጋራ ያጨሳሉ?" },
    property_type: { en: "Property Type", am: "የንብረት ዓይነት" },
    property_value: { en: "Property Value (ETB)", am: "የንብረት ዋጋ (ብር)" },
    location: { en: "Location", am: "ቦታ" },
  };

  const fieldOptions: Record<string, { label: string; value: string }[]> = {
    vehicle_type: [
      { label: "Sedan", value: "sedan" },
      { label: "SUV", value: "suv" },
      { label: "Truck", value: "truck" },
      { label: "Motorcycle", value: "motorcycle" },
    ],
    vehicle_year: [
      { label: "Brand New", value: "new" },
      { label: "1-5 Years", value: "1-5" },
      { label: "6-10 Years", value: "6-10" },
      { label: "10+ Years", value: "10+" },
    ],
    coverage_type: [
      { label: "Comprehensive", value: "comprehensive" },
      { label: "Third Party", value: "third_party" },
    ],
    smoker: [
      { label: "No", value: "no" },
      { label: "Yes", value: "yes" },
    ],
    pre_existing_conditions: [
      { label: "No", value: "no" },
      { label: "Yes", value: "yes" },
    ],
    property_type: [
      { label: "Residential", value: "residential" },
      { label: "Commercial", value: "commercial" },
      { label: "Industrial", value: "industrial" },
    ],
  };

  const calculatePrice = () => {
    if (!pricingRules) return null;
    let price = pricingRules.base_rate || 0;

    // Age factor
    if (formData.age && pricingRules.age_factor) {
      const age = parseInt(formData.age);
      if (age <= 30) price *= pricingRules.age_factor["18-30"] || 1;
      else if (age <= 45) price *= pricingRules.age_factor["31-45"] || 1;
      else if (age <= 60) price *= pricingRules.age_factor["46-60"] || 1;
      else price *= pricingRules.age_factor["61+"] || 1;
    }

    // Family addon
    if (formData.family_size && pricingRules.family_addon) {
      price += (parseInt(formData.family_size) - 1) * pricingRules.family_addon;
    }

    // Vehicle factor
    if (formData.vehicle_type && pricingRules.vehicle_factor) {
      price *= pricingRules.vehicle_factor[formData.vehicle_type] || 1;
    }

    // Vehicle year factor
    if (formData.vehicle_year && pricingRules.year_factor) {
      price *= pricingRules.year_factor[formData.vehicle_year] || 1;
    }

    // Property factor
    if (formData.property_type && pricingRules.property_factor) {
      price *= pricingRules.property_factor[formData.property_type] || 1;
    }

    // Coverage amount factor
    if (formData.coverage_amount) {
      price *= parseInt(formData.coverage_amount) / 1000000;
    }

    // Smoker
    if (formData.smoker === "yes") {
      price *= 1.4;
    }

    return Math.round(price);
  };

  const handleNext = () => {
    if (step === 0 && !selectedProduct) {
      toast({ title: "Please select a product", variant: "destructive" });
      return;
    }
    if (step === 1) {
      const price = calculatePrice();
      setEstimatedPrice(price);
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const quoteData = {
        product_id: selectedProduct,
        user_id: user?.id || null,
        status: "submitted" as const,
        form_data: formData,
        quoted_amount: estimatedPrice,
        currency: "ETB",
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const { error } = await supabase.from("quotes").insert(quoteData);
      if (error) throw error;

      // Also create a lead
      await supabase.from("leads").insert({
        name: formData.name || user?.email || "Anonymous",
        email: user?.email || formData.email || null,
        phone: formData.phone || null,
        product_interest: currentProduct?.name || "",
        source: "quote_form",
      });

      // Send confirmation notification (non-blocking)
      const recipient = user?.email || formData.email;
      if (recipient) {
        supabase.functions
          .invoke("notify", {
            body: {
              type: "quote_submitted",
              email: recipient,
              data: { amount: estimatedPrice, product: currentProduct?.name },
            },
          })
          .catch(() => {});
      }

      toast({ title: "Quote submitted!", description: "We'll contact you shortly with your personalized quote." });
      navigate(user ? "/dashboard" : "/");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [t("quote.selectProduct"), t("quote.yourDetails"), t("quote.review")];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-8"
          >
            {t("quote.title")}
          </motion.h1>

          {/* Progress bar */}
          <div className="mb-6">
            <Progress value={((step + 1) / steps.length) * 100} className="h-2" />
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: i === step ? 1.1 : 1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </motion.div>
                <span className={`text-xs font-medium hidden sm:block transition-colors ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                {i < steps.length - 1 && <div className="w-8 h-[2px] bg-border" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              {/* Step 0: Select Product */}
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="font-heading text-xl font-semibold mb-4">{t("quote.selectProduct")}</h2>
                  <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
                    {products.map((p) => (
                      <div key={p.id} className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setSelectedProduct(p.id)}>
                        <RadioGroupItem value={p.id} id={p.id} />
                        <Label htmlFor={p.id} className="cursor-pointer font-medium">
                          {lang === "am" && p.name_am ? p.name_am : p.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Step 1: Form fields */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-heading text-xl font-semibold mb-4">{t("quote.yourDetails")}</h2>
                  
                  {!user && (
                    <>
                      <div>
                        <Label>{lang === "am" ? "ስም" : "Name"}</Label>
                        <Input value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full name" />
                      </div>
                      <div>
                        <Label>{lang === "am" ? "ኢሜይል" : "Email"}</Label>
                        <Input type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@email.com" />
                      </div>
                      <div>
                        <Label>{lang === "am" ? "ስልክ" : "Phone"}</Label>
                        <Input value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+251..." />
                      </div>
                    </>
                  )}

                  {fields.map((field) => {
                    const label = fieldLabels[field]?.[lang] || field;
                    const options = fieldOptions[field];

                    if (options) {
                      return (
                        <div key={field}>
                          <Label>{label}</Label>
                          <RadioGroup value={formData[field] || ""} onValueChange={(val) => setFormData({ ...formData, [field]: val })}>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              {options.map((opt) => (
                                <div key={opt.value} className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:bg-accent/50 cursor-pointer" onClick={() => setFormData({ ...formData, [field]: opt.value })}>
                                  <RadioGroupItem value={opt.value} id={`${field}-${opt.value}`} />
                                  <Label htmlFor={`${field}-${opt.value}`} className="cursor-pointer text-sm">{opt.label}</Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      );
                    }

                    return (
                      <div key={field}>
                        <Label>{label}</Label>
                        <Input
                          type="number"
                          value={formData[field] || ""}
                          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                          placeholder={label}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-semibold">{t("quote.review")}</h2>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-primary mb-2">
                      <Sparkles className="w-4 h-4" />
                      <p className="text-xs font-bold tracking-widest uppercase">{t("quote.estimatedPremium")}</p>
                    </div>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="font-heading text-5xl font-bold text-primary"
                    >
                      {estimatedPrice?.toLocaleString()} <span className="text-xl">{t("common.etb")}</span>
                    </motion.p>
                    <p className="text-xs text-muted-foreground mt-2">{lang === "am" ? "በዓመት" : "per year"}</p>
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-sm"><strong>{lang === "am" ? "ምርት" : "Product"}:</strong> {lang === "am" && currentProduct?.name_am ? currentProduct.name_am : currentProduct?.name}</p>
                    {Object.entries(formData).map(([key, val]) => (
                      <p key={key} className="text-sm text-muted-foreground">
                        <strong>{fieldLabels[key]?.[lang] || key}:</strong> {val}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {step > 0 ? (
                  <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> {t("quote.back")}
                  </Button>
                ) : <div />}

                {step < 2 ? (
                  <Button className="teal-gradient text-primary-foreground" onClick={handleNext}>
                    {t("quote.next")} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button className="teal-gradient text-primary-foreground" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? t("common.loading") : t("quote.submit")}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default QuotePage;
