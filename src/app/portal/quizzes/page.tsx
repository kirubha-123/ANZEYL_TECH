"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  ZapIcon,
} from "@/components/Icons";

const QUIZZES = [
  {
    id: "react-mastery",
    title: "React 19 & Next.js 16 Production Assessment",
    questionsCount: 5,
    durationMins: 15,
    difficulty: "Advanced",
    category: "Frontend & Full-Stack",
    passingScore: 70,
    voucherBonus: "Up to 50% Tuition Discount",
    attemptsLeft: 3,
  },
  {
    id: "system-design",
    title: "High-Concurrency Distributed Systems & Kafka",
    questionsCount: 10,
    durationMins: 25,
    difficulty: "Senior Architect",
    category: "System Design",
    passingScore: 75,
    voucherBonus: "Up to 40% Tuition Discount",
    attemptsLeft: 2,
  },
  {
    id: "supabase-postgres",
    title: "PostgreSQL Row Level Security & Server Actions",
    questionsCount: 8,
    durationMins: 20,
    difficulty: "Intermediate",
    category: "Database & Security",
    passingScore: 70,
    voucherBonus: "Up to 35% Tuition Discount",
    attemptsLeft: 3,
  },
  {
    id: "ai-agent-engineering",
    title: "Autonomous LLM Agents, Tools & Function Calling",
    questionsCount: 12,
    durationMins: 30,
    difficulty: "Cutting-Edge",
    category: "AI & Machine Learning",
    passingScore: 75,
    voucherBonus: "Up to 50% Tuition Discount",
    attemptsLeft: 2,
  },
];

export default function QuizzesCatalogPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
            Merit Assessment Suite
          </span>
          <span className="text-xs text-slate-400">Score 70%+ to unlock corporate tuition credits</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Practice Quizzes & Placement Assessments
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Evaluate your engineering competency with timed scenario-based evaluations. Passing scores automatically unlock merit discount vouchers for career cohorts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {QUIZZES.map((quiz) => (
          <div
            key={quiz.id}
            className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 hover:border-cyan-500/40 transition-all space-y-5 flex flex-col justify-between shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                  {quiz.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
                  {quiz.difficulty}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {quiz.title}
              </h2>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#0b0e18] border border-white/5">
                  <span className="block text-[10px] text-slate-400">Questions</span>
                  <span className="font-bold text-white">{quiz.questionsCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0b0e18] border border-white/5">
                  <span className="block text-[10px] text-slate-400">Time Limit</span>
                  <span className="font-bold text-white">{quiz.durationMins} Mins</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0b0e18] border border-white/5">
                  <span className="block text-[10px] text-slate-400">Pass Cutoff</span>
                  <span className="font-bold text-emerald-400">{quiz.passingScore}%</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 flex items-center gap-2">
                <ZapIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Merit Reward: {quiz.voucherBonus}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
              <span className="text-slate-400">Attempts: {quiz.attemptsLeft} remaining</span>
              <Link
                href={`/portal/quizzes/${quiz.id}`}
                className="btn-colorful-primary px-5 py-2.5 rounded-xl text-white font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:scale-105 transition-all"
              >
                <span>Start Assessment</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
