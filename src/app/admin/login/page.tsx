import { RoleLoginForm } from "@/components/auth/RoleLoginForm";

export default function AdminLoginPage() {
  return <RoleLoginForm entry="admin" allowedRole="college_admin" title="Admin login" />;
}
