"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { CheckCircleIcon, ChevronRightIcon, ClockIcon, DownloadIcon, PlayIcon } from "@/components/Icons";
import { getCourseBySlug } from "@/lib/courseData";

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  instructor_name: string | null;
}

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  position: number;
  duration_minutes: number | null;
  video_url: string | null;
  material_url: string | null;
  module_id: string | null;
}

interface Module {
  id: string;
  title: string;
  position: number;
}

interface Progress {
  lesson_id: string;
  completed: boolean;
  watched_seconds: number;
}

export default function ClassroomClient({ courseId }: { courseId: string }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [materialUrl, setMaterialUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];
  const completedIds = useMemo(() => new Set(progress.filter((item) => item.completed).map((item) => item.lesson_id)), [progress]);
  const completedCount = lessons.filter((lesson) => completedIds.has(lesson.id)).length;

  useEffect(() => {
    let mounted = true;

    async function loadClassroom() {
      // 1. Fallback for demo mode or placeholder Supabase
      const hasDemoCookie =
        typeof document !== "undefined" &&
        document.cookie.split("; ").some((c) => c.startsWith("anzeyl_demo_role="));
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const isPlaceholder = supabaseUrl.includes("placeholder");

      if (hasDemoCookie || isPlaceholder) {
        const anzeylCourse = getCourseBySlug(courseId);
        if (anzeylCourse) {
          const fallbackCourse: Course = {
            id: anzeylCourse.id,
            slug: anzeylCourse.slug,
            title: anzeylCourse.title,
            description: anzeylCourse.shortDescription,
            instructor_name: "ANZEYL Faculty",
          };

          const fallbackModules: Module[] = anzeylCourse.modules.map((m, idx) => ({
            id: `mod-${idx + 1}`,
            title: m.title,
            position: idx + 1,
          }));

          const fallbackLessons: Lesson[] = [];
          let lessonPos = 1;
          anzeylCourse.modules.forEach((mod, modIdx) => {
            mod.topics.forEach((topic) => {
              fallbackLessons.push({
                id: `les-${lessonPos}`,
                title: topic,
                description: `${topic} — Practical concepts, industry techniques, and live implementation.`,
                position: lessonPos,
                duration_minutes: 25,
                video_url: null,
                material_url: `/portal/materials`,
                module_id: `mod-${modIdx + 1}`,
              });
              lessonPos++;
            });
          });

          if (mounted) {
            setCourse(fallbackCourse);
            setModules(fallbackModules);
            setLessons(fallbackLessons);
            setActiveLessonId(fallbackLessons[0]?.id ?? null);
            setLoading(false);
          }
          return;
        }
      }

      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        if (mounted) setError("Your session has expired. Please sign in again.");
        return;
      }

      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("id, slug, title, description, instructor_name")
        .eq("slug", courseId)
        .eq("published", true)
        .maybeSingle();

      if (courseError || !courseData) {
        if (mounted) setError("This course could not be found.");
        return;
      }

      const { data: enrollment } = await supabase
        .from("course_enrollments")
        .select("id")
        .eq("course_id", courseData.id)
        .eq("user_id", userData.user.id)
        .maybeSingle();

      if (!enrollment) {
        if (mounted) setError("Enroll in this course before opening its classroom.");
        return;
      }

      const [{ data: lessonData, error: lessonError }, { data: moduleData }, { data: progressData }] = await Promise.all([
        supabase.from("course_lessons").select("id, title, description, position, duration_minutes, video_url, material_url, module_id").eq("course_id", courseData.id).order("position"),
        supabase.from("course_modules").select("id, title, position").eq("course_id", courseData.id).order("position"),
        supabase.from("lesson_progress").select("lesson_id, completed, watched_seconds").eq("user_id", userData.user.id),
      ]);

      if (lessonError) {
        if (mounted) setError("Unable to load the lessons for this course.");
        return;
      }

      if (mounted) {
        setCourse(courseData);
        setLessons(lessonData ?? []);
        setModules(moduleData ?? []);
        setProgress(progressData ?? []);
        setActiveLessonId(lessonData?.find((lesson) => !(progressData ?? []).some((item) => item.lesson_id === lesson.id && item.completed))?.id ?? lessonData?.[0]?.id ?? null);
        setLoading(false);
      }
    }

    void loadClassroom();
    return () => { mounted = false; };
  }, [courseId]);

  async function markComplete() {
    if (!activeLesson) return;
    setSaving(true);
    setError(null);

    const hasDemoCookie =
      typeof document !== "undefined" &&
      document.cookie.split("; ").some((c) => c.startsWith("anzeyl_demo_role="));
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const isPlaceholder = supabaseUrl.includes("placeholder");

    if (hasDemoCookie || isPlaceholder) {
      setProgress((current) => [
        ...current.filter((item) => item.lesson_id !== activeLesson.id),
        { lesson_id: activeLesson.id, completed: true, watched_seconds: 0 },
      ]);
      setSaving(false);
      return;
    }

    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setError("Your session has expired. Please sign in again.");
      setSaving(false);
      return;
    }

    const { data, error: progressError } = await supabase.from("lesson_progress").upsert({
      user_id: userData.user.id,
      lesson_id: activeLesson.id,
      completed: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,lesson_id" }).select("lesson_id, completed, watched_seconds").single();

    if (progressError) setError(progressError.message);
    else if (data) setProgress((current) => [...current.filter((item) => item.lesson_id !== data.lesson_id), data]);
    setSaving(false);
  }

  async function openMaterial() {
    if (!activeLesson?.material_url) return;
    const supabase = createClient();
    const { data, error: signedUrlError } = await supabase.storage.from("learning-materials").createSignedUrl(activeLesson.material_url, 3600);
    if (signedUrlError) setError("This learning material is not available yet.");
    else if (data?.signedUrl) setMaterialUrl(data.signedUrl);
  }

  if (loading) return <div className="max-w-7xl mx-auto space-y-6 animate-pulse"><div className="h-6 w-56 bg-white/10 rounded-xl" /><div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-2 aspect-video bg-[#0f1424] rounded-3xl" /><div className="bg-[#0f1424] rounded-3xl h-96" /></div></div>;
  if (error && !course) return <div role="alert" className="max-w-3xl mx-auto p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200">{error}</div>;
  if (!course) return null;

  const groupedModules = modules.length ? modules : [{ id: "uncategorized", title: "Course lessons", position: 0 }];
  const getModuleLessons = (moduleId: string) => moduleId === "uncategorized" ? lessons.filter((lesson) => !lesson.module_id) : lessons.filter((lesson) => lesson.module_id === moduleId);
  const activeIndex = activeLesson ? lessons.findIndex((lesson) => lesson.id === activeLesson.id) : -1;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2"><Link href="/portal/courses" className="hover:text-white">My Courses</Link><ChevronRightIcon className="w-3.5 h-3.5" /><span className="text-cyan-400 font-bold">{course.title}</span></div>
        <span className="text-emerald-400 font-semibold">{completedCount} of {lessons.length} lessons completed</span>
      </div>

      {error && <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-3xl bg-slate-950 border border-white/15 overflow-hidden shadow-2xl flex items-center justify-center">
            {activeLesson?.video_url ? <video key={activeLesson.id} controls className="w-full h-full" src={activeLesson.video_url} /> : <div className="text-center p-8"><div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center mb-4"><PlayIcon className="w-7 h-7 text-cyan-300" /></div><h2 className="text-xl font-extrabold text-white">{activeLesson?.title ?? "No lessons published yet"}</h2><p className="text-xs text-slate-400 mt-2">Your instructor has not attached a video to this lesson yet.</p></div>}
          </div>
          <div className="glass-card rounded-3xl border border-white/10 bg-[#0f1424]/90 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4"><div><span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold">Current lesson</span><h1 className="text-xl font-bold text-white mt-1">{activeLesson?.title ?? "Choose a lesson"}</h1><p className="text-xs text-slate-400 mt-1">{course.instructor_name || "ANZEYL faculty"}{activeLesson?.duration_minutes ? ` · ${activeLesson.duration_minutes} minutes` : ""}</p></div><button type="button" onClick={markComplete} disabled={!activeLesson || saving || completedIds.has(activeLesson?.id ?? "")} className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs disabled:opacity-50">{completedIds.has(activeLesson?.id ?? "") ? "Completed" : saving ? "Saving..." : "Mark complete"}</button></div>
            <p className="text-sm text-slate-300 leading-relaxed">{activeLesson?.description || course.description || "Work through this lesson at your own pace."}</p>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10"><button type="button" disabled={activeIndex <= 0} onClick={() => setActiveLessonId(lessons[activeIndex - 1]?.id)} className="px-3 py-2 rounded-xl bg-white/5 text-xs text-slate-300 disabled:opacity-40">Previous lesson</button><button type="button" disabled={activeIndex < 0 || activeIndex >= lessons.length - 1} onClick={() => setActiveLessonId(lessons[activeIndex + 1]?.id)} className="px-3 py-2 rounded-xl bg-white/5 text-xs text-slate-300 disabled:opacity-40">Next lesson</button>{activeLesson?.material_url && <button type="button" onClick={openMaterial} className="px-3 py-2 rounded-xl bg-cyan-500/15 text-cyan-300 text-xs font-bold flex items-center gap-1.5"><DownloadIcon className="w-3.5 h-3.5" />Open PDF material</button>}</div>
            {materialUrl && <a href={materialUrl} target="_blank" rel="noreferrer" className="block text-xs text-cyan-300 underline">Open signed learning material in a new tab</a>}
          </div>
        </div>

        <aside className="glass-card rounded-3xl border border-white/10 bg-[#0f1424]/90 p-6 space-y-4 shadow-xl"><div className="flex items-center justify-between border-b border-white/10 pb-3"><h2 className="text-sm font-bold text-white">Course curriculum</h2><span className="text-[11px] text-cyan-400 font-semibold">{lessons.length} lessons</span></div><div className="space-y-5 max-h-[680px] overflow-y-auto custom-scrollbar pr-1">{groupedModules.map((module) => <div key={module.id} className="space-y-2"><span className="text-xs font-extrabold text-slate-300 block">{module.title}</span>{getModuleLessons(module.id).map((lesson) => <button key={lesson.id} type="button" onClick={() => setActiveLessonId(lesson.id)} className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex items-center justify-between ${activeLesson?.id === lesson.id ? "bg-cyan-500/15 border-cyan-500/40 text-white" : "bg-black/20 border-white/5 text-slate-400 hover:text-white"}`}><div className="flex items-center gap-2.5">{completedIds.has(lesson.id) ? <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" /> : <ClockIcon className="w-4 h-4 text-slate-500 shrink-0" />}<span className="font-semibold">{lesson.title}</span></div>{lesson.duration_minutes && <span className="text-[10px] text-slate-500 shrink-0 ml-2">{lesson.duration_minutes}m</span>}</button>)}</div>)}</div></aside>
      </div>
    </div>
  );
}
