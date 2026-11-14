import { goalToCourseSlug } from "./courseData";

export const LOCAL_ENROLLMENT_KEY = "anzeyl_student_enrolled_courses";

/**
 * Returns the scoped storage key for a specific user.
 * Example: `anzeyl_enrolled_user@example.com`
 */
export function getUserEnrollmentKey(emailOrId?: string | null): string {
  if (emailOrId && emailOrId.trim() && emailOrId !== "guest") {
    return `anzeyl_enrolled_${emailOrId.trim().toLowerCase()}`;
  }
  if (typeof window !== "undefined") {
    const storedEmail = localStorage.getItem("anzeyl_user_email");
    if (storedEmail && storedEmail.trim()) {
      return `anzeyl_enrolled_${storedEmail.trim().toLowerCase()}`;
    }
  }
  return "anzeyl_enrolled_guest";
}

/**
 * Returns the list of enrolled course slugs for the active or given user.
 * If user has no enrollments yet, automatically initializes to their primary goal domain!
 */
export function getUserEnrolledSlugs(
  emailOrId?: string | null,
  fallbackGoal?: string | null,
  isGuest?: boolean
): string[] {
  if (typeof window === "undefined") return [];
  if (isGuest) return [];

  const userKey = getUserEnrollmentKey(emailOrId);
  try {
    const raw = localStorage.getItem(userKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    // Check if userGoal was provided or stored
    let goal = fallbackGoal;
    if (!goal) {
      goal = localStorage.getItem("anzeyl_user_goal");
    }
    const defaultSlug = goalToCourseSlug(goal);

    // Save only their chosen single domain for this user
    if (userKey !== "anzeyl_enrolled_guest") {
      localStorage.setItem(userKey, JSON.stringify([defaultSlug]));
      localStorage.setItem(LOCAL_ENROLLMENT_KEY, JSON.stringify([defaultSlug]));
    }
    return [defaultSlug];
  } catch {
    const defaultSlug = goalToCourseSlug(fallbackGoal);
    return [defaultSlug];
  }
}

/**
 * Enroll a user into a new course slug.
 */
export function recordCourseEnrollment(slugOrId: string, emailOrId?: string | null): string[] {
  if (typeof window === "undefined") return [slugOrId];
  const userKey = getUserEnrollmentKey(emailOrId);
  const current = getUserEnrolledSlugs(emailOrId, null, false);
  const updated = Array.from(new Set([...current, slugOrId]));
  try {
    localStorage.setItem(userKey, JSON.stringify(updated));
    localStorage.setItem(LOCAL_ENROLLMENT_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota
  }
  return updated;
}

/**
 * Clear session enrollments on sign out.
 */
export function clearActiveSessionEnrollments(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCAL_ENROLLMENT_KEY);
  } catch {
    // Ignore
  }
}
