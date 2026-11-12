"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import {
  SparklesIcon,
  ArrowRightIcon,
} from "@/components/Icons";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  code?: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  "Explain Server Actions vs Route Handlers in Next.js 16",
  "How to write a secure Supabase RLS policy for profile updates?",
  "Show me an example of React 19 useActionState hook",
  "How does Kafka consumer lag affect microservice throughput?",
];

export default function PortalAiTutorPage() {
  const baseId = useId();
  const counterRef = useRef(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "ai",
      text: "Hello Alex! I am your ANZEYL Tutor. Ask me any conceptual question, paste code to debug, or request a quick practice exercise on React 19, Next.js 16, Supabase, or System Design.",
      timestamp: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    counterRef.current += 1;
    const userMsg: Message = {
      id: `${baseId}-user-${counterRef.current}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let aiReply: Message;
      const lower = text.toLowerCase();
      counterRef.current += 1;
      const replyId = `${baseId}-ai-${counterRef.current}`;

      if (lower.includes("rls") || lower.includes("supabase")) {
        aiReply = {
          id: replyId,
          sender: "ai",
          text: "Here is the production-grade PostgreSQL Row Level Security (RLS) pattern for protecting user profiles. This guarantees that only the authenticated user can update their own row while allowing public reading:",
          code: `-- 1. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Allow public to read profile data
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

-- 3. Restrict updates strictly to the owning authenticated user
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);`,
          timestamp: "Just now",
        };
      } else if (lower.includes("useactionstate") || lower.includes("react 19")) {
        aiReply = {
          id: replyId,
          sender: "ai",
          text: "In React 19, `useActionState` replaces the deprecated `useFormState`. It seamlessly binds form state to a Server Action and provides pending transitions without manual loading flags:",
          code: `'use client';
import { useActionState } from 'react';
import { updateUsernameAction } from './actions';

export function EditProfileForm() {
  const [state, formAction, isPending] = useActionState(updateUsernameAction, { error: null });

  return (
    <form action={formAction}>
      <input name="username" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Update'}
      </button>
      {state.error && <p className="text-red-400">{state.error}</p>}
    </form>
  );
}`,
          timestamp: "Just now",
        };
      } else {
        aiReply = {
          id: replyId,
          sender: "ai",
          text: `Great question regarding: "${text}".\n\nIn high-scale architectures, Next.js 16 App Router separates execution concerns between edge caching, server execution, and client island hydration. When building modern applications, always enforce zero-trust security on the backend and avoid leaking sensitive secrets into browser-side JavaScript bundles.`,
          code: `// Best Practice Architecture Check:
// 1. Validate incoming user input using Zod or ArkType
// 2. Query DB via createClient() with Supabase SSR cookies
// 3. Revalidate affected cache paths via revalidateTag()`,
          timestamp: "Just now",
        };
      }

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 1200);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <SparklesIcon className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>ANZEYL Code Tutor</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Online • GPT-4o EdTech Engine
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Interactive 24/7 code explanation, bug fixing, and architecture tutor
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: "reset",
                sender: "ai",
                text: "Session cleared! How can I help you today?",
                timestamp: "Just now",
              },
            ])
          }
          className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
        >
          Clear Chat
        </button>
      </div>

      {/* Preset Prompts Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar shrink-0">
        <span className="text-[11px] text-slate-400 font-semibold shrink-0">Try asking:</span>
        {PRESET_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="text-xs px-3 py-1.5 rounded-xl bg-[#0f1424] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-all whitespace-nowrap shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 p-4 rounded-3xl bg-[#0b0e18] border border-white/10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-2xl rounded-2xl p-4 space-y-3 text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md shadow-cyan-600/20"
                  : "bg-[#0f1424] text-slate-200 border border-white/10 rounded-bl-none shadow-xl"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-white/60 mb-1">
                <span className="font-bold">{msg.sender === "user" ? "Alex Rivera" : "ANZEYL Tutor"}</span>
                <span>{msg.timestamp}</span>
              </div>

              <p className="whitespace-pre-line text-xs sm:text-[13px]">{msg.text}</p>

              {msg.code && (
                <div className="relative rounded-xl bg-black/80 p-3 font-mono text-xs text-cyan-300 border border-white/10 mt-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-slate-400">
                    <span>Source Snippet</span>
                    <button
                      onClick={() => handleCopyCode(msg.code!, msg.id)}
                      className="text-cyan-400 hover:text-white font-bold transition-colors"
                    >
                      {copiedCodeId === msg.id ? "✓ Copied" : "Copy Code"}
                    </button>
                  </div>
                  <pre className="overflow-x-auto custom-scrollbar">{msg.code}</pre>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0f1424] border border-white/10 text-xs text-cyan-400 w-fit">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>AI Tutor is analyzing architecture and formulating code...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a technical doubt or paste code to debug..."
          className="flex-1 px-4 py-3 text-xs bg-[#0f1424] border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-xl transition-all"
        />
        <button
          type="submit"
          className="btn-colorful-primary px-6 py-3 rounded-2xl text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
        >
          <span>Send</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
