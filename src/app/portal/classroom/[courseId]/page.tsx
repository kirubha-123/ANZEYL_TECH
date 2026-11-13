import React, { Suspense } from "react";
import ClassroomClient from "./ClassroomClient";
import { ANZEYL_COURSES } from "@/lib/courseData";

export function generateStaticParams() {
  return ANZEYL_COURSES.map((c) => ({ courseId: c.slug }));
}

async function ClassroomContent({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return <ClassroomClient courseId={courseId} />;
}

export default function ClassroomPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
          <div className="h-6 w-48 bg-white/10 rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 aspect-video bg-[#0f1424] rounded-3xl" />
            <div className="bg-[#0f1424] rounded-3xl h-96" />
          </div>
        </div>
      }
    >
      <ClassroomContent params={params} />
    </Suspense>
  );
}
