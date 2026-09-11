import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/quiz';
import { PyQuizLogo } from '../common/PyQuizLogo';
import {
  X,
  Lock,
  Mail,
  User,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
  intendedRole?: UserRole;
  onAuthSuccess?: () => void;
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultTab = 'signin',
  intendedRole = 'student',
  onAuthSuccess,
}) => {
  const { signIn, signUp } = useAuth();

  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>(intendedRole);
  const [teacherNote, setTeacherNote] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setSubmitting(true);
    const result = await signIn(email, password);
    setSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Invalid credentials.');
    } else {
      setSuccessMsg('Successfully signed in.');
      setTimeout(() => {
        onClose();
        if (onAuthSuccess) onAuthSuccess();
      }, 500);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }

    if (role === 'teacher' && !teacherNote.trim()) {
      setErrorMsg('Please provide a brief note or credentials for your teacher application.');
      return;
    }

    setSubmitting(true);
    const result = await signUp({
      fullName,
      email,
      password: password || '123456',
      role,
      teacherNote: role === 'teacher' ? teacherNote : undefined,
    });
    setSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to create account.');
    } else {
      if (role === 'teacher') {
        setSuccessMsg(
          'Teacher application submitted! Your account is pending administrator approval before instructor privileges are activated.'
        );
      } else {
        setSuccessMsg('Account created successfully!');
      }
      setTimeout(() => {
        onClose();
        if (onAuthSuccess) onAuthSuccess();
      }, 1200);
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setErrorMsg(null);
    setSubmitting(true);
    const result = await signIn(demoEmail, 'demo123');
    setSubmitting(false);
    if (result.success) {
      onClose();
      if (onAuthSuccess) onAuthSuccess();
    } else {
      setErrorMsg(result.error || 'Demo sign in failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="card-editorial w-full max-w-md p-6 sm:p-8 relative bg-editorial-card border border-editorial-border shadow-2xl rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-editorial-muted-fg hover:text-editorial-fg hover:bg-editorial-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <PyQuizLogo size="md" variant="emblem" className="mb-3" />
          <h2 className="font-serif text-2xl font-bold text-editorial-fg tracking-tight">
            {tab === 'signin' ? 'Welcome Back to PyQuiz' : 'Join the PyQuiz Platform'}
          </h2>
          <p className="text-xs text-editorial-muted-fg mt-1">
            {tab === 'signin'
              ? 'Sign in to access your dashboard, rooms, and score history'
              : 'Create an account to evaluate candidates or test your Python mastery'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-editorial-muted border border-editorial-border rounded-md mb-6">
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`py-2 text-xs font-semibold rounded transition-all ${
              tab === 'signin'
                ? 'bg-editorial-card text-editorial-fg shadow-sm border border-editorial-border'
                : 'text-editorial-muted-fg hover:text-editorial-fg'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`py-2 text-xs font-semibold rounded transition-all ${
              tab === 'signup'
                ? 'bg-editorial-card text-editorial-fg shadow-sm border border-editorial-border'
                : 'text-editorial-muted-fg hover:text-editorial-fg'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {tab === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-editorial-fg mb-1.5 small-caps">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-editorial-muted-fg" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm placeholder:text-editorial-muted-fg focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-editorial-fg mb-1.5 small-caps">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-editorial-muted-fg" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm placeholder:text-editorial-muted-fg focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary-serif py-3 text-sm flex items-center justify-center space-x-2 mt-2"
            >
              <span>{submitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick 1-Click Demo Accounts */}
            <div className="mt-6 pt-4 border-t border-editorial-border">
              <span className="block text-center text-[10px] uppercase font-mono tracking-wider text-editorial-muted-fg mb-2.5">
                — Quick Demo Logins —
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin@pyquiz.com')}
                  className="p-2 rounded border border-editorial-border bg-editorial-muted/60 hover:bg-editorial-muted text-left text-xs transition-colors flex items-center space-x-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-editorial-accent shrink-0" />
                  <div className="truncate">
                    <div className="font-semibold text-editorial-fg truncate">Admin</div>
                    <div className="text-[10px] text-editorial-muted-fg">Full Access</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('teacher@pyquiz.com')}
                  className="p-2 rounded border border-editorial-border bg-editorial-muted/60 hover:bg-editorial-muted text-left text-xs transition-colors flex items-center space-x-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <div className="font-semibold text-editorial-fg truncate">Teacher</div>
                    <div className="text-[10px] text-editorial-muted-fg">Approved Prof</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('newteacher@pyquiz.com')}
                  className="p-2 rounded border border-editorial-border bg-editorial-muted/60 hover:bg-editorial-muted text-left text-xs transition-colors flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <div className="truncate">
                    <div className="font-semibold text-editorial-fg truncate">Teacher</div>
                    <div className="text-[10px] text-editorial-muted-fg">Pending Approval</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('student@pyquiz.com')}
                  className="p-2 rounded border border-editorial-border bg-editorial-muted/60 hover:bg-editorial-muted text-left text-xs transition-colors flex items-center space-x-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-editorial-accent shrink-0" />
                  <div className="truncate">
                    <div className="font-semibold text-editorial-fg truncate">Student</div>
                    <div className="text-[10px] text-editorial-muted-fg">Candidate</div>
                  </div>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-editorial-fg mb-1.5 small-caps">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-editorial-muted-fg" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alan Turing"
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm placeholder:text-editorial-muted-fg focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-editorial-fg mb-1.5 small-caps">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-editorial-muted-fg" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. candidate@university.edu"
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm placeholder:text-editorial-muted-fg focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-editorial-fg mb-1.5 small-caps">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-editorial-muted-fg" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm placeholder:text-editorial-muted-fg focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-editorial-fg mb-1.5 small-caps">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-2.5 rounded-md border text-left transition-all ${
                    role === 'student'
                      ? 'bg-editorial-accent/10 border-editorial-accent text-editorial-fg shadow-sm'
                      : 'border-editorial-border text-editorial-muted-fg hover:border-editorial-accent/50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 font-semibold text-xs">
                    <BookOpen className="w-3.5 h-3.5 text-editorial-accent" />
                    <span>Candidate / Student</span>
                  </div>
                  <div className="text-[10px] text-editorial-muted-fg mt-0.5">
                    Take live & practice exams
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`p-2.5 rounded-md border text-left transition-all ${
                    role === 'teacher'
                      ? 'bg-editorial-accent/10 border-editorial-accent text-editorial-fg shadow-sm'
                      : 'border-editorial-border text-editorial-muted-fg hover:border-editorial-accent/50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 font-semibold text-xs">
                    <GraduationCap className="w-3.5 h-3.5 text-editorial-accent" />
                    <span>Instructor / Teacher</span>
                  </div>
                  <div className="text-[10px] text-editorial-muted-fg mt-0.5">
                    Requires Admin Approval
                  </div>
                </button>
              </div>
            </div>

            {/* If Teacher Role selected, require application note */}
            {role === 'teacher' && (
              <div className="p-3 rounded-md bg-editorial-muted/70 border border-editorial-border space-y-2 animate-fadeIn">
                <div className="flex items-start space-x-1.5 text-xs text-amber-700 dark:text-amber-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight">
                    Teacher accounts require platform administrator approval. Please provide your institutional affiliation or teaching notes.
                  </span>
                </div>
                <textarea
                  rows={2}
                  required
                  value={teacherNote}
                  onChange={(e) => setTeacherNote(e.target.value)}
                  placeholder="e.g. Instructor of CS101 at University of Engineering, requesting live quiz hosting access..."
                  className="w-full p-2 rounded border border-editorial-border bg-editorial-bg text-editorial-fg text-xs focus:outline-none focus:border-editorial-accent font-sans"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary-serif py-3 text-sm flex items-center justify-center space-x-2 mt-2"
            >
              <span>{submitting ? 'Registering...' : role === 'teacher' ? 'Submit Teacher Request' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
