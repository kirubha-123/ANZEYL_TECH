"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  CheckCircleIcon,
  AwardIcon,
  ArrowRightIcon,
  PlayIcon,
  ZapIcon,
  TrophyIcon,
  GraduationCapIcon,
  UserIcon,
  ClockIcon,
  CodeIcon,
} from "@/components/Icons";
import { goalToCourseSlug } from "@/lib/courseData";

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
  /** null = "Contact ANZEYL for Course Fees" */
  priceInCents: number | null;
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
    isGuest?: boolean;
  };
  initialEnrolled: EnrolledCourseData[];
  initialAvailable: AvailableCourseData[];
  activity: ActivityItem[];
}

const DOMAIN_UNIQUE_DESCRIPTIONS: Record<string, string> = {
  "Full-Stack Web Development (React / Next.js)":
    "Master enterprise web systems with React 19, Next.js 16 Server Components, resilient microservices, and end-to-end cloud deployments.",
  "Full-Stack Software Engineering":
    "Master modern software architecture with frontend frameworks, scalable backend APIs, optimized databases, and cloud infrastructure.",
  "AI and Machine Learning":
    "Architect deep learning models, fine-tune modern LLMs, build RAG pipelines, and deploy production AI solutions.",
  "Backend and Cloud Engineering":
    "Build high-throughput distributed microservices, architect PostgreSQL & Redis clusters, and implement secure cloud-native infrastructure.",
  "Data Science and Analytics":
    "Transform complex raw telemetry into executive insights using Python, statistical modeling, machine learning algorithms, and interactive dashboards.",
  "Mobile App Development (Flutter / React Native)":
    "Engineer sleek cross-platform mobile apps with fluid native animations, offline-first caching, and production app store release workflows.",
  "Cybersecurity and Ethical Hacking":
    "Perform penetration testing, audit zero-trust system perimeters, mitigate network exploits, and harden enterprise software defenses.",
  "DevOps and Cloud Architecture":
    "Automate robust CI/CD deployment pipelines, manage infrastructure-as-code with Terraform, and orchestrate zero-downtime Kubernetes clusters.",
  "UI/UX Design and Product Strategy":
    "Craft user-centric design systems in Figma, conduct usability evaluations, and translate customer journeys into high-conversion prototypes.",
};

function getUniqueSubContent(goal: string): string {
  if (DOMAIN_UNIQUE_DESCRIPTIONS[goal]) {
    return DOMAIN_UNIQUE_DESCRIPTIONS[goal];
  }
  const matchedKey = Object.keys(DOMAIN_UNIQUE_DESCRIPTIONS).find((k) =>
    goal.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(goal.toLowerCase())
  );
  if (matchedKey) {
    return DOMAIN_UNIQUE_DESCRIPTIONS[matchedKey];
  }
  return "Accelerate your career journey with industry-aligned roadmaps, live mentoring, hands-on capstone projects, and certified assessments.";
}

const emptySubscribe = () => () => {};

function useClientName(serverFallback: string): string {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof window === "undefined") return serverFallback;
      const stored = localStorage.getItem("anzeyl_user_name");
      if (
        stored &&
        stored !== "Student" &&
        stored !== "Guest" &&
        stored !== "ANZEYL Student (Demo Workspace)"
      ) {
        return stored;
      }
      return serverFallback;
    },
    () => serverFallback
  );
}

function useClientGoal(serverFallback: string): string {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => {
      if (typeof window === "undefined") return serverFallback;
      const storedGoal = localStorage.getItem("anzeyl_user_goal");
      return storedGoal || serverFallback;
    },
    () => serverFallback
  );
}

const EMPTY_SLUGS: string[] = [];
let cachedUserKey: string | null = null;
let cachedRawValue: string | null = null;
let cachedParsedSlugs: string[] = EMPTY_SLUGS;

function getCachedUserEnrolledSlugs(
  userKey: string,
  defaultGoalSlug: string,
  isGuest: boolean
): string[] {
  if (typeof window === "undefined" || isGuest) return EMPTY_SLUGS;
  try {
    let raw = localStorage.getItem(userKey);
    // If this specific user has no enrollment recorded yet, initialize with ONLY their domain
    if (!raw && userKey !== "anzeyl_enrolled_guest") {
      const initial = JSON.stringify([defaultGoalSlug]);
      localStorage.setItem(userKey, initial);
      localStorage.setItem("anzeyl_student_enrolled_courses", initial);
      raw = initial;
    }

    if (raw === cachedRawValue && userKey === cachedUserKey) {
      return cachedParsedSlugs;
    }

    cachedUserKey = userKey;
    cachedRawValue = raw;

    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedParsedSlugs = parsed;
        return cachedParsedSlugs;
      }
    }
    cachedParsedSlugs = [defaultGoalSlug];
    return cachedParsedSlugs;
  } catch {
    return [defaultGoalSlug];
  }
}

