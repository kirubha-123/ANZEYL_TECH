import React from "react";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import CoursesClient, { type CourseCardData } from "./CoursesClient";
import { ANZEYL_COURSES } from "@/lib/courseData";

export default async function MyCoursesPage() {
  await connection();
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  // Load published courses from Supabase DB and enrollments for logged-in user
  const [{ data: dbCourses }, { data: dbEnrollments }] = await Promise.all([
    supabase
      .from("courses")
      .select("id, slug, title, description, instructor_name, category, difficulty, thumbnail_url, price_in_cents, original_price_in_cents, duration_months, training_modes, course_lessons(id)")
      .eq("published", true)
      .order("created_at", { ascending: false }),
    userData?.user
      ? supabase
          .from("course_enrollments")
          .select("course_id")
          .eq("user_id", userData.user.id)
      : Promise.resolve({ data: [] as { course_id: string }[] }),
  ]);

  const enrolledCourseIds = new Set(
    (dbEnrollments ?? []).map((e) => e.course_id)
  );

  // If DB courses exist, use them. Otherwise, map ANZEYL_COURSES
  const baseCourses: CourseCardData[] = (dbCourses && dbCourses.length > 0)
    ? dbCourses.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description ?? "",
        instructorName: c.instructor_name ?? "ANZEYL Faculty",
        category: c.category ?? "General",
        difficulty: c.difficulty ?? "intermediate",
        thumbnailUrl: c.thumbnail_url,
        totalLessons: c.course_lessons?.length ?? 24,
        completedLessons: 0,
        enrolled: enrolledCourseIds.has(c.id) || enrolledCourseIds.has(c.slug),
        durationLabel: `${c.duration_months || 3} months`,
        modes: (c.training_modes || ["Online", "Offline"]) as ("Online" | "Offline")[],
        priceInCents: c.price_in_cents ?? null,
        originalPriceInCents: c.original_price_in_cents ?? null,
      }))
    : ANZEYL_COURSES.map((ac) => ({
        id: ac.id,
        slug: ac.slug,
        title: ac.title,
        description: ac.shortDescription,
        instructorName: "ANZEYL Faculty",
        category: ac.category,
        difficulty: ac.difficulty,
        thumbnailUrl: null,
        totalLessons: 24,
        completedLessons: 0,
        enrolled: enrolledCourseIds.has(ac.id) || enrolledCourseIds.has(ac.slug),
        durationLabel: ac.durationLabel,
        modes: ac.modes,
        priceInCents: ac.priceInCents,
        originalPriceInCents: ac.originalPriceInCents,
      }));

  // Fetch lesson progress if user is logged in and has enrollments
  if (userData?.user && enrolledCourseIds.size > 0) {
    try {
      const { data: progressRows } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed, course_lessons!inner(course_id)")
        .eq("user_id", userData.user.id)
        .eq("completed", true);

      const completedByCourse = new Map<string, number>();
      for (const row of progressRows ?? []) {
        const lesson = row.course_lessons as unknown as { course_id: string };
        completedByCourse.set(lesson.course_id, (completedByCourse.get(lesson.course_id) ?? 0) + 1);
      }

      baseCourses.forEach((c) => {
        c.completedLessons = completedByCourse.get(c.id) ?? 0;
      });
    } catch {
      // Non-blocking
    }
  }

  return (
    <CoursesClient
      initialCourses={baseCourses}
      isLoggedIn={Boolean(userData?.user)}
    />
  );
}
