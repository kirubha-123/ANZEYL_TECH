import { Suspense } from "react";
import { connection } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { dashboardForRole } from "@/lib/auth/roles";

async function MentorDashboardContent() {
  await connection();
  const cookieStore = await cookies();
  const demoRole = cookieStore.get("anzeyl_demo_role")?.value;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const isPlaceholder =
    supabaseUrl.includes("placeholder") ||
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key") === "placeholder-anon-key";

  let mentorName = "Mentor";

  if (isPlaceholder) {
    // Skip Supabase entirely when credentials are placeholders
    if (demoRole === "educator") {
      mentorName = "ANZEYL Faculty Mentor (Demo Workspace)";
    } else {
      redirect("/mentor/login");
    }
  } else {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      if (demoRole === "educator") {
        mentorName = "ANZEYL Faculty Mentor (Demo Workspace)";
      } else {
        redirect("/mentor/login");
      }
    } else {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", userData.user.id)
        .maybeSingle();
      if (profile?.role !== "educator") redirect(dashboardForRole(profile?.role));
      mentorName = profile.full_name || "Mentor";
    }
  }

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Welcome */}
        <div>
          <span className="badge-vibrant-rainbow inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Approved Educator
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-[#263746]">
            Welcome, {mentorName}
          </h1>
          <p className="mt-3 text-[#64748b] max-w-2xl">
            Your mentor account is active. Course and learner-management capabilities are governed by your educator permissions.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid gap-5 sm:grid-cols-2">
          <a href="/home" className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <h2 className="font-bold text-[#263746]">ANZEYL Workspace</h2>
            <p className="mt-2 text-sm text-[#64748b]">
              Return to the ANZEYL workspace while mentor tools are provisioned for your approved account.
            </p>
          </a>
          <a href="/portal/courses" className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <h2 className="font-bold text-[#263746]">Course Catalog</h2>
            <p className="mt-2 text-sm text-[#64748b]">
              Browse available courses on the platform.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MentorDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f5ef]" />}>
      <MentorDashboardContent />
    </Suspense>
  );
}
