"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  CheckCircleIcon,
  BellIcon,
} from "@/components/Icons";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Preference toggles
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifyReminders, setNotifyReminders] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/student/login?next=/portal/profile");
        return;
      }

      setUserId(user.id);
      setEmail(user.email || "");

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("full_name, role, primary_goal, phone")
        .eq("id", user.id)
        .maybeSingle();

      if (mounted) {
        if (profile) {
          setFullName(profile.full_name || user.user_metadata?.full_name || "");
          setRole(profile.role || "student");
          setPrimaryGoal(
            profile.primary_goal ||
              user.user_metadata?.primary_goal ||
              "Frontend & Full-Stack Web Development"
          );
          // Strip existing +91 prefix if present for clean input field
          const rawPhone = profile.phone || "";
          const digits = rawPhone.replace(/\D/g, "").slice(-10);
          setPhone(digits);
        } else if (error) {
          setErrorMessage("Unable to load profile data.");
        }
        setLoading(false);
      }
    }

    void loadProfile();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    // Validate Indian phone number (10 digits starting with 6, 7, 8, or 9)
    const cleanedPhone = phone.replace(/\D/g, "").slice(-10);
    if (phone.trim() && !/^[6-9]\d{9}$/.test(cleanedPhone)) {
      setErrorMessage(
        "Please enter a valid 10-digit Indian phone number (must start with 6, 7, 8, or 9)."
      );
      return;
    }

    const formattedPhone = cleanedPhone ? `+91 ${cleanedPhone}` : "";

    setSaving(true);
    const supabase = createClient();

    // RLS prevents updating 'role'. We only update safe user-editable fields.
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        primary_goal: primaryGoal.trim(),
        phone: formattedPhone,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    setSaving(false);

    if (updateError) {
      setErrorMessage(updateError.message || "Failed to update profile.");
    } else {
      setSuccessMessage("Profile preferences successfully saved!");
      setTimeout(() => setSuccessMessage(null), 4000);
      router.refresh();
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-slate-200 rounded-xl" />
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 h-96" />
      </div>
    );
  }

  const initial = fullName.charAt(0).toUpperCase() || "S";

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#dcefea] text-[#176b87] border border-[#b9d8d1]">
            Learner Account
          </span>
          <span className="text-xs text-[#64748b]">
            Manage your personal identity, learning goals, and notifications
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263746] mt-1">
          Profile & Preferences
        </h1>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identity & Career Goals */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e7eb] shadow-xs space-y-6">
          <div className="flex items-center gap-4 pb-5 border-b border-[#e5e7eb]">
            <div className="w-16 h-16 rounded-2xl bg-[#176b87] text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-sm">
              {initial}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#263746]">{fullName || "Student Learner"}</h2>
              <p className="text-xs text-[#64748b]">{email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#dcefea] text-[#176b87] border border-[#b9d8d1] capitalize">
                Verified {role} Account
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#263746]">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your official name"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] focus:outline-none focus:border-[#176b87] focus:ring-1 focus:ring-[#176b87]"
              />
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#64748b]">Email Address (Read-only)</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-[#e5e7eb] text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Role (Read-only) */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#64748b]">Account Role (Read-only)</label>
              <input
                type="text"
                disabled
                value={`Verified ${role}`}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-[#e5e7eb] text-slate-500 cursor-not-allowed capitalize"
              />
              <p className="text-[10px] text-[#64748b]">
                Role cannot be changed directly to ensure database authorization integrity.
              </p>
            </div>

            {/* Primary Goal */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#263746]">Primary Career Goal / Track</label>
              <input
                type="text"
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                placeholder="e.g. Frontend Web Development (React / Next.js)"
                className="w-full px-4 py-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] focus:outline-none focus:border-[#176b87] focus:ring-1 focus:ring-[#176b87]"
              />
            </div>

            {/* Indian Phone Number with fixed +91 prefix */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-[#263746]">
                Phone Number (WhatsApp & Session Updates)
              </label>
              <div className="flex rounded-xl overflow-hidden border border-[#e5e7eb] focus-within:border-[#176b87] focus-within:ring-1 focus-within:ring-[#176b87] bg-[#f7f5ef]">
                <div className="px-3.5 py-2.5 bg-[#eef6f3] border-r border-[#e5e7eb] text-xs font-bold text-[#176b87] flex items-center select-none">
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="9876543210"
                  className="w-full px-4 py-2.5 bg-transparent text-[#263746] text-xs focus:outline-none placeholder:text-slate-400"
                />
              </div>
              <p className="text-[11px] text-[#64748b]">
                Enter your 10-digit Indian mobile number for masterclass and assessment reminders.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e7eb] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#263746] flex items-center gap-2">
            <BellIcon className="w-4 h-4 text-[#176b87]" />
            <span>Learning Reminders & Notifications</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] cursor-pointer hover:bg-[#eef6f3] transition-colors">
              <span className="text-[#263746] font-medium">
                Send WhatsApp reminder 15 minutes before live masterclasses
              </span>
              <input
                type="checkbox"
                checked={notifyWhatsapp}
                onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                className="w-4 h-4 rounded text-[#176b87] focus:ring-[#176b87]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] cursor-pointer hover:bg-[#eef6f3] transition-colors">
              <span className="text-[#263746] font-medium">
                Daily learning reminder notification if incomplete modules remain
              </span>
              <input
                type="checkbox"
                checked={notifyReminders}
                onChange={(e) => setNotifyReminders(e.target.checked)}
                className="w-4 h-4 rounded text-[#176b87] focus:ring-[#176b87]"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
