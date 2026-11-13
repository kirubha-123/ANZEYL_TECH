import Link from "next/link";
import { AuthBrand } from "@/components/auth/AuthBrand";

export default function MentorRegisterPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] px-4 py-12 text-[#263746] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-lg flex-col justify-center text-center">
        <AuthBrand />
        <div className="flex items-center justify-center gap-4 mt-4 text-xs font-bold">
          <Link href="/" className="text-[#176b87] hover:underline flex items-center gap-1">
            <span>← Return to Home</span>
          </Link>
          <span className="text-[#64748b]">•</span>
          <Link href="/login" className="text-[#64748b] hover:text-[#17191D] hover:underline">
            Choose workspace
          </Link>
        </div>
        <span className="badge-vibrant-rainbow mx-auto mt-6 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">Mentor onboarding</span>
        <h1 className="mt-5 text-3xl font-extrabold">Mentor access is approval-based</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#64748b]">Mentor accounts use the existing approved educator role. Public role changes and public admin registration are disabled.</p>
        <div className="human-surface mt-7 rounded-2xl p-6 text-sm leading-relaxed text-[#64748b]">Contact the ANZEYL academic operations team for an invitation or onboarding approval before signing in.</div>
        <Link href="/mentor/login" className="btn-colorful-primary mx-auto mt-6 rounded-xl px-5 py-3 font-bold text-white">Go to mentor login</Link>
      </div>
    </main>
  );
}
