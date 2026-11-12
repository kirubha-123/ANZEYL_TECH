"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CmsLesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  videoUrl: string;
  hasPdfNotes: boolean;
}

interface CmsModule {
  id: string;
  title: string;
}

const INITIAL_MODULES: CmsModule[] = [
  { id: "mod-1", title: "Module 1: Next.js 16 App Router Architecture" },
  { id: "mod-2", title: "Module 2: Supabase SSR Authentication & Database RLS" },
  { id: "mod-3", title: "Module 3: Enterprise Microservices & Production Scale" },
];

const INITIAL_LESSONS: CmsLesson[] = [
  { id: "les-1", moduleId: "mod-1", title: "1.1 Turbopack & React 19 Compiler Deep Dive", duration: "18:40", videoUrl: "https://stream.ANZEYL.ai/lessons/1-1.mp4", hasPdfNotes: true },
  { id: "les-2", moduleId: "mod-1", title: "1.2 Server Components vs Client Island Boundaries", duration: "24:15", videoUrl: "https://stream.ANZEYL.ai/lessons/1-2.mp4", hasPdfNotes: true },
  { id: "les-3", moduleId: "mod-1", title: "1.3 Next.js 16 CacheComponents & Partial Prerendering", duration: "32:10", videoUrl: "https://stream.ANZEYL.ai/lessons/1-3.mp4", hasPdfNotes: true },
  { id: "les-4", moduleId: "mod-2", title: "2.1 Supabase SSR Client Setup with @supabase/ssr", duration: "21:05", videoUrl: "https://stream.ANZEYL.ai/lessons/2-1.mp4", hasPdfNotes: true },
  { id: "les-5", moduleId: "mod-2", title: "2.2 Server Actions with Supabase Row Level Security", duration: "28:50", videoUrl: "https://stream.ANZEYL.ai/lessons/2-2.mp4", hasPdfNotes: true },
  { id: "les-6", moduleId: "mod-2", title: "2.3 Realtime PostgreSQL Subscriptions in React 19", duration: "25:30", videoUrl: "https://stream.ANZEYL.ai/lessons/2-3.mp4", hasPdfNotes: false },
];

export default function AdminCoursesCmsPage() {
  const [selectedCourse] = useState("Full-Stack React 19 & Next.js 16 Production Systems");
  const [modules] = useState<CmsModule[]>(INITIAL_MODULES);
  const [lessons, setLessons] = useState<CmsLesson[]>(INITIAL_LESSONS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lesson Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState("25:00");
  const [newVideoUrl, setNewVideoUrl] = useState("https://stream.ANZEYL.ai/lessons/new-chapter.mp4");
  const [newModuleId, setNewModuleId] = useState("mod-1");
  const [newHasPdf, setNewHasPdf] = useState(true);

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newLesson: CmsLesson = {
      id: `les-${Date.now()}`,
      moduleId: newModuleId,
      title: newTitle.trim(),
      duration: newDuration,
      videoUrl: newVideoUrl,
      hasPdfNotes: newHasPdf,
    };

    setLessons([...lessons, newLesson]);
    setShowAddModal(false);
    setNewTitle("");
  };

  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
              Curriculum CMS Engine
            </span>
            <span className="text-xs text-slate-400">Manage Syllabus, Video Streams & Blueprint Assets</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Course & Curriculum Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Currently editing: <strong className="text-cyan-400">{selectedCourse}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-colorful-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
        >
          <span>+ Add New Lesson</span>
        </button>
      </div>

      {/* Curriculum Module List with Lessons */}
      <div className="space-y-6">
        {modules.map((mod) => {
          const modLessons = lessons.filter((l) => l.moduleId === mod.id);

          return (
            <div
              key={mod.id}
              className="glass-card rounded-3xl border border-white/10 bg-[#0f1424]/90 p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                    {mod.id.replace("mod-", "M")}
                  </div>
                  <h2 className="text-base font-bold text-white">{mod.title}</h2>
                </div>
                <span className="text-xs text-slate-400 font-semibold">
                  {modLessons.length} Lessons Configured
                </span>
              </div>

              <div className="space-y-2">
                {modLessons.map((les) => (
                  <div
                    key={les.id}
                    className="p-4 rounded-2xl bg-[#070911] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs group hover:border-white/20 transition-all"
                  >
                    <div className="space-y-1">
                      <strong className="text-white font-semibold text-sm block">
                        {les.title}
                      </strong>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span>Duration: {les.duration}</span>
                        <span>•</span>
                        <span className="font-mono text-cyan-300 truncate max-w-xs">{les.videoUrl}</span>
                        {les.hasPdfNotes && (
                          <span className="text-emerald-400 font-semibold">PDF Included</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link
                        href={`/portal/classroom/nextjs-fullstack`}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      >
                        Preview
                      </Link>
                      <button
                        onClick={() => handleDeleteLesson(les.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lesson Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-xl w-full p-8 rounded-3xl border border-indigo-500/40 bg-[#0f1424] space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Add Curriculum Lesson</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleAddLesson} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Target Module</label>
                <select
                  value={newModuleId}
                  onChange={(e) => setNewModuleId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none focus:border-indigo-400"
                >
                  {modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Lesson Chapter Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2.4 Server Component Serialization & Turbopack"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Duration (MM:SS)</label>
                  <input
                    type="text"
                    required
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Attach Blueprint PDF</label>
                  <div className="flex items-center h-10">
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newHasPdf}
                        onChange={(e) => setNewHasPdf(e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-500"
                      />
                      <span>Include Lecture Slides</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Video CDN Stream URL</label>
                <input
                  type="text"
                  required
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white font-mono focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl btn-colorful-primary text-white font-bold transition-all shadow-lg shadow-indigo-500/25"
                >
                  Publish Lesson to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
