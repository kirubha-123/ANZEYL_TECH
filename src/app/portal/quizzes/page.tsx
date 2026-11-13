"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  ZapIcon,
  BookOpenIcon,
  ChevronRightIcon,
} from "@/components/Icons";

interface MockQuiz {
  id: string;
  courseTitle: string;
  courseSlug: string;
  title: string;
  questionsCount: number;
  durationMins: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  passingScore: number;
  voucherBonus: string;
  attemptsLeft: number;
  overview: string;
  topicsCovered: string[];
}

const ALL_MOCK_TESTS: MockQuiz[] = [
  {
    id: "react-mastery",
    courseTitle: "Full Stack Development",
    courseSlug: "full-stack-development",
    title: "React 19, Next.js 16 & Full-Stack Node.js Architecture",
    questionsCount: 15,
    durationMins: 25,
    difficulty: "Advanced",
    category: "Full Stack Development",
    passingScore: 70,
    voucherBonus: "Up to 50% Merit Tuition Discount",
    attemptsLeft: 3,
    overview:
      "Assesses end-to-end modern full-stack web engineering including React 19 Server Components, App Router streaming, REST APIs, and PostgreSQL Row-Level Security.",
    topicsCovered: [
      "React 19 Compiler, Server Actions & useActionState",
      "Next.js App Router (PPR, Suspense & Dynamic Routing)",
      "Node.js & Express RESTful API Patterns",
      "PostgreSQL Database Modelling & Supabase RLS",
      "JWT Security, CORS Configuration & Token Refresh",
    ],
  },
  {
    id: "ai-agent-engineering",
    courseTitle: "AI & Machine Learning",
    courseSlug: "ai-and-machine-learning",
    title: "Autonomous LLM Agents, PyTorch & RAG Architectures",
    questionsCount: 15,
    durationMins: 30,
    difficulty: "Advanced",
    category: "AI & Machine Learning",
    passingScore: 75,
    voucherBonus: "Up to 50% Merit Tuition Discount",
    attemptsLeft: 3,
    overview:
      "Tests understanding of retrieval-augmented generation (RAG), vector embeddings, agentic loop tool calling, and PyTorch deep neural network training pipelines.",
    topicsCovered: [
      "Vector Databases (Pinecone, pgvector) & Chunking Strategies",
      "Tool Calling, Function Execution & Multi-Agent Orchestration",
      "PyTorch Neural Networks, Backprop & Optimization",
      "Transformer Architectures, Attention Mechanisms & Fine-tuning",
      "Hallucination Mitigation & Output Evaluation Benchmarks",
    ],
  },
  {
    id: "data-science-predictive",
    courseTitle: "Data Science & Analytics",
    courseSlug: "data-science-and-analytics",
    title: "Python Data Science, Pandas & Predictive Modelling",
    questionsCount: 15,
    durationMins: 25,
    difficulty: "Intermediate",
    category: "Data Science & Analytics",
    passingScore: 70,
    voucherBonus: "Up to 45% Merit Tuition Discount",
    attemptsLeft: 3,
    overview:
      "Evaluates exploratory data analysis (EDA), data wrangling with Pandas/NumPy, hypothesis testing, and supervised machine learning with Scikit-Learn.",
    topicsCovered: [
      "Pandas Data Wrangling, Groupby & Missing Value Imputation",
      "NumPy Multi-Dimensional Arrays & Vectorized Calculations",
      "Statistical Hypothesis Testing, P-values & Confidence Intervals",
      "Regression, Classification & Random Forest Classifiers",
      "Model Evaluation (ROC-AUC, Precision-Recall, Confusion Matrix)",
    ],
  },
  {
    id: "cybersecurity-analyst",
    courseTitle: "Cyber Security",
    courseSlug: "cyber-security",
    title: "Ethical Hacking, Network Defense & OWASP Top 10",
    questionsCount: 15,
    durationMins: 25,
    difficulty: "Advanced",
    category: "Cyber Security",
    passingScore: 75,
    voucherBonus: "Up to 50% Merit Tuition Discount",
    attemptsLeft: 3,
    overview:
      "Assesses threat modeling, network security auditing with Wireshark/Nmap, Linux system hardening, and web application vulnerability remediation.",
    topicsCovered: [
      "OWASP Top 10: SQL Injection, XSS, CSRF & Broken Access Control",
      "TCP/IP Networking, Port Scanning & Packet Analysis",
      "Linux Permissions, Privileges & System Hardening",
      "Cryptography: Symmetric/Asymmetric Ciphers, Hashing & TLS",
      "Incident Response Protocols & Vulnerability Remediation",
    ],
  },
  {
    id: "cloud-devops-cicd",
    courseTitle: "Cloud & DevOps",
    courseSlug: "cloud-and-devops",
    title: "AWS Cloud Infrastructure, Docker & Kubernetes CI/CD",
    questionsCount: 15,
    durationMins: 25,
    difficulty: "Advanced",
    category: "Cloud & DevOps",
    passingScore: 75,
    voucherBonus: "Up to 50% Merit Tuition Discount",
    attemptsLeft: 3,
    overview:
      "Evaluates multi-tier cloud architectures on AWS, production containerization with Docker, Kubernetes pod deployment, and automated GitHub Actions pipelines.",
    topicsCovered: [
      "AWS Core: EC2, S3, RDS, VPC Subnets & IAM Roles",
      "Multi-stage Dockerfile Optimization & Image Minimization",
      "Kubernetes Deployments, Pods, Services & Ingress",
      "CI/CD Automation with GitHub Actions & Automated Testing",
      "Infrastructure as Code (Terraform Fundamentals) & Monitoring",
    ],
  },
  {
    id: "uiux-design-systems",
    courseTitle: "UI/UX Design",
    courseSlug: "ui-ux-design",
    title: "UI/UX Design Systems, Figma & Usability Testing",
    questionsCount: 12,
    durationMins: 20,
    difficulty: "Intermediate",
    category: "UI/UX Design",
    passingScore: 70,
    voucherBonus: "Up to 40% Merit Tuition Discount",
    attemptsLeft: 3,
    overview:
      "Assesses human-centered design principles, interactive Figma component architectures, design tokens, responsive layouts, and usability testing methodologies.",
    topicsCovered: [
      "Figma Auto Layout, Variants, Component Properties & Tokens",
      "User Journey Mapping, Information Architecture & Wireframing",
      "Accessibility (WCAG 2.1 AA Standards) & Color Contrast Ratios",
      "Micro-Interactions, Interactive Prototyping & Design Handoff",
      "Usability Testing Synthesis & Qualitative Feedback Loops",
    ],
  },
  {
    id: "digital-marketing-growth",
    courseTitle: "Digital Marketing",
    courseSlug: "digital-marketing",
    title: "Performance Marketing, SEO & Conversion Funnel Strategy",
    questionsCount: 12,
    durationMins: 20,
    difficulty: "Intermediate",
    category: "Digital Marketing",
    passingScore: 70,
    voucherBonus: "Up to 40% Merit Tuition Discount",
    attemptsLeft: 3,
    overview:
      "Tests technical SEO auditing, paid search and social campaigns, Google Analytics 4 (GA4) event tracking, and conversion rate optimization (CRO).",
    topicsCovered: [
      "On-Page, Off-Page & Technical Search Engine Optimization (SEO)",
      "Google Ads (Search & Performance Max) & Meta Ads Management",
      "Google Analytics 4 (GA4) Event Attribution & Custom Funnels",
      "Conversion Rate Optimization (CRO) & A/B Testing Frameworks",
      "Email Automation Workflows & Customer Lifetime Value (LTV)",
    ],
  },
  {
    id: "power-bi-analytics",
    courseTitle: "Data Analytics with Power BI",
    courseSlug: "data-analytics-with-power-bi",
    title: "Power BI Business Intelligence, DAX & Data Modelling",
    questionsCount: 15,
    durationMins: 25,
    difficulty: "Intermediate",
    category: "Data Analytics with Power BI",
    passingScore: 70,
    voucherBonus: "Up to 45% Merit Tuition Discount",
    attemptsLeft: 3,
    overview:
      "Assesses end-to-end business intelligence: Power Query data ingestion, star schema modelling, advanced DAX calculation measures, and executive dashboard design.",
    topicsCovered: [
      "Power Query M-Code Transformations & Data Cleaning",
      "Star Schema Data Modeling & Relationship Cardinality",
      "DAX Measures: CALCULATE, Time Intelligence & FILTER Functions",
      "Interactive Visualizations, Drill-Downs & Bookmark Tooltips",
      "Row-Level Security (RLS) in Power BI Service & Scheduled Refresh",
    ],
  },
];

