import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { dashboardForRole } from "@/lib/auth/roles";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-anon-key";

  const isPlaceholder =
    supabaseUrl.includes("placeholder") || supabaseKey === "placeholder-anon-key";

  // When Supabase credentials are placeholders, skip the network call entirely
  // to avoid 7+ second timeouts on every single request.
  let user: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null = null;

  if (!isPlaceholder) {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  const pathname = request.nextUrl.pathname;

  // Root "/" always redirects to /dashboard (original behavior)
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Strictly protected routes that require authentication
  const isProtectedPortalRoute =
    pathname.startsWith("/portal/classroom") ||
    pathname.startsWith("/portal/profile") ||
    pathname.startsWith("/portal/certificates") ||
    pathname.startsWith("/portal/analytics") ||
    pathname.startsWith("/portal/notes");
  const isMentorRoute = pathname.startsWith("/mentor/dashboard");
  const isAdminRoute = pathname === "/admin" || (pathname.startsWith("/admin/") && pathname !== "/admin/login");
  const isProtectedRoute = isProtectedPortalRoute || isMentorRoute || isAdminRoute;
  const isAuthRoute =
    pathname === "/login" ||
    pathname.startsWith("/get-started") ||
    pathname.startsWith("/student/login") ||
    pathname.startsWith("/student/register") ||
    pathname.startsWith("/mentor/login") ||
    pathname.startsWith("/mentor/register") ||
    pathname.startsWith("/admin/login");

  const isStudentArea = pathname === "/dashboard" || pathname.startsWith("/dashboard/") || pathname.startsWith("/portal");

  // Handle Demo Mode cookie (for testing/preview when Supabase URL is placeholder or local dev)
  const demoRole = request.cookies.get("anzeyl_demo_role")?.value;
  if (!user && demoRole) {
    if (demoRole === "educator") {
      if (isMentorRoute) return supabaseResponse;
      if (isAdminRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/mentor/dashboard";
        return NextResponse.redirect(url);
      }
      if (isAuthRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/mentor/dashboard";
        return NextResponse.redirect(url);
      }
    } else if (demoRole === "college_admin") {
      if (isAdminRoute) return supabaseResponse;
      if (isMentorRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
      if (isAuthRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
    } else if (demoRole === "student") {
      if (isProtectedPortalRoute || isStudentArea) return supabaseResponse;
      if (isMentorRoute || isAdminRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
      if (isAuthRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.startsWith("/admin") ? "/admin/login" : pathname.startsWith("/mentor") ? "/mentor/login" : "/student/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && !isPlaceholder && (isProtectedRoute || isStudentArea || isAuthRoute)) {
    const supabaseForProfile = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    });
    const { data: profile } = await supabaseForProfile
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (isStudentArea && profile?.role && profile.role !== "student") {
      const url = request.nextUrl.clone();
      url.pathname = dashboardForRole(profile?.role);
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (isMentorRoute && profile?.role !== "educator") {
      const url = request.nextUrl.clone();
      url.pathname = dashboardForRole(profile?.role);
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (isAdminRoute && profile?.role !== "college_admin") {
      const url = request.nextUrl.clone();
      url.pathname = dashboardForRole(profile?.role);
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (isAuthRoute) {
      const isRoleAuthPage = pathname !== "/login" && pathname !== "/get-started";
      if (!isRoleAuthPage || pathname.includes("/login") || pathname.startsWith("/student/register")) {
        const targetDashboard = dashboardForRole(profile?.role);
        if (targetDashboard && !targetDashboard.includes("/login") && targetDashboard !== pathname) {
          const url = request.nextUrl.clone();
          url.pathname = targetDashboard;
          url.search = "";
          return NextResponse.redirect(url);
        }
      }
    }
  }

  return supabaseResponse;
}
