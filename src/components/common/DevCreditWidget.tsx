import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Globe,
  ExternalLink,
  Code2,
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const DevCreditWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const devPhotoUrl = '/mushfiq.jpg';

  const links = [
    {
      id: 'portfolio',
      title: 'Portfolio Website',
      url: 'https://mushfiq-dev.vercel.app',
      icon: Globe,
      description: 'Personal projects & background',
    },
    {
      id: 'github',
      title: 'GitHub Profile',
      url: 'https://github.com/mushfiq693-dotcom',
      icon: GithubIcon,
      description: 'Repositories & codebases',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      url: 'https://www.linkedin.com/in/mushfique693/',
      icon: LinkedinIcon,
      description: 'Professional network',
    },
  ];

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
        <button
          ref={triggerRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full p-[2px] transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none bg-gradient-to-tr from-rose-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_18px_rgba(244,63,94,0.35),0_0_22px_rgba(168,85,247,0.25)]"
          aria-label="Developer Credits"
          title="Developer Profile: Mushfiqur Rahman"
        >
          {/* Subtle Ambient Depth Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/40 via-fuchsia-500/40 to-indigo-500/40 blur-md group-hover:opacity-100 opacity-60 transition-opacity" />

          {/* Avatar Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-editorial-card flex items-center justify-center">
            {!imgError ? (
              <img
                src={devPhotoUrl}
                alt="Mushfiqur Rahman"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-editorial-accent text-editorial-bg flex items-center justify-center font-serif font-bold text-base">
                MR
              </div>
            )}
          </div>
        </button>
      </div>

      {/* MODAL / POPUP CARD */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-end justify-center sm:justify-end p-4 sm:p-6 sm:pb-20 pointer-events-none">
          {/* Overlay backdrop on small mobile screens */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm sm:hidden pointer-events-auto transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup Card: Theme-Adaptive Glass Frame with Gradient Accents */}
          <div
            ref={modalRef}
            className="pointer-events-auto relative w-full max-w-[295px] sm:max-w-[315px] rounded-2xl bg-editorial-card/95 backdrop-blur-2xl border border-editorial-border dark:border-white/10 text-editorial-fg shadow-2xl shadow-editorial-fg/10 dark:shadow-black/80 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Top Glowing Ambient Gradient Arc */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-44 bg-gradient-to-b from-rose-500/15 via-fuchsia-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Top Close Button (Fixed & High Z-Index) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-editorial-muted/90 hover:bg-editorial-border border border-editorial-border text-editorial-muted-fg hover:text-editorial-fg transition-all z-30 cursor-pointer shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Card Content */}
            <div className="p-5 text-center relative z-10">
              {/* Profile Avatar with Crimson-Violet Gradient Bezel */}
              <div className="relative mx-auto w-16 h-16 mb-3 p-[2px] rounded-full bg-gradient-to-tr from-rose-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-editorial-card">
                  {!imgError ? (
                    <img
                      src={devPhotoUrl}
                      alt="Mushfiqur Rahman"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-editorial-accent text-editorial-bg flex items-center justify-center font-serif font-black text-xl">
                      MR
                    </div>
                  )}
                </div>
              </div>

              {/* Developer Name with Sparkle */}
              <div className="flex items-center justify-center space-x-1 mb-0.5">
                <h3 className="font-serif text-xl sm:text-[21px] font-normal text-editorial-fg tracking-tight">
                  Mushfiqur Rahman
                </h3>
                <Sparkles className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 fill-rose-500/20" />
              </div>

              {/* Role */}
              <p className="text-xs text-editorial-muted-fg font-sans mb-2">
                Full-stack Developer
              </p>

              {/* Short Bio */}
              <p className="text-[11px] text-editorial-muted-fg font-sans leading-relaxed max-w-xs mx-auto mb-3.5">
                Architected & developed with modern web standards by Mushfiq.
              </p>

              {/* Minimal Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-editorial-border to-transparent mb-3.5" />

              {/* Social & Portfolio Action Links with Refined Multi-Tone Accents */}
              <div className="space-y-2 text-left">
                {/* 1. Portfolio */}
                <a
                  href="https://mushfiq-dev.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-editorial-muted/50 hover:bg-indigo-500/[0.08] border border-editorial-border hover:border-indigo-500/40 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-serif text-xs font-semibold text-editorial-fg group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors block leading-snug">
                        Portfolio Website
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-editorial-muted-fg group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* 2. GitHub */}
                <a
                  href="https://github.com/mushfiq693-dotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-editorial-muted/50 hover:bg-fuchsia-500/[0.08] border border-editorial-border hover:border-fuchsia-500/40 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 group-hover:scale-105 transition-transform">
                      <GithubIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-serif text-xs font-semibold text-editorial-fg group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300 transition-colors block leading-snug">
                        GitHub Profile
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-editorial-muted-fg group-hover:text-fuchsia-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* 3. LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/mushfique693/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-editorial-muted/50 hover:bg-rose-500/[0.08] border border-editorial-border hover:border-rose-500/40 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-serif text-xs font-semibold text-editorial-fg group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors block leading-snug">
                        LinkedIn Profile
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-editorial-muted-fg group-hover:text-rose-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>

              {/* Bottom Signature with Rose-to-Violet Gradient Text */}
              <div className="mt-4 pt-3 border-t border-editorial-border flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center space-x-1 font-semibold bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                  <Code2 className="w-3 h-3 text-rose-500" />
                  <span>Developer Signature</span>
                </div>
                <span className="text-editorial-muted-fg text-[9px]">
                  PyQuiz Platform
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
