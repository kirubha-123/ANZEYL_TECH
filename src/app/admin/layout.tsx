"use client";

import React, { useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Footer } from "@/components/Footer";
import { XIcon } from "@/components/Icons";

function SidebarFallback() {
  return <aside className="w-64 h-full bg-[#090c15] border-r border-white/10 animate-pulse" />;
}

function HeaderFallback() {
  return <header className="h-20 bg-[#070911]/90 border-b border-white/10 px-6 animate-pulse" />;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#f7f5ef] text-[#263746] overflow-hidden font-sans selection:bg-[#dcefea] selection:text-[#263746]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">
        <Suspense fallback={<SidebarFallback />}>
          <AdminSidebar />
        </Suspense>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl">
            <Suspense fallback={<SidebarFallback />}>
              <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </Suspense>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close admin menu"
            className="absolute top-5 right-5 z-20 p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Admin Content Body */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <Suspense fallback={<HeaderFallback />}>
          <AdminHeader onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        </Suspense>

        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <Suspense fallback={<div className="animate-pulse p-8 bg-[#0f1424] rounded-3xl h-96" />}>
              {children}
            </Suspense>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
