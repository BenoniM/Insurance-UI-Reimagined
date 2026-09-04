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
import { CheckCircle, ArrowRight, ArrowLeft, Pencil, ShieldCheck, User, Mail, Phone, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getActiveProducts } from "@/data/products";

interface Product {
  id: string;
  name: string;
  slug: string;
  name_am: string | null;
  category: string;
}

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
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
        name: prev.name || user.user_metadata?.full_name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.user_metadata?.phone || "",
      }));
    }
  }, [user]);

  const currentProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProduct || p.slug === selectedProduct) || products[0];
  }, [products, selectedProduct]);

  const validateStep1 = () => {
    const errors: Record<string, boolean> = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = true;
    if (!formData.phone.trim()) errors.phone = true;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !selectedProduct) {
      toast({ title: lang === "am" ? "እባክዎ ምርት ይምረጡ" : "Please select a product", variant: "destructive" });
      return;
    }
    if (step === 1) {
      if (!validateStep1()) {
        toast({
          title: lang === "am" ? "የጎደሉ መረጃዎች አሉ" : "Contact details required",
          description: lang === "am" ? "እባክዎ ስም፣ ኢሜይል እና ስልክ ቁጥር ያስገቡ።" : "Please fill in your name, email, and phone number.",
          variant: "destructive",
        });
        return;
      }
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
        quoted_amount: null,
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
              data: { product: currentProduct?.name },
            },
          })
          .catch(() => {});
      }

      toast({
        title: lang === "am" ? "ጥያቄዎ ተልኳል!" : "Quote request submitted!",
        description: lang === "am" ? "ቡድናችን በቅርቡ ያነጋግርዎታል።" : "We'll contact you shortly with your personalized quote.",
      });
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
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center animate-in fade-in zoom-in-95 duration-500 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                {lang === "am" ? "ጥያቄዎ ተልኳል!" : "Your quote request is received!"}
              </h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                {lang === "am"
                  ? "የእርስዎ የዋጋ መጠየቂያ ተልኳል። ባለሙያዎቻችን በቅርቡ በስልክ ወይም በኢሜይል ያነጋግሩዎታል።"
                  : "Thank you! Our insurance advisors will prepare your custom proposal and reach out to you directly."}
              </p>

              <div className="bg-muted/40 border border-border/80 rounded-xl p-5 mb-8 text-left max-w-md mx-auto space-y-2">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{lang === "am" ? "ምርት: " : "Selected Insurance: "}</span>
                  <span className="text-primary font-bold">
                    {lang === "am" && currentProduct?.name_am ? currentProduct.name_am : currentProduct?.name}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{lang === "am" ? "ስም: " : "Name: "}</span>
                  {formData.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{lang === "am" ? "ስልክ: " : "Phone: "}</span>
                  {formData.phone}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{lang === "am" ? "ኢሜይል: " : "Email: "}</span>
                  {formData.email}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="teal-gradient text-primary-foreground font-semibold px-6" onClick={() => navigate(user ? "/dashboard" : "/")}>
                  {user ? (lang === "am" ? "ወደ ዳሽቦርድ ይሂዱ" : "Go to Dashboard") : (lang === "am" ? "ወደ መነሻ ገጽ ይመለሱ" : "Back to Home")}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setStep(0);
                    setSelectedProduct(products[0]?.id || "");
                    setFormData({ name: "", email: "", phone: "" });
                  }}
                >
                  {lang === "am" ? "ሌላ ጥያቄ ያስገቡ" : "Request another quote"}
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

            {/* Step 1: Form fields (Name, Email, Phone only) */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <h2 className="font-heading text-xl font-semibold">{t("quote.yourDetails")}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lang === "am" ? "የተመረጠ ምርት: " : "Selected Insurance: "}
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

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold flex items-center gap-1.5 mb-1">
                      <User className="w-4 h-4 text-primary" />
                      {lang === "am" ? "ሙሉ ስም" : "Full Name"} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setFieldErrors((f) => ({ ...f, name: false }));
                      }}
                      placeholder={lang === "am" ? "ስምዎን ያስገቡ" : "Enter your full name"}
                      className={`h-11 ${fieldErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {fieldErrors.name && (
                      <p className="text-xs text-destructive mt-1">
                        {lang === "am" ? "እባክዎ ሙሉ ስምዎን ያስገቡ" : "Please enter your full name"}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-semibold flex items-center gap-1.5 mb-1">
                      <Mail className="w-4 h-4 text-primary" />
                      {lang === "am" ? "የኢሜይል አድራሻ" : "Email Address"} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setFieldErrors((f) => ({ ...f, email: false }));
                      }}
                      placeholder="you@example.com"
                      className={`h-11 ${fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {lang === "am" ? "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ" : "Please enter a valid email address"}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-semibold flex items-center gap-1.5 mb-1">
                      <Phone className="w-4 h-4 text-primary" />
                      {lang === "am" ? "ስልክ ቁጥር" : "Phone Number"} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setFieldErrors((f) => ({ ...f, phone: false }));
                      }}
                      placeholder="+251 91 234 5678"
                      className={`h-11 ${fieldErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {fieldErrors.phone && (
                      <p className="text-xs text-destructive mt-1">
                        {lang === "am" ? "እባክዎ ስልክ ቁጥርዎን ያስገቡ" : "Please enter your phone number"}
                      </p>
                    )}
                  </div>
                </div>
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

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm pb-2 border-b border-primary/15">
                    <Shield className="w-4 h-4" />
                    <span>{lang === "am" ? "የጥያቄ ማጠቃለያ" : "Quote Request Summary"}</span>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">{lang === "am" ? "ምርት" : "Insurance Product"}</span>
                      <span className="font-semibold text-foreground text-right">
                        {lang === "am" && currentProduct?.name_am ? currentProduct.name_am : currentProduct?.name}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">{lang === "am" ? "ስም" : "Full Name"}</span>
                      <span className="font-semibold text-foreground">{formData.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-muted-foreground">{lang === "am" ? "ኢሜይል" : "Email Address"}</span>
                      <span className="font-semibold text-foreground">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">{lang === "am" ? "ስልክ" : "Phone Number"}</span>
                      <span className="font-semibold text-foreground">{formData.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3.5">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    {lang === "am"
                      ? "የእርስዎን ጥያቄ እንደተቀበልን የዋስ ኢንሹራንስ አማካሪዎች ዝርዝር ዋጋ አዘጋጅተው ያነጋግሩዎታል።"
                      : "Our dedicated insurance advisors will review your request and contact you directly with tailored terms and pricing."}
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