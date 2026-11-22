> [!IMPORTANT]
> Avoid rewriting published git history (force pushing, or rebasing/amending/squashing
> commits that are already pushed). Keep pushed branches in a working state; Vercel deploys from them.

- Decorative 3D artwork is lazy-loaded after hydration in the existing homepage, while page content stays server-rendered, to keep navigation and SEO independent of WebGL.
- The homepage technology orbit uses separate server-rendered CSS ring lists with counter-rotating labels and the shared motion pause state, so concentric tracks remain independent of WebGL and navigation.
- Shared motion uses a document-level pause state and respects reduced-motion preferences; Three.js materials read semantic CSS tokens to preserve the brand palette.
- Shared logo marks use AnimatedBrandIcon's faithful vector tracing rather than separate animation overlays, keeping the line and arrow aligned at every size.
- Page-entry introductions use the supplied GIF in one root-mounted wrapper, restart on navigation to configured public pages, and dismiss after four seconds or on skip/error; underlying server-rendered content stays mounted but inert during the introduction.

- Backend is Neon (project "Artificial Augment Technologies", database `artificial_augment_technologies`). `neon.ts` declares the services; `.neon` links the branch; `neon env pull` writes `.env`.
- Authentication is Neon Auth (Managed Better Auth) via `@neon/auth` in `src/lib/auth-client.ts`, with one shared `AuthProvider` and one root-mounted `LoginDialog`. Users and sessions live in the `neon_auth` schema; trusted domains are managed with `neon neon-auth domain`.
- Server functions that need a signed-in user use `requireUser` (`src/lib/auth-middleware.ts`): the browser sends the Neon Auth JWT, the server verifies it against `NEON_AUTH_JWKS_URL`. Never trust user ids sent from the browser.
- App tables (`site_users`, `applications`, `contact_messages`) are managed as SQL migrations in `neon/migrations`, applied with `npm run db:migrate` over the direct (unpooled) connection. App queries use the pooled `DATABASE_URL` through `src/lib/neon.server.ts`.
- Theme switching uses `data-theme` on `<html>` (set before paint from saved choice) with a system `prefers-color-scheme` fallback, and the Tailwind `dark` variant mirrors the same selectors, so CSS tokens and `dark:` utilities never disagree.
