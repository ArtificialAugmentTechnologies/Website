import type React from "react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { authClient, authConfigured } from "@/lib/auth-client";
import { syncSignedInUser } from "@/lib/user-sync";

export type AuthUser = { id: string; email: string; name: string; image: string | null; createdAt: string };

// Save the signed-in user to the Neon database once per browser session.
// The server upserts by account id, so this never creates duplicate users.
let pendingUserSync: Promise<unknown> = Promise.resolve();
/** Resolves once the current sign-in has been written to the database (used by the account page). */
export const userSyncSettled = () => pendingUserSync;
function recordSignedInUser(userId: string) {
  const key = `a2-user-synced:${userId}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // Storage blocked: still sync; the server-side upsert keeps it idempotent.
  }
  pendingUserSync = syncSignedInUser().catch((error) => {
    console.error("[Auth] Could not save user to database.", error);
    try { sessionStorage.removeItem(key); } catch { /* ignore */ }
  });
}
function forgetSyncedUsers() {
  try { Object.keys(sessionStorage).filter((k) => k.startsWith("a2-user-synced:")).forEach((k) => sessionStorage.removeItem(k)); } catch { /* ignore */ }
}

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  loginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  /** Re-reads the session after sign-in, sign-up or a profile change. */
  refresh: () => Promise<AuthUser | null>;
  signOut: () => Promise<void>;
};
// Keep one context instance across hot reloads so providers and consumers always match.
const globalStore = globalThis as typeof globalThis & { __a2AuthContext?: React.Context<AuthContextValue | null> };
const AuthContext = (globalStore.__a2AuthContext ??= createContext<AuthContextValue | null>(null));
const fallbackAuth: AuthContextValue = {
  user: null, loading: true, loginOpen: false, openLogin: () => {}, closeLogin: () => {},
  refresh: async () => null, signOut: async () => {},
};

function toAuthUser(raw: unknown): AuthUser | null {
  if (!raw || typeof raw !== "object") return null;
  const u = raw as Record<string, unknown>;
  if (typeof u["id"] !== "string" || typeof u["email"] !== "string") return null;
  const created = u["createdAt"];
  return {
    id: u["id"],
    email: u["email"],
    name: typeof u["name"] === "string" ? u["name"] : "",
    image: typeof u["image"] === "string" && u["image"] ? u["image"] : null,
    createdAt: created instanceof Date ? created.toISOString() : typeof created === "string" ? created : new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const refresh = useCallback(async () => {
    if (!authConfigured) { setUser(null); setLoading(false); return null; }
    try {
      const { data } = await authClient.getSession();
      const next = toAuthUser(data?.user);
      setUser(next);
      if (next) recordSignedInUser(next.id);
      return next;
    } catch (error) {
      console.error("[Auth] Failed to load session.", error);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Restore the session on load (also completes a Google sign-in redirect),
  // then continue to any page the user was heading to before signing in.
  useEffect(() => {
    void refresh().then((current) => {
      let destination: string | null = null;
      try { destination = sessionStorage.getItem("a2-auth-return"); } catch { /* ignore */ }
      if (current && destination) {
        try { sessionStorage.removeItem("a2-auth-return"); } catch { /* ignore */ }
        if (destination.startsWith("/") && !destination.startsWith("//") && !destination.includes("\\") && destination !== window.location.pathname) {
          void router.navigate({ href: destination });
        }
      }
    });
  }, [refresh, router]);

  const signOut = useCallback(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    try { await authClient.signOut(); } finally {
      forgetSyncedUsers();
      setUser(null);
      void router.invalidate();
    }
  }, [queryClient, router]);

  return (
    <AuthContext.Provider value={{ user, loading, loginOpen, openLogin: () => setLoginOpen(true), closeLogin: () => setLoginOpen(false), refresh, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    if (import.meta.env.DEV) console.warn("useAuth used outside AuthProvider; using signed-out fallback");
    return fallbackAuth;
  }
  return context;
}
