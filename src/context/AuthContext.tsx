import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, TeacherApprovalStatus } from '../types/quiz';
import {
  isSupabaseConfigured,
  supabase,
  getMockProfiles,
  saveMockProfiles,
  getMockCurrentSession,
  setMockCurrentSession,
} from '../lib/supabase';

interface SignUpData {
  email: string;
  password?: string;
  fullName: string;
  role: UserRole;
  teacherNote?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  teacherStatus: TeacherApprovalStatus | null;
  isAuthenticated: boolean;
  isApproved: boolean;
  isPendingTeacher: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string; profile?: UserProfile }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string; profile?: UserProfile }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  adminSetTeacherStatus: (userId: string, newStatus: TeacherApprovalStatus) => Promise<void>;
  getAllUsers: () => Promise<UserProfile[]>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        if (isSupabaseConfigured() && supabase) {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData?.session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', sessionData.session.user.id)
              .single();

            if (profile) {
              setUser({
                id: profile.id,
                email: profile.email,
                fullName: profile.full_name,
                role: profile.role,
                avatarUrl: profile.avatar_url,
                teacherStatus: profile.teacher_status,
                teacherNote: profile.teacher_note,
                customGeminiApiKey: profile.custom_gemini_api_key,
                createdAt: profile.created_at,
                updatedAt: profile.updated_at,
              });
            }
          }
        } else {
          // Mock Session Fallback
          const mockSession = getMockCurrentSession();
          if (mockSession) {
            // refresh from all profiles
            const all = getMockProfiles();
            const found = all.find((p) => p.id === mockSession.id || p.email.toLowerCase() === mockSession.email.toLowerCase());
            if (found) {
              setUser(found);
              setMockCurrentSession(found);
            } else {
              setUser(mockSession);
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const refreshProfile = async () => {
    if (!user) return;
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            role: profile.role,
            avatarUrl: profile.avatar_url,
            teacherStatus: profile.teacher_status,
            teacherNote: profile.teacher_note,
            customGeminiApiKey: profile.custom_gemini_api_key,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          });
        }
      } else {
        const all = getMockProfiles();
        const found = all.find((p) => p.id === user.id);
        if (found) {
          setUser(found);
          setMockCurrentSession(found);
        }
      }
    } catch (e) {
      console.error('Failed to refresh profile:', e);
    }
  };

  const signIn = async (
    email: string,
    password?: string
  ): Promise<{ success: boolean; error?: string; profile?: UserProfile }> => {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password || '123456',
        });

        if (error) throw error;
        if (data?.user) {
          const { data: profile, error: pErr } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (pErr) throw pErr;

          const loaded: UserProfile = {
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            role: profile.role,
            avatarUrl: profile.avatar_url,
            teacherStatus: profile.teacher_status,
            teacherNote: profile.teacher_note,
            customGeminiApiKey: profile.custom_gemini_api_key,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          };
          setUser(loaded);
          return { success: true, profile: loaded };
        }
      } else {
        // Mock Auth Fallback
        const all = getMockProfiles();
        const cleanEmail = email.trim().toLowerCase();
        let found = all.find((p) => p.email.toLowerCase() === cleanEmail);

        if (!found) {
          // Auto-create as Student if logging in with unknown email
          const newStudent: UserProfile = {
            id: `user-${Date.now()}`,
            email: cleanEmail,
            fullName: cleanEmail.split('@')[0],
            role: 'student',
            teacherStatus: 'approved',
            createdAt: new Date().toISOString(),
          };
          const updated = [...all, newStudent];
          saveMockProfiles(updated);
          found = newStudent;
        }

        setUser(found);
        setMockCurrentSession(found);
        return { success: true, profile: found };
      }
      return { success: false, error: 'Sign in failed. Unknown response.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Authentication failed' };
    }
  };

  const signUp = async (
    data: SignUpData
  ): Promise<{ success: boolean; error?: string; profile?: UserProfile }> => {
    try {
      const initialTeacherStatus: TeacherApprovalStatus = data.role === 'teacher' ? 'pending' : 'approved';

      if (isSupabaseConfigured() && supabase) {
        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email: data.email.trim(),
          password: data.password || '123456',
          options: {
            data: {
              full_name: data.fullName.trim(),
              role: data.role,
              teacher_note: data.teacherNote || '',
            },
          },
        });

        if (authErr) throw authErr;

        if (authData?.user) {
          const newProfile: UserProfile = {
            id: authData.user.id,
            email: data.email.trim(),
            fullName: data.fullName.trim(),
            role: data.role,
            teacherStatus: initialTeacherStatus,
            teacherNote: data.teacherNote,
            createdAt: new Date().toISOString(),
          };
          setUser(newProfile);
          return { success: true, profile: newProfile };
        }
      } else {
        // Mock Signup
        const all = getMockProfiles();
        const cleanEmail = data.email.trim().toLowerCase();

        if (all.some((p) => p.email.toLowerCase() === cleanEmail)) {
          return { success: false, error: 'An account with this email already exists. Please sign in.' };
        }

        const newProfile: UserProfile = {
          id: `user-${Date.now()}`,
          email: cleanEmail,
          fullName: data.fullName.trim(),
          role: data.role,
          teacherStatus: initialTeacherStatus,
          teacherNote: data.teacherNote,
          createdAt: new Date().toISOString(),
        };

        const updated = [...all, newProfile];
        saveMockProfiles(updated);
        setUser(newProfile);
        setMockCurrentSession(newProfile);

        return { success: true, profile: newProfile };
      }
      return { success: false, error: 'Registration failed.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const signOut = async () => {
    try {
      if (isSupabaseConfigured() && supabase) {
        await supabase.auth.signOut();
      } else {
        setMockCurrentSession(null);
      }
    } catch (e) {
      console.error('Sign out error:', e);
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    try {
      if (isSupabaseConfigured() && supabase) {
        const payload: Record<string, any> = {
          updated_at: new Date().toISOString(),
        };
        if (updates.fullName !== undefined) payload.full_name = updates.fullName;
        if (updates.avatarUrl !== undefined) payload.avatar_url = updates.avatarUrl;
        if (updates.customGeminiApiKey !== undefined) payload.custom_gemini_api_key = updates.customGeminiApiKey;

        await supabase.from('profiles').update(payload).eq('id', user.id);
      } else {
        const all = getMockProfiles();
        const updated = all.map((p) => (p.id === user.id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
        saveMockProfiles(updated);
      }

      const merged = { ...user, ...updates, updatedAt: new Date().toISOString() };
      setUser(merged);
      setMockCurrentSession(merged);
    } catch (e) {
      console.error('Failed to update profile:', e);
    }
  };

  const adminSetTeacherStatus = async (userId: string, newStatus: TeacherApprovalStatus) => {
    try {
      if (isSupabaseConfigured() && supabase) {
        await supabase
          .from('profiles')
          .update({ teacher_status: newStatus, updated_at: new Date().toISOString() })
          .eq('id', userId);
      } else {
        const all = getMockProfiles();
        const updated = all.map((p) => (p.id === userId ? { ...p, teacherStatus: newStatus, updatedAt: new Date().toISOString() } : p));
        saveMockProfiles(updated);

        // If currently logged in as this user, update state
        if (user && user.id === userId) {
          const updatedSelf = { ...user, teacherStatus: newStatus };
          setUser(updatedSelf);
          setMockCurrentSession(updatedSelf);
        }
      }
    } catch (e) {
      console.error('Failed to update teacher status:', e);
    }
  };

  const getAllUsers = async (): Promise<UserProfile[]> => {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []).map((p: any) => ({
          id: p.id,
          email: p.email,
          fullName: p.full_name,
          role: p.role,
          avatarUrl: p.avatar_url,
          teacherStatus: p.teacher_status,
          teacherNote: p.teacher_note,
          customGeminiApiKey: p.custom_gemini_api_key,
          createdAt: p.created_at,
          updatedAt: p.updated_at,
        }));
      } else {
        return getMockProfiles();
      }
    } catch (e) {
      console.error('Failed to fetch all users:', e);
      return getMockProfiles();
    }
  };

  const role = user?.role || null;
  const teacherStatus = user?.teacherStatus || null;
  const isAuthenticated = !!user;
  const isAdmin = role === 'admin';
  const isTeacher = role === 'teacher';
  const isStudent = role === 'student';
  const isPendingTeacher = isTeacher && teacherStatus !== 'approved';
  const isApproved = isAuthenticated && (!isTeacher || teacherStatus === 'approved');

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        teacherStatus,
        isAuthenticated,
        isApproved,
        isPendingTeacher,
        isAdmin,
        isTeacher,
        isStudent,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        adminSetTeacherStatus,
        getAllUsers,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
