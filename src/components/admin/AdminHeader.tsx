"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  MenuIcon,
  ClockIcon,
  AwardIcon,
  LogOutIcon,
} from "@/components/Icons";
import { createClient } from "@/lib/supabase/client";

export function AdminHeader({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      document.cookie = "anzeyl_demo_role=; path=/; max-age=0;";
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      setSigningOut(false);
    }
  }

  return (
    <header className="h-20 bg-white border-b border-[#e5e7eb] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Left Search & Mobile Toggle */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle admin navigation"
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full max-w-md hidden sm:block">
          <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students, emails, certificate IDs, vouchers..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#f7f5ef] border border-[#e5e7eb] rounded-xl text-[#263746] placeholder:text-[#64748b] focus:outline-none focus:border-[#176b87] focus:ring-1 focus:ring-[#176b87] transition-all"
          />
        </div>
      </div>

      {/* Right Actions & Admin Profile */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/live-classes"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-colors"
        >
          <ClockIcon className="w-3.5 h-3.5 text-rose-400" />
          <span>+ Schedule Class</span>
        </Link>

        <Link
          href="/admin/certificates"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold transition-colors"
        >
          <AwardIcon className="w-3.5 h-3.5 text-amber-300" />
          <span>+ Issue Certificate</span>
        </Link>

        {/* Admin User Chip */}
        <div className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#0f1424] border border-white/10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 p-[1.5px]">
            <div className="w-full h-full bg-[#0d111d] rounded-[6px] flex items-center justify-center font-bold text-xs text-white">
              A
            </div>
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-white leading-tight">Admin Console</span>
            <span className="block text-[10px] text-emerald-400 font-semibold">Director Access</span>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          title="Sign out of Admin console"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOutIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{signingOut ? "Signing out…" : "Logout"}</span>
        </button>
      </div>
    </header>
  );
}
