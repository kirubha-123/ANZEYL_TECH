"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/Icons";

interface StudyCard {
  id: string;
  category: string;
  frontPrompt: string;
  frontHint?: string;
  backConcept: string;
  backCodeSnippet?: string;
  backExplanation: string;
  interviewTip: string;
}

const DECKS: Record<string, { title: string; color: string; cards: StudyCard[] }> = {
  "nextjs-react": {
    title: "Next.js 16 & React 19 Internals",
    color: "from-cyan-500 to-blue-600",
    cards: [
      {
        id: "nr-1",
        category: "React 19 Server Components",
        frontPrompt: "What is the key difference between Server Components and Client Components in Next.js App Router?",
        frontHint: "Think about where the JavaScript bundle executes and what is shipped to the client browser.",
        backConcept: "Server-First Execution vs Client Island Hydration",
        backCodeSnippet: `// Server Component (Default in App Router):
// Zero client bundle, runs on server/edge, direct DB access
async function UserProfile({ id }: { id: string }) {
  const user = await db.users.findUnique({ where: { id } });
  return <div>{user.name}</div>;
}`,
        backExplanation: "Server Components execute solely on the server and emit serialized React Server Component (RSC) payload HTML without client JS bundles. Client components ('use client') hydrate in the browser and enable hooks (useState, useEffect, event listeners).",
        interviewTip: "Interviewers look for understanding that 'use client' does NOT mean server rendering is skipped; client components are still SSR'd on initial page load!",
      },
      {
        id: "nr-2",
        category: "Next.js 16 Caching & PPR",
        frontPrompt: "How does Next.js 16 handle Partial Prerendering (PPR) alongside cacheComponents?",
        frontHint: "Think about combining static shell rendering with dynamic streaming holes.",
        backConcept: "Partial Prerendering (PPR)",
        backCodeSnippet: `<Suspense fallback={<NavbarSkeleton />}>
  <DynamicUserProfile /> {/* Dynamic stream hole */}
</Suspense>`,
        backExplanation: "PPR serves an instant static HTML shell from the edge cache while streaming in dynamic components wrapped in React <Suspense> boundaries over the same HTTP connection, eliminating TTFB latency.",
        interviewTip: "Highlight that cacheComponents replaces legacy revalidate options with explicit granular cache tagging and deterministic lifetime bounds.",
      },
      {
        id: "nr-3",
        category: "React 19 Compiler",
        frontPrompt: "What manual optimization hooks does the React 19 Compiler render largely obsolete?",
        frontHint: "Hooks traditionally used for memoizing values and callbacks.",
        backConcept: "Automatic Memoization",
        backCodeSnippet: `// In React 18:
const memoizedValue = useMemo(() => computeHeavy(a, b), [a, b]);
const handleClick = useCallback(() => doSomething(), []);

// In React 19 with Compiler:
const value = computeHeavy(a, b); // Automatically memoized at AST compile level!`,
        backExplanation: "The React Compiler parses JavaScript semantics and automatically injects fine-grained memoization instructions into component output, removing the need for manual useMemo, useCallback, and React.memo.",
        interviewTip: "Mention that while the compiler handles render optimization, developers still need proper dependency immutability to allow correct equality checks.",
      },
      {
        id: "nr-4",
        category: "Server Actions Security",
        frontPrompt: "Why must you ALWAYS authenticate inside a Server Action even if the button is behind an authenticated page?",
        frontHint: "Think of Server Actions as public HTTP POST endpoints under the hood.",
        backConcept: "Server Action Endpoint Exposure",
        backCodeSnippet: `export async function deletePost(postId: string) {
  'use server';
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized 401"); // MUST VERIFY
  // Execute deletion...
}`,
        backExplanation: "Every Server Action compiles into a publicly routable POST endpoint with a unique hashed action ID. Anyone with tools like curl or Postman can trigger it directly without going through your UI.",
        interviewTip: "Always emphasize zero-trust architecture: never rely on client-side state or UI guardrails for backend authorization.",
      },
    ],
  },
  "system-design": {
    title: "Distributed Systems & Scalability",
    color: "from-purple-500 to-indigo-600",
    cards: [
      {
        id: "sd-1",
        category: "Caching Architectures",
        frontPrompt: "What is the difference between Cache-Aside (Lazy Loading) and Write-Through caching patterns?",
        frontHint: "Consider who writes to the cache and what happens on cache misses.",
        backConcept: "Cache-Aside vs Write-Through",
        backCodeSnippet: `// Cache-Aside:
let data = await redis.get(key);
if (!data) {
  data = await db.query(key);
  await redis.set(key, data, { ex: 3600 });
}`,
        backExplanation: "In Cache-Aside, the application directly queries the cache; if not found, it queries the database and populates the cache. In Write-Through, the application writes only to the cache, which synchronously updates the backing store.",
        interviewTip: "Discuss trade-offs: Cache-Aside is resilient to cache failure, while Write-Through guarantees that cached data is never stale at the cost of higher write latency.",
      },
      {
        id: "sd-2",
        category: "Event-Driven Systems",
        frontPrompt: "What is the difference between message queues (e.g. RabbitMQ) and event streaming logs (e.g. Apache Kafka)?",
        frontHint: "Think about message retention after consumption and multi-consumer replay.",
        backConcept: "Message Broker vs Append-Only Distributed Log",
        backCodeSnippet: `// Kafka: Messages persist in an immutable partitioned log
// Consumer maintains its own offset pointer:
consumer.seek(topicPartition, targetOffset);`,
        backExplanation: "Queues delete messages once acknowledged by an individual consumer. Kafka stores events in an immutable sequential log where multiple independent consumer groups can read at their own pace and replay history.",
        interviewTip: "Kafka is preferred for event-sourcing and stream processing pipelines; RabbitMQ is preferred for complex routing and task queues with per-message acknowledgement.",
      },
    ],
  },
  "postgres-supabase": {
    title: "Supabase & PostgreSQL Security",
    color: "from-emerald-500 to-teal-600",
    cards: [
      {
        id: "ps-1",
        category: "Row Level Security (RLS)",
        frontPrompt: "What happens if you query a PostgreSQL table via Supabase client with RLS enabled but NO policies defined?",
        frontHint: "Does it return all rows, error out, or return zero rows?",
        backConcept: "Default-Deny Policy Enforcement",
        backCodeSnippet: `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- With no policies created, all non-superuser SELECTs return 0 rows!`,
        backExplanation: "PostgreSQL enforces a default-deny policy when RLS is enabled. Unless an explicit permissive policy matching the user role or expression exists, all SELECT, INSERT, UPDATE, and DELETE operations return 0 rows.",
        interviewTip: "Highlight that service_role bypasses RLS entirely, which is why service_role keys must never be exposed to the client or browser.",
      },
    ],
  },
};

