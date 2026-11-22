import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Neon serverless HTTP driver: one-shot queries over fetch, so it runs the same on
// Vercel and Cloudflare without managing a connection pool. Uses the pooled URL.
let sql: NeonQueryFunction<false, false> | undefined;

export function getSql() {
  if (!sql) {
    const url = process.env["DATABASE_URL"];
    if (!url) throw new Error("DATABASE_URL is not set. Add the Neon connection string to the environment.");
    sql = neon(url);
  }
  return sql;
}
