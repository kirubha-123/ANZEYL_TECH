"use client";

import React, { useState } from "react";
import {
  SearchIcon,
} from "@/components/Icons";

interface BankQuestion {
  id: string;
  category: string;
  difficulty: "Intermediate" | "Advanced" | "Architect";
  prompt: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const INITIAL_BANK: BankQuestion[] = [
  {
    id: "q-1",
    category: "React & Next.js 16",
    difficulty: "Advanced",
    prompt: "When using Server Actions in Next.js 16 App Router, where is the server action executed?",
    options: [
      "In the client browser via WebAssembly",
      "Exclusively on the server / edge runtime with direct access to backend resources",
      "In a background service worker thread",
      "During static compilation only",
    ],
    correctIdx: 1,
    explanation: "Server Actions execute exclusively on the server and compile into internal POST endpoints.",
  },
  {
    id: "q-2",
    category: "Supabase & PostgreSQL",
    difficulty: "Intermediate",
    prompt: "In PostgreSQL with Supabase Row Level Security (RLS) enabled, what is required for authenticated users to read rows?",
    options: [
      "RLS automatically permits all reads by default",
      "An explicit CREATE POLICY FOR SELECT must be defined evaluating to TRUE",
      "The user must send their secret service_role key from the browser",
      "Supabase tables cannot be read once RLS is turned on",
    ],
    correctIdx: 1,
    explanation: "PostgreSQL RLS operates on a strict default-deny model requiring explicit policy declaration.",
  },
  {
    id: "q-3",
    category: "System Design",
    difficulty: "Architect",
    prompt: "What is the primary difference between message queues (RabbitMQ) and event streaming logs (Apache Kafka)?",
    options: [
      "Queues delete messages once acknowledged; Kafka stores events in an immutable sequential log allowing multiple consumer replays",
      "Kafka only runs on a single server",
      "RabbitMQ cannot handle JSON data",
      "Kafka does not support consumer groups",
    ],
    correctIdx: 0,
    explanation: "Kafka persists events in an append-only log with configurable retention, enabling multi-consumer replay.",
  },
];

export default function AdminQuestionBankPage() {
  const [questions, setQuestions] = useState<BankQuestion[]>(INITIAL_BANK);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Question Form
  const [newCategory, setNewCategory] = useState("React & Next.js 16");
  const [newDifficulty, setNewDifficulty] = useState<"Intermediate" | "Advanced" | "Architect">("Advanced");
  const [newPrompt, setNewPrompt] = useState("");
  const [opt0, setOpt0] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [newCorrectIdx, setNewCorrectIdx] = useState(0);
  const [newExplanation, setNewExplanation] = useState("");

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim()) return;

    const newQ: BankQuestion = {
      id: `q-${Date.now()}`,
      category: newCategory,
      difficulty: newDifficulty,
      prompt: newPrompt.trim(),
      options: [opt0, opt1, opt2, opt3],
      correctIdx: newCorrectIdx,
      explanation: newExplanation,
    };

    setQuestions([...questions, newQ]);
    setShowAddModal(false);
    setNewPrompt("");
    setOpt0("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setNewExplanation("");
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const filtered = questions.filter(
    (q) =>
      q.prompt.toLowerCase().includes(search.toLowerCase()) ||
      q.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
              Academic Assessment CMS
            </span>
            <span className="text-xs text-slate-400">Manage Practice & Proctored Question Banks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Question Bank & Assessment Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Configure evaluation prompts, architectural explanations, and passing thresholds for automated merit tuition discounts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-colorful-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
        >
          <span>+ Add New Question</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter questions by concept or keyword..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#0f1424] border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
        />
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {filtered.map((q, idx) => (
          <div
            key={q.id}
            className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  {q.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  {q.difficulty}
                </span>
              </div>
              <button
                onClick={() => handleDelete(q.id)}
                className="text-rose-400 hover:text-rose-300 text-xs font-semibold"
              >
                Delete Question
              </button>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
              {idx + 1}. {q.prompt}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              {q.options.map((opt, optIdx) => (
                <div
                  key={optIdx}
                  className={`p-3 rounded-xl border flex items-center gap-2 ${
                    optIdx === q.correctIdx
                      ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-300 font-semibold"
                      : "bg-[#070911] border-white/5 text-slate-300"
                  }`}
                >
                  <span className="font-bold text-[11px] font-mono">
                    {String.fromCharCode(65 + optIdx)}:
                  </span>
                  <span>{opt}</span>
                  {optIdx === q.correctIdx && (
                    <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black">
                      Correct
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-[#070911] border border-white/5 text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-cyan-300 block mb-0.5">Rationale:</strong>
              {q.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-2xl w-full p-8 rounded-3xl border border-indigo-500/40 bg-[#0f1424] space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Create Assessment Question</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Technical Domain</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="React & Next.js 16">React & Next.js 16</option>
                    <option value="Supabase & PostgreSQL">Supabase & PostgreSQL</option>
                    <option value="System Design">System Design</option>
                    <option value="Autonomous AI Agents">Autonomous AI Agents</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Difficulty Level</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as "Intermediate" | "Advanced" | "Architect")}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Architect">Architect</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Question Prompt</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. How does the React 19 Compiler optimize component rendering?"
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">Options (A, B, C, D):</label>
                <input
                  type="text"
                  required
                  placeholder="Option A"
                  value={opt0}
                  onChange={(e) => setOpt0(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#070911] border border-white/10 text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Option B"
                  value={opt1}
                  onChange={(e) => setOpt1(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#070911] border border-white/10 text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Option C"
                  value={opt2}
                  onChange={(e) => setOpt2(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#070911] border border-white/10 text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Option D"
                  value={opt3}
                  onChange={(e) => setOpt3(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#070911] border border-white/10 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Correct Option</label>
                <select
                  value={newCorrectIdx}
                  onChange={(e) => setNewCorrectIdx(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white"
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Architectural Rationale / Explanation</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explain why this option is correct for student learning..."
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl btn-colorful-primary text-white font-bold"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
