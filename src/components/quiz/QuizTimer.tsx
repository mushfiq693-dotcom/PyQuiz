import React, { useEffect, useState, useRef } from 'react';
import { soundManager } from '../../utils/soundEffects';
import { Clock } from 'lucide-react';

interface Props {
  initialSeconds: number; // default 20
  questionIndex: number;
  onTimeExpired: () => void;
  isPaused?: boolean;
}

export const QuizTimer: React.FC<Props> = ({
  initialSeconds = 20,
  questionIndex,
  onTimeExpired,
  isPaused = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const startTimeRef = useRef<number>(performance.now());
  const expiredRef = useRef<boolean>(false);

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(initialSeconds);
    startTimeRef.current = performance.now();
    expiredRef.current = false;
  }, [questionIndex, initialSeconds]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, initialSeconds - elapsed);
      const remainingSec = Math.ceil(remaining);

      setTimeLeft(remainingSec);

      // Warning audio ticks in final 4 seconds
      if (remainingSec <= 4 && remainingSec > 0 && Math.abs(remaining - remainingSec) < 0.1) {
        soundManager.playWarningTick();
      }

      if (remaining <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        clearInterval(interval);
        soundManager.playTimeout();
        onTimeExpired();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [questionIndex, initialSeconds, onTimeExpired, isPaused]);

  // Color states based on time remaining
  const percentage = (timeLeft / initialSeconds) * 100;
  const isUrgent = timeLeft <= 5;
  const isWarning = timeLeft <= 10 && timeLeft > 5;

  const colorClass = isUrgent
    ? 'text-rose-700 border-rose-300 bg-rose-50/80 shadow-sm'
    : isWarning
    ? 'text-amber-800 border-amber-300 bg-amber-50/80 shadow-sm'
    : 'text-editorial-foreground border-editorial-border bg-white shadow-sm';

  const strokeColor = isUrgent ? '#e11d48' : isWarning ? '#d97706' : '#B8860B';

  // Circular progress calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`flex items-center space-x-3 px-3.5 py-1.5 rounded-lg border transition-all ${colorClass} ${
        isUrgent ? 'animate-pulse' : ''
      }`}
      aria-live="polite"
      aria-atomic="true"
      role="timer"
    >
      {/* Circular Timer Ring */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-editorial-muted"
            strokeWidth="3.5"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{ transition: 'stroke-dashoffset 100ms linear' }}
          />
        </svg>
        <span className="absolute text-xs font-mono font-bold">{timeLeft}</span>
      </div>

      <div className="flex flex-col text-left">
        <span className="small-caps text-[10px] text-editorial-muted-foreground flex items-center space-x-1">
          <Clock className="w-2.5 h-2.5 mr-0.5 text-editorial-accent" />
          <span>Timer</span>
        </span>
        <span className="text-xs font-mono font-semibold">
          {timeLeft}s remaining
        </span>
      </div>
    </div>
  );
};
