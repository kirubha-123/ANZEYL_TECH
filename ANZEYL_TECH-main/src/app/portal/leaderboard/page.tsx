"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  TrophyIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "@/components/Icons";

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("Learner");
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
  const [enrolledCount, setEnrolledCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function loadStudentStats() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      const [{ count: enrollCount }, { count: lessonCount }] = await Promise.all([
        supabase
          .from("course_enrollments")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("lesson_progress")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("completed", true),
      ]);

      if (mounted) {
        setStudentName(
          profile?.full_name?.trim() ||
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "Learner"
        );
        setEnrolledCount(enrollCount ?? 0);
        setCompletedLessonsCount(lessonCount ?? 0);
        setLoading(false);
      }
    }

    void loadStudentStats();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-slate-200 rounded-xl" />
        <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 h-80" />
      </div>
    );
  }

  const initial = studentName.charAt(0).toUpperCase() || "S";

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#dcefea] text-[#176b87] border border-[#b9d8d1]">
            Academic Standings
          </span>
          <span className="text-xs text-[#64748b]">Real-Time Verification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263746] mt-1">
          Cohort Learning Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-[#64748b] mt-1 max-w-2xl">
          Standings are calculated using real lesson completions and assessment scores. Complete curriculum modules and proctored evaluations to advance your ranking.
        </p>
      </div>

      {/* Authenticated Student Real Status Card */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e5e7eb] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#176b87] text-white flex items-center justify-center font-bold text-lg shrink-0">
              {initial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <strong className="text-base font-bold text-[#263746]">{studentName}</strong>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcefea] text-[#176b87]">
                  You
                </span>
              </div>
              <p className="text-xs text-[#64748b]">Verified Student Account</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="px-3 py-2 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-center">
              <span className="block text-[10px] text-[#64748b] uppercase">Enrolled</span>
              <span className="text-sm font-bold text-[#263746]">{enrolledCount} Courses</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-center">
              <span className="block text-[10px] text-[#64748b] uppercase">Completed</span>
              <span className="text-sm font-bold text-[#4c9a89]">{completedLessonsCount} Lessons</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#64748b] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            {completedLessonsCount > 0
              ? `You have completed ${completedLessonsCount} lessons across your enrolled curriculums.`
              : "You have not completed any lessons yet. Complete lessons to establish your cohort standing."}
          </span>
          <Link
            href="/dashboard"
            className="text-xs font-bold text-[#176b87] hover:underline flex items-center gap-1"
          >
            <span>Resume Lessons</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Cohort Evaluation Notice */}
      <div className="bg-white rounded-3xl border border-dashed border-[#e5e7eb] p-8 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#dcefea] text-[#176b87] flex items-center justify-center">
          <TrophyIcon className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#263746]">
            Cohort Rankings Cycle In Progress
          </h2>
          <p className="text-xs text-[#64748b] max-w-lg mx-auto leading-relaxed">
            Standings are compiled at the end of each evaluation period based on verified lesson completions and proctored examination rubrics. Keep learning to achieve top honors.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/portal/courses"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176b87] text-white text-xs font-bold hover:bg-[#12566c] transition-colors"
          >
            <BookOpenIcon className="w-4 h-4" />
            <span>Go to My Courses</span>
          </Link>
          <Link
            href="/portal/quizzes"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] text-[#263746] text-xs font-bold hover:bg-[#eef6f3] transition-colors"
          >
            <CheckCircleIcon className="w-4 h-4 text-[#176b87]" />
            <span>Take Practice Quizzes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
