"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BuildingIcon,
  GraduationCapIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "./Icons";

export const Partnerships: React.FC = () => {
  const [partnerType, setPartnerType] = useState<"colleges" | "companies">("colleges");

  const universityBenefits = [
    {
      title: "Campus-Wide Skill Benchmarking",
      desc: "Track student technical proficiency across departments with real-time analytics dashboards.",
      badge: "Analytics",
      color: "border-cyan-500/40 text-cyan-400",
    },
    {
      title: "Accredited Curriculum Alignment",
      desc: "Seamlessly map online assessment scores and project capstones to existing course credits.",
      badge: "Accredited",
      color: "border-emerald-500/40 text-emerald-400",
    },
    {
      title: "Automated Plagiarism & Integrity Checks",
      desc: "Proctored skill tests ensure academic integrity and verifiable student performance transcripts.",
      badge: "Integrity",
      color: "border-amber-500/40 text-amber-400",
    },
    {
      title: "Career Services Placement Hub",
      desc: "Connect top-performing university graduates directly with corporate recruitment partners.",
      badge: "Placement",
      color: "border-rose-500/40 text-rose-400",
    },
  ];

  const companyBenefits = [
    {
      title: "Direct Access to Verified Talent",
      desc: "Bypass resume noise by searching candidate pools ranked by proctored assessment scores.",
      badge: "Verified",
      color: "border-emerald-500/40 text-emerald-400",
    },
    {
      title: "Custom Skill Assessment Suites",
      desc: "Deploy custom coding evaluations tailored specifically to your company's tech stack.",
      badge: "Custom Tests",
      color: "border-violet-500/40 text-violet-400",
    },
    {
      title: "Real-World Code Portfolio Audits",
      desc: "Review automated PR checks, commit histories, and architecture decisions before interviewing.",
      badge: "Code Audits",
      color: "border-cyan-500/40 text-cyan-400",
    },
    {
      title: "60% Faster Time-to-Hire",
      desc: "Shorten screening workflows by 60% with pre-evaluated engineering candidate profiles.",
      badge: "Efficiency",
      color: "border-amber-500/40 text-amber-400",
    },
  ];

  const partnerLogos = [
    { name: "Stanford Tech Hub", color: "badge-vibrant-rose" },
    { name: "MIT Learning Lab", color: "badge-vibrant-cyan" },
    { name: "Oxford Tech Alliance", color: "badge-vibrant-amber" },
    { name: "Carnegie Mellon Academy", color: "badge-vibrant-violet" },
    { name: "Apex Tech Global", color: "badge-vibrant-emerald" },
    { name: "NextGen Enterprise", color: "badge-vibrant-rainbow" },
  ];

  return (
    <section className="py-24 bg-colorful-mesh relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            Institutional & Enterprise Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Empowering <span className="text-gradient-brand">Colleges & Industry Partners</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Connecting academic learning with corporate hiring through transparent, data-driven skill validation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0b0e18] border border-white/10 shadow-xl">
            <button
              onClick={() => setPartnerType("colleges")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                partnerType === "colleges"
                  ? "btn-colorful-primary text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCapIcon className="w-4 h-4 text-amber-300" />
              <span>For Colleges & Universities</span>
            </button>
            <button
              onClick={() => setPartnerType("companies")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                partnerType === "companies"
                  ? "btn-colorful-primary text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BuildingIcon className="w-4 h-4 text-cyan-300" />
              <span>For Hiring Partners & Enterprises</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="glass-card p-8 lg:p-12 rounded-3xl border border-white/15 relative overflow-hidden shadow-2xl">
          {/* Top Rainbow Accent Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-600" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* Left Column: Benefits list */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-vibrant-emerald text-xs font-bold uppercase tracking-wider">
                {partnerType === "colleges" ? "Academic Portal Features" : "Enterprise Hiring Features"}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {partnerType === "colleges"
                  ? "Transform Student Outcomes with Data-Backed Skill Tracking"
                  : "Hire Job-Ready Technical Candidates Proven by Proctored Tests"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {(partnerType === "colleges" ? universityBenefits : companyBenefits).map((b, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-2 hover:border-white/20 transition-colors">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{b.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/for-colleges"
                  className="btn-colorful-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white rounded-xl shadow-xl transition-all"
                >
                  <span>Request Institutional Demo</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-300 font-semibold">
                  Join over 85+ partner institutions nationwide
                </span>
              </div>
            </div>

            {/* Right Column: Visual Partnership Showcase */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="p-6 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-4 shadow-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Partner Institutions & Networks:
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {partnerLogos.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className={`p-3 rounded-xl border text-xs font-bold text-center flex items-center justify-center transition-all ${p.color}`}
                    >
                      {p.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 border border-cyan-500/30 text-xs text-cyan-200">
                <strong>Standardized Transcripts:</strong> Automated credentialing co-signed by university departments and corporate evaluation boards.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
