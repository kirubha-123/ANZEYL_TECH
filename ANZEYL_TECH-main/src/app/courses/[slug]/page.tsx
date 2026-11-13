import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  CodeIcon,
} from "@/components/Icons";
import {
  ANZEYL_COURSES,
  getCourseBySlug,
  getPriceLabel,
  formatPrice,
  type AnzeylCourse,
} from "@/lib/courseData";

// Generate static params for all 9 courses
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
  if (!course) return { title: "Course Not Found — ANZEYL" };
  return {
    title: `${course.title} — ANZEYL`,
    description: course.shortDescription,
  };
}

function ModeTag({ mode }: { mode: string }) {
  const isOnline = mode === "Online";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
        isOnline
          ? "bg-[#e7f4ef] border-[#b9ddd1] text-[#287362]"
          : "bg-[#fff3e5] border-[#f2d0a8] text-[#9a6031]"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-[#4c9a89]" : "bg-[#f2b880]"}`} />
      {mode} Training
    </span>
  );
}

function PricingBlock({ course }: { course: AnzeylCourse }) {
  const priceLabel = getPriceLabel(course);
  const hasDiscount =
    course.originalPriceInCents !== null &&
    course.priceInCents !== null &&
    course.originalPriceInCents > course.priceInCents;

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 space-y-4 shadow-sm sticky top-6">
      <h3 className="text-sm font-bold text-[#17191D]">Course Fees</h3>

      {priceLabel === "Contact ANZEYL for Course Fees" ? (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#64748b] italic">
            Contact ANZEYL for Course Fees
          </p>
          <p className="text-xs text-[#64748b]">
            Fees vary based on training mode and batch. Get in touch for a personalised quote.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-extrabold text-[#176b87]">{priceLabel}</span>
            {hasDiscount && course.originalPriceInCents && (
              <>
                <span className="text-sm text-[#64748b] line-through">
                  {formatPrice(course.originalPriceInCents)}
                </span>
                <span className="text-xs font-bold text-[#287362] bg-[#e7f4ef] px-2 py-0.5 rounded-full border border-[#b9ddd1]">
                  Save{" "}
                  {Math.round(
                    ((course.originalPriceInCents - (course.priceInCents ?? 0)) /
                      course.originalPriceInCents) *
                      100
                  )}
                  %
                </span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2.5 pt-1">
        <Link
          href={`/portal/enroll/${course.slug}`}
          className="block w-full py-3 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-colors"
        >
          Enrol Now
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
        <Link
          href="/contact"
          className="block w-full py-3 rounded-xl border border-[#176b87] text-[#176b87] font-bold text-sm text-center hover:bg-[#e5f2f5] transition-colors"
        >
          Contact Us
        </Link>
      </div>

      <div className="pt-3 border-t border-[#e5e7eb] space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#64748b]">
          <ClockIcon className="w-4 h-4 text-[#176b87]" />
          <span>Duration: <strong className="text-[#263746]">{course.durationLabel}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#64748b]">
          <BookOpenIcon className="w-4 h-4 text-[#176b87]" />
          <span><strong className="text-[#263746]">{course.modules.length}</strong> learning modules</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#64748b]">
          <CodeIcon className="w-4 h-4 text-[#176b87]" />
          <span><strong className="text-[#263746]">{course.projects.length}</strong> hands-on projects</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {course.modes.map((m) => (
            <ModeTag key={m} mode={m} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f5ef] flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-white border-b border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-5">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-[#64748b]">
              <Link href="/" className="hover:text-[#176b87]">Home</Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-[#176b87]">Courses</Link>
              <span>/</span>
              <span className="text-[#263746] font-medium">{course.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-5">
                {/* Category + Level */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-[#e5f2f5] border border-[#b6d7df] text-[#176b87] text-xs font-bold">
                    {course.category}
                  </span>
                  <span className="text-xs text-[#64748b] capitalize">{course.difficulty} level</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17191D] leading-tight">
                  {course.title}
                </h1>

                <p className="text-sm text-[#64748b] leading-relaxed max-w-2xl">
                  {course.overview}
                </p>

                {/* Quick facts */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-[#263746]">
                    <ClockIcon className="w-4 h-4 text-[#176b87]" />
                    <span className="font-semibold">{course.durationLabel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#263746]">
                    <BookOpenIcon className="w-4 h-4 text-[#176b87]" />
                    <span className="font-semibold">{course.modules.length} Modules</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#263746]">
                    <CodeIcon className="w-4 h-4 text-[#176b87]" />
                    <span className="font-semibold">{course.projects.length} Real Projects</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {course.modes.map((m) => (
                      <ModeTag key={m} mode={m} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing sidebar — desktop */}
              <div className="w-full lg:w-80 shrink-0 hidden lg:block">
                <PricingBlock course={course} />
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 space-y-10">

              {/* Learning Outcomes */}
              <section className="bg-white border border-[#e5e7eb] rounded-2xl p-6 space-y-4 shadow-sm">
                <h2 className="text-lg font-bold text-[#17191D]">What you will learn</h2>
                <ul className="space-y-2.5">
                  {course.learningOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#263746]">
                      <CheckCircleIcon className="w-4 h-4 text-[#4c9a89] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Technologies */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-[#17191D]">Technologies & Tools</h2>
                <div className="flex flex-wrap gap-2">
                  {course.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#e5e7eb] text-xs font-semibold text-[#263746] shadow-xs hover:border-[#b6d7df] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Curriculum */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-[#17191D]">Curriculum</h2>
                <p className="text-xs text-[#64748b]">
                  {course.modules.length} modules covering all core topics over {course.durationLabel}.
                </p>
                <div className="space-y-3">
                  {course.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm"
                    >
                      <div className="flex items-center gap-3 px-5 py-4 bg-[#f7f5ef] border-b border-[#e5e7eb]">
                        <span className="w-7 h-7 rounded-lg bg-[#176b87] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="text-sm font-bold text-[#17191D]">{mod.title}</h3>
                      </div>
                      <ul className="divide-y divide-[#f0f0f0]">
                        {mod.topics.map((topic, ti) => (
                          <li key={ti} className="flex items-center gap-3 px-5 py-3 text-xs text-[#263746]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4c9a89] shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section className="bg-white border border-[#e5e7eb] rounded-2xl p-6 space-y-4 shadow-sm">
                <h2 className="text-lg font-bold text-[#17191D]">Skills you will gain</h2>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#e5f2f5] border border-[#b6d7df] text-xs font-semibold text-[#176b87]"
                    >
                      <CheckCircleIcon className="w-3.5 h-3.5" />
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-[#17191D]">Practical Projects</h2>
                <p className="text-xs text-[#64748b]">
                  Real-world projects you will build as part of this programme.
                </p>
                <div className="space-y-3">
                  {course.projects.map((project, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-white border border-[#e5e7eb] rounded-2xl px-5 py-4 shadow-sm"
                    >
                      <span className="w-8 h-8 rounded-xl bg-[#e5f2f5] border border-[#b6d7df] text-[#176b87] font-bold text-xs flex items-center justify-center shrink-0">
                        P{i + 1}
                      </span>
                      <span className="text-sm text-[#263746] leading-relaxed">{project}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Mobile Pricing */}
              <div className="lg:hidden">
                <PricingBlock course={course} />
              </div>

            </div>

            {/* Desktop sticky sidebar */}
            <div className="hidden lg:block w-80 shrink-0">
              {/* Already shown in hero on desktop — hidden here */}
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="bg-[#176b87] py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <h2 className="text-2xl font-extrabold text-white">
              Ready to start {course.title}?
            </h2>
            <p className="text-sm text-white/80 max-w-xl mx-auto">
              Enrol today and join ANZEYL&apos;s structured learning programme with expert guidance,
              hands-on projects, and both online and offline class options.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href={`/get-started?course=${course.slug}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#176b87] font-extrabold text-sm hover:bg-[#f0f9fb] transition-colors shadow-lg"
              >
                Enrol Now
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/40 text-white font-bold text-sm hover:bg-white/10 transition-colors"
              >
                View All Courses
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

