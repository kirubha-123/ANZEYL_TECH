"use client";

import React from "react";
import { StarIcon, HelpCircleIcon, TrophyIcon } from "./Icons";

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Frontend Engineer Intern",
      institution: "State University '25",
      avatar: "AR",
      type: "Student Story",
      score: "94% Score on Next.js Test",
      discount: "50% Tuition Discount Unlocked",
      quote:
        "The 24/7 AI tutor helped me understand server actions in Next.js when I got stuck. Scoring 94% on the assessment saved me 50% on the advanced React course and landed me my internship!",
      rating: 5,
      accent: "from-cyan-400 to-blue-600",
      cardGlow: "card-glow-cyan",
      badgeClass: "badge-vibrant-cyan",
      avatarBg: "bg-gradient-to-tr from-cyan-400 to-blue-600",
    },
    {
      name: "Dr. Priya Sharma",
      role: "Head of Computer Science",
      institution: "Metropolitan Institute of Technology",
      avatar: "PS",
      type: "University Educator",
      score: "1,200+ Campus Students",
      discount: "Integrated Skill Benchmark",
      quote:
        "ANZEYL SOLUTIONS provided our faculty with a standardized, proctored assessment framework. We can track our students' real practical coding progress with total clarity.",
      rating: 5,
      accent: "from-rose-500 to-purple-600",
      cardGlow: "card-glow-rose",
      badgeClass: "badge-vibrant-rose",
      avatarBg: "bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600",
    },
    {
      name: "Marcus Vance",
      role: "Lead Tech Recruiter",
      institution: "CloudScale Software Solutions",
      avatar: "MV",
      type: "Hiring Partner",
      score: "15+ Hires from Platform",
      discount: "Pre-Vetted Talent Pipeline",
      quote:
        "Instead of filtering through 500 identical resumes, we hire directly from ANZEYL SOLUTIONS' Platinum assessment tier. The candidate coding quality is consistently top notch.",
      rating: 5,
      accent: "from-amber-400 to-orange-500",
      cardGlow: "card-glow-amber",
      badgeClass: "badge-vibrant-amber",
      avatarBg: "bg-gradient-to-tr from-amber-400 via-yellow-400 to-orange-500",
    },
  ];

  return (
    <section className="py-24 bg-colorful-subtle relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            Learner & Partner Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Stories of <span className="text-gradient-brand">Real Growth & Success</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            See how students, universities, and companies leverage our AI platform to accelerate tech careers.
          </p>

          {/* Mandatory Demo Content Label */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 text-xs text-center mt-2 shadow-md">
            <HelpCircleIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-amber-300 font-bold">Demonstration Notice:</strong> Demo Testimonials / Sample User Stories for platform presentation.
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`glass-card p-8 rounded-3xl border border-white/10 ${t.cardGlow} flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl`}
            >
              {/* Colorful Top Accent Strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${t.accent}`} />

              <div className="space-y-5">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.badgeClass}`}>
                    {t.type}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, rIdx) => (
                      <StarIcon key={rIdx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Score & Discount Pills */}
                <div className="p-3.5 rounded-xl bg-[#0b0e18] border border-white/10 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <TrophyIcon className="w-4 h-4" />
                    <span>{t.score}</span>
                  </div>
                  <p className="text-xs text-amber-300 font-bold">{t.discount}</p>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-300 leading-relaxed font-normal italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${t.avatarBg} flex items-center justify-center text-slate-950 font-black text-xs shadow-lg`}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                  <p className="text-xs text-cyan-300 font-semibold">{t.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
