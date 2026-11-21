DROP POLICY IF EXISTS "Anyone can submit an application" ON public.applications;
CREATE POLICY "Anyone can submit a valid application" ON public.applications FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND char_length(full_name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(phone) BETWEEN 5 AND 30
  AND char_length(gender) BETWEEN 1 AND 50
  AND char_length(address) BETWEEN 1 AND 1000
  AND char_length(course_slug) BETWEEN 1 AND 100
  AND char_length(qualification) BETWEEN 1 AND 200
  AND (previous_institution IS NULL OR char_length(previous_institution) <= 300)
  AND (message IS NULL OR char_length(message) <= 5000)
);
DROP POLICY IF EXISTS "Anyone can send a contact message" ON public.contact_messages;
CREATE POLICY "Anyone can send a valid contact message" ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (
  handled = false
  AND char_length(name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR char_length(phone) <= 30)
  AND char_length(subject) BETWEEN 1 AND 300
  AND char_length(message) BETWEEN 1 AND 5000
);