import React, { useState, useEffect } from 'react';
import {
  UserRole,
  QuizSessionConfig,
  StudentProfile,
  StudentAnswer,
  AntiCheatEvent,
  UserSubmissionRecord,
} from './types/quiz';
import { Question, QuizSet } from './data/questions/types';
import { syllabusSections } from './data/questions';
import { syncManager } from './utils/broadcast';
import { calculateQuizScore } from './utils/scoring';
import { saveMockSubmission } from './lib/supabase';
import { AuthProvider, useAuth } from './context/AuthContext';

// Common Components
import { Header } from './components/common/Header';
import { DevCreditWidget } from './components/common/DevCreditWidget';
import { PyQuizLogo } from './components/common/PyQuizLogo';
import { AuthModal } from './components/auth/AuthModal';
import { UserProfileModal } from './components/profile/UserProfileModal';

// Landing Page View
import { LandingPage } from './components/landing/LandingPage';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminAnalyticsView } from './components/admin/AdminAnalyticsView';

// Teacher Views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherAnalyticsView } from './components/teacher/TeacherAnalyticsView';
import { PendingApprovalScreen } from './components/teacher/PendingApprovalScreen';
import { QuizCreator } from './components/teacher/QuizCreator';
import { QuestionReviewer } from './components/teacher/QuestionReviewer';
import { TeacherLiveRoom } from './components/teacher/TeacherLiveRoom';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentAnalyticsView } from './components/student/StudentAnalyticsView';
import { StudentJoin } from './components/student/StudentJoin';
import { StudentWaitingRoom } from './components/student/StudentWaitingRoom';

// Quiz Execution Views
import { QuizScreen } from './components/quiz/QuizScreen';
import { ResultsScreen } from './components/quiz/ResultsScreen';
import { ReviewScreen } from './components/quiz/ReviewScreen';

type ViewType =
  | 'landing'
  | 'admin-dashboard'
  | 'admin-analytics'
  | 'teacher-dashboard'
  | 'teacher-analytics'
  | 'teacher-pending'
  | 'student-dashboard'
  | 'student-analytics'
  | 'quiz-creator'
  | 'question-reviewer'
  | 'teacher-live-room'
  | 'student-join'
  | 'student-waiting-room'
  | 'quiz-active'
  | 'quiz-results'
  | 'quiz-review';

const VALID_VIEWS: ViewType[] = [
  'landing',
  'admin-dashboard',
  'admin-analytics',
  'teacher-dashboard',
  'teacher-analytics',
  'teacher-pending',
  'student-dashboard',
  'student-analytics',
  'quiz-creator',
  'question-reviewer',
  'teacher-live-room',
  'student-join',
  'student-waiting-room',
  'quiz-active',
  'quiz-results',
  'quiz-review',
];

