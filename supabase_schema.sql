-- Run this entire script in your Supabase SQL Editor to create the missing tables

-- 1. Dashboard Stats
CREATE TABLE IF NOT EXISTS public.dashboard_stats (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    total_xp INT DEFAULT 0,
    interviews_completed INT DEFAULT 0,
    mock_tests_completed INT DEFAULT 0,
    coding_challenges_solved INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    learning_hours NUMERIC DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.dashboard_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own dashboard stats" ON public.dashboard_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own dashboard stats" ON public.dashboard_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own dashboard stats" ON public.dashboard_stats FOR UPDATE USING (auth.uid() = user_id);

-- 2. Interview History
CREATE TABLE IF NOT EXISTS public.interview_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    company TEXT,
    job_role TEXT,
    difficulty TEXT,
    status TEXT,
    overall_score INT,
    technical_score INT,
    communication_score INT,
    transcript JSONB DEFAULT '[]'::jsonb,
    feedback JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.interview_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own interviews" ON public.interview_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own interviews" ON public.interview_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own interviews" ON public.interview_history FOR UPDATE USING (auth.uid() = user_id);

-- 3. Mock Tests
CREATE TABLE IF NOT EXISTS public.mock_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    company TEXT,
    job_role TEXT,
    difficulty TEXT,
    questions JSONB DEFAULT '[]'::jsonb,
    user_answers JSONB DEFAULT '[]'::jsonb,
    correct_answers JSONB DEFAULT '[]'::jsonb,
    marks INT DEFAULT 0,
    percentage NUMERIC DEFAULT 0,
    time_taken INT DEFAULT 0,
    status TEXT DEFAULT 'in_progress',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own mock tests" ON public.mock_tests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own mock tests" ON public.mock_tests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own mock tests" ON public.mock_tests FOR UPDATE USING (auth.uid() = user_id);

-- 4. Coding Submissions
CREATE TABLE IF NOT EXISTS public.coding_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id TEXT,
    code TEXT,
    language TEXT,
    status TEXT,
    execution_time NUMERIC,
    memory_used NUMERIC,
    test_cases_passed INT,
    total_test_cases INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.coding_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own coding submissions" ON public.coding_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own coding submissions" ON public.coding_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own coding submissions" ON public.coding_submissions FOR UPDATE USING (auth.uid() = user_id);

-- 5. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT,
    message TEXT,
    type TEXT,
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own notifications" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own notifications" ON public.notifications FOR DELETE USING (auth.uid() = user_id);

-- 6. Progress
CREATE TABLE IF NOT EXISTS public.progress_tracking (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    course_progress JSONB DEFAULT '{}'::jsonb,
    skill_levels JSONB DEFAULT '{}'::jsonb,
    recent_achievements JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.progress_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own progress" ON public.progress_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.progress_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.progress_tracking FOR UPDATE USING (auth.uid() = user_id);

-- 7. Leaderboard
CREATE TABLE IF NOT EXISTS public.leaderboard (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    total_xp INT DEFAULT 0,
    coding_score INT DEFAULT 0,
    interview_score INT DEFAULT 0,
    mock_test_score INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view the leaderboard" ON public.leaderboard FOR SELECT USING (true);
CREATE POLICY "Users can insert their own leaderboard stats" ON public.leaderboard FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own leaderboard stats" ON public.leaderboard FOR UPDATE USING (auth.uid() = user_id);

-- 8. Companies and Roles (Publicly readable)
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    description TEXT
);
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view companies" ON public.companies FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.job_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT
);
ALTER TABLE public.job_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view job roles" ON public.job_roles FOR SELECT USING (true);

-- Insert some dummy data for companies and roles
INSERT INTO public.companies (name) VALUES ('Google'), ('Microsoft'), ('Amazon'), ('Meta') ON CONFLICT DO NOTHING;
INSERT INTO public.job_roles (title) VALUES ('Software Engineer'), ('Frontend Developer'), ('Backend Developer'), ('Data Scientist') ON CONFLICT DO NOTHING;

-- 9. Roadmaps
CREATE TABLE IF NOT EXISTS public.roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT,
    description TEXT,
    nodes JSONB DEFAULT '[]'::jsonb,
    edges JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roadmaps" ON public.roadmaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own roadmaps" ON public.roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own roadmaps" ON public.roadmaps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own roadmaps" ON public.roadmaps FOR DELETE USING (auth.uid() = user_id);

-- 10. Saved Questions
CREATE TABLE IF NOT EXISTS public.saved_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    question_text TEXT,
    category TEXT,
    difficulty TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.saved_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own saved questions" ON public.saved_questions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own saved questions" ON public.saved_questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own saved questions" ON public.saved_questions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own saved questions" ON public.saved_questions FOR DELETE USING (auth.uid() = user_id);

-- 11. Settings
CREATE TABLE IF NOT EXISTS public.settings (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'dark',
    email_notifications BOOLEAN DEFAULT true,
    privacy_mode BOOLEAN DEFAULT false,
    api_keys JSONB DEFAULT '{}'::jsonb
);
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own settings" ON public.settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own settings" ON public.settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own settings" ON public.settings FOR UPDATE USING (auth.uid() = user_id);

-- 12. Resume History
CREATE TABLE IF NOT EXISTS public.resume_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_url TEXT,
    analysis_result JSONB DEFAULT '{}'::jsonb,
    score INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.resume_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own resume history" ON public.resume_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own resume history" ON public.resume_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own resume history" ON public.resume_history FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own resume history" ON public.resume_history FOR DELETE USING (auth.uid() = user_id);

