"use client";

import React, { useState } from "react";
import {
  ClockIcon,
  PlayIcon,
  SparklesIcon,
  ArrowRightIcon,
  UsersIcon,
} from "@/components/Icons";

export default function LiveClassesPage() {
  const [activeSessionModal, setActiveSessionModal] = useState<string | null>(null);
  const [qaInput, setQaInput] = useState("");
  const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([
    "How does Next.js 16 cacheComponents handle dynamic cookies inside Server Actions?",
    "When should we prefer Kafka over RabbitMQ for microservice event pipelines?",
  ]);

  const upcomingClasses = [
    {
      id: "live-nextjs-caching",
      title: "Deep Dive: Next.js 16 Caching Architecture & PPR",
      instructor: "Dr. Aris Thorne",
      instructorRole: "Principal Systems Architect",
      date: "Today",
      time: "6:30 PM - 8:00 PM IST",
      status: "Live in 45 Mins",
      statusColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      attendees: 184,
      topics: ["React 19 Compiler", "PPR Dynamic Holes", "Server Action Invalidation"],
    },
    {
      id: "live-system-design-kafka",
      title: "Architecting High-Throughput Fintech Pipelines with Kafka",
      instructor: "Marcus Vance",
      instructorRole: "Head of Infrastructure, Ex-Uber",
      date: "Tomorrow",
      time: "7:00 PM - 8:30 PM IST",
      status: "Scheduled",
      statusColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      attendees: 215,
      topics: ["Partition Rebalancing", "At-Least-Once Delivery", "Dead Letter Queues"],
    },
  ];

  const pastRecordings = [
    {
      id: "rec-supabase-rls",
      title: "Mastering Supabase Row Level Security & Multi-Tenant Databases",
      instructor: "Elena Rostova",
      recordedDate: "2 days ago",
      duration: "1h 24m",
      views: 432,
    },
    {
      id: "rec-ai-agents-langgraph",
      title: "Building Resilient Multi-Agent Workflows with Tool Calling",
      instructor: "Dr. Aris Thorne",
      recordedDate: "Last week",
      duration: "1h 45m",
      views: 789,
    },
    {
      id: "rec-system-metrics",
      title: "Distributed Observability: OpenTelemetry & Prometheus",
      instructor: "Marcus Vance",
      recordedDate: "2 weeks ago",
      duration: "1h 15m",
      views: 310,
    },
  ];

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaInput.trim()) return;
    setSubmittedQuestions([qaInput.trim(), ...submittedQuestions]);
    setQaInput("");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
            Live Learning Stage
          </span>
          <span className="text-xs text-slate-400">Interactive Mentor Sessions with Real-Time Q&A</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Live Masterclasses & Webinar Rooms
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Learn directly from senior engineering leaders, ask architectural questions live, and review recorded archives on-demand.
        </p>
      </div>

      {/* Upcoming Live Sessions Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-rose-400" />
          <span>Upcoming Live Masterclasses</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingClasses.map((cls) => (
            <div
              key={cls.id}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 hover:border-cyan-500/40 transition-all space-y-5 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full border font-bold ${cls.statusColor}`}>
                    {cls.status}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <UsersIcon className="w-3.5 h-3.5" />
                    <span>{cls.attendees} enrolled</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">{cls.title}</h3>

                <div className="p-3 rounded-2xl bg-[#0b0e18] border border-white/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold text-white">Mentor: {cls.instructor}</span>
                    <span className="text-cyan-300 font-mono">{cls.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{cls.instructorRole}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cls.topics.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-amber-300 font-semibold">{cls.date}</span>
                <button
                  onClick={() => setActiveSessionModal(cls.title)}
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-500/25 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>Join Classroom</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Live Q&A Box */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-amber-300" />
            <h3 className="text-base font-bold text-white">Live Student Q&A Queue</h3>
          </div>
          <span className="text-xs text-slate-400">Questions reviewed live by mentor</span>
        </div>

        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <input
            type="text"
            value={qaInput}
            onChange={(e) => setQaInput(e.target.value)}
            placeholder="Submit a question for Dr. Aris Thorne's upcoming session..."
            className="flex-1 px-4 py-2.5 text-xs bg-[#0b0e18] border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl btn-colorful-primary text-white font-bold text-xs shrink-0 shadow-md shadow-cyan-500/20"
          >
            Submit Question
          </button>
        </form>

        <div className="space-y-2 pt-2">
          {submittedQuestions.map((q, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#0b0e18] border border-white/5 text-xs text-slate-300 flex items-start gap-2.5"
            >
              <span className="text-cyan-400 font-bold text-xs mt-0.5">Q:</span>
              <div className="flex-1">
                <span>{q}</span>
                <span className="block text-[10px] text-slate-400 mt-1">Queued for Live Broadcast • Upvote Priority</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recorded Masterclass Archive */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Past Recorded Masterclasses</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pastRecordings.map((rec) => (
            <div
              key={rec.id}
              className="glass-card p-5 rounded-2xl border border-white/10 bg-[#0f1424]/80 hover:border-cyan-500/30 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="aspect-video rounded-xl bg-black/60 border border-white/10 flex items-center justify-center relative group/vid overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/80 flex items-center justify-center text-slate-950 group-hover/vid:scale-110 transition-transform">
                    <PlayIcon className="w-4 h-4 fill-slate-950 ml-0.5" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono">
                    {rec.duration}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                  {rec.title}
                </h3>
                <p className="text-xs text-slate-400">
                  By {rec.instructor} • {rec.views} views
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">{rec.recordedDate}</span>
                <button
                  onClick={() => alert(`Launching recording: ${rec.title}`)}
                  className="text-cyan-400 hover:text-white font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Watch</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Classroom Broadcast Simulation Modal */}
      {activeSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-3xl w-full p-6 sm:p-8 rounded-3xl border border-rose-500/40 bg-[#0f1424] space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h3 className="text-base font-bold text-white">{activeSessionModal}</h3>
              </div>
              <button
                onClick={() => setActiveSessionModal(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                Close Stream
              </button>
            </div>

            <div className="aspect-video rounded-2xl bg-black border border-white/10 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                <ClockIcon className="w-8 h-8" />
              </div>
              <strong className="text-white text-base">Broadcasting Room Opening Soon</strong>
              <p className="text-xs text-slate-300 max-w-md">
                Dr. Aris Thorne is preparing the live slide deck and interactive code terminal. Stream will activate automatically at 6:30 PM IST.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveSessionModal(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
              >
                Return to Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
