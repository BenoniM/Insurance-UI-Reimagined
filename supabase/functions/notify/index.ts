// Sends transactional emails via Resend for key insurance events.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

type EventType = "quote_submitted" | "claim_submitted" | "payment_recorded" | "policy_activated" | "claim_status_changed";

interface Payload {
  type: EventType;
  email?: string | null;
  data?: Record<string, unknown>;
}

const subjects: Record<EventType, string> = {
  quote_submitted: "Your WASS Insurance quote is in",
  claim_submitted: "We've received your claim",
  payment_recorded: "Payment received — verifying now",
  policy_activated: "Your WASS policy is active",
  claim_status_changed: "Claim status update",
};

const wrap = (title: string, inner: string) => `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1a1a1a;">
<div style="max-width:560px;margin:0 auto;padding:32px 16px;">
  <div style="background:#0D4969;color:#fff;padding:24px;border-radius:12px 12px 0 0;">
    <h1 style="margin:0;font-size:22px;font-weight:700;">WASS Insurance</h1>
  </div>
  <div style="background:#fff;padding:28px 24px;border-radius:0 0 12px 12px;border:1px solid #e6eaf0;border-top:none;">
    <h2 style="margin:0 0 12px;font-size:18px;color:#0D4969;">${title}</h2>
    ${inner}
    <hr style="border:none;border-top:1px solid #e6eaf0;margin:24px 0;" />
    <p style="font-size:12px;color:#6b7280;margin:0;">WASS Insurance · Addis Ababa, Ethiopia · +251 11 123 4567</p>
  </div>
</div></body></html>`;

const renderBody = (type: EventType, data: Record<string, unknown> = {}): { html: string; text: string } => {
  switch (type) {
    case "quote_submitted": {
      const text = `Thanks for your quote request. Our team will reach out within 24 hours.\nEstimated premium: ${data.amount ?? "—"} ETB`;
      return { text, html: wrap("Your quote is being prepared", `<p>Thanks for your quote request. Our team will reach out within 24 hours with a tailored offer.</p><p><strong>Estimated premium:</strong> ${data.amount ?? "—"} ETB</p>`) };
    }
    case "claim_submitted": {
      const text = `We've received your claim. A specialist will contact you within 1–2 business days.\nIncident date: ${data.incident_date ?? "—"}`;
      return { text, html: wrap("Claim received", `<p>We've received your claim and assigned a reference. A claims specialist will contact you within 1–2 business days.</p><p><strong>Incident date:</strong> ${data.incident_date ?? "—"}</p><p>Track your claim status anytime in your <a href="https://wassinsurance.lovable.app/dashboard" style="color:#0D4969;">dashboard</a>.</p>`) };
    }
    case "payment_recorded": {
      const text = `We've recorded your payment of ${data.amount ?? "—"} ETB via ${data.method ?? "—"}. Reference: ${data.reference ?? "—"}.`;
      return { text, html: wrap("Payment recorded", `<p>We've recorded your payment of <strong>${data.amount ?? "—"} ETB</strong> via ${data.method ?? "—"}.</p><p><strong>Reference:</strong> ${data.reference ?? "—"}</p><p>Verification typically takes under 24 hours.</p>`) };
    }
    case "policy_activated": {
      const text = `Your policy #${data.policy_number ?? ""} is now active.`;
      return { text, html: wrap("Policy active", `<p>Welcome aboard — your policy <strong>#${data.policy_number ?? ""}</strong> is now active.</p><p>View it anytime in your <a href="https://wassinsurance.lovable.app/dashboard" style="color:#0D4969;">dashboard</a>.</p>`) };
    }
    case "claim_status_changed": {
      const text = `Your claim status changed to "${data.status ?? "updated"}".${data.notes ? `\nNotes: ${data.notes}` : ""}`;
      return { text, html: wrap("Claim status update", `<p>Your claim status has been updated to <strong>${data.status ?? "updated"}</strong>.</p>${data.notes ? `<p><em>${data.notes}</em></p>` : ""}<p>See full details in your <a href="https://wassinsurance.lovable.app/dashboard" style="color:#0D4969;">dashboard</a>.</p>`) };
    }
  }
};

const sendEmail = async (to: string, subject: string, html: string, text: string) => {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.log("[notify] RESEND_API_KEY missing — logging only:", to, subject);
    return { ok: true, skipped: true };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "WASS Insurance <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
      text,
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("[notify] Resend error", res.status, body);
    return { ok: false, error: body };
  }
  return { ok: true, id: body.id };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const payload = (await req.json()) as Payload;
    if (!payload?.type || !subjects[payload.type]) {
      return new Response(JSON.stringify({ error: "Invalid type" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!payload.email) {
      return new Response(JSON.stringify({ ok: true, skipped: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const subject = subjects[payload.type];
    const { html, text } = renderBody(payload.type, payload.data || {});
    const result = await sendEmail(payload.email, subject, html, text);
    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
