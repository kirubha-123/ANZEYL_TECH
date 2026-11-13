# SkillBridge AI - Supabase Database Migrations & Security Audit Guide

## Migration Files

1. `supabase/migrations/20261011000000_create_profiles_table.sql`: Initial schema setup.
2. `supabase/migrations/20261011000001_fix_profiles_rls_and_security.sql`: **Corrective Migration** fixing RLS recursion, securing `SECURITY DEFINER` functions, and preventing privilege escalation.
3. `supabase/migrations/20261107000000_create_learning_foundation.sql`: Courses, lessons, enrollments, and lesson progress.
4. `supabase/migrations/20261107000001_extend_learning_catalog.sql`: Catalog metadata, modules, and educator management policies.
5. `supabase/migrations/20261107000002_secure_learning_materials_storage.sql`: Non-destructive deployment manifest for private Storage RLS. Hosted Supabase Storage policies must be created through the Storage policy editor because `storage.objects` is Supabase-managed.
6. `supabase/migrations/20261108000000_restrict_catalog_management_to_admins.sql`: Restricts course, module, and lesson mutations to `college_admin` while preserving educator read access.

---

## How to Apply Migrations in Supabase

### Option A: Supabase Web Dashboard (SQL Editor)

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and select your project.
2. Navigate to **SQL Editor** from the left navigation panel.
3. Open `supabase/migrations/20261011000001_fix_profiles_rls_and_security.sql`.
4. Copy and paste the SQL into the editor and click **Run**.

### Option B: Supabase CLI

```bash
supabase db push
```

## Learning Materials Storage

The `learning-materials` bucket must remain private. Apply the policy
definitions below through the Supabase Dashboard Storage policy editor after
the learning schema migrations. Do not attempt to run `CREATE POLICY`,
`DROP POLICY`, or `ALTER TABLE storage.objects` from the hosted SQL Editor when
it reports that the executing role is not the table owner. Do not change
ownership or grant broad privileges. The
`20261107000002_secure_learning_materials_storage.sql` file is a safe,
non-destructive policy manifest and bucket check, not executable Storage DDL.

Store each uploaded object path in
`public.course_lessons.material_url`; the classroom requests a one-hour signed
URL and Storage RLS allows it only for an enrolled student or an authorized
educator/admin.

### Supported Policy Setup

Open **Storage -> Policies -> learning-materials -> New policy**. Create these
four policies with the exact names and expressions. Choose the matching
operation for each policy and target the `authenticated` role.

1. **Educators can upload learning materials**

Operation: `INSERT`

```sql
bucket_id = 'learning-materials'
AND EXISTS (
	SELECT 1 FROM public.profiles
	WHERE profiles.id = auth.uid()
		AND profiles.role IN ('educator', 'college_admin')
)
```

Use this as the **WITH CHECK** expression.

2. **Educators can update learning materials**

Operation: `UPDATE`

Use the following expression for both **USING** and **WITH CHECK**:

```sql
bucket_id = 'learning-materials'
AND EXISTS (
	SELECT 1 FROM public.profiles
	WHERE profiles.id = auth.uid()
		AND profiles.role IN ('educator', 'college_admin')
)
```

3. **Educators can delete learning materials**

Operation: `DELETE`

Use this as the **USING** expression:

```sql
bucket_id = 'learning-materials'
AND EXISTS (
	SELECT 1 FROM public.profiles
	WHERE profiles.id = auth.uid()
		AND profiles.role IN ('educator', 'college_admin')
)
```

4. **Enrolled students can read learning materials**

Operation: `SELECT`

Use this as the **USING** expression:

```sql
bucket_id = 'learning-materials'
AND EXISTS (
	SELECT 1
	FROM public.course_lessons
	JOIN public.course_enrollments
		ON course_enrollments.course_id = course_lessons.course_id
	WHERE course_lessons.material_url = storage.objects.name
		AND course_enrollments.user_id = auth.uid()
)
```

These policies are idempotent by policy name in the Dashboard: keep an
existing policy if its operation and expression match; otherwise edit or
remove that same named policy and recreate it with the definition above.
Never create a public bucket policy for these materials.

Run `supabase/tests/storage_security_test.sql` in the SQL Editor to inspect the
bucket configuration, active policies, and RLS status. The session-based allow
and deny checks in that file must be run with real student and educator users.

---

## Verifying Security Policy & Fixes

After applying `20261011000001_fix_profiles_rls_and_security.sql`, run the verification script in `supabase/tests/auth_security_test.sql` inside the SQL Editor:

```sql
SELECT proname, prosecdef, proconfig 
FROM pg_proc 
WHERE proname IN ('handle_new_user', 'prevent_profile_role_change');
```

Verify that `prosecdef = true` and `proconfig` contains `search_path=`.
