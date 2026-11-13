"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { formatINR } from "@/lib/formatters";
import {
  GraduationCapIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
  TrophyIcon,
  UsersIcon,
  ShieldCheckIcon,
  StarIcon,
  ChevronDownIcon,
  CodeIcon,
  ZapIcon,
} from "@/components/Icons";

interface Program {
  id: string;
  title: string;
  badge: string;
  badgeStyle: string;
  gradient: string;
  duration: string;
  schedule: string;
  seatsRemaining: number;
  rating: number;
  totalReviews: number;
  mentor: {
    name: string;
    role: string;
    company: string;
    experience: string;
  };
  tuition: {
    fullPrice: number;
    currency: string;
    maxDiscountPercent: number;
  };
  overview: string;
  curriculum: {
    week: string;
    title: string;
    topics: string[];
    capstone: string;
  }[];
}

const TRAINING_PROGRAMS: Program[] = [
  {
    id: "fs-bootcamp",
    title: "Full-Stack Next.js 16 & React 19 Mastery Cohort",
    badge: "Flagship Career Accelerator",
    badgeStyle: "badge-vibrant-cyan",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    duration: "12 Weeks (Weekend Cohort)",
    schedule: "Saturdays & Sundays, 10:00 AM - 1:00 PM IST",
    seatsRemaining: 6,
    rating: 4.94,
    totalReviews: 320,
    mentor: {
      name: "Aditya Verma",
      role: "Principal Frontend Architect",
      company: "Ex-Razorpay & CloudScale",
      experience: "11+ Years",
    },
    tuition: {
      fullPrice: 24999,
      currency: "₹",
      maxDiscountPercent: 50,
    },
    overview:
      "A hands-on, production-grade cohort taking developers from basic React knowledge to high-performance Next.js 16 App Router, React Server Components, Turbopack, Supabase SSR, and multi-tenant SaaS architecture.",
    curriculum: [
      {
        week: "Weeks 1 - 3",
        title: "React 19 Deep Dive, Async Transitions & Component Patterns",
        topics: ["Action hooks (useActionState, useOptimistic)", "Compiler optimizations", "Custom state primitives", "Accessible UI design systems"],
        capstone: "High-frequency stock trading dashboard with real-time optimistic updates",
      },
      {
        week: "Weeks 4 - 6",
        title: "Next.js 16 App Router, Partial Prerendering & Server Actions",
        topics: ["Server vs Client boundary optimization", "Streaming SSR with Suspense", "Turbopack bundle tuning", "Route handlers & middleware proxy"],
        capstone: "Full-stack e-commerce marketplace with dynamic search and instant checkout",
      },
      {
        week: "Weeks 7 - 9",
        title: "Database Engineering with Supabase, PostgreSQL & Vector Search",
        topics: ["Relational schema design", "Row Level Security (RLS) policies", "Database triggers & functions", "pgvector semantic embeddings"],
        capstone: "Multi-tenant project management SaaS with role-based access control",
      },
      {
        week: "Weeks 10 - 12",
        title: "Production Deployment, CI/CD, Telemetry & Placement Fast-Track",
        topics: ["Automated testing with Playwright", "Docker multi-stage builds", "Edge caching & CDN rules", "Mock technical interviews & PPO referrals"],
        capstone: "Production deployment with automated monitoring, alerts, and performance score > 98",
      },
    ],
  },
  {
    id: "ai-bootcamp",
    title: "Generative AI Systems & Autonomous Agents Engineering",
    badge: "High-Demand AI Track",
    badgeStyle: "badge-vibrant-rose",
    gradient: "from-rose-500 via-pink-500 to-purple-600",
    duration: "10 Weeks (Weekday Evenings)",
    schedule: "Tuesdays & Thursdays, 7:30 PM - 9:30 PM IST",
    seatsRemaining: 4,
    rating: 4.96,
    totalReviews: 240,
    mentor: {
      name: "Dr. Rohini Sundaram",
      role: "Lead AI Research Scientist",
      company: "AI Frontier Labs",
      experience: "13+ Years",
    },
    tuition: {
      fullPrice: 29999,
      currency: "₹",
      maxDiscountPercent: 50,
    },
    overview:
      "Master modern LLM application architecture: build production RAG systems, integrate vector search engines, fine-tune open weights models, and orchestrate multi-agent task execution pipelines.",
    curriculum: [
      {
        week: "Weeks 1 - 2",
        title: "LLM Fundamentals, Prompt Engineering & Embeddings",
        topics: ["Tokenization & attention mechanisms", "Semantic embeddings", "Cosine similarity & distance metrics", "Structured output extraction"],
        capstone: "Domain-specific document ingestion & summarization engine",
      },
      {
        week: "Weeks 3 - 5",
        title: "Advanced RAG Pipelines & Vector Databases",
        topics: ["Hybrid keyword + vector retrieval", "Chunking strategies & re-ranking", "Pinecone & pgvector index tuning", "Hallucination mitigation guards"],
        capstone: "Enterprise legal document Q&A copilot with source citations",
      },
      {
        week: "Weeks 6 - 8",
        title: "Autonomous Agent Architectures & Tool Use",
        topics: ["LangGraph & CrewAI workflows", "ReAct reasoning loops", "Function calling & tool sandboxing", "Human-in-the-loop approvals"],
        capstone: "Autonomous software testing & bug auto-fix agent",
      },
      {
        week: "Weeks 9 - 10",
        title: "Model Fine-Tuning, Quantization & Edge Deployment",
        topics: ["LoRA / QLoRA fine-tuning", "vLLM high-throughput serving", "Inference optimization & latency", "Production AI red-teaming"],
        capstone: "Self-hosted quantized model deployment with streaming API gateway",
      },
    ],
  },
  {
    id: "java-bootcamp",
    title: "Enterprise Java 21 & Distributed Microservices",
    badge: "Enterprise Standard",
    badgeStyle: "badge-vibrant-amber",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    duration: "14 Weeks (Weekend Cohort)",
    schedule: "Saturdays & Sundays, 2:00 PM - 5:00 PM IST",
    seatsRemaining: 9,
    rating: 4.88,
    totalReviews: 290,
    mentor: {
      name: "Siddharth Nambiar",
      role: "Staff Backend Engineer",
      company: "Morgan Financial Tech",
      experience: "12+ Years",
    },
    tuition: {
      fullPrice: 26999,
      currency: "₹",
      maxDiscountPercent: 40,
    },
    overview:
      "Prepare for senior backend roles at top banking, fintech, and enterprise product firms. Master Spring Boot 3, Spring Data JPA, Apache Kafka streams, resilience patterns, and Kubernetes orchestration.",
    curriculum: [
      {
        week: "Weeks 1 - 3",
        title: "Modern Java 21 Syntax & Concurrency",
        topics: ["Virtual Threads (Project Loom)", "Pattern matching & records", "Sequenced collections", "JVM memory profiling & GC tuning"],
        capstone: "Ultra-low latency memory cache server with concurrent access benchmark",
      },
      {
        week: "Weeks 4 - 7",
        title: "Spring Boot 3 Microservices & Hibernate ORM",
        topics: ["REST API contracts & OpenAPI spec", "Optimistic vs Pessimistic locking", "Spring Security 6 with JWT", "Flyway database migrations"],
        capstone: "Banking account management service with audited ledger transactions",
      },
      {
        week: "Weeks 8 - 11",
        title: "Event-Driven Architecture with Apache Kafka",
        topics: ["Topic partitioning & consumer groups", "Idempotent producers", "Saga orchestration pattern", "Dead letter queues & retry topics"],
        capstone: "High-volume order processing pipeline handling 10,000 events/sec",
      },
      {
        week: "Weeks 12 - 14",
        title: "Resilience, Docker Containers & Cloud Deployment",
        topics: ["Resilience4j circuit breakers", "Distributed tracing with OpenTelemetry", "Docker multi-stage builds", "Kubernetes pod autoscaling"],
        capstone: "Production-ready distributed banking microservices ecosystem",
      },
    ],
  },
];

