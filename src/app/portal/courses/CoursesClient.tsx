"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  PlayIcon,
  BookOpenIcon,
  GraduationCapIcon,
  CheckCircleIcon,
  SearchIcon,
  ClockIcon,
} from "@/components/Icons";
import { formatPrice } from "@/lib/courseData";

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
  durationLabel?: string;
  modes?: ("Online" | "Offline")[];
  priceInCents?: number | null;
  originalPriceInCents?: number | null;
}

interface CoursesClientProps {
  initialCourses: CourseCardData[];
  isLoggedIn: boolean;
}

const LOCAL_ENROLLMENT_KEY = "anzeyl_student_enrolled_courses";

const emptySubscribe = () => () => {};
const EMPTY_SLUGS: string[] = [];

function useEnrolledSlugs(): string[] {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof window === "undefined") return EMPTY_SLUGS;
      try {
        const saved = localStorage.getItem(LOCAL_ENROLLMENT_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // Ignore
      }
      return EMPTY_SLUGS;
    },
    () => EMPTY_SLUGS
  );
}

export default function CoursesClient({ initialCourses, isLoggedIn }: CoursesClientProps) {
  const enrolledSlugs = useEnrolledSlugs();

  const courses = useMemo<CourseCardData[]>(() => {
    if (enrolledSlugs.length === 0) return initialCourses;
    const storedSet = new Set(enrolledSlugs);
    return initialCourses.map((c) =>
      storedSet.has(c.id) || storedSet.has(c.slug)
        ? { ...c, enrolled: true }
        : c
    );
  }, [initialCourses, enrolledSlugs]);
  const [search, setSearch] = useState("");

  const [activeView, setActiveView] = useState<"my-courses" | "all-courses">(() =>
    isLoggedIn && initialCourses.some((c) => c.enrolled) ? "my-courses" : "all-courses"
  );

  const enrolledCourses = useMemo(
    () => courses.filter((c) => c.enrolled),
    [courses]
  );

  const displayedCourses = useMemo(() => {
    const list = activeView === "my-courses" ? enrolledCourses : courses;
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [activeView, enrolledCourses, courses, search]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
              ANZEYL Learning Platform
            </span>
            <span className="text-xs text-[#64748b]">
              {enrolledCourses.length} enrolled • {courses.length} published programmes
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] mt-1">
            {activeView === "my-courses" ? "My Enrolled Courses" : "All ANZEYL Courses"}
          </h1>
          <p className="text-xs sm:text-sm text-[#263746] mt-1 max-w-2xl">
            {activeView === "my-courses"
              ? "Track your progress, access classroom materials, and complete hands-on assignments for your enrolled courses."
              : "Explore all 9 comprehensive career-track programmes. View detailed curriculums, training modes, and enroll to begin."}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <SearchIcon className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses, skills, tools..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#d6dde0] rounded-xl text-[#263746] placeholder-[#8fa0ab] focus:outline-none focus:border-[#176b87] shadow-2xs"
          />
        </div>
      </div>

      {/* Main View Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-[#e5e7eb] pb-3">
        <button
          type="button"
          onClick={() => setActiveView("my-courses")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeView === "my-courses"
              ? "bg-[#176b87] text-white shadow-xs"
              : "bg-white border border-[#d6dde0] text-[#263746] hover:bg-[#f7f5ef]"
            }`}
        >
          <BookOpenIcon className="w-4 h-4" />
          <span>My Courses ({enrolledCourses.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView("all-courses")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeView === "all-courses"
              ? "bg-[#176b87] text-white shadow-xs"
              : "bg-white border border-[#d6dde0] text-[#263746] hover:bg-[#f7f5ef]"
            }`}
        >
          <GraduationCapIcon className="w-4 h-4" />
          <span>All Courses ({courses.length})</span>
        </button>
      </div>

      {/* Active View Content */}
      {activeView === "my-courses" && enrolledCourses.length === 0 ? (
        /* Empty State for My Courses */
        <div className="p-12 sm:p-16 rounded-3xl border border-dashed border-[#d6dde0] bg-white text-center space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-3xl bg-[#176b87]/10 text-[#176b87] flex items-center justify-center mx-auto">
            <BookOpenIcon className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#17191D]">
              {isLoggedIn
                ? "You haven't enrolled in any courses yet"
                : "Log In to Access Your Enrolled Courses"}
            </h2>
            <p className="text-xs text-[#64748b] max-w-md mx-auto leading-relaxed">
              {isLoggedIn
                ? "Browse all 9 ANZEYL industry-standard programmes below and click 'Enroll' on any course to add it to your learning path."
                : "Sign in with your student account to access your personal enrolled courses, or explore all 9 published courses below without logging in."}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {!isLoggedIn && (
              <Link
                href="/student/login?next=/portal/courses"
                className="px-6 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Log In to Student Account
              </Link>
            )}
            <button
              type="button"
              onClick={() => setActiveView("all-courses")}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-colors ${isLoggedIn
                  ? "bg-[#176b87] hover:bg-[#12566c] text-white"
                  : "bg-white hover:bg-[#f7f5ef] border border-[#d6dde0] text-[#263746]"
                }`}
            >
              <span>Explore All 9 Courses</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : displayedCourses.length === 0 ? (
        <div className="p-10 rounded-3xl border border-dashed border-[#d6dde0] bg-white text-center shadow-2xs">
          <h2 className="text-base font-bold text-[#17191D]">No courses match &quot;{search}&quot;</h2>
          <p className="text-xs text-[#64748b] mt-1">Try searching by category, technology, or clear your query.</p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-3 px-4 py-1.5 rounded-xl bg-[#f7f5ef] border border-[#d6dde0] text-[#263746] text-xs font-semibold"
          >
            Clear Search
          </button>
        </div>
      ) : (
        /* Courses Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course) => {
            const progress = course.totalLessons
              ? Math.round((course.completedLessons / course.totalLessons) * 100)
              : 0;

            const priceText =
              course.priceInCents !== null && course.priceInCents !== undefined
                ? formatPrice(course.priceInCents)
                : "Contact ANZEYL for Course Fees";

            return (
              <article
                key={course.id}
                className="bg-white rounded-3xl border border-[#e5e7eb] hover:border-[#176b87] transition-all shadow-xs flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Header Strip */}
                  <div className="h-1.5 bg-[#176b87]" />

                  <div className="p-6 space-y-4">
                    {/* Tags */}
                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20 uppercase">
                        {course.category}
                      </span>

                      {course.enrolled ? (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1">
                          <CheckCircleIcon className="w-3 h-3 text-emerald-600" />
                          <span>Enrolled</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-[#176b87]">
                          {priceText}
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h2 className="text-base font-bold text-[#17191D] group-hover:text-[#176b87] transition-colors leading-snug">
                        {course.title}
                      </h2>
                      <p className="course-subcontent mt-2 line-clamp-3">
                        {course.description}
                      </p>
                    </div>

                    {/* Duration & Mode Tags */}
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-[#64748b]">
                      <span className="flex items-center gap-1 font-semibold text-[#263746]">
                        <ClockIcon className="w-3.5 h-3.5 text-[#176b87]" />
                        <span>{course.durationLabel || "3 months"}</span>
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#e7f4ef] text-[#287362] font-semibold border border-[#b9ddd1] text-[10px]">
                        Online
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#fff3e5] text-[#9a6031] font-semibold border border-[#f2d0a8] text-[10px]">
                        Offline
                      </span>
                    </div>

                    {/* Enrolled Progress Bar */}
                    {course.enrolled && (
                      <div className="pt-2 space-y-1.5">
                        <div className="flex justify-between text-xs text-[#64748b]">
                          <span>
                            {course.completedLessons} of {course.totalLessons} lessons
                          </span>
                          <span className="text-[#176b87] font-bold">{progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#e5e7eb] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#176b87] transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-0 border-t border-[#e5e7eb] mt-4 pt-4 flex items-center justify-between gap-3 text-xs">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-[#64748b] hover:text-[#176b87] font-semibold text-xs"
                  >
                    View Details →
                  </Link>

                  {course.enrolled ? (
                    <Link
                      href={`/portal/classroom/${course.slug}`}
                      className="px-4 py-2 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <PlayIcon className="w-3.5 h-3.5" />
                      <span>{progress > 0 ? "Continue" : "Classroom"}</span>
                    </Link>
                  ) : (
                    <Link
                      href={`/portal/enroll/${course.slug}`}
                      className="px-4 py-2 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Enroll Now</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