export default function QuizzesCatalogPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const filteredQuizzes = ALL_MOCK_TESTS.filter((quiz) => {
    if (selectedFilter === "all") return true;
    return quiz.courseSlug === selectedFilter;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
            Merit Assessment Suite
          </span>
          <span className="text-xs text-[#64748b]">
            Score 70%+ to unlock corporate tuition credits
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] mt-1">
          Practice Quizzes & Placement Assessments
        </h1>
        <p className="text-xs sm:text-sm text-[#263746] mt-1 max-w-2xl">
          Evaluate your engineering competency with timed scenario-based evaluations across all 9 ANZEYL courses. Passing scores automatically unlock merit discount vouchers for career cohorts.
        </p>
      </div>

      {/* Course Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs scrollbar-none">
        <button
          onClick={() => setSelectedFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all border ${
            selectedFilter === "all"
              ? "bg-[#176b87] border-[#12566c] text-white shadow-xs"
              : "bg-white border-[#e5e7eb] text-[#263746] hover:bg-[#f7f5ef]"
          }`}
        >
          All 9 Courses ({ALL_MOCK_TESTS.length})
        </button>
        {ALL_MOCK_TESTS.map((q) => (
          <button
            key={q.id}
            onClick={() => setSelectedFilter(q.courseSlug)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all border ${
              selectedFilter === q.courseSlug
                ? "bg-[#176b87] border-[#12566c] text-white shadow-xs"
                : "bg-white border-[#e5e7eb] text-[#263746] hover:bg-[#f7f5ef]"
            }`}
          >
            {q.courseTitle}
          </button>
        ))}
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuizzes.map((quiz) => {
          const isExpanded = expandedSyllabusId === quiz.id;

          return (
            <div
              key={quiz.id}
              className="p-6 sm:p-7 rounded-3xl border border-[#e5e7eb] bg-white hover:border-[#176b87] transition-all space-y-5 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20 font-bold text-[11px]">
                    {quiz.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold text-[11px]">
                    {quiz.difficulty}
                  </span>
                </div>

                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#17191D] leading-snug">
                    {quiz.title}
                  </h2>
                  <p className="text-xs text-[#263746] mt-1.5 leading-relaxed">
                    {quiz.overview}
                  </p>
                </div>

                {/* Key Metrics: High Contrast Text */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb]">
                    <span className="block text-[10px] text-[#64748b] font-bold uppercase">Questions</span>
                    <span className="text-sm font-black text-[#17191D] mt-0.5 block">{quiz.questionsCount}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb]">
                    <span className="block text-[10px] text-[#64748b] font-bold uppercase">Time Limit</span>
                    <span className="text-sm font-black text-[#17191D] mt-0.5 block">{quiz.durationMins} Mins</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb]">
                    <span className="block text-[10px] text-[#64748b] font-bold uppercase">Pass Cutoff</span>
                    <span className="text-sm font-black text-emerald-700 mt-0.5 block">{quiz.passingScore}%</span>
                  </div>
                </div>

                {/* Merit Reward Banner */}
                <div className="p-3 rounded-2xl bg-[#fff9eb] border border-[#edd7a6] text-xs text-[#854d0e] flex items-center gap-2 font-medium">
                  <ZapIcon className="w-4 h-4 text-[#854d0e] shrink-0" />
                  <span>Merit Reward: <strong>{quiz.voucherBonus}</strong></span>
                </div>

                {/* Interactive Syllabus & Content Accordion */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setExpandedSyllabusId(isExpanded ? null : quiz.id)}
                    className="w-full py-2 px-3 rounded-xl bg-[#f7f5ef] hover:bg-[#eef4f0] border border-[#e5e7eb] text-left text-xs font-semibold text-[#176b87] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpenIcon className="w-3.5 h-3.5 text-[#176b87]" />
                      <span>{isExpanded ? "Hide Test Topics & Syllabus" : "View Topics & Syllabus Tested (" + quiz.topicsCovered.length + " Modules)"}</span>
                    </span>
                    <ChevronRightIcon
                      className={`w-3.5 h-3.5 text-[#176b87] transition-transform duration-200 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 p-3.5 rounded-2xl bg-[#f7f5ef] border border-[#d6dde0] space-y-2 animate-fade-in text-xs">
                      <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider block">
                        Evaluated Curriculum Concepts:
                      </span>
                      <ul className="space-y-1.5 pl-1">
                        {quiz.topicsCovered.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[#263746] text-[11px] leading-relaxed">
                            <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✓</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#e5e7eb] text-xs">
                <span className="text-[#64748b] font-medium">Attempts: {quiz.attemptsLeft} remaining</span>
                <Link
                  href={`/portal/quizzes/${quiz.id}`}
                  className="px-5 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold flex items-center gap-1.5 shadow-xs transition-all hover:scale-105"
                >
                  <span>Start Assessment</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
