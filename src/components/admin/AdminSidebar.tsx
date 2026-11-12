"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnzeylMark } from "@/components/AnzeylLogo";
import { createClient } from "@/lib/supabase/client";
import {
  BarChartIcon,
  BookOpenIcon,
  UsersIcon,
  ClockIcon,
  AwardIcon,
  ZapIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  LogOutIcon,
} from "@/components/Icons";

interface AdminNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

const ADMIN_NAV_SECTIONS: { category: string; items: AdminNavItem[] }[] = [
  {
    category: "Operations & Analytics",
    items: [
      { name: "Executive Dashboard", href: "/admin", icon: BarChartIcon },
      { name: "Student Management", href: "/admin/students", icon: UsersIcon, badge: "300+ Active", badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
    ],
  },
  {
    category: "Curriculum & Academics",
    items: [
      { name: "Course & Curriculum CMS", href: "/admin/courses", icon: BookOpenIcon },
      { name: "Question Bank & Quizzes", href: "/admin/question-bank", icon: CheckCircleIcon, badge: "50+ Items", badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
      { name: "Live Class Scheduler", href: "/admin/live-classes", icon: ClockIcon, badge: "Today", badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
    ],
  },
  {
    category: "Credentials & Finance",
    items: [
      { name: "Certificate Issuance", href: "/admin/certificates", icon: AwardIcon },
      { name: "Tuition Vouchers & Discounts", href: "/admin/vouchers", icon: ZapIcon, badge: "Merit Active", badgeColor: "bg-[#C9A64B]/20 text-[#E8D28A] border-[#C9A64B]/30" },
    ],
  },
];

export function AdminSidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      onCloseMobile?.();
      router.push("/admin/login");
      router.refresh();
    } catch {
      setSigningOut(false);
    }
  }

  return (
    <aside className="w-64 h-full flex flex-col bg-[#17191D] border-r border-[#C9A64B]/20 select-none">
      {/* Brand Header */}
      <div className="h-20 px-6 flex items-center border-b border-[#C9A64B]/20">
        <Link href="/home" className="flex items-center gap-3 group">
          <AnzeylMark className="w-10 h-10 shrink-0" />
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className="font-extrabold text-sm tracking-widest"
                style={{ color: "#F7F5EF", letterSpacing: "0.18em" }}
              >
                ANZEYL
              </span>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#C9A64B]/20 text-[#E8D28A] border border-[#C9A64B]/30 uppercase">
                Admin
              </span>
            </div>
            <span className="text-[9px] tracking-wider text-[#A7A9AE] font-semibold block uppercase">
              Management Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Role Pill */}
      <div className="p-3 mx-3 my-3 rounded-2xl bg-[#101114] border border-[#C9A64B]/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C9A64B] animate-pulse" />
          <span className="text-[#F7F5EF] font-bold">Admin Console</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C9A64B]/10 text-[#E8D28A] border border-[#C9A64B]/20">
          Superuser
        </span>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-2 space-y-5 overflow-y-auto custom-scrollbar">
        {ADMIN_NAV_SECTIONS.map((section) => (
          <div key={section.category} className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#A7A9AE]">
              {section.category}
            </span>
            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? "bg-[#C9A64B]/10 text-[#F7F5EF] border-l-2 border-[#C9A64B] shadow-md"
                        : "text-[#A7A9AE] hover:text-[#F7F5EF] hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-[#C9A64B]" : "text-[#A7A9AE] group-hover:text-[#E8D28A]"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                      >
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

      {/* Bottom: Student Portal switch + Logout */}
      <div className="p-3 border-t border-[#C9A64B]/15 bg-[#101114] space-y-1.5">
        <Link
          href="/portal"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#C9A64B] hover:text-[#F7F5EF] hover:bg-white/5 transition-colors font-semibold"
        >
          <span>Switch to Student Portal</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOutIcon className="w-4 h-4 shrink-0" />
          <span>{signingOut ? "Signing out…" : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
}
