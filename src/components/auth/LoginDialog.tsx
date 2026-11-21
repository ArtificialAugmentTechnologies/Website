import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, BookOpen, GraduationCap, Lightbulb, Loader2, LogOut, Mail, Eye, EyeOff, CheckCircle2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "./AuthProvider";

type Mode = "signin" | "signup" | "forgot";
export function LoginDialog() {
  const { user, loginOpen, openLogin, closeLogin } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!loginOpen) { setPassword(""); setError(""); setNotice(""); setMode("signin"); return; }
    if (!user) return;
    let current = true;
    setProfileLoading(true);
    void supabase.from("profiles").select("display_name").eq("id", user.id).single().then(({ data, error: readError }) => {
      if (!current) return;
      if (readError) setError("Your profile could not be loaded. Please reopen this window.");
      else setName(data.display_name);
      setProfileLoading(false);
    });
    return () => { current = false; };
  }, [loginOpen, user?.id]);
  const changeMode = (next: Mode) => { setMode(next); setError(""); setNotice(""); setPassword(""); };
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      if (user) {
        const { error: saveError } = await supabase.from("profiles").update({ display_name: name.trim() }).eq("id", user.id).select("id").single();
        if (saveError) throw saveError;
        setNotice("Your profile has been saved.");
      } else if (mode === "forgot") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (resetError) throw resetError;
        setNotice("If an account exists for this email, a reset link will arrive shortly.");
      } else if (mode === "signup") {
        const { data, error: signupError } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin, data: { display_name: name.trim() } } });
        if (signupError) throw signupError;
        if (data.session) { closeLogin(); toast.success("Your account is ready."); }
        else setNotice("Check your email and confirm your account before signing in.");
      } else {
        const { error: signinError } = await supabase.auth.signInWithPassword({ email, password });
        if (signinError) throw signinError;
        closeLogin(); toast.success("Welcome back to A² Technologies.");
      }
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong. Please try again."); }
    finally { setBusy(false); }
  }
  async function googleLogin() {
    setBusy(true); setError("");
    try {
      sessionStorage.setItem("a2-auth-return", window.location.pathname + window.location.search);
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
      if (result.error) throw result.error;
      if (!result.redirected) closeLogin();
    } catch { setError("Google sign-in could not be completed. Please try again."); }
    finally { setBusy(false); }
  }
  async function signOut() {
    setBusy(true);
    await queryClient.cancelQueries(); queryClient.clear();
    const { error: signoutError } = await supabase.auth.signOut();
    setBusy(false);
    if (signoutError) { setError(signoutError.message); return; }
    closeLogin(); await navigate({ to: "/auth", replace: true }); openLogin();
  }
  const title = user ? "Your profile" : mode === "signup" ? "Begin your journey" : mode === "forgot" ? "Reset your password" : "Welcome back";
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
          <DialogDescription className="mt-2">{user ? "Your personal learning account." : mode === "signup" ? "Make your next chapter a great one." : mode === "forgot" ? "We’ll send a secure link to your email." : "Your next chapter starts here."}</DialogDescription>
          {user && <p className="mt-3 break-all text-sm text-muted-foreground">{user.email}</p>}
          <form onSubmit={submit} className="mt-5 space-y-4">
            {(user || mode === "signup") && <div className="space-y-2"><Label htmlFor="auth-name">Display name</Label><Input id="auth-name" autoComplete="name" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} disabled={profileLoading || busy} /></div>}
            {!user && <div className="space-y-2"><Label htmlFor="auth-email">Email address</Label><Input id="auth-email" type="email" autoComplete="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={busy} /></div>}
            {!user && mode !== "forgot" && <div className="space-y-2"><Label htmlFor="auth-password">Password</Label><div className="relative"><Input id="auth-password" className="pr-12" type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={mode === "signup" ? 8 : undefined} required value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} /><Button variant="ghost" size="icon" type="button" className="absolute right-0 top-0" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button></div>{mode === "signup" && <p className="text-xs text-muted-foreground">At least 8 characters.</p>}</div>}
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            {notice && <p role="status" className="flex items-start gap-2 text-sm text-secondary"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />{notice}</p>}
            <Button type="submit" className="w-full" disabled={busy || profileLoading}>{busy ? <Loader2 className="animate-spin" /> : user ? <UserRound /> : mode === "forgot" ? <Mail /> : <ArrowRight />}{user ? "Save profile" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}</Button>
          </form>
          {user ? <Button variant="outline" className="mt-3 w-full" disabled={busy} onClick={signOut}><LogOut />Sign out</Button> : <>
            {mode === "signin" && <Button variant="link" className="mt-1 h-8 w-full" onClick={() => changeMode("forgot")}>Forgot password?</Button>}
            {mode !== "forgot" && <><div className="my-3 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div><Button variant="outline" className="w-full" disabled={busy} onClick={googleLogin}><span aria-hidden className="font-bold text-secondary">G</span>Continue with Google</Button></>}
            <div className="mt-4 text-center text-sm text-muted-foreground">{mode === "signin" ? "New to A²?" : mode === "signup" ? "Already have an account?" : "Remember your password?"}<Button variant="link" className="h-8 px-2" onClick={() => changeMode(mode === "signin" ? "signup" : "signin")}>{mode === "signin" ? "Create account" : "Sign in"}</Button></div>
          </>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
