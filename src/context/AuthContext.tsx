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
  studentId?: string;
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
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string; profile?: UserProfile; requiresEmailVerification?: boolean }>;
  signInWithGoogle: (intendedRole?: UserRole) => Promise<{ success: boolean; error?: string; profile?: UserProfile }>;
  resendVerificationEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
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

  // Helper to safely hydrate user profile from DB or OAuth session with automatic self-healing
  const hydrateUserProfile = async (sessionUser: any): Promise<UserProfile> => {
    let loaded: UserProfile | null = null;
    const client = supabase;

    if (isSupabaseConfigured() && client) {
      try {
        const { data: dbProfile, error: pErr } = await client
          .from('profiles')
          .select('*')
          .eq('id', sessionUser.id)
          .maybeSingle();

        if (dbProfile) {
          loaded = {
            id: dbProfile.id,
            email: dbProfile.email || sessionUser.email,
            fullName: dbProfile.full_name || sessionUser.user_metadata?.full_name || sessionUser.user_metadata?.name || 'User',
            role: dbProfile.role || 'student',
            studentId: dbProfile.student_id,
            avatarUrl: dbProfile.avatar_url || sessionUser.user_metadata?.avatar_url || sessionUser.user_metadata?.picture,
            teacherStatus: dbProfile.teacher_status,
            teacherNote: dbProfile.teacher_note,
            customGeminiApiKey: dbProfile.custom_gemini_api_key,
            createdAt: dbProfile.created_at || new Date().toISOString(),
            updatedAt: dbProfile.updated_at,
          };
        }
      } catch (err) {
        console.warn('Profile lookup error, using OAuth fallback:', err);
      }

      // If no profile exists yet in DB (e.g. trigger didn't run), create one immediately!
      if (!loaded) {
        const oauthRole = (localStorage.getItem('pyquiz_oauth_role') as UserRole) || sessionUser.user_metadata?.role || 'student';
        const fullName = sessionUser.user_metadata?.full_name || sessionUser.user_metadata?.name || sessionUser.email?.split('@')[0] || 'Google User';
        const avatarUrl = sessionUser.user_metadata?.avatar_url || sessionUser.user_metadata?.picture || undefined;

        loaded = {
          id: sessionUser.id,
          email: sessionUser.email,
          fullName,
          role: oauthRole,
          avatarUrl,
          teacherStatus: oauthRole === 'teacher' ? 'pending' : 'approved',
          createdAt: new Date().toISOString(),
        };

        // Self-heal: insert profile into public.profiles in background
        client
          .from('profiles')
          .upsert({
            id: sessionUser.id,
            email: sessionUser.email,
            full_name: fullName,
            role: oauthRole,
            avatar_url: avatarUrl,
            teacher_status: oauthRole === 'teacher' ? 'pending' : 'approved',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .then(({ error }) => {
            if (error) console.error('Self-healing profile creation error:', error);
          });
      }
    }
    return loaded!;
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        if (isSupabaseConfigured() && supabase) {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData?.session?.user) {
            const profile = await hydrateUserProfile(sessionData.session.user);
            setUser(profile);
          }
        } else {
          // Mock Session Fallback
          const mockSession = getMockCurrentSession();
          if (mockSession) {
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

    // Supabase Auth State Change Listener (handles OAuth redirects & token refreshes)
    let authSubscription: { unsubscribe: () => void } | null = null;
    const client = supabase;
    if (isSupabaseConfigured() && client) {
      const { data } = client.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          try {
            const profile = await hydrateUserProfile(session.user);
            setUser(profile);
            setLoading(false);

            // Clean OAuth parameters from URL after session is established
            if (
              window.location.hash.includes('access_token=') ||
              window.location.hash.includes('error=') ||
              window.location.search.includes('code=') ||
              window.location.search.includes('error=')
            ) {
              window.history.replaceState({}, document.title, window.location.pathname);
            }
          } catch (err) {
            console.error('Error hydrating profile on auth change:', err);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
        }
      });
      authSubscription = data.subscription;
    }

    return () => {
      authSubscription?.unsubscribe();
    };
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
            studentId: profile.student_id,
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
          const loaded = await hydrateUserProfile(data.user);
          setUser(loaded);
          return { success: true, profile: loaded };
        }
      } else {
        // Mock Auth Fallback
        const all = getMockProfiles();
        const cleanEmail = email.trim().toLowerCase();
        const found = all.find((p) => p.email.toLowerCase() === cleanEmail);

        if (!found) {
          return { success: false, error: 'No account found with this email. Please sign up.' };
        }

        setUser(found);
        setMockCurrentSession(found);
        return { success: true, profile: found };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Sign in failed' };
    }
  };

  const signUp = async (
    data: SignUpData
  ): Promise<{ success: boolean; error?: string; profile?: UserProfile; requiresEmailVerification?: boolean }> => {
    try {
      const initialTeacherStatus: TeacherApprovalStatus = data.role === 'teacher' ? 'pending' : 'approved';

      if (isSupabaseConfigured() && supabase) {
        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email: data.email.trim(),
          password: data.password || '123456',
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: data.fullName.trim(),
              role: data.role,
              student_id: data.studentId?.trim() || '',
              teacher_note: data.teacherNote || '',
            },
          },
        });

        if (authErr) throw authErr;

        if (authData?.user) {
          const requiresEmailVerification = !authData.session;
          const newProfile: UserProfile = {
            id: authData.user.id,
            email: data.email.trim(),
            fullName: data.fullName.trim(),
            role: data.role,
            studentId: data.studentId?.trim() || undefined,
            teacherStatus: initialTeacherStatus,
            teacherNote: data.teacherNote,
            createdAt: new Date().toISOString(),
          };

          // Save directly to public.profiles table
          try {
            await supabase.from('profiles').upsert({
              id: authData.user.id,
              email: data.email.trim(),
              full_name: data.fullName.trim(),
              role: data.role,
              student_id: data.studentId?.trim() || null,
              teacher_status: initialTeacherStatus,
              teacher_note: data.teacherNote || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          } catch (dbErr) {
            console.warn('Profile direct insert notice:', dbErr);
          }

          if (authData.session) {
            setUser(newProfile);
          }

          return { success: true, profile: newProfile, requiresEmailVerification };
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
          studentId: data.studentId?.trim() || undefined,
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

  const signInWithGoogle = async (
    intendedRole: UserRole = 'student'
  ): Promise<{ success: boolean; error?: string; profile?: UserProfile }> => {
    try {
      if (isSupabaseConfigured() && supabase) {
        // Store intended role in localStorage so trigger or fallback can align
        localStorage.setItem('pyquiz_oauth_role', intendedRole);

        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        });

        if (error) throw error;
        return { success: true };
      } else {
        // Mock Google OAuth simulation
        const mockEmail = `google.user.${Math.floor(Math.random() * 1000)}@gmail.com`;
        const newGoogleUser: UserProfile = {
          id: `google-${Date.now()}`,
          email: mockEmail,
          fullName: 'Google User',
          role: intendedRole,
          teacherStatus: intendedRole === 'teacher' ? 'pending' : 'approved',
          createdAt: new Date().toISOString(),
        };
        const all = getMockProfiles();
        saveMockProfiles([...all, newGoogleUser]);
        setUser(newGoogleUser);
        setMockCurrentSession(newGoogleUser);
        return { success: true, profile: newGoogleUser };
      }
    } catch (err: any) {
      console.error('Google sign in error:', err);
      return { success: false, error: err.message || 'Google sign in failed' };
    }
  };

  const resendVerificationEmail = async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: email.trim(),
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        return { success: true };
      }
      return { success: true };
    } catch (err: any) {
      console.error('Resend verification email error:', err);
      return { success: false, error: err.message || 'Failed to resend confirmation email.' };
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
          studentId: p.student_id,
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
        signInWithGoogle,
        resendVerificationEmail,
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
