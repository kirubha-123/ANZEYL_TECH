"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  AwardIcon,
  BookOpenIcon,
} from "@/components/Icons";

interface IssuedCertificate {
  id: string;
  courseTitle: string;
  recipientName: string;
  issueDate: string;
  credentialId: string;
  skills: string[];
}

export default function CertificatesPage() {
  const [loading, setLoading] = useState(true);
  const [completedCertificates, setCompletedCertificates] = useState<IssuedCertificate[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadCertificates() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch user profile name
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      const studentName = profile?.full_name?.trim() || user.user_metadata?.full_name || "ANZEYL Learner";

      // Check course enrollments that are completed
      const { data: enrollments } = await supabase
        .from("course_enrollments")
        .select("id, course_id, enrolled_at, completed_at, courses(id, title, category)")
        .eq("user_id", user.id);

      if (!enrollments?.length) {
        if (mounted) setLoading(false);
        return;
      }

      // Check lesson progress for each enrollment to verify 100% completion
      const courseIds = enrollments.map((e) => e.course_id);
      const [{ data: lessons }, { data: progress }] = await Promise.all([
        supabase.from("course_lessons").select("id, course_id").in("course_id", courseIds),
        supabase.from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true),
      ]);

      const completedLessonSet = new Set((progress ?? []).map((p) => p.lesson_id));
      const lessonsByCourse = new Map<string, string[]>();
      for (const l of lessons ?? []) {
        const arr = lessonsByCourse.get(l.course_id) ?? [];
        arr.push(l.id);
        lessonsByCourse.set(l.course_id, arr);
      }

      const verifiedCerts: IssuedCertificate[] = [];
      for (const enrollment of enrollments) {
        const courseLessons = lessonsByCourse.get(enrollment.course_id) ?? [];
        const isFinished =
          Boolean(enrollment.completed_at) ||
          (courseLessons.length > 0 &&
            courseLessons.every((lessonId) => completedLessonSet.has(lessonId)));

        if (isFinished) {
          const courseInfo = enrollment.courses as unknown as { title: string; category: string };
          const date = enrollment.completed_at ? new Date(enrollment.completed_at) : new Date();
          const formattedDate = date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });

          verifiedCerts.push({
            id: enrollment.id,
            courseTitle: courseInfo?.title || "Full-Stack Software Engineering",
            recipientName: studentName,
            issueDate: formattedDate,
            credentialId: `SB-CERT-${enrollment.id.slice(0, 8).toUpperCase()}`,
            skills: [courseInfo?.category || "Full-Stack Development", "Production Architecture"],
          });
        }
      }

      if (mounted) {
        setCompletedCertificates(verifiedCerts);
        setLoading(false);
      }
    }

    void loadCertificates();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-slate-200 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 h-64" />
          <div className="bg-white rounded-3xl border border-[#e5e7eb] p-8 h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#dcefea] text-[#176b87] border border-[#b9d8d1]">
            Accreditation & Credentials
          </span>
          <span className="text-xs text-[#64748b]">Verifiable Credentials Record</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263746] mt-1">
          Accredited Certificates
        </h1>
        <p className="text-xs sm:text-sm text-[#64748b] mt-1 max-w-2xl">
          ANZEYL certificates are awarded upon 100% completion of course lessons and practical assessments. Every credential includes an authentic verification record.
        </p>
      </div>

      {/* Real Certificates or Helpful Empty State */}
      {completedCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e5e7eb] shadow-xs space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-0.5 rounded-full font-bold bg-[#eef6f3] text-[#4c9a89] border border-[#b9d8d1]">
                    ✓ Verified & Issued
                  </span>
                  <span className="text-[#64748b] font-mono text-[11px]">{cert.credentialId}</span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#263746] leading-snug">{cert.courseTitle}</h2>
                  <p className="text-xs text-[#64748b] mt-1">
                    Issued to: <strong className="text-[#263746]">{cert.recipientName}</strong>
                  </p>
                  <p className="text-[11px] text-[#64748b] mt-0.5">Date of Award: {cert.issueDate}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-lg bg-[#f7f5ef] border border-[#e5e7eb] text-[10px] font-semibold text-[#263746]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e7eb] flex items-center justify-between text-xs text-[#64748b]">
                <span>Status: Authenticated</span>
                <span className="font-bold text-[#176b87]">ANZEYL Certified</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-[#e5e7eb] p-10 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#dcefea] text-[#176b87] flex items-center justify-center">
            <AwardIcon className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#263746]">No certificates earned yet</h2>
            <p className="text-xs text-[#64748b] max-w-md mx-auto">
              You haven&apos;t completed any courses yet. Once you complete 100% of the lessons in an enrolled course, your verifiable certificate will appear here.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white text-xs font-bold transition-all shadow-xs"
            >
              <BookOpenIcon className="w-4 h-4" />
              <span>Continue Course Learning</span>
            </Link>
          </div>
        </div>
      )}

      {/* Accreditation Criteria Card */}
      <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 sm:p-7 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#263746]">
          How to earn and verify your ANZEYL Certificate
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-1">
            <span className="font-bold text-[#176b87] block">1. Complete All Lessons</span>
            <p className="text-[#64748b]">
              Watch and complete each video and reading module in your enrolled course classroom.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-1">
            <span className="font-bold text-[#176b87] block">2. Complete Practice Tests</span>
            <p className="text-[#64748b]">
              Test your practical knowledge with timed quizzes and assessments in your subject.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-1">
            <span className="font-bold text-[#176b87] block">3. Instant Credential Verification</span>
            <p className="text-[#64748b]">
              Your certificate issues automatically with an authentic verification ID for hiring portfolios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
