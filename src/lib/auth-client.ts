import { createAuthClient } from "@neon/auth";

// Neon Auth (Managed Better Auth). Users and sessions live in the `neon_auth`
// schema of the project's own Neon database.
const AUTH_URL = import.meta.env["VITE_NEON_AUTH_URL"] as string | undefined;

if (!AUTH_URL && typeof window !== "undefined") {
  console.error("[Auth] VITE_NEON_AUTH_URL is not set; sign-in is unavailable.");
}

export const authClient = createAuthClient(AUTH_URL ?? "http://localhost/auth-not-configured");

export const authConfigured = Boolean(AUTH_URL);

/** Short-lived JWT for the signed-in user, sent to server functions as a Bearer token. */
export async function getAuthToken(): Promise<string | null> {
  if (!authConfigured) return null;
  try {
    const { data } = await authClient.token();
    return data?.token ?? null;
  } catch {
    return null;
  }
}
