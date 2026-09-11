import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Activity,
  Sparkles,
  LogIn,
} from 'lucide-react';
import { SoundToggle } from './SoundToggle';
import { FullscreenToggle } from './FullscreenToggle';
import { ThemeToggle } from './ThemeToggle';
import { AISettingsModal } from './AISettingsModal';
import { PyQuizLogo } from './PyQuizLogo';
import { ProfileDropdown } from './ProfileDropdown';
import { isGeminiConfigured } from '../../utils/geminiApi';

interface Props {
  onNavigate: (view: string) => void;
  onGoLanding?: () => void;
  onOpenAuthModal: (tab?: 'signin' | 'signup') => void;
  onOpenProfileModal: () => void;
  activeQuizCode?: string;
  isQuizActive?: boolean;
}

export const Header: React.FC<Props> = ({
  onNavigate,
  onGoLanding,
  onOpenAuthModal,
  onOpenProfileModal,
  activeQuizCode,
  isQuizActive,
}) => {
  const { user, isAuthenticated, isAdmin, isTeacher } = useAuth();
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
      <header className="sticky top-0 z-40 backdrop-blur-md bg-editorial-bg/90 border-b border-editorial-border transition-colors pt-safe">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          {/* Brand Wordmark & Animated Mascot Logo */}
          <div
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group select-none shrink-0"
            onClick={onGoLanding ? onGoLanding : () => onNavigate('landing')}
            title="PyQuiz — Unlocking Deep Python Mastery Through Live Quizzing"
          >
            <PyQuizLogo size="sm" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-editorial-fg leading-none">
                PyQuiz
              </span>
              <span className="hidden xs:inline-block small-caps text-[9px] text-editorial-muted-fg mt-0.5">
                Live Assessment Platform
              </span>
            </div>
          </div>

          {/* Right Tools & User Profile / Auth Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Live Quiz Room PIN Badge (when connected) */}
            {activeQuizCode && (
              <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-editorial-muted border border-editorial-border text-editorial-fg text-xs font-mono">
                <Activity className="w-3 h-3 text-editorial-accent animate-pulse" />
                <span>PIN: {activeQuizCode}</span>
              </div>
            )}

            {/* AI Key Calibration Indicator (Only for Teachers/Admins) */}
            {isAuthenticated && (isTeacher || isAdmin) && (
              <button
                onClick={() => setShowAiModal(true)}
                title="Configure Google Gemini AI Key"
                className={`flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-md border text-xs font-medium transition-all ${
                  hasAiKey
                    ? 'bg-editorial-card border-editorial-accent/40 text-editorial-fg hover:border-editorial-accent shadow-xs'
                    : 'bg-editorial-muted border-editorial-border text-editorial-muted-fg hover:text-editorial-fg hover:border-editorial-accent'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${hasAiKey ? 'text-editorial-accent' : 'text-editorial-muted-fg'}`} />
                <span className="hidden sm:inline font-mono text-[11px]">
                  {hasAiKey ? 'Gemini 2.5' : 'AI'}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    hasAiKey ? 'bg-editorial-accent' : 'bg-editorial-muted-fg'
                  }`}
                />
              </button>
            )}

            <ThemeToggle />
            <SoundToggle />
            <div className="hidden sm:inline-flex">
              <FullscreenToggle />
            </div>

            {/* Authenticated Profile Dropdown OR Sign In Button */}
            {isAuthenticated && user ? (
              <ProfileDropdown
                onNavigate={onNavigate}
                onOpenProfile={onOpenProfileModal}
                onOpenAiSettings={() => setShowAiModal(true)}
              />
            ) : (
              <button
                onClick={() => onOpenAuthModal('signin')}
                className="btn-primary-serif text-xs py-1.5 sm:py-2 px-3 sm:px-4 flex items-center space-x-1.5 shadow-sm ml-0.5 sm:ml-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
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

export default Header;
