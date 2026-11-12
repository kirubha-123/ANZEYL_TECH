import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { dashboardForRole } from "@/lib/auth/roles";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

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

  // IMPORTANT: Do NOT use supabase.auth.getSession() in middleware as it is insecure.
  // Use supabase.auth.getUser() instead.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isStudentRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/portal");
  const isMentorRoute = pathname.startsWith("/mentor/dashboard");
  const isAdminRoute = pathname === "/admin" || (pathname.startsWith("/admin/") && pathname !== "/admin/login");
  const isProtectedRoute = isStudentRoute || isMentorRoute || isAdminRoute;
  const isAuthRoute =
    pathname === "/login" ||
    pathname.startsWith("/get-started") ||
    pathname.startsWith("/student/login") ||
    pathname.startsWith("/student/register") ||
    pathname.startsWith("/mentor/login") ||
    pathname.startsWith("/mentor/register") ||
    pathname.startsWith("/admin/login");

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.startsWith("/admin") ? "/admin/login" : pathname.startsWith("/mentor") ? "/mentor/login" : "/student/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && (isProtectedRoute || pathname === "/" || isAuthRoute)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (isStudentRoute && profile?.role !== "student") {
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

    if (pathname === "/" || isAuthRoute) {
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
