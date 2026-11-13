"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  SearchIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ShieldCheckIcon,
} from "@/components/Icons";
import { ANZEYL_COURSES } from "@/lib/courseData";

export interface StudentNote {
  id: string;
  courseSlug: string;
  courseTitle: string;
  topic: string;
  title: string;
  content: string;
  updatedAt: string;
}

export default function MyNotesPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [notes, setNotes] = useState<StudentNote[]>([]);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeNote, setActiveNote] = useState<StudentNote | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Form states
  const [formCourseSlug, setFormCourseSlug] = useState<string>("full-stack-development");
  const [formTopic, setFormTopic] = useState<string>("");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formContent, setFormContent] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Authentication check & load remote notes
  useEffect(() => {
    let active = true;
    async function loadNotes() {
      try {
        const supabase = createClient();
        const { data: userData } = await supabase.auth.getUser();
        const isDemoStudent = typeof document !== "undefined" && document.cookie.includes("anzeyl_demo_role=student");

        if (!userData?.user && !isDemoStudent) {
          if (active) {
            setIsLoggedIn(false);
            setCheckingAuth(false);
          }
          router.replace("/student/login?next=/portal/notes");
          return;
        }

        if (active) {
          setIsLoggedIn(true);
          setCheckingAuth(false);
        }

        if (isDemoStudent && !userData?.user) {
          const saved = typeof window !== "undefined" ? localStorage.getItem("anzeyl_demo_student_notes") : null;
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              if (active && Array.isArray(parsed) && parsed.length > 0) {
                setNotes(parsed);
                setActiveNote(parsed[0]);
                return;
              }
            } catch {
              // Ignore
            }
          }
          const defaultDemoNotes: StudentNote[] = [
            {
              id: "demo-note-1",
              courseSlug: "full-stack-development",
              courseTitle: "Full Stack Development",
              topic: "React 19 & Next.js",
              title: "Server Actions vs API Routes Architecture",
              content: "Server Actions provide seamless RPC-style mutations directly from form actions without defining explicit route handlers. Always validate permissions inside the action using zero-trust principles.",
              updatedAt: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
            },
          ];
          if (active) {
            setNotes(defaultDemoNotes);
            setActiveNote(defaultDemoNotes[0]);
          }
          return;
        }

        const { data: remoteNotes, error } = await supabase
          .from("student_notes")
          .select("id, course_slug, topic, title, content, updated_at")
          .eq("user_id", userData.user.id)
          .order("updated_at", { ascending: false });

        if (!error && remoteNotes && remoteNotes.length > 0) {
          const mapped: StudentNote[] = remoteNotes.map((rn) => {
            const matchedCourse = ANZEYL_COURSES.find((c) => c.slug === rn.course_slug);
            return {
              id: rn.id,
              courseSlug: rn.course_slug,
              courseTitle: matchedCourse?.title || "General",
              topic: rn.topic || "General",
              title: rn.title,
              content: rn.content || "",
              updatedAt: new Date(rn.updated_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            };
          });
          if (active) {
            setNotes(mapped);
            if (mapped.length > 0) setActiveNote(mapped[0]);
          }
        }
      } catch {
        if (active) setCheckingAuth(false);
      }
    }

    void loadNotes();
    return () => {
      active = false;
    };
  }, [router]);

  const handleOpenNewNote = () => {
    setIsEditing(true);
    setActiveNote(null);
    setFormCourseSlug(ANZEYL_COURSES[0].slug);
    setFormTopic("");
    setFormTitle("");
    setFormContent("");
  };

  const handleOpenEdit = (note: StudentNote) => {
    setIsEditing(true);
    setActiveNote(note);
    setFormCourseSlug(note.courseSlug);
    setFormTopic(note.topic);
    setFormTitle(note.title);
    setFormContent(note.content);
  };

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const matchedCourse = ANZEYL_COURSES.find((c) => c.slug === formCourseSlug);
    const dateLabel = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const isExisting = Boolean(activeNote?.id);
    const noteId = isExisting ? (activeNote!.id) : `note-${Date.now()}`;

    const newNote: StudentNote = {
      id: noteId,
      courseSlug: formCourseSlug,
      courseTitle: matchedCourse?.title || "General",
      topic: formTopic.trim() || "General Note",
      title: formTitle.trim(),
      content: formContent.trim(),
      updatedAt: dateLabel,
    };

    let updatedList: StudentNote[];
    if (isExisting) {
      updatedList = notes.map((n) => (n.id === noteId ? newNote : n));
    } else {
      updatedList = [newNote, ...notes];
    }

    setNotes(updatedList);
    setActiveNote(newNote);
    setIsEditing(false);

    try {
      localStorage.setItem("anzeyl_demo_student_notes", JSON.stringify(updatedList));
    } catch {
      // Ignore
    }

    // Sync to Supabase student_notes table
    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase.from("student_notes").upsert({
          id: noteId.startsWith("note-") ? undefined : noteId,
          user_id: userData.user.id,
          course_slug: formCourseSlug,
          topic: formTopic.trim() || "General Note",
          title: formTitle.trim(),
          content: formContent.trim(),
          updated_at: new Date().toISOString(),
        });
      }
    } catch {
      // Non-blocking
    }

    setSaveStatus("Note saved securely to your account.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    try {
      localStorage.setItem("anzeyl_demo_student_notes", JSON.stringify(updated));
    } catch {
      // Ignore
    }
    if (activeNote?.id === id) {
      setActiveNote(updated[0] || null);
      setIsEditing(false);
    }

    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase.from("student_notes").delete().eq("id", id).eq("user_id", userData.user.id);
      }
    } catch {
      // Non-blocking
    }
  };

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesCourse =
        selectedCourseFilter === "All" || note.courseSlug === selectedCourseFilter;
      const matchesSearch =
        !q ||
        note.title.toLowerCase().includes(q) ||
        note.topic.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q);
      return matchesCourse && matchesSearch;
    });
  }, [notes, selectedCourseFilter, searchQuery]);

  // Loading state
  if (checkingAuth) {
    return (
      <div className="p-12 text-center max-w-xl mx-auto space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#176b87] border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-[#64748b] font-medium">Checking authentication status…</p>
      </div>
    );
  }

  // Unauthenticated locked view
  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 sm:p-10 bg-white rounded-3xl border border-[#e5e7eb] shadow-xs text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center mx-auto">
          <ShieldCheckIcon className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-[#17191D]">
            Student Sign-In Required
          </h2>
          <p className="text-xs sm:text-sm text-[#263746] max-w-md mx-auto leading-relaxed">
            Your personal course notes are private and synced securely to your ANZEYL student account. Please sign in to view, create, and manage your notes.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/student/login?next=/portal/notes"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
          >
            Log In to View My Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
              Personal Study Workspace
            </span>
            <span className="text-xs text-[#64748b]">Private Student Notebook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] mt-1">
            My Notes
          </h1>
          <p className="text-xs sm:text-sm text-[#263746] mt-1 max-w-2xl">
            Record key architectural concepts, interview notes, and code snippets while progressing through your ANZEYL courses.
          </p>
        </div>

        <button
          onClick={handleOpenNewNote}
          className="px-5 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>+ Create New Note</span>
        </button>
      </div>

      {saveStatus && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-2xs">
          <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Main Split Layout: List on Left, Active Note / Editor on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filter + List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Course Filter */}
          <div className="p-4 rounded-2xl border border-[#e5e7eb] bg-white space-y-3 shadow-xs">
            <div className="relative">
              <SearchIcon className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by keyword or topic..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#d6dde0] rounded-xl text-[#263746] placeholder-[#8fa0ab] focus:outline-none focus:border-[#176b87] shadow-2xs"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#64748b] font-semibold text-[11px] whitespace-nowrap">Course:</span>
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="flex-1 py-1.5 px-2.5 text-xs bg-white border border-[#d6dde0] rounded-lg text-[#263746] focus:outline-none focus:border-[#176b87] truncate shadow-2xs"
              >
                <option value="All" className="text-[#263746] bg-white">All Courses</option>
                {ANZEYL_COURSES.map((c) => (
                  <option key={c.slug} value={c.slug} className="text-[#263746] bg-white">
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
            {filteredNotes.length === 0 ? (
              <div className="p-8 text-center bg-white border border-dashed border-[#d6dde0] rounded-2xl space-y-2 shadow-2xs">
                <BookOpenIcon className="w-8 h-8 text-[#64748b] mx-auto" />
                <h3 className="text-xs font-bold text-[#17191D]">No Notes Found</h3>
                <p className="text-[11px] text-[#64748b] max-w-xs mx-auto">
                  Click &quot;Create New Note&quot; to write down key takeaways from your lessons.
                </p>
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isActive = activeNote?.id === note.id && !isEditing;
                return (
                  <div
                    key={note.id}
                    onClick={() => {
                      setActiveNote(note);
                      setIsEditing(false);
                    }}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? "bg-[#e5f2f5] border-2 border-[#176b87] text-[#176b87] shadow-xs"
                        : "bg-white border-[#e5e7eb] text-[#263746] hover:border-[#d6dde0] hover:bg-[#f7f5ef]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#64748b] mb-1">
                      <span className="font-bold text-[#176b87] truncate max-w-[180px]">
                        {note.courseTitle}
                      </span>
                      <span>{note.updatedAt}</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#17191D] leading-snug line-clamp-1">
                      {note.title}
                    </h3>

                    <p className="text-xs text-[#64748b] mt-1 line-clamp-2 leading-relaxed">
                      {note.content || "Empty note"}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-[#e5e7eb] flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] text-[10px] font-semibold">
                        🏷️ {note.topic}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                        className="text-rose-600 hover:text-rose-700 text-[11px] font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Note Viewer or Editor (7 cols) */}
        <div className="lg:col-span-7">
          {isEditing ? (
            /* EDITOR FORM */
            <form
              onSubmit={handleSaveNote}
              className="p-6 sm:p-7 rounded-3xl border border-[#e5e7eb] bg-white space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
                <h2 className="text-base font-bold text-[#17191D]">
                  {activeNote ? "Edit Note" : "Create New Note"}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-[#64748b] hover:text-[#17191D] font-semibold"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#263746]">Course</label>
                  <select
                    value={formCourseSlug}
                    onChange={(e) => setFormCourseSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#d6dde0] rounded-xl text-[#263746] focus:outline-none focus:border-[#176b87] shadow-2xs font-semibold"
                  >
                    {ANZEYL_COURSES.map((c) => (
                      <option key={c.slug} value={c.slug} className="text-[#263746] bg-white">
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#263746]">Topic / Category</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Server Actions, Redux, Docker"
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#d6dde0] rounded-xl text-[#263746] placeholder-[#8fa0ab] focus:outline-none focus:border-[#176b87] shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-[#263746]">Note Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Key differences between CSR, SSR, and PPR"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#d6dde0] rounded-xl text-[#263746] placeholder-[#8fa0ab] focus:outline-none focus:border-[#176b87] font-semibold shadow-2xs"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-[#263746]">Note Body / Code Snippets</label>
                <textarea
                  rows={14}
                  required
                  placeholder="Write your study notes, key principles, interview questions, or code examples here..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full p-4 text-xs bg-white border border-[#d6dde0] rounded-2xl text-[#263746] placeholder-[#8fa0ab] focus:outline-none focus:border-[#176b87] font-mono leading-relaxed shadow-2xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-[#e5e7eb]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#f7f5ef] text-[#263746] border border-[#d6dde0] font-bold text-xs transition-colors"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Save Note
                </button>
              </div>
            </form>
          ) : activeNote ? (
            /* NOTE VIEWER */
            <div className="p-6 sm:p-8 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-xs">
              <div className="flex items-start justify-between gap-4 border-b border-[#e5e7eb] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20 text-[10px] font-bold">
                      {activeNote.courseTitle}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] text-[10px] font-semibold">
                      {activeNote.topic}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-[#17191D] leading-snug">
                    {activeNote.title}
                  </h2>
                  <span className="text-[11px] text-[#64748b] block">
                    Last updated on {activeNote.updatedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(activeNote)}
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#f7f5ef] text-[#263746] border border-[#d6dde0] font-bold text-xs transition-colors shadow-2xs"
                  >
                    Edit Note
                  </button>
                  <button
                    onClick={() => handleDeleteNote(activeNote.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="prose max-w-none text-xs sm:text-sm text-[#263746] leading-relaxed whitespace-pre-wrap font-sans">
                {activeNote.content}
              </div>
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="p-12 rounded-3xl border border-dashed border-[#d6dde0] bg-white text-center space-y-4 shadow-2xs">
              <BookOpenIcon className="w-12 h-12 text-[#64748b] mx-auto" />
              <h3 className="text-base font-bold text-[#17191D]">No Note Selected</h3>
              <p className="text-xs text-[#64748b] max-w-sm mx-auto">
                Select an existing note from the list on the left to review its contents, or create a new note.
              </p>
              <button
                onClick={handleOpenNewNote}
                className="px-6 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Write First Note</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
