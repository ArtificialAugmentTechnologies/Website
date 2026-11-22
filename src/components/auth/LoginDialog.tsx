import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpen, GraduationCap, Lightbulb, Loader2, Mail, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "./AuthProvider";

type Mode = "signin" | "signup" | "forgot";

type AuthError = { message?: string; code?: string; status?: number } | null | undefined;

// Turn auth errors into messages that say what to do next.
function friendlyAuthError(error: AuthError | unknown) {
  const e = (error ?? {}) as { message?: string; code?: string };
  const text = `${e.code ?? ""} ${e.message ?? ""}`;
  if (/INVALID_EMAIL_OR_PASSWORD|invalid (email|password|login)/i.test(text)) return "Email or password is incorrect. Check them, use “Forgot password?”, or create an account.";
  if (/USER_ALREADY_EXISTS|already exists|already registered/i.test(text)) return "An account with this email already exists. Sign in instead.";
  if (/PASSWORD_TOO_SHORT|too short/i.test(text)) return "Your password must be at least 8 characters.";
  if (/INVALID_EMAIL\b/i.test(text)) return "Enter a valid email address.";
  if (/EMAIL_NOT_VERIFIED/i.test(text)) return "Please verify your email address before signing in.";
  return e.message || "Something went wrong. Please try again.";
}

export function LoginDialog() {
  const { user, loginOpen, openLogin, closeLogin, refresh } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginOpen) { setPassword(""); setError(""); setNotice(""); setMode("signin"); return; }
    // Signed-in users manage everything on their account page.
    if (user) { closeLogin(); void navigate({ to: "/account" }); }
  }, [loginOpen, user]);

  const changeMode = (next: Mode) => { setMode(next); setError(""); setNotice(""); setPassword(""); };

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      if (mode === "forgot") {
        const { error: resetError } = await authClient.requestPasswordReset({ email, redirectTo: `${window.location.origin}/reset-password` });
        if (resetError) throw resetError;
        setNotice("If an account exists for this email, a reset link is on its way. Check your inbox.");
      } else if (mode === "signup") {
        const { error: signupError } = await authClient.signUp.email({ email, password, name: name.trim() });
        if (signupError) throw signupError;
        await refresh();
        closeLogin();
        await navigate({ to: "/account" });
        toast.success("Logged in successfully");
      } else {
        const { error: signinError } = await authClient.signIn.email({ email, password });
        if (signinError) throw signinError;
        await refresh();
        closeLogin();
        toast.success("Logged in successfully");
      }
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  }

  async function googleLogin() {
    setBusy(true); setError("");
    try {
      // Google returns the user's name, email and photo; they land on their account page.
      const { error: oauthError } = await authClient.signIn.social({ provider: "google", callbackURL: `${window.location.origin}/account` });
      if (oauthError) throw oauthError;
    } catch (err) {
      console.error("[Auth] Google sign-in failed.", err);
      setError("Google sign-in could not be completed. Please try again.");
      setBusy(false);
    }
  }

  const title = mode === "signup" ? "Begin your journey" : mode === "forgot" ? "Reset your password" : "Welcome back";
  return (
    <Dialog open={loginOpen} onOpenChange={(open) => { if (!busy) { if (open) openLogin(); else closeLogin(); } }}>
      <DialogContent className="auth-dialog max-h-[90svh] w-[calc(100%-2rem)] max-w-[420px] overflow-y-auto rounded-lg border-border bg-card p-0 shadow-[var(--shadow-lift)]">
        <div className="auth-artwork surface-panel relative flex h-28 items-center justify-center gap-8 overflow-hidden rounded-t-lg" aria-hidden="true">
          <BookOpen className="auth-symbol size-9 text-accent" />
          <GraduationCap className="auth-symbol size-14 text-primary" />
          <Lightbulb className="auth-symbol size-8 text-accent" />
        </div>
        <div className="px-7 pb-7">
          <p className="mt-1 text-xs font-semibold text-secondary">A² Technologies</p>
          <DialogTitle className="mt-2 font-display text-2xl">{title}</DialogTitle>
          <DialogDescription className="mt-2">{mode === "signup" ? "Make your next chapter a great one." : mode === "forgot" ? "We’ll send a secure link to your email." : "Your next chapter starts here."}</DialogDescription>
          <form onSubmit={submit} className="mt-5 space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="auth-name">Display name</Label>
                <Input id="auth-name" autoComplete="name" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} disabled={busy} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="auth-email">Email address</Label>
              <Input id="auth-email" type="email" autoComplete="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={busy} />
            </div>
            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="auth-password">Password</Label>
                <div className="relative">
                  <Input id="auth-password" className="pr-12" type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={mode === "signup" ? 8 : undefined} required value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} />
                  <Button variant="ghost" size="icon" type="button" className="absolute right-0 top-0" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button>
                </div>
                {mode === "signup" && <p className="text-xs text-muted-foreground">At least 8 characters.</p>}
              </div>
            )}
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            {notice && <p role="status" className="flex items-start gap-2 text-sm text-secondary"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />{notice}</p>}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="animate-spin" /> : mode === "forgot" ? <Mail /> : <ArrowRight />}
              {mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}
            </Button>
          </form>
          {mode === "signin" && <Button variant="link" className="mt-1 h-8 w-full" onClick={() => changeMode("forgot")}>Forgot password?</Button>}
          {mode !== "forgot" && (
            <>
              <div className="my-3 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
              <Button variant="outline" className="w-full" disabled={busy} onClick={googleLogin}><span aria-hidden className="font-bold text-secondary">G</span>Continue with Google</Button>
            </>
          )}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to A²?" : mode === "signup" ? "Already have an account?" : "Remember your password?"}
            <Button variant="link" className="h-8 px-2" onClick={() => changeMode(mode === "signin" ? "signup" : "signin")}>{mode === "signin" ? "Create account" : "Sign in"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
