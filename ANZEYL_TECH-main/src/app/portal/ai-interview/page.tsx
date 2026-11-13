"use client";

import React, { useState } from "react";
import {
  SparklesIcon,
  ArrowRightIcon,
} from "@/components/Icons";

interface InterviewQuestion {
  id: number;
  type: "Technical Architecture" | "System Design" | "Behavioral STAR";
  question: string;
  context: string;
  expectedRubric: string[];
}

const QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    type: "Technical Architecture",
    question: "Walk me through how you would architect a high-traffic e-commerce checkout flow using Next.js 16 Server Actions, Supabase, and Stripe to prevent double-charging during network timeouts.",
    context: "Assess understanding of idempotency keys, database transactions, and optimistic UI.",
    expectedRubric: [
      "Use of Idempotency Keys on Stripe API requests",
      "Database row-locking or pending status in Supabase",
      "Webhook verification rather than relying on client redirect",
      "Handling network timeout gracefully with transaction rollback",
    ],
  },
  {
    id: 2,
    type: "System Design",
    question: "Design a distributed real-time notification service capable of broadcasting alerts to 100,000 concurrent students when a live class begins.",
    context: "Assess understanding of WebSockets vs SSE, Redis Pub/Sub, and load balancers.",
    expectedRubric: [
      "Choice of Server-Sent Events (SSE) or WebSockets",
      "Redis Pub/Sub or Apache Kafka cluster for message fanout",
      "Horizontally scaled node instances behind an ALB",
      "Connection pooling and backoff reconnection policies",
    ],
  },
];

export default function AiInterviewPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    overallScore: number;
    technicalScore: number;
    clarityScore: number;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const currentQ = QUESTIONS[currentIdx];

  const handleEvaluate = () => {
    if (!studentAnswer.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationResult({
        overallScore: 88,
        technicalScore: 92,
        clarityScore: 84,
        strengths: [
          "Identified the critical need for Idempotency Keys to prevent race conditions.",
          "Correctly placed database transaction boundaries inside PostgreSQL via Supabase RPC.",
          "Explained client-side state recovery during transient network errors.",
        ],
        improvements: [
          "Could mention exponential backoff jitter on Stripe payment retries.",
          "Consider discussing dead-letter queues (DLQ) for asynchronous webhook reconciliation.",
        ],
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
            AI Interview Simulator
          </span>
          <span className="text-xs text-slate-400">FAANG & Unicorn Mock Rounds</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          AI Mock Technical & System Design Interview
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Practice scenario-based architectural questions with simulated engineering interviewers. Receive an instant rubric scorecard with actionable suggestions.
        </p>
      </div>

      {/* Main Question Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between text-xs">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
            {currentQ.type}
          </span>
          <span className="text-slate-400">
            Question {currentIdx + 1} of {QUESTIONS.length}
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>
          <p className="text-xs text-slate-400 italic">Interview Context: {currentQ.context}</p>
        </div>

        {/* Expected Evaluation Criteria */}
        <div className="p-4 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-2 text-xs">
          <strong className="text-slate-300 block">Interview Rubric Focus:</strong>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
            {currentQ.expectedRubric.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Student Response Text Area */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-white">Your Architectural Proposal:</label>
          <textarea
            rows={7}
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Structure your answer using the STAR or architectural trade-off framework (e.g. 1. High-level architecture, 2. Database transaction lock, 3. Idempotency key implementation, 4. Failure recovery)..."
            className="w-full p-4 rounded-2xl bg-[#0b0e18] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              setStudentAnswer(
                "I would implement an idempotency key passed from client to the Next.js 16 Server Action. Before contacting Stripe, we create an order record in Supabase with status 'pending' in an atomic transaction. Stripe charges are executed with the idempotency key header. We listen to Stripe's secure webhook endpoint to mark the order 'completed' and grant access, ensuring network disconnections don't lead to double charges."
              );
            }}
            className="text-xs text-cyan-400 hover:underline"
          >
            Insert Sample Candidate Response
          </button>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || !studentAnswer.trim()}
            className="btn-colorful-primary px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            <SparklesIcon className="w-4 h-4 text-amber-300" />
            <span>{isEvaluating ? "Evaluating Rubric..." : "Submit for AI Evaluation"}</span>
          </button>
        </div>
      </div>

      {/* AI Scorecard & Feedback Card */}
      {evaluationResult && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-[#0f1424] space-y-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                Assessment Complete
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Rubric Scorecard & Analysis</h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Overall</span>
                <span className="text-2xl font-black text-emerald-400">
                  {evaluationResult.overallScore}/100
                </span>
              </div>
              <div className="text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Technical</span>
                <span className="text-2xl font-black text-cyan-400">
                  {evaluationResult.technicalScore}/100
                </span>
              </div>
              <div className="text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Clarity</span>
                <span className="text-2xl font-black text-purple-400">
                  {evaluationResult.clarityScore}/100
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <strong className="text-emerald-300 block font-bold text-sm">Key Strengths:</strong>
              <ul className="space-y-1.5 text-slate-200">
                {evaluationResult.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <strong className="text-amber-300 block font-bold text-sm">Improvement Opportunities:</strong>
              <ul className="space-y-1.5 text-slate-200">
                {evaluationResult.improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">→</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                if (currentIdx < QUESTIONS.length - 1) {
                  setCurrentIdx(currentIdx + 1);
                  setStudentAnswer("");
                  setEvaluationResult(null);
                } else {
                  alert("You have completed all mock interview questions for this track!");
                }
              }}
              className="px-5 py-2.5 rounded-xl btn-colorful-primary text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <span>Next Interview Question</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
