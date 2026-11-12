import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SparklesIcon, ArrowRightIcon, HelpCircleIcon } from "@/components/Icons";

export default function AiTutorPage() {
  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            24/7 Learning Companion
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            ANZEYL <span className="text-gradient-brand">AI Tutor Interface</span>
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            Get instant code debugging hints, line-by-line syntax breakdowns, and interactive practice question generation.
          </p>

          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 text-xs mt-2 shadow-md">
            <HelpCircleIcon className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Interactive Demo Preview — Live API stream unlocks upon account login.</span>
          </div>
        </div>

        {/* AI Tutor Chat Simulator */}
        <div className="glass-card p-6 sm:p-9 rounded-3xl border border-white/15 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Colorful Top Accent Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500" />

          <div className="flex items-center justify-between border-b border-white/10 pb-4 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-violet-600 flex items-center justify-center text-white shadow-md">
                <SparklesIcon className="w-4 h-4 text-amber-200" />
              </div>
              <span className="text-sm font-bold text-white">Active Chat: Full-Stack React & Next.js</span>
            </div>
            <span className="badge-vibrant-emerald px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Online 24/7</span>
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#0b0e18] border border-white/10 text-sm space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">You</span>
              <p className="text-slate-200 font-medium">How do I fix a hydration mismatch error in Next.js?</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#14192a] border border-violet-500/40 text-sm space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-fuchsia-300 font-bold text-xs">
                <SparklesIcon className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>ANZEYL Assistant</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-normal">
                Hydration errors happen when initial HTML generated on the server doesn&apos;t match HTML rendered on the client. Common causes: rendering dynamic dates, browser-only window checks, or invalid HTML nesting (e.g. putting a &lt;div&gt; inside a &lt;p&gt; tag).
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <input
              type="text"
              readOnly
              value="Ask AI Tutor a question (Sign in to unlock interactive prompt)..."
              className="human-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-400 cursor-not-allowed"
            />
            <Link
              href="/get-started"
              className="btn-colorful-primary px-6 py-3 rounded-xl text-white text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2 shrink-0 transition-all cursor-pointer"
            >
              <span>Sign In to Chat</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
