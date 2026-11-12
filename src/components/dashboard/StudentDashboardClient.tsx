"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  SparklesIcon,
  BookOpenIcon,
  CheckCircleIcon,
  AwardIcon,
  ArrowRightIcon,
  PlayIcon,
  ZapIcon,
  TrophyIcon,
  GraduationCapIcon,
  UserIcon,
} from "@/components/Icons";

export interface EnrolledCourseData {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructorName: string;
  category: string;
  difficulty: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  isCompleted: boolean;
  nextLessonTitle: string | null;
  nextLessonMinutes: number | null;
}

export interface AvailableCourseData {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructorName: string;
  category: string;
  difficulty: string;
  totalLessons: number;
  priceInCents: number;
}

export interface ActivityItem {
  id: string;
  lessonTitle: string;
  courseTitle: string;
  completed: boolean;
  updatedAt: string;
}

interface StudentDashboardProps {
  studentProfile: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    primaryGoal: string;
    phone: string | null;
  };
  initialEnrolled: EnrolledCourseData[];
  initialAvailable: AvailableCourseData[];
  activity: ActivityItem[];
}

export function StudentDashboardClient({
  studentProfile,
  initialEnrolled,
  initialAvailable,
  activity,
}: StudentDashboardProps) {
  const router = useRouter();
  const [enrolled, setEnrolled] = useState<EnrolledCourseData[]>(initialEnrolled);
  const [available, setAvailable] = useState<AvailableCourseData[]>(initialAvailable);
  const [activeCourseTab, setActiveCourseTab] = useState<"enrolled" | "available">("enrolled");
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [pendingCourseId, setPendingCourseId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Calculated Real Statistics
  const enrolledCount = enrolled.length;
  const inProgressCount = enrolled.filter((c) => !c.isCompleted).length;
  const completedCount = enrolled.filter((c) => c.isCompleted).length;

  const totalLessonsAcrossEnrolled = enrolled.reduce((acc, c) => acc + c.totalLessons, 0);
  const completedLessonsAcrossEnrolled = enrolled.reduce((acc, c) => acc + c.completedLessons, 0);
  const overallProgressPercent =
    totalLessonsAcrossEnrolled > 0
      ? Math.round((completedLessonsAcrossEnrolled / totalLessonsAcrossEnrolled) * 100)
      : 0;

  // Active continue course (first incomplete enrolled course)
  const continueCourse = enrolled.find((c) => !c.isCompleted) || enrolled[0];

  function handleEnroll(course: AvailableCourseData) {
    setEnrollError(null);
    setPendingCourseId(course.id);

    startTransition(async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setEnrollError("Your session has expired. Please sign in again.");
        setPendingCourseId(null);
        return;
      }

      const { error } = await supabase.from("course_enrollments").insert({
        user_id: user.id,
        course_id: course.id,
      });

      if (error && error.code !== "23505") {
        setEnrollError(error.message);
        setPendingCourseId(null);
        return;
      }

      // Move course from available to enrolled
      setAvailable((curr) => curr.filter((c) => c.id !== course.id));
      setEnrolled((curr) => [
        ...curr,
        {
          id: course.id,
          slug: course.slug,
          title: course.title,
          description: course.description,
          instructorName: course.instructorName,
          category: course.category,
          difficulty: course.difficulty,
          totalLessons: course.totalLessons,
          completedLessons: 0,
          progressPercent: 0,
          isCompleted: false,
          nextLessonTitle: "Lesson 1",
          nextLessonMinutes: null,
        },
      ]);
      setPendingCourseId(null);
      router.refresh();
    });
  }

  const firstName = studentProfile.fullName?.split(" ")[0] || "Learner";

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Personalized Welcome Card */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#dcefea] text-[#176b87] border border-[#b9d8d1]">
                Active Student Account
              </span>
              <span className="text-xs text-[#64748b]">Asia/Kolkata (IST)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263746] tracking-tight">
              Welcome back, <span className="text-[#176b87]">{firstName}!</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-2xl leading-relaxed">
              Target Goal:{" "}
              <strong className="text-[#263746]">
                {studentProfile.primaryGoal || "Full-Stack Software Engineering"}
              </strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/portal/ai-tutor"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white text-xs font-bold transition-all shadow-sm"
            >
              <SparklesIcon className="w-4 h-4 text-[#f2b880]" />
              <span>Ask AI Tutor</span>
            </Link>
            <Link
              href="/portal/profile"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f7f5ef] hover:bg-[#eef6f3] text-[#263746] text-xs font-bold transition-all border border-[#e5e7eb]"
            >
              <UserIcon className="w-4 h-4 text-[#176b87]" />
              <span>Manage Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Real Statistics Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Enrolled Courses */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748b]">
            <span className="text-xs font-bold uppercase tracking-wider">Enrolled Courses</span>
            <div className="p-2 rounded-xl bg-[#dcefea] text-[#176b87]">
              <BookOpenIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#263746]">{enrolledCount} Active</div>
          <p className="text-xs text-[#64748b]">
            {inProgressCount} in progress • {completedCount} completed
          </p>
        </div>

        {/* Lessons Completed */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748b]">
            <span className="text-xs font-bold uppercase tracking-wider">Lessons Completed</span>
            <div className="p-2 rounded-xl bg-[#eef6f3] text-[#4c9a89]">
              <CheckCircleIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#263746]">
            {completedLessonsAcrossEnrolled}{" "}
            <span className="text-sm font-semibold text-[#64748b]">/ {totalLessonsAcrossEnrolled}</span>
          </div>
          <p className="text-xs text-[#64748b]">Verified in course curriculum</p>
        </div>

        {/* Overall Learning Progress */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748b]">
            <span className="text-xs font-bold uppercase tracking-wider">Overall Progress</span>
            <div className="p-2 rounded-xl bg-[#dcefea] text-[#176b87]">
              <ZapIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#176b87]">{overallProgressPercent}%</div>
          <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#176b87] h-full transition-all duration-300"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Earned Certificates */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748b]">
            <span className="text-xs font-bold uppercase tracking-wider">Earned Certificates</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <AwardIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#263746]">
            {completedCount}{" "}
            <span className="text-sm font-semibold text-[#64748b]">
              {completedCount === 1 ? "Credential" : "Credentials"}
            </span>
          </div>
          <p className="text-xs text-[#64748b]">100% completion requirement</p>
        </div>
      </div>

      {/* 3. Continue Learning Section */}
      {continueCourse ? (
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e7eb] pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#176b87]">
                Resume Learning
              </span>
              <h2 className="text-lg font-bold text-[#263746] mt-0.5">{continueCourse.title}</h2>
              <p className="text-xs text-[#64748b]">
                Instructor: {continueCourse.instructorName || "ANZEYL Faculty"}
              </p>
            </div>
            <Link
              href={`/portal/classroom/${continueCourse.slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white text-xs font-bold shadow-xs transition-all shrink-0"
            >
              <PlayIcon className="w-4 h-4 fill-white" />
              <span>Open Classroom</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1 flex-1">
              <div className="flex justify-between font-semibold text-[#263746]">
                <span>
                  Next: {continueCourse.nextLessonTitle || "Course Curriculum"}
                </span>
                <span>
                  {continueCourse.completedLessons} of {continueCourse.totalLessons} lessons (
                  {continueCourse.progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-[#e5e7eb] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#176b87] h-full transition-all duration-300"
                  style={{ width: `${continueCourse.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-[#e5e7eb] p-8 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#dcefea] text-[#176b87] flex items-center justify-center">
            <BookOpenIcon className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-[#263746]">
            Your learning path is ready for its first course
          </h2>
          <p className="text-xs text-[#64748b] max-w-md mx-auto">
            Choose from the available courses below to enroll and start building your real-world engineering skills.
          </p>
          <button
            type="button"
            onClick={() => setActiveCourseTab("available")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176b87] text-white text-xs font-bold hover:bg-[#12566c] transition-colors"
          >
            <span>Browse Available Courses</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4. Course Management: Enrolled vs Available */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveCourseTab("enrolled")}
              className={`text-sm font-bold pb-2 transition-all border-b-2 -mb-[13px] ${
                activeCourseTab === "enrolled"
                  ? "border-[#176b87] text-[#176b87]"
                  : "border-transparent text-[#64748b] hover:text-[#263746]"
              }`}
            >
              Enrolled Courses ({enrolledCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveCourseTab("available")}
              className={`text-sm font-bold pb-2 transition-all border-b-2 -mb-[13px] ${
                activeCourseTab === "available"
                  ? "border-[#176b87] text-[#176b87]"
                  : "border-transparent text-[#64748b] hover:text-[#263746]"
              }`}
            >
              Available Courses ({available.length})
            </button>
          </div>
          <Link
            href="/portal/courses"
            className="text-xs font-bold text-[#176b87] hover:underline flex items-center gap-1"
          >
            <span>View Catalog</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        {enrollError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {enrollError}
          </div>
        )}

        {/* Enrolled Courses Tab */}
        {activeCourseTab === "enrolled" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolled.length === 0 ? (
              <div className="col-span-full bg-white p-8 rounded-2xl border border-[#e5e7eb] text-center text-xs text-[#64748b]">
                No enrolled courses yet. Switch to the <strong>Available Courses</strong> tab to enroll in your first course.
              </div>
            ) : (
              enrolled.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs hover:border-[#176b87]/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold px-2.5 py-0.5 rounded-full bg-[#dcefea] text-[#176b87]">
                        {course.category || "Engineering"}
                      </span>
                      <span
                        className={`font-semibold ${
                          course.isCompleted ? "text-[#4c9a89]" : "text-[#176b87]"
                        }`}
                      >
                        {course.isCompleted ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#263746] leading-snug">{course.title}</h3>
                    <p className="text-xs text-[#64748b] line-clamp-2">{course.description}</p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#e5e7eb]">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-[#64748b]">
                        <span>Progress</span>
                        <span className="font-semibold text-[#263746]">
                          {course.completedLessons} / {course.totalLessons} lessons (
                          {course.progressPercent}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#176b87] h-full"
                          style={{ width: `${course.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/portal/classroom/${course.slug}`}
                      className="w-full py-2 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] text-[#176b87] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#e5e7eb]"
                    >
                      <span>{course.isCompleted ? "Review Classroom" : "Continue Lesson"}</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Available Courses Tab */}
        {activeCourseTab === "available" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {available.length === 0 ? (
              <div className="col-span-full bg-white p-8 rounded-2xl border border-[#e5e7eb] text-center text-xs text-[#64748b]">
                You are enrolled in all currently published courses! Check back soon for new curriculum drops.
              </div>
            ) : (
              available.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs hover:border-[#176b87]/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold px-2.5 py-0.5 rounded-full bg-[#f7f5ef] text-[#263746] border border-[#e5e7eb]">
                        {course.category || "Course"}
                      </span>
                      <span className="text-[#64748b] capitalize">{course.difficulty || "All levels"}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#263746] leading-snug">{course.title}</h3>
                    <p className="text-xs text-[#64748b] line-clamp-2">{course.description}</p>
                    <p className="text-xs text-[#64748b]">
                      Instructor: <strong className="text-[#263746]">{course.instructorName || "ANZEYL"}</strong> •{" "}
                      {course.totalLessons} lessons
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#e5e7eb] flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-[#263746]">
                      {course.priceInCents === 0 ? "Free Access" : `₹${(course.priceInCents / 100).toLocaleString("en-IN")}`}
                    </span>
                    <button
                      type="button"
                      disabled={isPending && pendingCourseId === course.id}
                      onClick={() => handleEnroll(course)}
                      className="px-4 py-2 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs transition-colors disabled:opacity-50"
                    >
                      {isPending && pendingCourseId === course.id ? "Enrolling..." : "Enroll Now"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 5. Split Section: Learning Activity & Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Real Learning Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#e5e7eb] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
            <h2 className="text-sm font-bold text-[#263746]">Recent Learning Activity</h2>
            <span className="text-xs text-[#64748b]">Verified Lesson Records</span>
          </div>

          {activity.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#64748b] space-y-1">
              <p className="font-bold text-[#263746]">No activity yet</p>
              <p>Complete lessons in your enrolled courses to build your personal learning history.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activity.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-xs"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-4 h-4 text-[#4c9a89] shrink-0" />
                    <div>
                      <strong className="block text-[#263746] font-semibold">{item.lessonTitle}</strong>
                      <span className="text-[#64748b] text-[11px]">{item.courseTitle}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#64748b] shrink-0">{item.updatedAt}</span>
                </div>
              ))}
            </div>
          )}

          {/* Quick Shortcuts Bar */}
          <div className="pt-2 border-t border-[#e5e7eb] grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/portal/ai-tutor"
              className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] text-xs transition-colors flex items-center gap-2.5 font-medium text-[#263746]"
            >
              <SparklesIcon className="w-4 h-4 text-[#176b87]" />
              <span>Ask AI Tutor</span>
            </Link>
            <Link
              href="/portal/materials"
              className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] text-xs transition-colors flex items-center gap-2.5 font-medium text-[#263746]"
            >
              <GraduationCapIcon className="w-4 h-4 text-[#176b87]" />
              <span>Study Notes & PDFs</span>
            </Link>
            <Link
              href="/portal/study-cards"
              className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] text-xs transition-colors flex items-center gap-2.5 font-medium text-[#263746]"
            >
              <ZapIcon className="w-4 h-4 text-[#176b87]" />
              <span>Study Cards</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Upcoming Assessments & Quizzes */}
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#e5e7eb] pb-3">
              <h2 className="text-sm font-bold text-[#263746]">Assessments & Evaluations</h2>
              <p className="text-xs text-[#64748b] mt-0.5">Test competency and verify credentials</p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#263746]">
                  <span>React 19 & Next.js 16</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#dcefea] text-[#176b87]">
                    15 mins
                  </span>
                </div>
                <p className="text-[11px] text-[#64748b]">
                  Evaluates Server Actions, partial prerendering, and modern SSR patterns.
                </p>
                <Link
                  href="/portal/quizzes/react-mastery"
                  className="inline-flex text-xs font-bold text-[#176b87] hover:underline items-center gap-1"
                >
                  <span>Start Practice Quiz</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#263746]">
                  <span>PostgreSQL & Supabase RLS</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#dcefea] text-[#176b87]">
                    20 mins
                  </span>
                </div>
                <p className="text-[11px] text-[#64748b]">
                  Tests row-level policies, auth isolation, and database security.
                </p>
                <Link
                  href="/portal/quizzes"
                  className="inline-flex text-xs font-bold text-[#176b87] hover:underline items-center gap-1"
                >
                  <span>Browse All Assessments</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-1 text-xs">
              <strong className="text-[#263746] block font-bold">Recent Quiz Results:</strong>
              <span className="text-[#64748b]">No quiz attempts yet. Test your knowledge in Practice Quizzes.</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#e5e7eb]">
            <Link
              href="/portal/leaderboard"
              className="flex items-center justify-between p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] text-xs text-[#263746] font-bold transition-colors"
            >
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-4 h-4 text-[#176b87]" />
                <span>Cohort Standings & Leaderboard</span>
              </div>
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#64748b]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

