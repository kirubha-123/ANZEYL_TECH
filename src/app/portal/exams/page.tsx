"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheckIcon,
  AwardIcon,
  ArrowRightIcon,
} from "@/components/Icons";

export default function ExamsPortalPage() {
  const [activeExam, setActiveExam] = useState<string | null>(null);
  const [cameraVerified, setCameraVerified] = useState(true);
  const [agreedHonorCode, setAgreedHonorCode] = useState(false);

  const exams = [
    {
      id: "fs-cert-2026",
      title: "ANZEYL Certified Full-Stack Cloud Engineer (SACE)",
      code: "CERT-EXAM-701",
      durationMins: 45,
      questionsCount: 25,
      attemptsRemaining: 1,
      totalAttempts: 2,
      passingCutoff: 75,
      badge: "Industry Accredited",
      reward: "Verified Certificate + 50% Tuition Discount Voucher",
    },
    {
      id: "ai-cert-2026",
      title: "Autonomous Agent Architect & LLM Systems Professional",
      code: "CERT-EXAM-802",
      durationMins: 60,
      questionsCount: 30,
      attemptsRemaining: 2,
      totalAttempts: 2,
      passingCutoff: 80,
      badge: "AI Track Elite",
      reward: "Verified Certificate + 50% Tuition Discount Voucher",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
            Proctored Testing Suite
          </span>
          <span className="text-xs text-slate-400">Anti-Cheating & Honor Code Enforced</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Proctored Certification Examinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Complete proctored assessments under simulated examination conditions. Achieving 75%+ unlocks official blockchain-verifiable credentials and maximum 50% merit tuition discount vouchers.
        </p>
      </div>

      {/* Proctored Integrity Safeguards Banner */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-purple-500/30 bg-[#0f1424]/90 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
            <ShieldCheckIcon className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI-Proctored Integrity Environment</h3>
            <p className="text-xs text-slate-400">
              Exam sessions record browser tab changes, clipboard activity, and periodic webcam verification frames.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-2xl bg-[#0b0e18] border border-white/5 flex items-center gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <div>
              <strong className="block text-white text-xs">Webcam Readiness</strong>
              <span className="text-[11px] text-emerald-400">Active (720p HD)</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#0b0e18] border border-white/5 flex items-center gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <div>
              <strong className="block text-white text-xs">Audio Monitoring</strong>
              <span className="text-[11px] text-emerald-400">Noise Calibration Normal</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#0b0e18] border border-white/5 flex items-center gap-2.5">
            <span className="text-amber-400 font-bold">⚠</span>
            <div>
              <strong className="block text-white text-xs">Tab Switch Limit</strong>
              <span className="text-[11px] text-amber-300">Max 2 Warnings Allowed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Examinations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 hover:border-cyan-500/40 transition-all space-y-5 flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {exam.badge}
                </span>
                <span className="font-mono text-slate-400 text-[11px]">{exam.code}</span>
              </div>

              <h2 className="text-lg font-bold text-white leading-snug">{exam.title}</h2>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#0b0e18] border border-white/5">
                  <span className="block text-[10px] text-slate-400">Questions</span>
                  <span className="font-bold text-white">{exam.questionsCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0b0e18] border border-white/5">
                  <span className="block text-[10px] text-slate-400">Duration</span>
                  <span className="font-bold text-white">{exam.durationMins} Mins</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0b0e18] border border-white/5">
                  <span className="block text-[10px] text-slate-400">Pass Cutoff</span>
                  <span className="font-bold text-emerald-400">{exam.passingCutoff}%</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 flex items-start gap-2.5">
                <AwardIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300">Certification & Voucher Reward:</strong>
                  <span>{exam.reward}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
              <span className="text-slate-400">
                Attempts: <strong className="text-white">{exam.attemptsRemaining} of {exam.totalAttempts}</strong> remaining
              </span>

              <button
                onClick={() => setActiveExam(exam.id)}
                className="btn-colorful-primary px-5 py-2.5 rounded-xl text-white font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:scale-105 transition-all"
              >
                <span>Launch Exam Chamber</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Proctored Exam Modal Chamber */}
      {activeExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-xl w-full p-8 rounded-3xl border border-cyan-500/40 bg-[#0f1424] space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Proctored Security Verification</h3>
              </div>
              <button
                onClick={() => setActiveExam(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed">
                Before commencing the examination, please confirm that your environment meets the strict anti-cheating and proctoring parameters:
              </p>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#0b0e18] border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cameraVerified}
                    onChange={(e) => setCameraVerified(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500"
                  />
                  <span className="text-slate-200">
                    Webcam and microphone streams are verified and face is clearly visible.
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#0b0e18] border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedHonorCode}
                    onChange={(e) => setAgreedHonorCode(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500"
                  />
                  <span className="text-slate-200">
                    I agree to the ANZEYL Academic Honor Code. I will not use unauthorized AI generators, secondary monitors, or switch tabs.
                  </span>
                </label>
              </div>

              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px]">
                Notice: Starting the exam consumes 1 official attempt. You will have 45 uninterrupted minutes to finish.
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveExam(null)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
              >
                Abort
              </button>
              <Link
                href="/portal/quizzes/react-mastery"
                onClick={() => setActiveExam(null)}
                className={`flex-1 py-3 rounded-xl text-center font-black text-xs transition-all shadow-lg ${
                  cameraVerified && agreedHonorCode
                    ? "btn-colorful-primary text-white shadow-cyan-500/25"
                    : "bg-white/10 text-slate-500 pointer-events-none"
                }`}
              >
                Begin Proctored Exam →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
