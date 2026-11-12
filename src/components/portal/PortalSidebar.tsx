"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnzeylMark } from "@/components/AnzeylLogo";
import {
  BookOpenIcon,
  ClockIcon,
  TrophyIcon,
  ShieldCheckIcon,
  AwardIcon,
  BarChartIcon,
  UserIcon,
  CodeIcon,
  GraduationCapIcon,
  CheckCircleIcon,
  ZapIcon,
  SparklesIcon,
} from "@/components/Icons";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeStyle?: string;
}

const PORTAL_NAV_ITEMS: { category: string; items: NavItem[] }[] = [
  {
    category: "Learning",
    items: [
      { name: "My Dashboard", href: "/dashboard", icon: BarChartIcon },
      { name: "My Courses & Lessons", href: "/portal/courses", icon: BookOpenIcon },
      { name: "Study Cards (Flashcards)", href: "/portal/study-cards", icon: ZapIcon },
      { name: "Live Masterclasses", href: "/portal/live", icon: ClockIcon },
      { name: "Study Materials & Notes", href: "/portal/materials", icon: GraduationCapIcon },
    ],
  },
  {
    category: "Assessments & Practice",
    items: [
      { name: "Practice Quizzes", href: "/portal/quizzes", icon: CheckCircleIcon },
      { name: "Proctored Examinations", href: "/portal/exams", icon: ShieldCheckIcon },
    ],
  },
  {
    category: "AI Companions",
    items: [
      { name: "24/7 AI Code Tutor", href: "/portal/ai-tutor", icon: SparklesIcon, badge: "AI Assistant", badgeStyle: "bg-[#C9A64B]/10 text-[#C9A64B] border border-[#C9A64B]/30" },
      { name: "AI Mock Interview Coach", href: "/portal/ai-interview", icon: CodeIcon },
    ],
  },
  {
    category: "Growth & Recognition",
    items: [
      { name: "Performance Analytics", href: "/portal/analytics", icon: BarChartIcon },
      { name: "Cohort Leaderboard", href: "/portal/leaderboard", icon: TrophyIcon },
      { name: "Accredited Certificates", href: "/portal/certificates", icon: AwardIcon },
      { name: "Profile & Preferences", href: "/portal/profile", icon: UserIcon },
    ],
  },
];

interface PortalSidebarProps {
  onCloseMobile?: () => void;
}

export function PortalSidebar({ onCloseMobile }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full flex flex-col bg-white border-r border-[#e5e7eb] select-none">
      {/* Brand Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-[#e5e7eb] bg-[#f7f5ef]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <AnzeylMark className="w-10 h-10 shrink-0" />
          <div>
            <span
              className="font-extrabold text-sm tracking-widest block"
              style={{ color: "#17191D", letterSpacing: "0.18em" }}
            >
              ANZEYL
            </span>
            <span className="text-[9px] tracking-wider font-semibold block uppercase" style={{ color: "#C9A64B" }}>
              Student Workspace
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Scrollable Body */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto custom-scrollbar">
        {PORTAL_NAV_ITEMS.map((group) => (
          <div key={group.category} className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
              {group.category}
            </span>
            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard" || pathname === "/portal"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#C9A64B]/10 text-[#17191D] border-l-4 border-[#C9A64B] shadow-xs"
                        : "text-[#263746]/80 hover:text-[#17191D] hover:bg-[#f7f5ef]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-[#C9A64B]" : "text-[#64748b]"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeStyle}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Workspace Footer Info */}
      <div className="p-4 border-t border-[#e5e7eb] bg-[#f7f5ef]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C9A64B] animate-pulse" />
          <span className="text-[11px] font-medium text-[#64748b]">ANZEYL Platform</span>
        </div>
      </div>
    </aside>
  );
}
