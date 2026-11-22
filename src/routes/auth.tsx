import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign in — A² Technologies" },
    { name: "description", content: "Sign in or create your personal A² Technologies learning account." },
    { property: "og:title", content: "Sign in — A² Technologies" },
    { property: "og:description", content: "Your personal A² Technologies learning account." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, follow" },
  ] }), component: AuthPage,
});
function AuthPage() {
  const { openLogin, closeLogin, user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    // Signed-in users belong on their account page; everyone else gets the sign-in dialog.
    if (user) { closeLogin(); void navigate({ to: "/account", replace: true }); }
    else openLogin();
  }, [user, loading]);
  return <section className="flex min-h-[65svh] items-center justify-center px-5 py-14 text-center"><div><GraduationCap className="mx-auto size-16 text-primary" /><h1 className="mt-6 text-3xl">A² Technologies</h1><p className="mt-3 text-muted-foreground">Learn from industry. Build for the future.</p><Button className="mt-7" onClick={openLogin}>{user ? "Your profile" : "Sign in"}</Button></div></section>;
}
