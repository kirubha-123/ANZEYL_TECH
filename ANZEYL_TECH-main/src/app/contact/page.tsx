"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  MailIcon,
  PhoneIcon,
  BuildingIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  HelpCircleIcon,
} from "@/components/Icons";

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<"student" | "college" | "enterprise">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-vibrant-rainbow font-bold text-xs uppercase tracking-wider shadow-lg">
            <MailIcon className="w-3.5 h-3.5 text-cyan-300" />
            <span>24/7 Global Student & Institutional Support</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We&apos;re Here to Help You <br />
            <span className="text-gradient-brand">Accelerate Your Learning</span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            Have questions about our curriculums, assessment voucher discounts, corporate internships, 
            or campus college partnerships? Reach out to our engineering support team.
          </p>
        </div>

        {/* 2-Column: Form on Left, Contact Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="human-surface p-7 sm:p-9 rounded-3xl border border-white/15 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 to-cyan-500" />

              {/* Inquiry Type Switcher */}
              <div className="space-y-2 pt-1 border-b border-white/10 pb-5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Select Inquiry Type:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setInquiryType("student")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      inquiryType === "student"
                        ? "btn-colorful-primary text-white shadow-md"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType("college")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      inquiryType === "college"
                        ? "btn-colorful-primary text-white shadow-md"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    College / University
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType("enterprise")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      inquiryType === "enterprise"
                        ? "btn-colorful-primary text-white shadow-md"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    Hiring Partner
                  </button>
                </div>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircleIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>. An advisor from our {inquiryType} advisory team has received your inquiry and will respond within 4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setSubject("");
                      setMessage("");
                    }}
                    className="btn-colorful-primary px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="human-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="human-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="human-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Assessment Discount Inquiry"
                        className="human-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Your Message or Questions *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify your current learning goals, course interest, or campus partnership details..."
                      className="human-input w-full px-3.5 py-2.5 rounded-xl text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-colorful-primary w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message to Team</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Details & Operations Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-5 shadow-xl">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-cyan-400" />
                <span>Direct Contact Channels</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm font-semibold">General Inquiries:</strong>
                    <a href="mailto:support@ANZEYLai.com" className="text-cyan-400 hover:underline">
                      support@ANZEYLai.com
                    </a>
                    <span className="text-slate-400 block text-[11px] mt-0.5">Average response time: &lt; 2 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm font-semibold">Admissions Hotline:</strong>
                    <span className="text-slate-200">+91 (800) 425-7890 / +91 (80) 4920-1100</span>
                    <span className="text-slate-400 block text-[11px] mt-0.5">Mon - Sat, 9:00 AM - 8:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                    <BuildingIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm font-semibold">Engineering Hub:</strong>
                    <span className="text-slate-200">
                      ANZEYL Tech Park, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Placement & Institutional Card */}
            <div className="p-6 rounded-3xl bg-[#0b0e18] border border-emerald-500/30 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>Colleges & University Deans</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Looking to introduce ANZEYL proctored assessments, AI tutoring labs, and internship pipelines to your 2026/2027 graduating batch?
              </p>
              <a
                href="/for-colleges"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors pt-1"
              >
                Explore Institutional Partnership Model →
              </a>
            </div>

            {/* Need immediate AI answer */}
            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-cyan-200">
                <HelpCircleIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Have a quick programming doubt right now?</span>
              </div>
              <a
                href="/ai-tutor"
                className="btn-colorful-primary px-3 py-1.5 rounded-lg text-white font-bold text-xs shrink-0"
              >
                Ask AI Tutor
              </a>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