export function StudentDashboardClient({
  studentProfile,
  initialEnrolled,
  initialAvailable,
  activity,
}: StudentDashboardProps) {
  const isGuest = Boolean(studentProfile.isGuest || studentProfile.role === "guest");

  const userEmail = studentProfile.email ? studentProfile.email.trim().toLowerCase() : "";
  const userKey = userEmail ? `anzeyl_enrolled_${userEmail}` : "anzeyl_enrolled_guest";
  const defaultGoalSlug = useMemo(
    () => goalToCourseSlug(studentProfile.primaryGoal),
    [studentProfile.primaryGoal]
  );

  const getSnapshot = React.useCallback(() => {
    return getCachedUserEnrolledSlugs(userKey, defaultGoalSlug, isGuest);
  }, [userKey, defaultGoalSlug, isGuest]);

  const enrolledSlugs = React.useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    () => EMPTY_SLUGS
  );

  // Combine initial courses to full catalog
  const allCourses = useMemo(() => {
    const list: AvailableCourseData[] = [...initialAvailable];
    for (const c of initialEnrolled) {
      if (!list.some((item) => item.slug === c.slug || item.id === c.id)) {
        list.push({
          id: c.id,
          slug: c.slug,
          title: c.title,
          description: c.description,
          instructorName: c.instructorName,
          category: c.category,
          difficulty: c.difficulty,
          totalLessons: c.totalLessons,
          priceInCents: 0,
        });
      }
    }
    return list;
  }, [initialAvailable, initialEnrolled]);

  const enrolled = useMemo<EnrolledCourseData[]>(() => {
    if (isGuest) return [];

    const targetSlugs = new Set<string>();
    if (enrolledSlugs.length > 0) {
      enrolledSlugs.forEach((s) => targetSlugs.add(s));
    } else if (initialEnrolled.length > 0) {
      initialEnrolled.forEach((c) => {
        targetSlugs.add(c.slug);
        targetSlugs.add(c.id);
      });
    } else {
      targetSlugs.add(defaultGoalSlug);
    }

    const result: EnrolledCourseData[] = [];
    for (const c of allCourses) {
      if (targetSlugs.has(c.slug) || targetSlugs.has(c.id)) {
        const existing = initialEnrolled.find((e) => e.slug === c.slug || e.id === c.id);
        result.push(
          existing || {
            id: c.id,
            slug: c.slug,
            title: c.title,
            description: c.description,
            instructorName: c.instructorName,
            category: c.category,
            difficulty: c.difficulty,
            totalLessons: c.totalLessons,
            completedLessons: 0,
            progressPercent: 0,
            isCompleted: false,
            nextLessonTitle: "Module 1: Orientation & Foundations",
            nextLessonMinutes: 45,
          }
        );
      }
    }
    return result;
  }, [isGuest, enrolledSlugs, initialEnrolled, allCourses, defaultGoalSlug]);

  const available = useMemo<AvailableCourseData[]>(() => {
    if (isGuest) return allCourses;
    const enrolledSet = new Set(enrolled.map((c) => c.slug));
    enrolled.forEach((c) => enrolledSet.add(c.id));
    return allCourses.filter((c) => !enrolledSet.has(c.slug) && !enrolledSet.has(c.id));
  }, [isGuest, allCourses, enrolled]);

  const [activeCourseTab, setActiveCourseTab] = useState<"enrolled" | "available">(
    isGuest ? "available" : "enrolled"
  );

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

  const displayName = useClientName(studentProfile.fullName || "Student");
  const displayGoal = useClientGoal(studentProfile.primaryGoal || "Full-Stack Software Engineering");

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Personalized Welcome Card */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${isGuest
                    ? "bg-amber-500/10 text-amber-800 border-amber-500/30"
                    : "bg-[#dcefea] text-[#176b87] border-[#b9d8d1]"
                  }`}
              >
                {isGuest ? "Guest Preview Mode" : "Active Student Account"}
              </span>
              <span className="text-xs text-[#64748b]">Asia/Kolkata (IST)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263746] tracking-tight">
              {isGuest ? (
                <>
                  Welcome to <span className="text-[#176b87]">ANZEYL Solutions</span>
                </>
              ) : (
                <>
                  Welcome back, <span className="text-[#176b87]">{displayName}!</span>
                </>
              )}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-2xl leading-relaxed">
              {isGuest ? (
                "Empowering future tech leaders with industry-aligned training, practical capstones, and expert mentorship. Explore our career programs, practice questions, and study resources below."
              ) : (
                <span>
                  <strong className="text-[#263746] font-semibold">Target Goal:</strong>{" "}
                  <span className="text-[#176b87] font-semibold">{displayGoal}</span>
                  <span className="mx-2 text-[#cbd5e1]">•</span>
                  <span className="course-subcontent">{getUniqueSubContent(displayGoal)}</span>
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isGuest ? (
              <>
                <Link
                  href="/student/login?next=/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white text-xs font-bold transition-all shadow-sm"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Log In to Account</span>
                </Link>
                <Link
                  href="/student/register"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f7f5ef] hover:bg-[#eef6f3] text-[#263746] text-xs font-bold transition-all border border-[#e5e7eb]"
                >
                  <span>Create Free Account</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/portal/practice"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white text-xs font-bold transition-all shadow-sm"
                >
                  <CheckCircleIcon className="w-4 h-4 text-[#f2b880]" />
                  <span>Practice Questions</span>
                </Link>
                <Link
                  href="/portal/profile"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f7f5ef] hover:bg-[#eef6f3] text-[#263746] text-xs font-bold transition-all border border-[#e5e7eb]"
                >
                  <UserIcon className="w-4 h-4 text-[#176b87]" />
                  <span>Manage Profile</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. Structured Learning Journey Bar: Discover -> Learn -> Practice -> Build -> Prepare */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5e7eb]">
          <span className="text-xs font-bold text-[#176b87] uppercase tracking-wider">
            Your ANZEYL SOLUTIONS Learning Journey
          </span>
          <span className="text-[11px] text-[#64748b]">Structured Industry Pathway</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
          <Link
            href="/courses"
            className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] transition-all text-center group"
          >
            <span className="block font-bold text-[#263746] group-hover:text-[#176b87]">
              1. Discover
            </span>
            <span className="text-[10px] text-[#64748b]">Course Catalogue</span>
          </Link>

          <Link
            href="/portal/courses"
            className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] transition-all text-center group"
          >
            <span className="block font-bold text-[#263746] group-hover:text-[#176b87]">
              2. Learn
            </span>
            <span className="text-[10px] text-[#64748b]">Courses & Materials</span>
          </Link>

          <Link
            href="/portal/practice"
            className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] transition-all text-center group"
          >
            <span className="block font-bold text-[#263746] group-hover:text-[#176b87]">
              3. Practice
            </span>
            <span className="text-[10px] text-[#64748b]">Questions & Cards</span>
          </Link>

          <Link
            href="/portal/projects"
            className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] transition-all text-center group"
          >
            <span className="block font-bold text-[#263746] group-hover:text-[#176b87]">
              4. Build
            </span>
            <span className="text-[10px] text-[#64748b]">Real Capstones</span>
          </Link>

          <Link
            href="/portal/exams"
            className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] transition-all text-center group col-span-2 sm:col-span-1"
          >
            <span className="block font-bold text-[#263746] group-hover:text-[#176b87]">
              5. Prepare
            </span>
            <span className="text-[10px] text-[#64748b]">Exams & Credentials</span>
          </Link>
        </div>
      </div>

      {/* 3. Real Statistics Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Enrolled Courses */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748b]">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isGuest ? "Available Tracks" : "Enrolled Courses"}
            </span>
            <div className="p-2 rounded-xl bg-[#dcefea] text-[#176b87]">
              <BookOpenIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#263746]">
            {isGuest ? `${available.length} Tracks` : `${enrolledCount} Active`}
          </div>
          <p className="text-xs text-[#64748b]">
            {isGuest ? "Explore curriculum below" : `${inProgressCount} in progress • ${completedCount} completed`}
          </p>
        </div>

        {/* Lessons Completed */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748b]">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isGuest ? "Course Lessons" : "Lessons Completed"}
            </span>
            <div className="p-2 rounded-xl bg-[#eef6f3] text-[#4c9a89]">
              <CheckCircleIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#263746]">
            {isGuest ? (
              "44+ Lessons"
            ) : (
              <>
                {completedLessonsAcrossEnrolled}{" "}
                <span className="text-sm font-semibold text-[#64748b]">/ {totalLessonsAcrossEnrolled}</span>
              </>
            )}
          </div>
          <p className="text-xs text-[#64748b]">
            {isGuest ? "Across 9 career programmes" : "Verified in course curriculum"}
          </p>
        </div>

        {/* Overall Learning Progress */}
        <div className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#64748b]">
            <span className="text-xs font-bold uppercase tracking-wider">Overall Progress</span>
            <div className="p-2 rounded-xl bg-[#dcefea] text-[#176b87]">
              <ZapIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#176b87]">
            {isGuest ? "0%" : `${overallProgressPercent}%`}
          </div>
          <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#176b87] h-full transition-all duration-300"
              style={{ width: `${isGuest ? 0 : overallProgressPercent}%` }}
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
            {isGuest ? (
              "Accredited"
            ) : (
              <>
                {completedCount}{" "}
                <span className="text-sm font-semibold text-[#64748b]">
                  {completedCount === 1 ? "Credential" : "Credentials"}
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-[#64748b]">
            {isGuest ? "Sign in to earn certificates" : "100% completion requirement"}
          </p>
        </div>
      </div>

      {/* 4. Continue Learning / Guest Call-to-action Section */}
      {isGuest ? (
        <div className="bg-gradient-to-r from-white via-white to-[#dcefea]/40 rounded-3xl border border-[#e5e7eb] p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#176b87]">
              Start Your Journey
            </span>
            <h2 className="text-lg font-bold text-[#263746]">
              Sign in to save your coursework and track real-time progress
            </h2>
            <p className="text-xs text-[#64748b] max-w-xl">
              Select any of the 9 courses below. Log in to access video lessons, downloadable study materials, practice questions, and capstone reviews.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/student/login?next=/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white text-xs font-bold shadow-xs transition-all"
            >
              <UserIcon className="w-4 h-4" />
              <span>Log In</span>
            </Link>
          </div>
        </div>
      ) : continueCourse ? (
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

      {/* 5. Course Management: Enrolled vs Available */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setActiveCourseTab("enrolled")}
              className={`text-sm font-bold pb-2 transition-all border-b-2 -mb-[13px] ${activeCourseTab === "enrolled"
                  ? "border-[#176b87] text-[#176b87]"
                  : "border-transparent text-[#64748b] hover:text-[#263746]"
                }`}
            >
              Enrolled Courses ({enrolledCount})
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setActiveCourseTab("available")}
              className={`text-sm font-bold pb-2 transition-all border-b-2 -mb-[13px] ${activeCourseTab === "available"
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
                        className={`font-semibold ${course.isCompleted ? "text-[#4c9a89]" : "text-[#176b87]"
                          }`}
                      >
                        {course.isCompleted ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#263746] leading-snug">{course.title}</h3>
                    <p className="course-subcontent line-clamp-2">{course.description}</p>
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
                    <p className="course-subcontent line-clamp-2">{course.description}</p>
                    <p className="text-xs text-[#64748b]">
                      Duration: <strong className="text-[#263746]">3 Months (Online + Offline)</strong>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#e5e7eb] flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-[#263746]">
                      {course.priceInCents === null ? (
                        <span className="italic font-normal text-[#64748b]">Contact for fees</span>
                      ) : course.priceInCents === 0 ? (
                        "Free Access"
                      ) : (
                        `₹${(course.priceInCents / 100).toLocaleString("en-IN")}`
                      )}
                    </span>
                    <Link
                      href={`/portal/enroll/${course.slug}`}
                      className="px-4 py-2 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Enroll Now</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 6. Upcoming Live Classes + Pending Assignments & Projects Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Classes Card */}
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-rose-500" />
              <h2 className="text-sm font-bold text-[#263746]">Scheduled Live Classes</h2>
            </div>
            <Link href="/portal/live" className="text-xs font-bold text-[#176b87] hover:underline">
              View Schedule
            </Link>
          </div>

          <div className="p-6 text-center text-xs text-[#64748b] bg-[#f7f5ef] rounded-2xl border border-[#e5e7eb] space-y-2">
            <ClockIcon className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-semibold text-[#263746]">
              No live classes scheduled yet. Check back for upcoming sessions.
            </p>
            <p className="text-[11px]">
              Live masterclasses with senior engineers are announced in your cohort calendar.
            </p>
          </div>
        </div>

        {/* Practical Projects & Assignments Card */}
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
            <div className="flex items-center gap-2">
              <CodeIcon className="w-4 h-4 text-[#176b87]" />
              <h2 className="text-sm font-bold text-[#263746]">Projects & Assignments</h2>
            </div>
            <Link href="/portal/projects" className="text-xs font-bold text-[#176b87] hover:underline">
              Submit Work
            </Link>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] flex items-center justify-between text-xs">
              <div>
                <strong className="block text-[#263746] font-semibold">Course Capstone Deliverable</strong>
                <span className="text-[#64748b] text-[11px]">Production architecture & GitHub submission</span>
              </div>
              <Link
                href="/portal/projects"
                className="px-3 py-1.5 rounded-lg bg-[#176b87] text-white text-[11px] font-bold hover:bg-[#12566c]"
              >
                View Brief
              </Link>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] flex items-center justify-between text-xs">
              <div>
                <strong className="block text-[#263746] font-semibold">Module Lab Assignments</strong>
                <span className="text-[#64748b] text-[11px]">Weekly practical coding exercises</span>
              </div>
              <Link
                href="/portal/assignments"
                className="px-3 py-1.5 rounded-lg border border-[#176b87] text-[#176b87] text-[11px] font-bold hover:bg-[#dcefea]"
              >
                Track Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Split Section: Learning Activity & Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Real Learning Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#e5e7eb] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
            <h2 className="text-sm font-bold text-[#263746]">Recent Learning Activity</h2>
            <span className="text-xs text-[#64748b]">Verified Lesson Records</span>
          </div>

          {activity.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#64748b] space-y-1">
              <p className="font-bold text-[#263746]">
                {isGuest ? "Sign in to track activity" : "No activity yet"}
              </p>
              <p>
                {isGuest
                  ? "Log in to record completed lessons, quiz achievements, and live study streaks."
                  : "Complete lessons in your enrolled courses to build your personal learning history."}
              </p>
              {isGuest && (
                <div className="pt-2">
                  <Link
                    href="/student/login?next=/dashboard"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#176b87] text-white text-xs font-bold hover:bg-[#12566c]"
                  >
                    <span>Log In</span>
                  </Link>
                </div>
              )}
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
          <div className="pt-2 border-t border-[#e5e7eb] grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <Link
              href="/portal/practice"
              className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] text-xs transition-colors flex items-center gap-2 font-medium text-[#263746]"
            >
              <CheckCircleIcon className="w-4 h-4 text-[#176b87]" />
              <span>Practice Questions</span>
            </Link>
            <Link
              href="/portal/notes"
              className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] text-xs transition-colors flex items-center gap-2 font-medium text-[#263746]"
            >
              <BookOpenIcon className="w-4 h-4 text-[#176b87]" />
              <span>My Notes</span>
            </Link>
            <Link
              href="/portal/materials"
              className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] text-xs transition-colors flex items-center gap-2 font-medium text-[#263746]"
            >
              <GraduationCapIcon className="w-4 h-4 text-[#176b87]" />
              <span>Study Materials</span>
            </Link>
            <Link
              href="/portal/study-cards"
              className="p-3 rounded-xl bg-[#f7f5ef] hover:bg-[#dcefea] border border-[#e5e7eb] text-xs transition-colors flex items-center gap-2 font-medium text-[#263746]"
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
              <h2 className="text-sm font-bold text-[#263746]">Assessments & Mock Tests</h2>
              <p className="text-xs text-[#64748b] mt-0.5">Test competency and verify credentials</p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#263746]">
                  <span>Full-Stack & Cloud Assessment</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#dcefea] text-[#176b87]">
                    Timed Mock
                  </span>
                </div>
                <p className="text-[11px] text-[#64748b]">
                  Evaluates Server Actions, architecture patterns, and cloud deployment principles.
                </p>
                <Link
                  href="/portal/quizzes/react-mastery"
                  className="inline-flex text-xs font-bold text-[#176b87] hover:underline items-center gap-1"
                >
                  <span>Start Mock Test</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#263746]">
                  <span>Proctored Certification Chamber</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                    Proctored
                  </span>
                </div>
                <p className="text-[11px] text-[#64748b]">
                  Supervised final certification examination for official credentials.
                </p>
                <Link
                  href="/portal/exams"
                  className="inline-flex text-xs font-bold text-[#176b87] hover:underline items-center gap-1"
                >
                  <span>View Certification Exams</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
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
