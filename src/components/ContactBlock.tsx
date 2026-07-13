import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const insuranceTypes = [
  "Motor Insurance",
  "Health Insurance",
  "Life Insurance",
  "Travel Insurance",
  "Property Insurance",
  "Liability Insurance"
];

const ContactBlock = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  const toggleInsurance = (type: string) => {
    setSelectedInsurances(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim() || !formData.email.trim()) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await supabase.from("leads").insert({
        name: formData.name.trim().slice(0, 100),
        email: formData.email.trim().slice(0, 255) || null,
        phone: formData.phone.trim().slice(0, 20) || null,
        product_interest: selectedInsurances.length > 0 ? selectedInsurances.join(", ") : "Contact Form",
        source: "contact_page",
        notes: formData.message.trim().slice(0, 1000),
      });
      toast({ title: "Message Sent", description: "We'll get back to you soon!" });
      setFormData({ name: "", phone: "", email: "", message: "" });
      setSelectedInsurances([]);
    } catch {
      toast({ title: "Error sending message", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full bg-accent/20 py-16 md:py-24" id="contact">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div className="flex flex-col h-full min-w-0">
            <ScrollReveal>
              <span className="section-badge mb-6 inline-block">CONTACT</span>
              <h2 className="section-title text-foreground mt-4 mb-8 md:mb-12">
                Get in Touch
                <br />
                <span className="text-primary">We're Here to Help</span>
              </h2>
            </ScrollReveal>
            
            {/* Map */}
            <ScrollReveal delay={0.1} className="lg:flex-grow lg:flex lg:flex-col w-full">
              <div className="w-full h-[300px] lg:h-auto lg:flex-grow rounded-md overflow-hidden mb-8 opacity-90 contrast-125 filter grayscale-[50%]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7636!3d9.0054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMTkuNCJOIDM4wrA0NSc0OS4wIkU!5e0!3m2!1sen!2set!4v1" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: "300px" }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                  title="WASS Insurance Office Location" 
                />
              </div>
            </ScrollReveal>

            {/* Contact Pills */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-row flex-nowrap items-center gap-2 overflow-x-auto pb-2 scrollbar-hide w-full">
                 <a href="mailto:info@wassinsurance.com" className="whitespace-nowrap px-4 py-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 rounded-full text-[12px] font-medium text-primary transition-colors">
                   info@wassinsurance.com
                 </a>
                 <a href="tel:+251111234567" className="whitespace-nowrap px-4 py-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 rounded-full text-[12px] font-medium text-primary transition-colors">
                   +251 11 123 4567
                 </a>
                 <a href="https://wa.me/251911234567" className="whitespace-nowrap px-4 py-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 rounded-full text-[12px] font-medium text-primary transition-colors">
                   WhatsApp
                 </a>
                 <div className="whitespace-nowrap px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[12px] font-medium text-primary">
                   Addis Ababa, Ethiopia
                 </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (Form) */}
          <div className="flex flex-col pt-4 md:pt-10">
            <ScrollReveal delay={0.1}>
              <h3 className="text-[13px] font-bold tracking-wider text-muted-foreground uppercase mb-8">
                FILL THE FORM TO REQUEST A QUOTE:
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Your Name *" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3.5 bg-background border border-secondary rounded-[4px] outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-foreground text-[15px]" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email *" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3.5 bg-background border border-secondary rounded-[4px] outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-foreground text-[15px]" 
                  />
                </div>
                
                <input 
                  type="tel" 
                  placeholder="Phone (Optional)" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-5 py-3.5 bg-background border border-secondary rounded-[4px] outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-foreground text-[15px]" 
                />
                
                <textarea 
                  placeholder="Tell us about your project *" 
                  required 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-5 py-3.5 bg-background border border-secondary rounded-[4px] outline-none focus:border-primary transition-colors placeholder:text-muted-foreground text-foreground text-[15px] resize-none" 
                />

                <div className="pt-8">
                  <h3 className="text-[13px] font-bold tracking-wider text-muted-foreground uppercase mb-6">
                    TYPE OF INSURANCE OFFERED
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                    {insuranceTypes.map(type => {
                      const isSelected = selectedInsurances.includes(type);
                      return (
                        <div 
                          key={type} 
                          onClick={() => toggleInsurance(type)}
                          className="flex items-center gap-4 cursor-pointer group"
                        >
                          <div className={`w-5 h-5 rounded-[4px] border relative overflow-hidden flex items-center justify-center transition-colors duration-300 ${isSelected ? 'border-primary' : 'border-foreground/30 group-hover:border-primary/80'}`}>
                            <div className={`absolute inset-0 bg-primary transition-transform duration-300 ease-out origin-center ${isSelected ? 'scale-100' : 'scale-0'}`} />
                          </div>
                          <span className={`text-[15px] transition-colors ${isSelected ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                            {type}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-10">
                  <button 
                    type="submit" 
                    disabled={sending} 
                    className="bg-foreground hover:bg-primary text-background px-8 py-3.5 rounded-[4px] text-[15px] font-medium flex items-center gap-4 transition-colors w-fit group"
                  >
                    <span>{sending ? 'Sending...' : 'Send Message'}</span>
                    <ArrowRight className="w-4 h-4 text-background/50 group-hover:text-background transition-colors group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactBlock;
