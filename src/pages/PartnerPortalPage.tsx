import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeDollarSign, BriefcaseBusiness, CreditCard, FileDown, FileText, Loader2, RefreshCw, ShieldCheck, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type PortalKind = "wia" | "broker";

const portalActions = [
  { title: "Request quote", detail: "Create a quote for a client", icon: FileText, path: "/quote" },
  { title: "Buy insurance", detail: "Start a new client policy", icon: ShieldCheck, path: "/quote" },
  { title: "Renew policies", detail: "Prepare a renewal request", icon: RefreshCw, path: "/quote?purpose=renewal" },
  { title: "Pay premium", detail: "Record a client premium payment", icon: CreditCard, path: "/payments/new" },
  { title: "Track claims", detail: "Review active client claims", icon: TrendingUp, path: "/dashboard" },
  { title: "Policy documents", detail: "Find issued policy documents", icon: FileDown, path: "/dashboard" },
];

const PartnerPortalPage = ({ kind }: { kind: PortalKind }) => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [checkingAccess, setCheckingAccess] = useState(kind === "wia");
  const [agentApproved, setAgentApproved] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate(`/auth?redirect=${encodeURIComponent(`/portal/${kind}`)}`, { replace: true });
  }, [authLoading, user, kind, navigate]);

  useEffect(() => {
    if (!user || kind !== "wia") return;
    supabase.from("wifa_applications").select("status").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle().then(({ data }) => {
      setAgentApproved(data?.status === "approved");
      setCheckingAccess(false);
    });
  }, [user, kind]);

  if (authLoading || !user || checkingAccess) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  if (kind === "wia" && !agentApproved) {
    return (
      <div className="min-h-screen"><Navbar /><main className="container mx-auto flex min-h-[72vh] max-w-2xl items-center px-4 pt-20"><div className="w-full rounded-2xl border bg-card p-8 text-center"><BriefcaseBusiness className="mx-auto mb-4 h-12 w-12 text-primary" /><h1 className="font-heading text-2xl font-bold">Complete WIA onboarding</h1><p className="mt-3 text-sm text-muted-foreground">Your agent portal becomes available after your WIA application has been approved.</p><Button className="mt-6" onClick={() => navigate("/agents/apply")}>View application status</Button></div></main><Footer /></div>
    );
  }

  const label = kind === "wia" ? "WIA Agent" : "Broker";
  return (
    <div className="min-h-screen bg-[hsl(201,78%,98%)]"><Navbar />
      <main className="container mx-auto px-4 pb-16 pt-32 lg:px-8">
        <div className="flex flex-col justify-between gap-5 rounded-2xl bg-[hsl(201,78%,20%)] p-7 text-white md:flex-row md:items-center"><div><p className="text-sm font-semibold text-white/70">{label.toUpperCase()} PORTAL</p><h1 className="mt-1 font-heading text-3xl font-bold">Welcome back, {user.user_metadata?.full_name || user.email?.split("@")[0]}</h1><p className="mt-2 text-sm text-white/75">Manage client insurance activity from one secure workspace.</p></div><BadgeDollarSign className="h-12 w-12 text-[#72d2b3]" /></div>
        <section className="mt-8"><div className="mb-5 flex items-end justify-between"><div><h2 className="font-heading text-2xl font-bold text-foreground">Client services</h2><p className="text-sm text-muted-foreground">Choose a task to continue.</p></div></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{portalActions.map((action) => <button key={action.title} onClick={() => navigate(action.path)} className="group rounded-xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"><action.icon className="mb-5 h-6 w-6 text-primary" /><h3 className="font-heading font-bold text-foreground">{action.title}</h3><p className="mt-1 text-sm text-muted-foreground">{action.detail}</p></button>)}</div></section>
        <section className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-xl border bg-white p-6"><h2 className="flex items-center gap-2 font-heading text-lg font-bold"><BadgeDollarSign className="h-5 w-5 text-primary" />Commission statement</h2><p className="mt-2 text-sm text-muted-foreground">Your earned commission statements will appear here once issued.</p><Button variant="outline" className="mt-5" disabled>Download latest statement</Button></div><div className="rounded-xl border bg-white p-6"><h2 className="flex items-center gap-2 font-heading text-lg font-bold"><FileDown className="h-5 w-5 text-primary" />Policy documents</h2><p className="mt-2 text-sm text-muted-foreground">Use the policy documents service to retrieve documents for your clients.</p><Button variant="outline" className="mt-5" onClick={() => navigate("/dashboard")}>Open documents</Button></div></section>
      </main><Footer />
    </div>
  );
};

export default PartnerPortalPage;
