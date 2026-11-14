"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BookOpenIcon,
  ClockIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@/components/Icons";
import {
  ANZEYL_COURSES,
  COURSE_CATEGORIES,
  getPriceLabel,
  type AnzeylCourse,
} from "@/lib/courseData";

function ModeTag({ mode }: { mode: string }) {
  const isOnline = mode === "Online";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
        isOnline
          ? "bg-[#e7f4ef] border-[#b9ddd1] text-[#287362]"
          : "bg-[#fff3e5] border-[#f2d0a8] text-[#9a6031]"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-[#4c9a89]" : "bg-[#f2b880]"}`} />
      {mode}
    </span>
  );
}

function DifficultyBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    beginner: "bg-[#e7f4ef] border-[#b9ddd1] text-[#287362]",
    intermediate: "bg-[#e5f2f5] border-[#b6d7df] text-[#176b87]",
    advanced: "bg-[#faeee9] border-[#e8c6ba] text-[#9c5545]",
  };
  const labels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles[level] ?? styles.intermediate}`}
    >
      {labels[level] ?? level}
    </span>
  );
}

function CourseCard({ course }: { course: AnzeylCourse }) {
  const priceLabel = getPriceLabel(course);
  const hasDiscount =
    course.originalPriceInCents !== null &&
    course.priceInCents !== null &&
    course.originalPriceInCents > course.priceInCents;

  return (
    <article className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:border-[#b6d7df] transition-all duration-200 group">
      {/* Top colour strip by category */}
      <div
        className="h-1.5 w-full"
        style={{
          background:
            course.category === "Full Stack Development" || course.category === "Java Full Stack"
              ? "linear-gradient(90deg, #176b87, #4c9a89)"
              : course.category === "AI & Machine Learning"
              ? "linear-gradient(90deg, #c97761, #f2b880)"
              : course.category === "Data Science"
              ? "linear-gradient(90deg, #5b7782, #176b87)"
              : course.category === "Cyber Security"
              ? "linear-gradient(90deg, #9c5545, #c97761)"
              : course.category === "Cloud & DevOps"
              ? "linear-gradient(90deg, #176b87, #5b7782)"
              : course.category === "UI/UX Design"
              ? "linear-gradient(90deg, #4c9a89, #f2b880)"
              : course.category === "Digital Marketing"
              ? "linear-gradient(90deg, #f2b880, #c97761)"
              : "linear-gradient(90deg, #176b87, #4c9a89)",
        }}
      />

      <div className="p-6 flex flex-col flex-1 space-y-4">
        {/* Category + Difficulty */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] font-bold text-[#176b87] uppercase tracking-wide">
            {course.category}
          </span>
          <DifficultyBadge level={course.difficulty} />
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-[#17191D] leading-snug group-hover:text-[#176b87] transition-colors">
          {course.title}
        </h2>

        {/* Short description */}
        <p className="text-xs text-[#64748b] leading-relaxed line-clamp-3 flex-1">
          {course.shortDescription}
        </p>

        {/* Duration + Modes */}
        <div className="flex items-center flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#263746]">
            <ClockIcon className="w-3.5 h-3.5 text-[#176b87]" />
            {course.durationLabel}
          </span>
          {course.modes.map((m) => (
            <ModeTag key={m} mode={m} />
          ))}
        </div>

        {/* Pricing */}
        <div className="pt-1 border-t border-[#e5e7eb]">
          {priceLabel === "Contact ANZEYL for Course Fees" ? (
            <p className="text-xs font-semibold text-[#64748b] italic">
              Contact ANZEYL for Course Fees
            </p>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[#176b87]">{priceLabel}</span>
              {hasDiscount && course.originalPriceInCents && (
                <span className="text-xs text-[#64748b] line-through">
                  ₹{(course.originalPriceInCents / 100).toLocaleString("en-IN")}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/courses/${course.slug}`}
            className="flex-1 py-2.5 rounded-xl border border-[#176b87] text-[#176b87] font-bold text-xs text-center hover:bg-[#e5f2f5] transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/get-started?course=${course.slug}`}
            className="flex-1 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
          >
            Enrol Now
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ANZEYL_COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.shortDescription.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        course.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f7f5ef] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-10">

        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e7f4ef] border border-[#b9ddd1] text-[#287362] text-xs font-bold uppercase tracking-wider">
            <BookOpenIcon className="w-3.5 h-3.5" />
            <span>Professional Training Programmes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight leading-tight">
            ANZEYL SOLUTIONS Course{" "}
            <span className="text-gradient-brand">Catalogue</span>
          </h1>
          <p className="text-sm text-[#64748b] leading-relaxed max-w-2xl mx-auto">
            Nine professionally designed programmes. Each course runs for 3 months with
            both online and offline training options available.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 space-y-4 shadow-sm">
          {/* Search */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course name, technology, category…"
              className="human-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm"
            />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {COURSE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#176b87] text-white border-[#12566c] shadow-sm"
                    : "bg-white text-[#263746] border-[#e5e7eb] hover:border-[#176b87] hover:text-[#176b87]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-xs text-[#64748b] px-1">
          Showing <strong className="text-[#263746]">{filteredCourses.length}</strong>{" "}
          of <strong className="text-[#263746]">{ANZEYL_COURSES.length}</strong> courses
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[#64748b] text-sm">No courses match your search. Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8 text-center space-y-4 shadow-sm max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-[#17191D]">Not sure which course to choose?</h3>
          <p className="text-sm text-[#64748b] max-w-xl mx-auto">
            Speak to an ANZEYL SOLUTIONS adviser. We will help you find the right programme for your goals and background.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-sm shadow-sm transition-colors"
          >
            Contact Us
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
