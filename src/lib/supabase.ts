import { createClient } from '@supabase/supabase-js';
import { UserProfile, UserRole, TeacherApprovalStatus, UserSubmissionRecord } from '../types/quiz';

const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || '';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim().length > 0 &&
    supabaseUrl.startsWith('https://') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim().length > 0
  );
};

// Real Supabase Client (initialized if URL & key are present)
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    })
  : null;

// ==============================================================================
// LOCAL STORAGE & MOCK PERSISTENCE ENGINE (When Supabase is not yet configured)
// ==============================================================================

const STORAGE_KEY_PROFILES = 'pyquiz_mock_profiles';
const STORAGE_KEY_SESSION = 'pyquiz_mock_current_session';
const STORAGE_KEY_SUBMISSIONS = 'pyquiz_mock_submissions';

const SEED_PROFILES: UserProfile[] = [
  {
    id: 'user-admin-01',
    email: 'admin@pyquiz.com',
    fullName: 'Platform Administrator',
    role: 'admin',
    teacherStatus: 'approved',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'user-teacher-01',
    email: 'teacher@pyquiz.com',
    fullName: 'Prof. Albus Pythonius',
    role: 'teacher',
    teacherStatus: 'approved',
    teacherNote: 'Head of Python Curriculum at Department of Computer Science',
    createdAt: '2026-01-10T00:00:00.000Z',
  },
  {
    id: 'user-teacher-02',
    email: 'newteacher@pyquiz.com',
    fullName: 'Sarah Jenkins',
    role: 'teacher',
    teacherStatus: 'pending',
    teacherNote: 'Lecturer in Data Structures & OOP. Requesting instructor privileges for spring semester.',
    createdAt: '2026-03-01T10:30:00.000Z',
  },
  {
    id: 'user-student-01',
    email: 'student@pyquiz.com',
    fullName: 'Alex Candidate',
    role: 'student',
    teacherStatus: 'approved',
    createdAt: '2026-02-15T00:00:00.000Z',
  },
];

export const getMockProfiles = (): UserProfile[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROFILES);
    if (data) return JSON.parse(data);
    localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(SEED_PROFILES));
    return SEED_PROFILES;
  } catch {
    return SEED_PROFILES;
  }
};

export const saveMockProfiles = (profiles: UserProfile[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
  } catch (e) {
    console.error('Failed to save mock profiles:', e);
  }
};

export const getMockCurrentSession = (): UserProfile | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SESSION);
    if (data) return JSON.parse(data);
    return null;
  } catch {
    return null;
  }
};

export const setMockCurrentSession = (profile: UserProfile | null) => {
  try {
    if (profile) {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(profile));
    } else {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
  } catch (e) {
    console.error('Failed to update mock session:', e);
  }
};

export const getMockSubmissions = (): UserSubmissionRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveMockSubmission = async (submission: UserSubmissionRecord) => {
  try {
    // 1. Update local cache immediately for instant UI responsiveness
    const all = getMockSubmissions();
    const updated = [submission, ...all.filter((s) => s.id !== submission.id)];
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(updated));

    // 2. If Supabase is connected, persist directly to PostgreSQL table
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('student_submissions').insert({
        session_id: submission.sessionId.includes('practice-') ? null : (submission.sessionId.length > 30 ? submission.sessionId : null),
        student_id: submission.studentId,
        student_name: submission.studentName,
        quiz_title: submission.quizTitle,
        section_name: submission.sectionName,
        set_name: submission.setName,
        final_score: submission.score.finalScore,
        raw_score: submission.score.rawScore,
        penalty_deductions: submission.score.penaltyDeductions,
        accuracy_percentage: submission.score.accuracyPercentage,
        correct_count: submission.score.correctCount,
        wrong_count: submission.score.wrongCount,
        unanswered_count: submission.score.unansweredCount,
        penalized_wrong_count: submission.score.penalizedWrongCount,
        score_breakdown: submission.score,
        answers: submission.answers,
        anti_cheat_events: submission.antiCheatEvents,
      });
    }
  } catch (e) {
    console.error('Failed to save submission to Supabase:', e);
  }
};

export const fetchSubmissionsFromDb = async (userId?: string): Promise<UserSubmissionRecord[]> => {
  try {
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('student_submissions').select('*').order('submitted_at', { ascending: false });
      if (userId) {
        query = query.eq('student_id', userId);
      }
      const { data, error } = await query;
      if (!error && data) {
        const mapped: UserSubmissionRecord[] = data.map((d: any) => ({
          id: d.id,
          sessionId: d.session_id || 'session-legacy',
          studentId: d.student_id,
          studentName: d.student_name,
          quizTitle: d.quiz_title,
          sectionName: d.section_name,
          setName: d.set_name,
          submittedAt: new Date(d.submitted_at).getTime(),
          score: d.score_breakdown || {
            totalQuestions: (d.correct_count || 0) + (d.wrong_count || 0) + (d.unanswered_count || 0),
            correctCount: Number(d.correct_count || 0),
            wrongCount: Number(d.wrong_count || 0),
            unansweredCount: Number(d.unanswered_count || 0),
            penalizedWrongCount: Number(d.penalized_wrong_count || 0),
            rawScore: Number(d.raw_score || 0),
            penaltyDeductions: Number(d.penalty_deductions || 0),
            finalScore: Number(d.final_score || 0),
            accuracyPercentage: Number(d.accuracy_percentage || 0),
            difficultyBreakdown: {
              easy: { correct: 0, total: 0 },
              medium: { correct: 0, total: 0 },
              hard: { correct: 0, total: 0 },
            },
            topicBreakdown: {},
            weakTopics: [],
          },
          answers: d.answers || [],
          antiCheatEvents: d.anti_cheat_events || [],
        }));

        // Sync with local storage
        if (!userId) {
          localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(mapped));
        }
        return mapped;
      }
    }
    const local = getMockSubmissions();
    return userId ? local.filter((s) => s.studentId === userId) : local;
  } catch (e) {
    console.error('Failed to fetch submissions:', e);
    const local = getMockSubmissions();
    return userId ? local.filter((s) => s.studentId === userId) : local;
  }
};

