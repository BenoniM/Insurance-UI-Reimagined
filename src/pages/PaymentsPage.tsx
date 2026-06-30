import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Download, Plus, Receipt, Shield, AlertCircle, CheckCircle, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    confirmed: "bg-primary/10 text-primary",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-destructive/10 text-destructive",
    refunded: "bg-muted text-muted-foreground",
  };
  return map[s] || "bg-muted text-muted-foreground";
};

const PaymentsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [payments, setPayments] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/payments");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("payments").select("*, policies(policy_number, products(name))").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("policies").select("*, products(name)").eq("user_id", user.id),
    ]).then(([pRes, polRes]) => {
      setPayments(pRes.data || []);
      setPolicies(polRes.data || []);
      setLoading(false);
    });
  }, [user]);

  if (authLoading || !user) return null;

  const totalPaid = payments.filter((p) => p.status === "confirmed").reduce((s, p) => s + Number(p.amount || 0), 0);
  const totalPending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + Number(p.amount || 0), 0);

  // Premium status per policy
  const policyStatus = (pol: any) => {
    const pays = payments.filter((x) => x.policy_id === pol.id && x.status === "confirmed");
    const paid = pays.reduce((s, p) => s + Number(p.amount || 0), 0);
    const due = Number(pol.premium_amount || 0);
    const balance = Math.max(due - paid, 0);
    return { paid, due, balance, isCurrent: balance === 0 && due > 0 };
  };

  const downloadReceipt = (p: any) => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${p.id.slice(0,8)}</title>
      <style>body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:40px auto;padding:24px;color:#1a1a1a}
      .hdr{background:#0D4969;color:#fff;padding:20px;border-radius:8px}
      table{width:100%;border-collapse:collapse;margin-top:20px}td{padding:10px;border-bottom:1px solid #eee}.lbl{color:#666;width:40%}
      .amt{font-size:24px;font-weight:700;color:#0D4969}</style></head>
      <body><div class="hdr"><h1 style="margin:0">WASS Insurance</h1><p style="margin:4px 0 0;opacity:.9">Payment Receipt</p></div>
      <p style="margin-top:24px">Receipt #${p.id.slice(0,8).toUpperCase()}</p>
      <p class="amt">${Number(p.amount).toLocaleString()} ${p.currency}</p>
      <table><tr><td class="lbl">Date</td><td>${new Date(p.created_at).toLocaleString()}</td></tr>
      <tr><td class="lbl">Method</td><td>${(p.method || "—").replace("_"," ")}</td></tr>
      <tr><td class="lbl">Reference</td><td>${p.reference_number || "—"}</td></tr>
      <tr><td class="lbl">Policy</td><td>${p.policies?.policy_number || "—"}</td></tr>
      <tr><td class="lbl">Status</td><td>${p.status}</td></tr></table>
      <p style="margin-top:32px;font-size:12px;color:#888">Thank you for choosing WASS Insurance. For questions, contact info@wassinsurance.com</p>
      </body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wass-receipt-${p.id.slice(0,8)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-500">
                Payments
              </h1>
              <p className="text-muted-foreground mt-1">Your payment history, receipts and premium status</p>
            </div>
            <Link to="/payments/new"><Button className="teal-gradient text-primary-foreground"><Plus className="w-4 h-4 mr-1" /> Record Payment</Button></Link>
          </div>

          {loading ? (
            <>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
              </div>
              <Skeleton className="h-48 w-full rounded-xl" />
            </>
          ) : (
            <>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-5">
              <CheckCircle className="w-5 h-5 text-primary mb-2" />
              <p className="text-2xl font-heading font-bold">{totalPaid.toLocaleString()} ETB</p>
              <p className="text-xs text-muted-foreground">Total paid</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <Clock className="w-5 h-5 text-yellow-600 mb-2" />
              <p className="text-2xl font-heading font-bold">{totalPending.toLocaleString()} ETB</p>
              <p className="text-xs text-muted-foreground">Pending verification</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <Shield className="w-5 h-5 text-primary mb-2" />
              <p className="text-2xl font-heading font-bold">{policies.length}</p>
              <p className="text-xs text-muted-foreground">Active policies</p>
            </div>
          </div>

          {/* Premium status per policy */}
          {policies.length > 0 && (
            <div className="mb-8">
              <h2 className="font-heading text-lg font-semibold mb-3">Premium status</h2>
              <div className="space-y-3">
                {policies.map((pol) => {
                  const st = policyStatus(pol);
                  return (
                    <div key={pol.id} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                        <div>
                          <p className="font-medium">{pol.products?.name} · #{pol.policy_number}</p>
                          <p className="text-xs text-muted-foreground">Premium: {st.due.toLocaleString()} ETB</p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${st.isCurrent ? "bg-primary/10 text-primary" : "bg-yellow-100 text-yellow-700"}`}>
                          {st.isCurrent ? "Current" : `${st.balance.toLocaleString()} ETB due`}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          style={{ width: `${st.due > 0 ? Math.min((st.paid / st.due) * 100, 100) : 0}%`, transition: "width 0.8s ease-out" }}
                          className="h-full bg-primary"
                        />
                      </div>
                      {!st.isCurrent && (
                        <Link to={`/payments/new?policy=${pol.id}`} className="text-xs text-primary hover:underline mt-2 inline-block">
                          Pay now →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Payment history */}
          <h2 className="font-heading text-lg font-semibold mb-3">Payment history</h2>
          {payments.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-xl">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No payments recorded yet</p>
              <Link to="/payments/new"><Button>Record your first payment</Button></Link>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Policy</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Method</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Reference</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="border-t border-border/50">
                        <td className="py-3 px-4">{new Date(p.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{p.policies?.policy_number || "—"}</td>
                        <td className="py-3 px-4 font-medium">{Number(p.amount).toLocaleString()} {p.currency}</td>
                        <td className="py-3 px-4 capitalize">{p.method?.replace("_", " ") || "—"}</td>
                        <td className="py-3 px-4 font-mono text-xs">{p.reference_number || "—"}</td>
                        <td className="py-3 px-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusBadge(p.status)}`}>{p.status}</span></td>
                        <td className="py-3 px-4 text-right">
                          <Button size="sm" variant="ghost" onClick={() => downloadReceipt(p)}><Receipt className="w-3 h-3 mr-1" /> Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default PaymentsPage;