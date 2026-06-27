import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactBlock from "@/components/ContactBlock";
import ExpandingHero from "@/components/ExpandingHero";
import SectionWrapper from "@/components/SectionWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Clock, Shield, Phone } from "lucide-react";


const branches = [
  { city: "Addis Ababa (Head Office)", address: "Bole Road, Friendship Building, 4th Floor", phone: "+251 11 123 4567" },
  { city: "Bahir Dar", address: "Kebele 14, Main Street", phone: "+251 58 220 1234" },
  { city: "Hawassa", address: "Piazza Area, Commercial Center", phone: "+251 46 220 5678" },
  { city: "Dire Dawa", address: "Kezira, Near CBE Branch", phone: "+251 25 111 2345" },
  { city: "Mekelle", address: "Ayder, Business District", phone: "+251 34 441 6789" },
  { city: "Adama (Nazret)", address: "Main Road, Negash Building", phone: "+251 22 111 3456" },
];

const ContactPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <ExpandingHero
      images={[
        "https://images.pexels.com/photos/5386491/pexels-photo-5386491.jpeg",
        "https://images.pexels.com/photos/8204351/pexels-photo-8204351.jpeg",
        "https://images.pexels.com/photos/8204325/pexels-photo-8204325.jpeg",
        "https://images.pexels.com/photos/33507830/pexels-photo-33507830.jpeg",
      ]}
      badge="CONTACT US"
      headline={'Let\'s <span class="text-primary">Talk</span>'}
      subtitle="Our team is available 24/7 to answer questions, assist with claims, or help you find the right plan."
      ctaLabel="Reach Out"
      ctaHref="/contact"
    />

    {/* Branch Network */}
    <SectionWrapper>
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="section-badge mb-4 inline-block" id="branches">OUR BRANCHES</span>
          <h2 className="qupe-heading text-3xl md:text-4xl text-foreground mt-4">
            Find a <span className="text-primary">Branch Near You</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Visit any of our 12 branch offices across Ethiopia for in-person assistance.</p>
        </div>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {branches.map((branch, i) => (
          <ScrollReveal key={branch.city} delay={i * 0.06}>
            <div className="rounded-3xl p-6 bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(205,65%,48%)] text-white shadow-lg relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-heading font-semibold text-white text-sm">{branch.city}</h3>
              </div>
              <p className="text-white/70 text-xs mb-2 relative z-10">{branch.address}</p>
              <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="text-primary text-xs font-medium relative z-10 hover:underline">{branch.phone}</a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>

    {/* Office Hours */}
    <SectionWrapper className="bg-accent/30">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="rounded-3xl p-8 bg-gradient-to-br from-[hsl(201,78%,23%)] to-[hsl(160,55%,45%)] text-white relative overflow-hidden transition-all duration-300 hover:scale-[1.01]">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-white mb-2">Office Hours</h3>
                <p className="text-white/70 text-sm">Mon – Fri: 8:30 AM – 5:30 PM</p>
                <p className="text-white/70 text-sm">Sat: 9:00 AM – 1:00 PM</p>
              </div>
              <div>
                <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-white mb-2">Claims Hotline</h3>
                <p className="text-white/70 text-sm">Available 24/7</p>
                <p className="text-white/70 text-sm">+251 11 123 4567</p>
              </div>
              <div>
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-white mb-2">Emergency</h3>
                <p className="text-white/70 text-sm">Roadside assistance</p>
                <p className="text-white/70 text-sm">+251 91 123 4567</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>

    <div className="relative z-10"><ContactBlock /></div>
    <Footer />
  </div>
);

export default ContactPage;
