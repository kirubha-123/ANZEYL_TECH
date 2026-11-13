-- Extend the learning foundation with catalog metadata, modules, and enrollment writes.

ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
  ADD COLUMN IF NOT EXISTS difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced'));

CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE (course_id, position)
);

ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.course_lessons
  ADD COLUMN IF NOT EXISTS module_id UUID REFERENCES public.course_modules(id) ON DELETE SET NULL;

CREATE POLICY "Students can enroll themselves"
  ON public.course_enrollments FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND EXISTS (
      SELECT 1 FROM public.courses WHERE id = course_id AND published = true
    )
  );

CREATE POLICY "Students can view modules for published courses"
  ON public.course_modules FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.courses
    WHERE id = course_id AND (published = true OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('educator', 'college_admin')
    ))
  ));

CREATE POLICY "Educators can manage courses"
  ON public.courses FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('educator', 'college_admin')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('educator', 'college_admin')
  ));

CREATE POLICY "Educators can manage course modules"
  ON public.course_modules FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('educator', 'college_admin')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('educator', 'college_admin')
  ));

CREATE POLICY "Educators can manage course lessons"
  ON public.course_lessons FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('educator', 'college_admin')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('educator', 'college_admin')
  ));

CREATE INDEX IF NOT EXISTS course_modules_course_position_idx
  ON public.course_modules(course_id, position);