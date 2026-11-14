"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
  ShieldCheckIcon,
  TrophyIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import { formatINR } from "@/lib/formatters";

interface Internship {
  id: string;
  title: string;
  company: string;
  roleType: string;
  location: string;
  stipend: number;
  duration: string;
  cohort: string;
  openings: number;
  tags: string[];
  description: string;
  perks: string[];
  minAssessmentScore: number;
  gradient: string;
  badgeStyle: string;
}

const INTERNSHIPS_DATA: Internship[] = [
  {
    id: "intern-1",
    title: "Junior Full-Stack Engineer Intern",
    company: "CloudScale Systems",
    roleType: "Full-Stack Web",
    location: "Remote / Hybrid (Bengaluru)",
    stipend: 25000,
    duration: "12 Weeks (Full-Time)",
    cohort: "Starting Nov 15, 2026",
    openings: 8,
    tags: ["React 19", "Next.js", "Node.js", "PostgreSQL", "Supabase"],
    description:
      "Contribute to high-throughput client portals, write modular React Server Components, integrate Supabase authentication, and collaborate on production PR reviews.",
    perks: ["Pre-Placement Offer (PPO) Eligibility", "1-on-1 Staff Engineer Mentorship", "Official Industry Credential"],
    minAssessmentScore: 75,
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    badgeStyle: "badge-vibrant-cyan",
  },
  {
    id: "intern-2",
    title: "AI & LLM Application Intern",
    company: "NeuroBridge Labs",
    roleType: "AI / ML Engineering",
    location: "Remote (Global)",
    stipend: 32000,
    duration: "16 Weeks",
    cohort: "Starting Dec 01, 2026",
    openings: 5,
    tags: ["Python 3.12", "LangChain", "Vector DBs", "RAG", "FastAPI"],
    description:
      "Design retrieval-augmented generation (RAG) pipelines, benchmark vector search latency in Pinecone, and build conversational agent backends with streaming responses.",
    perks: ["GPU Compute Credits Provided", "Direct Co-Authoring on Lab Whitepapers", "Top Performer Signing Bonus"],
    minAssessmentScore: 80,
    gradient: "from-rose-500 via-purple-500 to-indigo-600",
    badgeStyle: "badge-vibrant-rose",
  },
  {
    id: "intern-3",
    title: "Enterprise Java & Microservices Intern",
    company: "FinMatrix Technologies",
    roleType: "Backend Systems",
    location: "Hybrid (Hyderabad / Remote)",
    stipend: 28000,
    duration: "14 Weeks",
    cohort: "Starting Nov 20, 2026",
    openings: 6,
    tags: ["Java 21", "Spring Boot 3", "Kafka", "Docker", "PostgreSQL"],
    description:
      "Implement event-driven microservices, design RESTful payment routing endpoints, write robust JUnit 5 tests, and deploy containerized services onto Kubernetes testbeds.",
    perks: ["FinTech Domain Certification", "Direct Placement Transition", "Flexible Academic Hours"],
    minAssessmentScore: 75,
    gradient: "from-amber-400 via-orange-500 to-red-500",
    badgeStyle: "badge-vibrant-amber",
  },
  {
    id: "intern-4",
    title: "Cloud Infrastructure & DevOps Intern",
    company: "Apex CloudOps",
    roleType: "DevOps & Cloud",
    location: "Remote",
    stipend: 24000,
    duration: "12 Weeks",
    cohort: "Starting Dec 10, 2026",
    openings: 4,
    tags: ["Terraform", "AWS", "GitHub Actions", "Docker", "Linux"],
    description:
      "Automate multi-stage CI/CD pipelines, configure AWS ECS task definitions, monitor telemetry with Prometheus/Grafana, and write infrastructure-as-code manifests.",
    perks: ["AWS Certification Voucher", "Production Infrastructure Access", "Paid Conference Passes"],
    minAssessmentScore: 70,
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    badgeStyle: "badge-vibrant-emerald",
  },
  {
    id: "intern-5",
    title: "Frontend UI/UX Product Engineering Intern",
    company: "PixelCraft Digital",
    roleType: "Frontend Web",
    location: "Remote",
    stipend: 22000,
    duration: "10 Weeks",
    cohort: "Starting Nov 25, 2026",
    openings: 7,
    tags: ["Tailwind CSS", "Figma to Code", "TypeScript", "Micro-Animations"],
    description:
      "Translate Figma prototypes into pixel-perfect responsive web interfaces, implement accessible interactive widgets, and optimize Core Web Vitals performance.",
    perks: ["Design System Portfolio Piece", "Senior Designer 1-on-1 Reviews", "Stipend + Completion Bonus"],
    minAssessmentScore: 70,
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    badgeStyle: "badge-vibrant-violet",
  },
  {
    id: "intern-6",
    title: "Data Engineering & Analytics Intern",
    company: "DataVantage Analytics",
    roleType: "Data Engineering",
    location: "Remote / Hybrid (Pune)",
    stipend: 26000,
    duration: "12 Weeks",
    cohort: "Starting Dec 05, 2026",
    openings: 5,
    tags: ["Python", "Apache Spark", "SQL", "Snowflake", "dbt"],
    description:
      "Build batch and real-time ETL pipelines, write optimized analytical SQL queries, construct data marts, and create automated data quality monitoring assertions.",
    perks: ["Snowflake Practitioner Training", "PPO Interview Fast-Track", "Mentorship from Lead Data Architect"],
    minAssessmentScore: 75,
    gradient: "from-cyan-400 via-emerald-400 to-amber-400",
    badgeStyle: "badge-vibrant-cyan",
  },
];

