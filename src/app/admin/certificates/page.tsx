"use client";

import React, { useState } from "react";
import {
  AwardIcon,
  SearchIcon,
  CheckCircleIcon,
} from "@/components/Icons";

interface IssuedCert {
  id: string;
  credentialId: string;
  recipientName: string;
  courseTitle: string;
  issueDate: string;
  verificationHash: string;
  status: "Active" | "Revoked";
}

const INITIAL_CERTS: IssuedCert[] = [
  {
    id: "c-1",
    credentialId: "SB-CERT-2026-90412",
    recipientName: "Alex Rivera",
    courseTitle: "Enterprise PostgreSQL & Supabase Row Level Security Specialist",
    issueDate: "October 24, 2026",
    verificationHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    status: "Active",
  },
  {
    id: "c-2",
    credentialId: "SB-CERT-2026-88104",
    recipientName: "Priya Sharma",
    courseTitle: "Full-Stack React 19 & Next.js 16 Production Systems Engineer",
    issueDate: "October 20, 2026",
    verificationHash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    status: "Active",
  },
  {
    id: "c-3",
    credentialId: "SB-CERT-2026-77319",
    recipientName: "Liam O'Connor",
    courseTitle: "Distributed Cloud Architecture & High-Concurrency Systems",
    issueDate: "October 18, 2026",
    verificationHash: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    status: "Active",
  },
];

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<IssuedCert[]>(INITIAL_CERTS);
  const [search, setSearch] = useState("");
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Form State
  const [recipient, setRecipient] = useState("");
  const [course, setCourse] = useState("Full-Stack React 19 & Next.js 16 Production Systems Engineer");

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) return;

    const randomId = Math.floor(10000 + Math.random() * 90000);
    const mockHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

    const newCert: IssuedCert = {
      id: `c-${Date.now()}`,
      credentialId: `SB-CERT-2026-${randomId}`,
      recipientName: recipient.trim(),
      courseTitle: course,
      issueDate: "October 31, 2026",
      verificationHash: mockHash,
      status: "Active",
    };

    setCerts([newCert, ...certs]);
    setShowIssueModal(false);
    setRecipient("");
    setNotice(`Certificate ${newCert.credentialId} successfully minted and issued to ${newCert.recipientName}!`);
    setTimeout(() => setNotice(null), 4000);
  };

  const handleToggleRevoke = (id: string) => {
    setCerts(
      certs.map((c) =>
        c.id === id ? { ...c, status: c.status === "Active" ? "Revoked" : "Active" } : c
      )
    );
  };

  const filtered = certs.filter(
    (c) =>
      c.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      c.credentialId.toLowerCase().includes(search.toLowerCase()) ||
      c.verificationHash.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
              Cryptographic Credentials Desk
            </span>
            <span className="text-xs text-slate-400">Verifiable SHA-256 Ledger & LinkedIn Additions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Certificate Issuance & Verification Authority
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Audit, verify, and mint official accredited certificates for cohort graduates. All certificates feature deterministic verification hashes for corporate recruiters.
          </p>
        </div>

        <button
          onClick={() => setShowIssueModal(true)}
          className="btn-colorful-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
        >
          <AwardIcon className="w-3.5 h-3.5" />
          <span>+ Mint New Certificate</span>
        </button>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4" />
          <span>{notice}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative max-w-md">
        <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student, ID (e.g. SB-CERT...), or hash..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#0f1424] border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
        />
      </div>

      {/* Certificates Table */}
      <div className="glass-card rounded-3xl border border-white/10 bg-[#0f1424]/90 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070911] border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 pl-6">Recipient & Program</th>
                <th className="p-4">Credential ID</th>
                <th className="p-4">Cryptographic Hash (SHA-256)</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((cert) => (
                <tr key={cert.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 pl-6">
                    <strong className="text-white text-sm block">{cert.recipientName}</strong>
                    <span className="text-[11px] text-slate-400">{cert.courseTitle}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-cyan-400">
                    {cert.credentialId}
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-[11px] text-slate-400 truncate block max-w-xs">
                      {cert.verificationHash}
                    </span>
                    <span className="text-[10px] text-slate-400">Issued: {cert.issueDate}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        cert.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => handleToggleRevoke(cert.id)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    >
                      {cert.status === "Active" ? "Revoke" : "Restore"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mint Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-lg w-full p-8 rounded-3xl border border-indigo-500/40 bg-[#0f1424] space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Mint Accredited Certificate</h3>
              <button
                onClick={() => setShowIssueModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleIssueCert} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Recipient Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Engineering Program</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                >
                  <option value="Full-Stack React 19 & Next.js 16 Production Systems Engineer">
                    Full-Stack React 19 & Next.js 16 Production Systems Engineer
                  </option>
                  <option value="Enterprise PostgreSQL & Supabase Row Level Security Specialist">
                    Enterprise PostgreSQL & Supabase Row Level Security Specialist
                  </option>
                  <option value="Distributed Cloud Architecture & High-Concurrency Systems">
                    Distributed Cloud Architecture & High-Concurrency Systems
                  </option>
                  <option value="Autonomous Agent Architect & LLM Systems Professional">
                    Autonomous Agent Architect & LLM Systems Professional
                  </option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] leading-relaxed">
                Issuing will cryptographically register a SHA-256 record and make the credential immediately verifiable on LinkedIn and corporate recruiter portals.
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl btn-colorful-primary text-white font-bold"
                >
                  Sign & Mint Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
