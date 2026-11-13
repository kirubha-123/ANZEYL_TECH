-- Restrict catalog mutations to authorized administrators.
-- Educators retain published-course and lesson read access through existing policies.

DROP POLICY IF EXISTS "Educators can manage courses" ON public.courses;
DROP POLICY IF EXISTS "Educators can manage course modules" ON public.course_modules;
DROP POLICY IF EXISTS "Educators can manage course lessons" ON public.course_lessons;

CREATE POLICY "Admins can manage courses"
  ON public.courses FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ));

CREATE POLICY "Admins can manage course modules"
  ON public.course_modules FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ));

CREATE POLICY "Admins can manage course lessons"
  ON public.course_lessons FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'college_admin'
  ));
