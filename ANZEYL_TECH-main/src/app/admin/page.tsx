"use client";

import React from "react";
import Link from "next/link";
import {
  UsersIcon,
  ClockIcon,
  AwardIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
} from "@/components/Icons";
import { formatINR, formatIndianNumber } from "@/lib/formatters";

export default function AdminDashboardPage() {

  const kpis = [
    { title: "Total Enrolled Students", value: formatIndianNumber(1248), change: "+18% this month", color: "text-cyan-400" },
    { title: "Active Learning Hours", value: "14,250 hrs", change: "+24% velocity", color: "text-amber-400" },
    { title: "Merit Vouchers Unlocked", value: "312 Active", change: "42% redemption", color: "text-emerald-400" },
    { title: "Tuition Revenue Generated", value: formatINR(184500), change: "+32% vs last cohort", color: "text-purple-400" },
  ];

  const recentActivities = [
    { user: "Alex Rivera", action: "Mastered Server Actions with Supabase RLS", time: "10 mins ago", badge: "+50 XP", color: "text-cyan-400" },
    { user: "Priya Sharma", action: "Unlocked 50% Tuition Discount Voucher (Score 96%)", time: "35 mins ago", badge: "Voucher Active", color: "text-emerald-400" },
    { user: "Liam O'Connor", action: "Completed Capstone: High-Throughput Fintech Engine", time: "2 hours ago", badge: "Certificate Issued", color: "text-purple-400" },
    { user: "Sophia Zhang", action: "Submitted System Design Mock Interview for AI review", time: "3 hours ago", badge: "Evaluated 88/100", color: "text-amber-400" },
  ];

  const tracks = [
    { name: "Full-Stack React 19 & Next.js 16", students: 540, completion: 74 },
    { name: "Autonomous AI Agents & LLM Architecture", students: 410, completion: 62 },
    { name: "Distributed Cloud Architecture & Kafka", students: 298, completion: 51 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              Executive Management
            </span>
            <span className="text-xs text-slate-400">ANZEYL Platform Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Institutional Operations & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Real-time telemetry across student cohorts, curriculum pacing, proctored examinations, merit voucher redemptions, and accredited certificate issuance.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/courses"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-colors"
          >
            Manage Curriculum
          </Link>
          <Link
            href="/admin/live-classes"
            className="btn-colorful-primary px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/25"
          >
            <ClockIcon className="w-3.5 h-3.5" />
            <span>Schedule Live Class</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.title}
            className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-2 shadow-xl"
          >
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {kpi.title}
            </span>
            <div className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</div>
            <p className="text-xs text-slate-400 font-semibold">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Track Pacing & Real-Time Student Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Track Progress & Quick CMS Tools */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cohort Track Health */}
          <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white">Active Cohort Health & Pacing</h2>
              <Link href="/admin/courses" className="text-xs font-bold text-cyan-400 hover:underline">
                View All Tracks →
              </Link>
            </div>

            <div className="space-y-4">
              {tracks.map((track) => (
                <div key={track.name} className="space-y-2 p-4 rounded-2xl bg-[#070911] border border-white/5">
                  <div className="flex justify-between text-xs">
                    <strong className="text-white font-semibold">{track.name}</strong>
                    <span className="text-cyan-300 font-bold">{track.students} Enrolled</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full rounded-full"
                      style={{ width: `${track.completion}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Average Completion: {track.completion}%</span>
                    <span className="text-emerald-400 font-semibold">On Pace for Graduation</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Management Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/admin/students"
              className="p-5 rounded-3xl bg-[#0f1424]/90 border border-white/10 hover:border-cyan-400/50 transition-all space-y-2 block group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <UsersIcon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                Student Roster
              </h3>
              <p className="text-[11px] text-slate-400">Inspect 1,248 enrolled student profiles and test scores.</p>
            </Link>

            <Link
              href="/admin/question-bank"
              className="p-5 rounded-3xl bg-[#0f1424]/90 border border-white/10 hover:border-purple-400/50 transition-all space-y-2 block group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                Question Bank
              </h3>
              <p className="text-[11px] text-slate-400">Manage 50+ proctored exam questions and rubric scoring.</p>
            </Link>

            <Link
              href="/admin/certificates"
              className="p-5 rounded-3xl bg-[#0f1424]/90 border border-white/10 hover:border-amber-400/50 transition-all space-y-2 block group shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <AwardIcon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Issue Certificates
              </h3>
              <p className="text-[11px] text-slate-400">Sign and deploy verifiable SHA-256 credentials.</p>
            </Link>
          </div>
        </div>

        {/* Right Column: Live Event Stream & Recent Activities */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">Live Student Telemetry</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-3">
              {recentActivities.map((act, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#070911] border border-white/5 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-semibold">{act.user}</strong>
                    <span className="text-[10px] text-slate-400">{act.time}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{act.action}</p>
                  <span className={`inline-block text-[10px] font-bold ${act.color}`}>
                    {act.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Corporate Partner Placement Cell Quick Status */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 to-[#0f1424] border border-indigo-500/30 space-y-3 shadow-xl">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white">Campus & Corporate Hiring Gateway</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              34 certified graduates matched with Google, Microsoft, and Uber internship tracks this cycle.
            </p>
            <Link
              href="/admin/students"
              className="block text-center py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs transition-colors"
            >
              Review Graduate Placement List →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
