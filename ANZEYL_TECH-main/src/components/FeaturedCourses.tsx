"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  StarIcon,
  ClockIcon,
  UsersIcon,
  TrophyIcon,
  ArrowRightIcon,
  HelpCircleIcon,
} from "./Icons";

export const FeaturedCourses: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const courses = [
    {
      id: "nextjs-mastery",
      title: "Mastering Next.js 16 & Full-Stack TypeScript",
      category: "frontend",
      level: "Intermediate",
      rating: 4.9,
      reviews: 1280,
      students: "6,400+",
      duration: "32 Hours",
      skills: ["Next.js 16", "App Router", "TypeScript", "Tailwind v4", "Prisma"],
      discountRequiredScore: "90% for 50% Off",
      tier: "Platinum Eligible",
      gradient: "from-cyan-400 via-sky-500 to-blue-600",
      cardGlow: "card-glow-cyan",
      badgeStyle: "badge-vibrant-amber",
      description: "Build high-performance full-stack web applications with server actions, modern caching, and production deployment.",
    },
    {
      id: "cloud-devops",
      title: "AWS Cloud Architecture & Kubernetes DevOps",
      category: "cloud",
      level: "Advanced",
      rating: 4.8,
      reviews: 940,
      students: "5,100+",
      duration: "45 Hours",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      discountRequiredScore: "80% for 30% Off",
      tier: "Gold Eligible",
      gradient: "from-amber-400 via-orange-500 to-red-500",
      cardGlow: "card-glow-amber",
      badgeStyle: "badge-vibrant-amber",
      description: "Architect resilient cloud solutions, automate CI/CD pipelines, orchestrate microservices, and manage AWS infrastructure.",
    },
    {
      id: "python-automation",
      title: "Python 3.12 Backend & API Engineering",
      category: "python",
      level: "Beginner",
      rating: 4.9,
      reviews: 1850,
      students: "9,800+",
      duration: "28 Hours",
      skills: ["Python 3.12", "FastAPI", "SQLAlchemy", "AsyncIO", "PyTest"],
      discountRequiredScore: "70% for 15% Off",
      tier: "Silver Eligible",
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
      cardGlow: "card-glow-emerald",
      badgeStyle: "badge-vibrant-cyan",
      description: "From fundamentals to building scalable async REST APIs with automated testing and database ORM integrations.",
    },
    {
      id: "data-analytics",
      title: "Modern Data Engineering & Predictive Analytics",
      category: "datascience",
      level: "Intermediate",
      rating: 4.7,
      reviews: 720,
      students: "4,300+",
      duration: "36 Hours",
      skills: ["Pandas", "PySpark", "Snowflake", "dbt", "SQL"],
      discountRequiredScore: "80% for 30% Off",
      tier: "Gold Eligible",
      gradient: "from-violet-500 via-purple-500 to-indigo-600",
      cardGlow: "card-glow-violet",
      badgeStyle: "badge-vibrant-amber",
      description: "Clean large-scale datasets, construct data warehouses, write dbt transformations, and build executive dashboards.",
    },
    {
      id: "ai-rag-llm",
      title: "AI Systems Engineering: LLMs, RAG & Vector DBs",
      category: "aiml",
      level: "Advanced",
      rating: 4.95,
      reviews: 2100,
      students: "8,900+",
      duration: "40 Hours",
      skills: ["PyTorch", "LangChain", "Pinecone", "OpenAI API", "LlamaIndex"],
      discountRequiredScore: "90% for 50% Off",
      tier: "Platinum Eligible",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
      cardGlow: "card-glow-rose",
      badgeStyle: "badge-vibrant-amber",
      description: "Implement Retrieval-Augmented Generation (RAG), fine-tune open-weights models, and build intelligent AI agent workflows.",
    },
    {
      id: "design-systems",
      title: "UI/UX Architecture & Figma Design Systems",
      category: "uiux",
      level: "Beginner",
      rating: 4.85,
      reviews: 610,
      students: "3,700+",
      duration: "24 Hours",
      skills: ["Figma", "Design Tokens", "Accessibility", "Component Specs"],
      discountRequiredScore: "70% for 15% Off",
      tier: "Silver Eligible",
      gradient: "from-pink-500 via-amber-400 to-yellow-400",
      cardGlow: "card-glow-amber",
      badgeStyle: "badge-vibrant-cyan",
      description: "Construct scalable design component libraries with dark/light mode tokens and seamless developer handoff specs.",
    },
  ];

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((c) => c.category === filter);

  return (
    <section className="py-24 bg-colorful-mesh relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
              Featured Curriculum Tracks
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263746] tracking-tight">
              Explore Our <span className="text-gradient-brand">Career-Focused Courses</span>
            </h2>
            <p className="text-base sm:text-lg text-[#526675]">
              Each course includes 24/7 AI Tutor assistance, automated lab projects, and assessment discount opportunities.
            </p>
          </div>

          {/* Sample Content Disclosure */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0b0e18] border border-white/10 text-xs text-slate-300 shadow-md">
            <HelpCircleIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Sample course catalog for demonstration</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 overflow-x-auto pb-2">
          {[
            { id: "all", label: "All Specializations" },
            { id: "frontend", label: "Frontend Web" },
            { id: "cloud", label: "Cloud & DevOps" },
            { id: "python", label: "Python & APIs" },
            { id: "datascience", label: "Data Science" },
            { id: "aiml", label: "AI & ML" },
            { id: "uiux", label: "UI / UX Design" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilter(pill.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === pill.id
                  ? "btn-colorful-primary text-white shadow-lg"
                  : "bg-[#0b0e18] text-slate-300 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`glass-card rounded-2xl ${course.cardGlow} flex flex-col justify-between overflow-hidden group relative transition-all duration-300`}
            >
              {/* Top Colorful Accent Strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${course.gradient}`} />

              <div className="p-7 space-y-5">
                
                {/* Badges Bar */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-bold">
                    {course.level}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${course.badgeStyle}`}>
                    <TrophyIcon className="w-3.5 h-3.5" />
                    <span>{course.tier}</span>
                  </span>
                </div>

                {/* Course Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-colors">
                    {course.title}
                  </h3>
                  <p className="course-subcontent !text-slate-300 mt-2.5 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {course.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Course Metadata (Duration, Students, Rating) */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-center gap-1 text-slate-400">
                      <ClockIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Duration</span>
                    </div>
                    <span className="font-bold text-white">{course.duration}</span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center justify-center gap-1 text-slate-400">
                      <UsersIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Learners</span>
                    </div>
                    <span className="font-bold text-white">{course.students}</span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center justify-center gap-1 text-slate-400">
                      <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Rating</span>
                    </div>
                    <span className="font-bold text-white">{course.rating}</span>
                  </div>
                </div>

              </div>

              {/* Card Footer Action */}
              <div className="p-4 bg-[#0b0e18] border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">
                  {course.discountRequiredScore}
                </span>
                <Link
                  href={`/courses/${course.id}`}
                  className="btn-colorful-primary px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-all"
                >
                  <span>Enroll</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
