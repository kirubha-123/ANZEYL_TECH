import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ANZEYL_COURSES, getCourseBySlug } from "@/lib/courseData";
import EnrollClient from "./EnrollClient";

export function generateStaticParams() {
  return ANZEYL_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Enrollment — ANZEYL" };
  return {
    title: `Enroll in ${course.title} — ANZEYL`,
    description: `Complete your student enrollment in ${course.title} at ANZEYL.`,
  };
}

export default async function EnrollPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <EnrollClient course={course} />;
}
