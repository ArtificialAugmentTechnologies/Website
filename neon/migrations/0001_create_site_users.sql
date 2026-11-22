-- Registered site users, one row per account.
-- `id` is the Supabase Auth user id, so the same account can never be stored twice.
-- The case-insensitive unique index on email stops two rows sharing an address.
CREATE TABLE IF NOT EXISTS site_users (
  id            uuid        PRIMARY KEY,
  email         text        NOT NULL,
  display_name  text,
  auth_provider text        NOT NULL DEFAULT 'email',
  login_count   integer     NOT NULL DEFAULT 1,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS site_users_email_unique ON site_users (lower(email));
