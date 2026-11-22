import { createRemoteJWKSet, jwtVerify } from "jose";

let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;

/** Verifies a Neon Auth JWT and returns the user id (`sub`). Throws when invalid or expired. */
export async function verifyAuthToken(token: string): Promise<string> {
  const jwksUrl = process.env["NEON_AUTH_JWKS_URL"];
  const baseUrl = process.env["NEON_AUTH_BASE_URL"];
  if (!jwksUrl || !baseUrl) throw new Error("Neon Auth is not configured on the server (NEON_AUTH_JWKS_URL / NEON_AUTH_BASE_URL).");
  jwks ??= createRemoteJWKSet(new URL(jwksUrl));
  try {
    const { payload } = await jwtVerify(token, jwks, { issuer: new URL(baseUrl).origin });
    if (!payload.sub) throw new Error("missing sub");
    return payload.sub;
  } catch {
    throw new Error("Unauthorized: invalid or expired session");
  }
}
