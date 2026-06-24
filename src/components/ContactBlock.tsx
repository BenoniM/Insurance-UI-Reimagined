import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SectionWrapper from "./SectionWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CTAButton from "./CTAButton";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ContactBlock = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await supabase.from("leads").insert({
        name: formData.name.trim().slice(0, 100),
        email: formData.email.trim().slice(0, 255) || null,
        phone: formData.phone.trim().slice(0, 20) || null,
        product_interest: "Contact Form",
        source: "contact_page",
        notes: formData.message.trim().slice(0, 1000),
      });
      toast({ title: t("contact.sendMessage"), description: "We'll get back to you soon!" });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast({ title: "Error sending message", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="text-center mb-16">
        <ScrollReveal>
          <span className="section-badge mb-6 inline-block">CONTACT</span>
          <h2 className="qupe-heading text-4xl md:text-5xl text-foreground mt-4">
            {t("contact.title")}
            <br />
            <span className="text-primary">We're Here to Help</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-lg">{t("contact.subtitle")}</p>
        </ScrollReveal>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <ScrollReveal animation="fadeLeft">
          <div className="space-y-5">
            {[
              { icon: Phone, label: t("contact.phone"), value: "+251 11 123 4567", href: "tel:+251111234567" },
              { icon: MessageCircle, label: t("contact.whatsapp"), value: "+251 91 123 4567", href: "https://wa.me/251911234567" },
              { icon: Mail, label: t("contact.email"), value: "info@wassinsurance.com", href: "mailto:info@wassinsurance.com" },
            ].map((item) => (
              <motion.a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} whileHover={{ x: 4 }} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-accent/50 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </motion.a>
            ))}
            <div className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">{t("contact.headOffice")}</p>
                <p className="text-sm text-muted-foreground">Bole Road, Addis Ababa, Ethiopia</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border h-48">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7636!3d9.0054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMTkuNCJOIDM4wrA0NSc0OS4wIkU!5e0!3m2!1sen!2set!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="WASS Insurance Office Location" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeRight" delay={0.1}>
          <form className="qupe-card space-y-4" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.fullName")} *</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t("contact.fullName")} required maxLength={100} className="rounded-xl border-border/60 bg-accent/30 focus:bg-card" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.phone")}</label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+251..." maxLength={20} className="rounded-xl border-border/60 bg-accent/30 focus:bg-card" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.email")}</label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@email.com" maxLength={255} className="rounded-xl border-border/60 bg-accent/30 focus:bg-card" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{t("contact.howCanWeHelp")} *</label>
              <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t("contact.tellUs")} rows={4} required maxLength={1000} className="rounded-xl border-border/60 bg-accent/30 focus:bg-card" />
            </div>
            <CTAButton variant="primary" size="lg" className="w-full" icon={false} onClick={() => {}}>
              {sending ? "..." : t("contact.sendMessage")}
            </CTAButton>
          </form>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
};

export default ContactBlock;
