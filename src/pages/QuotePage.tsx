import { useState, useEffect, useMemo } from "react";
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
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles, Pencil, ShieldCheck, UserCheck, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getActiveProducts } from "@/data/products";

interface Product {
  id: string; // same as slug
  name: string;
  slug: string;
  name_am: string | null;
  pricing_rules: any;
  category: string;
}

const getFieldsForProduct = (product?: Product | null): string[] => {
  if (!product) return ["coverage_amount", "location"];
  if (product.pricing_rules?.fields && Array.isArray(product.pricing_rules.fields) && product.pricing_rules.fields.length > 0) {
    return product.pricing_rules.fields;
  }
  const slug = (product.slug || product.id || "").toLowerCase();
  const cat = (product.category || "").toLowerCase();

  if (slug.includes("motor") || slug.includes("vehicle") || slug.includes("car")) {
    return ["vehicle_type", "vehicle_year", "coverage_type", "vehicle_value"];
  }
  if (
    slug.includes("property") ||
    slug.includes("fire") ||
    slug.includes("house") ||
    slug.includes("home") ||
    slug.includes("building") ||
    slug.includes("engineering") ||
    slug.includes("burglary")
  ) {
    return ["property_type", "property_value", "location"];
  }
  if (cat.includes("life") || slug.includes("life") || slug.includes("endowment") || slug.includes("education") || slug.includes("annuity")) {
    return ["age", "smoker", "coverage_amount", "term_years"];
  }
  if (cat.includes("medical") || slug.includes("medical") || slug.includes("health") || slug.includes("accident")) {
    return ["age", "family_size", "pre_existing_conditions", "coverage_amount"];
  }
  if (slug.includes("marine") || slug.includes("cargo") || slug.includes("transit")) {
    return ["coverage_amount", "location"];
  }
  if (cat.includes("financial") || slug.includes("liability") || slug.includes("pecuniary") || slug.includes("bond")) {
    return ["property_type", "coverage_amount", "location"];
  }
  return ["coverage_amount", "location"];
};

const QuotePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  // Load products from local data — deduplicated to subcategory level
  useEffect(() => {
    const localProducts = getActiveProducts();
    const seen = new Set<string>();
    const subcategoryLevel: Product[] = [];
    for (const p of localProducts) {
      if (!seen.has(p.subcategory_slug)) {
        seen.add(p.subcategory_slug);
        subcategoryLevel.push({
          id: p.subcategory_slug,
          name: p.subcategory,
          slug: p.subcategory_slug,
          name_am: p.subcategory_am || null,
          pricing_rules: p.pricing_rules,
          category: p.category,
        });
      }
    }
    setProducts(subcategoryLevel);

    const preselect = searchParams.get("product");
    if (preselect) {
      const match =
        subcategoryLevel.find((p) => p.slug === preselect || p.id === preselect) ||
        localProducts.find((p) => p.slug === preselect);
      if (match) {
        const id = match.subcategory_slug || match.id || match.slug;
        setSelectedProduct(id);
      }
    } else if (subcategoryLevel.length > 0 && !selectedProduct) {
      setSelectedProduct(subcategoryLevel[0].id);
    }
    setProductsLoading(false);
  }, [searchParams]);

  // Prepopulate contact info from user if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.user_metadata?.full_name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  // Reset product-specific answers when product changes, preserving contact info
  useEffect(() => {
    setFormData((prev) => {
      const next: Record<string, string> = {};
      if (prev.name) next.name = prev.name;
      if (prev.email) next.email = prev.email;
      if (prev.phone) next.phone = prev.phone;
      return next;
    });
    setFieldErrors({});
  }, [selectedProduct]);

  const currentProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProduct || p.slug === selectedProduct) || products[0];
  }, [products, selectedProduct]);

  const fields = useMemo(() => {
    return getFieldsForProduct(currentProduct);
  }, [currentProduct]);

  const fieldLabels: Record<string, { en: string; am: string }> = {
    name: { en: "Full Name", am: "ሙሉ ስም" },
    email: { en: "Email Address", am: "የኢሜይል አድራሻ" },
    phone: { en: "Phone Number", am: "ስልክ ቁጥር" },
    age: { en: "Your Age", am: "ዕድሜዎ" },
    family_size: { en: "Family Size (Members)", am: "የቤተሰብ ብዛት" },
    pre_existing_conditions: { en: "Pre-existing Medical Conditions?", am: "ቀድሞ ያሉ የጤና ሁኔታዎች?" },
    vehicle_type: { en: "Vehicle Type", am: "የተሽከርካሪ ዓይነት" },
    vehicle_year: { en: "Vehicle Age", am: "የተሽከርካሪ ዕድሜ" },
    vehicle_value: { en: "Vehicle Value (ETB)", am: "የተሽከርካሪ ግምታዊ ዋጋ (ብር)" },
    coverage_type: { en: "Coverage Type", am: "የሽፋን ዓይነት" },
    coverage_amount: { en: "Desired Coverage Amount (ETB)", am: "የሚፈለገው የሽፋን መጠን (ብር)" },
    term_years: { en: "Term (Years)", am: "የፖሊሲ ዘመን (ዓመታት)" },
    smoker: { en: "Smoker / Tobacco User?", am: "ሲጋራ ያጨሳሉ?" },
    property_type: { en: "Property / Asset Type", am: "የንብረት ዓይነት" },
    property_value: { en: "Property Estimated Value (ETB)", am: "የንብረት ዋጋ (ብር)" },
    location: { en: "Location / Region", am: "ቦታ / ክልል" },
  };

  const fieldOptions: Record<string, { label: string; value: string }[]> = {
    vehicle_type: [
      { label: "Private Sedan / Hatchback", value: "sedan" },
      { label: "SUV / 4WD", value: "suv" },
      { label: "Commercial Van / Truck", value: "truck" },
      { label: "Motorcycle / Bajaj", value: "motorcycle" },
    ],
    vehicle_year: [
      { label: "Brand New (0-1 yr)", value: "new" },
      { label: "1-5 Years", value: "1-5" },
      { label: "6-10 Years", value: "6-10" },
      { label: "10+ Years", value: "10+" },
    ],
    coverage_type: [
      { label: "Comprehensive Cover", value: "comprehensive" },
      { label: "Third Party Only", value: "third_party" },
    ],
    smoker: [
      { label: "No (Non-smoker)", value: "no" },
      { label: "Yes", value: "yes" },
    ],
    pre_existing_conditions: [
      { label: "No", value: "no" },
      { label: "Yes", value: "yes" },
    ],
    property_type: [
      { label: "Residential / Home", value: "residential" },
      { label: "Commercial / Office / Retail", value: "commercial" },
      { label: "Industrial / Factory / Warehouse", value: "industrial" },
    ],
    location: [
      { label: "Addis Ababa", value: "Addis Ababa" },
      { label: "Oromia Region", value: "Oromia" },
      { label: "Amhara Region", value: "Amhara" },
      { label: "Sidama / SNNPR", value: "Sidama" },
      { label: "Other Regions", value: "Other" },
    ],
  };

  const calculatePrice = () => {
    let base = currentProduct?.pricing_rules?.base_rate || 3800;
    let price = base;

    // Age factor
    if (formData.age) {
      const age = parseInt(formData.age);
      if (!isNaN(age)) {
        if (age <= 30) price *= 0.9;
        else if (age <= 45) price *= 1.1;
        else if (age <= 60) price *= 1.35;
        else price *= 1.65;
      }
    }

    // Family addon
    if (formData.family_size) {
      const size = parseInt(formData.family_size);
      if (!isNaN(size) && size > 1) {
        price += (size - 1) * 750;
      }
    }

    // Vehicle factor
    if (formData.vehicle_type) {
      const vFactors: Record<string, number> = { sedan: 1.0, suv: 1.25, truck: 1.5, motorcycle: 0.75 };
      price *= vFactors[formData.vehicle_type] || 1;
    }

    // Vehicle year factor
    if (formData.vehicle_year) {
      const yFactors: Record<string, number> = { new: 1.15, "1-5": 1.0, "6-10": 0.88, "10+": 0.75 };
      price *= yFactors[formData.vehicle_year] || 1;
    }

    // Vehicle value factor
    if (formData.vehicle_value) {
      const val = parseFloat(formData.vehicle_value);
      if (!isNaN(val) && val > 0) {
        price += val * 0.012;
      }
    }

    // Property factor
    if (formData.property_type) {
      const pFactors: Record<string, number> = { residential: 1.0, commercial: 1.35, industrial: 1.7 };
      price *= pFactors[formData.property_type] || 1;
    }

    // Property value factor
    if (formData.property_value) {
      const val = parseFloat(formData.property_value);
      if (!isNaN(val) && val > 0) {
        price += val * 0.0015;
      }
    }

    // Coverage amount factor
    if (formData.coverage_amount) {
      const cov = parseFloat(formData.coverage_amount);
      if (!isNaN(cov) && cov > 0) {
        price *= Math.max(0.6, Math.min(5.0, cov / 500000));
      }
    }

    // Smoker
    if (formData.smoker === "yes") {
      price *= 1.35;
    }

    // Pre-existing conditions
    if (formData.pre_existing_conditions === "yes") {
      price *= 1.25;
    }

    // Coverage type
    if (formData.coverage_type === "third_party") {
      price *= 0.55;
    }

    return Math.max(1200, Math.round(price));
  };

  const livePrice = step === 1 ? calculatePrice() : null;
  const requiredFieldsComplete = fields.length > 0 && fields.every((f) => formData[f] !== undefined && formData[f] !== "");

  const validateStep1 = () => {
    const errors: Record<string, boolean> = {};
    if (!formData.name?.trim()) errors.name = true;
    if (!formData.email?.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = true;
    if (!formData.phone?.trim()) errors.phone = true;

    fields.forEach((f) => {
      if (!formData[f] || formData[f].trim() === "") errors[f] = true;
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !selectedProduct) {
      toast({ title: "Please select a product", variant: "destructive" });
      return;
    }
    if (step === 1) {
      if (!validateStep1()) {
        toast({ title: "A few details are missing", description: "Please fill in the highlighted fields to continue.", variant: "destructive" });
        return;
      }
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
      setSubmitted(true);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [t("quote.selectProduct"), t("quote.yourDetails"), t("quote.review")];

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                {lang === "am" ? "ጥያቄዎ ተልኳል!" : "Your quote is on its way!"}
              </h1>
              <p className="text-muted-foreground mb-6">
                {lang === "am"
                  ? "የእርስዎ የግምት ዋጋ ተልኳል። ቡድናችን በቅርቡ ያነጋግርዎታል።"
                  : "We've sent your estimate and a member of our team will follow up shortly to finalize your policy."}
              </p>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                <p className="text-xs font-bold tracking-widest uppercase text-primary mb-1">{t("quote.estimatedPremium")}</p>
                <p className="font-heading text-4xl font-bold text-primary">
                  {estimatedPrice?.toLocaleString()} <span className="text-lg">{t("common.etb")}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="teal-gradient text-primary-foreground" onClick={() => navigate(user ? "/dashboard" : "/")}>
                  {user ? (lang === "am" ? "ወደ ዳሽቦርድ ይሂዱ" : "Go to Dashboard") : (lang === "am" ? "ወደ መነሻ ገጽ ይመለሱ" : "Back to Home")}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setStep(0);
                    setSelectedProduct(products[0]?.id || "");
                    setFormData({});
                    setEstimatedPrice(null);
                  }}
                >
                  {lang === "am" ? "ሌላ ግምት ያግኙ" : "Get another quote"}
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1
            className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-8 animate-in slide-in-from-top-4 fade-in duration-500"
          >
            {t("quote.title")}
          </h1>

          {/* Progress bar */}
          <div className="mb-6">
            <Progress value={((step + 1) / steps.length) * 100} className="h-2" />
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i === step ? "scale-110" : ""} ${
                    i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block transition-colors ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                {i < steps.length - 1 && <div className="w-8 h-[2px] bg-border" />}
              </div>
            ))}
          </div>

          <div
            key={step}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500 shadow-sm"
          >
            {/* Step 0: Select Product */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold mb-4">{t("quote.selectProduct")}</h2>
                {productsLoading ? (
                  <div className="space-y-3">
                    {[0, 1, 2].map((i) => (
                      <Skeleton key={i} className="h-[60px] w-full rounded-lg" />
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    {lang === "am" ? "በአሁኑ ጊዜ ምንም ምርቶች የሉም።" : "No products are available right now. Please check back soon."}
                  </p>
                ) : (
                  <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
                    {/* Group by category */}
                    {Array.from(new Set(products.map((p) => p.category))).map((cat) => (
                      <div key={cat}>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 mt-4 first:mt-0">{cat}</p>
                        {products
                          .filter((p) => p.category === cat)
                          .map((p) => (
                            <div
                              key={p.id}
                              className={`flex items-center space-x-3 border rounded-xl p-4 mb-2 hover:bg-accent/50 transition-all cursor-pointer ${
                                selectedProduct === p.id ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm" : "border-border"
                              }`}
                              onClick={() => setSelectedProduct(p.id)}
                            >
                              <RadioGroupItem value={p.id} id={p.id} />
                              <Label htmlFor={p.id} className="cursor-pointer font-medium flex-1 text-sm md:text-base">
                                {lang === "am" && p.name_am ? p.name_am : p.name}
                              </Label>
                            </div>
                          ))}
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            )}

            {/* Step 1: Form fields */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <h2 className="font-heading text-xl font-semibold">{t("quote.yourDetails")}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lang === "am" ? "ለተመረጠው ምርት: " : "For product: "}
                      <span className="font-semibold text-primary">
                        {lang === "am" && currentProduct?.name_am ? currentProduct.name_am : currentProduct?.name}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="text-xs text-primary hover:underline flex items-center gap-1 font-medium bg-primary/5 px-2.5 py-1.5 rounded-lg border border-primary/20 transition-colors hover:bg-primary/10"
                  >
                    <Pencil className="w-3 h-3" /> {lang === "am" ? "ምርት ቀይር" : "Change product"}
                  </button>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <UserCheck className="w-3.5 h-3.5 text-primary" />
                    <span>{lang === "am" ? "የእርስዎ መረጃ" : "Contact Information"}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <Label className="text-xs font-semibold">{lang === "am" ? "ሙሉ ስም" : "Full Name"}</Label>
                      <Input
                        value={formData.name || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          setFieldErrors((f) => ({ ...f, name: false }));
                        }}
                        placeholder="Abebe Kebede"
                        className={`mt-1 ${fieldErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">{lang === "am" ? "ኢሜይል አድራሻ" : "Email Address"}</Label>
                      <Input
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setFieldErrors((f) => ({ ...f, email: false }));
                        }}
                        placeholder="abebe@example.com"
                        className={`mt-1 ${fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">{lang === "am" ? "ስልክ ቁጥር" : "Phone Number"}</Label>
                      <Input
                        value={formData.phone || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          setFieldErrors((f) => ({ ...f, phone: false }));
                        }}
                        placeholder="+251 91 234 5678"
                        className={`mt-1 ${fieldErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Policy / Insurance Details */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    <span>{lang === "am" ? "የፖሊሲ ዝርዝሮች" : "Coverage & Policy Details"}</span>
                  </div>

                  {fields.map((field) => {
                    const label = fieldLabels[field]?.[lang] || field;
                    const options = fieldOptions[field];
                    const hasError = !!fieldErrors[field];

                    if (options) {
                      return (
                        <div key={field} className="space-y-1.5">
                          <Label className="text-xs font-semibold">{label}</Label>
                          <RadioGroup
                            value={formData[field] || ""}
                            onValueChange={(val) => {
                              setFormData({ ...formData, [field]: val });
                              setFieldErrors((f) => ({ ...f, [field]: false }));
                            }}
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                              {options.map((opt) => (
                                <div
                                  key={opt.value}
                                  className={`flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 cursor-pointer transition-all ${
                                    formData[field] === opt.value
                                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                      : hasError
                                      ? "border-destructive"
                                      : "border-border"
                                  }`}
                                  onClick={() => {
                                    setFormData({ ...formData, [field]: opt.value });
                                    setFieldErrors((f) => ({ ...f, [field]: false }));
                                  }}
                                >
                                  <RadioGroupItem value={opt.value} id={`${field}-${opt.value}`} />
                                  <Label htmlFor={`${field}-${opt.value}`} className="cursor-pointer text-xs sm:text-sm">
                                    {opt.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      );
                    }

                    return (
                      <div key={field} className="space-y-1">
                        <Label className="text-xs font-semibold">{label}</Label>
                        <Input
                          type={field.includes("amount") || field.includes("value") || field.includes("age") || field.includes("term") || field.includes("size") ? "number" : "text"}
                          value={formData[field] || ""}
                          onChange={(e) => {
                            setFormData({ ...formData, [field]: e.target.value });
                            setFieldErrors((f) => ({ ...f, [field]: false }));
                          }}
                          placeholder={
                            field === "vehicle_value"
                              ? "e.g. 1,500,000"
                              : field === "property_value"
                              ? "e.g. 5,000,000"
                              : field === "coverage_amount"
                              ? "e.g. 1,000,000"
                              : field === "age"
                              ? "e.g. 35"
                              : field === "term_years"
                              ? "e.g. 10"
                              : field === "family_size"
                              ? "e.g. 4"
                              : label
                          }
                          className={`mt-1 ${hasError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Live price preview, updates as the form is filled in */}
                {livePrice !== null && (
                  <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3.5 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div>
                      <span className="text-xs font-semibold text-primary block">{lang === "am" ? "የቀጥታ ግምት" : "Live Estimate"}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {requiredFieldsComplete
                          ? lang === "am"
                            ? "በተመረጡት ዝርዝሮች መሠረት"
                            : "Calculated based on your details"
                          : lang === "am"
                          ? "የመነሻ ግምት"
                          : "Estimated starting rate"}
                      </span>
                    </div>
                    <span className="font-heading font-bold text-lg md:text-xl text-primary">
                      {livePrice.toLocaleString()} {t("common.etb")} <span className="text-xs font-normal text-muted-foreground">{lang === "am" ? "/ ዓመት" : "/ yr"}</span>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl font-semibold">{t("quote.review")}</h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-primary hover:underline flex items-center gap-1 font-medium bg-primary/5 px-2.5 py-1.5 rounded-lg border border-primary/20 transition-colors hover:bg-primary/10"
                  >
                    <Pencil className="w-3 h-3" /> {lang === "am" ? "አርትዕ" : "Edit details"}
                  </button>
                </div>

                <div
                  className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 text-center animate-in zoom-in-95 fade-in duration-500 fill-mode-backwards"
                >
                  <div className="flex items-center justify-center gap-2 text-primary mb-2">
                    <Sparkles className="w-4 h-4" />
                    <p className="text-xs font-bold tracking-widest uppercase">{t("quote.estimatedPremium")}</p>
                  </div>
                  <p
                    className="font-heading text-4xl md:text-5xl font-bold text-primary animate-in slide-in-from-bottom-4 fade-in duration-500 delay-150 fill-mode-backwards"
                  >
                    {estimatedPrice?.toLocaleString()} <span className="text-xl">{t("common.etb")}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{lang === "am" ? "በዓመት" : "per year"}</p>
                </div>

                <div className="space-y-3 bg-muted/20 border border-border/60 rounded-xl p-4">
                  <p className="text-sm font-semibold text-foreground border-b border-border/50 pb-2">
                    {lang === "am" ? "ምርት: " : "Product: "}
                    <span className="text-primary font-bold">
                      {lang === "am" && currentProduct?.name_am ? currentProduct.name_am : currentProduct?.name}
                    </span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {Object.entries(formData).map(([key, val]) => {
                      if (!val) return null;
                      const displayLabel = fieldLabels[key]?.[lang] || key;
                      const optionMatch = fieldOptions[key]?.find((o) => o.value === val);
                      const displayVal = optionMatch ? optionMatch.label : val;
                      return (
                        <div key={key} className="text-xs">
                          <span className="text-muted-foreground font-medium">{displayLabel}:</span>{" "}
                          <span className="font-semibold text-foreground">{displayVal}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    {lang === "am"
                      ? "ይህ ግምት ብቻ ነው እና አስገዳጅ አይደለም። ቡድናችን ለማረጋገጥ ያነጋግርዎታል።"
                      : "This is a non-binding estimate. No payment is taken now — our team will confirm final pricing with you."}
                  </span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-4 border-t border-border">
              {step > 0 ? (
                <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                  <ArrowLeft className="w-4 h-4 mr-1" /> {t("quote.back")}
                </Button>
              ) : <div />}

              {step < 2 ? (
                <Button
                  className="teal-gradient text-primary-foreground font-semibold px-6"
                  onClick={handleNext}
                  disabled={step === 0 && (productsLoading || !selectedProduct)}
                >
                  {t("quote.next")} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button className="teal-gradient text-primary-foreground font-semibold px-8" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? t("common.loading") : t("quote.submit")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default QuotePage;