export default function TrainingProgramsPage() {
  const [activeProgramId, setActiveProgramId] = useState<string>("fs-bootcamp");
  const [expandedCurriculumWeek, setExpandedCurriculumWeek] = useState<number | null>(0);
  const [simulatedScore, setSimulatedScore] = useState<number>(85);

  const selectedProgram =
    TRAINING_PROGRAMS.find((p) => p.id === activeProgramId) || TRAINING_PROGRAMS[0];

  // Dynamic Discount calculation based on assessment score
  let discountPercent = 0;
  if (simulatedScore >= 90) {
    discountPercent = selectedProgram.tuition.maxDiscountPercent;
  } else if (simulatedScore >= 80) {
    discountPercent = Math.min(30, selectedProgram.tuition.maxDiscountPercent);
  } else if (simulatedScore >= 70) {
    discountPercent = Math.min(15, selectedProgram.tuition.maxDiscountPercent);
  }

  const discountedTuition = Math.round(
    selectedProgram.tuition.fullPrice * (1 - discountPercent / 100)
  );

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-14">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider shadow-lg">
            <GraduationCapIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>Mentor-Led Cohort Programs</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Production Engineering <span className="text-gradient-brand">Training Cohorts</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            Live interactive classes, weekly code reviews by principal engineers, real client capstone projects, 
            and score-linked tuition fee discounts up to 50%.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <UsersIcon className="w-4 h-4 text-cyan-400" />
              Limited to 25 Learners per Cohort
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <TrophyIcon className="w-4 h-4 text-amber-400" />
              Pre-Placement Referrals Included
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
              100% Money-Back Satisfaction Guarantee
            </span>
          </div>
        </div>

        {/* Program Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2">
          {TRAINING_PROGRAMS.map((prog) => (
            <button
              key={prog.id}
              onClick={() => {
                setActiveProgramId(prog.id);
                setExpandedCurriculumWeek(0);
              }}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeProgramId === prog.id
                  ? "btn-colorful-primary text-white shadow-xl scale-105"
                  : "glass-card text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              {prog.title.split("&")[0]}
            </button>
          ))}
        </div>

        {/* Active Program Showcase Card */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/15 space-y-8 relative overflow-hidden shadow-2xl">
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selectedProgram.gradient}`} />

          {/* Top Title & Metadata */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-white/10 pb-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedProgram.badgeStyle}`}>
                  {selectedProgram.badge}
                </span>
                <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                  <StarIcon className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  {selectedProgram.rating} ({selectedProgram.totalReviews} Alumni Reviews)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedProgram.title}
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                {selectedProgram.overview}
              </p>
            </div>

            {/* Quick Cohort Badge & Timing */}
            <div className="p-4 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-2 lg:text-right shrink-0">
              <div className="flex items-center lg:justify-end gap-1.5 text-xs text-rose-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>Only {selectedProgram.seatsRemaining} Seats Remaining</span>
              </div>
              <div className="text-xs text-slate-300 flex items-center lg:justify-end gap-1.5 font-medium">
                <ClockIcon className="w-4 h-4 text-cyan-400" />
                <span>{selectedProgram.duration}</span>
              </div>
              <p className="text-[11px] text-slate-400">{selectedProgram.schedule}</p>
            </div>
          </div>

          {/* 2-Column Details: Curriculum on Left, Tuition & Mentor on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Weekly Curriculum Roadmap */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CodeIcon className="w-5 h-5 text-cyan-400" />
                  <span>Curriculum & Milestone Roadmaps</span>
                </h3>
                <span className="text-xs text-slate-400">Click to expand week</span>
              </div>

              <div className="space-y-3">
                {selectedProgram.curriculum.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#0b0e18] overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedCurriculumWeek(expandedCurriculumWeek === idx ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/10 text-cyan-300">
                          {item.week}
                        </span>
                        <span className="text-sm font-bold text-white">
                          {item.title}
                        </span>
                      </div>
                      <ChevronDownIcon
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          expandedCurriculumWeek === idx ? "rotate-180 text-cyan-400" : ""
                        }`}
                      />
                    </button>

                    {expandedCurriculumWeek === idx && (
                      <div className="p-4 pt-1 border-t border-white/5 space-y-3 bg-[#0d111d]">
                        <div className="space-y-1.5">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Key Competencies Covered:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {item.topics.map((t, tIdx) => (
                              <div key={tIdx} className="flex items-center gap-1.5 text-xs text-slate-300">
                                <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
                          <TrophyIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-cyan-300 block">Milestone Capstone:</strong>
                            <span>{item.capstone}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Tuition Discount Calculator & Mentor Card */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Interactive Tuition Discount Calculator */}
              <div className="p-6 rounded-3xl bg-[#121626] border border-amber-500/30 space-y-5 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <ZapIcon className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-bold text-white">Assessment Tuition Discount</h4>
                  </div>
                  <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    Up to {selectedProgram.tuition.maxDiscountPercent}% Off
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Simulate Assessment Score:</span>
                    <strong className="text-cyan-300 text-sm font-black">{simulatedScore}%</strong>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={simulatedScore}
                    onChange={(e) => setSimulatedScore(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>50% (Baseline)</span>
                    <span>70% (15% Off)</span>
                    <span>80% (30% Off)</span>
                    <span>90%+ (50% Off)</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-[#0b0e18] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block line-through">
                      Standard: {formatINR(selectedProgram.tuition.fullPrice)}
                    </span>
                    <div className="text-2xl font-black text-white">
                      {formatINR(discountedTuition)}
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {discountPercent > 0 ? `${discountPercent}% Fee Reduction` : "Standard Fee"}
                  </span>
                </div>

                <Link
                  href="/assessments"
                  className="btn-colorful-amber w-full py-3 rounded-xl text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <span>Qualify with Proctored Assessment</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Lead Instructor / Mentor Card */}
              <div className="p-6 rounded-3xl bg-[#0b0e18] border border-white/10 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Lead Instructor & Mentor
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 p-[2px] shadow-md shrink-0">
                    <div className="w-full h-full rounded-[14px] bg-[#121626] flex items-center justify-center font-bold text-base text-white">
                      {selectedProgram.mentor.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{selectedProgram.mentor.name}</h4>
                    <p className="text-xs text-cyan-300 font-semibold">{selectedProgram.mentor.role}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {selectedProgram.mentor.company} • {selectedProgram.mentor.experience}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
                  <SparklesIcon className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>1-on-1 weekly code review and portfolio feedback included.</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