export default function StudyCardsPage() {
  const [selectedDeckKey, setSelectedDeckKey] = useState<string>("nextjs-react");
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);
  const [reviewCards, setReviewCards] = useState<string[]>([]);

  const currentDeck = DECKS[selectedDeckKey] || DECKS["nextjs-react"];
  const currentCard = currentDeck.cards[currentCardIndex] || currentDeck.cards[0];

  const handleCardRate = (status: "review" | "learning" | "mastered") => {
    setIsFlipped(false);
    if (status === "mastered" && !masteredCards.includes(currentCard.id)) {
      setMasteredCards([...masteredCards, currentCard.id]);
    } else if (status === "review" && !reviewCards.includes(currentCard.id)) {
      setReviewCards([...reviewCards, currentCard.id]);
    }

    if (currentCardIndex < currentDeck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Loop back or celebrate
      setCurrentCardIndex(0);
    }
  };

  const masteryPercent = Math.round(
    (masteredCards.length / Math.max(1, currentDeck.cards.length)) * 100
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header & Deck Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
              Interactive 3D Study Engine
            </span>
            <span className="text-xs text-slate-400">Leitner Spaced Repetition</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Flashcards & Conceptual Drill
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Flip cards to cement key architecture concepts and ace your technical interviews.
          </p>
        </div>

        {/* Gamified Mastery & Streak Pills */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-[#0f1424] border border-white/10 text-center">
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Mastered</span>
            <span className="text-sm font-black text-emerald-400">
              {masteredCards.length} / {currentDeck.cards.length}
            </span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-[#0f1424] border border-white/10 text-center">
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Mastery</span>
            <span className="text-sm font-black text-cyan-400">{masteryPercent}%</span>
          </div>
        </div>
      </div>

      {/* Deck Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {Object.entries(DECKS).map(([key, deck]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedDeckKey(key);
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
              selectedDeckKey === key
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {deck.title} ({deck.cards.length})
          </button>
        ))}
      </div>

      {/* Progress Bar within active deck */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>
            Card {currentCardIndex + 1} of {currentDeck.cards.length}
          </span>
          <span className="text-cyan-300 font-semibold">{currentCard.category}</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentCardIndex + 1) / currentDeck.cards.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 3D Flippable Card Engine Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[420px] cursor-pointer select-none perspective-1000 group"
      >
        <div
          className={`relative w-full min-h-[420px] rounded-3xl transition-transform duration-500 transform-style-3d border border-white/15 shadow-2xl p-8 flex flex-col justify-between ${
            isFlipped
              ? "rotate-y-180 bg-gradient-to-br from-[#121626] to-[#1e1338]"
              : "bg-gradient-to-br from-[#0f1424] to-[#0b0e18]"
          }`}
        >
          {/* Top Banner Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 rounded-t-3xl" />

          {/* FRONT OF CARD */}
          {!isFlipped ? (
            <div className="flex flex-col justify-between h-full space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/10 uppercase tracking-wider">
                  {currentCard.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <span>Click to flip</span>
                  <span className="text-cyan-400 font-bold">↻</span>
                </span>
              </div>

              <div className="space-y-4 my-auto py-6">
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {currentCard.frontPrompt}
                </h2>
                {currentCard.frontHint && (
                  <p className="text-xs text-slate-400 italic bg-white/5 p-3 rounded-xl border border-white/5">
                    💡 Hint: {currentCard.frontHint}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
                <span>Tip: Press Space or Click anywhere on the card</span>
                <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Reveal Answer →
                </span>
              </div>
            </div>
          ) : (
            /* BACK OF CARD */
            <div className="flex flex-col justify-between h-full space-y-4 rotate-y-180">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Concept: {currentCard.backConcept}
                </span>
                <span className="text-xs text-slate-400">Click to flip back ↻</span>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[260px] custom-scrollbar pr-1">
                {currentCard.backCodeSnippet && (
                  <div className="rounded-xl bg-black/60 p-3 font-mono text-xs text-cyan-300 border border-white/10 overflow-x-auto">
                    <pre>{currentCard.backCodeSnippet}</pre>
                  </div>
                )}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentCard.backExplanation}
                </p>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <strong className="text-amber-300 block mb-0.5">Interview Prep Angle:</strong>
                  {currentCard.interviewTip}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 text-center">
                Rate your understanding below to calibrate spaced repetition:
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spaced Repetition Action Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <button
          onClick={() => handleCardRate("review")}
          className="p-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md shadow-rose-500/10"
        >
          <span>Need Review</span>
          <span className="text-[10px] bg-rose-500/20 px-1.5 py-0.5 rounded text-rose-200">Requeue</span>
        </button>

        <button
          onClick={() => handleCardRate("learning")}
          className="p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md shadow-amber-500/10"
        >
          <span>Getting There</span>
          <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-200">Repeat Later</span>
        </button>

        <button
          onClick={() => handleCardRate("mastered")}
          className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md shadow-emerald-500/10"
        >
          <span>Mastered (+25 XP)</span>
          <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

      {/* Bottom Nav Helper */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
        <button
          onClick={() => {
            setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : currentDeck.cards.length - 1));
            setIsFlipped(false);
          }}
          className="hover:text-white transition-colors"
        >
          ← Previous Card
        </button>

        <Link
          href="/portal/quizzes/react-mastery"
          className="text-cyan-400 font-bold hover:underline flex items-center gap-1"
        >
          <span>Test with Practice Quiz</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={() => {
            setCurrentCardIndex((prev) => (prev < currentDeck.cards.length - 1 ? prev + 1 : 0));
            setIsFlipped(false);
          }}
          className="hover:text-white transition-colors"
        >
          Next Card →
        </button>
      </div>
    </div>
  );
}
