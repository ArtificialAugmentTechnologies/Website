import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const Route = createFileRoute("/reset-password")({ head: () => ({ meta: [
  { title: "Reset password — A² Technologies" }, { name: "description", content: "Securely reset your A² Technologies account password." },
  { property: "og:title", content: "Reset password — A² Technologies" }, { property: "og:description", content: "Set a new password for your learning account." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
] }), component: ResetPassword });
function ResetPassword() {
  const { recovery, user } = useAuth();
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const recovery = new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery";
    if (recovery) void supabase.auth.getUser().then(({ data }) => setValid(Boolean(data.user)));
  }, []);
  useEffect(() => { if (recovery && user) setValid(true); }, [recovery, user]);
  async function submit(e: FormEvent) {
    e.preventDefault(); setError("");
    if (password !== confirm) { setError("The passwords don’t match."); return; }
    setBusy(true);
    const { error: resetError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (resetError) setError(resetError.message); else setDone(true);
  }
  return <section className="mx-auto max-w-sm px-5 py-16"><KeyRound className="size-10 text-primary" /><h1 className="mt-5 text-2xl">Reset your password</h1>{done ? <><p className="mt-5 text-secondary" role="status">Your password has been updated.</p><Button asChild className="mt-5"><Link to="/auth">Return to sign in</Link></Button></> : !valid ? <><p className="mt-5 text-muted-foreground">Open the password reset link from your email. If it has expired, request a new one.</p><Button asChild className="mt-5"><Link to="/auth">Return to sign in</Link></Button></> : <form className="mt-6 space-y-4" onSubmit={submit}><Label htmlFor="new-password">New password</Label><Input id="new-password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} /><Label htmlFor="confirm-password">Confirm password</Label><Input id="confirm-password" type="password" autoComplete="new-password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} />{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button className="w-full" disabled={busy}>{busy && <Loader2 className="animate-spin" />}Update password</Button></form>}</section>;
}
