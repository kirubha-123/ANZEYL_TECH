import React, { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { dashboardForRole } from "@/lib/auth/roles";
import {
  StudentDashboardClient,
  type EnrolledCourseData,
  type AvailableCourseData,
  type ActivityItem,
} from "@/components/dashboard/StudentDashboardClient";

export const instant = false;

function DashboardSkeleton() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-pulse">
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 h-40" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-[#e5e7eb] h-28" />
        ))}
      </div>
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 h-64" />
    </div>
  );
}

async function DashboardContent() {
  await connection();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/student/login?next=/dashboard");
  }

  // 1. Fetch authenticated student profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role, primary_goal, phone, created_at")
    .eq("id", user.id)
    .maybeSingle();

  // If user is not student, route to their role dashboard
  if (profile?.role && profile.role !== "student") {
    redirect(dashboardForRole(profile.role));
  }

  // 2. Fetch published courses
  const { data: rawCourses } = await supabase
    .from("courses")
    .select("id, slug, title, description, instructor_name, category, difficulty, thumbnail_url, price_in_cents")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const courses = rawCourses ?? [];

  // 3. Fetch user enrollments
  const { data: rawEnrollments } = await supabase
    .from("course_enrollments")
    .select("id, course_id, enrolled_at, completed_at")
    .eq("user_id", user.id);

  const enrollments = rawEnrollments ?? [];
  const enrolledIds = new Set(enrollments.map((e) => e.course_id));

  // 4. Fetch lessons for published courses
  const courseIds = courses.map((c) => c.id);
  const { data: rawLessons } = courseIds.length
    ? await supabase
        .from("course_lessons")
        .select("id, course_id, title, position, duration_minutes, module_id")
        .in("course_id", courseIds)
        .order("position", { ascending: true })
    : { data: [] };

  const lessons = rawLessons ?? [];

  // Group lessons by course
  const lessonsByCourse = new Map<string, typeof lessons>();
  const lessonMap = new Map<string, (typeof lessons)[0]>();
  for (const lesson of lessons) {
    lessonMap.set(lesson.id, lesson);
    const existing = lessonsByCourse.get(lesson.course_id) ?? [];
    existing.push(lesson);
    lessonsByCourse.set(lesson.course_id, existing);
  }

  // 5. Fetch user's lesson progress
  const { data: rawProgress } = await supabase
    .from("lesson_progress")
    .select("id, lesson_id, completed, watched_seconds, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const progressRows = rawProgress ?? [];
  const completedLessonIds = new Set(
    progressRows.filter((p) => p.completed).map((p) => p.lesson_id)
  );

  // 6. Build Enrolled Courses Data
  const enrolledCourses: EnrolledCourseData[] = [];
  const availableCourses: AvailableCourseData[] = [];

  for (const course of courses) {
    const courseLessons = lessonsByCourse.get(course.id) ?? [];
    const totalLessons = courseLessons.length;

    if (enrolledIds.has(course.id)) {
      const completedCount = courseLessons.filter((l) =>
        completedLessonIds.has(l.id)
      ).length;
      const progressPercent =
        totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
      const enrollment = enrollments.find((e) => e.course_id === course.id);
      const isCompleted =
        (totalLessons > 0 && completedCount === totalLessons) ||
        Boolean(enrollment?.completed_at);

      // Find first incomplete lesson to continue from
      const nextLesson = courseLessons.find((l) => !completedLessonIds.has(l.id));

      enrolledCourses.push({
        id: course.id,
        slug: course.slug,
        title: course.title,
        description: course.description ?? "",
        instructorName: course.instructor_name ?? "ANZEYL Faculty",
        category: course.category ?? "General",
        difficulty: course.difficulty ?? "intermediate",
        totalLessons,
        completedLessons: completedCount,
        progressPercent,
        isCompleted,
        nextLessonTitle: nextLesson?.title ?? (totalLessons > 0 ? "Course Finished" : null),
        nextLessonMinutes: nextLesson?.duration_minutes ?? null,
      });
    } else {
      availableCourses.push({
        id: course.id,
        slug: course.slug,
        title: course.title,
        description: course.description ?? "",
        instructorName: course.instructor_name ?? "ANZEYL Faculty",
        category: course.category ?? "General",
        difficulty: course.difficulty ?? "intermediate",
        totalLessons,
        priceInCents: course.price_in_cents,
      });
    }
  }

  // 7. Format recent learning activity
  const courseMap = new Map<string, (typeof courses)[0]>();
  for (const c of courses) {
    courseMap.set(c.id, c);
  }

  const activity: ActivityItem[] = [];
  for (const prog of progressRows.slice(0, 10)) {
    const lesson = lessonMap.get(prog.lesson_id);
    if (!lesson) continue;
    const course = courseMap.get(lesson.course_id);

    // Format date in DD/MM/YYYY (Indian format)
    const dateObj = new Date(prog.updated_at);
    const formattedDate = dateObj.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });

    activity.push({
      id: prog.id,
      lessonTitle: lesson.title,
      courseTitle: course?.title ?? "Course Lesson",
      completed: prog.completed,
      updatedAt: formattedDate,
    });
  }

  const studentProfile = {
    id: user.id,
    fullName:
      profile?.full_name?.trim() ||
      user.user_metadata?.full_name ||
      "ANZEYL Learner",
    email: user.email || "",
    role: profile?.role || "student",
    primaryGoal:
      profile?.primary_goal ||
      user.user_metadata?.primary_goal ||
      "Frontend & Full-Stack Web Development",
    phone: profile?.phone ?? null,
  };

  return (
    <StudentDashboardClient
      studentProfile={studentProfile}
      initialEnrolled={enrolledCourses}
      initialAvailable={availableCourses}
      activity={activity}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
