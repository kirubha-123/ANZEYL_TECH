import React, { Suspense } from "react";
import QuizRunnerClient from "./QuizRunnerClient";

export function generateStaticParams() {
  return [
    { quizId: "react-mastery" },
    { quizId: "system-design" },
    { quizId: "supabase-postgres" },
    { quizId: "ai-agent-engineering" },
  ];
}

export default async function QuizRunnerPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;

  return (
    <Suspense
      fallback={
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
          <div className="h-6 w-48 bg-white/10 rounded-xl" />
          <div className="glass-card p-8 rounded-3xl bg-[#0f1424] h-96" />
        </div>
      }
    >
      <QuizRunnerClient quizId={quizId} />
    </Suspense>
  );
}
