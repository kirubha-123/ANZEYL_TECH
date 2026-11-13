import { RoleLoginForm } from "@/components/auth/RoleLoginForm";

export default function MentorLoginPage() {
  return <RoleLoginForm entry="mentor" allowedRole="educator" title="Mentor login" />;
}
