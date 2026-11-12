import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheckIcon, ArrowRightIcon, ZapIcon } from "@/components/Icons";

export default function AssessmentsPage() {
  const tests = [
    {
      title: "React 19 & Next.js 16 Adaptive Assessment",
      questions: "25 Timed Questions",
      time: "45 Mins",
      skills: ["Server Components", "State Management", "Routing", "TypeScript"],
      maxDiscount: "50% Off (Score 90%+)",
      level: "Intermediate / Advanced",
      gradient: "from-cyan-400 to-blue-600",
      cardGlow: "card-glow-cyan",
      badgeStyle: "badge-vibrant-cyan",
    },
    {
      title: "Java 21 & Spring Boot Core Benchmark",
      questions: "30 Timed Questions",
      time: "60 Mins",
      skills: ["Java Syntax", "Spring Data JPA", "REST Controllers", "PostgreSQL"],
      maxDiscount: "30% Off (Score 80%+)",
      level: "Intermediate",
      gradient: "from-amber-400 to-orange-500",
      cardGlow: "card-glow-amber",
      badgeStyle: "badge-vibrant-amber",
    },
    {
      title: "Python 3.12 Data Structures & Async IO",
      questions: "20 Timed Questions",
      time: "35 Mins",
      skills: ["Functions & Classes", "FastAPI", "Async IO", "Unit Testing"],
      maxDiscount: "15% Off (Score 70%+)",
      level: "Beginner / Intermediate",
      gradient: "from-emerald-400 to-teal-500",
      cardGlow: "card-glow-emerald",
      badgeStyle: "badge-vibrant-emerald",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            Proctored Evaluation Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Adaptive Tech <span className="text-gradient-gold">Skill Assessments</span>
          </h1>
          <p className="text-base text-slate-300">
            Benchmark your proficiency against industry standards, earn shareable credentials, and unlock tuition discount vouchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tests.map((test, idx) => (
            <div
              key={idx}
              className={`glass-card p-8 rounded-3xl border border-white/10 ${test.cardGlow} space-y-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl`}
            >
              {/* Top Colorful Accent Strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${test.gradient}`} />

              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${test.badgeStyle}`}>
                    {test.level}
                  </span>
                  <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-white hover:text-cyan-300 transition-colors">
                  {test.title}
                </h2>
                <div className="text-xs text-slate-300 flex gap-4 font-semibold">
                  <span>{test.questions}</span>
                  <span>•</span>
                  <span>Duration: {test.time}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0b0e18] border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2 shadow-inner">
                  <ZapIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Max Savings: <strong className="text-amber-300">{test.maxDiscount}</strong></span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/get-started"
                  className="btn-colorful-amber w-full py-3 rounded-xl text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Start Proctored Assessment</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
