"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthBrand } from "@/components/auth/AuthBrand";
import { Footer } from "@/components/Footer";

const GOALS = [
  "Full Stack Development",
  "AI & Machine Learning",
  "Data Science & Analytics",
  "Cyber Security",
  "Cloud & DevOps",
  "UI/UX Design",
  "Digital Marketing",
  "Data Analytics with Power BI",
];

export function StudentRegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState(GOALS[0]);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !password) {
      setError("Please complete all required fields to continue.");
      return;
    }
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian mobile number (e.g. 98765 43210).");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please accept the Terms of Service & Privacy Policy.");
      return;
    }

    setLoading(true);
    const trimmedName = fullName.trim();
    if (typeof window !== "undefined") {
      localStorage.setItem("anzeyl_user_name", trimmedName);
      localStorage.setItem("anzeyl_user_email", email.trim());
      localStorage.setItem("anzeyl_user_phone", cleanPhone);
      localStorage.setItem("anzeyl_user_goal", primaryGoal);
    }
    document.cookie = `anzeyl_user_name=${encodeURIComponent(trimmedName)}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `anzeyl_user_email=${encodeURIComponent(email.trim())}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `anzeyl_user_goal=${encodeURIComponent(primaryGoal)}; path=/; max-age=86400; SameSite=Lax`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    if (supabaseUrl.includes("placeholder")) {
      document.cookie = `anzeyl_demo_role=student; path=/; max-age=86400; SameSite=Lax`;
      router.push("/dashboard");
      router.refresh();
      return;
    }

    const supabase = createClient();
    const phone = `+91 ${cleanPhone}`;
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          phone,
          phone_number: phone,
          primary_goal: primaryGoal,
          role: "student",
        },
      },
    });

    if (authError) {
      if (authError.message.toLowerCase().includes("failed to fetch")) {
        document.cookie = `anzeyl_demo_role=student; path=/; max-age=86400; SameSite=Lax`;
        router.push("/dashboard");
        router.refresh();
        return;
      }
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setSuccess("Account created successfully. Check your email to confirm your account, then sign in.");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#263746] flex flex-col font-sans">
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-md flex-col justify-center">
        <AuthBrand />
        <div className="flex items-center justify-center gap-4 mt-4 text-xs font-bold">
          <Link href="/" className="text-[#176b87] hover:underline flex items-center gap-1">
            <span>← Return to Home</span>
          </Link>
          <span className="text-[#64748b]">•</span>
          <Link href="/login" className="text-[#64748b] hover:text-[#17191D] hover:underline">
            Choose workspace
          </Link>
        </div>
        <div className="human-surface mt-5 rounded-2xl p-7 sm:p-9">
          <span className="badge-vibrant-rainbow inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">Student registration</span>
          <h1 className="mt-4 text-2xl font-extrabold">Create your account</h1>
          <p className="mt-2 text-sm text-[#64748b]">Set up your student learning workspace.</p>

          {error && <div role="alert" className="mt-5 rounded-xl border border-[#d9534f]/30 bg-[#fff0ef] p-3 text-sm text-[#b63d39]">{error}</div>}
          {success && <div role="status" className="mt-5 rounded-xl border border-[#23845b]/30 bg-[#edf8f2] p-3 text-sm text-[#176b50]">{success}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-bold">Full name<input required value={fullName} onChange={(event) => setFullName(event.target.value)} className="human-input mt-1.5 w-full rounded-xl px-4 py-3" /></label>
            <label className="block text-sm font-bold">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="human-input mt-1.5 w-full rounded-xl px-4 py-3" /></label>
            <label className="block text-sm font-bold">
              Phone number
              <div className="relative mt-1.5 flex rounded-xl border border-[#d6dde0] bg-white focus-within:border-[#176b87] focus-within:ring-2 focus-within:ring-[#176b87]/15">
                <span className="flex items-center pl-4 pr-2 text-sm font-semibold text-[#64748b]">
                  +91
                </span>
                <input
                  required
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full rounded-r-xl py-3 pr-4 text-sm text-[#263746] focus:outline-none"
                />
              </div>
            </label>
            <label className="block text-sm font-bold">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="human-input mt-1.5 w-full rounded-xl px-4 py-3" /></label>
            <label className="block text-sm font-bold">
              Domain / Learning goal
              <select
                value={primaryGoal}
                onChange={(event) => setPrimaryGoal(event.target.value)}
                className="human-input mt-1.5 w-full rounded-xl px-4 py-3"
              >
                {GOALS.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-start gap-2 text-xs text-[#64748b]"><input type="checkbox" checked={agreedToTerms} onChange={(event) => setAgreedToTerms(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#176b87]" />I agree to the Terms of Service and Privacy Policy.</label>
            <button disabled={loading} className="btn-colorful-primary w-full rounded-xl px-4 py-3 font-bold text-white disabled:opacity-60">{loading ? "Creating account..." : "Create student account"}</button>
          </form>
          <p className="mt-5 text-center text-sm text-[#64748b]">Already registered? <Link href="/student/login" className="font-bold text-[#176b87] hover:underline">Student login</Link></p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);
}
