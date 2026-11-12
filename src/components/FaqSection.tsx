"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "./Icons";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is ANZEYL and how does it work?",
      answer:
        "ANZEYL is a next-generation EdTech platform that combines 24/7 AI tutoring, adaptive technical skill assessments, hands-on capstone projects, and merit-based course discounts. Students master high-demand tech skills, prove competency through proctored tests, and connect directly with partner recruiters.",
      color: "border-l-rose-500",
    },
    {
      question: "How do adaptive skill assessments work?",
      answer:
        "Our assessments dynamically adjust question difficulty based on your answers in real time. They test conceptual understanding, coding syntax, and practical problem-solving. Completing an assessment generates a verified skill transcript and percentile score.",
      color: "border-l-cyan-400",
    },
    {
      question: "How are course tuition discounts calculated?",
      answer:
        "Discount vouchers are awarded based on verified assessment performance: Silver Tier (70-79%) unlocks 15% off, Gold Tier (80-89%) unlocks 30% off, and Platinum Tier (90-100%) unlocks up to 50% off advanced career tracks. *Note: All discounts shown on the homepage are sample demonstration models.",
      color: "border-l-amber-400",
    },
    {
      question: "How can colleges and universities partner with ANZEYL?",
      answer:
        "Institutions receive access to a dedicated Campus Skill Dashboard, automated student benchmarking tools, accredited curriculum alignment, and direct career placement pipelines. Interested colleges can request an institutional demo via our 'For Colleges' page.",
      color: "border-l-emerald-400",
    },
    {
      question: "Is the AI Tutor available 24/7?",
      answer:
        "Yes! The AI Tutor provides instant code debugging hints, concept breakdowns, practice question generation, and individualized study path suggestions around the clock.",
      color: "border-l-violet-500",
    },
    {
      question: "Are the certificates verified for hiring partners?",
      answer:
        "Yes, every completed course and assessment generates a tamper-proof digital credential with verifiable score metrics that can be embedded directly into resumes, LinkedIn profiles, or recruiter application portals.",
      color: "border-l-pink-500",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-colorful-mesh relative border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-gradient-brand">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Find answers to common questions about our platform, assessments, and partner programs.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? `border-white/20 bg-[#121626] border-l-4 ${faq.color} shadow-xl`
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold pr-4 transition-colors ${isOpen ? "text-white" : "text-slate-200"}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-gradient-to-tr from-amber-400 to-rose-500 text-white rotate-180 shadow-md"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
