import React, { useState } from 'react';
import { Question } from '../../data/questions/types';
import { StudentAnswer } from '../../types/quiz';
import { CodeSnippet } from '../common/CodeSnippet';
import { DifficultyBadge } from '../common/DifficultyBadge';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  HelpCircle,
  Check,
  X,
} from 'lucide-react';

interface Props {
  quizTitle: string;
  questions: Question[];
  answers: StudentAnswer[];
  onBackToResults: () => void;
}

export const ReviewScreen: React.FC<Props> = ({
  quizTitle,
  questions,
  answers,
  onBackToResults,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'timedOut'>('all');

  const getAnswerForQuestion = (qId: string, index: number): StudentAnswer | undefined => {
    return answers.find((a) => a.questionId === qId) || answers[index];
  };

  const filteredQuestions = questions.filter((q, idx) => {
    const ans = getAnswerForQuestion(q.id, idx);
    if (filter === 'all') return true;
    if (filter === 'correct') return ans?.isCorrect;
    if (filter === 'incorrect') return ans && !ans.isCorrect && !ans.isTimedOut;
    if (filter === 'timedOut') return ans?.isTimedOut || ans?.selectedOption === null;
    return true;
  });

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const incorrectCount = answers.filter((a) => !a.isCorrect && !a.isTimedOut).length;
  const timedOutCount = answers.filter((a) => a.isTimedOut || a.selectedOption === null).length;

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="card-editorial accent-top p-6 sm:p-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-editorial-border">
          <div>
            <button
              onClick={onBackToResults}
              className="btn-ghost-serif inline-flex items-center space-x-1.5 text-xs mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Performance Report</span>
            </button>
            <h2 className="font-serif text-2xl text-editorial-foreground font-normal">
              Item-by-Item Review ({questions.length} Items)
            </h2>
          </div>

          {/* Filter Strip */}
          <div className="flex items-center space-x-1 bg-editorial-muted p-1 rounded-md border border-editorial-border self-start sm:self-auto text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                filter === 'all'
                  ? 'bg-editorial-foreground text-white shadow-sm'
                  : 'text-editorial-muted-foreground hover:text-editorial-foreground'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                filter === 'correct'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-800 hover:text-emerald-900'
              }`}
            >
              ✓ ({correctCount})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                filter === 'incorrect'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-rose-800 hover:text-rose-900'
              }`}
            >
              ✗ ({incorrectCount})
            </button>
            <button
              onClick={() => setFilter('timedOut')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                filter === 'timedOut'
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'text-amber-800 hover:text-amber-900'
              }`}
            >
              ⊘ ({timedOutCount})
            </button>
          </div>
        </div>

        {/* Review List */}
        <div className="mt-6 space-y-6">
          {filteredQuestions.map((q) => {
            const originalIndex = questions.findIndex((item) => item.id === q.id);
            const ans = getAnswerForQuestion(q.id, originalIndex);
            const isCorrect = ans?.isCorrect ?? false;
            const isTimedOut = ans?.isTimedOut ?? false;
            const studentPick = ans?.selectedOption ?? null;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-lg border transition-all ${
                  isCorrect
                    ? 'border-emerald-300/80 bg-white'
                    : isTimedOut
                    ? 'border-amber-300/80 bg-white'
                    : 'border-rose-300/80 bg-white'
                } shadow-sm`}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-editorial-border">
                  <div className="flex items-center space-x-2">
                    <span className="small-caps px-2 py-0.5 rounded bg-editorial-muted text-editorial-foreground border border-editorial-border">
                      Item {originalIndex + 1}
                    </span>
                    <DifficultyBadge difficulty={q.difficulty} />
                    <span className="text-xs font-mono text-editorial-muted-foreground">
                      #{q.topic}
                    </span>
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Correct (+1.0)</span>
                      </span>
                    ) : isTimedOut ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-mono font-semibold text-amber-800 bg-amber-50 border border-amber-200">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Timed Out</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-mono font-semibold text-rose-700 bg-rose-50 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Incorrect</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text & Code */}
                <div className="mt-4">
                  <h3 className="font-serif text-base sm:text-lg font-normal text-editorial-foreground leading-snug">
                    {q.question}
                  </h3>
                  {q.code && (
                    <div className="my-3">
                      <CodeSnippet code={q.code} allowCopy={false} />
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                  {q.options.map((opt, optIdx) => {
                    const isActualCorrect = optIdx === q.correctAnswer;
                    const isUserSelected = studentPick === optIdx;

                    let cardStyle = 'bg-editorial-muted/30 border-editorial-border text-editorial-foreground';
                    let badgeStyle = 'bg-editorial-muted border border-editorial-border text-editorial-muted-foreground';

                    if (isActualCorrect) {
                      cardStyle = 'bg-emerald-50/70 border-emerald-400 text-emerald-950 ring-1 ring-emerald-400';
                      badgeStyle = 'bg-emerald-600 text-white font-bold';
                    } else if (isUserSelected && !isCorrect) {
                      cardStyle = 'bg-rose-50/70 border-rose-400 text-rose-950 ring-1 ring-rose-400';
                      badgeStyle = 'bg-rose-600 text-white font-bold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-md border text-xs font-mono flex items-start space-x-2.5 ${cardStyle}`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${badgeStyle}`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <div className="flex-1">
                          <span className="break-all">{opt}</span>
                          {isUserSelected && (
                            <span className="block small-caps text-[10px] mt-1 text-editorial-muted-foreground">
                              {isCorrect ? '• Candidate Selection' : '• Candidate Selection (Incorrect)'}
                            </span>
                          )}
                        </div>
                        {isActualCorrect && (
                          <Check className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />
                        )}
                        {isUserSelected && !isCorrect && (
                          <X className="w-4 h-4 text-rose-600 ml-auto shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="mt-4 p-4 rounded-md bg-editorial-muted/50 border border-editorial-border text-xs text-editorial-foreground flex items-start space-x-2.5">
                  <HelpCircle className="w-4 h-4 text-editorial-accent shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="small-caps text-editorial-accent mr-1">
                      Editorial Commentary:
                    </strong>
                    <span>{q.explanation}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
