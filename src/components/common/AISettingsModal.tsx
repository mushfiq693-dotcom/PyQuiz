import React, { useState, useEffect } from 'react';
import {
  getGeminiApiKey,
  setGeminiApiKey,
  testGeminiConnection,
} from '../../utils/geminiApi';
import {
  Sparkles,
  Key,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
  X,
  Loader2,
  Trash2,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: () => void;
}

export const AISettingsModal: React.FC<Props> = ({ isOpen, onClose, onKeyUpdated }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{
    tested: boolean;
    success: boolean;
    message: string;
  }>({ tested: false, success: false, message: '' });

  useEffect(() => {
    if (isOpen) {
      const current = getGeminiApiKey();
      setApiKey(current);
      setTestResult({ tested: false, success: false, message: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setGeminiApiKey(apiKey.trim());
    if (onKeyUpdated) onKeyUpdated();
    onClose();
  };

  const handleClear = () => {
    setApiKey('');
    setGeminiApiKey('');
    setTestResult({ tested: true, success: false, message: 'API Key cleared. Using built-in offline question library.' });
    if (onKeyUpdated) onKeyUpdated();
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setTestResult({ tested: true, success: false, message: 'Please enter a valid Google Gemini API key.' });
      return;
    }
    setIsTesting(true);
    setTestResult({ tested: false, success: false, message: '' });

    const res = await testGeminiConnection(apiKey.trim());
    setIsTesting(false);
    setTestResult({
      tested: true,
      success: res.success,
      message: res.message,
    });
  };

  const hasKey = apiKey.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-[94vw] max-w-lg rounded-lg bg-editorial-card border border-editorial-border shadow-xl overflow-hidden text-editorial-fg max-h-[90vh] overflow-y-auto my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-editorial-border bg-editorial-muted/50">
          <div className="flex items-center space-x-3 pr-2">
            <div className="p-2 rounded-md bg-editorial-accent text-white shadow-xs shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-editorial-fg">
                Google Gemini Calibration
              </h3>
              <p className="text-xs text-editorial-muted-fg leading-tight">
                Live assessment synthesis & document curriculum extraction
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-editorial-muted-fg hover:text-editorial-fg hover:bg-editorial-muted transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Status Banner */}
          <div
            className={`p-3 sm:p-3.5 rounded-md border text-xs flex items-start space-x-3 ${
              hasKey
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                : 'bg-editorial-muted border-editorial-border text-editorial-muted-fg'
            }`}
          >
            {hasKey ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-editorial-muted-fg shrink-0 mt-0.5" />
            )}
            <div className="leading-relaxed">
              {hasKey ? (
                <>
                  <strong className="text-editorial-fg block font-semibold">Gemini Intelligence Active</strong>
                  Live questions and syllabus document parsing are active via Google Gemini API.
                </>
              ) : (
                <>
                  <strong className="text-editorial-fg block font-semibold">Offline Question Archive Active</strong>
                  Without an active key, the system leverages its curated bank of 360 multi-level Python questions.
                </>
              )}
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-medium text-editorial-muted-fg uppercase tracking-[0.15em]">
              Gemini API Key
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-editorial-muted-fg absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestResult({ tested: false, success: false, message: '' });
                }}
                placeholder="AIzaSy..."
                className="input-editorial w-full pl-10 pr-12 py-2.5 text-base sm:text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-editorial-muted-fg hover:text-editorial-fg"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-editorial-muted-fg pt-1 gap-1">
              <span>Key stored locally in client storage.</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-editorial-accent hover:text-editorial-accent-light flex items-center space-x-1 font-medium underline underline-offset-2 decoration-editorial-accent/40"
              >
                <span>Google AI Studio Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Connection Test Result */}
          {testResult.tested && (
            <div
              className={`p-3 rounded-md border text-xs flex items-center space-x-2 ${
                testResult.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span className="break-all">{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-3.5 sm:p-4 border-t border-editorial-border bg-editorial-muted/40">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleTest}
              disabled={isTesting || !apiKey.trim()}
              className="flex-1 sm:flex-initial px-3 py-2 sm:py-1.5 rounded-md text-xs font-medium bg-editorial-card hover:bg-editorial-muted text-editorial-fg border border-editorial-border hover:border-editorial-accent disabled:opacity-40 transition-all flex items-center justify-center space-x-1.5"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-editorial-accent" />
                  <span>Testing...</span>
                </>
              ) : (
                <span>Test Connection</span>
              )}
            </button>

            {hasKey && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 sm:p-1.5 rounded-md text-editorial-muted-fg hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                title="Clear API Key"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-3.5 py-2 sm:py-1.5 rounded-md text-xs font-medium text-editorial-muted-fg hover:text-editorial-fg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-initial btn-primary-serif text-xs py-2 sm:py-1.5 px-4 text-center justify-center"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
