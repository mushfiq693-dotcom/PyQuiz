import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Question } from '../../data/questions/types';
import { StudentAnswer, ScoreResult, AntiCheatEvent } from '../../types/quiz';
import { calculateQuizScore } from '../../utils/scoring';
import {
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  ArrowRight,
  RotateCcw,
  Award,
} from 'lucide-react';

interface Props {
  quizTitle: string;
  studentName?: string;
  questions: Question[];
  answers: StudentAnswer[];
  antiCheatEvents: AntiCheatEvent[];
  onOpenReview: () => void;
  onRetakeQuiz: () => void;
  onBackToDashboard: () => void;
}

export const ResultsScreen: React.FC<Props> = ({
  quizTitle,
  studentName = 'Student',
  questions,
  answers,
  antiCheatEvents,
  onOpenReview,
  onRetakeQuiz,
  onBackToDashboard,
}) => {
  const result: ScoreResult = calculateQuizScore(questions, answers);

  useEffect(() => {
    if (result.accuracyPercentage >= 50) {
      try {
        confetti({
          particleCount: 60,
          spread: 55,
          origin: { y: 0.6 },
          colors: ['#B8860B', '#D4A84B', '#1A1A1A', '#6B6B6B'],
        });
      } catch {
        // ignore
      }
    }
  }, [result.accuracyPercentage]);

  return (
    <div className="max-w-3xl mx-auto my-4 sm:my-8 px-3 sm:px-4">
      <div className="card-editorial accent-top p-4 sm:p-8 md:p-10">
        {/* Section Label */}
        <div className="rule-divider mb-4 sm:mb-6">
          <span className="small-caps text-[10px] sm:text-xs">Assessment Dossier & Performance Report</span>
        </div>

        {/* Top Header */}
        <div className="text-center pb-6 sm:pb-8 border-b border-editorial-border">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-editorial-muted border border-editorial-border mx-auto flex items-center justify-center mb-3 text-editorial-accent">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h1 className="font-serif text-xl sm:text-3xl text-editorial-fg font-normal px-2">
            {quizTitle}
          </h1>
          <p className="text-xs sm:text-sm text-editorial-muted-fg mt-1 font-sans">
            Candidate: <strong className="text-editorial-fg font-semibold">{studentName}</strong>
          </p>

          {/* Final Score Card */}
          <div className="mt-5 sm:mt-6 p-4 sm:p-6 rounded-lg bg-editorial-muted/40 border border-editorial-border max-w-sm mx-auto text-center">
            <span className="small-caps text-[10px] sm:text-xs text-editorial-muted-fg block">
              Cumulative Final Score
            </span>
            <div className="font-serif text-3xl sm:text-5xl font-normal text-editorial-fg mt-2">
              {result.finalScore.toFixed(2)}{' '}
              <span className="font-serif text-xl sm:text-2xl text-editorial-muted-fg font-light">/ {result.totalQuestions}</span>
            </div>
            <span className="inline-block mt-2 sm:mt-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent">
              {result.accuracyPercentage}% Overall Accuracy
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 my-6 sm:my-8">
          <div className="p-3 sm:p-4 rounded-lg bg-editorial-card border border-editorial-border shadow-xs sm:shadow-sm">
            <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="small-caps text-[10px]">Correct</span>
            </div>
            <div className="font-serif text-xl sm:text-2xl text-editorial-fg">{result.correctCount}</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-editorial-card border border-editorial-border shadow-xs sm:shadow-sm">
            <div className="flex items-center space-x-1.5 text-rose-700 dark:text-rose-400 text-xs font-semibold mb-1">
              <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
              <span className="small-caps text-[10px]">Incorrect</span>
            </div>
            <div className="font-serif text-xl sm:text-2xl text-editorial-fg">
              {result.wrongCount}{' '}
              {result.penalizedWrongCount > 0 && (
                <span className="text-xs font-sans text-rose-600 dark:text-rose-400 font-normal">
                  (-{result.penaltyDeductions.toFixed(2)})
                </span>
              )}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-editorial-card border border-editorial-border shadow-xs sm:shadow-sm">
            <div className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="small-caps text-[10px]">Timed Out</span>
            </div>
            <div className="font-serif text-xl sm:text-2xl text-editorial-fg">{result.unansweredCount}</div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-editorial-card border border-editorial-border shadow-xs sm:shadow-sm">
            <div className="flex items-center space-x-1.5 text-editorial-accent text-xs font-semibold mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-editorial-accent shrink-0" />
              <span className="small-caps text-[10px]">Efficiency</span>
            </div>
            <div className="font-serif text-xl sm:text-2xl text-editorial-fg">{result.accuracyPercentage}%</div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="mb-6 p-4 sm:p-5 rounded-lg bg-editorial-muted/40 border border-editorial-border">
          <h3 className="small-caps text-[10px] sm:text-xs text-editorial-fg mb-3 sm:mb-4">
            Proficiency by Cognitive Complexity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="p-2.5 sm:p-3 rounded-md bg-editorial-card border border-editorial-border shadow-xs sm:shadow-sm flex sm:flex-col items-center justify-between sm:justify-center">
              <span className="small-caps text-emerald-700 dark:text-emerald-400 block text-[10px]">Level I (Foundational)</span>
              <span className="font-serif text-sm sm:text-base font-semibold text-editorial-fg sm:mt-1 block">
                {result.difficultyBreakdown.easy.correct} / {result.difficultyBreakdown.easy.total}
              </span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-md bg-editorial-card border border-editorial-border shadow-xs sm:shadow-sm flex sm:flex-col items-center justify-between sm:justify-center">
              <span className="small-caps text-amber-700 dark:text-amber-400 block text-[10px]">Level II (Intermediate)</span>
              <span className="font-serif text-sm sm:text-base font-semibold text-editorial-fg sm:mt-1 block">
                {result.difficultyBreakdown.medium.correct} / {result.difficultyBreakdown.medium.total}
              </span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-md bg-editorial-card border border-editorial-border shadow-xs sm:shadow-sm flex sm:flex-col items-center justify-between sm:justify-center">
              <span className="small-caps text-rose-700 dark:text-rose-400 block text-[10px]">Level III (Advanced)</span>
              <span className="font-serif text-sm sm:text-base font-semibold text-editorial-fg sm:mt-1 block">
                {result.difficultyBreakdown.hard.correct} / {result.difficultyBreakdown.hard.total}
              </span>
            </div>
          </div>
        </div>

        {/* Topic Performance */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-lg bg-editorial-muted/40 border border-editorial-border">
          <h3 className="small-caps text-[10px] sm:text-xs text-editorial-fg mb-3 sm:mb-4">
            Thematic Mastery Index
          </h3>
          <div className="space-y-3">
            {Object.entries(result.topicBreakdown).map(([topic, stats]) => (
              <div key={topic} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-editorial-fg text-[11px] sm:text-xs truncate max-w-[65%]">#{topic}</span>
                  <span className="font-mono text-editorial-muted-fg text-[11px] sm:text-xs shrink-0">
                    {stats.correct}/{stats.total} ({stats.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-editorial-muted h-1.5 rounded-full overflow-hidden border border-editorial-border">
                  <div
                    className={`h-full rounded-full ${
                      stats.percentage >= 70
                        ? 'bg-emerald-600'
                        : stats.percentage >= 50
                        ? 'bg-editorial-accent'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-5 sm:pt-6 border-t border-editorial-border">
          <button
            onClick={onBackToDashboard}
            className="btn-ghost-serif text-xs font-medium py-2.5 text-center justify-center"
          >
            Exit to Portal
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button
              onClick={onRetakeQuiz}
              className="btn-secondary-serif flex items-center justify-center space-x-1.5 text-xs py-2.5 px-3.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>

            <button
              onClick={onOpenReview}
              className="btn-primary-serif flex items-center justify-center space-x-2 text-xs py-2.5 px-4"
            >
              <span>Review Item Explanations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
