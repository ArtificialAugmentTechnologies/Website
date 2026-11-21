<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Decorative 3D artwork is lazy-loaded after hydration in the existing homepage, while page content stays server-rendered, to keep navigation and SEO independent of WebGL.
- The homepage technology orbit uses separate server-rendered CSS ring lists with counter-rotating labels and the shared motion pause state, so concentric tracks remain independent of WebGL and navigation.
- Shared motion uses a document-level pause state and respects reduced-motion preferences; Three.js materials read semantic CSS tokens to preserve the brand palette.
- Shared logo marks use AnimatedBrandIcon's faithful vector tracing rather than separate animation overlays, keeping the line and arrow aligned at every size.
- Page-entry introductions use the supplied GIF in one root-mounted wrapper, restart on navigation to configured public pages, and dismiss after four seconds or on skip/error; underlying server-rendered content stays mounted but inert during the introduction.

- Authentication uses one shared provider and one root-mounted dialog; the public auth and recovery routes reuse this session to avoid competing listeners.
- User-facing profile data lives in owner-scoped public.profiles and is created by the signup trigger; authorization roles must never be placed in profiles.
- Theme switching uses `data-theme` on `<html>` (set before paint from saved choice) with a system `prefers-color-scheme` fallback, and the Tailwind `dark` variant mirrors the same selectors, so CSS tokens and `dark:` utilities never disagree.
