export type AppRole = "student" | "educator" | "college_admin";

export const ROLE_DASHBOARDS: Record<AppRole, string> = {
  student: "/dashboard",
  educator: "/mentor/dashboard",
  college_admin: "/admin",
};

export function dashboardForRole(role: string | null | undefined) {
  return role && role in ROLE_DASHBOARDS
    ? ROLE_DASHBOARDS[role as AppRole]
    : "/student/login";
}

export function roleAllowsEntry(role: string | null | undefined, entry: "student" | "mentor" | "admin") {
  if (entry === "student") return role === "student";
  if (entry === "mentor") return role === "educator";
  return role === "college_admin";
}
