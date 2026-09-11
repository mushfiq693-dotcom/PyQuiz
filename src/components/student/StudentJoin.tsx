import React, { useState } from 'react';
import { QuizSessionConfig } from '../../types/quiz';
import { UserCheck, KeyRound, User, ArrowRight, AlertCircle, BookOpen } from 'lucide-react';

interface Props {
  activeSessions: QuizSessionConfig[];
  onJoinSuccess: (data: { quizCode: string; studentName: string; studentId: string }) => void;
  onPracticeMode: () => void;
}

export const StudentJoin: React.FC<Props> = ({
  activeSessions,
  onJoinSuccess,
  onPracticeMode,
}) => {
  const [quizCode, setQuizCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizCode.trim()) {
      setError('Please enter a Quiz PIN');
      return;
    }
    if (!studentName.trim()) {
      setError('Please enter your name');
      return;
    }

    const cleanCode = quizCode.trim().toUpperCase();
    const sessionFound = activeSessions.find(
      (s) => s.joinCode.toUpperCase() === cleanCode
    );

    if (activeSessions.length > 0 && !sessionFound) {
      setError(`No active quiz found with PIN "${cleanCode}". Please verify with your instructor.`);
      return;
    }

    onJoinSuccess({
      quizCode: cleanCode,
      studentName: studentName.trim(),
      studentId: studentId.trim() || `STU-${Math.floor(1000 + Math.random() * 9000)}`,
    });
  };

  const handleQuickFill = (session: QuizSessionConfig) => {
    setQuizCode(session.joinCode);
    if (!studentName) {
      setStudentName('Student Examinee');
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 sm:my-12 px-3 sm:px-4">
      <div className="card-editorial accent-top p-5 sm:p-8">
        {/* Section Label */}
        <div className="rule-divider mb-5 sm:mb-6">
          <span className="small-caps text-[10px] sm:text-xs">Examination Portal</span>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-full bg-editorial-muted border border-editorial-border mx-auto flex items-center justify-center mb-3 text-editorial-accent">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-editorial-foreground font-normal">
            Join Assessment
          </h2>
          <p className="text-xs sm:text-sm text-editorial-muted-foreground mt-1">
            Enter your candidate credentials and quiz access code
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="mb-5 sm:mb-6 p-3.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleJoin} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block small-caps text-editorial-foreground mb-1.5 text-[10px] sm:text-xs">
              Quiz PIN
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-editorial-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={10}
                value={quizCode}
                onChange={(e) => {
                  setQuizCode(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="e.g. PY-2026"
                className="input-editorial pl-10 pr-4 py-2.5 text-editorial-accent font-mono text-base font-bold placeholder-editorial-muted-foreground/50 uppercase tracking-widest w-full"
              />
            </div>
          </div>

          <div>
            <label className="block small-caps text-editorial-foreground mb-1.5 text-[10px] sm:text-xs">
              Candidate Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-editorial-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Eleanor Vance"
                className="input-editorial pl-10 pr-4 py-2.5 text-base sm:text-sm text-editorial-foreground placeholder-editorial-muted-foreground/50 font-sans w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary-serif w-full py-3 mt-2 flex items-center justify-center space-x-2 touch-manipulation"
          >
            <span>Enter Examination Room</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Practice Mode Option */}
        <div className="mt-6 pt-5 border-t border-editorial-border text-center">
          <button
            type="button"
            onClick={onPracticeMode}
            className="inline-flex items-center space-x-1.5 text-xs text-editorial-accent hover:text-editorial-accent-secondary font-medium tracking-wide transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Launch Solo Practice Mode</span>
          </button>
        </div>

        {/* Quick Join Active Sessions */}
        {activeSessions.length > 0 && (
          <div className="mt-6 pt-5 border-t border-editorial-border">
            <span className="small-caps text-editorial-muted-foreground block mb-3">
              Active Sessions in Progress
            </span>
            <div className="space-y-2">
              {activeSessions.map((s) => (
                <button
                  key={s.quizId}
                  type="button"
                  onClick={() => handleQuickFill(s)}
                  className="w-full p-3 rounded-md bg-editorial-muted/40 hover:bg-editorial-muted border border-editorial-border text-left flex items-center justify-between transition-all"
                >
                  <div>
                    <span className="font-serif text-sm font-semibold text-editorial-foreground block">
                      {s.quizTitle}
                    </span>
                    <span className="text-xs text-editorial-muted-foreground font-mono">
                      PIN: <strong className="text-editorial-accent font-mono">{s.joinCode}</strong> • {s.questions.length} Items
                    </span>
                  </div>
                  <span className="small-caps text-editorial-accent">Select</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
