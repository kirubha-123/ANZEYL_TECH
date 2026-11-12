import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <h1 className="text-4xl font-extrabold text-white">Terms of Service</h1>
        <div className="glass-card p-8 rounded-2xl border border-slate-800 text-sm text-slate-300 space-y-4 leading-relaxed">
          <p>Last updated: October 2026</p>
          <p>
            Welcome to ANZEYL. By accessing our platform, you agree to comply with these Terms of Service.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">1. Academic Integrity</h2>
          <p>
            Users must complete skill assessments independently without unauthorized assistance, cheating, or automated bots. Proctored scores found in violation of integrity guidelines will be invalidated.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">2. Sample Content & Demonstrations</h2>
          <p>
            Course discount examples, reward calculations, and student testimonials displayed on public homepage sections are sample presentation materials for platform demonstration purposes.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
