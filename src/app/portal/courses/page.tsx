import React from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import CoursesClient, { type CourseCardData } from "./CoursesClient";

export const instant = false;

export default async function MyCoursesPage() {
  await connection();
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) redirect("/login?next=/portal/courses");

  const [{ data: courses, error: coursesError }, { data: enrollments, error: enrollmentsError }] = await Promise.all([
    supabase
      .from("courses")
      .select("id, slug, title, description, instructor_name, category, difficulty, thumbnail_url, course_lessons(id)")
      .eq("published", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("course_enrollments")
      .select("course_id")
      .eq("user_id", userData.user.id),
  ]);

  if (coursesError || enrollmentsError) {
    return <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200">Unable to load your courses right now. Please try again shortly.</div>;
  }

  const enrolledIds = new Set((enrollments ?? []).map((enrollment) => enrollment.course_id));
  const { data: progressRows } = enrolledIds.size
    ? await supabase
      .from("lesson_progress")
      .select("lesson_id, completed, course_lessons!inner(course_id)")
      .eq("user_id", userData.user.id)
      .eq("completed", true)
    : { data: [] };

  const completedByCourse = new Map<string, number>();
  for (const row of progressRows ?? []) {
    const lesson = row.course_lessons as unknown as { course_id: string };
    completedByCourse.set(lesson.course_id, (completedByCourse.get(lesson.course_id) ?? 0) + 1);
  }

  const courseCards: CourseCardData[] = (courses ?? []).map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description ?? "",
    instructorName: course.instructor_name ?? "",
    category: course.category ?? "",
    difficulty: course.difficulty ?? "",
    thumbnailUrl: course.thumbnail_url,
    totalLessons: course.course_lessons?.length ?? 0,
    completedLessons: completedByCourse.get(course.id) ?? 0,
    enrolled: enrolledIds.has(course.id),
  }));

  return <CoursesClient initialCourses={courseCards} />;
}
