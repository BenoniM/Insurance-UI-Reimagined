import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FileText, Shield, CreditCard, User, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import CTAButton from "@/components/CTAButton";

type Tab = "policies" | "claims" | "payments" | "profile";

const statusColors: Record<string, string> = {
  active: "bg-primary/10 text-primary",
  pending: "bg-yellow-100 text-yellow-700",
  expired: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
  submitted: "bg-secondary/10 text-secondary",
  under_review: "bg-yellow-100 text-yellow-700",
  approved: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
  paid: "bg-primary/10 text-primary",
  confirmed: "bg-primary/10 text-primary",
  failed: "bg-destructive/10 text-destructive",
};

const DashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("policies");
  const [policies, setPolicies] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [profileForm, setProfileForm] = useState({ full_name: "", phone: "" });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?redirect=/dashboard");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    setLoadingData(true);
    
    Promise.all([
      supabase.from("policies").select("*, products(name, name_am)").eq("user_id", user.id),
      supabase.from("claims").select("*, policies(policy_number)").eq("user_id", user.id),
      supabase.from("payments").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").eq("user_id", user.id).single(),
    ]).then(([policiesRes, claimsRes, paymentsRes, profileRes]) => {
      setPolicies(policiesRes.data || []);
      setClaims(claimsRes.data || []);
      setPayments(paymentsRes.data || []);
      if (profileRes.data) {
        setProfile(profileRes.data);
        setProfileForm({ full_name: profileRes.data.full_name || "", phone: profileRes.data.phone || "" });
      }
      setLoadingData(false);
    });
  }, [user]);

  const [savingProfile, setSavingProfile] = useState(false);

  const updateProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase.from("profiles").update(profileForm).eq("user_id", user.id);
    setSavingProfile(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
    }
  };

  if (authLoading || !user) return null;

  const tabs: { key: Tab; label: string; icon: typeof Shield; count?: number }[] = [
    { key: "policies", label: t("dashboard.policies"), icon: Shield, count: policies.length },
    { key: "claims", label: t("dashboard.claims"), icon: FileText, count: claims.filter((c) => c.status !== "approved" && c.status !== "rejected").length },
    { key: "payments", label: t("dashboard.payments"), icon: CreditCard },
    { key: "profile", label: t("dashboard.profile"), icon: User },
  ];

  const openClaims = claims.filter((c) => c.status === "submitted" || c.status === "under_review").length;
  const totalDue = policies.reduce((sum, p) => {
    const paid = payments.filter((x) => x.policy_id === p.id && x.status === "confirmed").reduce((s, x) => s + Number(x.amount || 0), 0);
    return sum + Math.max(Number(p.premium_amount || 0) - paid, 0);
  }, 0);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1
            className="font-heading text-3xl font-bold text-foreground mb-8 animate-in fade-in slide-in-from-bottom-5 duration-500"
          >
            {t("dashboard.title")}
          </h1>

          {/* At-a-glance summary */}
          {!loadingData && (
            <div className="grid sm:grid-cols-3 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="bg-card border border-border rounded-xl p-5">
                <Shield className="w-5 h-5 text-primary mb-2" />
                <p className="text-2xl font-heading font-bold">{policies.length}</p>
                <p className="text-xs text-muted-foreground">{t("dashboard.policies")}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <FileText className="w-5 h-5 text-primary mb-2" />
                <p className="text-2xl font-heading font-bold">{openClaims}</p>
                <p className="text-xs text-muted-foreground">{lang === "am" ? "ክፍት የይገባኛል ጥያቄዎች" : "Open claims"}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <CreditCard className="w-5 h-5 text-yellow-600 mb-2" />
                <p className="text-2xl font-heading font-bold">{totalDue.toLocaleString()} {t("common.etb")}</p>
                <p className="text-xs text-muted-foreground">{lang === "am" ? "ያለ ክፍያ መጠን" : "Premium balance due"}</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto border-b border-border pb-1">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.key}
                onClick={() => setTab(tabItem.key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  tab === tabItem.key ? "bg-primary/10 text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tabItem.icon className="w-4 h-4" />
                {tabItem.label}
                {!!tabItem.count && (
                  <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${tab === tabItem.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {tabItem.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loadingData ? (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          ) : (
            <div key={tab} className="animate-in fade-in duration-500">
              {/* Policies Tab */}
              {tab === "policies" && (
                <div>
                  {policies.length === 0 ? (
                    <div className="text-center py-16 bg-card border border-border rounded-xl">
                      <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">{t("dashboard.noPolicies")}</p>
                      <CTAButton href="/quote" variant="primary">{t("hero.getQuote")}</CTAButton>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {policies.map((p) => (
                        <div key={p.id} className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-heading font-semibold text-foreground">
                              {lang === "am" && p.products?.name_am ? p.products.name_am : p.products?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">Policy #{p.policy_number}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {p.start_date} — {p.end_date}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-heading font-bold text-foreground">
                              {p.premium_amount?.toLocaleString()} {t("common.etb")}
                            </span>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[p.status] || "bg-muted text-muted-foreground"}`}>
                              {p.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Claims Tab */}
              {tab === "claims" && (
                <div>
                  <div className="flex justify-end mb-4">
                    <CTAButton href="/claims/new" variant="primary">File New Claim</CTAButton>
                  </div>
                  {claims.length === 0 ? (
                    <div className="text-center py-16 bg-card border border-border rounded-xl">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">{t("dashboard.noClaims")}</p>
                      <CTAButton href="/claims/new" variant="primary">{t("claims.startClaim")}</CTAButton>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {claims.map((c) => (
                        <Link key={c.id} to={`/claims/${c.id}`} className="block bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all group">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                              <p className="font-heading font-semibold text-foreground line-clamp-1">{c.description}</p>
                              <p className="text-xs text-muted-foreground">
                                Policy #{c.policies?.policy_number} • Incident: {c.incident_date}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full self-start ${statusColors[c.status] || "bg-muted"}`}>
                                {c.status.replace("_", " ")}
                              </span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          </div>
                          {c.resolution_notes && (
                            <p className="text-sm text-muted-foreground mt-3 border-t border-border pt-3">{c.resolution_notes}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Payments Tab */}
              {tab === "payments" && (
                <div>
                  <div className="flex justify-end mb-4">
                    <CTAButton href="/payments/new" variant="primary">Record a Payment</CTAButton>
                  </div>
                  {payments.length === 0 ? (
                    <div className="text-center py-16 bg-card border border-border rounded-xl">
                      <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">{lang === "am" ? "ገና ክፍያዎች የሉም" : "No payments yet"}</p>
                      <CTAButton href="/payments/new" variant="primary">Make your first payment</CTAButton>
                    </div>
                  ) : (
                    <div className="overflow-x-auto bg-card border border-border rounded-xl p-4">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 text-sm font-medium text-muted-foreground">{t("common.date")}</th>
                            <th className="text-left py-3 text-sm font-medium text-muted-foreground">{t("common.amount")}</th>
                            <th className="text-left py-3 text-sm font-medium text-muted-foreground">{lang === "am" ? "ዘዴ" : "Method"}</th>
                            <th className="text-left py-3 text-sm font-medium text-muted-foreground">{lang === "am" ? "ማመሳከሪያ" : "Reference"}</th>
                            <th className="text-left py-3 text-sm font-medium text-muted-foreground">{t("common.status")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.map((p) => (
                            <tr key={p.id} className="border-b border-border/50">
                              <td className="py-3 text-sm">{new Date(p.created_at).toLocaleDateString()}</td>
                              <td className="py-3 text-sm font-medium">{p.amount?.toLocaleString()} {p.currency}</td>
                              <td className="py-3 text-sm capitalize">{p.method?.replace("_", " ") || "—"}</td>
                              <td className="py-3 text-xs text-muted-foreground font-mono">{p.reference_number || "—"}</td>
                              <td className="py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[p.status] || "bg-muted"}`}>{p.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {tab === "profile" && (
                <div className="max-w-md">
                  <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("auth.email")}</label>
                      <Input value={user.email || ""} disabled className="bg-muted" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("auth.fullName")}</label>
                      <Input value={profileForm.full_name} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.phone")}</label>
                      <Input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} placeholder="+251..." />
                    </div>
                    <Button className="teal-gradient text-primary-foreground" onClick={updateProfile} disabled={savingProfile}>
                      {savingProfile ? t("common.loading") : t("common.save")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DashboardPage;