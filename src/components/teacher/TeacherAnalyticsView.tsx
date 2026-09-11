import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserSubmissionRecord } from '../../types/quiz';
import { getMockSubmissions } from '../../lib/supabase';
import { syllabusSections } from '../../data/questions';
import {
  TrendingUp,
  Search,
  Users,
  Award,
  AlertTriangle,
  CheckCircle,
  FileText,
  ArrowLeft,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface Props {
  onBackToDashboard: () => void;
  onViewScorecard?: (submission: UserSubmissionRecord) => void;
}

export const TeacherAnalyticsView: React.FC<Props> = ({
  onBackToDashboard,
  onViewScorecard,
}) => {
  const [submissions, setSubmissions] = useState<UserSubmissionRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const all = getMockSubmissions();
    setSubmissions(all);
  }, []);

  const filtered = submissions.filter(
    (s) =>
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.quizTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAssessed = submissions.length;
  const avgAccuracy =
    totalAssessed > 0
      ? Math.round(
          submissions.reduce((sum, s) => sum + (s.score.accuracyPercentage || 0), 0) /
            totalAssessed
        )
      : null;

  const totalPenalizedExams = submissions.filter((s) => s.score.penaltyDeductions > 0).length;

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
            <span>Return to Instructor Dashboard</span>
          </button>
          <div className="flex items-center space-x-2 text-editorial-accent mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="small-caps text-xs font-semibold tracking-wider">
              Instructor Assessment Dossier
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-editorial-fg font-normal tracking-tight">
            Student Performance & Analytics
          </h1>
          <p className="text-xs text-editorial-muted-fg mt-1">
            Review examinee submissions, evaluate cognitive weak topics, and inspect individual proctoring reports.
          </p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="btn-primary-serif text-xs px-4 py-2 self-start sm:self-auto"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Instructor Console</span>
        </button>
      </div>

      {/* 1. TEACHER STUDENT METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Total Submissions</span>
            <Users className="w-4 h-4 text-editorial-accent" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-fg">
            {totalAssessed}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Evaluated exam papers
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
            Class average proficiency
          </div>
        </div>

        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Negative Penalties</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-accent">
            {totalPenalizedExams}
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Exams with &gt;9 errors (-0.25)
          </div>
        </div>

        <div className="card-editorial p-5">
          <div className="flex items-center justify-between text-editorial-muted-fg mb-1">
            <span className="small-caps text-[11px]">Curriculum Mastery</span>
            <Award className="w-4 h-4 text-editorial-accent" />
          </div>
          <div className="font-serif text-3xl font-normal text-editorial-fg">
            4 / 4
          </div>
          <div className="text-[11px] text-editorial-muted-fg mt-1">
            Syllabus domains evaluated
          </div>
        </div>
      </div>

      {/* 2. STUDENT SUBMISSIONS DOSSIER TABLE */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-editorial-accent" />
            <h2 className="font-serif text-xl font-bold text-editorial-fg">
              Student Examination Submissions
            </h2>
            <span className="text-xs font-mono text-editorial-muted-fg">
              ({filtered.length} of {submissions.length})
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-editorial-muted-fg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or exam title..."
              className="pl-8 pr-3 py-1.5 text-xs rounded border border-editorial-border bg-editorial-bg text-editorial-fg placeholder:text-editorial-muted-fg focus:outline-none focus:border-editorial-accent"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card-editorial p-8 text-center bg-editorial-muted/30">
            <Users className="w-8 h-8 text-editorial-muted-fg mx-auto mb-2" />
            <h3 className="font-serif text-base font-bold text-editorial-fg">
              No Student Submissions Found
            </h3>
            <p className="text-xs text-editorial-muted-fg mt-1 max-w-sm mx-auto">
              When students connect with your Live Quiz PIN and complete their tests, their performance reports will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="card-editorial overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-editorial-border bg-editorial-muted/50 text-editorial-muted-fg small-caps">
                    <th className="py-3 px-4 font-semibold">Examinee Candidate</th>
                    <th className="py-3 px-4 font-semibold">Assessment Title</th>
                    <th className="py-3 px-4 font-semibold">Final Score</th>
                    <th className="py-3 px-4 font-semibold">Accuracy</th>
                    <th className="py-3 px-4 font-semibold">Proctor Log</th>
                    <th className="py-3 px-4 font-semibold">Date Submitted</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-editorial-border font-sans">
                  {filtered.map((sub) => (
                    <tr key={sub.id} className="hover:bg-editorial-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-editorial-fg">{sub.studentName}</div>
                        <div className="text-[10px] font-mono text-editorial-muted-fg">
                          ID: {sub.studentId.substring(0, 14)}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="text-editorial-fg">{sub.quizTitle}</div>
                        {sub.sectionName && (
                          <div className="text-[10px] text-editorial-muted-fg">{sub.sectionName}</div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-serif font-bold text-sm text-editorial-accent">
                          {sub.score.finalScore.toFixed(2)}
                        </span>
                        <span className="text-xs text-editorial-muted-fg font-mono">
                          {' '}/ {sub.score.totalQuestions}
                        </span>
                        {sub.score.penaltyDeductions > 0 && (
                          <span className="ml-1 text-[10px] text-red-500 font-mono">
                            (-{sub.score.penaltyDeductions})
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold font-mono ${
                            sub.score.accuracyPercentage >= 75
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : sub.score.accuracyPercentage >= 50
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-red-500'
                          }`}
                        >
                          {sub.score.accuracyPercentage}%
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        {sub.antiCheatEvents?.length > 0 ? (
                          <span className="inline-flex items-center space-x-1 text-amber-600 dark:text-amber-400 font-mono text-[11px]">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{sub.antiCheatEvents.length} Event(s)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                            <CheckCircle className="w-3 h-3" />
                            <span>Clean Record</span>
                          </span>
                        )}
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
                            Inspect
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
