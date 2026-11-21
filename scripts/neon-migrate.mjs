// Applies neon/migrations/*.sql to the Neon database in filename order, once each.
// Uses the direct (unpooled) connection, as Neon recommends for schema changes.
// Run with: npm run db:migrate
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { Pool } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL_UNPOOLED (or DATABASE_URL) is not set. Run `neon env pull` first.");
  process.exit(1);
}

const dir = join(process.cwd(), "neon", "migrations");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();
const pool = new Pool({ connectionString: url });

try {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS _neon_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())",
  );
  const { rows } = await pool.query("SELECT name FROM _neon_migrations");
  const applied = new Set(rows.map((r) => r.name));

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`skip    ${file}`);
      continue;
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(await readFile(join(dir, file), "utf8"));
      await client.query("INSERT INTO _neon_migrations (name) VALUES ($1)", [file]);
      await client.query("COMMIT");
      console.log(`applied ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
} finally {
  await pool.end();
}
