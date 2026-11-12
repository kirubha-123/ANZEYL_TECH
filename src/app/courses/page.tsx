"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  TrophyIcon,
  ArrowRightIcon,
  StarIcon,
  ClockIcon,
  SearchIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  XIcon,
} from "@/components/Icons";

interface CourseItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  rating: number;
  totalStudents: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  discount: string;
  gradient: string;
  cardGlow: string;
  badgeStyle: string;
  description: string;
  skills: string[];
  modulesCount: number;
  curriculumPreview: string[];
}

const COURSES_DATA: CourseItem[] = [
  {
    id: "course-nextjs",
    title: "Mastering Next.js 16 & Full-Stack TypeScript",
    category: "Frontend Web",
    duration: "32 Hours",
    rating: 4.92,
    totalStudents: 3420,
    level: "Intermediate",
    discount: "Score ≥ 90% for 50% Off",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    cardGlow: "card-glow-cyan",
    badgeStyle: "badge-vibrant-cyan",
    description:
      "Learn Next.js 16 App Router, React Server Components, Server Actions, partial prefetching, Turbopack, and Tailwind CSS v4 to build high-performance web applications.",
    skills: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS v4", "Supabase SSR"],
    modulesCount: 8,
    curriculumPreview: [
      "Server vs Client Components Architecture",
      "Next.js 16 Partial Prerendering & Cache Components",
      "Type-safe Server Actions & Form Mutations",
      "Supabase Row Level Security & Session Middleware",
      "Production Optimization & Vercel Edge Deployment",
    ],
  },
  {
    id: "course-java",
    title: "Enterprise Java 21 & Spring Boot 3 Microservices",
    category: "Java Full Stack",
    duration: "45 Hours",
    rating: 4.88,
    totalStudents: 2890,
    level: "Advanced",
    discount: "Score ≥ 80% for 30% Off",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    cardGlow: "card-glow-amber",
    badgeStyle: "badge-vibrant-amber",
    description:
      "Build production microservices with Spring Data JPA, Apache Kafka streams, Docker containers, and PostgreSQL. Master concurrency with Java 21 Virtual Threads.",
    skills: ["Java 21", "Spring Boot 3", "Kafka", "Docker", "PostgreSQL", "JUnit 5"],
    modulesCount: 12,
    curriculumPreview: [
      "Java 21 Virtual Threads & Structured Concurrency",
      "RESTful Microservice Contracts & OpenAPI Spec",
      "Spring Data JPA with Connection Pooling & Indexing",
      "Event-Driven Architecture with Apache Kafka",
      "Resilience4j Circuit Breakers & Observability",
    ],
  },
  {
    id: "course-python",
    title: "Python 3.12 Backend & Async API Engineering",
    category: "Python & Automation",
    duration: "28 Hours",
    rating: 4.91,
    totalStudents: 4120,
    level: "Beginner",
    discount: "Score ≥ 70% for 15% Off",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    cardGlow: "card-glow-emerald",
    badgeStyle: "badge-vibrant-emerald",
    description:
      "Master Python fundamentals, FastAPI asynchronous routers, Pydantic validation, SQLAlchemy ORM, automated PyTest suites, and background task workers.",
    skills: ["Python 3.12", "FastAPI", "AsyncIO", "SQLAlchemy", "PyTest", "Celery"],
    modulesCount: 7,
    curriculumPreview: [
      "Python 3.12 Modern Syntax & Async Event Loop",
      "FastAPI Dependency Injection & Pydantic V2 Schemas",
      "Database Migrations with Alembic & PostgreSQL",
      "Authentication via OAuth2 & JWT Tokens",
      "Automated Integration Testing & Docker Packaging",
    ],
  },
  {
    id: "course-ai",
    title: "AI Systems Engineering: LLMs, RAG & Vector Databases",
    category: "AI / ML Engineering",
    duration: "40 Hours",
    rating: 4.96,
    totalStudents: 3150,
    level: "Advanced",
    discount: "Score ≥ 90% for 50% Off",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    cardGlow: "card-glow-rose",
    badgeStyle: "badge-vibrant-rose",
    description:
      "Develop enterprise RAG applications using LangChain, LangGraph agent workflows, Pinecone vector indexing, pgvector semantic search, and prompt optimization.",
    skills: ["LangChain", "RAG Pipelines", "Vector Search", "Pinecone", "OpenAI APIs", "PyTorch"],
    modulesCount: 10,
    curriculumPreview: [
      "Semantic Embeddings & Cosine Similarity Metrics",
      "Advanced Hybrid Retrieval (Dense + Sparse Reranking)",
      "Multi-Agent Orchestration with LangGraph",
      "Vector Index Tuning & Hallucination Mitigation",
      "Production Deployment with Streaming API Gateway",
    ],
  },
  {
    id: "course-devops",
    title: "Cloud DevOps Engineering: Kubernetes & Terraform",
    category: "Cloud & DevOps",
    duration: "36 Hours",
    rating: 4.89,
    totalStudents: 1980,
    level: "Intermediate",
    discount: "Score ≥ 80% for 30% Off",
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    cardGlow: "card-glow-violet",
    badgeStyle: "badge-vibrant-violet",
    description:
      "Design resilient cloud infrastructure on AWS. Write declarative Terraform modules, automate CI/CD with GitHub Actions, and deploy distributed microservices on Kubernetes.",
    skills: ["Kubernetes", "Docker", "Terraform", "AWS", "GitHub Actions", "Prometheus"],
    modulesCount: 9,
    curriculumPreview: [
      "Docker Multi-Stage Optimization & Image Security",
      "Kubernetes Pods, Services, Ingress & Helm Charts",
      "Infrastructure-as-Code with Terraform & AWS",
      "Automated Blue-Green Deployments with GitHub Actions",
      "Telemetry & Distributed Tracing with Grafana",
    ],
  },
  {
    id: "course-system-design",
    title: "High-Scale Distributed Systems Design",
    category: "System Design",
    duration: "30 Hours",
    rating: 4.95,
    totalStudents: 2750,
    level: "Advanced",
    discount: "Score ≥ 90% for 50% Off",
    gradient: "from-amber-400 via-rose-500 to-purple-600",
    cardGlow: "card-glow-amber",
    badgeStyle: "badge-vibrant-rainbow",
    description:
      "Prepare for staff/principal engineering interviews. Master caching patterns, sharding, consensus algorithms (Raft), rate limiters, and high-throughput messaging.",
    skills: ["Distributed Caching", "Sharding", "CAP Theorem", "Consensus", "Rate Limiting"],
    modulesCount: 8,
    curriculumPreview: [
      "High-Throughput Web Scalability & Load Balancing",
      "Database Sharding & Consistent Hashing",
      "Distributed Caching with Redis & Cache Invalidation",
      "Message Queues, Pub-Sub & Backpressure Management",
      "Real-World Architectures: Designing YouTube, Uber, Twitter",
    ],
  },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCourseForPreview, setSelectedCourseForPreview] = useState<CourseItem | null>(null);

  const categories = [
    "All",
    "Frontend Web",
    "Java Full Stack",
    "Python & Automation",
    "AI / ML Engineering",
    "Cloud & DevOps",
    "System Design",
  ];

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider shadow-lg">
            <BookOpenIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>Industry-Standard Curriculum</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Explore Industry-Aligned <span className="text-gradient-brand">Career Courses</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            All courses include 24/7 AI tutor guidance, automated hands-on capstone projects, 
            and score-based tuition discounts up to 50% via our Proctored Skill Assessment.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <SearchIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, framework, skill (e.g. Next.js, Kafka, RAG)..."
                className="human-input w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-slate-500"
              />
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Level:</span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedLevel === lvl
                      ? "bg-white/20 text-white border border-white/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "btn-colorful-primary text-white shadow-md scale-105"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>Showing <strong className="text-white">{filteredCourses.length}</strong> career courses</span>
          <Link href="/assessments" className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
            <TrophyIcon className="w-3.5 h-3.5" />
            <span>Score ≥ 70% on Skill Assessment to unlock discounts</span>
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className={`glass-card p-7 rounded-3xl border border-white/10 ${c.cardGlow} space-y-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-1`}
            >
              {/* Colorful Top Accent Strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${c.gradient}`} />

              <div className="space-y-4 pt-1">
                {/* Header with category and discount badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${c.badgeStyle}`}>
                    {c.category}
                  </span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    <TrophyIcon className="w-3.5 h-3.5" />
                    {c.discount}
                  </span>
                </div>

                {/* Course Title */}
                <h2 className="text-lg font-bold text-white leading-snug hover:text-cyan-300 transition-colors">
                  {c.title}
                </h2>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {c.description}
                </p>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#0b0e18] border border-white/10 text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Metadata Row */}
                <div className="flex items-center justify-between text-xs text-slate-300 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1.5 font-medium">
                    <ClockIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{c.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold">
                    <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-white font-bold">{c.rating}</span>
                    <span className="text-[11px] text-slate-400">({c.totalStudents})</span>
                  </div>
                  <span className="text-cyan-300 font-bold bg-white/5 px-2 py-0.5 rounded-md text-[11px]">
                    {c.level}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedCourseForPreview(c)}
                  className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer"
                >
                  Curriculum
                </button>
                <Link
                  href="/get-started"
                  className="btn-colorful-primary flex-1 py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:scale-[1.02] transition-all"
                >
                  <span>Enroll in Course</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="text-center pt-6">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 border border-white/15 max-w-3xl mx-auto space-y-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-white">Want to test your current skill level first?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Our 35-minute proctored adaptive assessment evaluates real code comprehension and rewards passing scores with up to 50% tuition reduction vouchers.
            </p>
            <Link
              href="/assessments"
              className="btn-colorful-amber inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:scale-105 transition-all"
            >
              <span>Take Free Proctored Assessment</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>

      {/* Course Curriculum Preview Modal */}
      {selectedCourseForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl human-surface p-7 rounded-3xl border border-white/15 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selectedCourseForPreview.gradient}`} />

            <div className="flex items-start justify-between border-b border-white/10 pb-4 pt-1">
              <div>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${selectedCourseForPreview.badgeStyle}`}>
                  {selectedCourseForPreview.category} • {selectedCourseForPreview.level}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  {selectedCourseForPreview.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{selectedCourseForPreview.duration}</span>
                  <span>•</span>
                  <span>{selectedCourseForPreview.modulesCount} Learning Modules</span>
                  <span>•</span>
                  <span className="text-amber-400">{selectedCourseForPreview.discount}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCourseForPreview(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close dialog"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Course Overview:
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedCourseForPreview.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpenIcon className="w-4 h-4 text-cyan-400" />
                  <span>Curriculum Highlights & Modules:</span>
                </h4>
                <div className="space-y-2">
                  {selectedCourseForPreview.curriculumPreview.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#0b0e18] border border-white/10 flex items-center gap-3 text-xs text-slate-200"
                    >
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <ShieldCheckIcon className="w-4 h-4" />
                  <span>Verified ANZEYL Accreditation</span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-relaxed">
                  Includes hands-on capstone review by industry staff engineers, downloadable course study notes, and verifiable digital certificate with 1-click LinkedIn export.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedCourseForPreview(null)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <Link
                href="/get-started"
                className="btn-colorful-primary px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
