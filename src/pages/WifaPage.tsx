import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BriefcaseBusiness,
  CheckCircle,
  GraduationCap,
  LineChart,
  Loader2,
  Megaphone,
  Send,
  Smartphone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  region: string;
  business_name: string;
  experience_level: string;
  sales_channels: string[];
  motivation: string;
};

const initialForm: FormData = {
  full_name: "",
  email: "",
  phone: "",
  city: "",
  region: "",
  business_name: "",
  experience_level: "",
  sales_channels: [],
  motivation: "",
};

const benefits = [
  {
    title: "Competitive Commission",
    description: "Earn from qualified policy sales with transparent agent tracking.",
    icon: Award,
  },
  {
    title: "Training & Certification",
    description: "Get onboarding, product coaching, and certification support from WASS.",
    icon: GraduationCap,
  },
  {
    title: "Digital Selling Platform",
    description: "Use online tools to register prospects and manage follow-ups faster.",
    icon: Smartphone,
  },
  {
    title: "Business Growth Opportunity",
    description: "Build a local insurance distribution business backed by a trusted brand.",
    icon: LineChart,
  },
];

const salesChannelOptions = [
  "In-person sales",
  "Phone outreach",
  "WhatsApp / Telegram",
  "Social media",
  "Existing business network",
];

const requiredFields: (keyof FormData)[] = [
  "full_name",
  "email",
  "phone",
  "city",
  "experience_level",
  "motivation",
];

const WifaPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [latestApplication, setLatestApplication] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?redirect=/wifa", { replace: true });
    }
  }, [authLoading, navigate, user]);

  useEffect(() => {
    if (!user) return;

    setLoadingProfile(true);
    Promise.all([
      supabase.from("profiles").select("full_name, phone").eq("user_id", user.id).single(),
      supabase
        .from("wifa_applications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]).then(([profileRes, applicationRes]) => {
      const profile = profileRes.data;
      setFormData((current) => ({
        ...current,
        full_name:
          profile?.full_name ||
          (user as any).user_metadata?.full_name ||
          (user as any).user_metadata?.name ||
          user.email?.split("@")[0] ||
          "",
        email: user.email || "",
        phone: profile?.phone || "",
      }));
      setLatestApplication(applicationRes.data || null);
      setLoadingProfile(false);
    });
  }, [user]);

  const statusLabel = useMemo(() => {
    if (!latestApplication?.status) return null;
    return String(latestApplication.status).replace("_", " ");
  }, [latestApplication]);

  const setField = (field: keyof FormData, value: string | string[]) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: false }));
  };

  const toggleSalesChannel = (channel: string, checked: boolean) => {
    setFormData((current) => ({
      ...current,
      sales_channels: checked
        ? [...current.sales_channels, channel]
        : current.sales_channels.filter((item) => item !== channel),
    }));
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof FormData, boolean>> = {};
    requiredFields.forEach((field) => {
      if (!String(formData[field]).trim()) errors[field] = true;
    });
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = true;
    if (formData.sales_channels.length === 0) errors.sales_channels = true;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !validateForm()) {
      toast({
        title: "A few details are missing",
        description: "Please complete the highlighted fields before applying.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const application = {
        user_id: user.id,
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        region: formData.region.trim() || null,
        business_name: formData.business_name.trim() || null,
        experience_level: formData.experience_level,
        sales_channels: formData.sales_channels,
        motivation: formData.motivation.trim(),
      };

      const { data, error } = await supabase
        .from("wifa_applications")
        .insert(application)
        .select()
        .single();
      if (error) throw error;

      setLatestApplication(data);
      setSubmitted(true);

      supabase
        .from("leads")
        .insert({
          name: application.full_name,
          email: application.email,
          phone: application.phone,
          product_interest: "WIFA Agent Program",
          source: "wifa_application",
          notes: `City: ${application.city}. Experience: ${application.experience_level}. Channels: ${application.sales_channels.join(", ")}.`,
        })
        .catch(() => {});

      supabase.functions
        .invoke("notify", {
          body: {
            type: "wifa_application_submitted",
            email: application.email,
            data: {
              name: application.full_name,
              city: application.city,
              experience: application.experience_level,
            },
          },
        })
        .catch(() => {});

      toast({
        title: "WIFA application submitted",
        description: "Our agent network team will review your registration and contact you shortly.",
      });
    } catch (error: any) {
      toast({ title: "Application failed", description: error.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16">
        <section className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-start">
            <div className="space-y-8">
              <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-5">
                  <BriefcaseBusiness className="w-3.5 h-3.5" />
                  WASS Insurance Franchise Agents
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                  Become a WIFA Agent
                </h1>
                <p className="text-lg text-muted-foreground">
                  Join Ethiopia's fastest-growing insurance distribution network.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="rounded-xl border border-border bg-card p-5 animate-in fade-in slide-in-from-bottom-3 duration-500"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <h2 className="font-heading font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              {latestApplication && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-heading font-semibold text-foreground">
                      Latest WIFA application: {statusLabel}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Submitted on {new Date(latestApplication.created_at).toLocaleDateString()}.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-right-5 duration-500">
              {submitted ? (
                <div className="min-h-[520px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold mb-2">
                    Application received
                  </h2>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Thank you for applying to become a WIFA agent. The WASS team will review your registration and contact you for the next steps.
                  </p>
                  <Button className="teal-gradient text-primary-foreground" onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-foreground">
                        Online Agent Registration Form
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Apply now and tell us how you plan to grow with WASS.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={formData.full_name}
                          onChange={(e) => setField("full_name", e.target.value)}
                          disabled={loadingProfile}
                          className={fieldErrors.full_name ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setField("email", e.target.value)}
                          disabled={loadingProfile}
                          className={fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          placeholder="+251..."
                          className={fieldErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                      </div>
                      <div>
                        <Label>City</Label>
                        <Input
                          value={formData.city}
                          onChange={(e) => setField("city", e.target.value)}
                          placeholder="Addis Ababa"
                          className={fieldErrors.city ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Region</Label>
                        <Input
                          value={formData.region}
                          onChange={(e) => setField("region", e.target.value)}
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <Label>Business / Organization</Label>
                        <Input
                          value={formData.business_name}
                          onChange={(e) => setField("business_name", e.target.value)}
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Insurance or sales experience</Label>
                      <Select
                        value={formData.experience_level}
                        onValueChange={(value) => setField("experience_level", value)}
                      >
                        <SelectTrigger className={fieldErrors.experience_level ? "border-destructive focus:ring-destructive" : ""}>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new_to_sales">New to sales</SelectItem>
                          <SelectItem value="sales_experience">Sales experience</SelectItem>
                          <SelectItem value="insurance_experience">Insurance experience</SelectItem>
                          <SelectItem value="licensed_or_agency">Licensed agent or agency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Preferred selling channels</Label>
                      <div className={`grid sm:grid-cols-2 gap-3 mt-2 rounded-xl border p-4 ${fieldErrors.sales_channels ? "border-destructive" : "border-border"}`}>
                        {salesChannelOptions.map((channel) => (
                          <label key={channel} className="flex items-center gap-2 text-sm text-foreground">
                            <Checkbox
                              checked={formData.sales_channels.includes(channel)}
                              onCheckedChange={(checked) => toggleSalesChannel(channel, checked === true)}
                            />
                            {channel}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Why do you want to become a WIFA agent?</Label>
                      <Textarea
                        value={formData.motivation}
                        onChange={(e) => setField("motivation", e.target.value)}
                        placeholder="Share your market, network, or business growth plan."
                        className={`min-h-[120px] ${fieldErrors.motivation ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full teal-gradient text-primary-foreground"
                      disabled={submitting || loadingProfile}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Apply Now
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WifaPage;
