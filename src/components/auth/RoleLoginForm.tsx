"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { dashboardForRole, roleAllowsEntry, type AppRole } from "@/lib/auth/roles";
import { AuthBrand } from "@/components/auth/AuthBrand";

export function RoleLoginForm({
  entry,
  title,
  allowedRole,
}: {
  entry: "student" | "mentor" | "admin";
  title: string;
  allowedRole: AppRole;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const supabase = createClient();
    const cleanEmail = email.trim();

    // 1. Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (authError || !authData.user) {
      setLoading(false);
      const rawMsg = authError?.message || "";
      const rawCode = authError?.code || "";

      // Case A: Unconfirmed email address
      if (rawCode === "email_not_confirmed" || rawMsg.toLowerCase().includes("email not confirmed")) {
        setError(
          "Your email address has not been confirmed. Please check your inbox for the confirmation link, or confirm your user in the Supabase Auth Dashboard under Authentication → Users."
        );
        return;
      }

      // Case B: Invalid credentials or account does not exist
      if (rawMsg.toLowerCase().includes("invalid login credentials")) {
        if (entry === "mentor") {
          setError(
            "Invalid login credentials. Please verify your email and password. Note: Mentor accounts must be created in Supabase Authentication and assigned the 'educator' role in public.profiles before signing in."
          );
        } else if (entry === "admin") {
          setError(
            "Invalid login credentials. Please verify your email and password. Note: Administrator accounts must be created in Supabase Authentication and assigned the 'college_admin' role in public.profiles before signing in."
          );
        } else {
          setError("Invalid email or password. Please verify your credentials or create a student account.");
        }
        return;
      }

      // Case C: Other Supabase Auth errors
      setError(rawMsg || "Failed to sign in. Please check your network connection and credentials.");
      return;
    }

    // 2. Query authenticated user's trusted database role from public.profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (profileError) {
      await supabase.auth.signOut();
      setError(`Database error reading profile: ${profileError.message}. Please try again shortly.`);
      setLoading(false);
      return;
    }

    // 3. Handle missing database profile
    if (!profile) {
      await supabase.auth.signOut();
      setError(
        `No database profile record found for this account (User ID: ${authData.user.id}). A matching record in the 'profiles' table with role '${allowedRole}' is required to sign in.`
      );
      setLoading(false);
      return;
    }

    // 4. Verify user has the required trusted role for this specific login workspace
    if (!roleAllowsEntry(profile.role, entry) || profile.role !== allowedRole) {
      await supabase.auth.signOut();

      if (entry === "mentor") {
        if (profile.role === "student") {
          setError(
            "This account is currently registered with the 'student' role and cannot access the Mentor portal. Mentor access requires the 'educator' role in public.profiles. If you are an authorized mentor, an administrator must update your role in the database."
          );
        } else {
          setError(
            `This account has the '${profile.role}' role and is not authorized for mentor login.`
          );
        }
      } else if (entry === "admin") {
        if (profile.role === "student") {
          setError(
            "This account is currently registered with the 'student' role and cannot access the Admin console. Administrator access requires the 'college_admin' role in public.profiles. An administrator must update your role in the database."
          );
        } else if (profile.role === "educator") {
          setError(
            "This account has the 'educator' role (Mentor) and cannot access the Admin console. Please sign in at the Mentor portal."
          );
        } else {
          setError(
            `This account has the '${profile.role}' role and is not authorized for admin login.`
          );
        }
      } else {
        // Student login
        if (profile.role === "educator") {
          setError("This account has the 'educator' role. Please sign in at the Mentor portal.");
        } else if (profile.role === "college_admin") {
          setError("This account has the 'college_admin' role. Please sign in at the Admin console.");
        } else {
          setError("This account is not authorized for student login.");
        }
      }

      setLoading(false);
      return;
    }

    // 5. Successful login & verified role: Navigate to designated workspace
    const targetDashboard = dashboardForRole(profile.role);
    router.push(targetDashboard);
    router.refresh();
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError("Enter your email address first, then select forgot password.");
      return;
    }
    setError(null);
    setSuccess(null);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/${entry}/login`,
    });
    if (resetError) {
      setError(resetError.message);
    } else {
      setSuccess("If an account exists for this email, password reset instructions have been sent.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-4 py-12 text-[#263746] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md flex-col justify-center">
        <AuthBrand />
        <Link href="/" className="mx-auto mt-5 text-sm font-bold text-[#176b87] hover:underline">
          ← Choose another workspace
        </Link>
        <div className="human-surface mt-5 rounded-2xl p-7 sm:p-9">
          <span className="badge-vibrant-rainbow inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {title}
          </span>
          <h1 className="mt-4 text-2xl font-extrabold">Welcome back</h1>
          <p className="mt-2 text-sm text-[#64748b]">
            Sign in with your authorized ANZEYL account.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-[#d9534f]/30 bg-[#fff0ef] p-3.5 text-xs font-medium leading-relaxed text-[#b63d39]"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mt-5 rounded-xl border border-[#23845b]/30 bg-[#edf8f2] p-3 text-sm text-[#176b50]"
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-bold">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="human-input mt-1.5 w-full rounded-xl px-4 py-3"
              />
            </label>
            <label className="block text-sm font-bold">
              Password
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="human-input mt-1.5 w-full rounded-xl px-4 py-3"
              />
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-bold text-[#176b87] hover:underline"
            >
              Forgot password?
            </button>
            <button
              disabled={loading}
              className="btn-colorful-primary w-full rounded-xl px-4 py-3 font-bold text-white disabled:opacity-60"
            >
              {loading ? "Signing in..." : `Sign in as ${title}`}
            </button>
          </form>

          {entry === "student" && (
            <Link
              href="/student/register"
              className="mt-5 block text-center text-sm font-bold text-[#176b87] hover:underline"
            >
              Create a student account
            </Link>
          )}

          {entry === "mentor" && (
            <Link
              href="/mentor/register"
              className="mt-5 block text-center text-sm font-bold text-[#176b87] hover:underline"
            >
              Mentor onboarding information
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
