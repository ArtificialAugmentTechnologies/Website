import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getAuthToken } from "@/lib/auth-client";

/**
 * Server-function middleware for signed-in users.
 * Client side: attaches the Neon Auth JWT as a Bearer token.
 * Server side: verifies it against the branch JWKS and issuer, then exposes `userId`.
 */
export const requireUser = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    const token = await getAuthToken();
    return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
  })
  .server(async ({ next }) => {
    const { verifyAuthToken } = await import("@/lib/auth-verify.server");
    const header = getRequest()?.headers.get("authorization") ?? "";
    if (!header.toLowerCase().startsWith("bearer ")) throw new Error("Unauthorized: sign in first");
    const userId = await verifyAuthToken(header.slice(7));
    return next({ context: { userId } });
  });
