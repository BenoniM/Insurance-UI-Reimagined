import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, FileText, Download, Eye, Clock, CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Doc = { name: string; path: string; size?: number };

const stages = [
  { key: "submitted", label: "Submitted", icon: FileText },
  { key: "under_review", label: "Under Review", icon: Clock },
  { key: "approved", label: "Approved", icon: CheckCircle },
  { key: "paid", label: "Paid", icon: CheckCircle },
];

const stageIndex = (s: string) => {
  const i = stages.findIndex((x) => x.key === s);
  return i === -1 ? 0 : i;
};

const ClaimDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [claim, setClaim] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [docUrls, setDocUrls] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<{ url: string; name: string; type: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const load = async () => {
    if (!id || !user) return;
    const { data } = await supabase
      .from("claims")
      .select("*, policies(policy_number, products(name))")
      .eq("id", id)
      .single();
    setClaim(data);

    const { data: hist } = await supabase
      .from("claim_status_history")
      .select("*")
      .eq("claim_id", id)
      .order("created_at", { ascending: true });
    setHistory(hist || []);

    const docs = (Array.isArray(data?.documents) ? data!.documents : []) as unknown as Doc[];
    if (docs.length) {
      const urls: Record<string, string> = {};
      for (const d of docs) {
        const { data: signed } = await supabase.storage
          .from("claim-documents")
          .createSignedUrl(d.path, 3600);
        if (signed?.signedUrl) urls[d.path] = signed.signedUrl;
      }
      setDocUrls(urls);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id, user]);

  // Realtime: subscribe to claim + history changes
  useEffect(() => {
    if (!id) return;
    const channel = supabase
      .channel(`claim-${id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "claims", filter: `id=eq.${id}` }, (payload) => {
        setClaim((c: any) => ({ ...c, ...payload.new }));
        toast({ title: "Claim updated", description: `Status: ${(payload.new as any).status?.replace("_", " ")}` });
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "claim_status_history", filter: `claim_id=eq.${id}` }, (payload) => {
        setHistory((h) => [...h, payload.new]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [id, toast]);

  const isImage = (name: string) => /\.(jpg|jpeg|png|webp|gif|heic)$/i.test(name);
  const isPdf = (name: string) => /\.pdf$/i.test(name);

  const openPreview = (d: Doc) => {
    const url = docUrls[d.path];
    if (!url) return;
    const type = isImage(d.name) ? "image" : isPdf(d.name) ? "pdf" : "other";
    if (type === "other") { window.open(url, "_blank"); return; }
    setPreview({ url, name: d.name, type });
  };

  if (authLoading || loading || !claim) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const currentIdx = stageIndex(claim.status);
  const isRejected = claim.status === "rejected";

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </Link>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Claim · #{claim.id.slice(0, 8)}</p>
                <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">{claim.policies?.products?.name || "Claim"}</h1>
                <p className="text-sm text-muted-foreground mt-1">Policy #{claim.policies?.policy_number} · Incident {claim.incident_date}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${isRejected ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                {claim.status.replace("_", " ")}
              </span>
            </div>
            <div className="bg-accent/30 rounded-lg p-4 text-sm whitespace-pre-line">{claim.description}</div>
            {claim.paid_amount && (
              <div className="mt-3 text-sm"><strong>Paid amount:</strong> {Number(claim.paid_amount).toLocaleString()} ETB</div>
            )}
          </div>

          {/* Stage Tracker */}
          {!isRejected && (
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-backwards">
              <h2 className="font-heading text-lg font-semibold mb-6">Progress</h2>
              <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
                <div
                  className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-700"
                  style={{ width: `${(currentIdx / (stages.length - 1)) * 100}%` }}
                />
                {stages.map((s, i) => {
                  const reached = i <= currentIdx;
                  return (
                    <div key={s.key} className="relative z-10 flex flex-col items-center text-center" style={{ width: `${100 / stages.length}%` }}>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${reached ? "bg-primary border-primary text-primary-foreground scale-100" : "bg-card border-border text-muted-foreground scale-90"}`}
                      >
                        <s.icon className="w-4 h-4" />
                      </div>
                      <p className={`text-xs mt-2 ${reached ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {isRejected && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 mb-6 flex gap-3">
              <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-destructive">This claim was rejected</p>
                {claim.resolution_notes && <p className="text-sm text-muted-foreground mt-1">{claim.resolution_notes}</p>}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-backwards">
            <h2 className="font-heading text-lg font-semibold mb-4">Status Timeline</h2>
            <ol className="relative border-l-2 border-border ml-3 space-y-5">
              {history.length === 0 && <li className="text-sm text-muted-foreground pl-5">No updates yet.</li>}
              {history.map((h) => (
                <li key={h.id} className="ml-5 relative">
                  <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-card" />
                  <p className="text-sm font-medium capitalize">{h.to_status?.replace("_", " ")}</p>
                  <p className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</p>
                  {h.notes && <p className="text-sm text-foreground/80 mt-1">{h.notes}</p>}
                </li>
              ))}
            </ol>
          </div>

          {/* Documents */}
          {(() => {
            const docs = (Array.isArray(claim.documents) ? claim.documents : []) as unknown as Doc[];
            return (
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-backwards">
                <h2 className="font-heading text-lg font-semibold mb-4">Documents ({docs.length})</h2>
                {docs.length === 0 && <p className="text-sm text-muted-foreground">No documents attached.</p>}
                <div className="grid sm:grid-cols-2 gap-3">
                  {docs.map((d) => (
                    <div key={d.path} className="border border-border rounded-lg p-4 flex items-center gap-3">
                      {isImage(d.name) && docUrls[d.path] ? (
                        <img src={docUrls[d.path]} alt={d.name} className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center"><FileText className="w-5 h-5 text-primary" /></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{d.name}</p>
                        {d.size && <p className="text-xs text-muted-foreground">{(d.size / 1024).toFixed(0)} KB</p>}
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openPreview(d)} aria-label="Preview"><Eye className="w-4 h-4" /></Button>
                        <a href={docUrls[d.path]} download={d.name} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="ghost" aria-label="Download"><Download className="w-4 h-4" /></Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <p className="text-sm font-medium truncate">{preview.name}</p>
              <Button size="sm" variant="ghost" onClick={() => setPreview(null)}>Close</Button>
            </div>
            <div className="flex-1 overflow-auto bg-muted/30 flex items-center justify-center">
              {preview.type === "image" ? (
                <img src={preview.url} alt={preview.name} className="max-w-full max-h-[80vh] object-contain" />
              ) : (
                <iframe src={preview.url} title={preview.name} className="w-full h-[80vh]" />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ClaimDetailsPage;
