import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  BookOpen,
  Layers,
  Clock,
  Award,
  GraduationCap,
  TrendingUp,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { allQuestions } from '../../data/questions';
import { PyQuizLogo } from '../common/PyQuizLogo';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/quiz';

interface Props {
  onStartTeacher: () => void;
  onStartStudent: () => void;
  onStartPractice: () => void;
  onCreateQuiz: () => void;
  onOpenAnalytics?: () => void;
  onRequireAuth: (tab?: 'signin' | 'signup', intendedRole?: UserRole) => void;
  activeSessionsCount: number;
}

export const LandingPage: React.FC<Props> = ({
  onStartTeacher,
  onStartStudent,
  onStartPractice,
  onCreateQuiz,
  onOpenAnalytics,
  onRequireAuth,
  activeSessionsCount,
}) => {
  const { isAuthenticated, user, isTeacher, isAdmin, isStudent } = useAuth();

  const handleTeacherAction = () => {
    if (!isAuthenticated) {
      onRequireAuth('signin', 'teacher');
    } else {
      onStartTeacher();
    }
  };

  const handleStudentAction = () => {
    if (!isAuthenticated) {
      onRequireAuth('signin', 'student');
    } else {
      onStartStudent();
    }
  };

  const handlePracticeAction = () => {
    if (!isAuthenticated) {
      onRequireAuth('signin', 'student');
    } else {
      onStartPractice();
    }
  };

  const handleCreateQuizAction = () => {
    if (!isAuthenticated) {
      onRequireAuth('signup', 'teacher');
    } else {
      onCreateQuiz();
    }
  };

  // Shared identical button styling for UI consistency
  const actionBtnClass =
    'flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border border-editorial-border bg-editorial-card hover:border-editorial-accent/70 hover:bg-editorial-muted/70 text-editorial-fg shadow-xs hover:shadow-editorial-md transition-all font-sans font-medium text-sm hover:-translate-y-0.5 active:translate-y-0 text-center min-w-[200px]';

  return (
    <div className="space-y-24 py-10 sm:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Top Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-editorial-muted border border-editorial-border text-editorial-accent mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="small-caps text-[11px] font-semibold tracking-[0.18em]">
            Standard Protocol for Python Competency
          </span>
        </div>

        {/* Brand Mascot Logo with Animated Snake Slither */}
        <div className="flex items-center justify-center mb-6">
          <PyQuizLogo size="xl" variant="emblem" className="shadow-xl" />
        </div>

        {/* Product Name & Motto */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-editorial-fg leading-[1.1] mb-6">
          PyQuiz
        </h1>
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-editorial-accent font-medium max-w-3xl mx-auto mb-8 leading-relaxed">
          "Unlocking Deep Python Mastery Through Live Quizzing"
        </p>

        {/* Concise Subtitle Description */}
        <p className="text-base sm:text-lg text-editorial-muted-fg max-w-xl mx-auto font-sans leading-relaxed mb-6">
          Standardized assessment platform engineered for computer science educators and candidates.
        </p>

        {/* Unified Editorial Specification Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 rounded-lg border border-editorial-border bg-editorial-card/70 divide-x divide-y sm:divide-y-0 divide-editorial-border overflow-hidden text-xs font-mono shadow-xs">
            <div className="flex items-center justify-center space-x-2 py-2.5 px-3">
              <Zap className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-editorial-fg font-medium tracking-tight">Live Sync</span>
            </div>
            <div className="flex items-center justify-center space-x-2 py-2.5 px-3">
              <Layers className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="text-editorial-fg font-medium tracking-tight">4 Quadrants</span>
            </div>
            <div className="flex items-center justify-center space-x-2 py-2.5 px-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span className="text-editorial-fg font-medium tracking-tight">Gemini AI</span>
            </div>
            <div className="flex items-center justify-center space-x-2 py-2.5 px-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-editorial-fg font-medium tracking-tight">Anti-Cheat</span>
            </div>
          </div>
        </div>

        {/* PRIMARY CTA BUTTONS - UNIFIED MATCHING UI */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-3xl mx-auto">
          {/* GUEST (UNAUTHENTICATED) HERO BUTTONS */}
          {!isAuthenticated && (
            <>
              <button onClick={handleTeacherAction} className={actionBtnClass}>
                <GraduationCap className="w-4 h-4 text-editorial-accent shrink-0" />
                <span>Instructor Portal</span>
              </button>

              <button onClick={handleStudentAction} className={actionBtnClass}>
                <Users className="w-4 h-4 text-editorial-accent shrink-0" />
                <span>Candidate Live Portal</span>
              </button>

              <button onClick={handlePracticeAction} className={actionBtnClass}>
                <BookOpen className="w-4 h-4 text-editorial-accent shrink-0" />
                <span>Solo Practice Exam</span>
              </button>
            </>
          )}

          {/* TEACHER LOGGED IN HERO BUTTONS (NO SOLO PRACTICE) */}
          {isAuthenticated && isTeacher && (
            <>
              <button onClick={onStartTeacher} className={actionBtnClass}>
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Enter Instructor Console</span>
              </button>

              <button onClick={onCreateQuiz} className={actionBtnClass}>
                <Sparkles className="w-4 h-4 text-editorial-accent shrink-0" />
                <span>Synthesize Custom Quiz</span>
              </button>

              {onOpenAnalytics && (
                <button onClick={onOpenAnalytics} className={actionBtnClass}>
                  <TrendingUp className="w-4 h-4 text-editorial-accent shrink-0" />
                  <span>Student Analytics Dossier</span>
                </button>
              )}
            </>
          )}

          {/* STUDENT LOGGED IN HERO BUTTONS */}
          {isAuthenticated && isStudent && (
            <>
              <button onClick={onStartStudent} className={actionBtnClass}>
                <Users className="w-4 h-4 text-editorial-accent shrink-0" />
                <span>Candidate Portal & PIN</span>
              </button>

              <button onClick={onStartPractice} className={actionBtnClass}>
                <BookOpen className="w-4 h-4 text-editorial-accent shrink-0" />
                <span>Solo Practice Exam</span>
              </button>

              {onOpenAnalytics && (
                <button onClick={onOpenAnalytics} className={actionBtnClass}>
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>My Performance Analytics</span>
                </button>
              )}
            </>
          )}

          {/* ADMIN LOGGED IN HERO BUTTONS */}
          {isAuthenticated && isAdmin && (
            <>
              <button onClick={onStartTeacher} className={actionBtnClass}>
                <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>Admin Governance Console</span>
              </button>

              {onOpenAnalytics && (
                <button onClick={onOpenAnalytics} className={actionBtnClass}>
                  <BarChart3 className="w-4 h-4 text-editorial-accent shrink-0" />
                  <span>Platform Analytics Tracker</span>
                </button>
              )}

              <button onClick={onCreateQuiz} className={actionBtnClass}>
                <Sparkles className="w-4 h-4 text-editorial-accent shrink-0" />
                <span>Synthesize Assessment</span>
              </button>
            </>
          )}
        </div>

        {/* Guest Warning / Helper */}
        {!isAuthenticated && (
          <p className="text-xs text-editorial-muted-fg mt-4 italic font-serif">
            * Authentication required to enter live evaluation rooms and launch exams.
          </p>
        )}

        {/* Live System Indicator Strip */}
        <div className="mt-12 pt-8 border-t border-editorial-border flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-editorial-muted-fg">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync Engine Active</span>
          </span>
          <span>•</span>
          <span>{allQuestions.length}+ Standardized Questions</span>
          <span>•</span>
          <span>4 Curriculum Quadrants</span>
          <span>•</span>
          <span>{activeSessionsCount} Live Rooms Active</span>
        </div>
      </section>

      {/* 2. STATS & KEY METRICS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="card-editorial p-6 text-center">
            <span className="small-caps text-editorial-muted-fg block mb-2">Item Repository</span>
            <span className="font-serif text-3xl sm:text-4xl text-editorial-fg block font-normal">
              {allQuestions.length}+
            </span>
            <span className="text-xs text-editorial-muted-fg mt-1 block">Curated Questions</span>
          </div>

          <div className="card-editorial p-6 text-center">
            <span className="small-caps text-editorial-muted-fg block mb-2">Cognitive Tiers</span>
            <span className="font-serif text-3xl sm:text-4xl text-editorial-fg block font-normal">
              3 Levels
            </span>
            <span className="text-xs text-editorial-muted-fg mt-1 block">Foundational to Advanced</span>
          </div>

          <div className="card-editorial p-6 text-center">
            <span className="small-caps text-editorial-muted-fg block mb-2">Scoring Protocol</span>
            <span className="font-serif text-3xl sm:text-4xl text-editorial-fg block font-normal">
              -0.25
            </span>
            <span className="text-xs text-editorial-muted-fg mt-1 block">Negative Marking &gt;9 Err</span>
          </div>

          <div className="card-editorial p-6 text-center">
            <span className="small-caps text-editorial-muted-fg block mb-2">Live Room Latency</span>
            <span className="font-serif text-3xl sm:text-4xl text-editorial-accent block font-normal">
              &lt;100ms
            </span>
            <span className="text-xs text-editorial-muted-fg mt-1 block">Real-Time Sync Protocol</span>
          </div>
        </div>
      </section>

      {/* 3. CORE PLATFORM CAPABILITIES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rule-divider mb-8">
          <span className="small-caps text-editorial-accent">Engineered for Academic Rigor</span>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-editorial-fg font-normal">
            Precision Assessment Features
          </h2>
          <p className="text-sm text-editorial-muted-fg max-w-xl mx-auto mt-2">
            Every element of PyQuiz is designed with intentionality, balancing classical typography with cutting-edge evaluation tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Live Room Dispatch</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Broadcast assessment sessions with dedicated PIN access. Examinees connect seamlessly and synchronize countdown timers with instructor commands.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Gemini AI Calibration</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Upload syllabus PDFs or images for intelligent OCR parsing, or command Gemini 2.5 to generate custom multi-level code challenges on demand.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Proctored Anti-Cheat</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Automatic fullscreen auditing, window blur detection, and proctor event logging ensure complete integrity across live competitive examinations.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Adaptive Timers</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Configurable per-question countdown rings with audible warning ticks and automated timeout locks to test real programming agility.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Performance Dossier</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Detailed post-quiz grade sheets with cognitive difficulty breakdowns, topic mastery indices, and line-by-line editorial code explanations.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Offline Archive Fallback</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Full offline functionality with 360 curated Python questions across 12 standardized sets even when no API keys are present.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER (ROLE SPECIFIC & BALANCED) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-editorial accent-top p-8 sm:p-12 text-center relative overflow-hidden">
          <span className="small-caps text-editorial-accent block mb-3">
            Begin Your Python Evaluation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-editorial-fg font-normal max-w-2xl mx-auto mb-4 leading-tight">
            Ready to Unlock Deep Python Mastery?
          </h2>
          <p className="text-sm text-editorial-muted-fg max-w-lg mx-auto mb-8 font-sans">
            Launch a proctored assessment room or configure custom curriculum questions in seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            {/* If Teacher */}
            {isAuthenticated && isTeacher ? (
              <>
                <button onClick={handleCreateQuizAction} className={actionBtnClass}>
                  <Sparkles className="w-4 h-4 text-editorial-accent shrink-0" />
                  <span>Synthesize Custom Quiz</span>
                </button>
                <button onClick={onStartTeacher} className={actionBtnClass}>
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Instructor Dashboard</span>
                </button>
              </>
            ) : isAuthenticated && isStudent ? (
              /* If Student */
              <>
                <button onClick={handleStudentAction} className={actionBtnClass}>
                  <Users className="w-4 h-4 text-editorial-accent shrink-0" />
                  <span>Join with Quiz PIN</span>
                </button>
                <button onClick={handlePracticeAction} className={actionBtnClass}>
                  <BookOpen className="w-4 h-4 text-editorial-accent shrink-0" />
                  <span>Solo Practice Exam</span>
                </button>
              </>
            ) : (
              /* If Guest / Admin */
              <>
                <button onClick={handleCreateQuizAction} className={actionBtnClass}>
                  <Sparkles className="w-4 h-4 text-editorial-accent shrink-0" />
                  <span>Create Custom Quiz</span>
                </button>
                <button onClick={handleStudentAction} className={actionBtnClass}>
                  <Users className="w-4 h-4 text-editorial-accent shrink-0" />
                  <span>Join with Quiz PIN</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
