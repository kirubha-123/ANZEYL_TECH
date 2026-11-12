"use client";

import React, { useState } from "react";
import {
  DownloadIcon,
  SearchIcon,
  CheckCircleIcon,
} from "@/components/Icons";
import { formatIndianNumber } from "@/lib/formatters";

interface MaterialItem {
  id: string;
  title: string;
  category: "all" | "frontend" | "system-design" | "cloud" | "ai";
  categoryLabel: string;
  type: "PDF Document" | "GitHub Template" | "Interactive CheatSheet";
  sizeOrBranch: string;
  downloads: number;
  description: string;
  tags: string[];
}

const MATERIALS: MaterialItem[] = [
  {
    id: "mat-next16-cheatsheet",
    title: "Next.js 16 & React 19 Production Cheat Sheet",
    category: "frontend",
    categoryLabel: "Frontend & Full-Stack",
    type: "Interactive CheatSheet",
    sizeOrBranch: "PDF (18 Pages • 4.8 MB)",
    downloads: 1420,
    description: "Complete syntax guide for Server Actions, Turbopack, Partial Prerendering (PPR), cacheComponents, and Supabase SSR integration.",
    tags: ["Next.js 16", "React 19", "App Router", "SSR"],
  },
  {
    id: "mat-supabase-rls-rules",
    title: "Supabase & PostgreSQL Row Level Security (RLS) Handbook",
    category: "cloud",
    categoryLabel: "Database & Security",
    type: "PDF Document",
    sizeOrBranch: "PDF (24 Pages • 6.1 MB)",
    downloads: 980,
    description: "Production SQL policies for multi-tenant isolation, role-based access control (RBAC), and avoiding service_role vulnerabilities.",
    tags: ["PostgreSQL", "Supabase", "Security", "RLS"],
  },
  {
    id: "mat-sysdesign-blueprints",
    title: "Distributed Systems Architecture Blueprints",
    category: "system-design",
    categoryLabel: "System Design",
    type: "PDF Document",
    sizeOrBranch: "PDF (32 Pages • 12.4 MB)",
    downloads: 2100,
    description: "High-resolution architectural diagrams for Kafka event streams, Redis cache tiers, microservice rate-limiters, and DB sharding.",
    tags: ["Microservices", "Kafka", "Redis", "Scalability"],
  },
  {
    id: "mat-ai-agents-starter",
    title: "Autonomous Multi-Agent Starter Kit (LangGraph + Next.js)",
    category: "ai",
    categoryLabel: "AI Engineering",
    type: "GitHub Template",
    sizeOrBranch: "main branch • ANZEYL-ai/agent-starter",
    downloads: 870,
    description: "Production repository boilerplate with structured tool calling, vector search retrieval, and streaming SSE responses.",
    tags: ["LangGraph", "Tool Calling", "Vector DB", "TypeScript"],
  },
  {
    id: "mat-devops-k8s",
    title: "Production Kubernetes & Docker Helm Deployment Guide",
    category: "cloud",
    categoryLabel: "Cloud & DevOps",
    type: "PDF Document",
    sizeOrBranch: "PDF (16 Pages • 3.9 MB)",
    downloads: 650,
    description: "Manifest templates for auto-scaling Next.js containers, ingress controllers, zero-downtime rolling updates, and monitoring.",
    tags: ["Kubernetes", "Docker", "DevOps", "CI/CD"],
  },
];

export default function MaterialsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const filteredMaterials = MATERIALS.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (id: string) => {
    setDownloadSuccessId(id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
            Study Resource Library
          </span>
          <span className="text-xs text-slate-400">Curated Architecture Blueprints & Source Repos</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Study Materials & Technical Blueprints
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Download high-resolution cheat sheets, production boilerplates, and system design whitepapers designed to accelerate your engineering career.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, topic, or technology..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#0f1424] border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {[
            { key: "all", label: "All Resources" },
            { key: "frontend", label: "Frontend & Next.js" },
            { key: "system-design", label: "System Design" },
            { key: "cloud", label: "Cloud & Supabase" },
            { key: "ai", label: "AI Engineering" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat.key
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0f1424]/90 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {item.categoryLabel}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{item.sizeOrBranch}</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">📥 {formatIndianNumber(item.downloads)} learners</span>

              <button
                onClick={() => handleDownload(item.id)}
                className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs ${
                  downloadSuccessId === item.id
                    ? "bg-emerald-500 text-slate-950 font-black"
                    : "btn-colorful-primary text-white shadow-md shadow-cyan-500/20 hover:scale-105"
                }`}
              >
                {downloadSuccessId === item.id ? (
                  <>
                    <CheckCircleIcon className="w-3.5 h-3.5" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <DownloadIcon className="w-3.5 h-3.5" />
                    <span>Download Resource</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
