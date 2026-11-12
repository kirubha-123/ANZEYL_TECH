"use client";

import React, { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowRightIcon, AwardIcon, PlayIcon } from "@/components/Icons";

export interface CourseCardData {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructorName: string;
  category: string;
  difficulty: string;
  thumbnailUrl: string | null;
  totalLessons: number;
  completedLessons: number;
  enrolled: boolean;
}

type FilterType = "all" | "in-progress" | "completed" | "available";

export default function CoursesClient({ initialCourses }: { initialCourses: CourseCardData[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const filteredCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesSearch = !normalizedSearch || [course.title, course.description, course.category]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
      const matchesFilter = filter === "all"
        || (filter === "available" && !course.enrolled)
        || (filter === "in-progress" && course.enrolled && course.completedLessons < course.totalLessons)
        || (filter === "completed" && course.enrolled && course.totalLessons > 0 && course.completedLessons === course.totalLessons);
      return matchesSearch && matchesFilter;
    });
  }, [courses, filter, search]);

  function enroll(courseId: string) {
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setError("Your session has expired. Please sign in again.");
        return;
      }

      const { error: enrollmentError } = await supabase.from("course_enrollments").insert({
        user_id: userData.user.id,
        course_id: courseId,
      });

      if (enrollmentError && enrollmentError.code !== "23505") {
        setError(enrollmentError.message);
        return;
      }

      setCourses((current) => current.map((course) => (
        course.id === courseId ? { ...course, enrolled: true } : course
      )));
    });
  }

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: "all", label: `All (${courses.length})` },
    { key: "in-progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
    { key: "available", label: "Available" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">My Learning Path</span>
            <span className="text-xs text-slate-400">{courses.filter((course) => course.enrolled).length} enrolled</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Courses & Curriculums</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">Continue enrolled learning or choose a published course for your next skill milestone.</p>
        </div>
        <div className="relative w-full lg:w-80">
          <label htmlFor="course-search" className="sr-only">Search courses</label>
          <input
            id="course-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search courses, topics, categories"
            className="w-full px-4 py-3 rounded-xl bg-[#0f1424] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${filter === tab.key ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50" : "text-slate-400 hover:text-white"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <div role="alert" className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">{error}</div>}

      {filteredCourses.length === 0 ? (
        <div className="p-10 rounded-3xl border border-dashed border-white/15 bg-[#0f1424]/70 text-center">
          <h2 className="text-lg font-bold text-white">No courses match this view</h2>
          <p className="text-sm text-slate-400 mt-2">Try another search or check back when your learning catalog has published courses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const progress = course.totalLessons ? Math.round((course.completedLessons / course.totalLessons) * 100) : 0;
            return (
              <article key={course.id} className="glass-card overflow-hidden rounded-3xl border border-white/10 bg-[#0f1424]/90 hover:border-cyan-500/40 transition-all shadow-xl group">
                <div className="h-28 bg-gradient-to-br from-cyan-500/30 via-indigo-500/20 to-fuchsia-500/30 relative">
                  {course.thumbnailUrl && <div role="img" aria-label={`${course.title} thumbnail`} className="w-full h-full bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${course.thumbnailUrl})` }} />}
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#090c15]/80 text-cyan-200 border border-cyan-300/30 text-[10px] font-bold uppercase">{course.category || "General"}</span>
                  {course.enrolled && <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-300/30 text-[10px] font-bold">Enrolled</span>}
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{course.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">{course.instructorName || "ANZEYL faculty"} · {course.difficulty || "All levels"}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mt-3 line-clamp-3">{course.description || "Build practical skills with guided lessons and assessments."}</p>
                  </div>
                  {course.enrolled && <div className="space-y-1.5"><div className="flex justify-between text-xs text-slate-400"><span>{course.completedLessons} of {course.totalLessons} lessons</span><span className="text-cyan-300 font-bold">{progress}%</span></div><div className="h-2 rounded-full bg-slate-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500" style={{ width: `${progress}%` }} /></div></div>}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    {course.enrolled ? (
                      <Link href={`/portal/classroom/${course.slug}`} className="text-emerald-300 text-xs font-bold flex items-center gap-1.5"><AwardIcon className="w-4 h-4" />{progress === 100 ? "Completed" : "Continue learning"}</Link>
                    ) : <span className="text-xs text-slate-500">Published course</span>}
                    {course.enrolled ? <Link href={`/portal/classroom/${course.slug}`} className="btn-colorful-primary px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"><PlayIcon className="w-3.5 h-3.5" />Open classroom</Link> : <button type="button" disabled={pending} onClick={() => enroll(course.id)} className="btn-colorful-primary px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 disabled:opacity-50"><span>{pending ? "Enrolling..." : "Enroll"}</span><ArrowRightIcon className="w-3.5 h-3.5" /></button>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
