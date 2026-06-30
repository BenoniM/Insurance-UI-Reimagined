import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { CreditCard, Smartphone, Building2, CheckCircle, Loader2 } from "lucide-react";

const methods = [
  { value: "telebirr", label: "Telebirr", icon: Smartphone, desc: "Mobile wallet" },
  { value: "cbe_birr", label: "CBE Birr", icon: Smartphone, desc: "Mobile wallet" },
  { value: "bank_transfer", label: "Bank Transfer", icon: Building2, desc: "Direct deposit" },
  { value: "card", label: "Card", icon: CreditCard, desc: "Visa / Mastercard" },
];

const schema = z.object({
  amount: z.number().positive().max(10_000_000),
  method: z.string().min(1),
  reference_number: z.string().trim().min(3).max(80),
});

const PaymentPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const policyParam = searchParams.get("policy");

  const [policies, setPolicies] = useState<any[]>([]);
  const [policyId, setPolicyId] = useState(policyParam || "");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("telebirr");
  const [reference, setReference] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/payments/new");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("policies")
      .select("id, policy_number, premium_amount, products(name)")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setPolicies(data || []);
        if (!policyId && data?.[0]) {
          setPolicyId(data[0].id);
          if (data[0].premium_amount) setAmount(String(data[0].premium_amount));
        }
      });
  }, [user]);

  const submit = async () => {
    if (!user) return;
    const parsed = schema.safeParse({
      amount: parseFloat(amount),
      method,
      reference_number: reference,
    });
    if (!parsed.success) {
      toast({ title: "Please complete all fields", description: parsed.error.errors[0]?.message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("payments").insert({
        user_id: user.id,
        policy_id: policyId || null,
        amount: parsed.data.amount,
        currency: "ETB",
        method: parsed.data.method as any,
        status: "pending",
        reference_number: parsed.data.reference_number,
      });
      if (error) throw error;

      supabase.functions
        .invoke("notify", {
          body: {
            type: "payment_recorded",
            email: user.email,
            data: { amount: parsed.data.amount, method, reference: parsed.data.reference_number },
          },
        })
        .catch(() => {});

      toast({ title: "Payment recorded!", description: "We'll verify and confirm shortly." });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-center mb-3 animate-in fade-in slide-in-from-bottom-5 duration-500">
            Make a Payment
          </h1>
          <p className="text-center text-muted-foreground mb-8">Record your premium payment — we'll verify it within 24 hours.</p>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
            {policies.length > 0 && (
              <div>
                <Label>Policy</Label>
                <select
                  value={policyId}
                  onChange={(e) => {
                    setPolicyId(e.target.value);
                    const p = policies.find((x) => x.id === e.target.value);
                    if (p?.premium_amount) setAmount(String(p.premium_amount));
                  }}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">— No specific policy —</option>
                  {policies.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.products?.name || "Policy"} — #{p.policy_number}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <Label>Amount (ETB)</Label>
              <Input type="number" min="1" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
            </div>

            <div>
              <Label className="mb-2 block">Payment method</Label>
              <RadioGroup value={method} onValueChange={setMethod}>
                <div className="grid sm:grid-cols-2 gap-3">
                  {methods.map((m) => (
                    <label
                      key={m.value}
                      className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${
                        method === m.value ? "border-primary bg-primary/5" : "border-border hover:bg-accent/30"
                      }`}
                    >
                      <RadioGroupItem value={m.value} id={m.value} />
                      <m.icon className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm font-medium">{m.label}</div>
                        <div className="text-xs text-muted-foreground">{m.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Transaction / Reference number</Label>
              <Input value={reference} maxLength={80} onChange={(e) => setReference(e.target.value)} placeholder="e.g. Telebirr txn ID, bank slip number" />
              <p className="text-xs text-muted-foreground mt-1">From your wallet, bank receipt, or card terminal.</p>
            </div>

            <div className="bg-accent/30 rounded-lg p-4 text-xs text-muted-foreground">
              <strong className="text-foreground">How verification works:</strong> Once submitted, our finance team checks your reference against the receiving account and marks the payment as confirmed in your dashboard.
            </div>

            <Button onClick={submit} disabled={submitting || !amount || !reference.trim()} className="w-full teal-gradient text-primary-foreground">
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting</> : <><CheckCircle className="w-4 h-4 mr-2" /> Record Payment</>}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PaymentPage;