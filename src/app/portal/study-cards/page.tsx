"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  BookOpenIcon,
} from "@/components/Icons";
import { COURSE_STUDY_CARDS } from "@/lib/studyCardsData";
import { ANZEYL_COURSES } from "@/lib/courseData";

export default function StudyCardsPage() {
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>("full-stack-development");
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);
  const [reviewCards, setReviewCards] = useState<string[]>([]);

  const availableCards = useMemo(() => {
    return COURSE_STUDY_CARDS[selectedCourseSlug] || [];
  }, [selectedCourseSlug]);

  const currentCard = availableCards[currentCardIndex] || availableCards[0];

  const handleCardRate = (status: "review" | "mastered") => {
    if (!currentCard) return;
    setIsFlipped(false);
    if (status === "mastered" && !masteredCards.includes(currentCard.id)) {
      setMasteredCards([...masteredCards, currentCard.id]);
      setReviewCards(reviewCards.filter((id) => id !== currentCard.id));
    } else if (status === "review" && !reviewCards.includes(currentCard.id)) {
      setReviewCards([...reviewCards, currentCard.id]);
      setMasteredCards(masteredCards.filter((id) => id !== currentCard.id));
    }

    if (currentCardIndex < availableCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const masteryPercent = availableCards.length
    ? Math.round(
      (masteredCards.filter((id) => availableCards.some((c) => c.id === id)).length /
        availableCards.length) *
      100
    )
    : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header & Course Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
              Quick Revision & Memorization
            </span>
            <span className="text-xs text-[#64748b]">Course Flashcards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] mt-1">
            Study Cards
          </h1>
          <p className="text-xs sm:text-sm text-[#263746] mt-1">
            Flip cards to cement key architecture concepts and ace your technical interviews.
          </p>
        </div>

        {/* Mastery Counter */}
        {availableCards.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white border border-[#e5e7eb] text-center shadow-2xs">
              <span className="block text-[10px] text-[#64748b] font-bold uppercase">Mastered</span>
              <span className="text-sm font-black text-emerald-700">
                {masteredCards.filter((id) => availableCards.some((c) => c.id === id)).length} / {availableCards.length}
              </span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white border border-[#e5e7eb] text-center shadow-2xs">
              <span className="block text-[10px] text-[#64748b] font-bold uppercase">Progress</span>
              <span className="text-sm font-black text-[#176b87]">{masteryPercent}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Course Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {ANZEYL_COURSES.map((course) => {
          const count = COURSE_STUDY_CARDS[course.slug]?.length || 0;
          const isSelected = selectedCourseSlug === course.slug;
          return (
            <button
              key={course.slug}
              onClick={() => {
                setSelectedCourseSlug(course.slug);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                isSelected
                  ? "bg-[#176b87] border-[#12566c] text-white shadow-xs"
                  : "bg-white border-[#d6dde0] text-[#263746] hover:bg-[#f7f5ef] hover:border-[#176b87]"
              }`}
            >
              {course.title} {count > 0 ? `(${count})` : ""}
            </button>
          );
        })}
      </div>

      {/* EMPTY STATE IF NO CARDS */}
      {availableCards.length === 0 ? (
        <div className="p-16 text-center bg-white border border-dashed border-[#d6dde0] rounded-3xl space-y-4 shadow-2xs">
          <BookOpenIcon className="w-12 h-12 text-[#64748b] mx-auto" />
          <h2 className="text-base font-bold text-[#17191D]">No Flashcards Available Yet</h2>
          <p className="text-xs text-[#64748b] max-w-md mx-auto">
            Flashcards for this course are currently being curated by our faculty. In the meantime, explore our Practice Questions or Course Notes.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/portal/practice"
              className="px-5 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs shadow-xs transition-colors"
            >
              Go to Practice Questions
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-[#64748b]">
              <span>
                Card {currentCardIndex + 1} of {availableCards.length}
              </span>
              <span className="text-[#176b87] font-semibold">{currentCard.topic}</span>
            </div>
            <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#176b87] h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentCardIndex + 1) / availableCards.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Flippable Flashcard */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[380px] cursor-pointer select-none group"
          >
            <div
              className={`relative w-full min-h-[380px] rounded-3xl border shadow-sm p-8 flex flex-col justify-between transition-all duration-300 ${
                isFlipped
                  ? "bg-[#f7f5ef] border-[#d6dde0]"
                  : "bg-white border-[#e5e7eb]"
              }`}
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#176b87] rounded-t-3xl" />

              {/* FRONT */}
              {!isFlipped ? (
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20 uppercase tracking-wider">
                      {currentCard.topic}
                    </span>
                    <span className="text-xs text-[#64748b] flex items-center gap-1 font-semibold">
                      <span>Click to reveal answer</span>
                      <span className="text-[#176b87] font-bold">↻</span>
                    </span>
                  </div>

                  <div className="space-y-4 my-auto py-6">
                    <h2 className="text-xl sm:text-2xl font-black text-[#17191D] leading-snug">
                      {currentCard.frontPrompt}
                    </h2>
                    {currentCard.frontHint && (
                      <p className="text-xs text-[#64748b] italic bg-[#f7f5ef] p-3 rounded-xl border border-[#e5e7eb]">
                        💡 Hint: {currentCard.frontHint}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#64748b] pt-4 border-t border-[#e5e7eb]">
                    <span>Click anywhere on the card to flip</span>
                    <span className="text-[#176b87] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Reveal Concept →
                    </span>
                  </div>
                </div>
              ) : (
                /* BACK */
                <div className="flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Concept: {currentCard.backConcept}
                    </span>
                    <span className="text-xs text-[#64748b] font-semibold">Click to flip back ↻</span>
                  </div>

                  <div className="space-y-3 overflow-y-auto max-h-[250px] custom-scrollbar pr-1">
                    {currentCard.backCodeSnippet && (
                      <div className="rounded-xl bg-[#263746] p-3 font-mono text-xs text-emerald-300 border border-slate-700 overflow-x-auto">
                        <pre>{currentCard.backCodeSnippet}</pre>
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-[#263746] leading-relaxed">
                      {currentCard.backExplanation}
                    </p>
                    {currentCard.interviewTip && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                        <strong className="text-amber-800 block mb-0.5">Interview Tip:</strong>
                        {currentCard.interviewTip}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#e5e7eb] text-[11px] text-[#64748b] text-center font-medium">
                    Rate this card to update your revision progress:
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Controls: Known vs Needs Revision */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleCardRate("review")}
              className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <span>Needs Revision</span>
              <span className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded text-amber-900">Repeat</span>
            </button>

            <button
              onClick={() => handleCardRate("mastered")}
              className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <span>Mark as Known</span>
              <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          {/* Previous / Next Controls */}
          <div className="flex items-center justify-between text-xs text-[#64748b] pt-4 border-t border-[#e5e7eb]">
            <button
              onClick={() => {
                setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : availableCards.length - 1));
                setIsFlipped(false);
              }}
              className="hover:text-[#17191D] font-semibold transition-colors"
            >
              ← Previous Card
            </button>

            <Link
              href="/portal/practice"
              className="text-[#176b87] font-bold hover:underline flex items-center gap-1"
            >
              <span>Practice Questions Mode</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                setCurrentCardIndex((prev) => (prev < availableCards.length - 1 ? prev + 1 : 0));
                setIsFlipped(false);
              }}
              className="hover:text-[#17191D] font-semibold transition-colors"
            >
              Next Card →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
