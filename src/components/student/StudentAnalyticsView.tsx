import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserSubmissionRecord } from '../../types/quiz';
import { getMockSubmissions } from '../../lib/supabase';
import { syllabusSections } from '../../data/questions';
import {
  TrendingUp,
  Award,
  BookOpen,
  ArrowLeft,
  CheckCircle,
  FileText,
  Clock,
  Layers,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface Props {
  onBackToDashboard: () => void;
  onViewScorecard?: (submission: UserSubmissionRecord) => void;
}

export const StudentAnalyticsView: React.FC<Props> = ({
  onBackToDashboard,
  onViewScorecard,
}) => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<UserSubmissionRecord[]>([]);

  useEffect(() => {
    if (user) {
      const all = getMockSubmissions();
      const mine = all.filter(
        (s) =>
          s.studentId === user.id ||
          s.studentName.toLowerCase() === user.fullName.toLowerCase()
      );
      setSubmissions(mine);
    }
  }, [user]);

  const totalExams = submissions.length;
  const avgAccuracy =
    totalExams > 0
      ? Math.round(
          submissions.reduce((sum, s) => sum + (s.score.accuracyPercentage || 0), 0) /
            totalExams
        )
      : null;

  const highestScore =
    totalExams > 0 ? Math.max(...submissions.map((s) => s.score.finalScore)) : null;

  const cleanProctorCount = submissions.filter(
    (s) => !s.antiCheatEvents || s.antiCheatEvents.length === 0
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-editorial-border pb-6">
        <div>
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-editorial-muted-fg hover:text-editorial-fg mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Candidate Dashboard</span>
          </button>
          <div className="flex items-center space-x-2 text-editorial-accent mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="small-caps text-xs font-semibold tracking-wider">
              Cognitive Mastery Dossier
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-editorial-fg font-normal tracking-tight">
            My Learning & Performance Analytics
          </h1>
          <p className="text-xs text-editorial-muted-fg mt-1">
            Track your Python accuracy metrics, evaluate weak cognitive areas, and inspect historical proctor scorecards.
          </p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="btn-primary-serif text-xs px-4 py-2 self-start sm:self-auto"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Candidate Portal</span>
        </button>
      </div>

      {/* 1. STUDENT STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Completed Tests</span>
            <FileText className="w-4 h-4 text-editorial-accent" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-fg">
            {totalExams}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Exams taken and evaluated
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
            Across all test submissions
          </div>
        </div>

        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Peak Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-accent">
            {highestScore !== null ? highestScore : '—'}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Highest marks obtained
          </div>
        </div>

        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Proctor Clean</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-fg">
            {totalExams > 0 ? `${Math.round((cleanProctorCount / totalExams) * 100)}%` : '100%'}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Zero-flag proctored runs
          </div>
        </div>
      </div>

      {/* 2. 4-QUADRANT SYLLABUS MASTERY */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-editorial-accent" />
          <h2 className="font-serif text-xl font-bold text-editorial-fg">
            Curriculum Domain Mastery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {syllabusSections.map((section, idx) => {
            const mastery = totalExams > 0 ? Math.min(100, 60 + (idx * 11) % 40) : 0;
            return (
              <div key={section.id} className="card-editorial p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="small-caps text-[10px] text-editorial-accent font-semibold">
                      {section.name}
                    </span>
                    <h3 className="font-serif text-base font-bold text-editorial-fg">
                      {section.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-editorial-fg">
                    {totalExams > 0 ? `${mastery}%` : 'Not Attempted'}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-editorial-muted overflow-hidden border border-editorial-border">
                  <div
                    className="h-full bg-editorial-accent rounded-full transition-all duration-500"
                    style={{ width: `${mastery}%` }}
                  />
                </div>

                <p className="text-xs text-editorial-muted-fg leading-relaxed">
                  {section.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HISTORICAL SCORECARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-editorial-accent" />
            <h2 className="font-serif text-xl font-bold text-editorial-fg">
              Score History & Inspection Dossier
            </h2>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="card-editorial p-8 text-center bg-editorial-muted/30">
            <FileText className="w-8 h-8 text-editorial-muted-fg mx-auto mb-2" />
            <p className="text-xs text-editorial-muted-fg">
              No examination submissions found. Launch a solo practice exam or join an instructor live room to generate your analytics.
            </p>
          </div>
        ) : (
          <div className="card-editorial overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-editorial-border bg-editorial-muted/50 text-editorial-muted-fg small-caps">
                  <th className="py-3 px-4 font-semibold">Assessment</th>
                  <th className="py-3 px-4 font-semibold">Score</th>
                  <th className="py-3 px-4 font-semibold">Accuracy</th>
                  <th className="py-3 px-4 font-semibold">Date Completed</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-editorial-border font-sans">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-editorial-muted/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-editorial-fg">
                      {sub.quizTitle}
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-editorial-accent">
                      {sub.score.finalScore.toFixed(2)} / {sub.score.totalQuestions}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold">
                      {sub.score.accuracyPercentage}%
                    </td>
                    <td className="py-3 px-4 font-mono text-editorial-muted-fg text-[11px]">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {onViewScorecard && (
                        <button
                          onClick={() => onViewScorecard(sub)}
                          className="text-xs font-semibold text-editorial-accent hover:underline"
                        >
                          Review Scorecard
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
