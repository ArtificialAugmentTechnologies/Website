import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { CalendarDays, Clock, Loader2, LogIn, LogOut, Mail, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAuth, userSyncSettled } from "@/components/auth/AuthProvider";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMyAccount, updateMyDisplayName, type AccountDetails } from "@/lib/user-sync";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — A² Technologies" },
      { name: "description", content: "Your personal A² Technologies learning account." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AccountPage,
});

const providerLabel = (provider: string) => (provider === "google" ? "Google" : provider === "email" ? "Email and password" : provider);
const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
const formatDateTime = (iso: string) => new Date(iso).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

function AccountPage() {
  const { user, loading, openLogin, refresh, signOut } = useAuth();
  const navigate = useNavigate();
  const [account, setAccount] = useState<AccountDetails | null>(null);
  const [fetching, setFetching] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!user) { setAccount(null); return; }
    let current = true;
    setFetching(true);
    // On a first login the database write may still be in flight; wait for it before reading.
    void userSyncSettled()
      .then(() => getMyAccount())
      .then((details) => {
        if (!current) return;
        setAccount(details);
        setName(details?.displayName ?? user.name ?? "");
      })
      .catch((error) => { console.error("[Account] Could not load account.", error); setName(user.name ?? ""); })
      .finally(() => { if (current) setFetching(false); });
    return () => { current = false; };
  }, [user?.id]);

  async function saveName(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: name.trim() });
      if (error) throw new Error(error.message || "Could not save your name.");
      await updateMyDisplayName({ data: { displayName: name } });
      setAccount((prev) => (prev ? { ...prev, displayName: name.trim() } : prev));
      await refresh();
      toast.success("Your name has been saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your name.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      toast.success("You have been signed out.");
      await navigate({ to: "/", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not sign out.");
    } finally {
      setSigningOut(false);
    }
  }

  if (loading) {
    return <section className="flex min-h-[60svh] items-center justify-center"><Loader2 className="size-8 animate-spin text-primary" aria-label="Loading your account" /></section>;
  }

  if (!user) {
    return (
      <>
        <PageHeader eyebrow="Account" title="Sign in to see your account" description="Your account page is available once you sign in." />
        <section className="mx-auto flex max-w-xl flex-col items-center px-5 py-16 text-center">
          <UserRound className="size-14 text-primary" aria-hidden />
          <p className="mt-5 text-muted-foreground">Sign in with your email or Google account, or create a new account to get started.</p>
          <Button className="mt-7" size="lg" onClick={() => { try { sessionStorage.setItem("a2-auth-return", "/account"); } catch { /* ignore */ } openLogin(); }}>
            <LogIn aria-hidden /> Sign in or create account
          </Button>
        </section>
      </>
    );
  }

  const avatar = account?.avatarUrl ?? user.image;
  const displayName = account?.displayName || user.name || user.email;
  const initial = displayName.trim().charAt(0).toUpperCase() || "?";

  return (
    <>
      <PageHeader eyebrow="Your account" title={`Welcome, ${displayName}`} description="Manage your A² Technologies learning account." />
      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-[18rem_1fr] lg:px-8">
        <aside className="rounded-lg border border-border bg-card p-6 text-center shadow-[var(--shadow-lift)]">
          {avatar ? (
            <img src={avatar} alt="" referrerPolicy="no-referrer" className="mx-auto size-24 rounded-full object-cover ring-2 ring-primary/40" />
          ) : (
            <span className="mx-auto grid size-24 place-items-center rounded-full bg-primary text-3xl font-bold text-primary-foreground" aria-hidden>{initial}</span>
          )}
          <p className="mt-4 break-words font-display text-xl">{displayName}</p>
          <p className="mt-1 break-all text-sm text-muted-foreground">{user.email}</p>
          <Button variant="outline" className="mt-6 w-full" onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? <Loader2 className="animate-spin" /> : <LogOut aria-hidden />} Sign out
          </Button>
        </aside>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg">Account details</h2>
            {fetching && !account ? (
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" /> Loading…</p>
            ) : (
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <Detail icon={<Mail className="size-4" />} label="Email" value={user.email} />
                <Detail icon={<ShieldCheck className="size-4" />} label="Signed in with" value={providerLabel(account?.provider ?? "email")} />
                <Detail icon={<CalendarDays className="size-4" />} label="Member since" value={formatDate(account?.memberSince ?? user.createdAt)} />
                <Detail icon={<Clock className="size-4" />} label="Last sign-in" value={account ? formatDateTime(account.lastLoginAt) : "—"} />
              </dl>
            )}
          </div>

          <form onSubmit={saveName} className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg">Profile</h2>
            <div className="mt-4 space-y-2">
              <Label htmlFor="account-name">Display name</Label>
              <Input id="account-name" autoComplete="name" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} disabled={saving} />
            </div>
            <Button type="submit" className="mt-4" disabled={saving || !name.trim()}>
              {saving ? <Loader2 className="animate-spin" /> : <UserRound aria-hidden />} Save profile
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

function Detail({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{icon}{label}</dt>
      <dd className="mt-1 break-words text-sm">{value}</dd>
    </div>
  );
}
