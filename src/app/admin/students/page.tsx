"use client";

import React, { useState } from "react";
import {
  SearchIcon,
  CheckCircleIcon,
} from "@/components/Icons";
import { formatIndianNumber } from "@/lib/formatters";

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  track: string;
  cohort: string;
  xp: number;
  streak: number;
  assessmentScore: number;
  certificateStatus: "Issued" | "Eligible" | "In-Progress";
}

const INITIAL_STUDENTS: StudentRecord[] = [
  { id: "s-1", name: "Alex Rivera", email: "alex.rivera@example.com", track: "Full-Stack React 19 & Next.js 16", cohort: "Cohort Omega", xp: 1450, streak: 7, assessmentScore: 88, certificateStatus: "Issued" },
  { id: "s-2", name: "Priya Sharma", email: "priya.sharma@example.com", track: "Full-Stack React 19 & Next.js 16", cohort: "Cohort Omega", xp: 3420, streak: 28, assessmentScore: 96, certificateStatus: "Issued" },
  { id: "s-3", name: "Liam O'Connor", email: "liam.oc@example.com", track: "Distributed Cloud Architecture", cohort: "Cohort Delta", xp: 2980, streak: 21, assessmentScore: 92, certificateStatus: "Issued" },
  { id: "s-4", name: "Sophia Zhang", email: "sophia.zhang@example.com", track: "Autonomous AI Agents", cohort: "Cohort Omega", xp: 2340, streak: 16, assessmentScore: 84, certificateStatus: "Eligible" },
  { id: "s-5", name: "Carlos Mendoza", email: "carlos.m@example.com", track: "Distributed Cloud Architecture", cohort: "Cohort Delta", xp: 2110, streak: 14, assessmentScore: 78, certificateStatus: "Eligible" },
  { id: "s-6", name: "Ananya Iyer", email: "ananya.iyer@example.com", track: "Autonomous AI Agents", cohort: "Cohort Omega", xp: 1940, streak: 12, assessmentScore: 65, certificateStatus: "In-Progress" },
  { id: "s-7", name: "David Kim", email: "david.kim@example.com", track: "Full-Stack React 19 & Next.js 16", cohort: "Cohort Omega", xp: 1820, streak: 10, assessmentScore: 72, certificateStatus: "Eligible" },
];

export default function AdminStudentsPage() {
  const [students] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState("");
  const [trackFilter, setTrackFilter] = useState("all");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesTrack = trackFilter === "all" || s.track.includes(trackFilter);
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  const handleIssueCertificate = (studentName: string) => {
    setActionNotice(`Accredited certificate successfully generated & issued for ${studentName}!`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleResetAttempts = (studentName: string) => {
    setActionNotice(`Proctored exam attempt count reset to 2 for ${studentName}.`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
            Learner Operations
          </span>
          <span className="text-xs text-slate-400">Manage 1,248 Student Accounts & Accreditation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Student Roster & Verification Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Search, audit, and manage cohort members. Grant direct course access, review test scores, or manually issue verified blockchain certificate credentials.
        </p>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or email..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#0f1424] border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
          />
        </div>

        <select
          value={trackFilter}
          onChange={(e) => setTrackFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-[#0f1424] border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-indigo-400"
        >
          <option value="all">All Learning Tracks</option>
          <option value="React">React & Next.js 16</option>
          <option value="AI">Autonomous AI Agents</option>
          <option value="Cloud">Distributed Cloud Architecture</option>
        </select>
      </div>

      {/* Student Roster Table */}
      <div className="glass-card rounded-3xl border border-white/10 bg-[#0f1424]/90 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070911] border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 pl-6">Student</th>
                <th className="p-4">Track / Cohort</th>
                <th className="p-4">Cohort XP</th>
                <th className="p-4">Exam Score</th>
                <th className="p-4">Certificate</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 p-[1px]">
                        <div className="w-full h-full bg-[#0d111d] rounded-[7px] flex items-center justify-center font-bold text-white text-xs">
                          {s.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <strong className="text-white block font-semibold">{s.name}</strong>
                        <span className="text-[11px] text-slate-400">{s.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-200 font-medium block">{s.track}</span>
                    <span className="text-[10px] text-cyan-400 font-semibold">{s.cohort}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono font-bold text-amber-400">{formatIndianNumber(s.xp)} XP</span>
                    <span className="block text-[10px] text-slate-400">🔥 {s.streak}d streak</span>
                  </td>
                  <td className="p-4">
                    <span className={`font-bold ${s.assessmentScore >= 75 ? "text-emerald-400" : "text-amber-400"}`}>
                      {s.assessmentScore}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        s.certificateStatus === "Issued"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : s.certificateStatus === "Eligible"
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                          : "bg-white/5 text-slate-400 border-white/10"
                      }`}
                    >
                      {s.certificateStatus}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-2">
                    <button
                      onClick={() => handleIssueCertificate(s.name)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-[11px] font-semibold transition-colors"
                    >
                      Issue Cert
                    </button>
                    <button
                      onClick={() => handleResetAttempts(s.name)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] transition-colors"
                    >
                      Reset Exam
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
