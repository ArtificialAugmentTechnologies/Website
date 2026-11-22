-- Copies of admissions applications and contact enquiries (the forms also email the office).
CREATE TABLE IF NOT EXISTS applications (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name            text        NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 200),
  email                text        NOT NULL CHECK (char_length(email) BETWEEN 3 AND 320),
  phone                text        NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
  date_of_birth        date        NOT NULL,
  gender               text        NOT NULL,
  address              text        NOT NULL CHECK (char_length(address) <= 1000),
  course_slug          text        NOT NULL,
  qualification        text        NOT NULL,
  previous_institution text,
  message              text        CHECK (message IS NULL OR char_length(message) <= 4000),
  status               text        NOT NULL DEFAULT 'new',
  created_at           timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS applications_created_at_idx ON applications (created_at DESC);
CREATE INDEX IF NOT EXISTS applications_status_idx ON applications (status);

CREATE TABLE IF NOT EXISTS contact_messages (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email      text        NOT NULL CHECK (char_length(email) BETWEEN 3 AND 320),
  phone      text,
  subject    text        NOT NULL CHECK (char_length(subject) <= 300),
  message    text        NOT NULL CHECK (char_length(message) <= 4000),
  handled    boolean     NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages (created_at DESC);
