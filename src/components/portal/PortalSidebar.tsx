"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AnzeylMark } from "@/components/AnzeylLogo";
import {
  BookOpenIcon,
  ClockIcon,
  ShieldCheckIcon,
  AwardIcon,
  BarChartIcon,
  UserIcon,
  CodeIcon,
  GraduationCapIcon,
  CheckCircleIcon,
  ZapIcon,
} from "@/components/Icons";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeStyle?: string;
}

// Routes that require login — hidden entirely from guests
const AUTH_ONLY_ROUTES = new Set([
  "/portal/notes",
  "/portal/profile",
  "/portal/analytics",
  "/portal/certificates",
]);

const PORTAL_NAV_ITEMS: { category: string; items: NavItem[] }[] = [
  {
    category: "Learning",
    items: [
      { name: "My Dashboard", href: "/dashboard", icon: BarChartIcon },
      { name: "My Courses", href: "/portal/courses", icon: BookOpenIcon },
      { name: "Study Materials", href: "/portal/materials", icon: GraduationCapIcon },
      { name: "My Notes", href: "/portal/notes", icon: BookOpenIcon },
      { name: "Study Cards", href: "/portal/study-cards", icon: ZapIcon },
    ],
  },
  {
    category: "Practice",
    items: [
      { name: "Practice Questions", href: "/portal/practice", icon: CheckCircleIcon, badge: "New", badgeStyle: "bg-[#176b87]/15 text-[#176b87] border border-[#176b87]/30" },
      { name: "Mock Tests", href: "/portal/quizzes", icon: ClockIcon },
      { name: "Assessments", href: "/portal/exams", icon: ShieldCheckIcon },
    ],
  },
  {
    category: "Projects",
    items: [
      { name: "Assignments", href: "/portal/assignments", icon: BookOpenIcon },
      { name: "My Projects", href: "/portal/projects", icon: CodeIcon },
    ],
  },
  {
    category: "Schedule",
    items: [
      { name: "Live Classes", href: "/portal/live", icon: ClockIcon },
    ],
  },
  {
    category: "Profile",
    items: [
      { name: "My Profile", href: "/portal/profile", icon: UserIcon },
      { name: "Progress", href: "/portal/analytics", icon: BarChartIcon },
      { name: "Certificates", href: "/portal/certificates", icon: AwardIcon },
    ],
  },
];

interface PortalSidebarProps {
  onCloseMobile?: () => void;
}

export function PortalSidebar({ onCloseMobile }: PortalSidebarProps) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let active = true;
    async function checkAuth() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const hasDemoCookie = typeof document !== "undefined" && document.cookie.includes("anzeyl_demo_role=student");
      if (active) {
        setIsLoggedIn(Boolean(user || hasDemoCookie));
      }
    }
    void checkAuth();
    return () => {
      active = false;
    };
  }, []);

  return (
    <aside className="w-64 h-full flex flex-col bg-white border-r border-[#e5e7eb] select-none">
      {/* Brand Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-[#e5e7eb] bg-[#f7f5ef]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <AnzeylMark className="w-14 h-9 shrink-0" />
          <div>
            <span
              className="font-black text-sm tracking-widest block"
              style={{ letterSpacing: "0.14em" }}
            >
              <span className="text-[#17191D]">ANZ</span>
              <span className="text-[#66cc00]">E</span>
              <span className="text-[#17191D]">YL</span>
            </span>
            <span className="text-[9px] tracking-wider font-bold block uppercase text-[#64748b]">
              SOLUTIONS · Student Workspace
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Scrollable Body */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto custom-scrollbar">
        {PORTAL_NAV_ITEMS.map((group) => {
          // Filter out auth-only items for guests
          const visibleItems = group.items.filter(
            (item) => isLoggedIn || !AUTH_ONLY_ROUTES.has(item.href)
          );
          // Hide whole category if no visible items
          if (visibleItems.length === 0) return null;

          return (
          <div key={group.category} className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
              {group.category}
            </span>
            <div className="space-y-0.5 pt-1">
              {visibleItems.map((item) => {
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
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${isActive
                      ? "bg-[#C9A64B]/10 text-[#17191D] border-l-4 border-[#C9A64B] shadow-xs"
                      : "text-[#263746]/80 hover:text-[#17191D] hover:bg-[#f7f5ef]"
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${isActive ? "text-[#C9A64B]" : "text-[#64748b]"
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
          );
        })}
      </nav>

      {/* Workspace Footer Info / Login for Guests */}
      <div className="p-3 border-t border-[#e5e7eb] bg-[#f7f5ef]">
        {!isLoggedIn ? (
          <div className="p-3 bg-white rounded-2xl border border-[#e5e7eb] shadow-xs text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#176b87]">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Guest Preview</span>
            </div>
            <p className="text-[11px] text-[#64748b] leading-tight">
              Sign in to save your progress & earn credentials
            </p>
            <Link
              href="/login"
              onClick={onCloseMobile}
              className="block w-full py-1.5 px-3 bg-[#176b87] hover:bg-[#12566c] text-white rounded-xl text-xs font-bold transition-colors shadow-xs text-center"
            >
              Log In
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="w-2 h-2 rounded-full bg-[#C9A64B] animate-pulse" />
            <span className="text-[11px] font-medium text-[#64748b]">ANZEYL SOLUTIONS</span>
          </div>
        )}
      </div>
    </aside>
  );
}
