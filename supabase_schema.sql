-- ==============================================================================
-- PyQuiz: Supabase PostgreSQL Schema & Role-Based Access Control (RBAC)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CUSTOM TYPES
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE teacher_approval_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    student_id TEXT,
    teacher_status teacher_approval_status DEFAULT 'pending',
    teacher_note TEXT,
    custom_gemini_api_key TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for role lookups and pending teacher approvals
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_teacher_status ON public.profiles(teacher_status);

-- 4. QUIZZES TABLE
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    section_name TEXT,
    set_name TEXT,
    time_per_question INTEGER NOT NULL DEFAULT 20,
    negative_marking BOOLEAN NOT NULL DEFAULT TRUE,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quizzes_creator ON public.quizzes(creator_id);

-- 5. QUIZ SESSIONS TABLE (Live room synchronization)
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
    host_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    join_code TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'waiting', -- 'waiting', 'active', 'completed'
    total_questions INTEGER NOT NULL DEFAULT 30,
    time_per_question INTEGER NOT NULL DEFAULT 20,
    negative_marking BOOLEAN NOT NULL DEFAULT TRUE,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    active_students JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_code ON public.quiz_sessions(join_code);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_status ON public.quiz_sessions(status);

-- 6. STUDENT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.student_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.quiz_sessions(id) ON DELETE SET NULL,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    quiz_title TEXT NOT NULL,
    section_name TEXT,
    set_name TEXT,
    final_score NUMERIC(6,2) NOT NULL DEFAULT 0.00,
    raw_score NUMERIC(6,2) NOT NULL DEFAULT 0.00,
    penalty_deductions NUMERIC(6,2) NOT NULL DEFAULT 0.00,
    accuracy_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    correct_count INTEGER NOT NULL DEFAULT 0,
    wrong_count INTEGER NOT NULL DEFAULT 0,
    unanswered_count INTEGER NOT NULL DEFAULT 0,
    penalized_wrong_count INTEGER NOT NULL DEFAULT 0,
    score_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    answers JSONB NOT NULL DEFAULT '[]'::jsonb,
    anti_cheat_events JSONB NOT NULL DEFAULT '[]'::jsonb,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_student ON public.student_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_session ON public.student_submissions(session_id);

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_submissions ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if current user is an approved teacher
CREATE OR REPLACE FUNCTION public.is_approved_teacher()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() 
          AND (role = 'admin' OR (role = 'teacher' AND teacher_status = 'approved'))
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by authenticated users"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins have full access to all profiles"
    ON public.profiles FOR ALL
    TO authenticated
    USING (public.is_admin());

-- QUIZZES POLICIES
CREATE POLICY "Published quizzes are viewable by everyone"
    ON public.quizzes FOR SELECT
    TO authenticated
    USING (is_published = true OR creator_id = auth.uid() OR public.is_admin());

CREATE POLICY "Approved teachers and admins can create quizzes"
    ON public.quizzes FOR INSERT
    TO authenticated
    WITH CHECK (public.is_approved_teacher());

CREATE POLICY "Teachers can update their own quizzes"
    ON public.quizzes FOR UPDATE
    TO authenticated
    USING (creator_id = auth.uid() OR public.is_admin());

-- SESSIONS POLICIES
CREATE POLICY "Anyone authenticated can view active sessions"
    ON public.quiz_sessions FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Approved teachers and admins can create sessions"
    ON public.quiz_sessions FOR INSERT
    TO authenticated
    WITH CHECK (public.is_approved_teacher());

CREATE POLICY "Host can update their sessions"
    ON public.quiz_sessions FOR UPDATE
    TO authenticated
    USING (host_id = auth.uid() OR public.is_admin());

-- SUBMISSIONS POLICIES
CREATE POLICY "Students can view own submissions, teachers can view session submissions"
    ON public.student_submissions FOR SELECT
    TO authenticated
    USING (
        student_id = auth.uid() 
        OR public.is_approved_teacher()
        OR public.is_admin()
    );

CREATE POLICY "Students can insert their own submissions"
    ON public.student_submissions FOR INSERT
    TO authenticated
    WITH CHECK (student_id = auth.uid());

-- ==============================================================================
-- 8. AUTOMATIC PROFILE CREATION TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    assigned_role user_role;
    initial_status teacher_approval_status;
    user_fullname TEXT;
    user_avatar TEXT;
BEGIN
    -- Determine role from metadata (defaults to student)
    assigned_role := COALESCE((new.raw_user_meta_data->>'role')::user_role, 'student'::user_role);
    
    -- If role is teacher, set status to pending; if student or admin, set approved
    IF assigned_role = 'teacher' THEN
        initial_status := 'pending'::teacher_approval_status;
    ELSE
        initial_status := 'approved'::teacher_approval_status;
    END IF;

    -- Extract name & avatar (supports Email/Password and Google OAuth metadata)
    user_fullname := COALESCE(
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'name',
        split_part(new.email, '@', 1)
    );
    user_avatar := COALESCE(
        new.raw_user_meta_data->>'avatar_url',
        new.raw_user_meta_data->>'picture'
    );

    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        role,
        student_id,
        teacher_status,
        teacher_note,
        avatar_url,
        created_at,
        updated_at
    )
    VALUES (
        new.id,
        new.email,
        user_fullname,
        assigned_role,
        new.raw_user_meta_data->>'student_id',
        initial_status,
        new.raw_user_meta_data->>'teacher_note',
        user_avatar,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET
        full_name = EXCLUDED.full_name,
        avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
        updated_at = NOW();

    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 9. TEACHER APPROVAL HELPER RPC FUNCTIONS (Callable by Admin)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.admin_set_teacher_status(
    target_user_id UUID,
    new_status teacher_approval_status
)
RETURNS JSONB AS $$
DECLARE
    updated_record public.profiles;
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Unauthorized: Only platform administrators can approve teachers.';
    END IF;

    UPDATE public.profiles
    SET teacher_status = new_status,
        updated_at = NOW()
    WHERE id = target_user_id
    RETURNING * INTO updated_record;

    RETURN to_jsonb(updated_record);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
