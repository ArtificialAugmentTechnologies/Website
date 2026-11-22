import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Eye, EyeOff, KeyRound, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/components/auth/AuthProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — A² Technologies" },
      { name: "description", content: "Securely reset your A² Technologies account password." },
      { property: "og:title", content: "Reset password — A² Technologies" },
      { property: "og:description", content: "Set a new password for your learning account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const { openLogin } = useAuth();
  const navigate = useNavigate();
  // The email link arrives as /reset-password?token=… (or ?error=INVALID_TOKEN when expired or used).
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("error") ? null : params.get("token"));
    setChecked(true);
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!token) return;
    if (password.length < 8) { setError("Your new password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("The two passwords don't match."); return; }
    setBusy(true);
    const { error: resetError } = await authClient.resetPassword({ newPassword: password, token });
    setBusy(false);
    if (resetError) {
      setError(/INVALID_TOKEN|expired|invalid/i.test(`${resetError.code ?? ""} ${resetError.message ?? ""}`)
        ? "This reset link has expired or was already used. Request a new one with “Forgot password?”."
        : resetError.message || "Your password could not be changed. Please try again.");
      return;
    }
    toast.success("Password changed successfully. Sign in with your new password.");
    await navigate({ to: "/", replace: true });
    openLogin();
  }

  return (
    <>
      <PageHeader eyebrow="Account" title="Reset your password" description="Choose a new password for your A² Technologies account." />
      <section className="mx-auto max-w-md px-5 py-14">
        <div className="rounded-lg border border-border bg-card p-7 shadow-[var(--shadow-lift)]">
          <KeyRound className="size-10 text-primary" aria-hidden />
          {!checked ? (
            <p className="mt-5 flex items-center gap-2 text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Checking your reset link…</p>
          ) : !token ? (
            <>
              <h2 className="mt-5 font-display text-xl">This link isn't valid</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The reset link has expired or was already used. Open the sign-in window, choose “Forgot password?” and we'll email you a new one.
              </p>
              <Button className="mt-6 w-full" onClick={() => { void navigate({ to: "/" }); openLogin(); }}>Back to sign in</Button>
            </>
          ) : (
            <form className="mt-5 space-y-4" onSubmit={submit}>
              <h2 className="font-display text-xl">Set a new password</h2>
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <div className="relative">
                  <Input id="new-password" className="pr-12" type={show ? "text" : "password"} autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} />
                  <Button variant="ghost" size="icon" type="button" className="absolute right-0 top-0" aria-label={show ? "Hide passwords" : "Show passwords"} onClick={() => setShow(!show)}>
                    {show ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">At least 8 characters.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm new password</Label>
                <Input id="confirm-password" type={show ? "text" : "password"} autoComplete="new-password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} disabled={busy} />
              </div>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? <Loader2 className="animate-spin" /> : <Save aria-hidden />} Save new password
              </Button>
              <p className="text-center text-sm text-muted-foreground"><Link to="/" className="underline-offset-4 hover:underline">Cancel</Link></p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
