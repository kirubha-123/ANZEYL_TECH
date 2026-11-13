"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnzeylLogo } from "@/components/AnzeylLogo";
import { MenuIcon, XIcon } from "./Icons";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const emptySubscribe = () => () => {};

function useHasDemoCookie(): boolean {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof document === "undefined") return false;
      return document.cookie.split("; ").some((c) => c.startsWith("anzeyl_demo_role="));
    },
    () => false
  );
}

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const hasDemoCookie = useHasDemoCookie();
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    if (supabaseUrl.includes("placeholder")) {
      return;
    }

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setSupabaseUser(data.user);
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const user = hasDemoCookie
    ? ({ id: "demo-user", email: "demo@anzeyl.com" } as User)
    : supabaseUser;

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Training", href: "/training" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-sm">
      {/* Gold accent strip */}
      <div className="w-full h-0.5 bg-gradient-to-r from-[#17191D] via-[#C9A64B] to-[#17191D]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <AnzeylLogo tagline size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[#263746] hover:text-[#17191D] hover:bg-[#f7f5ef] rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-bold text-white rounded-xl bg-[#C9A64B] hover:bg-[#b8923e] shadow transition-all"
              >
                My Dashboard
              </Link>
            ) : (
              <>
                {/* Multi-role Login Dropdown Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#263746] hover:text-[#17191D] hover:bg-[#f7f5ef] rounded-xl transition-all cursor-pointer"
                  >
                    <span>Log In</span>
                    <span className="text-[10px] opacity-70">▼</span>
                  </button>

                  {loginDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#e5e7eb] shadow-xl p-3 space-y-2 z-50 animate-fade-in">
                      <div className="pb-2 border-b border-[#e5e7eb]">
                        <span className="block text-xs font-bold text-[#17191D]">
                          Select Login Workspace
                        </span>
                        <span className="text-[10px] text-[#64748b]">
                          Choose your role to sign in:
                        </span>
                      </div>

                      <Link
                        href="/student/login?next=/dashboard"
                        onClick={() => setLoginDropdownOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#f7f5ef] transition-colors group"
                      >
                        <span className="w-7 h-7 rounded-lg bg-[#176b87]/10 text-[#176b87] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          🎓
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-[#17191D] group-hover:text-[#176b87]">
                            Student Login
                          </span>
                          <span className="text-[10px] text-[#64748b] leading-tight block">
                            Courses, materials, study cards & practice
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/mentor/login?next=/mentor/dashboard"
                        onClick={() => setLoginDropdownOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#f7f5ef] transition-colors group"
                      >
                        <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          🧑‍🏫
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-[#17191D] group-hover:text-emerald-700">
                            Mentor Login
                          </span>
                          <span className="text-[10px] text-[#64748b] leading-tight block">
                            Live sessions, reviews & curriculum
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/admin/login?next=/admin"
                        onClick={() => setLoginDropdownOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#f7f5ef] transition-colors group"
                      >
                        <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          🛡️
                        </span>
                        <div>
                          <span className="block text-xs font-bold text-[#17191D] group-hover:text-amber-800">
                            Admin Login
                          </span>
                          <span className="text-[10px] text-[#64748b] leading-tight block">
                            Platform operations, courses & questions
                          </span>
                        </div>
                      </Link>

                      <div className="pt-1.5 border-t border-[#e5e7eb] text-center">
                        <Link
                          href="/login"
                          onClick={() => setLoginDropdownOpen(false)}
                          className="text-[11px] font-bold text-[#176b87] hover:underline"
                        >
                          View all workspace details →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/student/register"
                  className="inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-white rounded-xl bg-[#C9A64B] hover:bg-[#b8923e] shadow transition-all"
                >
                  Register Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#263746] hover:bg-[#f7f5ef] focus:outline-none focus:ring-2 focus:ring-[#C9A64B]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5e7eb] bg-white px-4 pt-4 pb-6 space-y-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-[#263746] hover:bg-[#f7f5ef] rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#e5e7eb] flex flex-col gap-2">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-bold text-white rounded-xl bg-[#C9A64B] hover:bg-[#b8923e]"
              >
                My Dashboard
              </Link>
            ) : (
              <div className="space-y-2">
                <div className="px-1 text-xs font-bold text-[#64748b]">Select Login Portal:</div>
                <div className="grid grid-cols-3 gap-1.5">
                  <Link
                    href="/student/login?next=/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-2 text-center rounded-xl bg-[#f7f5ef] hover:bg-[#176b87]/10 transition-colors border border-[#e5e7eb]"
                  >
                    <span className="text-base">🎓</span>
                    <span className="text-[11px] font-bold text-[#176b87] mt-0.5">Student</span>
                  </Link>
                  <Link
                    href="/mentor/login?next=/mentor/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-2 text-center rounded-xl bg-[#f7f5ef] hover:bg-emerald-50 transition-colors border border-[#e5e7eb]"
                  >
                    <span className="text-base">🧑‍🏫</span>
                    <span className="text-[11px] font-bold text-emerald-700 mt-0.5">Mentor</span>
                  </Link>
                  <Link
                    href="/admin/login?next=/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-2 text-center rounded-xl bg-[#f7f5ef] hover:bg-amber-50 transition-colors border border-[#e5e7eb]"
                  >
                    <span className="text-base">🛡️</span>
                    <span className="text-[11px] font-bold text-amber-800 mt-0.5">Admin</span>
                  </Link>
                </div>
                <Link
                  href="/student/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center py-2.5 text-sm font-bold text-white rounded-xl bg-[#C9A64B] hover:bg-[#b8923e]"
                >
                  Register Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
