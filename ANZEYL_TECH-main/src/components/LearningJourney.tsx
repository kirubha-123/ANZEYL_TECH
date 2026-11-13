"use client";

import React, { useState } from "react";
import {
  BookOpenIcon,
  CodeIcon,
  TrophyIcon,
  ZapIcon,
  BriefcaseIcon,
  CheckCircleIcon,
} from "./Icons";

export const LearningJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Learn",
      icon: BookOpenIcon,
      short: "AI-Guided Mastery",
      description:
        "Access structured, industry-aligned course modules supported by a 24/7 AI tutor for instant concept explanations and code clarity.",
      details: [
        "Interactive bite-sized video & text modules",
        "Personalized AI explanations & code breakdowns",
        "Curated reading materials & architecture diagrams",
      ],
      color: "from-sky-500 to-indigo-500",
      activeBorder: "border-sky-500 shadow-sky-500/20",
      badgeClass: "badge-vibrant-cyan",
      textColor: "text-sky-400",
    },
    {
      number: "02",
      title: "Practice",
      icon: CodeIcon,
      short: "Hands-On Coding",
      description:
        "Solve practical exercises in an integrated browser environment with real-time test suites and intelligent feedback.",
      details: [
        "Real-time code linting and unit test execution",
        "Automated AI debugging hints when stuck",
        "Scenario-based problem solving challenges",
      ],
      color: "from-emerald-400 to-teal-500",
      activeBorder: "border-emerald-500 shadow-emerald-500/20",
      badgeClass: "badge-vibrant-emerald",
      textColor: "text-emerald-400",
    },
    {
      number: "03",
      title: "Take Assessment",
      icon: TrophyIcon,
      short: "Adaptive Evaluation",
      description:
        "Prove your knowledge with timed, adaptive benchmark assessments that measure true technical proficiency and eliminate guesswork.",
      details: [
        "Proctored adaptive question difficulty",
        "Comprehensive skill breakdown analytics",
        "Industry-standard percentile scoring",
      ],
      color: "from-amber-400 to-yellow-500",
      activeBorder: "border-amber-500 shadow-amber-500/20",
      badgeClass: "badge-vibrant-amber",
      textColor: "text-amber-400",
    },
    {
      number: "04",
      title: "Earn Rewards",
      icon: ZapIcon,
      short: "Score & Save",
      description:
        "Qualify for score-based course tuition discount vouchers (up to 50% off) and earn tamper-proof verified skill badges.",
      details: [
        "Tiered course discount vouchers (Silver, Gold, Platinum)",
        "Shareable LinkedIn & resume skill certificates",
        "Verifiable credentials for academic credit",
      ],
      color: "from-rose-500 to-pink-500",
      activeBorder: "border-rose-500 shadow-rose-500/20",
      badgeClass: "badge-vibrant-rose",
      textColor: "text-rose-400",
    },
    {
      number: "05",
      title: "Build Career",
      icon: BriefcaseIcon,
      short: "Job Matching",
      description:
        "Showcase verified project portfolios and assessment transcripts directly to hiring partner networks and university career hubs.",
      details: [
        "Direct recruiter outreach based on assessment rank",
        "AI mock interview practice with instant scoring",
        "Portfolio project showcase with live demo links",
      ],
      color: "from-purple-500 to-violet-600",
      activeBorder: "border-purple-500 shadow-purple-500/20",
      badgeClass: "badge-vibrant-violet",
      textColor: "text-purple-400",
    },
  ];

  const current = steps[activeStep];

  return (
    <section className="py-24 bg-colorful-subtle relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            Proven 5-Step Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Your Structured <span className="text-gradient-brand">Learning to Career Journey</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            From your first lesson to your final job interview, follow a guided pathway built for measurable results.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? `bg-[#151c30] ${step.activeBorder} shadow-xl scale-[1.02]`
                    : "bg-[#0b0e18] border-white/10 hover:border-white/20 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`text-xs font-bold font-mono ${isActive ? step.textColor : "text-slate-500"}`}>
                    STEP {step.number}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isActive ? `bg-gradient-to-tr ${step.color} text-white shadow-md` : "bg-white/5 text-slate-400"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <span className={`text-sm font-bold block ${isActive ? "text-white" : "text-slate-300"}`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Display Card */}
        <div className="glass-card p-8 lg:p-12 rounded-3xl border border-white/15 relative overflow-hidden shadow-2xl">
          {/* Top Rainbow Bar */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${current.color}`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full ${current.badgeClass} text-xs font-bold uppercase tracking-wider`}>
                Step {current.number} • {current.short}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {current.title}: <span className="text-gradient-brand">{current.short}</span>
              </h3>

              <p className="text-base text-slate-300 leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Highlights:</p>
                {current.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-200">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Step Illustration Box */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-7 rounded-2xl bg-[#0b0e18] border border-white/10 shadow-2xl text-center space-y-5">
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr ${current.color} flex items-center justify-center text-white shadow-xl shadow-purple-500/20`}>
                  {React.createElement(current.icon, { size: 36 })}
                </div>
                <div>
                  <span className={`text-xs font-bold ${current.textColor} block uppercase tracking-wider`}>
                    Phase {current.number} Goal
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1">{current.title} Stage</h4>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 font-medium">
                  Continuous AI progress tracking ensures 100% mastery before advancing.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
