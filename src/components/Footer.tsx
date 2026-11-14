"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnzeylLogo } from "@/components/AnzeylLogo";
import { ArrowRightIcon, CheckCircleIcon } from "./Icons";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = 2026;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#17191D] border-t border-[#C9A64B]/20 text-[#A7A9AE] font-sans relative">
      {/* Gold accent bar */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#C9A64B] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 space-y-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex">
              <AnzeylLogo tagline size="md" />
            </Link>

            <p className="text-sm text-[#A7A9AE] leading-relaxed max-w-sm">
              ANZEYL SOLUTIONS bridges the gap between learning and employment with 24/7 AI tutoring, adaptive skill assessments, real projects, and score-based tuition discounts.
            </p>

            {/* Founder, Location & Contact Details */}
            <div className="space-y-2.5 text-xs text-[#A7A9AE] pt-2">
              <p className="flex items-center gap-2">
                <span className="text-[#A7A9AE]/70 font-semibold">Founder:</span>
                <span className="text-[#F7F5EF] font-bold">Kirubhakaran</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#A7A9AE]/70 font-semibold">Company Location:</span>
                <span className="text-[#F7F5EF] font-medium">Bangalore, Karnataka</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#A7A9AE]/70 font-semibold">Support:</span>
                <a href="mailto:support@anzeylsolutions.com" className="text-[#66cc00] hover:underline transition-colors">
                  support@anzeylsolutions.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#A7A9AE]/70 font-semibold">Partnerships:</span>
                <a href="mailto:partners@anzeylsolutions.com" className="text-[#66cc00] hover:underline transition-colors">
                  partners@anzeylsolutions.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-[#F7F5EF] uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-[#C9A64B] transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-[#C9A64B] transition-colors">
                  Paid Internships
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:text-[#C9A64B] transition-colors">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#C9A64B] transition-colors">
                  Pricing &amp; Discounts
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="hover:text-[#C9A64B] transition-colors">
                  Skill Assessments
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C9A64B] transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Career Tracks */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-[#F7F5EF] uppercase tracking-wider">Career Tracks</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses?category=frontend" className="hover:text-[#C9A64B] transition-colors">
                  Frontend Development
                </Link>
              </li>
              <li>
                <Link href="/courses?category=fullstack" className="hover:text-[#C9A64B] transition-colors">
                  Full-Stack Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses?category=python" className="hover:text-[#C9A64B] transition-colors">
                  Python &amp; Automation
                </Link>
              </li>
              <li>
                <Link href="/courses?category=datascience" className="hover:text-[#C9A64B] transition-colors">
                  Data Science &amp; ML
                </Link>
              </li>
              <li>
                <Link href="/courses?category=aiml" className="hover:text-[#C9A64B] transition-colors">
                  AI Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-[#F7F5EF] uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-[#A7A9AE] leading-relaxed">
              Subscribe to our monthly newsletter for new assessment benchmarks, course releases, and EdTech insights.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-[#C9A64B]/10 border border-[#C9A64B]/30 text-[#E8D28A] text-xs flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-[#C9A64B]" />
                <span>Thank you! You are subscribed to updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="human-input w-full px-4 py-2.5 rounded-xl text-sm placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl text-[#17191D] bg-[#C9A64B] hover:bg-[#E8D28A] shadow-md transition-all cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-[11px] text-[#A7A9AE] block">No spam. Unsubscribe anytime.</span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#C9A64B]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7A9AE]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <p>© {currentYear} ANZEYL SOLUTIONS. All rights reserved.</p>
            <span className="hidden sm:inline text-[#A7A9AE]/40">•</span>
            <p className="text-[#F7F5EF]/80 font-medium">Founder: Kirubhakaran · Bangalore, Karnataka</p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#F7F5EF] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#F7F5EF] transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#A7A9AE]/30">•</span>
            <span>All course discounts &amp; test data shown are sample presentation content.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
