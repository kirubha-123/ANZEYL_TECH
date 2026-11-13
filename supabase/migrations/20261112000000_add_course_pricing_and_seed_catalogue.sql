-- Migration: Add pricing fields to courses table and seed ANZEYL's 9-course catalogue.
-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New Query).
--
-- PRICING NOTE:
--   price_in_cents        NULL  = "Contact ANZEYL for Course Fees"
--   price_in_cents        0     = Free
--   price_in_cents        N     = ₹(N/100)
--   original_price_in_cents     = optional strikethrough price (NULL = no discount shown)
--
-- ADMIN NOTE:
--   After running, admins can update pricing directly in the Supabase Table Editor
--   or via the admin dashboard once it supports live Supabase writes.

-- 1. Add new pricing and training-mode columns to courses
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS original_price_in_cents INTEGER
    CHECK (original_price_in_cents IS NULL OR original_price_in_cents >= 0),
  ADD COLUMN IF NOT EXISTS duration_months INTEGER NOT NULL DEFAULT 3,
  ADD COLUMN IF NOT EXISTS training_modes TEXT[] NOT NULL DEFAULT ARRAY['Online', 'Offline']::TEXT[];

-- Allow price_in_cents to be NULL (NULL = "Contact ANZEYL for Course Fees")
ALTER TABLE public.courses
  ALTER COLUMN price_in_cents DROP NOT NULL,
  ALTER COLUMN price_in_cents DROP DEFAULT;

-- 2. Seed the 9 ANZEYL courses
--    ON CONFLICT (slug) DO UPDATE ensures re-running this is safe.

INSERT INTO public.courses
  (slug, title, description, category, difficulty, price_in_cents, original_price_in_cents,
   duration_months, training_modes, published)
VALUES
  (
    'full-stack-development',
    'Full Stack Development',
    'Build end-to-end web applications — from responsive frontends to scalable backends and databases — using modern JavaScript and cloud deployment.',
    'Full Stack Development', 'intermediate', NULL, NULL, 3, ARRAY['Online','Offline'], true
  ),
  (
    'java-full-stack-development',
    'Java Full Stack Development',
    'Master enterprise-grade Java backend development with Spring Boot and pair it with a modern React frontend to build production-ready applications.',
    'Java Full Stack', 'intermediate', NULL, NULL, 3, ARRAY['Online','Offline'], true
  ),
  (
    'ai-and-machine-learning',
    'AI & Machine Learning',
    'Learn to build, train, evaluate, and deploy machine learning models — from classical algorithms to deep learning and large language model integrations.',
    'AI & Machine Learning', 'advanced', NULL, NULL, 3, ARRAY['Online','Offline'], true
  ),
  (
    'data-science-and-analytics',
    'Data Science & Analytics',
    'Transform raw data into actionable insights using Python, SQL, statistical analysis, and data visualisation to drive business decisions.',
    'Data Science', 'intermediate', NULL, NULL, 3, ARRAY['Online','Offline'], true
  ),
  (
    'cyber-security',
    'Cyber Security',
    'Develop the skills to protect systems, networks, and applications — covering ethical hacking, threat analysis, and security best practices.',
    'Cyber Security', 'intermediate', NULL, NULL, 3, ARRAY['Online','Offline'], true
  ),
  (
    'cloud-and-devops',
    'Cloud & DevOps',
    'Learn to design, automate, and operate cloud infrastructure — building CI/CD pipelines, containerising applications, and managing cloud resources on AWS.',
    'Cloud & DevOps', 'intermediate', NULL, NULL, 3, ARRAY['Online','Offline'], true
  ),
  (
    'ui-ux-design',
    'UI/UX Design',
    'Learn to design intuitive, accessible, and visually refined digital products — from user research and wireframes to high-fidelity prototypes and design systems.',
    'UI/UX Design', 'beginner', NULL, NULL, 3, ARRAY['Online','Offline'], true
  ),
  (
    'digital-marketing',
    'Digital Marketing',
    'Build a career in digital marketing — covering SEO, social media, paid advertising, email marketing, analytics, and content strategy.',
    'Digital Marketing', 'beginner', NULL, NULL, 3, ARRAY['Online','Offline'], true
  ),
  (
    'data-analytics-with-power-bi',
    'Data Analytics with Power BI',
    'Transform business data into interactive dashboards and reports using Microsoft Power BI — from data modelling and DAX to publishing and sharing insights.',
    'Data Analytics', 'beginner', NULL, NULL, 3, ARRAY['Online','Offline'], true
  )
ON CONFLICT (slug) DO UPDATE SET
  title               = EXCLUDED.title,
  description         = EXCLUDED.description,
  category            = EXCLUDED.category,
  difficulty          = EXCLUDED.difficulty,
  price_in_cents      = EXCLUDED.price_in_cents,
  original_price_in_cents = EXCLUDED.original_price_in_cents,
  duration_months     = EXCLUDED.duration_months,
  training_modes      = EXCLUDED.training_modes,
  published           = EXCLUDED.published,
  updated_at          = timezone('utc'::text, now());

