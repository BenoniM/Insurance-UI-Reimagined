import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactBlock from "@/components/ContactBlock";
import SectionWrapper from "@/components/SectionWrapper";
import contactHeroNew from "@/assets/ContactHero/ChatGPT Image Jul 14, 2026, 09_59_56 AM.webp";
import ScrollReveal from "@/components/ScrollReveal";
import { ClipboardList, Lightbulb, MessageSquareWarning, Search, Star } from "lucide-react";
import { useState, useRef } from "react";

const branches = [
  { city: "Addis Ababa (Head Office)", address: "Bole Road, Friendship Building, 4th Floor", phone: "+251 11 123 4567", img: "https://images.pexels.com/photos/14391906/pexels-photo-14391906.jpeg" },
  { city: "Bahir Dar", address: "Kebele 14, Main Street", phone: "+251 58 220 1234", img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/557319388_1312475937557059_6825128574076986818_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x607&ctp=s590x590&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Sod9nWp-HRMQ7kNvwFKBl0h&_nc_oc=AdqcYamOpZyDQT3rNnCnMjZGnurdOH0ZficMBxl53EfOAuxU7vseuek3sCn9ZWD91oY&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=mcjur4-Xl1eaxNCmJjENxA&_nc_ss=7b289&oh=00_Af_mAI4Hyek9dB4pPOumzyfXGQeCEC683xG91uj7AGS4_w&oe=6A47D09B" },
  { city: "Hawassa", address: "Piazza Area, Commercial Center", phone: "+251 46 220 5678", img: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/656172810_844563612006065_2853273626881206658_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x630&ctp=s1200x630&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=mHSt10qtG_0Q7kNvwGd_joj&_nc_oc=Adq7wXIiQaiZ64aOUE84vhklxacpH5tbtJwD_GR-jetxltyThwh4KlRx3d2jlg8kFeQ&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=V6nvvT45eexmgdfAG3ps4A&_nc_ss=7b289&oh=00_Af89tMkRPED2VqWeEkgLF5Pjz8aYBPGJoT_A2Prj11DfBw&oe=6A47E4E3" },
  { city: "Dire Dawa", address: "Kezira, Near CBE Branch", phone: "+251 25 111 2345", img: "https://www.geeska.com/sites/default/files/styles/main_664x374/public/2025-03/GettyImages-1244176098.jpg.webp?itok=6sgc78il" },
  { city: "Mekelle", address: "Ayder, Business District", phone: "+251 34 441 6789", img: "https://gheraltatour.com/wp-content/uploads/2024/03/Mekelle-city.jpg" },
  { city: "Adama (Nazret)", address: "Main Road, Negash Building", phone: "+251 22 111 3456", img: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/484996198_676381621585895_2548246790889037144_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x612&ctp=p180x540&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hNYGC1yhVCoQ7kNvwEkQYbH&_nc_oc=AdqBhOKTdym7ES6z9_G_h6ol_eEJH-4O0wPvzBioT9baGWVR5uuI-w8-40-P2eusW5Y&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=Y9o1YJeGTYGEpEWbXtL3QA&_nc_ss=7b289&oh=00_Af95-0M6h3iOda2OB2npiuQgnhHJoPorYp24-uaA4tYgdA&oe=6A47D7C0" },
];

const HoverBranchList = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className="relative max-w-[1800px] mx-auto w-full mt-12"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="border-t border-primary/20">
        {branches.map((branch, i) => (
          <div
            key={branch.city}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') setHoveredIndex(i);
            }}
            onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
            className={`group relative flex flex-col md:flex-row md:items-center justify-between py-6 border-b transition-colors cursor-pointer px-4 ${hoveredIndex === i ? 'border-primary' : 'border-primary/20'} hover:bg-muted/10`}
          >
            <div className="flex flex-col mb-2 md:mb-0 w-full md:w-auto">
               <h3 className={`text-base md:text-lg font-heading font-medium transition-colors ${hoveredIndex === i ? 'text-primary' : 'text-foreground'}`}>
                 {branch.city}
               </h3>
               <p className="text-xs md:text-sm text-muted-foreground mt-1">{branch.address}</p>
               
               {/* Mobile Image (Accordion style) */}
               <div className={`md:hidden w-full overflow-hidden transition-all duration-300 ease-in-out ${hoveredIndex === i ? 'max-h-[250px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                 <img src={branch.img} alt={branch.city} className="w-full h-[200px] object-cover rounded-xl shadow-md" />
               </div>
            </div>
            <div className="text-left md:text-right mt-2 md:mt-0">
               <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{branch.phone}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Floating Image Wrapper (Instant position) */}
      <div 
        className="pointer-events-none absolute z-50 hidden md:block"
        style={{
          transform: `translate(calc(${mousePos.x}px - 50%), calc(${mousePos.y}px - 50%))`,
          left: 0,
          top: 0,
        }}
      >
        <div
          className="w-[200px] md:w-[250px] aspect-[5/3] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ease-out"
          style={{
            opacity: hoveredIndex !== null ? 1 : 0,
            transform: `scale(${hoveredIndex !== null ? 1 : 0.9})`,
          }}
        >
          {branches.map((branch, i) => (
            <img
              key={i}
              src={branch.img}
              alt={branch.city}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: hoveredIndex === i ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const complaintFeedbackItems = [
  {
    title: "Complaint Form",
    description: "Submit service, policy, claims, or payment complaints for formal review.",
    icon: MessageSquareWarning,
  },
  {
    title: "Suggestion Box",
    description: "Share ideas that can improve our products, branches, digital services, or customer experience.",
    icon: Lightbulb,
  },
  {
    title: "Customer Satisfaction Survey",
    description: "Rate your recent experience and help us measure how well WASS is serving you.",
    icon: Star,
  },
  {
    title: "Complaint Tracking",
    description: "Use your complaint reference number to check review status and next steps.",
    icon: Search,
  },
];

const ComplaintFeedbackSection = () => (
  <SectionWrapper className="bg-white">
    <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
      <ScrollReveal>
        <div className="section-header mb-10">
          <span className="section-badge mb-4 inline-block">COMPLAINT & FEEDBACK</span>
          <h2 className="section-title mt-4 capitalize">
            Tell us how we can <span className="text-primary">serve you better</span>
          </h2>
          <p className="section-description">
            Submit complaints, send suggestions, complete satisfaction surveys, or track an existing complaint from one place.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {complaintFeedbackItems.map((item, index) => (
          <ScrollReveal key={item.title} delay={index * 0.06}>
            <div className="h-full rounded-xl border border-border bg-background p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <ScrollReveal>
          <div className="rounded-2xl border border-border bg-accent/20 p-6">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-xl font-bold text-foreground">Complaint Form</h3>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <input className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Full name" />
              <input className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Email or phone" />
              <select className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary">
                <option>Complaint type</option>
                <option>Policy service</option>
                <option>Claims service</option>
                <option>Payment issue</option>
                <option>Branch experience</option>
              </select>
              <input className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Policy / claim number optional" />
              <textarea className="md:col-span-2 min-h-28 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Describe your complaint or feedback" />
            </div>
            <button className="mt-5 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">
              Submit Feedback
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="h-full rounded-2xl border border-border bg-[hsl(201,78%,20%)] p-6 text-white">
            <h3 className="font-heading text-xl font-bold">Track a complaint</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Enter your complaint reference number to follow status updates from submission to resolution.
            </p>
            <input className="mt-5 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/50" placeholder="Complaint reference number" />
            <button className="mt-4 w-full rounded-xl bg-white px-6 py-3 text-sm font-bold text-[hsl(201,78%,20%)] transition-colors hover:bg-white/90">
              Track Complaint
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </SectionWrapper>
);

const ContactPage = () => (
  <div className="min-h-screen">
    <Navbar />
    {/* ── MOBILE HERO (image below text, no cropping) ── */}
    <section className="block md:hidden bg-[#FBFAFA] overflow-hidden">
      <div className="flex flex-col items-center text-center px-4 pt-28 pb-6">
        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6">
          CONTACT US
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-[hsl(201,78%,20%)] mb-6 max-w-4xl">
          Let's <span className="text-[#288A69]">Talk</span>
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mb-8">
          Our team is available 24/7 to answer questions, assist with claims, or help you find the right plan.
        </p>
        <a href="#branches" className="rounded-xl bg-[#288A69] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#288A69]/90 hover:scale-105 hover:shadow-xl hover:shadow-[#288A69]/20 text-center">
          Reach Out
        </a>
      </div>
      {/* Full-width image at natural aspect ratio — no cropping */}
      <div className="w-screen">
        <img
          src={contactHeroNew}
          alt="Contact Background"
          className="w-full h-auto"
          loading="eager"
        />
      </div>
    </section>

    {/* ── DESKTOP HERO (full-screen background image) ── */}
    <section className="hidden md:flex relative h-screen items-center justify-center overflow-hidden bg-[#FBFAFA]">
      <div className="absolute inset-0 z-0">
        <img
          src={contactHeroNew}
          alt="Contact Background"
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12 flex flex-col items-center text-center">
        <ScrollReveal>
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6">
              CONTACT US
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[hsl(201,78%,20%)] mb-6 max-w-4xl">
              Let's <span className="text-[#288A69]">Talk</span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-600 max-w-2xl mb-8">
              Our team is available 24/7 to answer questions, assist with claims, or help you find the right plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#branches" className="w-full sm:w-auto rounded-xl bg-[#288A69] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#288A69]/90 hover:scale-105 hover:shadow-xl hover:shadow-[#288A69]/20 text-center">
                Reach Out
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Branch Network */}
    <SectionWrapper>
      <ScrollReveal>
        <div className="section-header mb-4">
          <span className="section-badge mb-4 inline-block" id="branches">OUR BRANCHES</span>
          <h2 className="section-title mt-4">
            Find a <span className="text-primary">Branch Near You</span>
          </h2>
          <p className="section-description max-w-xl">Visit any of our 12 branch offices across Ethiopia for in-person assistance.</p>
        </div>
      </ScrollReveal>
      
      <HoverBranchList />
    </SectionWrapper>

    {/* Contact Information Cards */}
    <SectionWrapper className="bg-accent/10">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-background overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="h-32 w-full overflow-hidden">
                <img src="https://images.pexels.com/photos/234140/pexels-photo-234140.jpeg" alt="Office Hours" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 relative flex flex-col min-h-[150px]">
                <span className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">Availability</span>
                <h3 className="font-heading font-semibold text-base text-foreground mb-2 leading-tight">Office Hours</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-1">Mon – Fri: 8:30 AM – 5:30 PM</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">Sat: 9:00 AM – 1:00 PM</p>
                
                <span className="absolute bottom-4 right-4 text-[10px] text-muted-foreground">WASS Insurance</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-xl border border-border bg-background overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="h-32 w-full overflow-hidden">
                <img src="https://images.pexels.com/photos/7709152/pexels-photo-7709152.jpeg" alt="Claims Hotline" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 relative flex flex-col min-h-[150px]">
                <span className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">Support</span>
                <h3 className="font-heading font-semibold text-base text-foreground mb-2 leading-tight">Claims Hotline</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-1">Available 24/7</p>
                <p className="text-[13px] text-foreground font-medium leading-relaxed">+251 11 123 4567</p>
                
                <span className="absolute bottom-4 right-4 text-[10px] text-muted-foreground">WASS Insurance</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="rounded-xl border border-border bg-background overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="h-32 w-full overflow-hidden">
                <img src="https://images.pexels.com/photos/6831054/pexels-photo-6831054.jpeg" alt="Emergency Support" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 relative flex flex-col min-h-[150px]">
                <span className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">Urgent</span>
                <h3 className="font-heading font-semibold text-base text-foreground mb-2 leading-tight">Emergency</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-1">Roadside assistance</p>
                <p className="text-[13px] text-foreground font-medium leading-relaxed">+251 91 123 4567</p>
                
                <span className="absolute bottom-4 right-4 text-[10px] text-muted-foreground">WASS Insurance</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </SectionWrapper>

    <ComplaintFeedbackSection />

    <div className="relative z-10"><ContactBlock /></div>
    <Footer />
  </div>
);

export default ContactPage;