export default function InternshipsPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [applyingInternship, setApplyingInternship] = useState<Internship | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);

  // Application form fields
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantScore, setApplicantScore] = useState("");
  const [applicantGithub, setApplicantGithub] = useState("");

  const tracks = ["All", "Full-Stack Web", "AI / ML Engineering", "Backend Systems", "DevOps & Cloud", "Data Engineering"];

  const filteredInternships = INTERNSHIPS_DATA.filter((item) => {
    const matchesTrack = selectedTrack === "All" || item.roleType === selectedTrack;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrack && matchesSearch;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
  };

  const closeApplyModal = () => {
    setApplyingInternship(null);
    setApplicationSubmitted(false);
    setApplicantName("");
    setApplicantEmail("");
    setApplicantScore("");
    setApplicantGithub("");
  };

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Hero Section */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider shadow-lg">
            <BriefcaseIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>Guaranteed Placement & Internship Track</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Launch Your Tech Career with <br />
            <span className="text-gradient-brand">Paid Industry Internships</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            Gain verified production experience with top tech startups. Complete your ANZEYL assessment, 
            unlock direct shortlisting, and earn monthly stipends with Pre-Placement Offer (PPO) opportunities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-200">
              <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              100% Verified Corporate Partners
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <CheckCircleIcon className="w-4 h-4 text-cyan-400" />
              Real Production Mentorship
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <CheckCircleIcon className="w-4 h-4 text-amber-400" />
              Stipends up to ₹35,000/mo
            </span>
          </div>
        </div>

        {/* Search & Track Filters */}
        <div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <SearchIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles, companies, tech..."
                className="human-input w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-slate-500"
              />
            </div>

            {/* Quick Stats Banner */}
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                35+ Active Openings This Month
              </span>
              <Link
                href="/assessments"
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
              >
                Take Assessment First →
              </Link>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {tracks.map((track) => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedTrack === track
                    ? "btn-colorful-primary text-white shadow-md scale-105"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredInternships.map((intern) => (
            <div
              key={intern.id}
              className="glass-card p-7 rounded-3xl border border-white/10 space-y-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl hover:border-cyan-500/50"
            >
              {/* Colorful Top Accent Strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${intern.gradient}`} />

              <div className="space-y-4 pt-1">
                {/* Header with Role and Company */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${intern.badgeStyle}`}>
                      {intern.roleType}
                    </span>
                    <h2 className="text-xl font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                      {intern.title}
                    </h2>
                    <p className="text-xs text-cyan-300 font-semibold mt-0.5">
                      {intern.company} • {intern.location}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 block">
                      {formatINR(intern.stipend)} / month
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {intern.openings} Openings
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {intern.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {intern.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-[#0b0e18] border border-white/10 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Highlights / Perks */}
                <div className="p-3.5 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px]">
                    <TrophyIcon className="w-3.5 h-3.5" />
                    <span>Key Internship Perks</span>
                  </div>
                  {intern.perks.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                {/* Duration & Minimum Score Requirement */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <ClockIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{intern.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <ShieldCheckIcon className="w-3.5 h-3.5" />
                    <span>Qualifying Score: ≥ {intern.minAssessmentScore}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setApplyingInternship(intern)}
                  className="btn-colorful-primary flex-1 py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>Apply with Assessment Score</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/assessments"
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold shrink-0 transition-colors"
                >
                  Take Test
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Process Showcase */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500" />
          
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-white">How the ANZEYL SOLUTIONS Internship Pipeline Works</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Zero resume filtering based on college brand names. Your engineering benchmark score guarantees your interview.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-black text-sm flex items-center justify-center">
                1
              </div>
              <h4 className="text-sm font-bold text-white">Score ≥ 75% on Test</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take our adaptive code & architecture assessment. Instant verifiable score transcript generated.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 font-black text-sm flex items-center justify-center">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Direct Partner Matching</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                ANZEYL automatically recommends your verified profile to participating startup hiring managers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black text-sm flex items-center justify-center">
                3
              </div>
              <h4 className="text-sm font-bold text-white">Paid Internship & PPO</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Join your cohort, build production software under a senior mentor, and convert into a full-time role.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Interactive Application Modal */}
      {applyingInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg human-surface p-7 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative space-y-6">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-500" />
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4 pt-1">
              <div>
                <h3 className="text-lg font-bold text-white">Apply for Internship</h3>
                <p className="text-xs text-cyan-300 font-medium">
                  {applyingInternship.title} • {applyingInternship.company}
                </p>
              </div>
              <button
                onClick={closeApplyModal}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Application Received!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Your application for <strong className="text-white">{applyingInternship.title}</strong> has been linked with your ANZEYL profile. We will notify you via email and phone regarding the interview schedule.
                </p>
                <button
                  onClick={closeApplyModal}
                  className="btn-colorful-primary px-6 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg"
                >
                  Back to Internships
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="human-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="human-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Assessment Score (%)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={applicantScore}
                      onChange={(e) => setApplicantScore(e.target.value)}
                      placeholder={`Min: ${applyingInternship.minAssessmentScore}%`}
                      className="human-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      GitHub Profile URL
                    </label>
                    <input
                      type="url"
                      required
                      value={applicantGithub}
                      onChange={(e) => setApplicantGithub(e.target.value)}
                      placeholder="https://github.com/..."
                      className="human-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-2">
                  <SparklesIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Haven&apos;t taken the assessment yet? You can still apply; an assessment invite link will be sent to your email immediately upon submission.
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-colorful-primary px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
