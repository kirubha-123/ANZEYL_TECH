"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { formatINR } from "@/lib/formatters";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ZapIcon,
  TrophyIcon,
  HelpCircleIcon,
  XIcon,
} from "@/components/Icons";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [testScore, setTestScore] = useState<number>(85);

  const calculateDiscount = (score: number) => {
    if (score >= 90) return 50;
    if (score >= 80) return 30;
    if (score >= 70) return 15;
    return 0;
  };

  const discountPercent = calculateDiscount(testScore);

  const plans = [
    {
      id: "free",
      name: "Explorer",
      tagline: "Essential preview of courses, assessments, and AI tools",
      monthlyPrice: 0,
      annualPrice: 0,
      badge: "No Credit Card",
      badgeStyle: "badge-vibrant-cyan",
      popular: false,
      ctaText: "Start Free Today",
      ctaLink: "/get-started",
      ctaStyle: "bg-white/10 hover:bg-white/15 text-white border border-white/20",
      features: [
        "Access to introductory modules in 20+ courses",
        "1 Proctored Skill Assessment attempt with scorecard",
        "20 AI Tutor prompt queries per month",
        "Interactive study cards & flashcards",
        "Community discussion board access",
      ],
      notIncluded: [
        "Verifiable accredited course certificates",
        "Guaranteed internship shortlisting",
        "Live weekly mentor code reviews",
        "1-on-1 AI mock technical interview simulations",
      ],
    },
    {
      id: "pro",
      name: "Pro Learner",
      tagline: "Unrestricted access to every self-paced course & accredited certificates",
      monthlyPrice: 1499,
      annualPrice: 1199, // per month when paid annually
      badge: "Most Popular",
      badgeStyle: "badge-vibrant-rainbow",
      popular: true,
      ctaText: "Get Pro Access",
      ctaLink: "/get-started",
      ctaStyle: "btn-colorful-primary text-white shadow-xl",
      features: [
        "Unlimited access to ALL current & future courses",
        "Unlimited Proctored Skill Assessments",
        "Unlimited 24/7 AI Tutor code debugging assistant",
        "Accredited certificates with 1-click LinkedIn export",
        "Full question bank & timed practice exams",
        "Downloadable PDF study guides & architecture notes",
        "Score-based tuition discounts applicable",
      ],
      notIncluded: [
        "Live mentor classroom sessions",
        "Direct PPO placement transition",
      ],
    },
    {
      id: "cohort",
      name: "Career Accelerator",
      tagline: "Mentor-led live cohorts, direct internship matching & PPO transitions",
      monthlyPrice: 4999,
      annualPrice: 3999, // per month when paid annually
      badge: "Placement Guarantee",
      badgeStyle: "badge-vibrant-amber",
      popular: false,
      ctaText: "Apply for Cohort",
      ctaLink: "/training",
      ctaStyle: "btn-colorful-amber text-slate-950 font-black shadow-xl",
      features: [
        "Everything in Pro Learner included",
        "Live weekend classes with principal architects",
        "Guaranteed paid corporate internship matching",
        "1-on-1 weekly code reviews & pull request audits",
        "Full AI Mock Interview practice suite with audio/video feedback",
        "Dedicated placement counselor & resume rewrite",
        "Up to 50% tuition reduction with Assessment score",
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-14">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider shadow-lg">
            <ZapIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>Merit-Based Pricing Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Transparent Pricing with <br />
            <span className="text-gradient-brand">Merit Tuition Discounts</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            We believe education should reward mastery. Score high on your ANZEYL assessment to unlock 
            up to 50% discount on all pro access and mentor-led cohorts.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="p-1 rounded-2xl bg-[#0b0e18] border border-white/10 flex items-center">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-white/15 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  billingCycle === "annual"
                    ? "btn-colorful-primary text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.5 rounded-md">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const basePrice = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
            const discountedPrice = Math.round(basePrice * (1 - (plan.id !== "free" ? discountPercent / 100 : 0)));

            return (
              <div
                key={plan.id}
                className={`glass-card p-7 sm:p-9 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 shadow-2xl ${
                  plan.popular
                    ? "border-purple-500/50 bg-[#12162a]/95 scale-100 lg:-translate-y-2"
                    : "border-white/10 bg-[#0d111d]/90"
                }`}
              >
                {/* Rainbow strip on popular */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 to-cyan-500" />
                )}

                <div className="space-y-6">
                  {/* Top Badge & Plan Name */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${plan.badgeStyle}`}>
                      {plan.badge}
                    </span>
                    {discountPercent > 0 && plan.id !== "free" && (
                      <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        {discountPercent}% Merit Discount Applied
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-2xl font-extrabold text-white">{plan.name}</h2>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="p-4 rounded-2xl bg-[#0b0e18] border border-white/5 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {formatINR(discountedPrice)}
                      </span>
                      {basePrice > 0 && (
                        <span className="text-xs text-slate-400">/ month</span>
                      )}
                    </div>
                    {discountPercent > 0 && basePrice > 0 && (
                      <span className="text-xs text-slate-400 line-through block">
                        Original: {formatINR(basePrice)} / mo
                      </span>
                    )}
                    {basePrice > 0 && (
                      <p className="text-[11px] text-cyan-300 font-medium">
                        {billingCycle === "annual" ? "Billed annually • Cancel anytime" : "Billed monthly"}
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                      What&apos;s Included:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((nFeat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-slate-400 opacity-60">
                          <XIcon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span className="line-through">{nFeat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call to action */}
                <div className="pt-8">
                  <Link
                    href={plan.ctaLink}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${plan.ctaStyle}`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Merit Discount Simulator Section */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-amber-500/30 bg-[#0f1424] space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                <TrophyIcon className="w-4 h-4" />
                <span>Simulate Your Assessment Score</span>
              </div>
              <h3 className="text-2xl font-bold text-white">How much tuition discount can you unlock?</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Move the slider below to preview how high assessment scores automatically reduce your platform and cohort tuition fees.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b0e18] border border-amber-500/40 text-center shrink-0">
              <span className="text-xs text-slate-400 block font-medium">Your Discount Voucher</span>
              <span className="text-3xl font-black text-amber-400">{discountPercent}% OFF</span>
              <span className="text-[11px] text-amber-200 block mt-1">Valid across all programs</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Target Score: {testScore}%</span>
              <span className="text-cyan-300">
                {testScore >= 90 ? "Top 5% Tier (Maximum 50% Reduction)" : testScore >= 80 ? "Top 20% Tier (30% Reduction)" : testScore >= 70 ? "Passing Tier (15% Reduction)" : "Take prep lessons to reach 70%+"}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={testScore}
              onChange={(e) => setTestScore(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="grid grid-cols-4 text-center text-[11px] text-slate-400 pt-1">
              <div>&lt; 70% (0% Off)</div>
              <div>70% - 79% (15% Off)</div>
              <div>80% - 89% (30% Off)</div>
              <div className="text-amber-300 font-bold">90%+ (50% Off)</div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
              Proctored assessment results are tamper-proof and verified automatically on your profile.
            </span>
            <Link
              href="/assessments"
              className="btn-colorful-amber px-6 py-2.5 rounded-xl text-slate-950 font-black text-xs shrink-0 flex items-center gap-2 shadow-lg"
            >
              <span>Take Assessment Now</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-400">Everything you need to know about plans and payments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0d111d] border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircleIcon className="w-4 h-4 text-cyan-400" />
                How do I redeem my tuition discount?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you pass a proctored assessment with 70%+, a verified voucher is attached to your user ID. During checkout, the discount is automatically applied to your invoice.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d111d] border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircleIcon className="w-4 h-4 text-cyan-400" />
                What is the money-back guarantee?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We offer a full 14-day refund guarantee on Pro Learner and Career Accelerator plans. If you are not satisfied with your mentor reviews or course quality, email support for a no-questions-asked refund.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d111d] border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircleIcon className="w-4 h-4 text-cyan-400" />
                Which payment methods are supported?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We support all major Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), NetBanking, and no-cost EMI options for cohorts via Razorpay and Stripe.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d111d] border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircleIcon className="w-4 h-4 text-cyan-400" />
                Can my university or company sponsor me?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yes! We provide corporate GST invoices and partner university voucher codes. Visit our College portal or Contact page for group onboarding.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
