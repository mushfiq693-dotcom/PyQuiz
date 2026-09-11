import React from 'react';
import { syllabusSections, allQuestions } from '../../data/questions';
import { QuizSet } from '../../data/questions/types';
import { QuizSessionConfig } from '../../types/quiz';
import { DashboardStats } from './DashboardStats';
import { SectionCard } from './SectionCard';
import { Plus, Activity, ArrowRight } from 'lucide-react';

interface Props {
  activeSessions: QuizSessionConfig[];
  onCreateNewQuiz: () => void;
  onExploreSet: (quizSet: QuizSet) => void;
  onQuickStartSet: (quizSet: QuizSet) => void;
  onSelectActiveSession: (session: QuizSessionConfig) => void;
}

export const TeacherDashboard: React.FC<Props> = ({
  activeSessions,
  onCreateNewQuiz,
  onExploreSet,
  onQuickStartSet,
  onSelectActiveSession,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header (Editorial Serif) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-editorial-border">
        <div>
          <div className="flex items-center space-x-2">
            <span className="small-caps text-[10px] text-editorial-accent">
              Evaluation Control Console
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-editorial-fg mt-1">
            Instructor Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-editorial-muted-fg mt-1 font-sans">
            Question bank repositories, generative assessment synthesis & live room dispatch.
          </p>
        </div>

        {/* Create Quiz CTA */}
        <button
          onClick={onCreateNewQuiz}
          className="btn-primary-serif self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Synthesize Assessment</span>
        </button>
      </div>

      {/* Real Platform Stats */}
      <DashboardStats
        totalQuestions={allQuestions.length}
        totalSets={syllabusSections.reduce((sum, s) => sum + s.sets.length, 0)}
        activeSessionsCount={activeSessions.length}
      />

      {/* Active Live Sessions Banner (if any) */}
      {activeSessions.length > 0 && (
        <div className="my-8 p-6 rounded-lg bg-editorial-card border border-editorial-border shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-4 h-4 text-editorial-accent animate-pulse" />
            <h3 className="small-caps text-xs text-editorial-fg">
              Active Sessions ({activeSessions.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {activeSessions.map((session) => (
              <div
                key={session.quizId}
                onClick={() => onSelectActiveSession(session)}
                className="p-4 rounded-md bg-editorial-muted/40 border border-editorial-border hover:border-editorial-accent transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-editorial-accent">
                      PIN: {session.joinCode}
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      {session.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-editorial-fg mt-2 line-clamp-1">
                    {session.quizTitle}
                  </h4>
                  <p className="text-xs text-editorial-muted-fg mt-1 font-mono">
                    {session.questions.length} Qs · {session.timePerQuestion}s / Q
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-editorial-border flex items-center justify-between text-xs text-editorial-accent font-medium">
                  <span>Open Live Room</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section Divider with Small-Caps Label */}
      <div className="rule-divider my-10">
        <span className="small-caps text-editorial-accent">
          Curriculum Sections
        </span>
      </div>

      {/* Syllabus Sections */}
      <div className="space-y-4">
        {syllabusSections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onSelectSet={onExploreSet}
            onQuickStartSet={onQuickStartSet}
          />
        ))}
      </div>
    </div>
  );
};
