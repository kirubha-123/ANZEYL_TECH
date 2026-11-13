"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  AwardIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import { type AnzeylCourse } from "@/lib/courseData";

interface EnrollClientProps {
  course: AnzeylCourse;
}

export default function EnrollClient({ course }: EnrollClientProps) {
  const [fullName, setFullName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("anzeyl_user_name") || "";
    }
    return "";
  });

  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("anzeyl_user_email") || "";
    }
    return "";
  });

  const [phone, setPhone] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("anzeyl_user_phone") || "";
    }
    return "";
  });

  const [trainingMode, setTrainingMode] = useState<"Online" | "Offline">("Online");
  const [preferredBatch, setPreferredBatch] = useState("Weekday Morning (9:00 AM - 11:30 AM)");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isEnrolled, setIsEnrolled] = useState(() => {
    if (typeof window !== "undefined") {
      const savedEnrolled = localStorage.getItem("anzeyl_student_enrolled_courses");
      if (savedEnrolled) {
        try {
          const list = JSON.parse(savedEnrolled);
          if (Array.isArray(list) && (list.includes(course.id) || list.includes(course.slug))) {
            return true;
          }
        } catch {
          // Ignore
        }
      }
    }
    return false;
  });

  function handleConfirmEnrollment(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      alert("Please provide your name and email to enroll.");
      return;
    }
    if (!agreeTerms) {
      alert("Please accept the terms of admission.");
      return;
    }

    setIsSubmitting(true);

    if (typeof window !== "undefined") {
      // Save student details
      localStorage.setItem("anzeyl_user_name", fullName.trim());
      localStorage.setItem("anzeyl_user_email", email.trim());
      if (phone.trim()) localStorage.setItem("anzeyl_user_phone", phone.trim());

      // Save course enrollment
      const saved = localStorage.getItem("anzeyl_student_enrolled_courses");
      let enrolledList: string[] = [];
      if (saved) {
        try {
          enrolledList = JSON.parse(saved);
        } catch {
          enrolledList = [];
        }
      }
      if (!enrolledList.includes(course.slug)) {
        enrolledList.push(course.slug);
      }
      if (!enrolledList.includes(course.id)) {
        enrolledList.push(course.id);
      }
      localStorage.setItem("anzeyl_student_enrolled_courses", JSON.stringify(enrolledList));

      // Ensure demo student session cookie is set
      document.cookie = "anzeyl_demo_role=student; path=/; max-age=86400; SameSite=Lax";
      document.cookie = `anzeyl_user_name=${encodeURIComponent(fullName.trim())}; path=/; max-age=86400; SameSite=Lax`;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsEnrolled(true);
    }, 600);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#64748b]">
        <Link href="/dashboard" className="hover:text-[#176b87] transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/portal/courses" className="hover:text-[#176b87] transition-colors">
          Courses
        </Link>
        <span>/</span>
        <span className="text-[#263746]">Enroll in {course.title}</span>
      </nav>

      {/* Success State */}
      {isEnrolled ? (
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 sm:p-12 shadow-sm text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-4xl shadow-inner">
            🎓
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
              Admission Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263746]">
              Congratulations! You are enrolled in {course.title}
            </h1>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Your student workspace has been provisioned. You have full access to all curriculum modules,
              hands-on projects, study cards, and live mentor reviews.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] max-w-md mx-auto text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#64748b]">Enrolled Student:</span>
              <span className="font-bold text-[#263746]">{fullName || "Student Learner"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Mode & Batch:</span>
              <span className="font-bold text-[#263746]">{trainingMode} • {preferredBatch.split(" (")[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Course Duration:</span>
              <span className="font-bold text-[#263746]">{course.durationLabel}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/portal/classroom/${course.slug}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Launch Course Classroom</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#f7f5ef] hover:bg-[#eef6f3] text-[#263746] font-bold text-xs transition-colors border border-[#e5e7eb] text-center"
            >
              Go to My Dashboard
            </Link>
          </div>
        </div>
      ) : (
        /* Enrollment Form Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Course Overview & Inclusions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#dcefea] text-[#176b87] border border-[#b9d8d1]">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f7f5ef] text-[#263746] border border-[#e5e7eb] capitalize">
                  {course.difficulty} Level
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {course.durationLabel}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263746] tracking-tight">
                {course.title}
              </h1>

              <p className="course-subcontent text-sm leading-relaxed text-[#4b5f71]">
                {course.shortDescription}
              </p>

              {/* Course Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] text-center">
                  <BookOpenIcon className="w-5 h-5 text-[#176b87] mx-auto mb-1" />
                  <span className="block text-xs font-bold text-[#263746]">
                    {course.modules.length} Modules
                  </span>
                  <span className="text-[10px] text-[#64748b]">24+ lessons</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] text-center">
                  <ClockIcon className="w-5 h-5 text-[#C9A64B] mx-auto mb-1" />
                  <span className="block text-xs font-bold text-[#263746]">
                    {course.durationLabel}
                  </span>
                  <span className="text-[10px] text-[#64748b]">Online & Offline</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] text-center">
                  <AwardIcon className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-[#263746]">
                    Certified
                  </span>
                  <span className="text-[10px] text-[#64748b]">ANZEYL Credential</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2 pt-2 border-t border-[#e5e7eb]">
                <h3 className="text-xs font-bold text-[#263746] uppercase tracking-wider">
                  Technologies Covered
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {course.technologies.slice(0, 10).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#e5e7eb] text-[11px] font-semibold text-[#263746]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Inclusions Card */}
            <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#263746] flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-[#176b87]" />
                <span>What Is Included In This Program</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-[#263746]">
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full access to curriculum modules, lecture recordings & downloadable materials</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>1-on-1 scheduled mentor doubt clearing and code feedback</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Practical assignments, real capstone projects and mock tests</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Official ANZEYL Industry Certificate of Completion with verification ID</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Admission & Confirmation Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 shadow-xs space-y-6 sticky top-24">
              <div className="border-b border-[#e5e7eb] pb-4">
                <span className="badge-vibrant-rainbow inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Admission Form
                </span>
                <h2 className="mt-2 text-xl font-extrabold text-[#263746]">
                  Complete Course Enrollment
                </h2>
                <p className="text-xs text-[#64748b] mt-1">
                  Fill in your details to reserve your seat in the upcoming cohort.
                </p>
              </div>

              <form onSubmit={handleConfirmEnrollment} className="space-y-4 text-xs">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#263746] block">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Arun Kumar"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] focus:outline-none focus:border-[#176b87] focus:ring-1 focus:ring-[#176b87]"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#263746] block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="arun@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] focus:outline-none focus:border-[#176b87] focus:ring-1 focus:ring-[#176b87]"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#263746] block">Phone Number (WhatsApp Updates)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] focus:outline-none focus:border-[#176b87] focus:ring-1 focus:ring-[#176b87]"
                  />
                </div>

                {/* Training Mode Selection */}
                <div className="space-y-1.5 pt-1">
                  <label className="font-bold text-[#263746] block">Preferred Training Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTrainingMode("Online")}
                      className={`p-2.5 rounded-xl border text-center transition-all ${trainingMode === "Online"
                          ? "border-[#176b87] bg-[#dcefea]/40 text-[#176b87] font-bold shadow-xs"
                          : "border-[#e5e7eb] bg-[#f7f5ef] text-[#263746] hover:bg-[#eef6f3]"
                        }`}
                    >
                      <span className="block text-sm mb-0.5">🌐</span>
                      <span>Online Live</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrainingMode("Offline")}
                      className={`p-2.5 rounded-xl border text-center transition-all ${trainingMode === "Offline"
                          ? "border-[#176b87] bg-[#dcefea]/40 text-[#176b87] font-bold shadow-xs"
                          : "border-[#e5e7eb] bg-[#f7f5ef] text-[#263746] hover:bg-[#eef6f3]"
                        }`}
                    >
                      <span className="block text-sm mb-0.5">🏛️</span>
                      <span>Classroom Campus</span>
                    </button>
                  </div>
                </div>

                {/* Batch Timing */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#263746] block">Cohort Timing</label>
                  <select
                    value={preferredBatch}
                    onChange={(e) => setPreferredBatch(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] focus:outline-none focus:border-[#176b87]"
                  >
                    <option>Weekday Morning (9:00 AM - 11:30 AM)</option>
                    <option>Weekday Evening (6:30 PM - 9:00 PM)</option>
                    <option>Weekend Fast-Track (10:00 AM - 3:00 PM)</option>
                  </select>
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-2 pt-2 text-[11px] text-[#64748b]">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 accent-[#176b87]"
                  />
                  <span>
                    I confirm my enrollment in {course.title} and agree to ANZEYL program terms.
                  </span>
                </label>

                {/* Total / Pricing Summary */}
                <div className="p-3 rounded-2xl bg-[#eef6f3] border border-[#b9d8d1] flex items-center justify-between">
                  <span className="font-bold text-[#176b87]">Total Course Fee</span>
                  <span className="font-black text-sm text-[#176b87]">
                    Free Access (Sponsored)
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Processing Enrollment...</span>
                  ) : (
                    <>
                      <span>Confirm &amp; Complete Enrollment</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-2">
                <Link
                  href="/portal/courses"
                  className="text-[11px] font-semibold text-[#64748b] hover:text-[#176b87] transition-colors"
                >
                  ← Cancel and return to courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
