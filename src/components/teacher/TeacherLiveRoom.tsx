import React, { useState, useEffect } from 'react';
import { QuizSessionConfig, StudentProfile } from '../../types/quiz';
import { syncManager } from '../../utils/broadcast';
import {
  Users,
  Play,
  Copy,
  Check,
  UserPlus,
  ExternalLink,
} from 'lucide-react';

interface Props {
  session: QuizSessionConfig;
  onStartQuizSession: () => void;
  onOpenStudentTab: () => void;
  onFinishSession: () => void;
}

export const TeacherLiveRoom: React.FC<Props> = ({
  session,
  onStartQuizSession,
  onOpenStudentTab,
  onFinishSession,
}) => {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [copied, setCopied] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<'waiting' | 'active' | 'completed'>(
    session.status
  );

  useEffect(() => {
    const unsubscribe = syncManager.subscribe((msg) => {
      if (msg.type === 'STUDENT_JOINED' && msg.payload.quizCode === session.joinCode) {
        setStudents((prev) => {
          if (prev.some((s) => s.id === msg.payload.student.id)) return prev;
          return [...prev, msg.payload.student];
        });
      } else if (msg.type === 'STUDENT_PROGRESS' && msg.payload.quizCode === session.joinCode) {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === msg.payload.studentId
              ? { ...s, currentQuestionIndex: msg.payload.questionIndex }
              : s
          )
        );
      } else if (msg.type === 'STUDENT_FINISHED' && msg.payload.quizCode === session.joinCode) {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === msg.payload.studentId
              ? { ...s, isCompleted: true }
              : s
          )
        );
      }
    });

    return () => unsubscribe();
  }, [session.joinCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(session.joinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addSimulatedStudent = () => {
    const mockNames = [
      'Alex Johnson',
      'Sarah Chen',
      'Rahim Ahmed',
      'Michael Scott',
      'Priya Sharma',
      'David Miller',
    ];
    const available = mockNames.filter((name) => !students.some((s) => s.name === name));
    const chosenName = available[0] || `Student #${students.length + 1}`;

    const newStudent: StudentProfile = {
      id: `sim-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: chosenName,
      studentId: `STU-${1000 + students.length + 1}`,
      joinedAt: Date.now(),
      currentQuestionIndex: 0,
      answers: [],
      antiCheatEvents: [],
      isCompleted: false,
    };

    setStudents((prev) => [...prev, newStudent]);
    syncManager.publish({
      type: 'STUDENT_JOINED',
      payload: { quizCode: session.joinCode, student: newStudent },
    });
  };

  const handleStartLive = () => {
    setSessionStatus('active');
    syncManager.publish({
      type: 'QUIZ_STARTED',
      payload: { quizCode: session.joinCode },
    });
    onStartQuizSession();
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 sm:p-10 rounded-lg bg-editorial-card border border-editorial-border shadow-md text-editorial-fg">
      {/* Top Session Code Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-editorial-border">
        <div>
          <div className="flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full ${
                sessionStatus === 'waiting'
                  ? 'bg-amber-500 animate-pulse'
                  : sessionStatus === 'active'
                  ? 'bg-emerald-500'
                  : 'bg-blue-500'
              }`}
            />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-editorial-muted-fg">
              {sessionStatus === 'waiting'
                ? 'Waiting Chamber'
                : sessionStatus === 'active'
                ? 'Live Assessment in Session'
                : 'Concluded'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-fg mt-1">
            {session.quizTitle}
          </h2>
          <p className="text-xs text-editorial-muted-fg mt-0.5 font-mono">
            {session.questions.length} Items · {session.timePerQuestion}s Countdown
          </p>
        </div>

        {/* Join Code Display Card */}
        <div className="flex items-center space-x-3 p-3.5 rounded-md bg-editorial-muted/50 border border-editorial-border">
          <div>
            <span className="small-caps text-[9px] text-editorial-muted-fg block">
              Access PIN
            </span>
            <span className="text-2xl font-serif font-bold text-editorial-accent tracking-wider">
              {session.joinCode}
            </span>
          </div>
          <button
            onClick={handleCopyCode}
            className="p-2 rounded bg-editorial-card hover:bg-editorial-muted text-editorial-fg border border-editorial-border hover:border-editorial-accent transition-all"
            title="Copy Access PIN"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-editorial-muted-fg" />}
          </button>
        </div>
      </div>

      {/* Waiting Room Body & Student Roster */}
      <div className="my-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-editorial-accent" />
            <h3 className="font-serif text-base font-bold text-editorial-fg">
              Connected Candidates ({students.length})
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={addSimulatedStudent}
              className="btn-secondary-serif text-xs py-1.5 px-3"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Mock Candidate</span>
            </button>

            <button
              onClick={onOpenStudentTab}
              className="btn-secondary-serif text-xs py-1.5 px-3"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Candidate Window</span>
            </button>
          </div>
        </div>

        {/* Student Cards Grid */}
        {students.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-md bg-editorial-muted/40 border border-editorial-border">
            <Users className="w-8 h-8 text-editorial-muted-fg mx-auto mb-2 opacity-50" />
            <p className="text-xs text-editorial-muted-fg font-sans">
              Waiting for candidate enrollment with PIN <strong className="text-editorial-accent font-serif text-sm">{session.joinCode}</strong>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-3 rounded-md bg-editorial-muted/40 border border-editorial-border flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded bg-editorial-accent flex items-center justify-center text-white font-serif font-bold text-xs">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-serif font-bold text-editorial-fg block">
                      {student.name}
                    </span>
                    <span className="font-mono text-[10px] text-editorial-muted-fg">
                      {student.studentId || 'ID: Active'}
                    </span>
                  </div>
                </div>

                <div>
                  {sessionStatus === 'waiting' ? (
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      Ready
                    </span>
                  ) : student.isCompleted ? (
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                      Finished
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      Q{student.currentQuestionIndex + 1}/{session.questions.length}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Start Quiz Action */}
      <div className="flex items-center justify-end pt-6 border-t border-editorial-border">
        {sessionStatus === 'waiting' ? (
          <button
            onClick={handleStartLive}
            className="btn-primary-serif text-xs sm:text-sm py-2.5 px-6 font-medium"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Commence Assessment ({students.length} Enrolled)</span>
          </button>
        ) : (
          <button
            onClick={onFinishSession}
            className="btn-secondary-serif text-xs py-2 px-4"
          >
            Return to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};
