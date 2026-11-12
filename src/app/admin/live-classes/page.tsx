"use client";

import React, { useState } from "react";
import {
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
} from "@/components/Icons";

interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  meetingUrl: string;
  status: "Scheduled" | "Live Now" | "Completed";
  enrolledCount: number;
}

const INITIAL_SESSIONS: LiveSession[] = [
  {
    id: "sess-1",
    title: "Deep Dive: Next.js 16 Caching Architecture & PPR",
    instructor: "Dr. Aris Thorne",
    date: "Today, Oct 31",
    time: "6:30 PM - 8:00 PM IST",
    meetingUrl: "https://meet.google.com/sb-nextjs-ppr",
    status: "Scheduled",
    enrolledCount: 184,
  },
  {
    id: "sess-2",
    title: "Architecting High-Throughput Fintech Pipelines with Kafka",
    instructor: "Marcus Vance",
    date: "Nov 02, 2026",
    time: "7:00 PM - 8:30 PM IST",
    meetingUrl: "https://meet.google.com/sb-kafka-fintech",
    status: "Scheduled",
    enrolledCount: 215,
  },
  {
    id: "sess-3",
    title: "Mastering Supabase Row Level Security & Multi-Tenant Databases",
    instructor: "Elena Rostova",
    date: "Oct 28, 2026",
    time: "6:00 PM - 7:30 PM IST",
    meetingUrl: "https://meet.google.com/sb-supabase-archive",
    status: "Completed",
    enrolledCount: 310,
  },
];

export default function AdminLiveClassesPage() {
  const [sessions, setSessions] = useState<LiveSession[]>(INITIAL_SESSIONS);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [broadcastNotice, setBroadcastNotice] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("Dr. Aris Thorne");
  const [date, setDate] = useState("Nov 05, 2026");
  const [time, setTime] = useState("6:30 PM - 8:00 PM IST");
  const [meetingUrl, setMeetingUrl] = useState("https://meet.google.com/sb-live-room");

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newSess: LiveSession = {
      id: `sess-${Date.now()}`,
      title: title.trim(),
      instructor,
      date,
      time,
      meetingUrl,
      status: "Scheduled",
      enrolledCount: 0,
    };

    setSessions([newSess, ...sessions]);
    setShowScheduleModal(false);
    setTitle("");
  };

  const handleBroadcastAlert = (sessionTitle: string) => {
    setBroadcastNotice(`WhatsApp broadcast successfully dispatched to 1,248 students for "${sessionTitle}"!`);
    setTimeout(() => setBroadcastNotice(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
              Interactive Broadcast Desk
            </span>
            <span className="text-xs text-slate-400">Live Stage & Multi-Channel Broadcast Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Live Masterclass Scheduling & Broadcast
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Schedule interactive engineering workshops with mentors and trigger instantaneous WhatsApp/SMS calendar invitations.
          </p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="btn-colorful-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
        >
          <ClockIcon className="w-3.5 h-3.5" />
          <span>+ Schedule Masterclass</span>
        </button>
      </div>

      {broadcastNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4" />
          <span>{broadcastNotice}</span>
        </div>
      )}

      {/* Sessions Grid */}
      <div className="space-y-4">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    sess.status === "Scheduled"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                      : "bg-white/5 text-slate-400 border-white/10"
                  }`}
                >
                  {sess.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">{sess.date}</span>
                <span className="text-xs text-cyan-300 font-mono font-semibold">{sess.time}</span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{sess.title}</h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span>Instructor: <strong className="text-slate-200">{sess.instructor}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" />
                  <span>{sess.enrolledCount} registered</span>
                </span>
                <span>•</span>
                <a
                  href={sess.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline font-mono"
                >
                  {sess.meetingUrl}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                onClick={() => handleBroadcastAlert(sess.title)}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Broadcast Alert</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-lg w-full p-8 rounded-3xl border border-indigo-500/40 bg-[#0f1424] space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Schedule Live Masterclass</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Session Topic / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed State with Redis & Edge Middleware"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Instructor</label>
                  <input
                    type="text"
                    required
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Date</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Time Slot</label>
                <input
                  type="text"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Google Meet / Zoom URL</label>
                <input
                  type="text"
                  required
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white font-mono"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl btn-colorful-primary text-white font-bold"
                >
                  Publish & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
