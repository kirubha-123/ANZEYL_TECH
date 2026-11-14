"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  BellIcon,
  UserIcon,
  MenuIcon,
  CheckCircleIcon,
  BookOpenIcon,
  LogOutIcon,
} from "@/components/Icons";
import { createClient } from "@/lib/supabase/client";

interface PortalHeaderProps {
  onToggleSidebar?: () => void;
}

export function PortalHeader({ onToggleSidebar }: PortalHeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    isLoggedIn: boolean;
    name: string;
    email: string;
    role: string;
  }>({
    isLoggedIn: false,
    name: "Guest",
    email: "",
    role: "guest",
  });

  useEffect(() => {
    let active = true;

    async function loadUser() {
      // Check for demo cookie first — avoid Supabase call entirely when
      // credentials are placeholders (prevents 7s network timeout).
      const demoCookie = document.cookie
        .split("; ")
        .find((c) => c.startsWith("anzeyl_demo_role="));
      const demoRole = demoCookie?.split("=")[1];

      if (demoRole) {
        const storedName =
          typeof window !== "undefined" ? localStorage.getItem("anzeyl_user_name") : null;
        const cookieName = document.cookie
          .split("; ")
          .find((c) => c.startsWith("anzeyl_user_name="))
          ?.split("=")[1];
        const decodedCookieName = cookieName ? decodeURIComponent(cookieName) : null;
        const actualName =
          storedName ||
          decodedCookieName ||
          (demoRole === "student" ? "Student" : demoRole === "educator" ? "Mentor Faculty" : "Admin");

        const cookieEmail = document.cookie
          .split("; ")
          .find((c) => c.startsWith("anzeyl_user_email="))
          ?.split("=")[1];
        const actualEmail = cookieEmail ? decodeURIComponent(cookieEmail) : `${demoRole}@anzeyl.com`;

        if (active) {
          setCurrentUser({
            isLoggedIn: true,
            name: actualName,
            email: actualEmail,
            role: demoRole === "educator" ? "educator" : demoRole === "college_admin" ? "college_admin" : "student",
          });
        }
        return;
      }

      // Check if Supabase URL is a placeholder — skip the network call
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
        if (active) {
          setCurrentUser({
            isLoggedIn: false,
            name: "Guest",
            email: "",
            role: "guest",
          });
        }
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !active) {
        if (active) {
          setCurrentUser({
            isLoggedIn: false,
            name: "Guest",
            email: "",
            role: "guest",
          });
        }
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .maybeSingle();

      if (active) {
        setCurrentUser({
          isLoggedIn: true,
          name:
            profile?.full_name?.trim() ||
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "Learner",
          email: user.email || "",
          role: profile?.role || "student",
        });
      }
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, []);

  async function handleSignOut() {
    // 1. Clear all authentication and demo cookies
    document.cookie = "anzeyl_demo_role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_name=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_email=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_goal=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "anzeyl_user_phone=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 2. Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("anzeyl_user_name");
      localStorage.removeItem("anzeyl_user_email");
      localStorage.removeItem("anzeyl_user_goal");
      localStorage.removeItem("anzeyl_user_phone");
      localStorage.removeItem("anzeyl_demo_role");
      localStorage.removeItem("anzeyl_student_enrolled_courses");
    }

    // 3. Reset local user state
    setCurrentUser({
      isLoggedIn: false,
      name: "Guest",
      email: "",
      role: "guest",
    });
    setShowUserMenu(false);

    // 4. Sign out from Supabase if active
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }

    // 5. Navigate to clean guest dashboard
    router.replace("/dashboard");
    router.refresh();
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }

  const initial = currentUser.name.charAt(0).toUpperCase() || "G";

  return (
    <header className="h-20 bg-white border-b border-[#e5e7eb] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-[#263746] hover:bg-[#f7f5ef] transition-colors border border-[#e5e7eb]"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        )}

        {/* Global Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <SearchIcon className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons, curriculums, assessments..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#f7f5ef] border border-[#e5e7eb] rounded-xl text-[#263746] placeholder:text-[#64748b] focus:outline-none focus:border-[#176b87] focus:ring-1 focus:ring-[#176b87] transition-all"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {!currentUser.isLoggedIn ? (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Multi-role Login Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowLoginMenu(!showLoginMenu);
                  setShowNotifications(false);
                  setShowUserMenu(false);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#176b87] bg-white hover:bg-[#dcefea]/50 border border-[#176b87]/30 transition-all shadow-xs cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Log In</span>
                <span className="text-[9px] opacity-70">▼</span>
              </button>

              {showLoginMenu && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white border border-[#e5e7eb] shadow-xl p-3 space-y-2 z-50 animate-fade-in">
                  <div className="pb-2 border-b border-[#e5e7eb]">
                    <span className="block text-xs font-bold text-[#17191D]">
                      Select Login Workspace
                    </span>
                    <span className="text-[10px] text-[#64748b]">
                      Choose your role to sign in:
                    </span>
                  </div>

                  <Link
                    href="/student/login?next=/dashboard"
                    onClick={() => setShowLoginMenu(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#f7f5ef] transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#176b87]/10 text-[#176b87] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      🎓
                    </span>
                    <div>
                      <span className="block text-xs font-bold text-[#17191D] group-hover:text-[#176b87]">
                        Student Login
                      </span>
                      <span className="text-[10px] text-[#64748b] leading-tight block">
                        Courses, materials, study cards & practice
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/mentor/login?next=/mentor/dashboard"
                    onClick={() => setShowLoginMenu(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#f7f5ef] transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      🧑‍🏫
                    </span>
                    <div>
                      <span className="block text-xs font-bold text-[#17191D] group-hover:text-emerald-700">
                        Mentor Login
                      </span>
                      <span className="text-[10px] text-[#64748b] leading-tight block">
                        Live sessions, reviews & curriculum
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/admin/login?next=/admin"
                    onClick={() => setShowLoginMenu(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#f7f5ef] transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      🛡️
                    </span>
                    <div>
                      <span className="block text-xs font-bold text-[#17191D] group-hover:text-amber-800">
                        Admin Login
                      </span>
                      <span className="text-[10px] text-[#64748b] leading-tight block">
                        Platform operations, courses & questions
                      </span>
                    </div>
                  </Link>

                  <div className="pt-1.5 border-t border-[#e5e7eb] text-center">
                    <Link
                      href="/login"
                      onClick={() => setShowLoginMenu(false)}
                      className="text-[11px] font-bold text-[#176b87] hover:underline"
                    >
                      View all workspace details →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/student/register"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#176b87] hover:bg-[#12566c] text-white transition-all shadow-xs"
            >
              <span>Sign Up</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Role Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#dcefea] border border-[#b9d8d1] text-[#176b87] text-xs font-bold capitalize">
              <span className="w-2 h-2 rounded-full bg-[#176b87]" />
              <span>{currentUser.role} Workspace</span>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                aria-label="View notifications"
                className="relative p-2.5 rounded-xl text-[#263746] hover:bg-[#f7f5ef] transition-colors border border-[#e5e7eb]"
              >
                <BellIcon className="w-4 h-4" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 sm:w-88 rounded-2xl bg-white border border-[#e5e7eb] shadow-xl p-4 space-y-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-[#e5e7eb]">
                    <span className="text-sm font-bold text-[#263746]">Notifications</span>
                    <span className="text-[11px] font-semibold text-[#176b87]">Student Updates</span>
                  </div>
                  <div className="py-6 text-center text-xs text-[#64748b] space-y-1">
                    <p className="font-semibold text-[#263746]">No new notifications</p>
                    <p>You are all caught up with your enrolled courses.</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setShowNotifications(false)}
                    className="block text-center text-xs font-bold text-[#176b87] hover:underline pt-2 border-t border-[#e5e7eb]"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </div>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                aria-label="User account menu"
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#f7f5ef] hover:bg-[#eef6f3] border border-[#e5e7eb] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#176b87] text-white flex items-center justify-center font-bold text-xs">
                  {initial}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-xs font-bold text-[#263746] leading-tight max-w-[130px] truncate">
                    {currentUser.name}
                  </span>
                  <span className="block text-[10px] text-[#64748b] capitalize">{currentUser.role}</span>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-60 rounded-2xl bg-white border border-[#e5e7eb] shadow-xl p-2 space-y-1 z-50">
                  <div className="p-3 border-b border-[#e5e7eb]">
                    <span className="block text-xs font-bold text-[#263746] truncate">{currentUser.name}</span>
                    <span className="block text-[10px] text-[#64748b] truncate">{currentUser.email}</span>
                  </div>
                  <Link
                    href="/portal/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#263746] hover:bg-[#f7f5ef] rounded-xl transition-colors font-medium"
                  >
                    <UserIcon className="w-4 h-4 text-[#176b87]" />
                    <span>Profile & Preferences</span>
                  </Link>
                  <Link
                    href="/portal/courses"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#263746] hover:bg-[#f7f5ef] rounded-xl transition-colors font-medium"
                  >
                    <BookOpenIcon className="w-4 h-4 text-[#176b87]" />
                    <span>My Courses</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#263746] hover:bg-[#f7f5ef] rounded-xl transition-colors font-medium"
                  >
                    <CheckCircleIcon className="w-4 h-4 text-[#4c9a89]" />
                    <span>Student Dashboard</span>
                  </Link>
                  <div className="pt-1 border-t border-[#e5e7eb]">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-medium text-left"
                    >
                      <LogOutIcon className="w-4 h-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
