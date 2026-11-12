"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SparklesIcon,
  ClockIcon,
  ChevronRightIcon,
} from "@/components/Icons";

interface Question {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_DATA: Record<string, { title: string; durationMins: number; questions: Question[] }> = {
  "react-mastery": {
    title: "React 19 & Next.js 16 Production Assessment",
    durationMins: 15,
    questions: [
      {
        id: 1,
        question: "When using Server Actions in Next.js 16 App Router, where is the server action executed?",
        options: [
          "In the client browser via WebAssembly",
          "Exclusively on the server / edge runtime with direct access to backend resources",
          "In a background service worker thread on the client machine",
          "During static compilation only; it cannot run dynamically",
        ],
        correctIndex: 1,
        explanation: "Server Actions are asynchronous functions executed exclusively on the server or edge runtime. They compile into internal POST endpoints and have direct access to database clients, secrets, and private environment variables.",
      },
      {
        id: 2,
        question: "How does the React 19 Compiler change how developers optimize component re-renders?",
        codeSnippet: `// React 19 component
export function UserList({ users, filterQuery }) {
  const filtered = users.filter(u => u.name.includes(filterQuery));
  return <ul>{filtered.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
        options: [
          "Developers must still manually wrap all array operations in useMemo",
          "The compiler parses the AST and automatically inserts fine-grained memoization instructions, removing the need for manual useMemo",
          "The compiler forces all components to become class components",
          "The compiler disables all re-renders completely",
        ],
        correctIndex: 1,
        explanation: "The React 19 compiler automatically detects dependencies and injects memoization at the syntax tree level, allowing developers to write idiomatic JavaScript without manually managing dependency arrays in useMemo and useCallback.",
      },
      {
        id: 3,
        question: "In PostgreSQL with Supabase Row Level Security (RLS) enabled, what is required for an authenticated user to read rows?",
        codeSnippet: `ALTER TABLE projects ENABLE ROW LEVEL SECURITY;`,
        options: [
          "RLS automatically permits all reads by default",
          "An explicit CREATE POLICY FOR SELECT must be defined that evaluates to TRUE for the user's auth.uid()",
          "The user must send their secret service_role key from the browser",
          "Supabase tables cannot be read once RLS is turned on",
        ],
        correctIndex: 1,
        explanation: "PostgreSQL RLS operates on a strict default-deny model. When enabled, zero rows are accessible until a policy (such as \`CREATE POLICY \"Allow read\" ON projects FOR SELECT USING (auth.uid() = user_id);\`) is declared.",
      },
      {
        id: 4,
        question: "What is the primary benefit of Partial Prerendering (PPR) in Next.js 16?",
        options: [
          "It serves a fast static shell from edge cache while streaming dynamic holes inside <Suspense> boundaries over the same HTTP stream",
          "It replaces all client components with static images",
          "It eliminates the need for CSS",
          "It turns client state into browser cookies automatically",
        ],
        correctIndex: 0,
        explanation: "PPR merges the instant TTFB benefits of static pre-rendering with dynamic server streaming, allowing static layout shells to be served instantly from global CDNs while dynamic user data streams concurrently.",
      },
      {
        id: 5,
        question: "Why should you never expose NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY in your Next.js application?",
        options: [
          "It makes the page render slower",
          "The NEXT_PUBLIC prefix bundles the key into client browser JavaScript, allowing malicious users to bypass all RLS policies and drop tables",
          "Supabase does not support service role keys",
          "The key only works in local development and fails in production",
        ],
        correctIndex: 1,
        explanation: "The service_role key has unrestricted superuser privileges and bypasses all Row Level Security. Any variable with \`NEXT_PUBLIC_\` is baked into the browser bundle and accessible to anyone via DevTools.",
      },
    ],
  },
};

export default function QuizRunnerClient({ quizId }: { quizId: string }) {
  const quiz = QUIZ_DATA[quizId] || QUIZ_DATA["react-mastery"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showInstantExplanation, setShowInstantExplanation] = useState(false);
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  const currentQ = quiz.questions[currentIndex];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optIdx,
    });
  };

  const toggleFlag = () => {
    if (flaggedQuestions.includes(currentIndex)) {
      setFlaggedQuestions(flaggedQuestions.filter((q) => q !== currentIndex));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentIndex]);
    }
  };

  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = scorePercentage >= 70;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/portal" className="hover:text-white transition-colors">
              Portal
            </Link>
            <ChevronRightIcon className="w-3.5 h-3.5" />
            <span className="text-cyan-400 font-bold">Assessment Quiz</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            {quiz.title}
          </h1>
        </div>

        {!isSubmitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs font-bold">
              <ClockIcon className="w-4 h-4" />
              <span>12:45 Remaining</span>
            </div>
            <button
              onClick={() => setIsSubmitted(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Question {currentIndex + 1} of {quiz.questions.length}
                </span>

                <button
                  onClick={toggleFlag}
                  className={`text-xs font-semibold px-3 py-1 rounded-xl border transition-colors flex items-center gap-1.5 ${
                    flaggedQuestions.includes(currentIndex)
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <span>{flaggedQuestions.includes(currentIndex) ? "🚩 Flagged" : "Flag for Review"}</span>
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h2>

                {currentQ.codeSnippet && (
                  <div className="rounded-2xl bg-black/70 p-4 font-mono text-xs text-cyan-300 border border-white/10 overflow-x-auto">
                    <pre>{currentQ.codeSnippet}</pre>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  const letter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                        isSelected
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 scale-[1.01]"
                          : "bg-[#0b0e18] border-white/10 text-slate-300 hover:bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? "bg-cyan-500 text-slate-950 border-cyan-400 font-black"
                            : "bg-white/10 text-slate-300 border-white/10"
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="mt-0.5 leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowInstantExplanation(!showInstantExplanation)}
                  className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <SparklesIcon className="w-3.5 h-3.5 text-amber-300" />
                  <span>{showInstantExplanation ? "Hide Explanation" : "Peek Explanation & Rationale"}</span>
                </button>
                {showInstantExplanation && (
                  <div className="mt-3 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-200 leading-relaxed">
                    <strong className="block text-cyan-300 mb-1">Architecture Rationale:</strong>
                    {currentQ.explanation}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => {
                    setCurrentIndex((prev) => Math.max(0, prev - 1));
                    setShowInstantExplanation(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:hover:bg-white/5 text-xs font-bold transition-colors"
                >
                  ← Previous
                </button>

                {currentIndex < quiz.questions.length - 1 ? (
                  <button
                    onClick={() => {
                      setCurrentIndex((prev) => Math.min(quiz.questions.length - 1, prev + 1));
                      setShowInstantExplanation(false);
                    }}
                    className="px-5 py-2 rounded-xl btn-colorful-primary text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/25"
                  >
                    Finish & View Score
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Question Palette
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {quiz.questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isCurrent = idx === currentIndex;
                  const isFlagged = flaggedQuestions.includes(idx);

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowInstantExplanation(false);
                      }}
                      className={`h-10 rounded-xl font-bold text-xs transition-all border flex items-center justify-center relative ${
                        isCurrent
                          ? "border-cyan-400 text-white ring-2 ring-cyan-400/50 bg-cyan-500/20"
                          : isAnswered
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500" />
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-white/10 border border-white/20" />
                  <span>Unanswered ({quiz.questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-400" />
                  <span>Flagged ({flaggedQuestions.length})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="glass-card p-8 rounded-3xl border border-white/15 bg-[#0f1424] text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 via-emerald-400 to-cyan-400" />

            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 p-[3px] shadow-2xl shadow-cyan-500/30">
              <div className="w-full h-full bg-[#0d111d] rounded-[21px] flex items-center justify-center text-3xl font-black text-white">
                {scorePercentage}%
              </div>
            </div>

            <div className="space-y-2">
              <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                passed ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              }`}>
                {passed ? "Assessment Passed • Qualified" : "Review Required"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {passed ? "Outstanding Performance!" : "Good Effort, Keep Practicing!"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                You answered <strong className="text-white">{correctCount} of {quiz.questions.length}</strong> questions correctly. {passed ? "You have unlocked a verified ANZEYL Tuition Discount Voucher!" : "Review the breakdown below and re-test to qualify for voucher credits."}
              </p>
            </div>

            {passed && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#0f1424] to-cyan-950/60 border border-emerald-500/40 text-left max-w-xl mx-auto space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏷️</span>
                    <strong className="text-white text-sm">35% Tuition Discount Voucher Unlocked!</strong>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Use your unique merit voucher code at enrollment for industrial internships or pro training cohorts:
                </p>
                <div className="flex items-center gap-2 bg-[#0b0e18] p-3 rounded-2xl border border-emerald-500/30">
                  <code className="text-emerald-400 font-mono font-bold text-sm tracking-wider flex-1">
                    SB-MERIT-{scorePercentage}PCT-REACT
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`SB-MERIT-${scorePercentage}PCT-REACT`);
                      setVoucherClaimed(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    {voucherClaimed ? "✓ Copied" : "Copy Code"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentIndex(0);
                  setSelectedAnswers({});
                  setFlaggedQuestions([]);
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
              >
                Retake Assessment
              </button>
              <Link
                href="/portal/certificates"
                className="px-5 py-2.5 rounded-xl btn-colorful-primary text-white font-bold text-xs transition-all shadow-md shadow-cyan-500/25"
              >
                View Earned Certificates →
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Detailed Answer Breakdown:</h3>
            <div className="space-y-4">
              {quiz.questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl border space-y-3 ${
                      isCorrect
                        ? "bg-emerald-950/20 border-emerald-500/30"
                        : "bg-rose-950/20 border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Question {idx + 1}</span>
                      <span className={`font-bold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                        {isCorrect ? "✓ Correct (+20 XP)" : "✗ Incorrect (0 XP)"}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 font-medium">{q.question}</p>

                    <div className="text-xs space-y-1 pt-1">
                      <div className="text-slate-400">
                        Your Answer:{" "}
                        <span className={isCorrect ? "text-emerald-300 font-bold" : "text-rose-300 font-bold"}>
                          {userAns !== undefined ? q.options[userAns] : "Not Answered"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="text-slate-400">
                          Correct Answer:{" "}
                          <span className="text-emerald-300 font-bold">{q.options[q.correctIndex]}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300 leading-relaxed">
                      <strong className="text-cyan-300 block mb-0.5">Explanation:</strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
