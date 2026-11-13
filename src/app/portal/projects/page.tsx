"use client";

import React, { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  CodeIcon,
  CheckCircleIcon,
  SearchIcon,
  ClockIcon,
  TrophyIcon,
  TargetIcon,
} from "@/components/Icons";
import { COURSE_PROJECTS, type CourseProject } from "@/lib/projectsData";
import { ANZEYL_COURSES } from "@/lib/courseData";

interface ProjectSubmission {
  projectId: string;
  repoUrl: string;
  liveUrl: string;
  notes: string;
  status: "Not Started" | "Submitted" | "Under Review" | "Approved";
  submittedAt?: string;
  feedback?: string;
}

const LOCAL_SUBMISSIONS_KEY = "anzeyl_project_submissions_v1";

const difficultyConfig: Record<string, { badge: string; label: string }> = {
  beginner: { badge: "bg-emerald-50 text-emerald-800 border-emerald-200", label: "Beginner" },
  intermediate: { badge: "bg-amber-50 text-amber-800 border-amber-200", label: "Intermediate" },
  advanced: { badge: "bg-rose-50 text-rose-800 border-rose-200", label: "Advanced" },
};

const typeConfig: Record<string, { badge: string; label: string; icon: string }> = {
  capstone: { badge: "bg-purple-50 text-purple-800 border-purple-200", label: "Capstone", icon: "🏆" },
  module_assignment: { badge: "bg-[#176b87]/10 text-[#176b87] border-[#176b87]/20", label: "Module Assignment", icon: "📘" },
};

