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
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');

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
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="small-caps text-xs font-semibold tracking-wider">
              Candidate Academic Portal
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-editorial-fg font-normal tracking-tight">
            Welcome, {user?.fullName || 'Candidate'}
          </h1>
          <p className="text-xs text-editorial-muted-fg mt-1">
            Access proctored live rooms, curriculum practice sets, and review your performance history.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          {onOpenAnalytics && (
            <button
              onClick={onOpenAnalytics}
              className="btn-secondary-serif text-xs py-2 px-3.5 flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <TrendingUp className="w-3.5 h-3.5 text-editorial-accent" />
              <span>My Analytics</span>
            </button>
          )}

          {/* Quick PIN Join Bar */}
          <form
            onSubmit={handleJoinPin}
            className="flex items-center space-x-2 p-1.5 bg-editorial-muted/80 border border-editorial-border rounded-lg shadow-xs w-full sm:w-auto"
          >
            <Activity className="w-4 h-4 text-editorial-accent ml-2 shrink-0 animate-pulse" />
            <input
              type="text"
              value={pinCode}
              onChange={(e) => {
                setPinCode(e.target.value.toUpperCase());
                setPinError(null);
              }}
              placeholder="ENTER PIN"
              maxLength={10}
              className="flex-1 sm:w-32 px-2.5 py-1.5 bg-editorial-bg border border-editorial-border rounded text-xs font-mono font-bold tracking-widest text-editorial-fg focus:outline-none focus:border-editorial-accent uppercase placeholder:text-editorial-muted-fg text-center sm:text-left"
            />
            <button
              type="submit"
              className="btn-primary-serif text-xs py-1.5 px-3.5 shadow-sm whitespace-nowrap"
            >
              Join Room
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="card-editorial p-3.5 sm:p-5">
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

      {/* 4. CURRICULUM PRACTICE MODULES (4 QUADRANTS, 3 SETS EACH = 12 SETS TOTAL) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-editorial-border pb-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-editorial-accent" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-editorial-fg">
              Standardized Curriculum Sets
            </h2>
          </div>
          <span className="text-xs text-editorial-muted-fg font-mono">
            4 Modules • 3 Sets Each (12 Practice Exams • 360 Questions)
          </span>
        </div>

        {/* Module Filter Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar touch-scroll flex-nowrap shrink-0 scroll-smooth">
          <button
            type="button"
            onClick={() => setSelectedModuleFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
              selectedModuleFilter === 'all'
                ? 'bg-editorial-fg text-editorial-bg shadow-sm font-semibold'
                : 'bg-editorial-muted text-editorial-muted-fg hover:text-editorial-fg hover:bg-editorial-border/60 border border-editorial-border'
            }`}
          >
            All Modules (12 Sets)
          </button>
          {syllabusSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setSelectedModuleFilter(section.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                selectedModuleFilter === section.id
                  ? 'bg-editorial-accent text-editorial-bg shadow-sm font-semibold'
                  : 'bg-editorial-muted text-editorial-muted-fg hover:text-editorial-fg hover:bg-editorial-border/60 border border-editorial-border'
              }`}
            >
              {section.name}: {section.title}
            </button>
          ))}
        </div>

        {/* Modules & Sets List */}
        <div className="space-y-6 sm:space-y-8">
          {syllabusSections
            .map((section, secIdx) => ({ section, secIdx }))
            .filter(
              ({ section }) =>
                selectedModuleFilter === 'all' || selectedModuleFilter === section.id
            )
            .map(({ section, secIdx }) => (
              <div
                key={section.id}
                className="card-editorial p-4 sm:p-6 space-y-4 sm:space-y-5 border border-editorial-border bg-editorial-card shadow-sm rounded-xl"
              >
                {/* Module Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-editorial-border/60">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="small-caps text-[11px] text-editorial-accent font-bold tracking-wider">
                        {section.name}
                      </span>
                      <span className="text-editorial-muted-fg text-xs">•</span>
                      <span className="text-xs font-mono text-editorial-muted-fg">
                        3 Sets • 90 Questions Total
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-editorial-fg mt-0.5">
                      {section.title}
                    </h3>
                    <p className="text-xs text-editorial-muted-fg mt-1 leading-relaxed max-w-3xl">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* 3 Sets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.sets.map((set, setIdx) => (
                    <div
                      key={set.id}
                      className="p-4 rounded-lg border border-editorial-border bg-editorial-muted/50 hover:bg-editorial-card hover:border-editorial-accent/60 transition-all flex flex-col justify-between space-y-4 group shadow-xs hover:shadow-md"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-editorial-accent/15 text-editorial-accent border border-editorial-accent/30 uppercase tracking-wider">
                            {set.setName}
                          </span>
                          <span className="text-[11px] font-mono text-editorial-muted-fg">
                            {set.questions.length} Qs
                          </span>
                        </div>

                        <p className="text-xs font-medium text-editorial-fg leading-snug group-hover:text-editorial-accent transition-colors line-clamp-3">
                          {set.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-editorial-border/60 space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-mono text-editorial-muted-fg">
                          <span>20s / Question</span>
                          <span>Neg: -0.25</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onStartSoloPractice(secIdx, setIdx)}
                          className="w-full btn-primary-serif text-xs py-2 px-3 flex items-center justify-center space-x-1.5 shadow-sm group-hover:bg-editorial-accent group-hover:text-editorial-bg"
                        >
                          <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                          <span>Launch {set.setName}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
