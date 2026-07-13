import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, FileText, CreditCard, Users, BarChart3, Tag, MessageSquare, UserCheck, ClipboardCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type AdminTab = "overview" | "policies" | "claims" | "payments" | "leads" | "agent-applications";

const AdminPage = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<AdminTab>("overview");
  const [stats, setStats] = useState({ policies: 0, claims: 0, payments: 0, leads: 0, revenue: 0 });
  const [policies, setPolicies] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [agentApplications, setAgentApplications] = useState<any[]>([]);
  const [claimNotes, setClaimNotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/");
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    loadData();
  }, [isAdmin, tab]);

  const loadData = async () => {
    setLoading(true);
    const [policiesRes, claimsRes, paymentsRes, leadsRes, agentsRes, applicationsRes] = await Promise.all([
      supabase.from("policies").select("*, products(name), profiles!policies_user_id_fkey(full_name)").order("created_at", { ascending: false }),
      supabase.from("claims").select("*, policies(policy_number), profiles!claims_user_id_fkey(full_name, user_id)").order("created_at", { ascending: false }),
      supabase.from("payments").select("*").order("created_at", { ascending: false }),
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, profiles!inner(full_name)").in("role", ["agent", "admin"]),
      supabase.from("wifa_applications").select("*").order("created_at", { ascending: false }),
    ]);

    const p = policiesRes.data || [];
    const c = claimsRes.data || [];
    const pay = paymentsRes.data || [];
    const l = leadsRes.data || [];

    setPolicies(p);
    setClaims(c);
    setPayments(pay);
    setLeads(l);
    setAgents(agentsRes.data || []);
    setAgentApplications(applicationsRes.data || []);
    setStats({
      policies: p.length,
      claims: c.length,
      payments: pay.length,
      leads: l.length,
      revenue: pay.filter((x: any) => x.status === "confirmed").reduce((sum: number, x: any) => sum + (x.amount || 0), 0),
    });
    setLoading(false);
  };

  const updateClaim = async (claim: any, patch: { status?: any; resolution_notes?: string; assigned_agent?: string | null }) => {
    const { error } = await supabase.from("claims").update(patch).eq("id", claim.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    if (patch.status && patch.status !== claim.status) {
      // Fetch user email for notification
      const { data: prof } = await supabase.from("profiles").select("user_id").eq("user_id", claim.user_id).single();
      if (prof) {
        supabase.functions.invoke("notify", {
          body: { type: "claim_status_changed", email: claim.profiles?.email, data: { status: patch.status, notes: patch.resolution_notes } },
        }).catch(() => {});
      }
    }
    toast({ title: "Claim updated" });
    loadData();
  };

  const updateLeadTag = async (leadId: string, tag: "new" | "contacted" | "converted" | "lost") => {
    const { error } = await supabase.from("leads").update({ tag }).eq("id", leadId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Lead updated" }); loadData(); }
  };

  const updateAgentApplication = async (applicationId: string, status: "submitted" | "under_review" | "approved" | "rejected") => {
    const { error } = await supabase.from("wifa_applications").update({ status }).eq("id", applicationId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Agent application updated" }); loadData(); }
  };

  if (authLoading || !isAdmin) return null;

  const statCards = [
    { label: "Total Policies", value: stats.policies, icon: Shield, color: "text-primary" },
    { label: "Active Claims", value: stats.claims, icon: FileText, color: "text-secondary" },
    { label: "Total Revenue", value: `${stats.revenue.toLocaleString()} ETB`, icon: CreditCard, color: "text-primary" },
    { label: "Leads", value: stats.leads, icon: Users, color: "text-secondary" },
  ];

  const adminTabs: { key: AdminTab; label: string; icon: typeof Shield }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "policies", label: "Policies", icon: Shield },
    { key: "claims", label: "Claims", icon: FileText },
    { key: "payments", label: "Payments", icon: CreditCard },
    { key: "leads", label: "Leads", icon: Tag },
    { key: "agent-applications", label: "Agent Applications", icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            Admin Dashboard
          </h1>

          <div className="flex gap-1 mb-8 overflow-x-auto border-b border-border pb-1">
            {adminTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  tab === t.key ? "bg-primary/10 text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : (
            <>
              {/* Overview */}
              {tab === "overview" && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statCards.map((s) => (
                    <div
                      key={s.label}
                      className="bg-card border border-border rounded-xl p-6 animate-in fade-in slide-in-from-bottom-5 duration-500"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                      <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Policies */}
              {tab === "policies" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-medium text-muted-foreground">Policy #</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Customer</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Product</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Premium</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map((p) => (
                        <tr key={p.id} className="border-b border-border/50">
                          <td className="py-3 font-mono text-xs">{p.policy_number}</td>
                          <td className="py-3">{p.profiles?.full_name || "—"}</td>
                          <td className="py-3">{p.products?.name || "—"}</td>
                          <td className="py-3 font-medium">{p.premium_amount?.toLocaleString()} ETB</td>
                          <td className="py-3"><span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">{p.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {policies.length === 0 && <p className="text-center text-muted-foreground py-8">No policies yet</p>}
                </div>
              )}

              {/* Claims */}
              {tab === "claims" && (
                <div className="space-y-4">
                  {claims.map((c) => (
                    <div key={c.id} className="bg-card border border-border rounded-xl p-6 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-semibold">{c.profiles?.full_name || "Unknown"}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">Policy #{c.policies?.policy_number} • {c.incident_date}</p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary self-start">{c.status?.replace("_", " ")}</span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1"><FileText className="w-3 h-3" /> Status</label>
                          <select
                            value={c.status}
                            onChange={(e) => updateClaim(c, { status: e.target.value, resolution_notes: claimNotes[c.id] ?? c.resolution_notes })}
                            className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background"
                          >
                            <option value="submitted">Submitted</option>
                            <option value="under_review">Under Review</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1"><UserCheck className="w-3 h-3" /> Assigned reviewer</label>
                          <select
                            value={c.assigned_agent || ""}
                            onChange={(e) => updateClaim(c, { assigned_agent: e.target.value || null })}
                            className="w-full text-xs border border-border rounded-lg px-3 py-2 bg-background"
                          >
                            <option value="">— Unassigned —</option>
                            {agents.map((a: any) => (
                              <option key={a.user_id} value={a.user_id}>{a.profiles?.full_name || a.user_id.slice(0, 8)}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1"><MessageSquare className="w-3 h-3" /> Reviewer notes</label>
                        <Textarea
                          defaultValue={c.resolution_notes || ""}
                          onChange={(e) => setClaimNotes((s) => ({ ...s, [c.id]: e.target.value }))}
                          placeholder="Add internal notes visible to the customer..."
                          rows={2}
                          className="text-sm"
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm" variant="outline" onClick={() => updateClaim(c, { resolution_notes: claimNotes[c.id] ?? c.resolution_notes })}>
                            Save notes
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {claims.length === 0 && <p className="text-center text-muted-foreground py-8">No claims yet</p>}
                </div>
              )}

              {/* Payments */}
              {tab === "payments" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Method</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Reference</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p.id} className="border-b border-border/50">
                          <td className="py-3">{new Date(p.created_at).toLocaleDateString()}</td>
                          <td className="py-3 font-medium">{p.amount?.toLocaleString()} {p.currency}</td>
                          <td className="py-3 capitalize">{p.method?.replace("_", " ") || "—"}</td>
                          <td className="py-3 font-mono text-xs">{p.reference_number || "—"}</td>
                          <td className="py-3"><span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">{p.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {payments.length === 0 && <p className="text-center text-muted-foreground py-8">No payments yet</p>}
                </div>
              )}

              {/* Leads */}
              {tab === "leads" && (
                <div className="space-y-4">
                  {leads.map((l) => (
                    <div key={l.id} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold">{l.name}</p>
                        <p className="text-sm text-muted-foreground">{l.email} • {l.phone}</p>
                        <p className="text-xs text-muted-foreground">Interest: {l.product_interest} • Source: {l.source}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={l.tag}
                          onChange={(e) => updateLeadTag(l.id, e.target.value as "new" | "contacted" | "converted" | "lost")}
                          className="text-xs border border-border rounded-lg px-3 py-1.5 bg-background"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  {leads.length === 0 && <p className="text-center text-muted-foreground py-8">No leads yet</p>}
                </div>
              )}

              {/* WIA agent applications */}
              {tab === "agent-applications" && (
                <div className="space-y-4">
                  {agentApplications.map((application) => (
                    <div key={application.id} className="rounded-xl border border-border bg-card p-6">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div>
                          <h2 className="font-heading font-bold text-foreground">{application.full_name}</h2>
                          <p className="mt-1 text-sm text-muted-foreground">{application.email} · {application.phone}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{application.city}{application.region ? `, ${application.region}` : ""}{application.business_name ? ` · ${application.business_name}` : ""}</p>
                        </div>
                        <select
                          value={application.status}
                          onChange={(event) => updateAgentApplication(application.id, event.target.value as "submitted" | "under_review" | "approved" | "rejected")}
                          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                          aria-label={`Application status for ${application.full_name}`}
                        >
                          <option value="submitted">Submitted</option>
                          <option value="under_review">Under review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      <div className="mt-4 grid gap-3 border-t border-border pt-4 text-sm md:grid-cols-2">
                        <p><span className="font-medium">Experience:</span> {application.experience_level.replaceAll("_", " ")}</p>
                        <p><span className="font-medium">Submitted:</span> {new Date(application.created_at).toLocaleDateString()}</p>
                        <p className="md:col-span-2"><span className="font-medium">Motivation:</span> {application.motivation}</p>
                      </div>
                    </div>
                  ))}
                  {agentApplications.length === 0 && <p className="py-8 text-center text-muted-foreground">No WIA applications yet</p>}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AdminPage;
