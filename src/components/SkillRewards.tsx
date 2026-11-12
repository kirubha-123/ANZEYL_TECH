"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrophyIcon,
  ZapIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  HelpCircleIcon,
} from "./Icons";
import { formatINR } from "@/lib/formatters";

export const SkillRewards: React.FC = () => {
  const [score, setScore] = useState<number>(85);

  const getTierInfo = (currentScore: number) => {
    if (currentScore >= 90) {
      return {
        tier: "Platinum Tier",
        discount: 50,
        badgeBg: "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500",
        badgeText: "text-slate-950",
        voucher: "PLATINUM-50",
        desc: "Outstanding score! You unlock maximum 50% course tuition discount.",
        originalPrice: 199,
        discountedPrice: 99,
        glowColor: "border-amber-500/50 shadow-amber-500/20",
        textColor: "text-amber-400",
      };
    } else if (currentScore >= 80) {
      return {
        tier: "Gold Tier",
        discount: 30,
        badgeBg: "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500",
        badgeText: "text-slate-950",
        voucher: "GOLD-30",
        desc: "Great job! You qualify for a 30% course discount voucher.",
        originalPrice: 199,
        discountedPrice: 139,
        glowColor: "border-orange-500/50 shadow-orange-500/20",
        textColor: "text-orange-400",
      };
    } else if (currentScore >= 70) {
      return {
        tier: "Silver Tier",
        discount: 15,
        badgeBg: "bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500",
        badgeText: "text-slate-950",
        voucher: "SILVER-15",
        desc: "Solid performance! You earn a 15% course tuition discount.",
        originalPrice: 199,
        discountedPrice: 169,
        glowColor: "border-cyan-500/50 shadow-cyan-500/20",
        textColor: "text-cyan-400",
      };
    } else {
      return {
        tier: "Developing Tier",
        discount: 0,
        badgeBg: "bg-gradient-to-r from-fuchsia-600 to-violet-600",
        badgeText: "text-white",
        voucher: "PRACTICE-MORE",
        desc: "Score 70% or higher to unlock discount vouchers. Keep practicing with our AI Tutor!",
        originalPrice: 199,
        discountedPrice: 199,
        glowColor: "border-violet-500/50 shadow-violet-500/20",
        textColor: "text-violet-400",
      };
    }
  };

  const currentTier = getTierInfo(score);

  return (
    <section className="py-24 bg-colorful-mesh relative overflow-hidden border-t border-white/10">
      
      {/* Background Accent Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            Merit-Based Incentive Model
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Earn <span className="text-gradient-gold">Skill-Based Course Discounts</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            We believe higher skill levels deserve lower learning barriers. Validate your knowledge through adaptive tests and unlock immediate tuition savings.
          </p>

          {/* Demonstration Notice */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-slate-300 text-xs text-center mt-2 shadow-md">
            <HelpCircleIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-amber-300 font-bold">Demonstration Notice:</strong> All discount tiers and vouchers are illustrative sample examples for platform preview.
            </span>
          </div>
        </div>

        {/* Reward Tiers Grid & Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Score Simulator Card */}
          <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-white/15 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Top Rainbow Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600" />

            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 pt-2">
                <div className="flex items-center gap-2">
                  <TrophyIcon className="w-6 h-6 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Interactive Discount Calculator</h3>
                </div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Drag Slider to Test
                </span>
              </div>

              {/* Slider Control */}
              <div className="space-y-4 bg-[#0b0e18] p-6 rounded-2xl border border-white/10 shadow-inner">
                <div className="flex justify-between items-center">
                  <label htmlFor="assessment-score-range" className="text-sm font-bold text-slate-200">
                    Simulated Assessment Score:
                  </label>
                  <span className="text-3xl font-black text-gradient-gold font-mono">
                    {score}%
                  </span>
                </div>

                <input
                  id="assessment-score-range"
                  aria-label="Simulated Assessment Score"
                  type="range"
                  min="50"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                <div className="flex justify-between text-xs text-slate-400 font-bold">
                  <span className="text-violet-400">50% Standard</span>
                  <span className="text-cyan-400">70% (Silver 15%)</span>
                  <span className="text-orange-400">80% (Gold 30%)</span>
                  <span className="text-amber-400">90%+ (Platinum 50%)</span>
                </div>
              </div>

              {/* Simulated Unlocked Result Box */}
              <div className={`p-6 rounded-2xl bg-[#0b0e18] border ${currentTier.glowColor} space-y-4 shadow-xl transition-all`}>
                <div className="flex items-center justify-between">
                  <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${currentTier.badgeBg} ${currentTier.badgeText} shadow-md`}>
                    {currentTier.tier}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>Verified Qualification</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {currentTier.desc}
                </p>

                {/* Price Transformation Example */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Sample Course Price</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-black text-white">{formatINR(currentTier.discountedPrice)}</span>
                      {currentTier.discount > 0 && (
                        <span className="text-sm text-slate-500 line-through font-bold">{formatINR(currentTier.originalPrice)}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-semibold">Unlocked Savings</span>
                    <span className="text-xl font-black text-emerald-400 block mt-0.5">
                      {currentTier.discount > 0 ? `${currentTier.discount}% OFF (${formatINR(currentTier.originalPrice - currentTier.discountedPrice)} Saved)` : `${formatINR(0)} Saved`}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-300">
                Sample discount voucher code: <code className="text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded font-mono font-bold">{currentTier.voucher}</code>
              </span>
              <Link
                href="/assessments"
                className="btn-colorful-amber w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                <span>Take Practice Test</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Score Tier Explanations */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="p-7 rounded-3xl bg-[#0e1322] border border-white/10 space-y-5 shadow-2xl">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                <ZapIcon className="w-5 h-5 text-amber-400" />
                <span className="text-white text-base">Tier Discount Structure</span>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-400 block">Score 90% – 100%</span>
                    <h4 className="text-sm font-bold text-white">Platinum Reward Tier</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black shadow-md">
                    50% Discount
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-orange-400 block">Score 80% – 89%</span>
                    <h4 className="text-sm font-bold text-white">Gold Reward Tier</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-black shadow-md">
                    30% Discount
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 block">Score 70% – 79%</span>
                    <h4 className="text-sm font-bold text-white">Silver Reward Tier</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-black shadow-md">
                    15% Discount
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/30 space-y-3 shadow-xl">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-purple-200">Fair Proctored Testing Integrity</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Assessments utilize randomized algorithmic question banks, proctored code execution checks, and timed sections to ensure integrity and equal opportunity for every student.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
