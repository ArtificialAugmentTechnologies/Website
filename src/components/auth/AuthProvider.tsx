import type React from "react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = { user: User | null; loading: boolean; recovery: boolean; loginOpen: boolean; openLogin: () => void; closeLogin: () => void };
// Keep one context instance across hot reloads so providers and consumers always match.
const globalStore = globalThis as typeof globalThis & { __a2AuthContext?: React.Context<AuthContextValue | null> };
const AuthContext = (globalStore.__a2AuthContext ??= createContext<AuthContextValue | null>(null));
const fallbackAuth: AuthContextValue = { user: null, loading: true, recovery: false, loginOpen: false, openLogin: () => {}, closeLogin: () => {} };
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recovery, setRecovery] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    let live = true;
    const refresh = () => {
      void supabase.auth.getUser().then(({ data }) => {
        if (live) {
          setUser(data.user); setLoading(false);
          const destination = sessionStorage.getItem("a2-auth-return");
          if (data.user && destination) {
            sessionStorage.removeItem("a2-auth-return");
            if (destination.startsWith("/") && !destination.startsWith("//") && !destination.includes("\\")) void router.navigate({ href: destination });
          }
        }
      });
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") { setRecovery(true); setTimeout(refresh, 0); return; }
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      if (event === "SIGNED_OUT") { setUser(null); setRecovery(false); queryClient.clear(); }
      else { setTimeout(refresh, 0); void queryClient.invalidateQueries(); }
      void router.invalidate();
    });
    refresh();
    return () => { live = false; subscription.unsubscribe(); };
  }, [queryClient, router]);
  return <AuthContext.Provider value={{ user, loading, recovery, loginOpen, openLogin: () => setLoginOpen(true), closeLogin: () => setLoginOpen(false) }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    if (import.meta.env.DEV) console.warn("useAuth used outside AuthProvider; using signed-out fallback");
    return fallbackAuth;
  }
  return context;
}
