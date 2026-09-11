import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { QuizSessionConfig, UserSubmissionRecord } from '../../types/quiz';
import { syllabusSections } from '../../data/questions';
import { getMockSubmissions } from '../../lib/supabase';
import {
  BookOpen,
  Play,
  Activity,
  Award,
  Clock,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  FileText,
  Sparkles,
} from 'lucide-react';

interface Props {
  activeSessions: QuizSessionConfig[];
  onJoinLivePin: (pin: string) => void;
  onStartSoloPractice: (sectionIndex: number, setIndex: number) => void;
  onViewSubmissionReview?: (submission: UserSubmissionRecord) => void;
  onOpenAnalytics?: () => void;
}

export const StudentDashboard: React.FC<Props> = ({
  activeSessions,
  onJoinLivePin,
  onStartSoloPractice,
  onViewSubmissionReview,
  onOpenAnalytics,
}) => {
  const { user } = useAuth();
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [mySubmissions, setMySubmissions] = useState<UserSubmissionRecord[]>([]);

  useEffect(() => {
    if (user) {
      const allSubmissions = getMockSubmissions();
      const mine = allSubmissions.filter(
        (s) =>
          s.studentId === user.id ||
          s.studentName.toLowerCase() === user.fullName.toLowerCase()
      );
      setMySubmissions(mine);
    }
  }, [user]);

  const handleJoinPin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    if (!pinCode.trim()) {
      setPinError('Please enter a valid Quiz PIN.');
      return;
    }
    onJoinLivePin(pinCode.trim().toUpperCase());
  };

  // Performance calculations
  const totalCompleted = mySubmissions.length;
  const avgAccuracy =
    totalCompleted > 0
      ? Math.round(
          mySubmissions.reduce((sum, s) => sum + (s.score.accuracyPercentage || 0), 0) /
            totalCompleted
        )
      : null;
  const highestScore =
    totalCompleted > 0
      ? Math.max(...mySubmissions.map((s) => s.score.finalScore))
      : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. CANDIDATE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-editorial-border pb-6">
        <div>
          <div className="flex items-center space-x-2 text-editorial-accent mb-1">
            <BookOpen className="w-4 h-4" />
            <span className="small-caps text-xs font-semibold tracking-wider">
              Candidate Academic Portal
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-editorial-fg font-normal tracking-tight">
            Welcome, {user?.fullName || 'Candidate'}
          </h1>
          <p className="text-xs text-editorial-muted-fg mt-1">
            Access proctored live rooms, curriculum practice sets, and review your performance history.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onOpenAnalytics && (
            <button
              onClick={onOpenAnalytics}
              className="btn-secondary-serif text-xs py-2 px-3.5 flex items-center space-x-1.5 shadow-xs"
            >
              <TrendingUp className="w-3.5 h-3.5 text-editorial-accent" />
              <span>My Analytics</span>
            </button>
          )}

          {/* Quick PIN Join Bar */}
          <form
            onSubmit={handleJoinPin}
            className="flex items-center space-x-2 p-1.5 bg-editorial-muted/80 border border-editorial-border rounded-lg shadow-sm"
          >
            <Activity className="w-4 h-4 text-editorial-accent ml-2 shrink-0 animate-pulse" />
            <input
              type="text"
              value={pinCode}
              onChange={(e) => {
                setPinCode(e.target.value.toUpperCase());
                setPinError(null);
              }}
              placeholder="ENTER QUIZ PIN"
              maxLength={10}
              className="w-36 px-2.5 py-1.5 bg-editorial-bg border border-editorial-border rounded text-xs font-mono font-bold tracking-widest text-editorial-fg focus:outline-none focus:border-editorial-accent uppercase placeholder:text-editorial-muted-fg"
            />
            <button
              type="submit"
              className="btn-primary-serif text-xs py-1.5 px-3.5 shadow-sm whitespace-nowrap"
            >
              Join Live Room
            </button>
          </form>
        </div>
      </div>

      {pinError && (
        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{pinError}</span>
        </div>
      )}

      {/* 2. CANDIDATE METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Completed Exams</span>
            <FileText className="w-4 h-4 text-editorial-accent" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-fg">
            {totalCompleted}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Standardized evaluation runs
          </div>
        </div>

        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Mean Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-fg">
            {avgAccuracy !== null ? `${avgAccuracy}%` : '—'}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Across all syllabus domains
          </div>
        </div>

        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Highest Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-accent">
            {highestScore !== null ? highestScore : '—'}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Max achieved in single exam
          </div>
        </div>

        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Active Broadcasts</span>
            <Activity className="w-4 h-4 text-editorial-accent animate-pulse" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-fg">
            {activeSessions.length}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Live instructor sessions available
          </div>
        </div>
      </div>

      {/* 3. ACTIVE LIVE QUIZZES IN PROGRESS */}
      {activeSessions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <h2 className="font-serif text-xl font-bold text-editorial-fg">
                Live Broadcast Rooms Available
              </h2>
            </div>
            <span className="text-xs font-mono text-editorial-muted-fg">
              {activeSessions.length} Active Session(s)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSessions.map((session) => (
              <div
                key={session.quizId}
                className="card-editorial p-5 border-l-4 border-l-editorial-accent flex items-center justify-between shadow-sm bg-editorial-card"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      LIVE
                    </span>
                    <span className="font-mono text-xs font-semibold text-editorial-fg">
                      PIN: {session.joinCode}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-editorial-fg mt-1">
                    {session.quizTitle}
                  </h3>
                  <p className="text-xs text-editorial-muted-fg">
                    {session.totalQuestions} Questions • {session.timePerQuestion}s Timer
                  </p>
                </div>

                <button
                  onClick={() => onJoinLivePin(session.joinCode)}
                  className="btn-primary-serif text-xs py-2 px-4 flex items-center space-x-1.5"
                >
                  <span>Connect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. CURRICULUM PRACTICE MODULES (4 QUADRANTS) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-editorial-accent" />
            <h2 className="font-serif text-xl font-bold text-editorial-fg">
              Standardized Curriculum Quadrants
            </h2>
          </div>
          <span className="text-xs text-editorial-muted-fg font-serif italic">
            Proctored Solo Practice Exams (30 Questions Each)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {syllabusSections.map((section, secIdx) => {
            const firstSet = section.sets[0];
            return (
              <div
                key={section.id}
                className="card-editorial p-6 space-y-4 hover:border-editorial-accent/60 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="small-caps text-[10px] text-editorial-accent font-semibold block mb-1">
                      {section.name}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-editorial-fg group-hover:text-editorial-accent transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <span className="px-2 py-1 rounded text-[10px] font-mono bg-editorial-muted border border-editorial-border text-editorial-muted-fg">
                    30 Questions
                  </span>
                </div>

                <p className="text-xs text-editorial-muted-fg leading-relaxed">
                  {section.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-editorial-border">
                  <span className="text-[11px] font-mono text-editorial-muted-fg">
                    Negative Marking: <strong className="text-editorial-fg">-0.25</strong>
                  </span>

                  <button
                    onClick={() => onStartSoloPractice(secIdx, 0)}
                    className="btn-primary-serif text-xs py-1.5 px-4 flex items-center space-x-1.5 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Exam</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PAST EXAM RECORD & SCORECARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-editorial-accent" />
            <h2 className="font-serif text-xl font-bold text-editorial-fg">
              Recent Exam History & Scorecards
            </h2>
          </div>
          <span className="text-xs font-mono text-editorial-muted-fg">
            {mySubmissions.length} Submissions Logged
          </span>
        </div>

        {mySubmissions.length === 0 ? (
          <div className="card-editorial p-8 text-center bg-editorial-muted/30">
            <FileText className="w-8 h-8 text-editorial-muted-fg mx-auto mb-2" />
            <h3 className="font-serif text-base font-bold text-editorial-fg">
              No Past Exam Records Yet
            </h3>
            <p className="text-xs text-editorial-muted-fg mt-1 max-w-sm mx-auto">
              Launch a practice exam above or join a live room with a PIN code to build your academic score dossier.
            </p>
          </div>
        ) : (
          <div className="card-editorial overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-editorial-border bg-editorial-muted/50 text-editorial-muted-fg small-caps">
                    <th className="py-3 px-4 font-semibold">Exam Title</th>
                    <th className="py-3 px-4 font-semibold">Date Completed</th>
                    <th className="py-3 px-4 font-semibold">Correct / Total</th>
                    <th className="py-3 px-4 font-semibold">Final Score</th>
                    <th className="py-3 px-4 font-semibold">Accuracy</th>
                    <th className="py-3 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-editorial-border font-sans">
                  {mySubmissions.map((record) => (
                    <tr key={record.id} className="hover:bg-editorial-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-editorial-fg">{record.quizTitle}</div>
                        {record.sectionName && (
                          <div className="text-[11px] text-editorial-muted-fg">
                            {record.sectionName}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 font-mono text-editorial-muted-fg">
                        {new Date(record.submittedAt).toLocaleDateString()} at{' '}
                        {new Date(record.submittedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td className="py-3 px-4 font-mono text-editorial-fg">
                        {record.score.correctCount} / {record.score.totalQuestions}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-serif font-bold text-sm text-editorial-accent">
                          {record.score.finalScore.toFixed(2)}
                        </span>
                        {record.score.penaltyDeductions > 0 && (
                          <span className="ml-1 text-[10px] text-red-500 font-mono">
                            (-{record.score.penaltyDeductions})
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold font-mono ${
                            record.score.accuracyPercentage >= 75
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : record.score.accuracyPercentage >= 50
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-red-500'
                          }`}
                        >
                          {record.score.accuracyPercentage}%
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {onViewSubmissionReview && (
                          <button
                            onClick={() => onViewSubmissionReview(record)}
                            className="text-xs font-semibold text-editorial-accent hover:underline"
                          >
                            Review
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
