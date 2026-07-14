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
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import brokerIcon1 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_01.png";
import brokerIcon2 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_02.png";
import brokerIcon3 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_03.png";
import brokerIcon4 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_04.png";
import brokerIcon5 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_05.png";
import brokerIcon6 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_06.png";
import brokerIcon7 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_07.png";
import brokerIcon8 from "@/assets/ChannelsHero/separated_finance_icons_blue/finance_icon_08.png";
import wiaIcon1 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_01.png";
import wiaIcon2 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_02.png";
import wiaIcon3 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_03.png";
import wiaIcon4 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_04.png";
import wiaIcon5 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_05.png";
import wiaIcon6 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_06.png";
import wiaIcon7 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_07.png";
import wiaIcon8 from "@/assets/ChannelsHero/separated_green_finance_icons(2)/green_finance_icon_08.png";
import wiaHeroBg from "@/assets/ChannelsHero/ChatGPT Image Jul 14, 2026, 11_07_50 AM.webp";
import brokerHeroBg from "@/assets/ChannelsHero/ChatGPT Image Jul 14, 2026, 11_01_40 AM.webp";

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

const heroImages = {
  // Each channel uses a blended blue-and-green set. The image choices are unique
  // across the two pages, so the two hero scenes never repeat the same asset.
  wia: [wiaIcon1, brokerIcon1, wiaIcon2, brokerIcon2, wiaIcon3, brokerIcon3, wiaIcon4, brokerIcon4],
  broker: [brokerIcon5, wiaIcon5, brokerIcon6, wiaIcon6, brokerIcon7, wiaIcon7, brokerIcon8, wiaIcon8],
};

const heroImagePositions = [
  "left-[3%] top-[19%] h-20 w-20 md:h-28 md:w-28",
  "left-[14%] top-[55%] h-16 w-16 md:h-24 md:w-24",
  "left-[28%] top-[10%] h-14 w-14 md:h-20 md:w-20",
  "left-[31%] bottom-[9%] h-14 w-14 md:h-20 md:w-20",
  "right-[3%] top-[20%] h-20 w-20 md:h-28 md:w-28",
  "right-[14%] top-[55%] h-16 w-16 md:h-24 md:w-24",
  "right-[28%] top-[10%] h-14 w-14 md:h-20 md:w-20",
  "right-[31%] bottom-[9%] h-14 w-14 md:h-20 md:w-20",
];

const ChannelPage = ({ kind }: { kind: ChannelKind }) => {
  const content = channelContent[kind];

  return (
    <div className="min-h-screen bg-[#FBFAFA]">
      <Navbar />
      <section className="relative flex min-h-screen overflow-hidden bg-[#FBFAFA]">
        {/* Background image per channel */}
        <img
          src={kind === "wia" ? wiaHeroBg : brokerHeroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ transform: kind === "wia" ? "translateY(6%)" : "translateY(15%)" }}
          fetchPriority="high"
          loading="eager"
        />
        <div className="container relative z-10 mx-auto flex min-h-screen flex-col px-4 lg:px-8">
          <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-0 py-24 text-center">
            <div className="flex w-full max-w-4xl flex-col items-center">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#288A69]/10 text-[#288A69] hover:bg-[#288A69]/20 mb-6">
                {content.badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[hsl(201,78%,20%)] mb-6 max-w-4xl">
                {content.title}
              </h1>
              <p className="text-xl font-semibold text-[hsl(160,55%,35%)]">
                {content.subtitle}
              </p>
              <p className="mt-4 max-w-2xl text-base md:text-xl leading-relaxed text-gray-600">
                {content.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="portal" className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto w-full max-w-2xl rounded-lg border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(11,63,91,0.10)]">
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
                <Label>{content.loginLabel}</Label>
                <div className="flex items-center gap-3 rounded-md border border-input bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-gray-400" />
                  Sign in securely with your email and password
                </div>
              </div>
              <Link
                to={`/auth?redirect=${encodeURIComponent(kind === "wia" ? "/portal/wia" : "/portal/broker")}`}
                className="mt-5 block w-full rounded-lg bg-[hsl(201,78%,20%)] px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[hsl(201,78%,28%)]"
              >
                Continue to login
              </Link>
          </div>
        </div>
      </section>

      {content.showBenefits && (
        <SectionWrapper id="apply" className="bg-white">
          <ScrollReveal>
            <div className="mb-8 max-w-3xl">
              <span className="section-badge mb-4 inline-block">BECOME A WIA AGENT</span>
              <h2 className="section-title text-foreground">
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
            <CTAButton href="/agents/apply" className="mt-5">Apply Now</CTAButton>
          </div>
        </SectionWrapper>
      )}

      <SectionWrapper className="bg-[hsl(201,78%,98%)]">
        <ScrollReveal>
          <div className="mb-8 max-w-3xl">
            <span className="section-badge mb-4 inline-block">PORTAL CAPABILITIES</span>
            <h2 className="section-title text-foreground">
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
