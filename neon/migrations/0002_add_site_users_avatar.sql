-- Profile photo URL, filled from the Google account when the user signs in with Google.
ALTER TABLE site_users ADD COLUMN IF NOT EXISTS avatar_url text;
