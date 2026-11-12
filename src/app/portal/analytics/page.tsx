"use client";

import React from "react";
import {
  ZapIcon,
  ClockIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "@/components/Icons";

export default function AnalyticsPage() {
  const masterySkills = [
    { name: "React 19 & Next.js 16 Internals", score: 88, status: "Mastered", color: "from-cyan-400 to-blue-500" },
    { name: "PostgreSQL & Supabase Row Level Security", score: 95, status: "Mastered", color: "from-emerald-400 to-teal-500" },
    { name: "Distributed Microservices & Kafka", score: 65, status: "Proficient", color: "from-purple-400 to-indigo-500" },
    { name: "Autonomous LLM Agents & Tool Calling", score: 72, status: "Proficient", color: "from-amber-400 to-rose-500" },
  ];

  const weeklyHours = [
    { day: "Mon", hours: 2.5, percent: 60 },
    { day: "Tue", hours: 4.0, percent: 90 },
    { day: "Wed", hours: 3.2, percent: 75 },
    { day: "Thu", hours: 1.8, percent: 45 },
    { day: "Fri", hours: 4.5, percent: 100 },
    { day: "Sat", hours: 3.0, percent: 70 },
    { day: "Sun", hours: 2.0, percent: 50 },
  ];

  const recentAssessments = [
    {
      title: "React 19 & Next.js 16 Assessment",
      date: "Oct 28, 2026",
      score: "88%",
      passed: true,
      reward: "35% Tuition Discount Voucher",
    },
    {
      title: "Supabase RLS & PostgreSQL Security Exam",
      date: "Oct 22, 2026",
      score: "94%",
      passed: true,
      reward: "Accredited Certificate Issued",
    },
    {
      title: "System Design Mock Interview Round",
      date: "Oct 15, 2026",
      score: "78%",
      passed: true,
      reward: "Rubric Scorecard Saved",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
            Growth & Metrics
          </span>
          <span className="text-xs text-slate-400">Cohort Omega Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Performance Analytics & Skill Radar
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Granular insight into your study velocity, topic mastery percentages, exam scores, and earned tuition vouchers.
        </p>
      </div>

      {/* Hero Stats Quad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 bg-[#0f1424]/90">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Study Velocity</span>
            <ClockIcon className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">48h 30m</div>
          <p className="text-[11px] text-cyan-300 font-semibold">+14h invested this week</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 bg-[#0f1424]/90">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Cohort XP</span>
            <ZapIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">1,450 XP</div>
          <p className="text-[11px] text-amber-300 font-semibold">Rank #14 in Cohort Omega</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 bg-[#0f1424]/90">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Assessments</span>
            <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">8 / 10 Passed</div>
          <p className="text-[11px] text-emerald-300 font-semibold">Average Score: 86.4%</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2 bg-[#0f1424]/90">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Tuition Savings</span>
            <ShieldCheckIcon className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">35% Locked</div>
          <p className="text-[11px] text-purple-300 font-semibold">Code: SB-MERIT-88</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Study Time Distribution */}
        <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Weekly Time Investment</h2>
            <span className="text-xs text-slate-400">22.0 Hours Total</span>
          </div>

          <div className="flex items-end justify-between gap-2 h-48 pt-6 px-2">
            {weeklyHours.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                  {item.hours}h
                </span>
                <div className="w-full max-w-[36px] bg-white/5 rounded-t-xl overflow-hidden h-36 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-xl group-hover:from-cyan-500 group-hover:to-cyan-300 transition-all duration-300"
                    style={{ height: `${item.percent}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Mastery Radar Bars */}
        <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Technical Domain Mastery</h2>
            <span className="text-xs text-cyan-400 font-semibold">Verified by AI Tutor</span>
          </div>

          <div className="space-y-5">
            {masterySkills.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{skill.name}</span>
                  <span className="text-cyan-300">{skill.score}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment History Ledger */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-4 shadow-xl">
        <h2 className="text-base font-bold text-white">Recent Assessment Scores & Vouchers</h2>

        <div className="space-y-3">
          {recentAssessments.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0b0e18] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <strong className="text-white text-sm block">{item.title}</strong>
                <span className="text-slate-400 text-[11px]">{item.date}</span>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black">
                  {item.score} Score
                </span>
                <span className="text-cyan-300 font-semibold">{item.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
