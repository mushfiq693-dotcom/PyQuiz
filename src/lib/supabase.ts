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

export const saveMockSubmission = (submission: UserSubmissionRecord) => {
  try {
    const all = getMockSubmissions();
    const updated = [submission, ...all];
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save submission:', e);
  }
};
