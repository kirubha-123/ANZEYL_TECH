"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnzeylLogo } from "@/components/AnzeylLogo";
import { LogOutIcon, HomeIcon } from "@/components/Icons";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";

function MentorHeader() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    document.cookie = "anzeyl_demo_role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_name=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_email=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_goal=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_phone=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    if (typeof window !== "undefined") {
      localStorage.removeItem("anzeyl_user_name");
      localStorage.removeItem("anzeyl_user_email");
      localStorage.removeItem("anzeyl_user_goal");
      localStorage.removeItem("anzeyl_user_phone");
      localStorage.removeItem("anzeyl_demo_role");
    }

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }

    router.replace("/mentor/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-[#e5e7eb] px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-sm">
      {/* Left: Brand */}
      <Link href="/mentor/dashboard" className="flex items-center">
        <AnzeylLogo tagline={false} size="sm" />
        <span className="ml-3 text-xs font-bold uppercase tracking-widest text-[#C9A64B] hidden sm:block">
          Mentor Portal
        </span>
      </Link>

      {/* Right: Nav actions */}
      <div className="flex items-center gap-2">
        <Link
          href="/home"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] text-[#263746] text-xs font-semibold transition-colors"
        >
          <HomeIcon className="w-3.5 h-3.5 text-[#176b87]" />
          <span>Public site</span>
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOutIcon className="w-4 h-4 shrink-0" />
          <span>{signingOut ? "Signing out…" : "Logout"}</span>
        </button>
      </div>
    </header>
  );
}

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#263746] flex flex-col font-sans">
      <MentorHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

