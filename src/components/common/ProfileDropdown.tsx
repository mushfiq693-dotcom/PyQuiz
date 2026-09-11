import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/quiz';
import {
  ShieldCheck,
  GraduationCap,
  BookOpen,
  BarChart3,
  TrendingUp,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  Home,
  User,
  Clock,
  Activity,
  Layers,
} from 'lucide-react';

interface Props {
  onNavigate: (view: string) => void;
  onOpenProfile: () => void;
  onOpenAiSettings?: () => void;
}

export const ProfileDropdown: React.FC<Props> = ({
  onNavigate,
  onOpenProfile,
  onOpenAiSettings,
}) => {
  const { user, isAdmin, isTeacher, isStudent, isPendingTeacher, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleItemClick = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 pl-2 pr-3 py-1.5 rounded-lg bg-editorial-muted/90 hover:bg-editorial-muted border border-editorial-border hover:border-editorial-accent/50 text-editorial-fg text-xs transition-all shadow-xs"
        aria-expanded={isOpen}
      >
        <div className="w-7 h-7 rounded-full bg-editorial-accent text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
          {user.fullName.charAt(0).toUpperCase()}
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className="font-medium text-editorial-fg max-w-[110px] truncate leading-tight">
            {user.fullName}
          </span>
          <span className="text-[10px] text-editorial-muted-fg font-mono capitalize leading-tight">
            {user.role === 'teacher'
              ? isPendingTeacher
                ? 'Teacher (Pending)'
                : 'Instructor'
              : user.role}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-editorial-muted-fg transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-editorial-card border border-editorial-border shadow-2xl z-50 overflow-hidden animate-fadeIn font-sans text-xs">
          {/* User Info Header */}
          <div className="p-3.5 border-b border-editorial-border bg-editorial-muted/40">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-editorial-accent text-white flex items-center justify-center font-serif font-bold text-sm">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="font-semibold text-editorial-fg truncate">{user.fullName}</div>
                <div className="text-[11px] font-mono text-editorial-muted-fg truncate">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="mt-2.5">
              <span
                className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono capitalize ${
                  isAdmin
                    ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-semibold'
                    : isTeacher
                    ? isPendingTeacher
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold'
                      : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold'
                    : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30 font-semibold'
                }`}
              >
                {isAdmin && <ShieldCheck className="w-3 h-3" />}
                {isTeacher && <GraduationCap className="w-3 h-3" />}
                {isStudent && <BookOpen className="w-3 h-3" />}
                <span>
                  {isAdmin
                    ? 'Platform Admin'
                    : isTeacher
                    ? isPendingTeacher
                      ? 'Teacher (Pending Approval)'
                      : 'Certified Instructor'
                    : 'Student / Candidate'}
                </span>
              </span>
            </div>
          </div>

          {/* ROLE-BASED DASHBOARD & ANALYTICS NAVIGATION */}
          <div className="p-1.5 space-y-0.5">
            {/* 1. ADMIN MENU */}
            {isAdmin && (
              <>
                <button
                  onClick={() => handleItemClick(() => onNavigate('admin-dashboard'))}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-fg hover:bg-editorial-muted transition-colors font-medium"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Admin Governance Console</span>
                </button>

                <button
                  onClick={() => handleItemClick(() => onNavigate('admin-analytics'))}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-fg hover:bg-editorial-muted transition-colors font-medium"
                >
                  <BarChart3 className="w-4 h-4 text-editorial-accent" />
                  <span>Platform Analytics & Tracking</span>
                </button>
              </>
            )}

            {/* 2. TEACHER MENU */}
            {isTeacher && !isPendingTeacher && (
              <>
                <button
                  onClick={() => handleItemClick(() => onNavigate('teacher-dashboard'))}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-fg hover:bg-editorial-muted transition-colors font-medium"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Instructor Dashboard</span>
                </button>

                <button
                  onClick={() => handleItemClick(() => onNavigate('teacher-analytics'))}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-fg hover:bg-editorial-muted transition-colors font-medium"
                >
                  <TrendingUp className="w-4 h-4 text-editorial-accent" />
                  <span>Student Analytics & Dossier</span>
                </button>

                {onOpenAiSettings && (
                  <button
                    onClick={() => handleItemClick(onOpenAiSettings)}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-fg hover:bg-editorial-muted transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-editorial-accent" />
                    <span>Gemini AI Calibration</span>
                  </button>
                )}
              </>
            )}

            {/* 3. PENDING TEACHER MENU */}
            {isTeacher && isPendingTeacher && (
              <>
                <button
                  onClick={() => handleItemClick(() => onNavigate('teacher-pending'))}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-fg hover:bg-editorial-muted transition-colors font-medium"
                >
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Application Status (Pending)</span>
                </button>
              </>
            )}

            {/* 4. STUDENT MENU */}
            {isStudent && (
              <>
                <button
                  onClick={() => handleItemClick(() => onNavigate('student-dashboard'))}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-fg hover:bg-editorial-muted transition-colors font-medium"
                >
                  <BookOpen className="w-4 h-4 text-editorial-accent" />
                  <span>Candidate Dashboard</span>
                </button>

                <button
                  onClick={() => handleItemClick(() => onNavigate('student-analytics'))}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-fg hover:bg-editorial-muted transition-colors font-medium"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>My Performance Analytics</span>
                </button>

                <button
                  onClick={() => handleItemClick(() => onNavigate('practice'))}
                  className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-fg hover:bg-editorial-muted transition-colors"
                >
                  <Layers className="w-4 h-4 text-editorial-muted-fg" />
                  <span>Solo Practice Exam</span>
                </button>
              </>
            )}

            {/* GENERAL NAVIGATION & SETTINGS */}
            <div className="pt-1 mt-1 border-t border-editorial-border">
              <button
                onClick={() => handleItemClick(() => onNavigate('landing'))}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-muted-fg hover:text-editorial-fg hover:bg-editorial-muted transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Overview Page</span>
              </button>

              <button
                onClick={() => handleItemClick(onOpenProfile)}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-editorial-muted-fg hover:text-editorial-fg hover:bg-editorial-muted transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Account Profile & Dossier</span>
              </button>
            </div>
          </div>

          {/* Sign Out Action */}
          <div className="p-1.5 border-t border-editorial-border bg-editorial-muted/30">
            <button
              onClick={() => handleItemClick(() => signOut())}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
