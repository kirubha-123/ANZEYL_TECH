"use client";

import React from "react";
import Link from "next/link";
import { CheckCircleIcon, AwardIcon, ZapIcon } from "./Icons";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center overflow-hidden bg-[#071214] text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#10b981]/20 via-[#176b87]/15 to-transparent rounded-full blur-3xl pointer-events-none transform translate-x-1/3" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#176b87]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10 w-full">
        <div className="max-w-3xl space-y-7 text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#10b981]">
              EDTECH PLATFORM
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Build skills that move your career forward.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            Practical, industry-oriented learning experiences for students, freshers and working professionals.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-bold text-base shadow-xl shadow-[#10b981]/25 hover:shadow-[#10b981]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Programs
            </Link>
            <Link
              href="/student/register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#0f1d24] hover:bg-[#152730] text-white border border-white/15 hover:border-white/30 font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Register Interest
            </Link>
          </div>

          {/* Highlights */}
          <div className="pt-8 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-[#10b981]" />
              <span>Online &amp; Classroom Batches</span>
            </div>
            <div className="flex items-center gap-2">
              <AwardIcon className="w-4 h-4 text-[#C9A64B]" />
              <span>Curriculum-Aligned Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <ZapIcon className="w-4 h-4 text-emerald-400" />
              <span>Score-Based Merit Vouchers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
