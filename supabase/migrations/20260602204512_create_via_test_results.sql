/*
  # Create VIA Character Strengths Test Results Table

  ## Summary
  Creates the main storage table for user test results from the Character Strengths assessment.

  ## New Tables
  - `test_results`
    - `id` (uuid, primary key) — unique identifier per result
    - `first_name` (text) — user's first name
    - `email` (text) — user's email address
    - `answers` (jsonb) — raw answers array [{questionId, value}]
    - `scores` (jsonb) — computed strength scores [{strengthId, score, percentile}]
    - `top_strength_id` (text) — ID of the user's top strength for quick filtering
    - `created_at` (timestamptz) — submission timestamp

  ## Security
  - RLS enabled: only the owner (matched by email, anon context) can read their result
  - INSERT is open to anon users (public test — no auth required)
  - SELECT restricted: users can only read rows matching their email (passed as a claim or query param — here we use a simple pattern)

  ## Notes
  1. No authentication required to submit — test is fully public
  2. Email is used as a soft identifier, not a hard auth boundary
  3. The anon role may insert but not freely select — a service role or RLS bypass is needed for admin reads
*/

CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  answers jsonb NOT NULL DEFAULT '[]',
  scores jsonb NOT NULL DEFAULT '[]',
  top_strength_id text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert their own test result"
  ON test_results
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read results by their email"
  ON test_results
  FOR SELECT
  TO anon
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');
