import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  SparklesIcon,
  AwardIcon,
  TargetIcon,
  ArrowRightIcon,
} from "@/components/Icons";

export default function AboutPage() {
  const leadership = [
    {
      name: "Kirubhakaran",
      role: "Founder & Chief Executive Officer",
      background: "Founder of ANZEYL SOLUTIONS, Bangalore, Karnataka · Pioneering accessible, project-driven engineering mentorship and AI-powered learning.",
      imageInitials: "KB",
      color: "from-emerald-400 via-lime-400 to-cyan-500",
    },
    {
      name: "Dr. Rohini Sundaram",
      role: "Chief AI Scientist & Academic Dean",
      background: "Ex-Stanford AI Lab, 13+ yrs in deep learning & autonomous agents",
      imageInitials: "RS",
      color: "from-rose-500 to-indigo-600",
    },
    {
      name: "Aditya Verma",
      role: "VP of Engineering & Curriculum",
      background: "Ex-Razorpay & CloudScale, 11+ yrs in distributed systems & Next.js",
      imageInitials: "AV",
      color: "from-cyan-400 to-blue-600",
    },
    {
      name: "Siddharth Nambiar",
      role: "Head of Industry Partnerships",
      background: "Ex-Morgan Financial Tech, 12+ yrs connecting graduates with top product firms",
      imageInitials: "SN",
      color: "from-amber-400 to-orange-600",
    },
  ];

  const milestones = [
    { number: "14,000+", label: "Active Learners Enrolled" },
    { number: "88.4%", label: "Course Completion Rate" },
    { number: "120+", label: "Hiring Startup Partners" },
    { number: "₹4.8 Cr", label: "Tuition Discounts Awarded" },
  ];

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider shadow-lg">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>The ANZEYL Pedagogy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Bridging the Chasm Between <br />
            <span className="text-gradient-brand">Curriculum & Production Engineering</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            ANZEYL SOLUTIONS is a next-generation EdTech platform built to eliminate tutorial paralysis. 
            We pair 24/7 personalized AI tutoring with proctored benchmark assessments, live mentor review, 
            and guaranteed paid internships.
          </p>
        </div>

        {/* Milestones Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-3xl border border-white/10 text-center space-y-1 shadow-xl"
            >
              <div className="text-3xl sm:text-4xl font-black text-white">{item.number}</div>
              <div className="text-xs text-slate-400 font-semibold">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Core Pillars */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/15 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 to-cyan-500" />

          <div className="max-w-2xl space-y-2 pt-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why We Built ANZEYL</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Traditional computer science degrees leave students with theoretical models but minimal familiarity 
              with production pull requests, distributed systems, or modern cloud stacks. Self-taught developers, 
              meanwhile, suffer from isolated tutorial learning and lack verifiable credentials that recruiters trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-[#0b0e18] border border-cyan-500/30 space-y-3 card-glow-cyan transition-all">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">24/7 AI Code Tutor</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Learners never get stuck for hours on a syntax bug or architecture confusion. Our context-aware AI tutor explains code line-by-line, suggests fixes, and generates targeted drill exercises.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b0e18] border border-amber-500/30 space-y-3 card-glow-amber transition-all">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <TargetIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Adaptive Proctored Testing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We benchmark real engineering capability, not multiple-choice memorization. Students take timed code challenges evaluated against real industry rubrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b0e18] border border-emerald-500/30 space-y-3 card-glow-emerald transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <AwardIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Merit Tuition Discounts</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We reward dedication. Students scoring 70%+ on assessments automatically unlock between 15% and 50% tuition reduction vouchers across all bootcamps and certification tracks.
              </p>
            </div>
          </div>
        </div>

        {/* Academic & Industry Advisory Board */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Academic & Industry Mentorship Board</h3>
            <p className="text-xs sm:text-sm text-slate-400">Led by engineers and researchers from top technology leaders</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-cyan-500/50 transition-all shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${person.color} p-[2px] shadow-lg shrink-0`}>
                    <div className="w-full h-full rounded-[14px] bg-[#0d111d] flex items-center justify-center font-bold text-base text-white">
                      {person.imageInitials}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{person.name}</h4>
                    <p className="text-xs text-cyan-300 font-semibold">{person.role}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {person.background}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional & College Placement Strip */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#12162a] via-[#101424] to-[#12162a] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Institutional Accreditation
            </span>
            <h4 className="text-xl font-bold text-white">
              Partnering with 50+ Engineering Colleges & Universities
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              We provide colleges with autonomous skill testing labs, accredited course credit integration, and direct placement cell recruitment drives.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/for-colleges"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 transition-all"
            >
              College Portal
            </Link>
            <Link
              href="/get-started"
              className="btn-colorful-primary px-5 py-3 rounded-xl text-white text-xs font-bold shadow-lg flex items-center gap-2"
            >
              <span>Join as Student</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
