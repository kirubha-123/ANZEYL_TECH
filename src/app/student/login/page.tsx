import { RoleLoginForm } from "@/components/auth/RoleLoginForm";

export default function StudentLoginPage() {
  return <RoleLoginForm entry="student" allowedRole="student" title="Student login" />;
}
