import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Upload, FileText, CheckCircle, X, Loader2 } from "lucide-react";

const stepLabels = ["Policy", "Incident", "Documents", "Review"];

const incidentSchema = z.object({
  description: z.string().trim().min(10, "Please describe the incident (min 10 chars)").max(2000),
  incident_date: z.string().min(1, "Date is required"),
  location: z.string().trim().min(2).max(200),
  contact_phone: z.string().trim().min(7).max(20),
});

const NewClaimPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [policies, setPolicies] = useState<any[]>([]);
  const [policyId, setPolicyId] = useState<string>("");
  const [form, setForm] = useState({
    description: "",
    incident_date: "",
    location: "",
    contact_phone: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/claims/new");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("policies")
      .select("id, policy_number, status, products(name)")
      .eq("user_id", user.id)
      .in("status", ["active", "pending"])
      .then(({ data }) => setPolicies(data || []));
  }, [user]);

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    const arr = Array.from(selected).filter(
      (f) => f.size <= 10 * 1024 * 1024 && /\.(pdf|jpg|jpeg|png|webp|heic)$/i.test(f.name)
    );
    if (arr.length !== selected.length) {
      toast({ title: "Some files skipped", description: "Max 10MB. Allowed: PDF, JPG, PNG, WEBP.", variant: "destructive" });
    }
    setFiles((prev) => [...prev, ...arr].slice(0, 8));
  };

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const canAdvance = () => {
    if (step === 0) return !!policyId;
    if (step === 1) return incidentSchema.safeParse(form).success;
    if (step === 2) return files.length >= 1;
    return true;
  };

  const next = () => {
    if (step === 1) {
      const r = incidentSchema.safeParse(form);
      if (!r.success) {
        toast({ title: "Please complete all fields", description: r.error.errors[0]?.message, variant: "destructive" });
        return;
      }
    }
    if (step === 2 && files.length === 0) {
      toast({ title: "At least one supporting document required", variant: "destructive" });
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const submit = async () => {
    if (!user) return;
    setUploading(true);
    setUploadProgress(5);
    try {
      const docs: { name: string; path: string; size: number }[] = [];
      let i = 0;
      for (const f of files) {
        const path = `${user.id}/${Date.now()}-${f.name.replace(/\s+/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("claim-documents").upload(path, f);
        if (upErr) throw upErr;
        docs.push({ name: f.name, path, size: f.size });
        i++;
        setUploadProgress(5 + Math.round((i / files.length) * 80));
      }

      const { data: claim, error } = await supabase
        .from("claims")
        .insert({
          user_id: user.id,
          policy_id: policyId,
          description: `${form.description}\n\nLocation: ${form.location}\nContact: ${form.contact_phone}`,
          incident_date: form.incident_date,
          documents: docs,
          status: "submitted",
        })
        .select()
        .single();
      if (error) throw error;

      setUploadProgress(95);
      // Fire-and-forget notification (non-blocking)
      supabase.functions
        .invoke("notify", {
          body: {
            type: "claim_submitted",
            email: user.email,
            data: { claim_id: claim.id, description: form.description, incident_date: form.incident_date },
          },
        })
        .catch(() => {});

      setUploadProgress(100);
      toast({ title: "Claim submitted!", description: "We've received your claim and sent a confirmation email." });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-3 animate-in fade-in slide-in-from-bottom-5 duration-500"
          >
            File a New Claim
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Step {step + 1} of {stepLabels.length} — {stepLabels[step]}
          </p>

          <div className="mb-8">
            <Progress value={((step + 1) / stepLabels.length) * 100} className="h-2" />
          </div>

            <div
              key={step}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 animate-in fade-in slide-in-from-right-4 duration-500"
            >
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="font-heading text-xl font-semibold">Select the policy</h2>
                  {policies.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You have no active policies to file a claim against.</p>
                      <Button onClick={() => navigate("/quote")}>Get a Quote</Button>
                    </div>
                  ) : (
                    <RadioGroup value={policyId} onValueChange={setPolicyId}>
                      {policies.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-3 border border-border rounded-lg p-4 hover:bg-accent/50 cursor-pointer"
                          onClick={() => setPolicyId(p.id)}
                        >
                          <RadioGroupItem value={p.id} id={p.id} />
                          <Label htmlFor={p.id} className="cursor-pointer flex-1">
                            <div className="font-medium">{p.products?.name || "Policy"}</div>
                            <div className="text-xs text-muted-foreground">#{p.policy_number} • {p.status}</div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-heading text-xl font-semibold">Tell us what happened</h2>
                  <div>
                    <Label>Date of incident</Label>
                    <Input type="date" max={new Date().toISOString().split("T")[0]} value={form.incident_date} onChange={(e) => setForm({ ...form, incident_date: e.target.value })} />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input value={form.location} maxLength={200} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, area, or address" />
                  </div>
                  <div>
                    <Label>Contact phone</Label>
                    <Input value={form.contact_phone} maxLength={20} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} placeholder="+251..." />
                  </div>
                  <div>
                    <Label>What happened?</Label>
                    <Textarea
                      value={form.description}
                      maxLength={2000}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe the incident in detail..."
                      rows={5}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{form.description.length}/2000</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-heading text-xl font-semibold">Supporting documents</h2>
                  <p className="text-sm text-muted-foreground">Upload photos, police reports, receipts, or medical reports. PDF/JPG/PNG, max 10MB each, up to 8 files.</p>

                  <label className="block border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-accent/30 transition-colors">
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.heic" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click to choose files</p>
                    <p className="text-xs text-muted-foreground">or drag and drop</p>
                  </label>

                  {files.length > 0 && (
                    <ul className="space-y-2">
                      {files.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-3 p-3 border border-border rounded-lg text-sm">
                          <FileText className="w-4 h-4 text-primary shrink-0" />
                          <span className="flex-1 truncate">{f.name}</span>
                          <span className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)} KB</span>
                          <button onClick={() => removeFile(idx)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                            <X className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-semibold">Review and submit</h2>
                  <div className="bg-accent/30 rounded-xl p-5 space-y-2 text-sm">
                    <p><strong>Policy:</strong> #{policies.find((p) => p.id === policyId)?.policy_number}</p>
                    <p><strong>Incident date:</strong> {form.incident_date}</p>
                    <p><strong>Location:</strong> {form.location}</p>
                    <p><strong>Contact:</strong> {form.contact_phone}</p>
                    <p><strong>Description:</strong> {form.description}</p>
                    <p><strong>Documents:</strong> {files.length} attached</p>
                  </div>

                  {uploading && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} />
                      <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" /> Uploading documents and submitting...
                      </p>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    By submitting, you confirm the information is accurate. False or exaggerated claims are subject to legal action under Ethiopian law.
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 0 ? (
                  <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={uploading}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                ) : <div />}

                {step < 3 ? (
                  <Button onClick={next} disabled={!canAdvance() || policies.length === 0}>
                    Next <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button onClick={submit} disabled={uploading} className="teal-gradient text-primary-foreground">
                    {uploading ? <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Submitting</> : <><CheckCircle className="w-4 h-4 mr-1" /> Submit Claim</>}
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

export default NewClaimPage;
