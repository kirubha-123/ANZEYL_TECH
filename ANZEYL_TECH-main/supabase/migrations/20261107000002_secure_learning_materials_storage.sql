-- Storage policy deployment manifest for the private learning-materials bucket.
--
-- IMPORTANT:
-- Supabase owns storage.objects. In hosted projects, the SQL Editor role may
-- not own that table and therefore cannot run ALTER TABLE, CREATE POLICY, or
-- DROP POLICY against it. Do not change ownership, grant broad privileges, or
-- disable RLS to work around that restriction.
--
-- Apply the four policies through:
-- Supabase Dashboard -> Storage -> Policies -> learning-materials -> New policy
--
-- The exact dashboard steps and expressions are documented in supabase/README.md.
-- This file intentionally performs no storage DDL, so running it through the
-- restricted SQL Editor cannot make an unsafe change or fail with a
-- storage.objects ownership error. Policy creation is performed by the
-- supported Storage policy-management surface.
--
-- Policy contract:
-- * Educators and college_admin users: INSERT, UPDATE, DELETE.
-- * Enrolled students: SELECT only when course_lessons.material_url exactly
--   matches storage.objects.name and the student is enrolled in that course.
-- * The learning-materials bucket remains private.

SELECT id, name, public
FROM storage.buckets
WHERE id = 'learning-materials';
