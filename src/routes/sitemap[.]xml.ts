import { createFileRoute } from "@tanstack/react-router";

import { courses } from "@/data/courses";
import { news } from "@/data/content";

const staticPaths = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/courses", priority: "0.9" },
  { path: "/admissions", priority: "0.9" },
  { path: "/faculty", priority: "0.7" },
  { path: "/events", priority: "0.7" },
  { path: "/news", priority: "0.7" },
  { path: "/gallery", priority: "0.5" },
  { path: "/contact", priority: "0.7" },
  { path: "/faq", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = [
          ...staticPaths.map((p) => ({ loc: origin + p.path, priority: p.priority })),
          ...courses.map((c) => ({ loc: `${origin}/courses/${c.slug}`, priority: "0.8" })),
          ...news.map((n) => ({ loc: `${origin}/news/${n.slug}`, priority: "0.6" })),
        ];

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>`;

        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
