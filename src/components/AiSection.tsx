"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SparklesIcon,
  HelpCircleIcon,
  CodeIcon,
  TargetIcon,
  ArrowRightIcon,
} from "./Icons";

export const AiSection: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<number>(0);

  const sampleConversations = [
    {
      userQuery: "Explain React Server Components vs Client Components with a practical code example.",
      aiResponse:
        "Server Components render exclusively on the server, streaming HTML directly without shipping JavaScript bytes to the browser. Use 'use client' only for interactive components that require React state (useState, useEffect) or event listeners (onClick).",
      topic: "React 19 Architecture",
      codeSnippet: `// Server Component (Default)
export default async function UserProfile({ id }: { id: string }) {
  const user = await db.user.findUnique({ where: { id } });
  return <div className="text-white font-bold">{user.name}</div>;
}`,
    },
    {
      userQuery: "Generate 3 quick practice questions to test my understanding of Async/Await in JavaScript.",
      aiResponse:
        "Here are 3 diagnostic questions:\n1. What happens if a rejected Promise inside an async function is not wrapped in a try...catch block?\n2. Does Promise.all resolve if one Promise rejects?\n3. How do microtasks differ from macrotasks in the Event Loop?",
      topic: "JavaScript Async Proficiency",
      codeSnippet: `// Practice Exercise
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    return await res.json();
  } catch (err) {
    console.error("Caught error:", err);
  }
}`,
    },
    {
      userQuery: "What learning path should I follow to become a Java Microservices Developer?",
      aiResponse:
        "Based on your assessment profile: Step 1: Java 21 Core (Records & Sealed Classes) → Step 2: Spring Boot 3 REST APIs → Step 3: PostgreSQL & Hibernate ORM → Step 4: Docker & Kubernetes containerization → Step 5: Event-Driven Kafka messaging.",
      topic: "Adaptive Career Roadmap",
      codeSnippet: `// Recommended Learning Steps
1. Java 21 Syntax & OOP (Complete)
2. Spring Data JPA (In Progress)
3. Kafka Streams (Recommended Next)`,
    },
  ];

  return (
    <section className="py-24 bg-colorful-mesh relative overflow-hidden border-t border-white/10">
      
      {/* Background Multi-Color Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            Intelligent Pedagogical Engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Personalized <span className="text-gradient-brand">AI Learning Assistant</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Never get stuck again. ANZEYL SOLUTIONS provides step-by-step code breakdowns, instant practice questions, and real-time study path recommendations.
          </p>

          {/* AI Notice Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 text-xs text-center mt-2 shadow-md">
            <HelpCircleIcon className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong className="text-cyan-300 font-bold">Demonstration Notice:</strong> Live AI model API streaming connects upon user account authentication.
            </span>
          </div>
        </div>

        {/* Feature Grid & Chat Terminal Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: AI Capabilities */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="p-6 rounded-2xl glass-card card-glow-rose space-y-3 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
                  <SparklesIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Instant Concept Breakdown</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Ask complex syntax or system architecture questions and get clear, jargon-free explanations formatted specifically for your experience level.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card card-glow-cyan space-y-3 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-lg">
                  <CodeIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Adaptive Practice Generators</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Generate tailored quiz questions and code snippets to reinforce weak areas discovered during your skill assessments.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card card-glow-emerald space-y-3 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg">
                  <TargetIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Continuous Skill Recommendations</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Receive daily study suggestions adapted to your target job profile, learning pace, and milestone deadlines.
                </p>
              </div>

            </div>

            <Link
              href="/ai-tutor"
              className="btn-colorful-primary inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-white rounded-xl shadow-xl transition-all"
            >
              <SparklesIcon className="w-4 h-4 text-amber-200" />
              <span>Explore AI Tutor Interface</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Column: Simulated AI Chat UI */}
          <div className="lg:col-span-7 glass-card p-6 lg:p-8 rounded-3xl border border-white/15 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Top Multi-Color Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 to-cyan-500" />

            <div className="space-y-5">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-md shadow-rose-500/50" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50" />
                  <span className="text-xs font-mono text-slate-300 ml-2 font-bold">ANZEYL SOLUTIONS Assistant v2.4</span>
                </div>
                <span className="px-3 py-1 rounded-full badge-vibrant-emerald text-xs font-bold">
                  Interactive Demo
                </span>
              </div>

              {/* Sample Prompt Selector Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Select Demo Conversation Prompt:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {sampleConversations.map((conv, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPrompt(idx)}
                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                        selectedPrompt === idx
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-400 shadow-md"
                          : "bg-[#0b0e18] text-slate-400 hover:text-white border-white/10 hover:border-white/20"
                      }`}
                    >
                      {conv.topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulated Chat Window */}
              <div className="space-y-3.5 bg-[#0b0e18] p-5 rounded-2xl border border-white/10 shadow-inner">
                {/* User Message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                    You
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-xs text-white max-w-xl font-medium">
                    {sampleConversations[selectedPrompt].userQuery}
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <SparklesIcon className="w-4 h-4 text-amber-200 animate-pulse" />
                  </div>
                  <div className="space-y-3 p-4 rounded-xl bg-[#14192a] border border-violet-500/30 text-xs text-slate-200 flex-1 shadow-md">
                    <p className="leading-relaxed whitespace-pre-line font-normal">
                      {sampleConversations[selectedPrompt].aiResponse}
                    </p>
                    <div className="p-3 rounded-lg bg-[#080b12] border border-white/10 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                      <pre>{sampleConversations[selectedPrompt].codeSnippet}</pre>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 mt-4">
              <span>⚡ 24/7 Context-Aware Pedagogical LLM</span>
              <span className="text-emerald-400 font-bold">Latency: 180ms</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
