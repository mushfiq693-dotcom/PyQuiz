import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types/quiz';
import { GraduationCap, UserCheck, BookOpen, Activity, Sparkles, Home } from 'lucide-react';
import { SoundToggle } from './SoundToggle';
import { FullscreenToggle } from './FullscreenToggle';
import { ThemeToggle } from './ThemeToggle';
import { AISettingsModal } from './AISettingsModal';
import { isGeminiConfigured } from '../../utils/geminiApi';

interface Props {
  currentRole: UserRole | 'landing';
  onRoleChange: (role: UserRole) => void;
  onGoLanding?: () => void;
  activeQuizCode?: string;
  isQuizActive?: boolean;
}

export const Header: React.FC<Props> = ({
  currentRole,
  onRoleChange,
  onGoLanding,
  activeQuizCode,
  isQuizActive,
}) => {
  const [showAiModal, setShowAiModal] = useState(false);
  const [hasAiKey, setHasAiKey] = useState(false);

  useEffect(() => {
    setHasAiKey(isGeminiConfigured());
  }, []);

  const refreshAiStatus = () => {
    setHasAiKey(isGeminiConfigured());
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-editorial-bg/90 border-b border-editorial-border transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Wordmark (Editorial Serif) */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={onGoLanding ? onGoLanding : () => onRoleChange('teacher')}
            title="PyQuiz — Unlocking Deep Python Mastery Through Live Quizzing"
          >
            <div className="w-8 h-8 rounded-md bg-editorial-accent flex items-center justify-center shadow-sm text-editorial-bg font-serif font-black text-lg transition-transform group-hover:scale-105">
              <span>Ψ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-tight text-editorial-fg leading-none">
                PyQuiz
              </span>
              <span className="small-caps text-[9px] text-editorial-muted-fg mt-0.5">
                Live Assessment Platform
              </span>
            </div>
          </div>

          {/* Navigation Switcher */}
          {!isQuizActive && (
            <nav className="flex items-center p-1 bg-editorial-muted border border-editorial-border rounded-md">
              {onGoLanding && (
                <button
                  onClick={onGoLanding}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    currentRole === 'landing'
                      ? 'bg-editorial-card text-editorial-fg shadow-sm border border-editorial-border'
                      : 'text-editorial-muted-fg hover:text-editorial-fg'
                  }`}
                >
                  <Home className="w-3.5 h-3.5 text-editorial-accent" />
                  <span className="hidden md:inline">Overview</span>
                </button>
              )}

              <button
                onClick={() => onRoleChange('teacher')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  currentRole === 'teacher'
                    ? 'bg-editorial-card text-editorial-fg shadow-sm border border-editorial-border'
                    : 'text-editorial-muted-fg hover:text-editorial-fg'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-editorial-accent" />
                <span>Instructor</span>
              </button>

              <button
                onClick={() => onRoleChange('student')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  currentRole === 'student'
                    ? 'bg-editorial-card text-editorial-fg shadow-sm border border-editorial-border'
                    : 'text-editorial-muted-fg hover:text-editorial-fg'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-editorial-accent" />
                <span>Candidate</span>
              </button>

              <button
                onClick={() => onRoleChange('practice')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  currentRole === 'practice'
                    ? 'bg-editorial-card text-editorial-fg shadow-sm border border-editorial-border'
                    : 'text-editorial-muted-fg hover:text-editorial-fg'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-editorial-accent" />
                <span>Practice</span>
              </button>
            </nav>
          )}

          {/* Right Tools */}
          <div className="flex items-center space-x-2">
            {/* AI Settings Trigger */}
            <button
              onClick={() => setShowAiModal(true)}
              title="Configure Google Gemini AI Key"
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                hasAiKey
                  ? 'bg-editorial-card border-editorial-accent/40 text-editorial-fg hover:border-editorial-accent shadow-sm'
                  : 'bg-editorial-muted border-editorial-border text-editorial-muted-fg hover:text-editorial-fg hover:border-editorial-accent'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${hasAiKey ? 'text-editorial-accent' : 'text-editorial-muted-fg'}`} />
              <span className="hidden sm:inline font-mono text-[11px]">
                {hasAiKey ? 'Gemini 2.5' : 'AI Calibration'}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  hasAiKey ? 'bg-editorial-accent' : 'bg-editorial-muted-fg'
                }`}
              />
            </button>

            {activeQuizCode && (
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-editorial-muted border border-editorial-border text-editorial-fg text-xs font-mono">
                <Activity className="w-3 h-3 text-editorial-accent animate-pulse" />
                <span>PIN: {activeQuizCode}</span>
              </div>
            )}

            <ThemeToggle />
            <SoundToggle />
            <FullscreenToggle />
          </div>
        </div>
      </header>

      {/* AI Key Configuration Modal */}
      <AISettingsModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onKeyUpdated={refreshAiStatus}
      />
    </>
  );
};


