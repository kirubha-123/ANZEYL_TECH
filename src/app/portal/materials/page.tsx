"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  DownloadIcon,
  SearchIcon,
  BookOpenIcon,
} from "@/components/Icons";
import { ANZEYL_COURSES } from "@/lib/courseData";

export interface StudyMaterial {
  id: string;
  courseSlug: string;
  courseTitle: string;
  moduleTitle: string;
  title: string;
  fileType: "PDF" | "PPT" | "Code Example" | "Resource Link";
  fileUrl: string;
  uploadDate: string;
  sizeLabel?: string;
}

export default function MaterialsPage() {
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadMaterials() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("study_materials")
          .select("id, course_slug, module_title, title, file_type, file_url, size_label, created_at")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0 && active) {
          const mapped: StudyMaterial[] = data.map((item) => {
            const course = ANZEYL_COURSES.find((c) => c.slug === item.course_slug);
            return {
              id: item.id,
              courseSlug: item.course_slug,
              courseTitle: course?.title || item.course_slug,
              moduleTitle: item.module_title || "General Resources",
              title: item.title,
              fileType: item.file_type || "PDF",
              fileUrl: item.file_url,
              sizeLabel: item.size_label || "Downloadable",
              uploadDate: new Date(item.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            };
          });
          setMaterials(mapped);
          setLoading(false);
          return;
        }
      } catch {
        // Fallback
      }

      if (active) {
        setMaterials([]);
        setLoading(false);
      }
    }

    void loadMaterials();
    return () => {
      active = false;
    };
  }, []);

  const filteredMaterials = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return materials.filter((item) => {
      const matchesCourse =
        selectedCourseSlug === "All" || item.courseSlug === selectedCourseSlug;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.moduleTitle.toLowerCase().includes(q) ||
        item.fileType.toLowerCase().includes(q);
      return matchesCourse && matchesSearch;
    });
  }, [materials, selectedCourseSlug, searchQuery]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
            Official Course Materials
          </span>
          <span className="text-xs text-[#64748b]">Trainer-Provided Resources</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] mt-1">
          Study Materials
        </h1>
        <p className="text-xs sm:text-sm text-[#263746] mt-1 max-w-2xl">
          Access verified lecture slides, blueprint PDFs, and code repositories uploaded by your ANZEYL instructors.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources by title, module, or topic..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#d6dde0] rounded-xl text-[#263746] placeholder-[#8fa0ab] focus:outline-none focus:border-[#176b87] shadow-2xs transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748b] font-semibold whitespace-nowrap">Course:</span>
          <select
            value={selectedCourseSlug}
            onChange={(e) => setSelectedCourseSlug(e.target.value)}
            className="py-2 px-3 text-xs bg-white border border-[#d6dde0] rounded-xl text-[#263746] font-semibold focus:outline-none focus:border-[#176b87] shadow-2xs"
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

      {/* Materials List or Clean Empty State */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#e5e7eb] text-xs text-[#64748b] shadow-2xs animate-pulse">
          Loading authorized course materials...
        </div>
      ) : filteredMaterials.length === 0 ? (
        <div className="p-14 text-center bg-white border border-dashed border-[#d6dde0] rounded-3xl space-y-3 shadow-2xs">
          <BookOpenIcon className="w-12 h-12 text-[#64748b] mx-auto" />
          <h2 className="text-base font-bold text-[#17191D]">
            No study materials uploaded yet for this course.
          </h2>
          <p className="text-xs text-[#64748b] max-w-md mx-auto leading-relaxed">
            Your instructor will upload verified lecture slides, blueprint PDFs, and code repositories here as your cohort progresses through the curriculum.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMaterials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-3xl border border-[#e5e7eb] bg-white space-y-4 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
                    {item.courseTitle}
                  </span>
                  <span className="text-[11px] text-[#64748b] font-mono">
                    {item.fileType} • {item.sizeLabel}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#17191D] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#64748b]">
                  Module: <span className="text-[#263746] font-semibold">{item.moduleTitle}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-[#e5e7eb] flex items-center justify-between text-xs">
                <span className="text-[#64748b] text-[11px]">Uploaded {item.uploadDate}</span>

                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold flex items-center gap-1.5 transition-all text-xs shadow-xs"
                >
                  <DownloadIcon className="w-3.5 h-3.5" />
                  <span>Download Resource</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
