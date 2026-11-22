import { createServerFn } from "@tanstack/react-start";
import { requireUser } from "@/lib/auth-middleware";

type SyncResult = { id: string; email: string; loginCount: number; created: boolean };
type Json = Record<string, unknown>;

export type AccountDetails = {
  displayName: string | null;
  email: string;
  avatarUrl: string | null;
  provider: string;
  loginCount: number;
  memberSince: string;
  lastLoginAt: string;
};

const text = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : null);

async function db() {
  const { getSql } = await import("@/lib/neon.server");
  return getSql();
}

/**
 * Records the signed-in user in `site_users` (login count, last login).
 * Identity comes from Neon Auth's own `neon_auth.user` row for the verified token,
 * never from the browser. The upsert keys on the account id, so repeat logins
 * update one row instead of adding new ones.
 */
export const syncSignedInUser = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .handler(async ({ context }): Promise<SyncResult> => {
    const sql = await db();
    const users = (await sql`
      SELECT u.email, u.name, u.image,
             COALESCE((SELECT a."providerId" FROM neon_auth.account a WHERE a."userId" = u.id ORDER BY a."updatedAt" DESC LIMIT 1), 'credential') AS provider
      FROM neon_auth."user" u WHERE u.id = ${context.userId}`) as Array<{ email: string; name: string | null; image: string | null; provider: string }>;
    const user = users[0];
    if (!user) throw new Error("Signed-in account not found");
    const provider = user.provider === "credential" ? "email" : user.provider;

    const rows = (await sql`
      INSERT INTO site_users (id, email, display_name, auth_provider, avatar_url)
      VALUES (${context.userId}, ${user.email}, ${text(user.name)}, ${provider}, ${text(user.image)})
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        display_name = COALESCE(EXCLUDED.display_name, site_users.display_name),
        auth_provider = EXCLUDED.auth_provider,
        avatar_url = COALESCE(EXCLUDED.avatar_url, site_users.avatar_url),
        login_count = site_users.login_count + 1,
        last_login_at = now(),
        updated_at = now()
      RETURNING id, email, login_count, (xmax = 0) AS created`) as Array<{ id: string; email: string; login_count: number; created: boolean }>;
    const row = rows[0];
    if (!row) throw new Error("User upsert returned no row");
    return { id: row.id, email: row.email, loginCount: row.login_count, created: Boolean(row.created) };
  });

/** The signed-in user's own account details, or null if not recorded yet. */
export const getMyAccount = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .handler(async ({ context }): Promise<AccountDetails | null> => {
    const sql = await db();
    const rows = (await sql`
      SELECT display_name, email, avatar_url, auth_provider, login_count, created_at, last_login_at
      FROM site_users WHERE id = ${context.userId}`) as Array<{
      display_name: string | null; email: string; avatar_url: string | null; auth_provider: string;
      login_count: number; created_at: Date | string; last_login_at: Date | string;
    }>;
    const row = rows[0];
    if (!row) return null;
    return {
      displayName: row.display_name,
      email: row.email,
      avatarUrl: row.avatar_url,
      provider: row.auth_provider,
      loginCount: row.login_count,
      memberSince: new Date(row.created_at).toISOString(),
      lastLoginAt: new Date(row.last_login_at).toISOString(),
    };
  });

/** Saves a new display name to the signed-in user's `site_users` row. */
export const updateMyDisplayName = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator((input: unknown) => {
    const name = text((input as Json | null)?.["displayName"]);
    if (!name || name.length > 100) throw new Error("Display name must be 1–100 characters");
    return { displayName: name };
  })
  .handler(async ({ context, data }) => {
    const sql = await db();
    await sql`UPDATE site_users SET display_name = ${data.displayName}, updated_at = now() WHERE id = ${context.userId}`;
    return { ok: true };
  });
