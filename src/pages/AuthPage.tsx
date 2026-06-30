import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

type Mode = "login" | "signup" | "forgot";

const redirectLabels: Record<string, { en: string; am: string }> = {
  "/payments": { en: "to view your payments", am: "ክፍያዎችዎን ለማየት" },
  "/payments/new": { en: "to make a payment", am: "ክፍያ ለማድረግ" },
  "/claims/new": { en: "to file a claim", am: "የይገባኛል ጥያቄ ለማቅረብ" },
  "/dashboard": { en: "to view your dashboard", am: "ዳሽቦርድዎን ለማየት" },
};

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // If the person is already signed in, don't make them log in again —
  // send them straight to wherever they were headed.
  useEffect(() => {
    if (!authLoading && user) navigate(redirectTo, { replace: true });
  }, [user, authLoading, navigate, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/auth",
        });
        if (error) throw error;
        setResetSent(true);
      } else if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "You have been logged in successfully." });
        navigate(redirectTo, { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin + redirectTo,
          },
        });
        if (error) throw error;
        toast({ title: "Account created!", description: "Please check your email to verify your account." });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const redirectLabel = redirectLabels[redirectTo];

  if (mode === "forgot" && resetSent) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-28 pb-16 min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-card border border-border rounded-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h1 className="font-heading text-xl font-bold mb-2">Check your email</h1>
              <p className="text-sm text-muted-foreground mb-6">
                If an account exists for <strong>{email}</strong>, we've sent a link to reset your password.
              </p>
              <Button variant="outline" className="w-full" onClick={() => { setMode("login"); setResetSent(false); }}>
                Back to login
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 max-w-md">
          <div
            className="bg-card border border-border rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-5 duration-500"
          >
            <h1 className="font-heading text-2xl font-bold text-foreground text-center mb-2">
              {mode === "login" ? t("auth.login") : mode === "signup" ? t("auth.signup") : "Reset your password"}
            </h1>
            {redirectLabel && mode !== "forgot" && (
              <p className="text-center text-sm text-muted-foreground mb-6">
                Sign in {redirectLabel.en} — it only takes a moment.
              </p>
            )}
            {mode === "forgot" && (
              <p className="text-center text-sm text-muted-foreground mb-6">
                Enter your email and we'll send you a link to reset your password.
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{t("auth.fullName")}</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("auth.fullName")}
                    required
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{t("auth.email")}</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  autoFocus
                />
              </div>
              {mode !== "forgot" && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-foreground">{t("auth.password")}</label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {mode === "signup" && (
                    <p className="text-xs text-muted-foreground mt-1">At least 6 characters.</p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full teal-gradient text-primary-foreground" disabled={loading}>
                {loading
                  ? t("common.loading")
                  : mode === "login"
                  ? t("auth.login")
                  : mode === "signup"
                  ? t("auth.signup")
                  : "Send reset link"}
              </Button>
            </form>

            {mode === "forgot" ? (
              <p className="text-center text-sm text-muted-foreground mt-6">
                <button onClick={() => setMode("login")} className="text-primary font-medium hover:underline">
                  Back to login
                </button>
              </p>
            ) : (
              <p className="text-center text-sm text-muted-foreground mt-6">
                {mode === "login" ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
                <button
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-primary font-medium hover:underline"
                >
                  {mode === "login" ? t("auth.signup") : t("auth.login")}
                </button>
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AuthPage;