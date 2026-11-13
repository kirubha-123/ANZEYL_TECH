"use client";

import React, { useState } from "react";
import {
  SearchIcon,
  CheckCircleIcon,
} from "@/components/Icons";
import {
  INITIAL_PRACTICE_QUESTIONS,
  PRACTICE_TOPICS_BY_COURSE,
  type PracticeQuestion,
} from "@/lib/practiceQuestionsData";
import { ANZEYL_COURSES } from "@/lib/courseData";

export default function AdminQuestionBankPage() {
  const [questions, setQuestions] = useState<PracticeQuestion[]>(INITIAL_PRACTICE_QUESTIONS);
  const [search, setSearch] = useState("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<PracticeQuestion | null>(null);

  // Form states
  const [courseSlug, setCourseSlug] = useState("full-stack-development");
  const [topic, setTopic] = useState("React");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [questionType, setQuestionType] = useState<PracticeQuestion["questionType"]>("single_choice");
  const [prompt, setPrompt] = useState("");
  const [opt0, setOpt0] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [correctOptionIdx, setCorrectOptionIdx] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [published, setPublished] = useState(true);

  // Bulk import state
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [csvNotice, setCsvNotice] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingQuestion(null);
    setCourseSlug(ANZEYL_COURSES[0].slug);
    setTopic(PRACTICE_TOPICS_BY_COURSE[ANZEYL_COURSES[0].slug]?.[0] || "General");
    setDifficulty("intermediate");
    setQuestionType("single_choice");
    setPrompt("");
    setOpt0("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setCorrectOptionIdx(0);
    setExplanation("");
    setPublished(true);
    setShowAddModal(true);
  };

  const handleOpenEdit = (q: PracticeQuestion) => {
    setEditingQuestion(q);
    setCourseSlug(q.courseSlug);
    setTopic(q.topic);
    setDifficulty(q.difficulty);
    setQuestionType(q.questionType);
    setPrompt(q.prompt);
    setOpt0(q.options[0] || "");
    setOpt1(q.options[1] || "");
    setOpt2(q.options[2] || "");
    setOpt3(q.options[3] || "");
    setCorrectOptionIdx(q.correctIndices[0] || 0);
    setExplanation(q.explanation);
    setPublished(q.published);
    setShowAddModal(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !opt0.trim() || !opt1.trim()) return;

    const matchedCourse = ANZEYL_COURSES.find((c) => c.slug === courseSlug);
    const optionsArray = [opt0.trim(), opt1.trim()];
    if (opt2.trim()) optionsArray.push(opt2.trim());
    if (opt3.trim()) optionsArray.push(opt3.trim());

    if (editingQuestion) {
      const updated = questions.map((item) =>
        item.id === editingQuestion.id
          ? {
              ...item,
              courseSlug,
              courseTitle: matchedCourse?.title || "General",
              topic: topic.trim(),
              difficulty,
              questionType,
              prompt: prompt.trim(),
              options: optionsArray,
              correctIndices: [correctOptionIdx],
              explanation: explanation.trim(),
              published,
            }
          : item
      );
      setQuestions(updated);
    } else {
      const newQ: PracticeQuestion = {
        id: `q-${Date.now()}`,
        courseSlug,
        courseTitle: matchedCourse?.title || "General",
        topic: topic.trim(),
        difficulty,
        questionType,
        prompt: prompt.trim(),
        options: optionsArray,
        correctIndices: [correctOptionIdx],
        explanation: explanation.trim(),
        published,
      };
      setQuestions([newQ, ...questions]);
    }

    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this question from the bank?")) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleTogglePublished = (id: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, published: !q.published } : q))
    );
  };

  const handleBulkCsvImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvText.trim()) return;

    const lines = csvText.trim().split("\n");
    const imported: PracticeQuestion[] = [];

    lines.forEach((line, idx) => {
      // Format: courseSlug, topic, difficulty, prompt, optA, optB, optC, optD, correctIdx, explanation
      const parts = line.split("|").map((p) => p.trim());
      if (parts.length >= 7) {
        const cSlug = parts[0] || "full-stack-development";
        const cCourse = ANZEYL_COURSES.find((c) => c.slug === cSlug);
        imported.push({
          id: `csv-${Date.now()}-${idx}`,
          courseSlug: cSlug,
          courseTitle: cCourse?.title || "General",
          topic: parts[1] || "Core Concepts",
          difficulty: (parts[2] as "beginner" | "intermediate" | "advanced") || "intermediate",
          questionType: "single_choice",
          prompt: parts[3],
          options: [parts[4], parts[5], parts[6] || "", parts[7] || ""].filter(Boolean),
          correctIndices: [Number(parts[8]) || 0],
          explanation: parts[9] || "Standard architectural evaluation item.",
          published: true,
        });
      }
    });

    if (imported.length > 0) {
      setQuestions([...imported, ...questions]);
      setCsvNotice(`Successfully imported ${imported.length} questions into the bank.`);
      setTimeout(() => setCsvNotice(null), 4000);
      setShowCsvModal(false);
      setCsvText("");
    } else {
      alert("No valid questions parsed. Ensure fields are separated by the pipe symbol (|).");
    }
  };

  const filtered = questions.filter((q) => {
    const matchesCourse =
      selectedCourseFilter === "All" || q.courseSlug === selectedCourseFilter;
    const matchesSearch =
      q.prompt.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase()) ||
      q.courseTitle.toLowerCase().includes(search.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full badge-vibrant-rainbow">
              Academic Assessment CMS
            </span>
            <span className="text-xs text-slate-400">9-Course Central Question Bank</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Question Bank Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Create, edit, organize, and publish practice and mock test questions across all 9 ANZEYL career programmes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCsvModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
          >
            Bulk CSV Import
          </button>
          <button
            onClick={handleOpenAdd}
            className="btn-colorful-primary px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
          >
            <span>+ Add New Question</span>
          </button>
        </div>
      </div>

      {csvNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4" />
          <span>{csvNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by keyword, topic, or concept..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#0f1424] border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Course:</span>
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="py-2 px-3 text-xs bg-[#0f1424] border border-white/10 rounded-xl text-white focus:outline-none"
          >
            <option value="All">All Courses ({questions.length})</option>
            {ANZEYL_COURSES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {filtered.map((q, idx) => (
          <div
            key={q.id}
            className={`glass-card p-6 rounded-3xl border ${
              q.published ? "border-white/10" : "border-rose-500/30 opacity-75"
            } bg-[#0f1424]/90 space-y-4 shadow-xl`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold text-[10px]">
                  {q.courseTitle}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 text-[10px]">
                  {q.topic}
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 text-[10px] capitalize">
                  {q.difficulty}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    q.published
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {q.published ? "Published" : "Draft / Hidden"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTogglePublished(q.id)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  {q.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(q)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(q.id)}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
              {idx + 1}. {q.prompt}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              {q.options.map((opt, optIdx) => {
                const isCorrect = q.correctIndices.includes(optIdx);
                return (
                  <div
                    key={optIdx}
                    className={`p-3 rounded-xl border flex items-center gap-2 ${
                      isCorrect
                        ? "bg-emerald-950/25 border-emerald-500/40 text-emerald-300 font-semibold"
                        : "bg-[#070911] border-white/5 text-slate-300"
                    }`}
                  >
                    <span className="font-bold text-[11px] font-mono">
                      {String.fromCharCode(65 + optIdx)}:
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isCorrect && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black">
                        Correct Answer
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-2xl bg-[#070911] border border-white/5 text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-cyan-300 block mb-0.5">Explanation:</strong>
              {q.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-2xl w-full p-8 rounded-3xl border border-cyan-500/40 bg-[#0f1424] space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">
                {editingQuestion ? "Edit Question" : "Create New Practice Question"}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Course</label>
                  <select
                    value={courseSlug}
                    onChange={(e) => {
                      setCourseSlug(e.target.value);
                      setTopic(PRACTICE_TOPICS_BY_COURSE[e.target.value]?.[0] || "General");
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                  >
                    {ANZEYL_COURSES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Topic</label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. React Hooks, Spring Boot, Neural Networks"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as "beginner" | "intermediate" | "advanced")}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none capitalize"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Question Type</label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value as PracticeQuestion["questionType"])}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none"
                  >
                    <option value="single_choice">Single Choice MCQ</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True / False</option>
                    <option value="scenario">Scenario-Based</option>
                    <option value="coding">Practical Coding</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Question Prompt</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. In React 19, what is the primary benefit of the React Compiler?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#070911] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">Options:</label>
                <div className="space-y-1.5">
                  <input
                    type="text"
                    required
                    placeholder="Option A"
                    value={opt0}
                    onChange={(e) => setOpt0(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070911] border border-white/10 text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Option B"
                    value={opt1}
                    onChange={(e) => setOpt1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070911] border border-white/10 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Option C (Optional)"
                    value={opt2}
                    onChange={(e) => setOpt2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070911] border border-white/10 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Option D (Optional)"
                    value={opt3}
                    onChange={(e) => setOpt3(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070911] border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Select Correct Option Index</label>
                <select
                  value={correctOptionIdx}
                  onChange={(e) => setCorrectOptionIdx(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#070911] border border-white/10 text-white"
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  {opt2.trim() && <option value={2}>Option C</option>}
                  {opt3.trim() && <option value={3}>Option D</option>}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Explanation & Conceptual Rationale</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explain why the answer is correct..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#070911] border border-white/10 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub-check"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500"
                />
                <label htmlFor="pub-check" className="text-slate-300 font-semibold cursor-pointer">
                  Make available to students in practice drills immediately (Published)
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl btn-colorful-primary text-white font-bold"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Bulk Import Modal */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-xl w-full p-8 rounded-3xl border border-cyan-500/40 bg-[#0f1424] space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Bulk Question Import (Pipe Delimited)</h3>
              <button
                onClick={() => setShowCsvModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Cancel
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Format each line as:<br />
              <code className="text-cyan-300 text-[11px] block mt-1 p-2 rounded bg-black/50 font-mono">
                courseSlug | topic | difficulty | prompt | optA | optB | optC | optD | correctIndex(0-3) | explanation
              </code>
            </p>

            <form onSubmit={handleBulkCsvImport} className="space-y-4">
              <textarea
                rows={8}
                required
                placeholder="full-stack-development | React | intermediate | What does useMemo do? | Re-render | Cache computation | Mutate DOM | Create ref | 1 | useMemo caches results between renders."
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#070911] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCsvModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl btn-colorful-primary text-white font-bold text-xs"
                >
                  Import Questions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
