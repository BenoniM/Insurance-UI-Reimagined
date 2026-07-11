import {
  Award,
  CheckCircle,
  FileText,
  GraduationCap,
  KeyRound,
  LineChart,
  Mail,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import ScrollReveal from "@/components/ScrollReveal";
import CTAButton from "@/components/CTAButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const sharedPortalActions = [
  "Request Quote",
  "Buy Insurance on behalf of their client",
  "Renew their client's policies",
  "Pay Premium",
  "View Commission Statement",
  "Claims Tracking",
  "Download Policy Documents",
];

const wiaBenefits = [
  { title: "Competitive Commission", icon: Award },
  { title: "Training & Certification in collaboration with NBE", icon: GraduationCap },
  { title: "Digital Selling Platform", icon: Smartphone },
  { title: "Business Growth Opportunity", icon: LineChart },
];

const channelContent = {
  wia: {
    badge: "CHANNELS",
    title: "WIA - Wass Insurance Agents",
    subtitle: "Join Ethiopia's fastest-growing insurance distribution network.",
    intro:
      "WIA helps motivated agents grow a modern insurance business with digital tools, product support, certification guidance, and a clear commission opportunity.",
    portalTitle: "WIA Agent Portal",
    portalIntro: "Agents can sign in with their email to manage customer insurance activity from one digital workspace.",
    loginLabel: "Agent Email",
    loginPlaceholder: "agent@example.com",
    actions: sharedPortalActions,
    showBenefits: true,
  },
  broker: {
    badge: "CHANNELS",
    title: "Broker Portal",
    subtitle: "A dedicated digital workspace for insurance brokers.",
    intro:
      "The Broker Portal gives brokers a streamlined way to request quotes, place business, manage renewals, track claims, and support clients across the policy lifecycle.",
    portalTitle: "Broker Portal Login",
    portalIntro: "Brokers can sign in with their email to access client policy, premium, commission, and document tools.",
    loginLabel: "Broker Email",
    loginPlaceholder: "broker@example.com",
    actions: sharedPortalActions.map((item) => item.replace(" on behalf of their client", "")),
    showBenefits: false,
  },
};

type ChannelKind = keyof typeof channelContent;

const actionIcons = [FileText, ShieldCheck, RefreshCw, WalletCards, LineChart, KeyRound, FileText];

const ChannelPage = ({ kind }: { kind: ChannelKind }) => {
  const content = channelContent[kind];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-14 bg-[hsl(201,78%,98%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="section-badge mb-5 inline-block">{content.badge}</span>
              <h1 className="font-hero text-4xl md:text-6xl leading-tight text-[hsl(201,78%,20%)]">
                {content.title}
              </h1>
              <p className="mt-5 text-xl font-semibold text-[hsl(160,55%,35%)]">
                {content.subtitle}
              </p>
              <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">
                {content.intro}
              </p>
              {kind === "wia" && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <CTAButton href="#apply" size="lg">Apply Now</CTAButton>
                  <CTAButton href="#portal" variant="outline" size="lg">Agent Login</CTAButton>
                </div>
              )}
            </div>

            <div id="portal" className="rounded-lg border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(11,63,91,0.10)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(160,55%,45%)] text-white">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-[hsl(201,78%,20%)]">
                    {content.portalTitle}
                  </h2>
                  <p className="text-sm text-gray-500">Login</p>
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-gray-600">{content.portalIntro}</p>
              <div className="space-y-2">
                <Label htmlFor={`${kind}-email`}>{content.loginLabel}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input id={`${kind}-email`} type="email" placeholder={content.loginPlaceholder} className="pl-10" />
                </div>
              </div>
              <button
                type="button"
                className="mt-5 w-full rounded-lg bg-[hsl(201,78%,20%)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[hsl(201,78%,28%)]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </section>

      {content.showBenefits && (
        <SectionWrapper id="apply" className="bg-white">
          <ScrollReveal>
            <div className="mb-8 max-w-3xl">
              <span className="section-badge mb-4 inline-block">BECOME A WIA AGENT</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Build your insurance business with WASS
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {wiaBenefits.map((benefit) => (
              <div key={benefit.title} className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
                <benefit.icon className="mb-4 h-7 w-7 text-[hsl(160,55%,45%)]" />
                <h3 className="font-heading text-base font-bold text-[hsl(201,78%,20%)]">{benefit.title}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-dashed border-[hsl(160,55%,45%)] bg-[hsl(160,55%,97%)] p-6">
            <h3 className="font-heading text-xl font-bold text-[hsl(201,78%,20%)]">Online Agent Registration Form</h3>
            <p className="mt-2 text-gray-600">
              Use the application form to register interest. The WASS channels team will review your details and guide you through onboarding.
            </p>
            <CTAButton href="/contact" className="mt-5">Apply Now</CTAButton>
          </div>
        </SectionWrapper>
      )}

      <SectionWrapper className="bg-[hsl(201,78%,98%)]">
        <ScrollReveal>
          <div className="mb-8 max-w-3xl">
            <span className="section-badge mb-4 inline-block">PORTAL CAPABILITIES</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              What users can do
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.actions.map((action, index) => {
            const Icon = actionIcons[index] || CheckCircle;
            return (
              <div key={action} className="flex gap-3 rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(160,55%,45%)]" />
                <span className="font-medium text-[hsl(201,78%,20%)]">{action}</span>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default ChannelPage;
