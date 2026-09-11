import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PyQuizLogo } from '../common/PyQuizLogo';
import {
  X,
  User,
  Mail,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Key,
  LogOut,
  CheckCircle,
  AlertCircle,
  Save,
  Sparkles,
} from 'lucide-react';
import { saveGeminiApiKey } from '../../utils/geminiApi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, updateProfile, signOut, isAdmin, isTeacher, isPendingTeacher } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [apiKey, setApiKey] = useState(user?.customGeminiApiKey || '');
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  if (!isOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsSaving(true);

    try {
      // Save custom API key in profile and localStorage for geminiApi utility
      if (apiKey) {
        saveGeminiApiKey(apiKey.trim());
      }

      await updateProfile({
        fullName: fullName.trim(),
        customGeminiApiKey: apiKey.trim() || undefined,
      });

      setFeedback({ type: 'success', message: 'Profile updated successfully.' });
      setTimeout(() => {
        setFeedback(null);
      }, 3000);
    } catch {
      setFeedback({ type: 'error', message: 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="card-editorial w-full max-w-lg p-6 sm:p-8 relative bg-editorial-card border border-editorial-border shadow-2xl rounded-lg overflow-hidden space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-editorial-muted-fg hover:text-editorial-fg hover:bg-editorial-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 border-b border-editorial-border pb-4">
          <div className="w-12 h-12 rounded-full bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent font-serif font-bold text-lg">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-editorial-fg">
              Account Dossier & Preferences
            </h2>
            <div className="flex items-center space-x-2 mt-0.5">
              <span
                className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono capitalize ${
                  user.role === 'admin'
                    ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                    : user.role === 'teacher'
                    ? isPendingTeacher
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold'
                      : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                }`}
              >
                {user.role === 'admin' && <ShieldCheck className="w-3 h-3" />}
                {user.role === 'teacher' && <GraduationCap className="w-3 h-3" />}
                {user.role === 'student' && <BookOpen className="w-3 h-3" />}
                <span>
                  {user.role === 'teacher'
                    ? isPendingTeacher
                      ? 'Instructor (Pending Approval)'
                      : 'Instructor (Approved)'
                    : user.role}
                </span>
              </span>
              <span className="text-[10px] text-editorial-muted-fg font-mono">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-3 rounded-md text-xs flex items-center space-x-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-editorial-fg mb-1.5 small-caps">
              Full Legal / Academic Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-editorial-muted-fg" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-sm focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-editorial-fg mb-1.5 small-caps">
              Registered Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-editorial-muted-fg" />
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-muted text-editorial-muted-fg text-sm font-mono cursor-not-allowed"
              />
            </div>
          </div>

          {/* Teacher / Admin Gemini API Key Configuration */}
          {(isTeacher || isAdmin) && (
            <div className="pt-2 border-t border-editorial-border space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-editorial-fg small-caps">
                  Custom Gemini API Key (Optional)
                </label>
                <span className="text-[10px] text-editorial-accent font-mono">
                  Personal Generation Engine
                </span>
              </div>
              <p className="text-[11px] text-editorial-muted-fg">
                Connect your personal Google Gemini API key to unlock unlimited AI quiz generation, question OCR from PDF/Images, and rubric customization.
              </p>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-3 text-editorial-muted-fg" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full pl-9 pr-3 py-2 rounded-md border border-editorial-border bg-editorial-bg text-editorial-fg text-xs font-mono focus:outline-none focus:border-editorial-accent focus:ring-1 focus:ring-editorial-accent"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-editorial-border">
            <button
              type="button"
              onClick={handleSignOut}
              className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary-serif text-xs py-2 px-4 flex items-center space-x-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
