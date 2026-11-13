"use client";

import React, { useState } from "react";
import {
  CheckCircleIcon,
  SearchIcon,
} from "@/components/Icons";

interface VoucherRule {
  id: string;
  minScore: number;
  discountPct: number;
  label: string;
  targetTrack: string;
}

interface ActiveVoucher {
  code: string;
  student: string;
  discount: number;
  scoreAchieved: number;
  status: "Redeemed" | "Active" | "Expired";
  expiryDate: string;
}

const INITIAL_RULES: VoucherRule[] = [
  { id: "r-1", minScore: 70, discountPct: 35, label: "Merit Tier 1", targetTrack: "All Cohorts" },
  { id: "r-2", minScore: 85, discountPct: 50, label: "Merit Honors Tier", targetTrack: "Internships & Pro Cohorts" },
  { id: "r-3", minScore: 95, discountPct: 75, label: "Fellowship Scholar", targetTrack: "Top 5% Cohort" },
];

const INITIAL_VOUCHERS: ActiveVoucher[] = [
  { code: "SB-MERIT-88PCT-REACT", student: "Alex Rivera", discount: 35, scoreAchieved: 88, status: "Active", expiryDate: "Nov 30, 2026" },
  { code: "SB-HONOR-96PCT-FS", student: "Priya Sharma", discount: 50, scoreAchieved: 96, status: "Redeemed", expiryDate: "Dec 15, 2026" },
  { code: "SB-MERIT-92PCT-KAFKA", student: "Liam O'Connor", discount: 50, scoreAchieved: 92, status: "Redeemed", expiryDate: "Nov 15, 2026" },
  { code: "SB-MERIT-84PCT-AI", student: "Sophia Zhang", discount: 35, scoreAchieved: 84, status: "Active", expiryDate: "Dec 01, 2026" },
];

export default function AdminVouchersPage() {
  const [rules, setRules] = useState<VoucherRule[]>(INITIAL_RULES);
  const [vouchers] = useState<ActiveVoucher[]>(INITIAL_VOUCHERS);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const handleUpdateRule = (id: string, newDiscount: number) => {
    setRules(
      rules.map((r) => (r.id === id ? { ...r, discountPct: newDiscount } : r))
    );
    setNotice("Merit discount rules successfully updated!");
    setTimeout(() => setNotice(null), 3000);
  };

  const filteredVouchers = vouchers.filter(
    (v) =>
      v.code.toLowerCase().includes(search.toLowerCase()) ||
      v.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
            Merit Economics & Financial Aid
          </span>
          <span className="text-xs text-slate-400">Automated Tuition Discounts Based on Exam Performance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Merit Vouchers & Tuition Discount Rules
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Reward high-performing students who demonstrate engineering excellence. Calibrate passing cutoffs to automatically issue verifiable discount codes.
        </p>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4" />
          <span>{notice}</span>
        </div>
      )}

      {/* Rules Configuration Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Automated Merit Threshold Rules</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="glass-card p-6 rounded-3xl border border-white/10 bg-[#0f1424]/90 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  {rule.label}
                </span>
                <span className="text-slate-400 text-[11px] font-mono">{rule.targetTrack}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400">Exam Score Threshold:</span>
                <div className="text-2xl font-black text-white">Score ≥ {rule.minScore}%</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#070911] border border-white/5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Tuition Reduction:</span>
                  <strong className="text-emerald-400 text-sm font-black">{rule.discountPct}% Off</strong>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {[25, 35, 50, 75].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => handleUpdateRule(rule.id, pct)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        rule.discountPct === pct
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-white/5 text-slate-300 hover:text-white"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Vouchers Ledger */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-white">Active Student Vouchers Ledger</h2>

          <div className="relative max-w-xs w-full">
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code or student..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#0f1424] border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
            />
          </div>
        </div>

        <div className="glass-card rounded-3xl border border-white/10 bg-[#0f1424]/90 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#070911] border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4 pl-6">Voucher Code</th>
                  <th className="p-4">Assigned Student</th>
                  <th className="p-4">Score Achieved</th>
                  <th className="p-4">Tuition Discount</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredVouchers.map((v) => (
                  <tr key={v.code} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-cyan-300">
                      {v.code}
                    </td>
                    <td className="p-4 text-white font-semibold">{v.student}</td>
                    <td className="p-4 font-mono font-bold text-emerald-400">
                      {v.scoreAchieved}%
                    </td>
                    <td className="p-4 font-black text-amber-400">{v.discount}% Off</td>
                    <td className="p-4 text-slate-400">{v.expiryDate}</td>
                    <td className="p-4 pr-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          v.status === "Redeemed"
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                            : v.status === "Active"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : "bg-white/5 text-slate-400 border-white/10"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
