"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import {
  ANZEYL_COURSES,
  type AnzeylCourse,
  formatPrice,
  getPriceLabel,
} from "@/lib/courseData";

export default function AdminCoursesCmsPage() {
  const [coursesList, setCoursesList] = useState<AnzeylCourse[]>(ANZEYL_COURSES);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>("full-stack-development");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Form states for editing selected course
  const activeCourse = coursesList.find((c) => c.slug === selectedCourseSlug) || coursesList[0];

  const [editTitle, setEditTitle] = useState(activeCourse.title);
  const [editDesc, setEditDesc] = useState(activeCourse.shortDescription);
  const [editDurationMonths, setEditDurationMonths] = useState(activeCourse.durationMonths);
  const [editModes, setEditModes] = useState<("Online" | "Offline")[]>(activeCourse.modes);
  const [editPriceInRupees, setEditPriceInRupees] = useState<string>(
    activeCourse.priceInCents !== null ? (activeCourse.priceInCents / 100).toString() : ""
  );
  const [editOriginalPriceInRupees, setEditOriginalPriceInRupees] = useState<string>(
    activeCourse.originalPriceInCents !== null ? (activeCourse.originalPriceInCents / 100).toString() : ""
  );

  const handleOpenEdit = (course: AnzeylCourse) => {
    setSelectedCourseSlug(course.slug);
    setEditTitle(course.title);
    setEditDesc(course.shortDescription);
    setEditDurationMonths(course.durationMonths);
    setEditModes(course.modes);
    setEditPriceInRupees(course.priceInCents !== null ? (course.priceInCents / 100).toString() : "");
    setEditOriginalPriceInRupees(
      course.originalPriceInCents !== null ? (course.originalPriceInCents / 100).toString() : ""
    );
    setShowEditModal(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();

    const priceCents = editPriceInRupees.trim() ? Math.round(Number(editPriceInRupees) * 100) : null;
    const origPriceCents = editOriginalPriceInRupees.trim()
      ? Math.round(Number(editOriginalPriceInRupees) * 100)
      : null;

    const updated = coursesList.map((c) => {
      if (c.slug === selectedCourseSlug) {
        return {
          ...c,
          title: editTitle.trim(),
          shortDescription: editDesc.trim(),
          durationMonths: editDurationMonths,
          durationLabel: `${editDurationMonths} Months`,
          modes: editModes,
          priceInCents: priceCents,
          originalPriceInCents: origPriceCents,
        };
      }
      return c;
    });

    setCoursesList(updated);
    setShowEditModal(false);
    setSaveNotice(`Course "${editTitle}" updated successfully.`);
    setTimeout(() => setSaveNotice(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
              Academic Catalogue Management
            </span>
            <span className="text-xs text-slate-400">9 Core ANZEYL Programmes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Course Catalogue & Pricing CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Configure course descriptions, training modes (Online/Offline), 3-month schedules, and individual course fees.
          </p>
        </div>

        <Link
          href="/courses"
          target="_blank"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
        >
          <span>View Public Catalogue</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {saveNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesList.map((course) => {
          const priceDisplay = getPriceLabel(course);
          const hasDiscount =
            course.originalPriceInCents !== null &&
            course.priceInCents !== null &&
            course.originalPriceInCents > course.priceInCents;

          return (
            <div
              key={course.id}
              className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {course.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold capitalize">
                    {course.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {course.shortDescription}
                </p>

                {/* Duration & Modes */}
                <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
                  <span className="flex items-center gap-1 text-slate-300 font-semibold">
                    <ClockIcon className="w-3.5 h-3.5 text-cyan-400" />
                    {course.durationLabel}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300">
                    {course.modes.join(" + ")}
                  </span>
                </div>

                {/* Pricing Display */}
                <div className="p-3 rounded-2xl bg-[#070911] border border-white/5 text-xs space-y-1">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    Configured Fee:
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-sm">{priceDisplay}</span>
                    {hasDiscount && course.originalPriceInCents && (
                      <span className="text-xs text-slate-500 line-through">
                        {formatPrice(course.originalPriceInCents)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <Link
                  href={`/courses/${course.slug}`}
                  target="_blank"
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  View Details Page →
                </Link>

                <button
                  onClick={() => handleOpenEdit(course)}
                  className="btn-colorful-primary px-4 py-2 rounded-xl text-white font-bold transition-all shadow-md"
                >
                  Edit Course & Fee
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Course Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-xl w-full p-8 rounded-3xl border border-cyan-500/40 bg-[#0f1424] space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Edit Course & Pricing</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Course Name</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white font-semibold focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Short Description</label>
                <textarea
                  rows={3}
                  required
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Duration (Months)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={editDurationMonths}
                    onChange={(e) => setEditDurationMonths(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Training Modes</label>
                  <div className="flex items-center gap-4 h-10 text-slate-200">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editModes.includes("Online")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditModes([...editModes, "Online"]);
                          } else {
                            setEditModes(editModes.filter((m) => m !== "Online"));
                          }
                        }}
                        className="w-4 h-4 rounded text-cyan-500"
                      />
                      <span>Online</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editModes.includes("Offline")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditModes([...editModes, "Offline"]);
                          } else {
                            setEditModes(editModes.filter((m) => m !== "Offline"));
                          }
                        }}
                        className="w-4 h-4 rounded text-cyan-500"
                      />
                      <span>Offline</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Pricing Fields */}
              <div className="p-4 rounded-2xl bg-[#070911] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">Custom Pricing Configuration</span>
                  <span className="text-[10px] text-slate-400">Leave blank for &quot;Contact ANZEYL for Course Fees&quot;</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Course Fee (₹ INR)</label>
                    <input
                      type="number"
                      placeholder="e.g. 29999 (or leave blank)"
                      value={editPriceInRupees}
                      onChange={(e) => setEditPriceInRupees(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0f1424] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Original / Strikethrough Fee (Optional)</label>
                    <input
                      type="number"
                      placeholder="e.g. 39999 (for discount)"
                      value={editOriginalPriceInRupees}
                      onChange={(e) => setEditOriginalPriceInRupees(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0f1424] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl btn-colorful-primary text-white font-bold"
                >
                  Save Course Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