const MainAppContent: React.FC = () => {
  const { user, isAuthenticated, isAdmin, isTeacher, isStudent, isPendingTeacher } = useAuth();

  // Initialize view from URL hash if valid, otherwise landing
  const [currentView, _setCurrentView] = useState<ViewType>(() => {
    const rawHash = window.location.hash.replace('#', '');
    const rawSearch = window.location.search;
    if (
      rawHash.includes('access_token=') ||
      rawHash.includes('error=') ||
      rawSearch.includes('code=') ||
      rawSearch.includes('error=')
    ) {
      return 'landing';
    }
    return VALID_VIEWS.includes(rawHash as ViewType) ? (rawHash as ViewType) : 'landing';
  });

  // History-aware view updater: Pushes state to browser history so Back/Forward buttons work seamlessly
  const setCurrentView = (view: ViewType, replace: boolean = false) => {
    _setCurrentView(view);
    const hash = `#${view}`;
    if (replace) {
      window.history.replaceState({ view }, '', hash);
    } else {
      if (window.location.hash !== hash || window.history.state?.view !== view) {
        window.history.pushState({ view }, '', hash);
      }
    }
  };

  // Auth & Profile Modals
  const [authModalConfig, setAuthModalConfig] = useState<{
    isOpen: boolean;
    defaultTab: 'signin' | 'signup';
    intendedRole?: UserRole;
  }>({
    isOpen: false,
    defaultTab: 'signin',
    intendedRole: 'student',
  });
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Active Sessions
  const [activeSessions, setActiveSessions] = useState<QuizSessionConfig[]>(() => {
    try {
      const saved = localStorage.getItem('pyquiz_active_sessions');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [currentSession, setCurrentSession] = useState<QuizSessionConfig | null>(null);
  const [initialSetForCreator, setInitialSetForCreator] = useState<QuizSet | null>(null);

  const [reviewDraftConfig, setReviewDraftConfig] = useState<{
    quizTitle: string;
    sectionName: string;
    setName: string;
    timePerQuestion: number;
    negativeMarkingEnabled: boolean;
    questions: Question[];
  } | null>(null);

  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<StudentAnswer[]>([]);
  const [studentAntiCheatEvents, setStudentAntiCheatEvents] = useState<AntiCheatEvent[]>([]);

  // Initialize history state on load & listen for browser Back / Forward (popstate)
  useEffect(() => {
    const rawHash = window.location.hash;
    const rawSearch = window.location.search;
    const isOAuthCallback =
      rawHash.includes('access_token=') ||
      rawHash.includes('error=') ||
      rawSearch.includes('code=') ||
      rawSearch.includes('error=');

    // DO NOT touch URL state during OAuth callback so Supabase client can read & exchange tokens
    if (!isOAuthCallback && !window.history.state?.view) {
      window.history.replaceState({ view: currentView }, '', rawHash || `#${currentView}`);
    }

    const handlePopState = (event: PopStateEvent) => {
      const stateView = event.state?.view;
      const hashView = window.location.hash.replace('#', '') as ViewType;
      const targetView: ViewType = stateView || (VALID_VIEWS.includes(hashView) ? hashView : 'landing');

      // 1. Check authentication for protected views
      if (!isAuthenticated && targetView !== 'landing') {
        _setCurrentView('landing');
        window.history.replaceState({ view: 'landing' }, '', '#landing');
        return;
      }

      // 2. Role-specific routing checks
      if (targetView === 'teacher-dashboard' && isPendingTeacher) {
        _setCurrentView('teacher-pending');
        return;
      }

      // 3. Prevent landing on empty active quiz if session is cleared
      if (
        (targetView === 'quiz-active' || targetView === 'quiz-results' || targetView === 'quiz-review') &&
        !currentSession
      ) {
        const fallback = isStudent ? 'student-dashboard' : isTeacher ? 'teacher-dashboard' : 'landing';
        _setCurrentView(fallback);
        window.history.replaceState({ view: fallback }, '', `#${fallback}`);
        return;
      }

      if (targetView === 'question-reviewer' && !reviewDraftConfig) {
        _setCurrentView('quiz-creator');
        window.history.replaceState({ view: 'quiz-creator' }, '', '#quiz-creator');
        return;
      }

      _setCurrentView(targetView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated, isPendingTeacher, isAdmin, isTeacher, isStudent, currentSession, reviewDraftConfig]);

  // Sync active sessions with local storage
  useEffect(() => {
    try {
      localStorage.setItem('pyquiz_active_sessions', JSON.stringify(activeSessions));
    } catch {
      // ignore
    }
  }, [activeSessions]);

  // Listen to broadcast channel
  useEffect(() => {
    const unsubscribe = syncManager.subscribe((msg) => {
      if (msg.type === 'QUIZ_PUBLISHED') {
        setActiveSessions((prev) => {
          if (prev.some((s) => s.quizId === msg.payload.quizId)) return prev;
          return [msg.payload, ...prev];
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Redirect to landing if signed out from protected view
  useEffect(() => {
    if (!isAuthenticated && currentView !== 'landing') {
      setCurrentView('landing', true);
    }
  }, [isAuthenticated]);

  // Open Auth Modal helper
  const openAuthModal = (tab: 'signin' | 'signup' = 'signin', intendedRole: UserRole = 'student') => {
    setAuthModalConfig({
      isOpen: true,
      defaultTab: tab,
      intendedRole,
    });
  };

  const closeAuthModal = () => {
    setAuthModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Generic navigation handler called from Profile Dropdown & CTA buttons
  const handleNavigate = (targetView: string) => {
    if (!isAuthenticated && targetView !== 'landing') {
      openAuthModal('signin');
      return;
    }

    switch (targetView) {
      case 'landing':
        setCurrentView('landing');
        break;
      case 'admin-dashboard':
        if (isAdmin) setCurrentView('admin-dashboard');
        else openAuthModal('signin', 'teacher');
        break;
      case 'admin-analytics':
        if (isAdmin) setCurrentView('admin-analytics');
        break;
      case 'teacher-dashboard':
        if (isAdmin || (isTeacher && !isPendingTeacher)) setCurrentView('teacher-dashboard');
        else if (isPendingTeacher) setCurrentView('teacher-pending');
        else openAuthModal('signup', 'teacher');
        break;
      case 'teacher-analytics':
        if (isAdmin || (isTeacher && !isPendingTeacher)) setCurrentView('teacher-analytics');
        break;
      case 'teacher-pending':
        setCurrentView('teacher-pending');
        break;
      case 'student-dashboard':
        setCurrentView('student-dashboard');
        break;
      case 'student-analytics':
        setCurrentView('student-analytics');
        break;
      case 'practice':
        handleStartSoloPractice(0, 0);
        break;
      default:
        setCurrentView('landing');
    }
  };

  // Launch Solo Practice Exam
  const handleStartSoloPractice = (sectionIndex: number = 0, setIndex: number = 0) => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'student');
      return;
    }

    const sec = syllabusSections[sectionIndex] || syllabusSections[0];
    const set = sec.sets[setIndex] || sec.sets[0];

    const practiceSession: QuizSessionConfig = {
      quizId: `practice-${Date.now()}`,
      quizTitle: `${sec.name}: ${set.setName}`,
      sectionId: sec.id,
      sectionName: sec.name,
      setName: set.setName,
      joinCode: 'PRACTICE',
      totalQuestions: set.questions.length,
      timePerQuestion: 20,
      negativeMarkingEnabled: true,
      questions: set.questions,
      createdAt: Date.now(),
      status: 'active',
    };

    const student: StudentProfile = {
      id: user ? user.id : `self-${Date.now()}`,
      name: user ? user.fullName : 'Practice Candidate',
      joinedAt: Date.now(),
      currentQuestionIndex: 0,
      answers: [],
      antiCheatEvents: [],
      isCompleted: false,
    };

    setCurrentSession(practiceSession);
    setCurrentStudent(student);
    setStudentAnswers([]);
    setStudentAntiCheatEvents([]);
    setCurrentView('quiz-active');
  };

  // Teacher Handlers
  const handleStartCreateQuiz = () => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'teacher');
      return;
    }
    if (isPendingTeacher) {
      setCurrentView('teacher-pending');
      return;
    }
    setInitialSetForCreator(null);
    setCurrentView('quiz-creator');
  };

  const handleExploreSet = (quizSet: QuizSet) => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'teacher');
      return;
    }
    if (isPendingTeacher) {
      setCurrentView('teacher-pending');
      return;
    }
    setInitialSetForCreator(quizSet);
    setCurrentView('quiz-creator');
  };

  const handleQuickStartSet = (quizSet: QuizSet) => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'teacher');
      return;
    }
    if (isPendingTeacher) {
      setCurrentView('teacher-pending');
      return;
    }
    const randomPin = `PY-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSession: QuizSessionConfig = {
      quizId: `session-${Date.now()}`,
      quizTitle: `${quizSet.sectionName} - ${quizSet.setName}`,
      sectionId: quizSet.sectionId,
      sectionName: quizSet.sectionName,
      setName: quizSet.setName,
      joinCode: randomPin,
      totalQuestions: quizSet.questions.length,
      timePerQuestion: 20,
      negativeMarkingEnabled: true,
      questions: quizSet.questions,
      createdAt: Date.now(),
      status: 'waiting',
    };
    setActiveSessions((prev) => [newSession, ...prev]);
    setCurrentSession(newSession);
    syncManager.publish({ type: 'QUIZ_PUBLISHED', payload: newSession });
    setCurrentView('teacher-live-room');
  };

  const handleProceedToReview = (config: {
    quizTitle: string;
    sectionName: string;
    setName: string;
    timePerQuestion: number;
    negativeMarkingEnabled: boolean;
    questions: Question[];
  }) => {
    setReviewDraftConfig(config);
    setCurrentView('question-reviewer');
  };

  const handlePublishQuiz = (finalQuestions: Question[]) => {
    if (!reviewDraftConfig) return;
    const randomPin = `PY-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSession: QuizSessionConfig = {
      quizId: `session-${Date.now()}`,
      quizTitle: reviewDraftConfig.quizTitle,
      sectionName: reviewDraftConfig.sectionName,
      setName: reviewDraftConfig.setName,
      joinCode: randomPin,
      totalQuestions: finalQuestions.length,
      timePerQuestion: reviewDraftConfig.timePerQuestion,
      negativeMarkingEnabled: reviewDraftConfig.negativeMarkingEnabled,
      questions: finalQuestions,
      createdAt: Date.now(),
      status: 'waiting',
    };

    setActiveSessions((prev) => [newSession, ...prev]);
    setCurrentSession(newSession);
    syncManager.publish({ type: 'QUIZ_PUBLISHED', payload: newSession });
    setCurrentView('teacher-live-room');
  };

  // Student Handlers
  const handleStudentJoinSuccess = (data: {
    quizCode: string;
    studentName: string;
    studentId: string;
  }) => {
    let targetSession = activeSessions.find(
      (s) => s.joinCode.toUpperCase() === data.quizCode.toUpperCase()
    );

    if (!targetSession) {
      try {
        const saved = localStorage.getItem('pyquiz_active_sessions');
        if (saved) {
          const list: QuizSessionConfig[] = JSON.parse(saved);
          targetSession = list.find(
            (s) => s.joinCode.toUpperCase() === data.quizCode.toUpperCase()
          );
        }
      } catch {
        // ignore
      }
    }

    if (!targetSession) {
      const defaultSet = syllabusSections[0].sets[0];
      targetSession = {
        quizId: `session-${Date.now()}`,
        quizTitle: 'Python Assessment',
        sectionName: 'Module 1: Basics',
        setName: 'Set 1',
        joinCode: data.quizCode,
        totalQuestions: 30,
        timePerQuestion: 20,
        negativeMarkingEnabled: true,
        questions: defaultSet.questions,
        createdAt: Date.now(),
        status: 'waiting',
      };
      setActiveSessions((prev) => [targetSession!, ...prev]);
    }

    const student: StudentProfile = {
      id: user?.id || `stu-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: data.studentName,
      studentId: data.studentId,
      joinedAt: Date.now(),
      currentQuestionIndex: 0,
      answers: [],
      antiCheatEvents: [],
      isCompleted: false,
    };

    setCurrentSession(targetSession);
    setCurrentStudent(student);

    syncManager.publish({
      type: 'STUDENT_JOINED',
      payload: { quizCode: targetSession.joinCode, student },
    });

    setCurrentView('student-waiting-room');
  };

  const handleStartActiveQuiz = () => {
    setStudentAnswers([]);
    setStudentAntiCheatEvents([]);
    setCurrentView('quiz-active');
  };

  const handleFinishQuiz = (answers: StudentAnswer[], antiCheatEvents: AntiCheatEvent[]) => {
    setStudentAnswers(answers);
    setStudentAntiCheatEvents(antiCheatEvents);

    // Persist score result record
    if (currentSession) {
      const score = calculateQuizScore(currentSession.questions, answers);
      const submissionRecord: UserSubmissionRecord = {
        id: `sub-${Date.now()}`,
        sessionId: currentSession.quizId,
        quizTitle: currentSession.quizTitle,
        sectionName: currentSession.sectionName,
        setName: currentSession.setName,
        studentId: user?.id || currentStudent?.id || `guest-${Date.now()}`,
        studentName: user?.fullName || currentStudent?.name || 'Candidate',
        score,
        answers,
        antiCheatEvents,
        submittedAt: Date.now(),
      };
      saveMockSubmission(submissionRecord);
    }

    setCurrentView('quiz-results');
  };

  const handleViewSubmissionReview = (record: UserSubmissionRecord) => {
    const defaultSet = syllabusSections[0].sets[0];
    const matchedSession: QuizSessionConfig = {
      quizId: record.sessionId,
      quizTitle: record.quizTitle,
      sectionName: record.sectionName,
      setName: record.setName,
      joinCode: 'REVIEW',
      totalQuestions: record.score.totalQuestions,
      timePerQuestion: 20,
      negativeMarkingEnabled: true,
      questions: defaultSet.questions,
      createdAt: record.submittedAt,
      status: 'completed',
    };
    setCurrentSession(matchedSession);
    setStudentAnswers(record.answers);
    setStudentAntiCheatEvents(record.antiCheatEvents);
    setCurrentView('quiz-results');
  };

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-fg flex flex-col selection:bg-editorial-accent/20 selection:text-editorial-fg font-sans transition-colors duration-200">
      {/* HEADER WITH INTEGRATED PROFILE DROPDOWN */}
      <Header
        onNavigate={handleNavigate}
        onGoLanding={() => setCurrentView('landing')}
        onOpenAuthModal={(tab) => openAuthModal(tab || 'signin')}
        onOpenProfileModal={() => setProfileModalOpen(true)}
        activeQuizCode={
          currentView === 'teacher-live-room' ||
          currentView === 'student-waiting-room' ||
          currentView === 'quiz-active'
            ? currentSession?.joinCode
            : undefined
        }
        isQuizActive={currentView === 'quiz-active'}
      />

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-1 pb-12">
        {/* 1. LANDING PAGE VIEW */}
        {currentView === 'landing' && (
          <LandingPage
            onStartTeacher={() => handleNavigate('teacher-dashboard')}
            onStartStudent={() => handleNavigate('student-dashboard')}
            onStartPractice={() => handleStartSoloPractice(0, 0)}
            onCreateQuiz={handleStartCreateQuiz}
            onOpenAnalytics={() => handleNavigate(isAdmin ? 'admin-analytics' : isTeacher ? 'teacher-analytics' : 'student-analytics')}
            onRequireAuth={(tab, role) => openAuthModal(tab, role)}
            activeSessionsCount={activeSessions.length}
          />
        )}

        {/* 2. ADMIN GOVERNANCE DASHBOARD */}
        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            activeSessions={activeSessions}
            onExploreTeacherView={() => setCurrentView('teacher-dashboard')}
            onExploreStudentView={() => setCurrentView('student-dashboard')}
            onOpenAnalytics={() => setCurrentView('admin-analytics')}
          />
        )}

        {/* 3. ADMIN PLATFORM ANALYTICS */}
        {currentView === 'admin-analytics' && (
          <AdminAnalyticsView
            activeSessions={activeSessions}
            onBackToConsole={() => setCurrentView('admin-dashboard')}
          />
        )}

        {/* 4. TEACHER PENDING APPROVAL SCREEN */}
        {currentView === 'teacher-pending' && (
          <PendingApprovalScreen
            onStudentPortal={() => setCurrentView('student-dashboard')}
          />
        )}

        {/* 5. TEACHER INSTRUCTOR CONSOLE */}
        {currentView === 'teacher-dashboard' && (
          <TeacherDashboard
            activeSessions={activeSessions}
            onCreateNewQuiz={handleStartCreateQuiz}
            onExploreSet={handleExploreSet}
            onQuickStartSet={handleQuickStartSet}
            onOpenStudentAnalytics={() => setCurrentView('teacher-analytics')}
            onSelectActiveSession={(session) => {
              setCurrentSession(session);
              setCurrentView('teacher-live-room');
            }}
          />
        )}

        {/* 6. TEACHER STUDENT ANALYTICS & DOSSIER */}
        {currentView === 'teacher-analytics' && (
          <TeacherAnalyticsView
            onBackToDashboard={() => setCurrentView('teacher-dashboard')}
            onViewScorecard={handleViewSubmissionReview}
          />
        )}

        {currentView === 'quiz-creator' && (
          <QuizCreator
            initialSet={initialSetForCreator}
            onProceedToReview={handleProceedToReview}
            onCancel={() => setCurrentView('teacher-dashboard')}
          />
        )}

        {currentView === 'question-reviewer' && reviewDraftConfig && (
          <QuestionReviewer
            quizTitle={reviewDraftConfig.quizTitle}
            sectionName={reviewDraftConfig.sectionName}
            setName={reviewDraftConfig.setName}
            timePerQuestion={reviewDraftConfig.timePerQuestion}
            negativeMarkingEnabled={reviewDraftConfig.negativeMarkingEnabled}
            initialQuestions={reviewDraftConfig.questions}
            onPublishQuiz={handlePublishQuiz}
            onBack={() => setCurrentView('quiz-creator')}
          />
        )}

        {currentView === 'teacher-live-room' && currentSession && (
          <TeacherLiveRoom
            session={currentSession}
            onStartQuizSession={() => {}}
            onOpenStudentTab={() => handleNavigate('student-dashboard')}
            onFinishSession={() => setCurrentView('teacher-dashboard')}
          />
        )}

        {/* 7. STUDENT DEDICATED DASHBOARD */}
        {currentView === 'student-dashboard' && (
          <StudentDashboard
            activeSessions={activeSessions}
            onJoinLivePin={(pin) => {
              handleStudentJoinSuccess({
                quizCode: pin,
                studentName: user?.fullName || 'Candidate',
                studentId: user?.id || `stu-${Date.now()}`,
              });
            }}
            onStartSoloPractice={handleStartSoloPractice}
            onViewSubmissionReview={handleViewSubmissionReview}
            onOpenAnalytics={() => setCurrentView('student-analytics')}
          />
        )}

        {/* 8. STUDENT PERSONAL PERFORMANCE ANALYTICS */}
        {currentView === 'student-analytics' && (
          <StudentAnalyticsView
            onBackToDashboard={() => setCurrentView('student-dashboard')}
            onViewScorecard={handleViewSubmissionReview}
          />
        )}

        {/* 9. STUDENT PIN JOIN FORM */}
        {currentView === 'student-join' && (
          <StudentJoin
            activeSessions={activeSessions}
            onJoinSuccess={handleStudentJoinSuccess}
            onPracticeMode={() => handleStartSoloPractice(0, 0)}
          />
        )}

        {/* 10. STUDENT WAITING ROOM */}
        {currentView === 'student-waiting-room' && currentSession && currentStudent && (
          <StudentWaitingRoom
            session={currentSession}
            student={currentStudent}
            onQuizStart={handleStartActiveQuiz}
            onExit={() => setCurrentView('student-dashboard')}
          />
        )}

        {/* 11. ACTIVE PROCTORED QUIZ SCREEN */}
        {currentView === 'quiz-active' && currentSession && (
          <QuizScreen
            quizTitle={currentSession.quizTitle}
            quizCode={currentSession.joinCode}
            studentId={currentStudent?.id}
            questions={currentSession.questions}
            timePerQuestion={currentSession.timePerQuestion}
            onFinishQuiz={handleFinishQuiz}
            onAbortQuiz={() => setCurrentView(isStudent ? 'student-dashboard' : 'teacher-dashboard')}
          />
        )}

        {/* 12. PERFORMANCE SCORECARD & RESULTS */}
        {currentView === 'quiz-results' && currentSession && (
          <ResultsScreen
            quizTitle={currentSession.quizTitle}
            studentName={user?.fullName || currentStudent?.name || 'Examinee'}
            questions={currentSession.questions}
            answers={studentAnswers}
            antiCheatEvents={studentAntiCheatEvents}
            onOpenReview={() => setCurrentView('quiz-review')}
            onRetakeQuiz={() => {
              setStudentAnswers([]);
              setStudentAntiCheatEvents([]);
              setCurrentView('quiz-active');
            }}
            onBackToDashboard={() => setCurrentView(isStudent ? 'student-dashboard' : 'teacher-dashboard')}
          />
        )}

        {/* 13. EDITORIAL CODE REVIEW SCREEN */}
        {currentView === 'quiz-review' && currentSession && (
          <ReviewScreen
            quizTitle={currentSession.quizTitle}
            questions={currentSession.questions}
            answers={studentAnswers}
            onBackToResults={() => setCurrentView('quiz-results')}
          />
        )}
      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="py-8 border-t border-editorial-border bg-editorial-bg text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <PyQuizLogo size="xs" variant="badge" />
            <span className="font-serif text-base font-bold tracking-tight text-editorial-fg">
              PyQuiz
            </span>
            <span className="text-xs text-editorial-muted-fg">•</span>
            <span className="italic font-serif text-xs text-editorial-accent">
              "Unlocking Deep Python Mastery Through Live Quizzing"
            </span>
          </div>

          <div className="text-[11px] font-mono text-editorial-muted-fg">
            © {new Date().getFullYear()} PyQuiz • Academic & Competitive Python Evaluation Protocol
          </div>
        </div>
      </footer>

      {/* GLOBAL AUTHENTICATION MODAL */}
      <AuthModal
        isOpen={authModalConfig.isOpen}
        defaultTab={authModalConfig.defaultTab}
        intendedRole={authModalConfig.intendedRole}
        onClose={closeAuthModal}
        onAuthSuccess={() => {
          closeAuthModal();
        }}
      />

      {/* GLOBAL USER PROFILE MODAL */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* GLOBAL DEVELOPER CREDIT WIDGET */}
      <DevCreditWidget />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
};

export default App;
