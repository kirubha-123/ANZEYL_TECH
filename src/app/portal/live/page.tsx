"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ClockIcon,
  ArrowRightIcon,
} from "@/components/Icons";

interface LiveSession {
  id: string;
  title: string;
  courseTitle: string;
  courseSlug: string;
  instructorName: string;
  date: string;
  time: string;
  meetingUrl: string | null;
  status: "Scheduled" | "Live Now" | "Completed";
  canJoin: boolean;
}

export default function LiveClassesPage() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchLiveClasses() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("live_classes")
          .select("id, title, course_slug, instructor_name, scheduled_at, duration_minutes, meeting_url, status")
          .order("scheduled_at", { ascending: true });

        if (!error && data && data.length > 0 && active) {
          const mapped: LiveSession[] = data.map((item) => {
            const dt = new Date(item.scheduled_at);
            const dateStr = dt.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
            const timeStr = dt.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const isLive = item.status === "Live Now";
            const hasLink = Boolean(item.meeting_url && item.meeting_url.trim().length > 0);

            return {
              id: item.id,
              title: item.title,
              courseTitle: item.course_slug,
              courseSlug: item.course_slug,
              instructorName: item.instructor_name || "ANZEYL Faculty",
              date: dateStr,
              time: `${timeStr} (${item.duration_minutes || 60} mins)`,
              meetingUrl: item.meeting_url,
              status: item.status || "Scheduled",
              canJoin: hasLink && (isLive || item.status === "Scheduled"),
            };
          });
          setSessions(mapped);
          setLoading(false);
          return;
        }
      } catch {
        // Fallback to empty
      }

      if (active) {
        setSessions([]);
        setLoading(false);
      }
    }

    void fetchLiveClasses();
    return () => {
      active = false;
    };
  }, []);

  const upcomingSessions = sessions.filter((s) => s.status !== "Completed");
  const completedSessions = sessions.filter((s) => s.status === "Completed");

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
            Instructor-Led Live Stage
          </span>
          <span className="text-xs text-[#64748b]">Scheduled Masterclasses</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] mt-1">
          Live Classes
        </h1>
        <p className="text-xs sm:text-sm text-[#263746] mt-1 max-w-2xl">
          Attend live interactive masterclasses conducted by industry engineering faculty. Access scheduled class sessions and recorded archives.
        </p>
      </div>

      {/* UPCOMING SESSIONS */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-[#17191D] flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-rose-600" />
          <span>Scheduled Live Sessions</span>
        </h2>

        {loading ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#e5e7eb] text-xs text-[#64748b] shadow-2xs animate-pulse">
            Loading upcoming live class schedule...
          </div>
        ) : upcomingSessions.length === 0 ? (
          /* Strictly adhering to requirement: "No live classes scheduled yet. Check back for upcoming sessions." */
          <div className="p-12 text-center bg-white border border-dashed border-[#d6dde0] rounded-3xl space-y-3 shadow-2xs">
            <ClockIcon className="w-10 h-10 text-[#64748b] mx-auto" />
            <h3 className="text-base font-bold text-[#17191D]">
              No live classes scheduled yet. Check back for upcoming sessions.
            </h3>
            <p className="text-xs text-[#64748b] max-w-md mx-auto">
              Live classes are announced in advance. You will be notified when your instructor schedules the next interactive workshop.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingSessions.map((cls) => {
              const isLiveNow = cls.status === "Live Now";
              return (
                <div
                  key={cls.id}
                  className="p-6 sm:p-7 rounded-3xl border border-[#e5e7eb] bg-white hover:border-[#176b87] transition-all space-y-5 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`px-2.5 py-0.5 rounded-full border font-bold ${
                          isLiveNow
                            ? "bg-rose-50 text-rose-700 border-rose-300"
                            : "bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20"
                        }`}
                      >
                        {cls.status}
                      </span>
                      <span className="text-[#64748b] font-mono">{cls.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#17191D] leading-snug">
                      {cls.title}
                    </h3>

                    <div className="p-3.5 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-1 text-xs">
                      <div className="flex items-center justify-between text-[#263746]">
                        <span className="font-semibold text-[#17191D]">Faculty: {cls.instructorName}</span>
                        <span className="text-[#176b87] font-mono font-semibold">{cls.time}</span>
                      </div>
                      <span className="text-[11px] text-[#64748b] block">
                        Course: {cls.courseTitle}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-between">
                    <span className="text-xs text-[#64748b]">
                      Platform: {cls.meetingUrl?.includes("zoom") ? "Zoom" : "Google Meet"}
                    </span>

                    {/* ONLY show Join Class when a valid link exists and session is eligible */}
                    {cls.canJoin && cls.meetingUrl ? (
                      <a
                        href={cls.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                      >
                        {isLiveNow && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                        <span>Join Class</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-[#64748b] italic">
                        Link shared 15 mins prior
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* COMPLETED / ARCHIVED SESSIONS */}
      {completedSessions.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-[#e5e7eb]">
          <h2 className="text-base font-bold text-[#17191D]">Completed Class Archives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {completedSessions.map((cs) => (
              <div
                key={cs.id}
                className="p-4 rounded-2xl border border-[#e5e7eb] bg-white space-y-2 shadow-2xs"
              >
                <span className="text-[10px] text-[#64748b]">{cs.date}</span>
                <h4 className="text-sm font-bold text-[#17191D] line-clamp-2">{cs.title}</h4>
                <p className="text-xs text-[#64748b]">{cs.instructorName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
