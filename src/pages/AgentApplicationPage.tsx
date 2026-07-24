import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AgentApplicationPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [application, setApplication] = useState<any>(null);
  const [form, setForm] = useState({ full_name: "", phone: "", city: "", region: "", business_name: "", experience_level: "new", motivation: "" });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/agents/apply", { replace: true });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("wifa_applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("profiles").select("full_name, phone").eq("user_id", user.id).maybeSingle(),
    ]).then(([applicationResult, profileResult]) => {
      setApplication(applicationResult.data);
      setForm((current) => ({ ...current, full_name: profileResult.data?.full_name || user.user_metadata?.full_name || "", phone: profileResult.data?.phone || "" }));
      setLoading(false);
    });
  }, [user]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase.from("wifa_applications").insert({
      user_id: user.id,
      ...form,
      sales_channels: ["digital_selling_platform"],
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Application could not be submitted", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application submitted", description: "Our channels team will review your registration." });
    const { data } = await supabase.from("wifa_applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
    setApplication(data);
  };

  if (authLoading || loading || !user) return null;

  if (application) {
    const approved = application.status === "approved";
    return (
      <div className="min-h-screen bg-[hsl(201,78%,98%)]"><Navbar />
        <main className="container mx-auto min-h-[72vh] max-w-2xl px-4 pb-16 pt-32">
          <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
            <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${approved ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-700"}`}><ClipboardCheck /></div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{approved ? "Your WIIA agent account is approved" : "Your WIIA application is being reviewed"}</h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {approved ? "Your digital selling workspace is ready." : "We have received your application. The WASS channels team will contact you after the review is complete."}
            </p>
            <span className="mt-5 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold capitalize text-muted-foreground">Status: {application.status.replace("_", " ")}</span>
            {approved && <Button className="mt-6" onClick={() => navigate("/portal/wia")}>Open agent portal</Button>}
          </div>
        </main><Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(201,78%,98%)]"><Navbar />
      <main className="container mx-auto max-w-2xl px-4 pb-16 pt-32">
        <div className="mb-7 text-center"><span className="section-badge">WIIA REGISTRATION</span><h1 className="mt-4 font-heading text-3xl font-bold text-foreground">Become a WIIA Agent</h1><p className="mt-2 text-muted-foreground">Complete your registration to begin the WASS agent approval process.</p></div>
        <form onSubmit={submit} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div><Label htmlFor="full_name">Full name</Label><Input id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required /></div>
            <div><Label>Email</Label><Input value={user.email || ""} disabled /></div>
            <div><Label htmlFor="phone">Phone number</Label><Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+251..." required /></div>
            <div><Label htmlFor="city">City</Label><Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required /></div>
            <div><Label htmlFor="region">Region (optional)</Label><Input id="region" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} /></div>
            <div><Label htmlFor="business">Business name (optional)</Label><Input id="business" value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} /></div>
          </div>
          <div><Label htmlFor="experience">Insurance sales experience</Label><select id="experience" value={form.experience_level} onChange={(e) => setForm({ ...form, experience_level: e.target.value })} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="new">New to insurance sales</option><option value="under_2_years">Under 2 years</option><option value="2_plus_years">2+ years</option></select></div>
          <div><Label htmlFor="motivation">Why do you want to become a WIIA Agent?</Label><Textarea id="motivation" value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} className="mt-1 min-h-28" required /></div>
          <Button type="submit" className="w-full" disabled={submitting}>{submitting && <Loader2 className="animate-spin" />}{submitting ? "Submitting application..." : "Submit registration"}</Button>
        </form>
      </main><Footer />
    </div>
  );
};

export default AgentApplicationPage;
