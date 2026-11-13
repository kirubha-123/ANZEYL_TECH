import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { LearningJourney } from "@/components/LearningJourney";
import { CourseCategories } from "@/components/CourseCategories";
import { SkillRewards } from "@/components/SkillRewards";
import { FeaturedCourses } from "@/components/FeaturedCourses";
import { AiSection } from "@/components/AiSection";
import { Partnerships } from "@/components/Partnerships";
import { Testimonials } from "@/components/Testimonials";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";

export default function PublicHomePage() {
  return (
    <div className="min-h-screen bg-[#071214] text-white flex flex-col font-sans selection:bg-[#10b981] selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedCourses />
        <Features />
        <LearningJourney />
        <CourseCategories />
        <SkillRewards />
        <AiSection />
        <Partnerships />
        <Testimonials />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
