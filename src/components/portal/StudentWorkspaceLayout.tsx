"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { Footer } from "@/components/Footer";
import { SparklesIcon, XIcon } from "@/components/Icons";

function SidebarFallback() {
  return <aside className="w-64 h-full bg-white border-r border-[#e5e7eb] animate-pulse" />;
}

function HeaderFallback() {
  return <header className="h-20 bg-white border-b border-[#e5e7eb] px-6 animate-pulse" />;
}

export function StudentWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f7f5ef] text-[#263746] overflow-hidden font-sans selection:bg-[#dcefea] selection:text-[#263746]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">
        <Suspense fallback={<SidebarFallback />}>
          <PortalSidebar />
        </Suspense>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl bg-white">
            <Suspense fallback={<SidebarFallback />}>
              <PortalSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </Suspense>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close navigation"
            className="absolute top-5 right-5 z-20 p-2 rounded-xl bg-white text-[#263746] hover:bg-slate-100 transition-colors shadow-md border border-[#e5e7eb]"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Suspense fallback={<HeaderFallback />}>
          <PortalHeader onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        </Suspense>

        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <Suspense fallback={<div className="animate-pulse p-8 bg-white border border-[#e5e7eb] rounded-3xl h-96" />}>
              {children}
            </Suspense>
          </div>
          <Footer />
        </main>
      </div>

      {/* Persistent Floating AI Learning Helper Pill */}
      <Link
        href="/portal/ai-tutor"
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#176b87] hover:bg-[#12566c] text-white text-xs font-bold shadow-lg shadow-[#176b87]/25 hover:scale-105 transition-all border border-white/20 group"
      >
        <span className="w-2 h-2 rounded-full bg-[#4c9a89] animate-pulse" />
        <SparklesIcon className="w-4 h-4 text-[#f2b880] group-hover:rotate-12 transition-transform" />
        <span>Ask AI Tutor</span>
      </Link>
    </div>
  );
}

