import React, { useState, useEffect } from 'react';
import { UserRole, QuizSessionConfig, StudentProfile, StudentAnswer, AntiCheatEvent } from './types/quiz';
import { Question, QuizSet } from './data/questions/types';
import { syllabusSections, getQuizSetById, generateCustomQuiz } from './data/questions';
import { syncManager } from './utils/broadcast';
import { Header } from './components/common/Header';
import { DevCreditWidget } from './components/common/DevCreditWidget';

// Landing Page view
import { LandingPage } from './components/landing/LandingPage';

// Teacher views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { QuizCreator } from './components/teacher/QuizCreator';
import { QuestionReviewer } from './components/teacher/QuestionReviewer';
import { TeacherLiveRoom } from './components/teacher/TeacherLiveRoom';

// Student views
import { StudentJoin } from './components/student/StudentJoin';
import { StudentWaitingRoom } from './components/student/StudentWaitingRoom';

// Quiz views
import { QuizScreen } from './components/quiz/QuizScreen';
import { ResultsScreen } from './components/quiz/ResultsScreen';
import { ReviewScreen } from './components/quiz/ReviewScreen';

export const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('teacher');
  const [currentView, setCurrentView] = useState<
    | 'landing'
    | 'teacher-dashboard'
    | 'quiz-creator'
    | 'question-reviewer'
    | 'teacher-live-room'
    | 'student-join'
    | 'student-waiting-room'
    | 'quiz-active'
    | 'quiz-results'
    | 'quiz-review'
  >('landing');

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

  useEffect(() => {
    try {
      localStorage.setItem('pyquiz_active_sessions', JSON.stringify(activeSessions));
    } catch {
      // ignore
    }
  }, [activeSessions]);

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

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'teacher') {
      setCurrentView('teacher-dashboard');
    } else if (newRole === 'student') {
      setCurrentView('student-join');
    } else if (newRole === 'practice') {
      const set = syllabusSections[1].sets[0]; // Module 2: STL in Python
      const practiceSession: QuizSessionConfig = {
        quizId: `practice-${Date.now()}`,
        quizTitle: 'Python STL & Collections Practice Exam',
        sectionName: set.sectionName,
        setName: set.setName,
        joinCode: 'PRACTICE',
        totalQuestions: 30,
        timePerQuestion: 20,
        negativeMarkingEnabled: true,
        questions: set.questions,
        createdAt: Date.now(),
        status: 'active',
      };
      setCurrentSession(practiceSession);
      setCurrentStudent({
        id: `self-${Date.now()}`,
        name: 'Practice Candidate',
        joinedAt: Date.now(),
        currentQuestionIndex: 0,
        answers: [],
        antiCheatEvents: [],
        isCompleted: false,
      });
      setCurrentView('quiz-active');
    }
  };

  const handleStartCreateQuiz = () => {
    setInitialSetForCreator(null);
    setRole('teacher');
    setCurrentView('quiz-creator');
  };

  const handleExploreSet = (quizSet: QuizSet) => {
    setInitialSetForCreator(quizSet);
    setRole('teacher');
    setCurrentView('quiz-creator');
  };

  const handleQuickStartSet = (quizSet: QuizSet) => {
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
    setRole('teacher');
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
    setRole('teacher');
    setCurrentView('teacher-live-room');
  };

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
      id: `stu-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
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
    setCurrentView('quiz-results');
  };

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-fg flex flex-col selection:bg-editorial-accent/20 selection:text-editorial-fg font-sans transition-colors duration-200">
      <Header
        currentRole={currentView === 'landing' ? 'landing' : role}
        onRoleChange={handleRoleChange}
        onGoLanding={() => setCurrentView('landing')}
        activeQuizCode={
          currentView === 'teacher-live-room' ||
          currentView === 'student-waiting-room' ||
          currentView === 'quiz-active'
            ? currentSession?.joinCode
            : undefined
        }
        isQuizActive={currentView === 'quiz-active'}
      />

      <main className="flex-1 pb-12">
        {/* LANDING PAGE VIEW */}
        {currentView === 'landing' && (
          <LandingPage
            onStartTeacher={() => {
              setRole('teacher');
              setCurrentView('teacher-dashboard');
            }}
            onStartStudent={() => {
              setRole('student');
              setCurrentView('student-join');
            }}
            onStartPractice={() => handleRoleChange('practice')}
            onCreateQuiz={handleStartCreateQuiz}
            activeSessionsCount={activeSessions.length}
          />
        )}

        {/* TEACHER VIEWS */}
        {currentView === 'teacher-dashboard' && (
          <TeacherDashboard
            activeSessions={activeSessions}
            onCreateNewQuiz={handleStartCreateQuiz}
            onExploreSet={handleExploreSet}
            onQuickStartSet={handleQuickStartSet}
            onSelectActiveSession={(session) => {
              setCurrentSession(session);
              setCurrentView('teacher-live-room');
            }}
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
            onOpenStudentTab={() => handleRoleChange('student')}
            onFinishSession={() => setCurrentView('teacher-dashboard')}
          />
        )}

        {/* STUDENT VIEWS */}
        {currentView === 'student-join' && (
          <StudentJoin
            activeSessions={activeSessions}
            onJoinSuccess={handleStudentJoinSuccess}
            onPracticeMode={() => handleRoleChange('practice')}
          />
        )}

        {currentView === 'student-waiting-room' && currentSession && currentStudent && (
          <StudentWaitingRoom
            session={currentSession}
            student={currentStudent}
            onQuizStart={handleStartActiveQuiz}
            onExit={() => setCurrentView('student-join')}
          />
        )}

        {/* ACTIVE QUIZ SCREEN */}
        {currentView === 'quiz-active' && currentSession && (
          <QuizScreen
            quizTitle={currentSession.quizTitle}
            quizCode={currentSession.joinCode}
            studentId={currentStudent?.id}
            questions={currentSession.questions}
            timePerQuestion={currentSession.timePerQuestion}
            onFinishQuiz={handleFinishQuiz}
            onAbortQuiz={() => setCurrentView('teacher-dashboard')}
          />
        )}

        {/* RESULTS SCREEN */}
        {currentView === 'quiz-results' && currentSession && (
          <ResultsScreen
            quizTitle={currentSession.quizTitle}
            studentName={currentStudent?.name || 'Examinee'}
            questions={currentSession.questions}
            answers={studentAnswers}
            antiCheatEvents={studentAntiCheatEvents}
            onOpenReview={() => setCurrentView('quiz-review')}
            onRetakeQuiz={() => {
              setStudentAnswers([]);
              setStudentAntiCheatEvents([]);
              setCurrentView('quiz-active');
            }}
            onBackToDashboard={() => setCurrentView('teacher-dashboard')}
          />
        )}

        {/* QUESTION-BY-QUESTION REVIEW SCREEN */}
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
            <div className="w-6 h-6 rounded bg-editorial-accent flex items-center justify-center font-serif font-black text-xs text-editorial-bg">
              Ψ
            </div>
            <span className="font-serif text-base font-bold tracking-tight text-editorial-fg">
              PyQuiz
            </span>
            <span className="text-xs text-editorial-muted-fg">•</span>
            <span className="italic font-serif text-xs text-editorial-accent">
              "Unlocking Deep Python Mastery Through Live Quizzing"
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-editorial-muted-fg">
            <button
              onClick={() => setCurrentView('landing')}
              className="hover:text-editorial-fg transition-colors"
            >
              Overview
            </button>
            <span>•</span>
            <button
              onClick={() => handleRoleChange('teacher')}
              className="hover:text-editorial-fg transition-colors"
            >
              Instructor
            </button>
            <span>•</span>
            <button
              onClick={() => handleRoleChange('student')}
              className="hover:text-editorial-fg transition-colors"
            >
              Candidate
            </button>
            <span>•</span>
            <button
              onClick={() => handleRoleChange('practice')}
              className="hover:text-editorial-fg transition-colors"
            >
              Practice
            </button>
          </div>
        </div>
        <div className="mt-4 text-[10px] small-caps text-editorial-muted-fg">
          © {new Date().getFullYear()} PyQuiz • Academic & Competitive Python Evaluation Protocol
        </div>
      </footer>

      {/* GLOBAL DEVELOPER CREDIT WIDGET */}
      <DevCreditWidget />
    </div>
  );
};

export default App;

