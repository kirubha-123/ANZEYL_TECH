"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnzeylLogo } from "@/components/AnzeylLogo";
import { MenuIcon, XIcon, ArrowRightIcon } from "./Icons";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Check initial user session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth state changes (sign in, sign out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/", color: "hover:text-[#C9A64B]" },
    { name: "Courses", href: "/courses", color: "hover:text-[#C9A64B]" },
    { name: "Internships", href: "/internships", color: "hover:text-[#C9A64B]" },
    { name: "Training", href: "/training", color: "hover:text-[#C9A64B]" },
    { name: "Assessments", href: "/assessments", color: "hover:text-[#C9A64B]" },
    { name: "Pricing", href: "/pricing", color: "hover:text-[#C9A64B]" },
    { name: "AI Tutor", href: "/ai-tutor", color: "hover:text-[#C9A64B]" },
    { name: "Contact", href: "/contact", color: "hover:text-[#C9A64B]" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-[#e5e7eb] bg-white/95">
      {/* Top Gold Accent Strip */}
      <div className="w-full h-0.5 bg-gradient-to-r from-[#17191D] via-[#C9A64B] to-[#17191D]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/home" className="flex items-center group">
            <AnzeylLogo tagline size="sm" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-medium text-slate-300 ${link.color} rounded-lg hover:bg-white/5 transition-colors`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="btn-colorful-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg transition-all"
              >
                Dashboard
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/student/register"
                  className="btn-colorful-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Get Started
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C9A64B]"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#090c15]/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-base font-medium text-slate-200 ${link.color} hover:bg-white/5 rounded-xl transition-colors`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-colorful-primary flex items-center justify-center gap-2 py-3 text-sm font-bold text-white rounded-xl shadow-lg"
              >
                Dashboard
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/student/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full btn-colorful-primary flex items-center justify-center gap-2 py-3 text-sm font-bold text-white rounded-xl shadow-lg"
                >
                  Get Started
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
