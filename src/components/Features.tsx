"use client";

import React from "react";
import {
  SparklesIcon,
  TargetIcon,
  TrophyIcon,
  BriefcaseIcon,
  CodeIcon,
  ZapIcon,
} from "./Icons";

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: SparklesIcon,
      title: "24/7 AI Tutor & Code Assistant",
      description:
        "Receive instant, step-by-step breakdowns for complex programming concepts, real-time code debugging hints, and personalized practice exercises.",
      badge: "AI Powered",
      accent: "from-[#176b87] to-[#4c9a89]",
      badgeClass: "badge-vibrant-rose",
      iconBg: "bg-[#dcefea] text-[#176b87]",
      cardGlow: "card-glow-rose",
    },
    {
      icon: TargetIcon,
      title: "Personalized Learning Roadmaps",
      description:
        "Diagnostic skills profiling builds a custom step-by-step curriculum adapted to your current proficiency, career goals, and pace.",
      badge: "Adaptive Path",
      accent: "from-[#176b87] to-[#5b7782]",
      badgeClass: "badge-vibrant-cyan",
      iconBg: "bg-[#e5f2f5] text-[#176b87]",
      cardGlow: "card-glow-cyan",
    },
    {
      icon: TrophyIcon,
      title: "Adaptive Skill Assessments",
      description:
        "Take industry-standard proctored technical evaluations to accurately measure your skills, generate verified badges, and discover learning gaps.",
      badge: "Verified Proof",
      accent: "from-[#f2b880] to-[#c97761]",
      badgeClass: "badge-vibrant-amber",
      iconBg: "bg-[#fff3e5] text-[#9a6031]",
      cardGlow: "card-glow-amber",
    },
    {
      icon: CodeIcon,
      title: "Real-World Capstone Projects",
      description:
        "Work on production-minded repositories with automated pull request reviews, lint checks, and deployment guidelines simulating software engineering jobs.",
      badge: "Hands-on",
      accent: "from-[#4c9a89] to-[#176b87]",
      badgeClass: "badge-vibrant-emerald",
      iconBg: "bg-[#e7f4ef] text-[#287362]",
      cardGlow: "card-glow-emerald",
    },
    {
      icon: BriefcaseIcon,
      title: "Career & Interview Preparation",
      description:
        "Prepare for technical interviews with AI mock interview sessions, ATS resume optimization, and direct profile visibility to hiring partners.",
      badge: "Job Ready",
      accent: "from-[#5b7782] to-[#176b87]",
      badgeClass: "badge-vibrant-violet",
      iconBg: "bg-[#edf1f2] text-[#4a6873]",
      cardGlow: "card-glow-violet",
    },
    {
      icon: ZapIcon,
      title: "Skill-Based Course Discounts",
      description:
        "Turn high assessment scores into course tuition savings. Score 70%+ to unlock up to 50% discount vouchers on advanced career tracks.",
      badge: "Score & Save",
      accent: "from-[#c97761] to-[#f2b880]",
      badgeClass: "badge-vibrant-rainbow",
      iconBg: "bg-[#faeee9] text-[#9c5545]",
      cardGlow: "card-glow-rose",
    },
  ];

  return (
    <section className="py-24 bg-colorful-mesh relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            Comprehensive Platform Features
          </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263746] tracking-tight">
            Everything You Need to <span className="text-gradient-brand">Master & Showcase Tech Skills</span>
          </h2>
          <p className="text-base sm:text-lg text-[#526675] font-normal">
            Designed for modern students, self-taught developers, and university learners aiming for industry-ready careers.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className={`glass-card p-8 rounded-2xl ${feat.cardGlow} flex flex-col justify-between group relative overflow-hidden transition-all duration-300`}
              >
                {/* Top Bright Gradient Strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feat.accent} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                <div className="space-y-6">
                  {/* Icon & Badge Row */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl ${feat.iconBg} p-3.5 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-full h-full" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${feat.badgeClass}`}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-all">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>
                </div>

                {/* Subtle Interactive Footer */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                  <span>Explore Feature</span>
                  <span className="text-base transform group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
