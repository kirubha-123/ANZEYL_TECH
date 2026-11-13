"use client";

import React, { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  BookOpenIcon,
  ClockIcon,
  CheckCircleIcon,
  SearchIcon,
  TargetIcon,
  TrophyIcon,
} from "@/components/Icons";
import { COURSE_ASSIGNMENTS, type AssignmentItem } from "@/lib/assignmentsData";
import { ANZEYL_COURSES } from "@/lib/courseData";

const LOCAL_ASSIGNMENTS_KEY = "anzeyl_assignment_submissions_v1";

interface AssignmentSubmissionRecord {
  assignmentId: string;
  submissionUrl: string;
  notes: string;
  submittedAt: string;
  status: "Submitted" | "Graded";
  feedback?: string;
}


export default function AssignmentsPage() {
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Submitted" | "Graded">("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [submissions, setSubmissions] = useState<Record<string, AssignmentSubmissionRecord>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(LOCAL_ASSIGNMENTS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeModalAssignment, setActiveModalAssignment] = useState<AssignmentItem | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const filteredAssignments = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COURSE_ASSIGNMENTS.filter((asg) => {
      const matchesCourse = selectedCourse === "All" || asg.courseSlug === selectedCourse;
      const currentStatus = submissions[asg.id]?.status || asg.status;
      const matchesStatus = statusFilter === "All" || currentStatus === statusFilter;
      const matchesSearch =
        !q ||
        asg.title.toLowerCase().includes(q) ||
        asg.moduleTitle.toLowerCase().includes(q) ||
        asg.description.toLowerCase().includes(q);
      return matchesCourse && matchesStatus && matchesSearch;
    });
  }, [selectedCourse, statusFilter, search, submissions]);

  const totalPending = COURSE_ASSIGNMENTS.filter((a) => !submissions[a.id] && a.status === "Pending").length;
  const totalSubmitted = Object.keys(submissions).length;
  const totalPoints = COURSE_ASSIGNMENTS.reduce((sum, a) => {
    if (submissions[a.id]) return sum + a.maxScore;
    return sum;
  }, 0);

  const handleOpenSubmit = (asg: AssignmentItem) => {
    setActiveModalAssignment(asg);
    const existing = submissions[asg.id];
    setSubmissionUrl(existing?.submissionUrl || "");
    setSubmissionNotes(existing?.notes || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalAssignment) return;

    const record: AssignmentSubmissionRecord = {
      assignmentId: activeModalAssignment.id,
      submissionUrl: submissionUrl.trim(),
      notes: submissionNotes.trim(),
      submittedAt: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Submitted",
      feedback:
        "Assignment received. Faculty evaluation is in progress — expect detailed marks and feedback within 48 hours.",
    };

    const updated = {
      ...submissions,
      [activeModalAssignment.id]: record,
    };

    setSubmissions(updated);
    try {
      localStorage.setItem(LOCAL_ASSIGNMENTS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    // Attempt Supabase sync
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("assignment_submissions").upsert({
          user_id: user.id,
          assignment_id: activeModalAssignment.id,
          course_slug: activeModalAssignment.courseSlug,
          submission_url: submissionUrl.trim(),
          notes: submissionNotes.trim() || null,
          status: "Submitted",
          submitted_at: new Date().toISOString(),
        });
      }
    } catch {
      // Non-blocking
    }

    setActiveModalAssignment(null);
    setNotice(`"${activeModalAssignment.title}" submitted successfully!`);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f1f2a] via-[#176b87] to-[#0d3547] p-7 sm:p-9 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,#C9A64B,transparent_70%)]" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A64B] bg-[#C9A64B]/15 border border-[#C9A64B]/30 rounded-full px-3 py-1">
                Academic Deliverables
              </span>
              <span className="text-[10px] font-semibold text-white/60">9 Courses · 27 Assignments</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Course Assignments
            </h1>
            <p className="text-sm text-white/70 mt-1.5 max-w-lg leading-relaxed">
              Practical tasks assigned by ANZEYL faculty across all 9 programmes. Submit on time to earn graded credentials and project credits.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="text-center px-5 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 min-w-[80px]">
              <div className="text-2xl font-black text-white">{totalPending}</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wide mt-0.5">Pending</div>
            </div>
            <div className="text-center px-5 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 min-w-[80px]">
              <div className="text-2xl font-black text-[#10b981]">{totalSubmitted}</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wide mt-0.5">Submitted</div>
            </div>
            <div className="text-center px-5 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 min-w-[80px]">
              <div className="text-2xl font-black text-[#C9A64B]">{totalPoints}</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wide mt-0.5">Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success notice */}
      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm">
          <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#e5e7eb] flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <SearchIcon className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments by title, module or description..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7f5ef] border border-[#d6dde0] rounded-xl text-[#263746] placeholder-[#8fa0ab] focus:outline-none focus:border-[#176b87] transition-colors"
          />
        </div>

        {/* Course filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748b] font-semibold whitespace-nowrap">Course:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{ colorScheme: "light" }}
            className="py-1.5 px-3 text-xs bg-white border border-[#d6dde0] rounded-xl text-[#263746] font-semibold focus:outline-none focus:border-[#176b87] max-w-[180px]"
          >
            <option value="All" className="text-[#263746] bg-white">All 9 Courses</option>
            {ANZEYL_COURSES.map((c) => (
              <option key={c.slug} value={c.slug} className="text-[#263746] bg-white">
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-1.5">
          {(["All", "Pending", "Submitted", "Graded"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? "bg-[#176b87] text-white shadow-sm"
                  : "bg-white border border-[#d6dde0] text-[#263746] hover:bg-[#f7f5ef]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-[#64748b] font-medium">
          Showing <strong className="text-[#17191D]">{filteredAssignments.length}</strong> assignments
        </span>
        {filteredAssignments.length > 0 && (
          <span className="text-xs text-[#64748b]">
            Total points: <strong className="text-[#176b87]">{filteredAssignments.reduce((s, a) => s + a.maxScore, 0)}</strong>
          </span>
        )}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="p-16 text-center bg-white border border-dashed border-[#d6dde0] rounded-3xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#f7f5ef] flex items-center justify-center">
              <BookOpenIcon className="w-7 h-7 text-[#64748b]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17191D]">No Assignments Found</h3>
              <p className="text-xs text-[#64748b] mt-1 max-w-sm mx-auto">
                No assignments match your current filters. Try clearing the search or changing the course.
              </p>
            </div>
          </div>
        ) : (
          filteredAssignments.map((asg) => {
            const sub = submissions[asg.id];
            const currentStatus = sub?.status || asg.status;
            const isExpanded = expandedId === asg.id;

            const statusConfig = {
              Pending: { badge: "bg-amber-50 text-amber-800 border-amber-200", dot: "bg-amber-500" },
              Submitted: { badge: "bg-emerald-50 text-emerald-800 border-emerald-200", dot: "bg-emerald-500" },
              Graded: { badge: "bg-[#176b87]/10 text-[#176b87] border-[#176b87]/25", dot: "bg-[#176b87]" },
            }[currentStatus] || { badge: "bg-amber-50 text-amber-800 border-amber-200", dot: "bg-amber-500" };

            return (
              <div
                key={asg.id}
                className="rounded-3xl border border-[#e5e7eb] bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-[#176b87]/30 transition-all"
              >
                {/* Card header — always visible */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    {/* Left: Course + Title */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20 font-bold text-[10px]">
                          {asg.courseTitle}
                        </span>
                        <span className="text-[#64748b] font-medium text-[11px]">{asg.moduleTitle}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#17191D] leading-snug">{asg.title}</h3>
                      <p className="text-xs text-[#263746] leading-relaxed line-clamp-2">{asg.description}</p>
                    </div>

                    {/* Right: Status + Points */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                        <span className={`px-2.5 py-0.5 rounded-full border font-bold text-[10px] ${statusConfig.badge}`}>
                          {currentStatus}
                        </span>
                      </div>
                      <span className="text-sm font-black text-[#17191D]">{asg.maxScore} pts</span>
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="mt-4 pt-4 border-t border-[#f0f0f0] flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-4 text-xs text-[#64748b]">
                      <span className="flex items-center gap-1.5">
                        <ClockIcon className="w-3.5 h-3.5 text-amber-600" />
                        Due: <strong className="text-[#263746]">{asg.dueDate}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <TargetIcon className="w-3.5 h-3.5 text-[#176b87]" />
                        {asg.deliverablesRequired.length} deliverables
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : asg.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#176b87] border border-[#176b87]/20 hover:bg-[#176b87]/5 transition-colors"
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenSubmit(asg)}
                        className="px-5 py-2 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        {sub ? "Update" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable detail section */}
                {isExpanded && (
                  <div className="border-t border-[#f0f0f0] bg-[#f7f5ef] p-5 sm:p-6 space-y-5">
                    {/* Deliverables */}
                    <div>
                      <h4 className="text-[11px] font-black text-[#64748b] uppercase tracking-wider mb-2">
                        Required Deliverables
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {asg.deliverablesRequired.map((d, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-white border border-[#e5e7eb] text-[#263746] text-xs font-medium flex items-center gap-1.5"
                          >
                            <span className="text-[#176b87]">📦</span> {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Rubric */}
                    <div>
                      <h4 className="text-[11px] font-black text-[#64748b] uppercase tracking-wider mb-2">
                        Grading Rubric
                      </h4>
                      <div className="space-y-2">
                        {asg.rubric.map((r, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="flex-1 text-xs text-[#263746]">{r.criterion}</div>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1.5 rounded-full bg-[#e5e7eb] overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-[#176b87]"
                                  style={{ width: `${r.weightPercent}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-[#176b87] w-9 text-right">{r.weightPercent}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Submission status */}
                    {sub && (
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-emerald-800">
                          <strong className="font-bold flex items-center gap-1.5">
                            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                            Submitted on {sub.submittedAt}
                          </strong>
                          <a
                            href={sub.submissionUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#176b87] hover:underline font-semibold"
                          >
                            View Work ↗
                          </a>
                        </div>
                        {sub.feedback && (
                          <p className="text-[11px] text-emerald-900 leading-relaxed">{sub.feedback}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* How it works footer hint */}
      <div className="p-5 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] flex items-start gap-3">
        <TrophyIcon className="w-5 h-5 text-[#C9A64B] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-[#263746] leading-relaxed">
          <strong className="text-[#17191D]">Submission guidelines:</strong> Submit your GitHub repository or Drive link before the due date.
          Faculty will evaluate your work based on the rubric and post feedback within 48 hours. Graded assignments contribute to your course completion certificate.
        </div>
      </div>

      {/* Submission Modal */}
      {activeModalAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="max-w-xl w-full p-7 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#e5e7eb] pb-4 gap-3">
              <div>
                <span className="text-[10px] font-black text-[#176b87] uppercase tracking-widest block mb-0.5">
                  {activeModalAssignment.courseTitle}
                </span>
                <h3 className="text-base font-bold text-[#17191D]">
                  Submit: {activeModalAssignment.title}
                </h3>
                <p className="text-xs text-[#64748b] mt-0.5">{activeModalAssignment.moduleTitle}</p>
              </div>
              <button
                onClick={() => setActiveModalAssignment(null)}
                className="text-[#64748b] hover:text-[#17191D] p-1 rounded-lg hover:bg-[#f7f5ef] transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[#263746]">
                  Deliverable URL <span className="text-rose-600">*</span>
                </label>
                <p className="text-[11px] text-[#64748b]">GitHub, Google Drive, Figma, or Live Demo link</p>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/your-username/assignment-repo"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d6dde0] text-[#263746] font-mono focus:outline-none focus:border-[#176b87] shadow-sm transition-colors text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#263746]">Notes / Approach Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your implementation approach, key libraries used, test results, or any notes for the instructor..."
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#d6dde0] text-[#263746] focus:outline-none focus:border-[#176b87] shadow-sm transition-colors resize-none text-xs"
                />
              </div>

              {/* Rubric summary */}
              <div className="p-4 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-2">
                <span className="font-bold text-[#17191D] block text-xs">Grading Rubric:</span>
                {activeModalAssignment.rubric.map((r, i) => (
                  <div key={i} className="flex justify-between text-[11px] text-[#263746] border-b border-[#e5e7eb]/60 pb-1 last:border-0 last:pb-0">
                    <span>{r.criterion}</span>
                    <span className="font-bold text-[#176b87]">{r.weightPercent}%</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalAssignment(null)}
                  className="flex-1 py-3 rounded-xl bg-white hover:bg-[#f7f5ef] border border-[#d6dde0] text-[#263746] font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold shadow-sm transition-colors text-xs"
                >
                  Submit for Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
