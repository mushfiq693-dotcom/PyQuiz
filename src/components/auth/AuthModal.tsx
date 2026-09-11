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
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Hash,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
  intendedRole?: UserRole;
  onAuthSuccess?: () => void;
}

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultTab = 'signin',
  intendedRole = 'student',
  onAuthSuccess,
}) => {
  const { signIn, signUp, signInWithGoogle, resendVerificationEmail } = useAuth();

  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [role, setRole] = useState<UserRole>(intendedRole);
  const [teacherNote, setTeacherNote] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [verificationPendingEmail, setVerificationPendingEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

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
      if (result.error?.toLowerCase().includes('email not confirmed')) {
        setErrorMsg('Your email address has not been confirmed yet. Please check your inbox and click the activation link.');
        setVerificationPendingEmail(email.trim());
      } else {
        setErrorMsg(result.error || 'Invalid credentials.');
      }
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

    if (role === 'student' && !studentId.trim()) {
      setErrorMsg('Please enter your student ID (e.g. 24CSE031).');
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
      studentId: role === 'student' ? studentId.trim() : undefined,
      teacherNote: role === 'teacher' ? teacherNote : undefined,
    });
    setSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to create account.');
    } else {
      if (result.requiresEmailVerification) {
        setVerificationPendingEmail(email.trim());
      } else if (role === 'teacher') {
        setSuccessMsg(
          'Teacher application submitted! Your account is pending administrator approval before instructor privileges are activated.'
        );
        setTimeout(() => {
          onClose();
          if (onAuthSuccess) onAuthSuccess();
        }, 2000);
      } else {
        setSuccessMsg('Account created successfully!');
        setTimeout(() => {
          onClose();
          if (onAuthSuccess) onAuthSuccess();
        }, 1200);
      }
    }
  };

  const handleResend = async () => {
    if (!verificationPendingEmail) return;
    setResending(true);
    setErrorMsg(null);
    const res = await resendVerificationEmail(verificationPendingEmail);
    setResending(false);
    if (res.success) {
      setSuccessMsg(`Confirmation email resent to ${verificationPendingEmail}!`);
    } else {
      setErrorMsg(res.error || 'Failed to resend confirmation email.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSubmitting(true);
    const result = await signInWithGoogle(role);
    setSubmitting(false);
    if (!result.success) {
      setErrorMsg(result.error || 'Google authentication failed.');
    } else {
      if (result.profile) {
        onClose();
        if (onAuthSuccess) onAuthSuccess();
      }
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

        {/* Email Verification Pending View */}
        {verificationPendingEmail ? (
          <div className="text-center py-4 space-y-4 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-full bg-editorial-accent/10 border border-editorial-accent/30 flex items-center justify-center text-editorial-accent animate-pulse">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-editorial-fg">
                Check Your Email Inbox
              </h3>
              <p className="text-xs text-editorial-muted-fg mt-1">
                We sent a secure verification link to:
              </p>
              <p className="font-mono text-xs font-semibold text-editorial-fg mt-1 bg-editorial-muted py-1 px-3 rounded-md inline-block border border-editorial-border">
                {verificationPendingEmail}
              </p>
            </div>
            <p className="text-xs text-editorial-muted-fg leading-relaxed max-w-sm mx-auto">
              Please click the confirmation link in your email to activate your account. Once verified, you will be able to sign in immediately.
            </p>
            <div className="pt-2 flex flex-col space-y-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="w-full py-2.5 px-4 rounded-md border border-editorial-border bg-editorial-muted hover:bg-editorial-card text-editorial-fg font-sans font-medium text-xs transition-all shadow-xs hover:border-editorial-accent"
              >
                {resending ? 'Resending Link...' : "Didn't receive the email? Resend"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setVerificationPendingEmail(null);
                  setTab('signin');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className="text-xs text-editorial-muted-fg hover:text-editorial-fg underline font-mono pt-1"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        ) : (
          <>
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

            {/* Prominent Google OAuth Button at Top */}
            <div className="mb-5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={submitting}
                className="w-full py-2.5 px-4 rounded-lg border-2 border-editorial-accent/30 bg-editorial-card hover:bg-editorial-muted hover:border-editorial-accent text-editorial-fg font-sans font-semibold text-xs flex items-center justify-center space-x-2.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <GoogleIcon />
                <span className="tracking-wide">
                  {tab === 'signin' ? 'Continue with Google' : 'Sign up with Google'}
                </span>
              </button>

              {/* Section Divider */}
              <div className="mt-4 flex items-center justify-center space-x-3">
                <div className="h-px flex-1 bg-editorial-border" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-editorial-muted-fg font-semibold">
                  or with email
                </span>
                <div className="h-px flex-1 bg-editorial-border" />
              </div>
            </div>

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
                  className="w-full pl-9 pr-3 py-2.5 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent font-sans"
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
                  className="w-full pl-9 pr-3 py-2.5 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent font-sans"
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
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Role Selection First */}
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

            {/* Full Name */}
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
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent"
                />
              </div>
            </div>

            {/* Student ID immediately under Full Name for Students */}
            {role === 'student' && (
              <div className="animate-fadeIn">
                <label className="block text-xs font-semibold text-editorial-fg mb-1.5 small-caps">
                  Student ID
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 absolute left-3 top-3 text-editorial-muted-fg" />
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="24CSE031"
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm placeholder:text-editorial-muted-fg/60 focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent font-mono uppercase"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
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
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent"
                />
              </div>
            </div>

            {/* Password */}
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
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent"
                />
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
                  className="w-full p-2 rounded border border-editorial-border bg-editorial-bg text-editorial-fg text-xs focus:outline-none focus:border-editorial-accent font-sans"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary-serif py-3 text-sm flex items-center justify-center space-x-2 mt-2"
            >
              <span>
                {submitting
                  ? 'Registering...'
                  : role === 'teacher'
                  ? 'Submit Teacher Request'
                  : 'Complete Registration'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
          </>
        )}
      </div>
    </div>
  );
};