export default function MyProjectsPage() {
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Not Started" | "Submitted" | "Approved">("All");
  const [typeFilter, setTypeFilter] = useState<"All" | "capstone" | "module_assignment">("All");
  const [search, setSearch] = useState("");

  const [submissions, setSubmissions] = useState<Record<string, ProjectSubmission>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(LOCAL_SUBMISSIONS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeSubmitModal, setActiveSubmitModal] = useState<CourseProject | null>(null);
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  const handleOpenSubmit = (project: CourseProject) => {
    setActiveSubmitModal(project);
    const existing = submissions[project.id];
    setRepoUrl(existing?.repoUrl || "");
    setLiveUrl(existing?.liveUrl || "");
    setNotes(existing?.notes || "");
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmitModal) return;

    const submissionData: ProjectSubmission = {
      projectId: activeSubmitModal.id,
      repoUrl: repoUrl.trim(),
      liveUrl: liveUrl.trim(),
      notes: notes.trim(),
      status: "Submitted",
      submittedAt: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      feedback:
        "Your submission has been received and queued for faculty code review. Expect architectural evaluation within 48–72 hours.",
    };

    const updated = {
      ...submissions,
      [activeSubmitModal.id]: submissionData,
    };

    setSubmissions(updated);
    try {
      localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    // Sync to Supabase if authenticated
    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase.from("project_submissions").upsert({
          user_id: userData.user.id,
          course_slug: activeSubmitModal.courseSlug,
          project_title: activeSubmitModal.title,
          repository_url: repoUrl.trim(),
          live_url: liveUrl.trim() || null,
          notes: notes.trim() || null,
          status: "Submitted",
          submitted_at: new Date().toISOString(),
        });
      }
    } catch {
      // Non-blocking
    }

    setActiveSubmitModal(null);
    setSubmitNotice(`"${activeSubmitModal.title}" submitted for mentor review!`);
    setTimeout(() => setSubmitNotice(null), 4000);
  };

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COURSE_PROJECTS.filter((p) => {
      const matchesCourse = selectedCourseSlug === "All" || p.courseSlug === selectedCourseSlug;
      const currentStatus = submissions[p.id]?.status || "Not Started";
      const matchesStatus = statusFilter === "All" || currentStatus === statusFilter;
      const matchesType = typeFilter === "All" || p.type === typeFilter;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.courseTitle.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q);
      return matchesCourse && matchesStatus && matchesType && matchesSearch;
    });
  }, [selectedCourseSlug, statusFilter, typeFilter, search, submissions]);

  const capstones = COURSE_PROJECTS.filter((p) => p.type === "capstone");
  const submittedCount = Object.keys(submissions).length;
  const approvedCount = Object.values(submissions).filter((s) => s.status === "Approved").length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      {/* Page Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a0f2e] via-[#3b1f6b] to-[#0d1a3a] p-7 sm:p-9 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,#C9A64B,transparent_60%)]" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A64B] bg-[#C9A64B]/15 border border-[#C9A64B]/30 rounded-full px-3 py-1">
                Practical Engineering
              </span>
              <span className="text-[10px] font-semibold text-white/60">9 Courses · {COURSE_PROJECTS.length} Projects</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Projects &amp; Capstone Submissions
            </h1>
            <p className="text-sm text-white/70 mt-1.5 max-w-lg leading-relaxed">
              Real-world portfolio projects and capstone assignments across all 9 ANZEYL programmes. Submit your GitHub repos and live deployments for verified faculty evaluation.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="text-center px-5 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 min-w-[80px]">
              <div className="text-2xl font-black text-white">{capstones.length}</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wide mt-0.5">Capstones</div>
            </div>
            <div className="text-center px-5 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 min-w-[80px]">
              <div className="text-2xl font-black text-[#10b981]">{submittedCount}</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wide mt-0.5">Submitted</div>
            </div>
            <div className="text-center px-5 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 min-w-[80px]">
              <div className="text-2xl font-black text-[#C9A64B]">{approvedCount}</div>
              <div className="text-[10px] text-white/60 font-semibold uppercase tracking-wide mt-0.5">Approved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success notice */}
      {submitNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm">
          <CheckCircleIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{submitNotice}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-[#e5e7eb] flex flex-col lg:flex-row items-stretch lg:items-center gap-4 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <SearchIcon className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, course, or technology..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#f7f5ef] border border-[#d6dde0] rounded-xl text-[#263746] placeholder-[#8fa0ab] focus:outline-none focus:border-[#176b87] transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Course filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748b] font-semibold whitespace-nowrap">Course:</span>
            <select
              value={selectedCourseSlug}
              onChange={(e) => setSelectedCourseSlug(e.target.value)}
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

          {/* Type filter */}
          <div className="flex items-center gap-1.5">
            {(["All", "capstone", "module_assignment"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                  typeFilter === t
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-white border border-[#d6dde0] text-[#263746] hover:bg-[#f7f5ef]"
                }`}
              >
                {t === "All" ? "All Types" : t === "capstone" ? "🏆 Capstone" : "📘 Module"}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5">
            {(["All", "Not Started", "Submitted", "Approved"] as const).map((st) => (
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
      </div>

      {/* Results info */}
      <div className="px-1 flex items-center justify-between">
        <span className="text-xs text-[#64748b] font-medium">
          Showing <strong className="text-[#17191D]">{filteredProjects.length}</strong> projects
        </span>
        <span className="text-xs text-[#64748b]">
          {filteredProjects.filter((p) => p.type === "capstone").length} capstones · {filteredProjects.filter((p) => p.type === "module_assignment").length} module assignments
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.length === 0 ? (
          <div className="md:col-span-2 p-16 text-center bg-white border border-dashed border-[#d6dde0] rounded-3xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#f7f5ef] flex items-center justify-center">
              <CodeIcon className="w-7 h-7 text-[#64748b]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17191D]">No Projects Found</h3>
              <p className="text-xs text-[#64748b] mt-1 max-w-sm mx-auto">
                No capstone projects match the selected criteria. Try changing your filters.
              </p>
            </div>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const submission = submissions[project.id];
            const status = submission?.status || "Not Started";

            const statusConfig = {
              "Not Started": { badge: "bg-[#f7f5ef] text-[#64748b] border-[#e5e7eb]", dot: "bg-[#cbd5e1]" },
              "Submitted": { badge: "bg-amber-50 text-amber-800 border-amber-200", dot: "bg-amber-500" },
              "Under Review": { badge: "bg-blue-50 text-blue-800 border-blue-200", dot: "bg-blue-500" },
              "Approved": { badge: "bg-emerald-50 text-emerald-800 border-emerald-200", dot: "bg-emerald-500" },
            }[status] || { badge: "bg-[#f7f5ef] text-[#64748b] border-[#e5e7eb]", dot: "bg-[#cbd5e1]" };

            const diff = difficultyConfig[project.difficulty] || difficultyConfig.intermediate;
            const typeConf = typeConfig[project.type] || typeConfig.module_assignment;

            return (
              <div
                key={project.id}
                className={`rounded-3xl border bg-white overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md ${
                  project.type === "capstone"
                    ? "border-purple-200 hover:border-purple-400"
                    : "border-[#e5e7eb] hover:border-[#176b87]/30"
                }`}
              >
                {/* Top accent bar for capstone */}
                {project.type === "capstone" && (
                  <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-purple-400 to-indigo-500" />
                )}

                <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-4">
                  {/* Header badges */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full border font-bold text-[10px] ${typeConf.badge}`}>
                        {typeConf.icon} {typeConf.label}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full border font-bold text-[10px] ${diff.badge}`}>
                        {diff.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                      <span className={`px-2.5 py-0.5 rounded-full border font-bold text-[10px] ${statusConfig.badge}`}>
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Course tag + Title */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-[#176b87] uppercase tracking-wider">{project.courseTitle}</span>
                    <h2 className="text-base font-bold text-[#17191D] leading-snug">{project.title}</h2>
                    <p className="text-xs text-[#263746] leading-relaxed">{project.summary}</p>
                  </div>

                  {/* Core requirements */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-[#64748b] uppercase tracking-wider block">
                      Core Requirements:
                    </span>
                    <ul className="space-y-1">
                      {project.requirements.slice(0, 3).map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#263746]">
                          <span className="text-[#176b87] font-black mt-0.5">›</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-[#64748b] uppercase tracking-wider block">
                      Expected Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.deliverables.map((del, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-lg bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] text-[10px] font-medium"
                        >
                          ✓ {del}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Submission feedback */}
                  {submission?.feedback && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                      <strong className="block text-amber-800 font-bold">Trainer Review Status:</strong>
                      <p className="text-[11px] leading-relaxed">{submission.feedback}</p>
                      {submission.submittedAt && (
                        <div className="flex items-center justify-between pt-1 text-[10px] text-amber-700">
                          <span>Submitted on {submission.submittedAt}</span>
                          {submission.repoUrl && (
                            <a
                              href={submission.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#176b87] font-bold hover:underline"
                            >
                              View Codebase ↗
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[#64748b]">
                      <span className="flex items-center gap-1.5">
                        <ClockIcon className="w-3.5 h-3.5 text-[#176b87]" />
                        <strong className="text-[#17191D]">{project.durationWeeks}W</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <TargetIcon className="w-3.5 h-3.5 text-[#176b87]" />
                        {project.rubric.length} criteria
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenSubmit(project)}
                      className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer ${
                        project.type === "capstone"
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-[#176b87] hover:bg-[#12566c]"
                      }`}
                    >
                      <CodeIcon className="w-3.5 h-3.5" />
                      {submission ? "Update" : "Submit Project"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer info */}
      <div className="p-5 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] flex items-start gap-3">
        <TrophyIcon className="w-5 h-5 text-[#C9A64B] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-[#263746] leading-relaxed">
          <strong className="text-[#17191D]">Project evaluation process:</strong> Submit your GitHub repository and live deployment links.
          Faculty will review your code architecture, security, and UI quality against the rubric. Approved capstones are
          highlighted on your ANZEYL profile and contribute to your verified certificate.
        </div>
      </div>

      {/* Submission Modal */}
      {activeSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="max-w-xl w-full p-7 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#e5e7eb] pb-4 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`px-2 py-0.5 rounded-full border font-bold text-[10px] ${typeConfig[activeSubmitModal.type]?.badge}`}>
                    {typeConfig[activeSubmitModal.type]?.icon} {typeConfig[activeSubmitModal.type]?.label}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#17191D]">Submit: {activeSubmitModal.title}</h3>
                <p className="text-xs text-[#64748b] mt-0.5">{activeSubmitModal.courseTitle}</p>
              </div>
              <button
                onClick={() => setActiveSubmitModal(null)}
                className="text-[#64748b] hover:text-[#17191D] p-1 rounded-lg hover:bg-[#f7f5ef] transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <form onSubmit={handleSubmitProject} className="space-y-5 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[#263746]">
                  GitHub / GitLab Repository URL <span className="text-rose-600">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/your-username/project-repo"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d6dde0] text-[#263746] font-mono focus:outline-none focus:border-[#176b87] shadow-sm transition-colors text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#263746]">
                  Live Deployment / Demo / Figma Link <span className="text-[#64748b] font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://my-app.vercel.app or Figma prototype link"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#d6dde0] text-[#263746] font-mono focus:outline-none focus:border-[#176b87] shadow-sm transition-colors text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#263746]">Architectural Notes / Challenges Overcome</label>
                <textarea
                  rows={3}
                  placeholder="Mention design decisions, environment variables, testing credentials, or key implementation notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#d6dde0] text-[#263746] focus:outline-none focus:border-[#176b87] shadow-sm transition-colors resize-none text-xs"
                />
              </div>

              {/* Rubric */}
              <div className="p-4 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-2">
                <span className="font-bold text-[#17191D] block text-xs">Evaluation Rubric:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {activeSubmitModal.rubric.map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="flex-1 text-[11px] text-[#263746]">{r.criterion}</span>
                      <div className="w-20 h-1.5 rounded-full bg-[#e5e7eb] overflow-hidden flex-shrink-0">
                        <div
                          className="h-full rounded-full bg-[#176b87]"
                          style={{ width: `${r.weightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#176b87] w-9 text-right flex-shrink-0">{r.weightPercent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSubmitModal(null)}
                  className="flex-1 py-3 rounded-xl bg-white hover:bg-[#f7f5ef] border border-[#d6dde0] text-[#263746] font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 rounded-xl text-white font-bold shadow-sm transition-colors text-xs ${
                    activeSubmitModal.type === "capstone"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-[#176b87] hover:bg-[#12566c]"
                  }`}
                >
                  Send for Mentor Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
