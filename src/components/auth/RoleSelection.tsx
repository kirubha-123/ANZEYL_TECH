import Link from "next/link";
import { AuthBrand } from "@/components/auth/AuthBrand";
import { Footer } from "@/components/Footer";

const roles = [
  { title: "Student", description: "Learn, practice, assess and build your career.", href: "/student/login", action: "Student login", register: "/student/register" },
  { title: "Mentor", description: "Support learners through approved educator access.", href: "/mentor/login", action: "Mentor login", register: "/mentor/register" },
  { title: "Admin", description: "Manage ANZEYL SOLUTIONS operations and learning programs.", href: "/admin/login", action: "Admin login", register: null },
];

export function RoleSelection() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#263746] flex flex-col font-sans">
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-5xl flex-col justify-center">
          <div className="mx-auto w-full max-w-2xl text-center">
            <AuthBrand />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 mt-4 px-4 py-1.5 rounded-full bg-white border border-[#e5e7eb] text-xs font-bold text-[#176b87] hover:bg-[#176b87]/10 transition-colors shadow-xs"
            >
              <span>← Return to Home Page</span>
            </Link>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">Choose your learning workspace</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#64748b] sm:text-base">Sign in to continue to your ANZEYL SOLUTIONS workspace.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {roles.map((role) => (
              <div key={role.title} className="glass-card flex flex-col rounded-2xl p-6">
                <h2 className="text-xl font-bold">{role.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748b]">{role.description}</p>
                <Link href={role.href} className="btn-colorful-primary mt-6 rounded-xl px-4 py-3 text-center text-sm font-bold text-white">{role.action}</Link>
                {role.register && <Link href={role.register} className="mt-3 text-center text-xs font-bold text-[#176b87] hover:underline">{role.title === "Student" ? "Create student account" : "Mentor onboarding information"}</Link>}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/" className="text-sm font-semibold text-[#64748b] hover:text-[#176b87] transition-colors">
              ← Back to ANZEYL SOLUTIONS Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
