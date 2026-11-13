-- Migration: Learning Portal Enhancements
-- Adds tables for Student Notes, Practice Attempts, Project Submissions, Live Classes, and Study Materials
-- with complete Row Level Security (RLS) policies.
--
-- Run this in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query

-- 1. Student Notes Table (Private to each authenticated user)
CREATE TABLE IF NOT EXISTS public.student_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL,
  topic TEXT NOT NULL DEFAULT 'General',
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.student_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own notes"
  ON public.student_notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own notes"
  ON public.student_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update their own notes"
  ON public.student_notes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can delete their own notes"
  ON public.student_notes FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS student_notes_user_idx ON public.student_notes(user_id);
CREATE INDEX IF NOT EXISTS student_notes_course_idx ON public.student_notes(course_slug);

-- 2. Practice Attempts Table
CREATE TABLE IF NOT EXISTS public.practice_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL,
  topic TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  answers JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.practice_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own practice attempts"
  ON public.practice_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can record their own practice attempts"
  ON public.practice_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS practice_attempts_user_idx ON public.practice_attempts(user_id);

-- 3. Project Submissions Table
CREATE TABLE IF NOT EXISTS public.project_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL,
  project_title TEXT NOT NULL,
  repository_url TEXT NOT NULL,
  live_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Not Started', 'Submitted', 'Under Review', 'Approved')),
  feedback TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  reviewed_at TIMESTAMPTZ
);

ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own project submissions"
  ON public.project_submissions FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('educator', 'college_admin')
  ));

CREATE POLICY "Students can submit their own projects"
  ON public.project_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update their own in-progress project submissions"
  ON public.project_submissions FOR UPDATE
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('educator', 'college_admin')
  ))
  WITH CHECK (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('educator', 'college_admin')
  ));

CREATE INDEX IF NOT EXISTS project_submissions_user_idx ON public.project_submissions(user_id);
CREATE INDEX IF NOT EXISTS project_submissions_course_idx ON public.project_submissions(course_slug);

-- 4. Live Classes Table
CREATE TABLE IF NOT EXISTS public.live_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  instructor_name TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  meeting_url TEXT,
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Live Now', 'Completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.live_classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view scheduled live classes"
  ON public.live_classes FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage live classes"
  ON public.live_classes FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ));

CREATE INDEX IF NOT EXISTS live_classes_scheduled_idx ON public.live_classes(scheduled_at);

-- 5. Study Materials Table
CREATE TABLE IF NOT EXISTS public.study_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_slug TEXT NOT NULL,
  module_title TEXT NOT NULL,
  title TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'PDF',
  file_url TEXT NOT NULL,
  size_label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view study materials"
  ON public.study_materials FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage study materials"
  ON public.study_materials FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ));

CREATE INDEX IF NOT EXISTS study_materials_course_idx ON public.study_materials(course_slug);

