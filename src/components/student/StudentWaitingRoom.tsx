import React, { useEffect } from 'react';
import { QuizSessionConfig, StudentProfile } from '../../types/quiz';
import { syncManager } from '../../utils/broadcast';
import { soundManager } from '../../utils/soundEffects';
import { Play, ArrowLeft, Clock, ShieldCheck, Award } from 'lucide-react';

interface Props {
  session: QuizSessionConfig;
  student: StudentProfile;
  onQuizStart: () => void;
  onExit: () => void;
}

export const StudentWaitingRoom: React.FC<Props> = ({
  session,
  student,
  onQuizStart,
  onExit,
}) => {
  useEffect(() => {
    const unsubscribe = syncManager.subscribe((msg) => {
      if (msg.type === 'QUIZ_STARTED' && msg.payload.quizCode === session.joinCode) {
        soundManager.playFanfare();
        onQuizStart();
      }
    });

    return () => unsubscribe();
  }, [session.joinCode, onQuizStart]);

  return (
    <div className="max-w-2xl mx-auto my-10 px-4">
      <div className="card-editorial accent-top p-6 sm:p-10">
        {/* Waiting Room Header */}
        <div className="rule-divider mb-6">
          <span className="small-caps">Proctored Examination Room</span>
        </div>

        <div className="text-center pb-6 border-b border-editorial-border">
          <span className="inline-block px-3 py-1 rounded-full bg-editorial-muted border border-editorial-border text-editorial-accent text-xs font-mono font-bold uppercase tracking-wider mb-3">
            PIN: {session.joinCode}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-editorial-foreground font-normal">
            {session.quizTitle}
          </h1>
          <p className="text-sm text-editorial-muted-foreground mt-1.5 font-sans">
            Candidate: <strong className="text-editorial-foreground font-semibold">{student.name}</strong>
          </p>
        </div>

        {/* Live Status Card */}
        <div className="my-8 p-6 rounded-lg bg-editorial-muted/50 border border-editorial-border text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-editorial-accent animate-pulse" />
            <span className="font-serif text-base font-semibold text-editorial-foreground">
              Awaiting Instructor Authorization...
            </span>
          </div>
          <p className="text-xs text-editorial-muted-foreground max-w-md mx-auto leading-relaxed">
            The assessment will commence automatically once the instructor signals the live start from their console.
          </p>

          {/* Assessment Protocol Rules */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-white border border-editorial-border text-editorial-foreground text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-editorial-accent" />
              <span>{session.timePerQuestion}s / Question</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-white border border-editorial-border text-emerald-800 text-xs font-mono">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>+1.0 Correct</span>
            </span>
            {session.negativeMarkingEnabled && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-white border border-editorial-border text-amber-800 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>-0.25 on &gt;9 Mistakes</span>
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-editorial-border">
          <button
            onClick={onExit}
            className="btn-ghost-serif text-xs font-medium flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Lobby</span>
          </button>

          <button
            onClick={() => {
              soundManager.playSelect();
              onQuizStart();
            }}
            className="btn-primary-serif flex items-center space-x-2 text-xs"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Begin Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
