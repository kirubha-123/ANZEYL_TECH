import React, { Suspense } from "react";
import { connection } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { dashboardForRole } from "@/lib/auth/roles";
import {
  StudentDashboardClient,
  type EnrolledCourseData,
  type AvailableCourseData,
  type ActivityItem,
} from "@/components/dashboard/StudentDashboardClient";

export const dynamic = "force-dynamic";

const FALLBACK_COURSES = [
  {
    id: "course-fullstack",
    slug: "full-stack-development",
    title: "Full Stack Development",
    description: "Master modern frontend & backend engineering — craft scalable web applications, RESTful APIs, and cloud deployments with React, Next.js, and Node.js.",
    instructor_name: "ANZEYL Faculty",
    category: "Full Stack Development",
    difficulty: "intermediate",
    thumbnail_url: null,
    price_in_cents: 0,
    fallbackLessonsCount: 24,
  },
  {
    id: "course-ai-ml",
    slug: "ai-and-machine-learning",
    title: "AI & Machine Learning",
    description: "Understand, build, and deploy intelligent systems — from classical ML algorithms to deep learning, NLP, and production-ready LLM-powered applications.",
    instructor_name: "ANZEYL Faculty",
    category: "AI & Machine Learning",
    difficulty: "advanced",
    thumbnail_url: null,
    price_in_cents: 0,
    fallbackLessonsCount: 24,
  },
  {
    id: "course-data-science",
    slug: "data-science-and-analytics",
    title: "Data Science & Analytics",
    description: "Turn raw data into business insights — master Python, SQL, statistical analysis, and powerful visualisation tools to drive data-informed decisions.",
    instructor_name: "ANZEYL Faculty",
    category: "Data Science",
    difficulty: "intermediate",
    thumbnail_url: null,
    price_in_cents: 0,
    fallbackLessonsCount: 24,
  },
  {
    id: "course-cyber-security",
    slug: "cyber-security",
    title: "Cyber Security",
    description: "Think like a hacker, defend like a professional — learn ethical hacking, network security, vulnerability assessment, and security operations hands-on.",
    instructor_name: "ANZEYL Faculty",
    category: "Cyber Security",
    difficulty: "intermediate",
    thumbnail_url: null,
    price_in_cents: 0,
    fallbackLessonsCount: 24,
  },
  {
    id: "course-cloud-devops",
    slug: "cloud-and-devops",
    title: "Cloud & DevOps",
    description: "Architect resilient cloud solutions — automate CI/CD pipelines, orchestrate microservices with Docker & Kubernetes, and manage AWS infrastructure.",
    instructor_name: "ANZEYL Faculty",
    category: "Cloud & DevOps",
    difficulty: "intermediate",
    thumbnail_url: null,
    price_in_cents: 0,
    fallbackLessonsCount: 24,
  },
  {
    id: "course-uiux",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Design compelling digital experiences — conduct empathetic user research, build interactive Figma prototypes, and establish scalable design systems.",
    instructor_name: "ANZEYL Faculty",
    category: "UI/UX Design",
    difficulty: "beginner",
    thumbnail_url: null,
    price_in_cents: 0,
    fallbackLessonsCount: 24,
  },
  {
    id: "course-digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Drive exponential digital growth — master search engine optimization (SEO), performance marketing, automated email funnels, and data analytics.",
    instructor_name: "ANZEYL Faculty",
    category: "Digital Marketing",
    difficulty: "beginner",
    thumbnail_url: null,
    price_in_cents: 0,
    fallbackLessonsCount: 24,
  },
  {
    id: "course-powerbi",
    slug: "data-analytics-with-power-bi",
    title: "Data Analytics with Power BI",
    description: "Translate raw corporate metrics into executive dashboards — master advanced DAX, Power Query pipelines, and real-time business intelligence.",
    instructor_name: "ANZEYL Faculty",
    category: "Data Analytics",
    difficulty: "beginner",
    thumbnail_url: null,
    price_in_cents: 0,
    fallbackLessonsCount: 24,
  },
];

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
  const cookieStore = await cookies();
  const demoRole = cookieStore.get("anzeyl_demo_role")?.value;
  const isDemoStudent = demoRole === "student";

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const isPlaceholder =
    supabaseUrl.includes("placeholder") ||
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key") === "placeholder-anon-key";

  // When in demo mode or using placeholder credentials, skip all Supabase
  // network calls to avoid 7+ second timeouts on every page load.
  if (isDemoStudent || isPlaceholder) {
    const rawUserName = cookieStore.get("anzeyl_user_name")?.value;
    const userName = rawUserName ? decodeURIComponent(rawUserName) : "Student";
    const rawUserEmail = cookieStore.get("anzeyl_user_email")?.value;
    const userEmail = rawUserEmail ? decodeURIComponent(rawUserEmail) : "student@anzeyl.com";
    const rawUserGoal = cookieStore.get("anzeyl_user_goal")?.value;
    const userGoal = rawUserGoal ? decodeURIComponent(rawUserGoal) : "Full-Stack Software Engineering";

    const studentProfile = isDemoStudent
      ? {
          id: "demo-student-id",
          fullName: userName,
          email: userEmail,
          role: "student",
          primaryGoal: userGoal,
          phone: null,
          isGuest: false,
        }
      : {
          id: "guest",
          fullName: "Guest",
          email: "",
          role: "guest",
          primaryGoal: "Full-Stack Software Engineering",
          phone: null,
          isGuest: true,
        };

    const availableCourses: AvailableCourseData[] = FALLBACK_COURSES.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description ?? "",
      instructorName: c.instructor_name ?? "ANZEYL Faculty",
      category: c.category ?? "General",
      difficulty: c.difficulty ?? "intermediate",
      totalLessons: c.fallbackLessonsCount ?? 24,
      priceInCents: c.price_in_cents,
    }));

    return (
      <StudentDashboardClient
        studentProfile={studentProfile}
        initialEnrolled={[]}
        initialAvailable={availableCourses}
        activity={[]}
      />
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Fetch authenticated student profile if logged in
  let profile: {
    id: string;
    full_name: string | null;
    role: string;
    primary_goal: string | null;
    phone: string | null;
  } | null = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, role, primary_goal, phone, created_at")
      .eq("id", user.id)
      .maybeSingle();
    profile = data;

    // If user is not student, route to their role dashboard
    if (profile?.role && profile.role !== "student") {
      redirect(dashboardForRole(profile.role));
    }
  }

  // 2. Fetch published courses
  const { data: rawCourses } = await supabase
    .from("courses")
    .select("id, slug, title, description, instructor_name, category, difficulty, thumbnail_url, price_in_cents")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const hasDbCourses = Boolean(rawCourses && rawCourses.length > 0);
  const courses = hasDbCourses ? (rawCourses ?? []) : FALLBACK_COURSES;

  // 3. Fetch user enrollments (only if logged in)
  const { data: rawEnrollments } = user
    ? await supabase
        .from("course_enrollments")
        .select("id, course_id, enrolled_at, completed_at")
        .eq("user_id", user.id)
    : { data: [] };

  const enrollments = rawEnrollments ?? [];
  const enrolledIds = new Set(enrollments.map((e) => e.course_id));

  // 4. Fetch lessons for published courses
  const courseIds = hasDbCourses ? courses.map((c) => c.id) : [];
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

  // 5. Fetch user's lesson progress (only if logged in)
  const { data: rawProgress } = user
    ? await supabase
        .from("lesson_progress")
        .select("id, lesson_id, completed, watched_seconds, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
    : { data: [] };

  const progressRows = rawProgress ?? [];
  const completedLessonIds = new Set(
    progressRows.filter((p) => p.completed).map((p) => p.lesson_id)
  );

  // 6. Build Enrolled Courses Data
  const enrolledCourses: EnrolledCourseData[] = [];
  const availableCourses: AvailableCourseData[] = [];

  for (const course of courses) {
    const courseLessons = lessonsByCourse.get(course.id) ?? [];
    const totalLessons = courseLessons.length || ("fallbackLessonsCount" in course ? (course as { fallbackLessonsCount: number }).fallbackLessonsCount : 10);

    if (enrolledIds.has(course.id) || enrolledIds.has(course.slug)) {
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

  const studentProfile = user
    ? {
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
        isGuest: false,
      }
    : {
        id: "guest",
        fullName: "Guest",
        email: "",
        role: "guest",
        primaryGoal: "Full-Stack Software Engineering",
        phone: null,
        isGuest: true,
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
