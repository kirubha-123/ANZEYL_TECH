-- Security Audit Verification Test Script for Supabase SQL Editor
-- File: supabase/tests/auth_security_test.sql

-- Test 1: Verify search_path security on handle_new_user and prevent_profile_role_change
SELECT 
  proname, 
  prosecdef, 
  proconfig 
FROM pg_proc 
WHERE proname IN ('handle_new_user', 'prevent_profile_role_change');
-- Expected: prosecdef = true, proconfig contains 'search_path='

-- Test 2: Verify RLS is enabled on public.profiles
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'profiles';
-- Expected: rowsecurity = true

-- Test 3: List active policies on public.profiles
SELECT policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'profiles';
-- Expected: No recursive subqueries in policies (no `SELECT ... FROM public.profiles` inside WITH CHECK)

-- Test 4: Verify BEFORE UPDATE trigger exists for role protection
SELECT tgname, tgenabled, tgtype 
FROM pg_trigger 
WHERE tgname = 'protect_profile_role_update';
-- Expected: Trigger exists and is enabled
