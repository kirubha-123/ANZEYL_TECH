"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheckIcon,
  AwardIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BookOpenIcon,
} from "@/components/Icons";

interface ExamItem {
  id: string;
  title: string;
  courseTitle: string;
  code: string;
  durationMins: number;
  questionsCount: number;
  attemptsRemaining: number;
  totalAttempts: number;
  passingCutoff: number;
  badge: string;
  badgeStyle: string;
  reward: string;
  overview: string;
  syllabusTopics: string[];
  quizSlug: string;
}

const EXAMS_DATA: ExamItem[] = [
  {
    id: "fs-cert-2026",
    title: "ANZEYL Certified Full-Stack Cloud Engineer (SACE)",
    courseTitle: "Full Stack Development",
    code: "CERT-EXAM-701",
    durationMins: 45,
    questionsCount: 25,
    attemptsRemaining: 2,
    totalAttempts: 2,
    passingCutoff: 75,
    badge: "Industry Accredited",
    badgeStyle: "bg-[#176b87]/10 text-[#176b87] border-[#176b87]/20",
    reward: "Official Blockchain Certificate + Up to 50% Tuition Merit Discount Voucher",
    overview:
      "Evaluates complete end-to-end web engineering capability: responsive Next.js frontend, Node.js API development, and PostgreSQL security.",
    syllabusTopics: [
      "Next.js App Router (RSC, Server Actions, Suspense & Streaming)",
      "React 19 Architecture, Hooks & State Patterns",
      "PostgreSQL Schema Design & Row Level Security (RLS)",
      "RESTful API Design, JWT Authentication & CORS Hardening",
      "Production Containerization with Docker & Cloud Deployment",
    ],
    quizSlug: "react-mastery",
  },
  {
    id: "ai-cert-2026",
    title: "Autonomous Agent Architect & LLM Systems Professional",
    courseTitle: "AI & Machine Learning",
    code: "CERT-EXAM-802",
    durationMins: 60,
    questionsCount: 30,
    attemptsRemaining: 2,
    totalAttempts: 2,
    passingCutoff: 80,
    badge: "AI Track Elite",
    badgeStyle: "bg-purple-50 text-purple-700 border-purple-200",
    reward: "Official Blockchain Certificate + Up to 50% Tuition Merit Discount Voucher",
    overview:
      "Evaluates applied machine learning, neural architectures, retrieval-augmented generation (RAG), and agentic workflows.",
    syllabusTopics: [
      "Multimodal RAG Pipelines & Vector Embeddings",
      "Autonomous Agent Tool Calling, Function Execution & Reflection",
      "PyTorch Deep Learning & Transfer Learning Pipelines",
      "Classical Machine Learning (Scikit-Learn, Hyperparameter Tuning)",
      "Model Evaluation Metrics (ROC-AUC, F1-Score, Hallucination Checks)",
    ],
    quizSlug: "ai-agent-engineering",
  },
  {
    id: "jfs-cert-2026",
    title: "ANZEYL Certified Java Enterprise Developer (CJED)",
    courseTitle: "Java Full Stack Development",
    code: "CERT-EXAM-703",
    durationMins: 50,
    questionsCount: 25,
    attemptsRemaining: 2,
    totalAttempts: 2,
    passingCutoff: 75,
    badge: "Enterprise Grade",
    badgeStyle: "bg-[#176b87]/10 text-[#176b87] border-[#176b87]/20",
    reward: "Official Blockchain Certificate + Up to 50% Tuition Merit Discount Voucher",
    overview:
      "Assesses enterprise backend architecture in Java 21, Spring Boot 3 microservices, JPA/Hibernate performance, and React integration.",
    syllabusTopics: [
      "Modern Java 21 Features (Records, Pattern Matching, Sealed Classes)",
      "Spring Boot 3, Dependency Injection & Spring Security JWT",
      "JPA/Hibernate Entity Relationships, Fetch Types & Query Optimization",
      "Unit & Integration Testing with JUnit 5, Mockito & Testcontainers",
      "React Frontend Integration with Secure Axios Interceptors",
    ],
    quizSlug: "system-design",
  },
  {
    id: "dsa-cert-2026",
    title: "ANZEYL Certified Data Science & Predictive Analytics Specialist",
    courseTitle: "Data Science & Analytics",
    code: "CERT-EXAM-704",
    durationMins: 45,
    questionsCount: 25,
    attemptsRemaining: 2,
    totalAttempts: 2,
    passingCutoff: 75,
    badge: "Analytics Track",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    reward: "Official Blockchain Certificate + Up to 45% Tuition Merit Discount Voucher",
    overview:
      "Validates hands-on statistical reasoning, Pandas data cleaning, advanced SQL window functions, and predictive business modeling.",
    syllabusTopics: [
      "Pandas & NumPy Data Wrangling & Outlier Detection",
      "Advanced SQL (CTEs, Window Functions, Retention Queries)",
      "Exploratory Data Analysis & Statistical Hypothesis Testing",
      "Supervised Machine Learning & Feature Engineering",
      "Data Storytelling & Executive Business Dashboards",
    ],
    quizSlug: "supabase-postgres",
  },
  {
    id: "cs-cert-2026",
    title: "ANZEYL Certified Ethical Hacker & Security Analyst (CEHSA)",
    courseTitle: "Cyber Security",
    code: "CERT-EXAM-705",
    durationMins: 50,
    questionsCount: 25,
    attemptsRemaining: 2,
    totalAttempts: 2,
    passingCutoff: 80,
    badge: "Security Defense",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    reward: "Official Blockchain Certificate + Up to 50% Tuition Merit Discount Voucher",
    overview:
      "Rigorous assessment of network reconnaissance, vulnerability assessment, web application penetration testing, and defense hardening.",
    syllabusTopics: [
      "Network Scanning & Reconnaissance with Nmap & Wireshark",
      "OWASP Top 10 Vulnerabilities & Exploitation Verification",
      "SQL Injection, Cross-Site Scripting (XSS) & CSRF Mitigations",
      "Linux Server Hardening, Firewall Configuration & SSH Keys",
      "Formal Security Assessment Reporting & CVSS Scoring",
    ],
    quizSlug: "supabase-postgres",
  },
  {
    id: "cdo-cert-2026",
    title: "ANZEYL Certified Cloud & DevOps Solutions Architect (CCDA)",
    courseTitle: "Cloud & DevOps",
    code: "CERT-EXAM-706",
    durationMins: 45,
    questionsCount: 25,
    attemptsRemaining: 2,
    totalAttempts: 2,
    passingCutoff: 75,
    badge: "Cloud Infrastructure",
    badgeStyle: "bg-[#176b87]/10 text-[#176b87] border-[#176b87]/20",
    reward: "Official Blockchain Certificate + Up to 50% Tuition Merit Discount Voucher",
    overview:
      "Evaluates cloud infrastructure design on AWS, Docker container optimization, CI/CD pipeline automation, and Kubernetes orchestration.",
    syllabusTopics: [
      "AWS Core Architecture (VPC, Subnets, EC2, S3, IAM Roles)",
      "Terraform Infrastructure as Code (IaC) & State Management",
      "Docker Multi-Stage Optimization (<80MB Minimal Distroless)",
      "GitHub Actions Automated CI/CD Pipelines & Security Gates",
      "Observability with Prometheus Metrics & Grafana Dashboards",
    ],
    quizSlug: "system-design",
  },
];

