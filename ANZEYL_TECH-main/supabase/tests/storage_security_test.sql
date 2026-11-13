-- Storage policy audit for the private learning-materials bucket.
-- Run in the Supabase SQL Editor after creating the policies through the
-- Supabase Dashboard Storage policy editor.

SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id = 'learning-materials';

SELECT policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND policyname IN (
    'Educators can upload learning materials',
    'Educators can update learning materials',
    'Educators can delete learning materials',
    'Enrolled students can read learning materials'
  )
ORDER BY policyname;

SELECT relrowsecurity
FROM pg_class
WHERE oid = 'storage.objects'::regclass;

-- Expected manual session checks:
-- 1. A student who is not enrolled cannot create a signed URL for a lesson material.
-- 2. An enrolled student can create a signed URL when material_url matches the object name.
-- 3. A student cannot insert, update, or delete an object in learning-materials.
-- 4. An educator or college_admin can insert, update, and delete objects in learning-materials.
