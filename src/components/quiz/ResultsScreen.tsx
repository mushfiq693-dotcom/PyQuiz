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
    <div className="max-w-3xl mx-auto my-8 px-4">
      <div className="card-editorial accent-top p-6 sm:p-10">
        {/* Section Label */}
        <div className="rule-divider mb-6">
          <span className="small-caps">Assessment Dossier & Performance Report</span>
        </div>

        {/* Top Header */}
        <div className="text-center pb-8 border-b border-editorial-border">
          <div className="w-12 h-12 rounded-full bg-editorial-muted border border-editorial-border mx-auto flex items-center justify-center mb-3 text-editorial-accent">
            <Award className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-editorial-foreground font-normal">
            {quizTitle}
          </h1>
          <p className="text-sm text-editorial-muted-foreground mt-1 font-sans">
            Candidate: <strong className="text-editorial-foreground font-semibold">{studentName}</strong>
          </p>

          {/* Final Score Card */}
          <div className="mt-6 p-6 rounded-lg bg-editorial-muted/40 border border-editorial-border max-w-sm mx-auto text-center">
            <span className="small-caps text-editorial-muted-foreground block">
              Cumulative Final Score
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-normal text-editorial-foreground mt-2">
              {result.finalScore.toFixed(2)}{' '}
              <span className="font-serif text-2xl text-editorial-muted-foreground font-light">/ {result.totalQuestions}</span>
            </div>
            <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-accent">
              {result.accuracyPercentage}% Overall Accuracy
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-8">
          <div className="p-4 rounded-lg bg-white border border-editorial-border shadow-sm">
            <div className="flex items-center space-x-1.5 text-emerald-700 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="small-caps text-[10px]">Correct</span>
            </div>
            <div className="font-serif text-2xl text-editorial-foreground">{result.correctCount}</div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-editorial-border shadow-sm">
            <div className="flex items-center space-x-1.5 text-rose-700 text-xs font-semibold mb-1">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span className="small-caps text-[10px]">Incorrect</span>
            </div>
            <div className="font-serif text-2xl text-editorial-foreground">
              {result.wrongCount}{' '}
              {result.penalizedWrongCount > 0 && (
                <span className="text-xs font-sans text-rose-600 font-normal">
                  (-{result.penaltyDeductions.toFixed(2)})
                </span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-editorial-border shadow-sm">
            <div className="flex items-center space-x-1.5 text-amber-800 text-xs font-semibold mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span className="small-caps text-[10px]">Timed Out</span>
            </div>
            <div className="font-serif text-2xl text-editorial-foreground">{result.unansweredCount}</div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-editorial-border shadow-sm">
            <div className="flex items-center space-x-1.5 text-editorial-accent text-xs font-semibold mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-editorial-accent" />
              <span className="small-caps text-[10px]">Efficiency</span>
            </div>
            <div className="font-serif text-2xl text-editorial-foreground">{result.accuracyPercentage}%</div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="mb-6 p-5 rounded-lg bg-editorial-muted/40 border border-editorial-border">
          <h3 className="small-caps text-editorial-foreground mb-4">
            Proficiency by Cognitive Complexity
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-md bg-white border border-editorial-border shadow-sm">
              <span className="small-caps text-emerald-800 block text-[10px]">Level I (Foundational)</span>
              <span className="font-serif text-base font-semibold text-editorial-foreground mt-1 block">
                {result.difficultyBreakdown.easy.correct} / {result.difficultyBreakdown.easy.total}
              </span>
            </div>
            <div className="p-3 rounded-md bg-white border border-editorial-border shadow-sm">
              <span className="small-caps text-amber-800 block text-[10px]">Level II (Intermediate)</span>
              <span className="font-serif text-base font-semibold text-editorial-foreground mt-1 block">
                {result.difficultyBreakdown.medium.correct} / {result.difficultyBreakdown.medium.total}
              </span>
            </div>
            <div className="p-3 rounded-md bg-white border border-editorial-border shadow-sm">
              <span className="small-caps text-rose-800 block text-[10px]">Level III (Advanced)</span>
              <span className="font-serif text-base font-semibold text-editorial-foreground mt-1 block">
                {result.difficultyBreakdown.hard.correct} / {result.difficultyBreakdown.hard.total}
              </span>
            </div>
          </div>
        </div>

        {/* Topic Performance */}
        <div className="mb-8 p-5 rounded-lg bg-editorial-muted/40 border border-editorial-border">
          <h3 className="small-caps text-editorial-foreground mb-4">
            Thematic Mastery Index
          </h3>
          <div className="space-y-3">
            {Object.entries(result.topicBreakdown).map(([topic, stats]) => (
              <div key={topic} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-editorial-foreground">#{topic}</span>
                  <span className="font-mono text-editorial-muted-foreground">
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
        <div className="flex items-center justify-between pt-6 border-t border-editorial-border">
          <button
            onClick={onBackToDashboard}
            className="btn-ghost-serif text-xs font-medium"
          >
            Exit to Portal
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={onRetakeQuiz}
              className="btn-secondary-serif flex items-center space-x-1.5 text-xs py-2 px-3.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>

            <button
              onClick={onOpenReview}
              className="btn-primary-serif flex items-center space-x-2 text-xs py-2 px-4"
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
