import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Question } from '../../data/questions/types';
import { StudentAnswer, AntiCheatEvent } from '../../types/quiz';
import { QuizTimer } from './QuizTimer';
import { QuizQuestion } from './QuizQuestion';
import { soundManager } from '../../utils/soundEffects';
import { antiCheatManager } from '../../utils/antiCheat';
import { syncManager } from '../../utils/broadcast';
import { ShieldAlert } from 'lucide-react';

interface Props {
  quizTitle: string;
  quizCode?: string;
  studentId?: string;
  questions: Question[];
  timePerQuestion?: number;
  onFinishQuiz: (answers: StudentAnswer[], antiCheatEvents: AntiCheatEvent[]) => void;
  onAbortQuiz?: () => void;
}

export const QuizScreen: React.FC<Props> = ({
  quizTitle,
  quizCode,
  studentId,
  questions,
  timePerQuestion = 20,
  onFinishQuiz,
  onAbortQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<StudentAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [antiCheatAlert, setAntiCheatAlert] = useState<string | null>(null);

  const questionStartTimeRef = useRef<number>(performance.now());
  const answersRef = useRef<StudentAnswer[]>([]);

  // Anti-Cheat proctoring
  useEffect(() => {
    antiCheatManager.start((event) => {
      setAntiCheatAlert(`Tab switch or window change detected`);
      setTimeout(() => setAntiCheatAlert(null), 3000);
    });

    antiCheatManager.requestFullscreen();

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Assessment in progress.';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      antiCheatManager.stop();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    questionStartTimeRef.current = performance.now();
    setSelectedOption(null);
    setIsLocked(false);

    if (quizCode && studentId) {
      syncManager.publish({
        type: 'STUDENT_PROGRESS',
        payload: {
          quizCode,
          studentId,
          questionIndex: currentIndex,
        },
      });
    }
  }, [currentIndex, quizCode, studentId]);

  const recordAndAdvance = useCallback(
    (option: number | null, isTimedOut: boolean) => {
      if (isLocked) return;
      setIsLocked(true);

      const timeSpent = Math.min(
        timePerQuestion,
        parseFloat(((performance.now() - questionStartTimeRef.current) / 1000).toFixed(1))
      );

      const currentQ = questions[currentIndex];
      const isCorrect = option !== null && option === currentQ.correctAnswer;

      const record: StudentAnswer = {
        questionId: currentQ.id,
        selectedOption: option,
        timeSpentSeconds: timeSpent,
        isCorrect,
        isTimedOut,
      };

      const updatedAnswers = [...answersRef.current, record];
      answersRef.current = updatedAnswers;
      setAnswers(updatedAnswers);

      if (option !== null) {
        soundManager.playSelect();
      }

      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          soundManager.playFanfare();
          if (quizCode && studentId) {
            syncManager.publish({
              type: 'STUDENT_FINISHED',
              payload: {
                quizCode,
                studentId,
                score: updatedAnswers.filter((a) => a.isCorrect).length,
              },
            });
          }
          onFinishQuiz(updatedAnswers, antiCheatManager.getEvents());
        }
      }, 180);
    },
    [currentIndex, isLocked, onFinishQuiz, questions, quizCode, studentId, timePerQuestion]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked) return;
      const key = e.key.toUpperCase();
      let optIdx: number | null = null;

      if (key === 'A' || key === '1') optIdx = 0;
      else if (key === 'B' || key === '2') optIdx = 1;
      else if (key === 'C' || key === '3') optIdx = 2;
      else if (key === 'D' || key === '4') optIdx = 3;

      if (optIdx !== null && optIdx < questions[currentIndex].options.length) {
        setSelectedOption(optIdx);
        recordAndAdvance(optIdx, false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isLocked, questions, recordAndAdvance]);

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    recordAndAdvance(idx, false);
  };

  const handleTimeExpired = () => {
    if (!isLocked) {
      recordAndAdvance(null, true);
    }
  };

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto my-6 px-4">
      {/* Anti-Cheat Alert */}
      {antiCheatAlert && (
        <div className="mb-4 p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{antiCheatAlert}</span>
          </div>
        </div>
      )}

      {/* Progress Bar & Header Strip */}
      <div className="card-editorial mb-6 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="small-caps text-editorial-muted-foreground block">
              {quizTitle}
            </span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="font-serif text-lg sm:text-xl font-normal text-editorial-foreground">
                Item {currentIndex + 1}
              </span>
              <span className="text-xs text-editorial-muted-foreground font-mono">
                of {questions.length}
              </span>
            </div>
          </div>

          <QuizTimer
            initialSeconds={timePerQuestion}
            questionIndex={currentIndex}
            onTimeExpired={handleTimeExpired}
            isPaused={isLocked}
          />
        </div>

        {/* Linear Progress */}
        <div className="w-full bg-editorial-muted h-1.5 rounded-full overflow-hidden border border-editorial-border">
          <div
            className="bg-editorial-accent h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="card-editorial accent-top p-6 sm:p-10">
        <QuizQuestion
          question={currentQ}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedOption={selectedOption}
          isDisabled={isLocked}
          onSelectOption={handleSelectOption}
        />
      </div>
    </div>
  );
};
