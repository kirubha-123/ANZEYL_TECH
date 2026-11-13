import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
        <div className="glass-card p-8 rounded-2xl border border-slate-800 text-sm text-slate-300 space-y-4 leading-relaxed">
          <p>Last updated: October 2026</p>
          <p>
            ANZEYL is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when using our platform.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">1. Data Collection</h2>
          <p>
            We collect account profile details, assessment scores, and AI tutor conversation logs solely to personalize learning paths and generate verified skill transcripts.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">2. Data Protection & Sharing</h2>
          <p>
            We do not sell personal data to third parties. Assessment transcripts are shared with institutional partners or hiring recruiters only with explicit user permission.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
