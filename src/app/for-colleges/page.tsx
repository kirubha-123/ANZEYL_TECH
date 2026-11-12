"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GraduationCapIcon, BuildingIcon, BarChartIcon, CheckCircleIcon } from "@/components/Icons";

export default function ForCollegesPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            Higher Ed & Enterprise Partnership
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            ANZEYL for <span className="text-gradient-brand">Colleges & Universities</span>
          </h1>
          <p className="text-base text-slate-300">
            Empower your computer science & tech departments with proctored AI skill analytics, automated coding lab evaluations, and direct recruiter matching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl border border-white/10 card-glow-rose space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
              <GraduationCapIcon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Curriculum Integration</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Embed adaptive AI practice modules directly into CS syllabus courses with automated lab grading and proctored coding assessments.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 card-glow-cyan space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
              <BarChartIcon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Campus Analytics Dashboard</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Deans & department heads gain real-time visibility into student technical competency across batches and individual learning tracks.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 card-glow-emerald space-y-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg">
              <BuildingIcon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Direct Recruiter Outreach</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Top-scoring campus students automatically get highlighted to hiring partner recruiters for high-paying internships and software engineering roles.
            </p>
          </div>
        </div>

        {/* Demo Request Contact Form */}
        <div className="human-surface p-8 sm:p-12 rounded-3xl border border-white/15 max-w-2xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
          {/* Top Rainbow Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 to-cyan-500" />

          <h2 className="text-2xl font-bold text-white text-center pt-2">
            Request an Institutional Partner Demo
          </h2>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
              <span>Thank you! Our institutional partnerships team will contact you shortly.</span>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Institution Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanford University / Tech Institute"
                  className="human-input w-full px-4 py-3 rounded-xl text-sm placeholder:text-slate-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Official Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="dean@university.edu"
                  className="human-input w-full px-4 py-3 rounded-xl text-sm placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                className="btn-colorful-primary w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-xl transition-all cursor-pointer"
              >
                Submit Demo Request
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
