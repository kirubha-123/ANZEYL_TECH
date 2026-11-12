-- Migration: Allow database administrators to assign 'educator' and 'college_admin' roles
-- File: supabase/migrations/20261109000000_fix_role_escalation_trigger_for_admin_and_mentor.sql

-- Update the BEFORE UPDATE trigger on public.profiles:
-- Block client-side roles ('authenticated', 'anon') from changing their own role column.
-- Allow trusted administrative contexts ('postgres', 'supabase_admin', 'service_role') to assign roles.
CREATE OR REPLACE FUNCTION public.prevent_profile_role_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF current_setting('role', true) IN ('authenticated', 'anon') THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Ensure the trigger is active
DROP TRIGGER IF EXISTS protect_profile_role_update ON public.profiles;
CREATE TRIGGER protect_profile_role_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_profile_role_change();

