import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PyQuizLogo } from '../common/PyQuizLogo';
import {
  Clock,
  RefreshCw,
  GraduationCap,
  BookOpen,
  LogOut,
  AlertCircle,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

interface Props {
  onStudentPortal: () => void;
}

export const PendingApprovalScreen: React.FC<Props> = ({
  onStudentPortal,
}) => {
  const { user, refreshProfile, signOut } = useAuth();
  const [checking, setChecking] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const handleCheckStatus = async () => {
    setChecking(true);
    setStatusFeedback(null);
    try {
      await refreshProfile();
      setTimeout(() => {
        setChecking(false);
        setStatusFeedback('Application status refreshed. Current status: Pending Review.');
      }, 600);
    } catch {
      setChecking(false);
      setStatusFeedback('Unable to check status. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="card-editorial accent-top p-8 sm:p-10 shadow-lg space-y-8 text-center bg-editorial-card">
        {/* Emblem */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 animate-pulse">
            <Clock className="w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="small-caps text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wider">
            Application Under Review
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-editorial-fg font-normal tracking-tight">
            Instructor Authorization Pending
          </h1>
          <p className="text-sm text-editorial-muted-fg max-w-lg mx-auto leading-relaxed">
            Welcome, <strong className="text-editorial-fg">{user?.fullName}</strong>. Your request for Instructor & Quiz Dispatch privileges has been forwarded to the Platform Administrator.
          </p>
        </div>

        {/* Application Summary Box */}
        <div className="card-editorial p-5 bg-editorial-muted/40 border border-editorial-border text-left max-w-md mx-auto space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="small-caps text-editorial-muted-fg">Account Email:</span>
            <span className="font-mono text-editorial-fg font-medium">{user?.email}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="small-caps text-editorial-muted-fg">Current Status:</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold uppercase">
              {user?.teacherStatus || 'Pending'}
            </span>
          </div>

          {user?.teacherNote && (
            <div className="pt-2 border-t border-editorial-border text-xs">
              <span className="small-caps text-editorial-muted-fg block mb-1">
                Your Submitted Statement:
              </span>
              <p className="font-serif italic text-editorial-fg text-xs bg-editorial-bg p-2.5 rounded border border-editorial-border leading-relaxed">
                "{user.teacherNote}"
              </p>
            </div>
          )}
        </div>

        {/* Status Check Message */}
        {statusFeedback && (
          <div className="p-3 rounded-md bg-editorial-muted border border-editorial-border text-xs text-editorial-fg max-w-md mx-auto flex items-center justify-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{statusFeedback}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            disabled={checking}
            onClick={handleCheckStatus}
            className="btn-primary-serif text-xs py-2.5 px-5 flex items-center space-x-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
            <span>{checking ? 'Checking Status...' : 'Check Status Now'}</span>
          </button>

          <button
            onClick={onStudentPortal}
            className="btn-secondary-serif text-xs py-2.5 px-4 flex items-center space-x-2"
          >
            <GraduationCap className="w-3.5 h-3.5 text-editorial-accent" />
            <span>Join Live Room as Student</span>
          </button>
        </div>

        {/* Sign out link */}
        <div className="pt-6 border-t border-editorial-border flex items-center justify-center space-x-4 text-xs text-editorial-muted-fg">
          <button
            onClick={() => signOut()}
            className="hover:text-red-500 transition-colors flex items-center space-x-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out & Switch Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
