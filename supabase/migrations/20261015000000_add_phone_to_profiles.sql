-- Migration: Add phone column to public.profiles and persist phone in trigger
-- File: supabase/migrations/20261015000000_add_phone_to_profiles.sql

-- 1. Add phone column if not exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- 2. Update handle_new_user trigger to save phone number from signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, primary_goal, phone)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    'student',
    COALESCE(new.raw_user_meta_data->>'primary_goal', 'Frontend Web Development (React / Next.js)'),
    COALESCE(new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'phone_number', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    primary_goal = EXCLUDED.primary_goal,
    phone = COALESCE(NULLIF(EXCLUDED.phone, ''), public.profiles.phone),
    updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Ensure trigger is active
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
