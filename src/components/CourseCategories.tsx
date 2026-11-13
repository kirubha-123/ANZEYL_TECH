"use client";

import React from "react";
import Link from "next/link";
import {
  CodeIcon,
  CpuIcon,
  DatabaseIcon,
  PaletteIcon,
  BookOpenIcon,
  ArrowRightIcon,
  UsersIcon,
} from "./Icons";

export const CourseCategories: React.FC = () => {
  const categories = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: CodeIcon,
      skills: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS"],
      courseCount: "12 Courses",
      learners: "14,200+ Students",
      gradient: "from-cyan-400 via-sky-500 to-blue-600",
      cardGlow: "card-glow-cyan",
      chipStyle: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      description: "Master modern web architectures, component design, responsive styling, and server-side rendering.",
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      icon: CpuIcon,
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      courseCount: "10 Courses",
      learners: "15,400+ Students",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      cardGlow: "card-glow-amber",
      chipStyle: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      description: "Architect resilient cloud solutions, automate CI/CD pipelines, containerize microservices, and manage AWS infrastructure.",
    },
    {
      id: "python",
      title: "Python & Automation",
      icon: CodeIcon,
      skills: ["Python 3.12", "FastAPI", "AsyncIO", "Web Scraping"],
      courseCount: "9 Courses",
      learners: "22,400+ Students",
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
      cardGlow: "card-glow-emerald",
      chipStyle: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      description: "Develop automated scripts, backend services, clean object-oriented programs, and data pipelines.",
    },
    {
      id: "datascience",
      title: "Data Science & Analytics",
      icon: DatabaseIcon,
      skills: ["Pandas", "NumPy", "SQL", "PowerBI", "Stats"],
      courseCount: "8 Courses",
      learners: "11,500+ Students",
      gradient: "from-violet-500 via-purple-500 to-indigo-600",
      cardGlow: "card-glow-violet",
      chipStyle: "bg-violet-500/10 text-violet-300 border-violet-500/30",
      description: "Extract insights from complex datasets, construct predictive models, and design business dashboards.",
    },
    {
      id: "aiml",
      title: "AI & ML Engineering",
      icon: CpuIcon,
      skills: ["PyTorch", "LLMs", "RAG Systems", "Prompt Design"],
      courseCount: "11 Courses",
      learners: "16,800+ Students",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
      cardGlow: "card-glow-rose",
      chipStyle: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      description: "Train neural networks, fine-tune open source LLMs, build RAG applications, and deploy AI models.",
    },
    {
      id: "uiux",
      title: "UI / UX Design & Systems",
      icon: PaletteIcon,
      skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
      courseCount: "7 Courses",
      learners: "9,300+ Students",
      gradient: "from-pink-500 via-amber-400 to-yellow-400",
      cardGlow: "card-glow-amber",
      chipStyle: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
      description: "Design pixel-perfect interfaces, craft accessible design systems, and execute interactive usability testing.",
    },
  ];

  return (
    <section className="py-24 bg-colorful-mesh relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
              Explore Industry Domains
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              High-Demand <span className="text-gradient-brand">Career Specializations</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Curated course categories structured around real industry job roles and assessment benchmarks.
            </p>
          </div>

          <Link
            href="/courses"
            className="btn-colorful-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-all"
          >
            <span>Browse All Courses</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className={`glass-card p-7 rounded-2xl ${cat.cardGlow} flex flex-col justify-between group relative overflow-hidden transition-all duration-300`}
              >
                {/* Colorful top border strip */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cat.gradient}`} />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.gradient} p-3.5 shadow-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/15">
                      <BookOpenIcon className="w-3.5 h-3.5 text-amber-300" />
                      <span>{cat.courseCount}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="course-subcontent !text-slate-300 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${cat.chipStyle}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <UsersIcon className="w-4 h-4 text-emerald-400" />
                    <span>{cat.learners}</span>
                  </div>
                  <Link
                    href={`/courses?category=${cat.id}`}
                    className="text-xs font-bold text-cyan-400 group-hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Track</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
