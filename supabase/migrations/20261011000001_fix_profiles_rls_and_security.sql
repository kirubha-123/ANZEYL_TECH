-- Migration: Fix RLS Policies, Trigger Security, and Prevent Role Escalation
-- File: supabase/migrations/20261011000001_fix_profiles_rls_and_security.sql

-- 1. Drop existing RLS policies on public.profiles to remove recursive policy evaluation
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- 2. Re-create non-recursive Row Level Security (RLS) policies
-- SELECT policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- UPDATE policy: Non-recursive check for user owner matching
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- INSERT policy: Restrict direct client inserts so role must be 'student'
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id AND role = 'student');

-- 3. Create BEFORE UPDATE trigger function to silently block role escalation attempts
CREATE OR REPLACE FUNCTION public.prevent_profile_role_change()
RETURNS TRIGGER AS $$
BEGIN
  -- If role column is being changed by a non-service_role, reset it to OLD.role
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF current_setting('role', true) IS DISTINCT FROM 'service_role' THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

DROP TRIGGER IF EXISTS protect_profile_role_update ON public.profiles;
CREATE TRIGGER protect_profile_role_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_profile_role_change();

-- 4. Harden handle_new_user trigger function with search_path = '' and schema qualification
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, primary_goal)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    'student', -- Always force 'student' role regardless of sign-up metadata payload
    COALESCE(new.raw_user_meta_data->>'primary_goal', 'Frontend Web Development (React / Next.js)')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    primary_goal = EXCLUDED.primary_goal,
    updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Re-attach handle_new_user trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
