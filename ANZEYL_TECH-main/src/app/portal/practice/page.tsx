"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  SparklesIcon,
  XIcon,
} from "@/components/Icons";
import {
  INITIAL_PRACTICE_QUESTIONS,
  PRACTICE_TOPICS_BY_COURSE,
  type PracticeQuestion,
} from "@/lib/practiceQuestionsData";
import { ANZEYL_COURSES } from "@/lib/courseData";

export default function PracticeQuestionsPage() {
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>("full-stack-development");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [isTimed, setIsTimed] = useState<boolean>(false);

  // Practice session state
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number[]>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0); // in seconds
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const availableTopics = useMemo(() => {
    return ["All", ...(PRACTICE_TOPICS_BY_COURSE[selectedCourseSlug] || [])];
  }, [selectedCourseSlug]);

  // Finish practice session
  const handleFinishPractice = React.useCallback(async () => {
    setIsSubmitted(true);

    // Save attempt if logged in
    try {
      setIsSaving(true);
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        let correctCount = 0;
        sessionQuestions.forEach((q) => {
          const userAns = selectedAnswers[q.id] || [];
          const isCorrect =
            userAns.length === q.correctIndices.length &&
            userAns.every((idx) => q.correctIndices.includes(idx));
          if (isCorrect) correctCount++;
        });

        await supabase.from("practice_attempts").insert({
          user_id: userData.user.id,
          course_slug: selectedCourseSlug,
          topic: selectedTopic,
          score: correctCount,
          total_questions: sessionQuestions.length,
          answers: selectedAnswers,
        });
      }
    } catch {
      // Non-blocking for offline/guest mode
    } finally {
      setIsSaving(false);
    }
  }, [selectedCourseSlug, selectedTopic, selectedAnswers, sessionQuestions]);

  // Timer countdown
  useEffect(() => {
    if (!sessionActive || !isTimed || isSubmitted || timeRemaining <= 0) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          void handleFinishPractice();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionActive, isTimed, isSubmitted, timeRemaining, handleFinishPractice]);

  const handleStartPractice = () => {
    // Filter questions
    let pool = INITIAL_PRACTICE_QUESTIONS.filter((q) => q.published);
    if (selectedCourseSlug !== "all") {
      pool = pool.filter((q) => q.courseSlug === selectedCourseSlug);
    }
    if (selectedTopic !== "All") {
      pool = pool.filter((q) => q.topic.toLowerCase() === selectedTopic.toLowerCase());
    }
    if (selectedDifficulty !== "all") {
      pool = pool.filter((q) => q.difficulty === selectedDifficulty);
    }

    if (pool.length === 0) {
      // Fallback: take questions from the selected course anyway
      pool = INITIAL_PRACTICE_QUESTIONS.filter((q) => q.courseSlug === selectedCourseSlug && q.published);
      if (pool.length === 0) {
        pool = INITIAL_PRACTICE_QUESTIONS.filter((q) => q.published);
      }
    }

    // Shuffle and slice
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setSessionQuestions(picked);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimeRemaining(picked.length * 60); // 1 minute per question for timed mode
    setSessionActive(true);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    const currentQ = sessionQuestions.find((q) => q.id === questionId);
    if (!currentQ) return;

    if (currentQ.questionType === "multiple_choice") {
      const existing = selectedAnswers[questionId] || [];
      if (existing.includes(optionIndex)) {
        setSelectedAnswers({
          ...selectedAnswers,
          [questionId]: existing.filter((i) => i !== optionIndex),
        });
      } else {
        setSelectedAnswers({
          ...selectedAnswers,
          [questionId]: [...existing, optionIndex],
        });
      }
    } else {
      // Single choice / true_false / scenario
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: [optionIndex],
      });
    }
  };


  const calculateScore = () => {
    let correct = 0;
    sessionQuestions.forEach((q) => {
      const userAns = selectedAnswers[q.id] || [];
      const isCorrect =
        userAns.length === q.correctIndices.length &&
        userAns.every((idx) => q.correctIndices.includes(idx));
      if (isCorrect) correct++;
    });
    return {
      correct,
      total: sessionQuestions.length,
      percentage: Math.round((correct / Math.max(1, sessionQuestions.length)) * 100),
    };
  };

  const scoreResult = isSubmitted ? calculateScore() : null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
              Interactive Practice System
            </span>
            <span className="text-xs text-[#64748b]">Curriculum-Aligned Question Bank</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] mt-1">
            Practice Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#263746] mt-1 max-w-2xl">
            Test your knowledge across ANZEYL courses. Filter by domain, topic, and difficulty to practice at your own pace.
          </p>
        </div>

        {sessionActive && (
          <button
            onClick={() => setSessionActive(false)}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#f7f5ef] text-[#263746] border border-[#d6dde0] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <XIcon className="w-3.5 h-3.5 text-[#64748b]" />
            <span>Exit Practice</span>
          </button>
        )}
      </div>

      {/* SETUP / FILTER MODE (When not active) */}
      {!sessionActive && (
        <div className="p-6 sm:p-8 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-xs">
          <div className="border-b border-[#e5e7eb] pb-4">
            <h2 className="text-base font-bold text-[#17191D] flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-[#176b87]" />
              <span>Configure Your Practice Drill</span>
            </h2>
            <p className="text-xs text-[#64748b] mt-1">
              Select an enrolled course and topic to customize your drill session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Course Selector */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#263746]">Select Course</label>
              <select
                value={selectedCourseSlug}
                onChange={(e) => {
                  setSelectedCourseSlug(e.target.value);
                  setSelectedTopic("All");
                }}
                style={{ color: "#263746", backgroundColor: "#ffffff", colorScheme: "light" }}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d6dde0] text-[#263746] font-semibold text-xs focus:outline-none focus:border-[#176b87] transition-colors shadow-2xs"
              >
                {ANZEYL_COURSES.map((course) => (
                  <option
                    key={course.slug}
                    value={course.slug}
                    style={{ color: "#263746", backgroundColor: "#ffffff" }}
                    className="text-[#263746] bg-white font-medium"
                  >
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Selector */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#263746]">Select Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                style={{ color: "#263746", backgroundColor: "#ffffff", colorScheme: "light" }}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d6dde0] text-[#263746] font-semibold text-xs focus:outline-none focus:border-[#176b87] transition-colors shadow-2xs"
              >
                {availableTopics.map((topic) => (
                  <option
                    key={topic}
                    value={topic}
                    style={{ color: "#263746", backgroundColor: "#ffffff" }}
                    className="text-[#263746] bg-white font-medium"
                  >
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#263746]">Difficulty Level</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                style={{ color: "#263746", backgroundColor: "#ffffff", colorScheme: "light" }}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#d6dde0] text-[#263746] font-semibold text-xs capitalize focus:outline-none focus:border-[#176b87] transition-colors shadow-2xs"
              >
                <option value="all" style={{ color: "#263746", backgroundColor: "#ffffff" }} className="text-[#263746] bg-white">All Difficulties (Adaptive)</option>
                <option value="beginner" style={{ color: "#263746", backgroundColor: "#ffffff" }} className="text-[#263746] bg-white">Beginner</option>
                <option value="intermediate" style={{ color: "#263746", backgroundColor: "#ffffff" }} className="text-[#263746] bg-white">Intermediate</option>
                <option value="advanced" style={{ color: "#263746", backgroundColor: "#ffffff" }} className="text-[#263746] bg-white">Advanced</option>
              </select>
            </div>

            {/* Question Count */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#263746]">Number of Questions</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`py-2.5 rounded-xl font-bold transition-all text-xs border ${
                      questionCount === count
                        ? "bg-[#176b87] border-[#12566c] text-white shadow-xs"
                        : "bg-white border-[#d6dde0] text-[#263746] hover:bg-[#f7f5ef] hover:border-[#176b87]"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Timed Drill Toggle */}
          <div className="pt-2 border-t border-[#e5e7eb] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-amber-600" />
              <div>
                <span className="text-xs font-bold text-[#17191D] block">Timed Mock Exam Mode</span>
                <span className="text-[11px] text-[#64748b]">1 minute per question with automatic submission</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isTimed}
                onChange={(e) => setIsTimed(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#176b87]"></div>
            </label>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e5e7eb]">
            <span className="text-xs text-[#64748b]">
              Drill targeting: <strong className="text-[#17191D]">{ANZEYL_COURSES.find(c => c.slug === selectedCourseSlug)?.title}</strong> ({selectedTopic})
            </span>
            <button
              onClick={handleStartPractice}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-105"
            >
              <span>Start Practice Session</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUESTION BANK SYLLABUS & CONTENT EXPLORER (Visible when not active) */}
      {!sessionActive && (
        <div className="p-6 sm:p-8 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#e5e7eb] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Question Bank Directory
                </span>
                <span className="text-xs text-[#64748b]">Real Curriculum Content</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#17191D] mt-1">
                Content Inside: {ANZEYL_COURSES.find(c => c.slug === selectedCourseSlug)?.title}
              </h3>
              <p className="text-xs text-[#64748b] mt-0.5">
                Inspect topics, question formats, and sample architecture concepts tested in this domain.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] font-bold text-[#176b87]">
                {(PRACTICE_TOPICS_BY_COURSE[selectedCourseSlug] || []).length} Core Topics
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-[#f7f5ef] border border-[#e5e7eb] font-bold text-[#263746]">
                {INITIAL_PRACTICE_QUESTIONS.filter(q => q.courseSlug === selectedCourseSlug).length} Sample Drill Questions
              </span>
            </div>
          </div>

          {/* Topic Pills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#263746] block">
              Curriculum Topics (Click any topic to configure drill):
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedTopic("All")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedTopic === "All"
                    ? "bg-[#176b87] border-[#12566c] text-white shadow-2xs"
                    : "bg-[#f7f5ef] border-[#e5e7eb] text-[#263746] hover:bg-white hover:border-[#176b87]"
                }`}
              >
                All Topics
              </button>
              {(PRACTICE_TOPICS_BY_COURSE[selectedCourseSlug] || []).map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    selectedTopic === topic
                      ? "bg-[#176b87] border-[#12566c] text-white shadow-2xs"
                      : "bg-[#f7f5ef] border-[#e5e7eb] text-[#263746] hover:bg-white hover:border-[#176b87]"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Sample Questions Preview Cards */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-[#263746] flex items-center justify-between">
              <span>Sample Questions in this Question Bank:</span>
              <span className="text-[11px] text-[#64748b] font-normal">Click to see rationale and choices</span>
            </label>

            <div className="space-y-3">
              {INITIAL_PRACTICE_QUESTIONS.filter(
                (q) => q.courseSlug === selectedCourseSlug && (selectedTopic === "All" || q.topic === selectedTopic)
              ).length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] text-center text-xs text-[#64748b]">
                  More scenario questions are actively generated for topic &quot;{selectedTopic}&quot;. Select &quot;All Topics&quot; to practice across the entire curriculum.
                </div>
              ) : (
                INITIAL_PRACTICE_QUESTIONS.filter(
                  (q) => q.courseSlug === selectedCourseSlug && (selectedTopic === "All" || q.topic === selectedTopic)
                ).map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#176b87]">{q.topic}</span>
                        <span className="text-[#64748b]">•</span>
                        <span className="capitalize text-[11px] font-semibold text-[#64748b] px-2 py-0.5 rounded bg-white border border-[#e5e7eb]">
                          {q.difficulty}
                        </span>
                        <span className="text-[#64748b]">•</span>
                        <span className="text-[11px] text-[#64748b] uppercase font-mono">
                          {q.questionType.replace("_", " ")}
                        </span>
                      </div>
                      <span className="font-bold text-[#64748b]">Sample #{idx + 1}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#17191D] leading-snug">
                      {q.prompt}
                    </h4>

                    {q.codeSnippet && (
                      <div className="p-3 rounded-xl bg-[#263746] font-mono text-[11px] text-emerald-300 border border-slate-700 overflow-x-auto">
                        <pre>{q.codeSnippet}</pre>
                      </div>
                    )}

                    {/* Options Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = q.correctIndices.includes(optIdx);
                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border flex items-center gap-2 text-[11px] ${
                              isCorrect
                                ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold"
                                : "bg-white border-[#e5e7eb] text-[#263746]"
                            }`}
                          >
                            <span className="font-mono font-bold w-4">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                            {isCorrect && (
                              <span className="ml-auto text-[10px] text-emerald-700 font-bold">✓ Key</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#e5e7eb] text-[11px] text-[#263746] leading-relaxed">
                      <strong className="text-[#176b87] font-bold block mb-0.5">Tested Engineering Concept:</strong>
                      {q.explanation}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE PRACTICE SESSION */}
      {sessionActive && (
        <div className="space-y-6">
          {/* Progress / Status Header */}
          <div className="p-4 rounded-2xl border border-[#e5e7eb] bg-white flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#17191D]">
                Question {currentQIndex + 1} of {sessionQuestions.length}
              </span>
              <span className="text-[#64748b]">•</span>
              <span className="text-[#176b87] font-semibold">
                {sessionQuestions[currentQIndex]?.topic}
              </span>
              <span className="text-[#64748b]">•</span>
              <span className="px-2 py-0.5 rounded-md bg-[#f7f5ef] border border-[#e5e7eb] text-[11px] text-[#263746] capitalize font-semibold">
                {sessionQuestions[currentQIndex]?.difficulty}
              </span>
            </div>

            {isTimed && !isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 font-mono font-bold">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>
                  {Math.floor(timeRemaining / 60)}:
                  {(timeRemaining % 60).toString().padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#e5e7eb] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#176b87] h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentQIndex + 1) / sessionQuestions.length) * 100}%`,
              }}
            />
          </div>

          {/* CURRENT QUESTION DISPLAY */}
          {sessionQuestions[currentQIndex] && (
            <div className="p-6 sm:p-8 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-xs">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20 uppercase tracking-wide">
                  {sessionQuestions[currentQIndex].questionType.replace("_", " ")}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-[#17191D] mt-2 leading-relaxed">
                  {sessionQuestions[currentQIndex].prompt}
                </h2>

                {sessionQuestions[currentQIndex].codeSnippet && (
                  <div className="mt-3 p-3 rounded-xl bg-[#263746] font-mono text-xs text-emerald-300 border border-slate-700 overflow-x-auto">
                    <pre>{sessionQuestions[currentQIndex].codeSnippet}</pre>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {sessionQuestions[currentQIndex].options.map((option, optIdx) => {
                  const currentQId = sessionQuestions[currentQIndex].id;
                  const isSelected = (selectedAnswers[currentQId] || []).includes(optIdx);
                  const isCorrect = sessionQuestions[currentQIndex].correctIndices.includes(optIdx);

                  let optionStyle = "bg-white border-[#d6dde0] text-[#263746] hover:bg-[#f7f5ef] hover:border-[#176b87]";
                  let letterStyle = "bg-[#f7f5ef] border-[#d6dde0] text-[#263746]";

                  if (isSelected && !isSubmitted) {
                    optionStyle = "bg-[#e5f2f5] border-2 border-[#176b87] text-[#176b87] font-semibold shadow-xs";
                    letterStyle = "bg-[#176b87] text-white font-bold border-[#12566c]";
                  } else if (isSubmitted) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold";
                      letterStyle = "bg-emerald-600 text-white font-bold border-emerald-700";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "bg-rose-50 border-2 border-rose-500 text-rose-900";
                      letterStyle = "bg-rose-600 text-white font-bold border-rose-700";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(currentQId, optIdx)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer disabled:cursor-default ${optionStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 font-mono ${letterStyle}`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-xs sm:text-sm flex-1 pt-0.5">{option}</span>

                      {isSubmitted && isCorrect && (
                        <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                          <CheckCircleIcon className="w-4 h-4" /> Correct
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Rationale / Explanation (Only after submit) */}
              {isSubmitted && (
                <div className="p-4 rounded-2xl bg-[#f7f5ef] border border-[#d6dde0] text-xs space-y-1.5 animate-fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-[#176b87]">
                    <SparklesIcon className="w-4 h-4" />
                    <span>Answer Explanation & Architecture Concept</span>
                  </div>
                  <p className="text-[#263746] leading-relaxed">
                    {sessionQuestions[currentQIndex].explanation}
                  </p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb] text-xs">
                <button
                  type="button"
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => prev - 1)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#f7f5ef] text-[#263746] border border-[#d6dde0] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2">
                  {currentQIndex < sessionQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQIndex((prev) => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold transition-colors shadow-2xs"
                    >
                      Next →
                    </button>
                  ) : !isSubmitted ? (
                    <button
                      type="button"
                      onClick={handleFinishPractice}
                      className="px-6 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-black shadow-xs transition-transform hover:scale-105"
                    >
                      Submit Drill
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* FINAL RESULTS SCORECARD (When submitted) */}
          {isSubmitted && scoreResult && (
            <div className="p-6 sm:p-8 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-xs text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-2xl font-black">
                {scoreResult.percentage}%
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#17191D]">Drill Session Complete</h3>
                <p className="text-xs text-[#263746] mt-1">
                  You answered <strong className="text-emerald-700">{scoreResult.correct}</strong> out of{" "}
                  <strong>{scoreResult.total}</strong> questions correctly.
                </p>
                {isSaving && <p className="text-[11px] text-[#176b87] mt-1">Recording attempt to your student history…</p>}
              </div>

              {/* Review Question Navigator */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {sessionQuestions.map((q, idx) => {
                  const userAns = selectedAnswers[q.id] || [];
                  const isCorrect =
                    userAns.length === q.correctIndices.length &&
                    userAns.every((i) => q.correctIndices.includes(i));
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-9 h-9 rounded-xl font-bold text-xs border transition-all ${
                        idx === currentQIndex
                          ? "ring-2 ring-[#176b87] ring-offset-1"
                          : ""
                      } ${
                        isCorrect
                          ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                          : "bg-rose-50 border-rose-400 text-rose-700"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#e5e7eb] flex-wrap">
                <button
                  onClick={handleStartPractice}
                  className="px-6 py-2.5 rounded-xl bg-white hover:bg-[#f7f5ef] text-[#263746] border border-[#d6dde0] font-bold text-xs transition-colors"
                >
                  Retry Same Drill
                </button>
                <button
                  onClick={() => setSessionActive(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs transition-transform hover:scale-105"
                >
                  Configure New Topic
                </button>
                <Link
                  href="/portal/quizzes"
                  className="px-6 py-2.5 rounded-xl border border-[#d6dde0] bg-white text-[#263746] hover:bg-[#f7f5ef] font-bold text-xs transition-colors"
                >
                  Try Mock Test
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