export default function ExamsPortalPage() {
  const [activeExam, setActiveExam] = useState<ExamItem | null>(null);
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);
  const [cameraVerified, setCameraVerified] = useState(true);
  const [agreedHonorCode, setAgreedHonorCode] = useState(false);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
            Proctored Testing Suite
          </span>
          <span className="text-xs text-[#64748b]">Anti-Cheating & Honor Code Enforced</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] mt-1">
          Proctored Certification Examinations
        </h1>
        <p className="text-xs sm:text-sm text-[#263746] mt-1 max-w-2xl">
          Complete proctored assessments under simulated examination conditions. Achieving 75%+ unlocks official blockchain-verifiable credentials and merit tuition discount vouchers.
        </p>
      </div>

      {/* Proctored Integrity Safeguards Banner */}
      <div className="p-6 sm:p-7 rounded-3xl border border-[#e5e7eb] bg-white space-y-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#176b87]/10 text-[#176b87] flex items-center justify-center shrink-0 border border-[#176b87]/20">
            <ShieldCheckIcon className="w-5 h-5 text-[#176b87]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#17191D]">AI-Proctored Integrity Environment</h3>
            <p className="text-xs text-[#64748b]">
              Exam sessions record browser tab changes, clipboard activity, and periodic webcam verification frames.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-2xl bg-[#e7f4ef] border border-[#b9ddd1] flex items-center gap-2.5">
            <span className="text-[#065f46] font-bold text-sm">✓</span>
            <div>
              <strong className="block text-[#065f46] text-xs font-bold">Webcam Readiness</strong>
              <span className="text-[11px] text-[#065f46] font-semibold">Active (720p HD)</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#e7f4ef] border border-[#b9ddd1] flex items-center gap-2.5">
            <span className="text-[#065f46] font-bold text-sm">✓</span>
            <div>
              <strong className="block text-[#065f46] text-xs font-bold">Audio Monitoring</strong>
              <span className="text-[11px] text-[#065f46] font-semibold">Noise Calibration Normal</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#fff3e5] border border-[#f2d0a8] flex items-center gap-2.5">
            <span className="text-[#854d0e] font-bold text-sm">⚠</span>
            <div>
              <strong className="block text-[#854d0e] text-xs font-bold">Tab Switch Limit</strong>
              <span className="text-[11px] text-[#854d0e] font-semibold">Max 2 Warnings Allowed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Examinations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXAMS_DATA.map((exam) => {
          const isExpanded = expandedSyllabusId === exam.id;

          return (
            <div
              key={exam.id}
              className="p-6 sm:p-7 rounded-3xl border border-[#e5e7eb] bg-white hover:border-[#176b87] transition-all space-y-5 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className={`text-[10px] font-bold px-3 py-0.5 rounded-full border uppercase ${exam.badgeStyle}`}>
                    {exam.badge}
                  </span>
                  <span className="font-mono text-[#64748b] text-[11px] font-semibold">{exam.code}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#176b87] uppercase block">
                    {exam.courseTitle}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#17191D] leading-snug mt-0.5">
                    {exam.title}
                  </h2>
                  <p className="text-xs text-[#263746] mt-2 leading-relaxed">
                    {exam.overview}
                  </p>
                </div>

                {/* Exam Key Metrics: Questions, Duration, Pass Cutoff */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb]">
                    <span className="block text-[10px] text-[#64748b] font-bold uppercase">Questions</span>
                    <span className="text-sm font-black text-[#17191D] mt-0.5 block">{exam.questionsCount}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb]">
                    <span className="block text-[10px] text-[#64748b] font-bold uppercase">Duration</span>
                    <span className="text-sm font-black text-[#17191D] mt-0.5 block">{exam.durationMins}m</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb]">
                    <span className="block text-[10px] text-[#64748b] font-bold uppercase">Pass Cutoff</span>
                    <span className="text-sm font-black text-emerald-700 mt-0.5 block">{exam.passingCutoff}%</span>
                  </div>
                </div>

                {/* Reward Box */}
                <div className="p-3.5 rounded-2xl bg-[#fff9eb] border border-[#edd7a6] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#854d0e]">
                    <AwardIcon className="w-4 h-4 text-[#854d0e]" />
                    <span>Certification & Voucher Reward:</span>
                  </div>
                  <p className="text-[11px] text-[#713f12] font-semibold leading-relaxed">
                    {exam.reward}
                  </p>
                </div>

                {/* Expandable Syllabus & Exam Topics */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setExpandedSyllabusId(isExpanded ? null : exam.id)}
                    className="text-xs text-[#176b87] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpenIcon className="w-3.5 h-3.5" />
                    <span>{isExpanded ? "Hide Syllabus Details" : "View Exam Topics & Syllabus"}</span>
                    <span className="text-[10px]">{isExpanded ? "▲" : "▼"}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 p-3.5 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-2 text-xs animate-fade-in">
                      <span className="font-bold text-[#17191D] block">
                        What is tested inside this examination:
                      </span>
                      <ul className="space-y-1 text-[#263746]">
                        {exam.syllabusTopics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5 text-[11px]">
                            <span className="text-[#176b87] font-bold">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb] text-xs">
                <span className="text-[#64748b]">
                  Attempts: <strong className="text-[#17191D] font-bold">{exam.attemptsRemaining} of {exam.totalAttempts}</strong> remaining
                </span>

                <button
                  type="button"
                  onClick={() => setActiveExam(exam)}
                  className="px-5 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Launch Exam Chamber</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Proctored Exam Modal Chamber */}
      {activeExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="max-w-xl w-full p-8 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-[#176b87]" />
                <div>
                  <span className="text-[10px] font-bold text-[#176b87] uppercase block">{activeExam.code}</span>
                  <h3 className="text-base font-bold text-[#17191D]">
                    Proctored Security Verification: {activeExam.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveExam(null)}
                className="text-[#64748b] hover:text-[#17191D] text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-[#263746] leading-relaxed">
                Before commencing the examination, please confirm that your environment meets the strict anti-cheating and proctoring parameters:
              </p>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cameraVerified}
                    onChange={(e) => setCameraVerified(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176b87]"
                  />
                  <span className="text-[#263746] font-semibold">
                    Webcam and microphone streams are verified and face is clearly visible.
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedHonorCode}
                    onChange={(e) => setAgreedHonorCode(e.target.checked)}
                    className="w-4 h-4 rounded text-[#176b87]"
                  />
                  <span className="text-[#263746] font-semibold">
                    I agree to the ANZEYL Academic Honor Code. I will not use unauthorized AI generators, secondary monitors, or switch tabs.
                  </span>
                </label>
              </div>

              {/* Exam Topics Summary */}
              <div className="p-3.5 rounded-2xl bg-[#eef6f3] border border-[#b9ddd1] text-xs space-y-1">
                <strong className="text-[#065f46] font-bold block flex items-center gap-1">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-[#065f46]" />
                  <span>Exam Parameters ({activeExam.questionsCount} Questions • {activeExam.durationMins} Minutes):</span>
                </strong>
                <p className="text-[11px] text-[#065f46] leading-relaxed">
                  Pass cutoff is {activeExam.passingCutoff}%. Achieving passing marks awards your verifiable blockchain credential and merit voucher.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold">
                Notice: Starting the exam consumes 1 official attempt. You will have {activeExam.durationMins} uninterrupted minutes to finish.
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveExam(null)}
                className="flex-1 py-3 rounded-xl bg-white hover:bg-[#f7f5ef] border border-[#d6dde0] text-[#263746] font-bold text-xs transition-colors"
              >
                Abort
              </button>
              <Link
                href={`/portal/quizzes/${activeExam.quizSlug}`}
                onClick={() => setActiveExam(null)}
                className={`flex-1 py-3 rounded-xl text-center font-bold text-xs transition-all shadow-xs ${
                  cameraVerified && agreedHonorCode
                    ? "bg-[#176b87] hover:bg-[#12566c] text-white"
                    : "bg-slate-200 text-slate-400 pointer-events-none"
                }`}
              >
                Begin Proctored Exam →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
