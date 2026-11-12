"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  AwardIcon,
  TrophyIcon,
  ZapIcon,
  BookOpenIcon,
} from "./Icons";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-colorful-hero">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 items-center">

          {/* Hero Text & CTAs — full width, centered */}
          <div className="max-w-4xl mx-auto space-y-8 text-center">

            {/* Colorful Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full badge-vibrant-rainbow shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#176b87]">
                Next-Gen EdTech &amp; Skill Validation
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#263746] tracking-tight leading-[1.15]">
              Learn with AI.{" "}
              <span className="text-gradient-brand">Demonstrate Verified Skills.</span> Build Your Career.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#526675] max-w-2xl mx-auto font-normal leading-relaxed">
              ANZEYL brings together 24/7 AI tutoring, adaptive skill assessments, real-world capstone projects, and score-based tuition discounts for ambitious learners.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/courses"
                className="btn-colorful-primary w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white rounded-xl shadow-xl transition-all"
              >
                <BookOpenIcon className="w-5 h-5 text-amber-200" />
                Explore Courses
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

              <Link
                href="/assessments"
                className="btn-colorful-amber w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-[#263746] rounded-xl shadow-xl transition-all"
              >
                <TrophyIcon className="w-5 h-5 text-yellow-200" />
                Take Skill Assessment
              </Link>
            </div>

            {/* Key Value Checklist */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-lg text-emerald-300">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                <span>24/7 Interactive AI Tutor</span>
              </div>
              <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1.5 rounded-lg text-cyan-300">
                <AwardIcon className="w-4 h-4 text-cyan-400" />
                <span>Verified Assessment Scores</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-lg text-amber-300">
                <ZapIcon className="w-4 h-4 text-amber-400" />
                <span>Up to 50% Tuition Discounts</span>
              </div>
            </div>

          </div>

        </div>

        {/* Platform Metric Highlights Bar */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-3xl sm:text-4xl font-black text-gradient-sunset font-sans">50+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-300">Career Track Courses</p>
          </div>
          <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-3xl sm:text-4xl font-black text-gradient-violet font-sans">100K+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-300">Skills Benchmarked</p>
          </div>
          <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-3xl sm:text-4xl font-black text-gradient-emerald font-sans">Up to 50%</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-300">Tuition Discounts Earned</p>
          </div>
          <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-3xl sm:text-4xl font-black text-gradient-aurora font-sans">85+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-300">University &amp; Hiring Partners</p>
          </div>
        </div>

      </div>
    </section>
  );
};
