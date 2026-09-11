import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  BookOpen,
  Layers,
  Clock,
  Award,
  GraduationCap,
} from 'lucide-react';
import { allQuestions } from '../../data/questions';

interface Props {
  onStartTeacher: () => void;
  onStartStudent: () => void;
  onStartPractice: () => void;
  onCreateQuiz: () => void;
  activeSessionsCount: number;
}

export const LandingPage: React.FC<Props> = ({
  onStartTeacher,
  onStartStudent,
  onStartPractice,
  onCreateQuiz,
  activeSessionsCount,
}) => {
  return (
    <div className="space-y-24 py-10 sm:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Top Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-editorial-muted border border-editorial-border text-editorial-accent mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="small-caps text-[11px] font-semibold tracking-[0.18em]">
            Standard Protocol for Python Competency
          </span>
        </div>

        {/* Brand Emblem Logo */}
        <div className="w-20 h-20 rounded-2xl bg-editorial-accent text-editorial-bg mx-auto flex items-center justify-center shadow-lg shadow-editorial-accent/20 mb-6 font-serif font-black text-4xl border border-editorial-accent-light/40">
          <span>Ψ</span>
        </div>

        {/* Product Name & Motto */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-editorial-fg leading-[1.1] mb-6">
          PyQuiz
        </h1>
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-editorial-accent font-medium max-w-3xl mx-auto mb-8 leading-relaxed">
          "Unlocking Deep Python Mastery Through Live Quizzing"
        </p>

        {/* Subtitle Description */}
        <p className="text-base sm:text-lg text-editorial-muted-fg max-w-2xl mx-auto font-sans leading-relaxed mb-10">
          An editorial assessment and examination platform engineered for educators and computer science candidates. Featuring 4-quadrant standardized curriculum alignment, real-time live synchronization, Gemini AI calibration, and proctored anti-cheat evaluation.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartTeacher}
            className="btn-primary-serif text-sm sm:text-base py-3.5 px-7 shadow-md"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Enter Instructor Console</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onStartStudent}
            className="btn-secondary-serif text-sm sm:text-base py-3.5 px-7 shadow-sm"
          >
            <Users className="w-5 h-5 text-editorial-accent" />
            <span>Candidate Live Portal</span>
          </button>

          <button
            onClick={onStartPractice}
            className="btn-ghost-serif text-sm py-3 px-5 inline-flex items-center space-x-1.5"
          >
            <BookOpen className="w-4 h-4 text-editorial-accent" />
            <span>Solo Practice Exam</span>
          </button>
        </div>

        {/* Live System Indicator Strip */}
        <div className="mt-12 pt-8 border-t border-editorial-border flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-editorial-muted-fg">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync Engine Active</span>
          </span>
          <span>•</span>
          <span>{allQuestions.length}+ Standardized Questions</span>
          <span>•</span>
          <span>4 Curriculum Quadrants</span>
          <span>•</span>
          <span>{activeSessionsCount} Live Rooms Active</span>
        </div>
      </section>

      {/* 2. STATS & KEY METRICS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="card-editorial p-6 text-center">
            <span className="small-caps text-editorial-muted-fg block mb-2">Item Repository</span>
            <span className="font-serif text-3xl sm:text-4xl text-editorial-fg block font-normal">
              {allQuestions.length}+
            </span>
            <span className="text-xs text-editorial-muted-fg mt-1 block">Curated Questions</span>
          </div>

          <div className="card-editorial p-6 text-center">
            <span className="small-caps text-editorial-muted-fg block mb-2">Cognitive Tiers</span>
            <span className="font-serif text-3xl sm:text-4xl text-editorial-fg block font-normal">
              3 Levels
            </span>
            <span className="text-xs text-editorial-muted-fg mt-1 block">Foundational to Advanced</span>
          </div>

          <div className="card-editorial p-6 text-center">
            <span className="small-caps text-editorial-muted-fg block mb-2">Scoring Protocol</span>
            <span className="font-serif text-3xl sm:text-4xl text-editorial-fg block font-normal">
              -0.25
            </span>
            <span className="text-xs text-editorial-muted-fg mt-1 block">Negative Marking &gt;9 Err</span>
          </div>

          <div className="card-editorial p-6 text-center">
            <span className="small-caps text-editorial-muted-fg block mb-2">Live Room Latency</span>
            <span className="font-serif text-3xl sm:text-4xl text-editorial-accent block font-normal">
              &lt;100ms
            </span>
            <span className="text-xs text-editorial-muted-fg mt-1 block">Real-Time Sync Protocol</span>
          </div>
        </div>
      </section>

      {/* 4. CORE PLATFORM CAPABILITIES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rule-divider mb-8">
          <span className="small-caps text-editorial-accent">Engineered for Academic Rigor</span>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-editorial-fg font-normal">
            Precision Assessment Features
          </h2>
          <p className="text-sm text-editorial-muted-fg max-w-xl mx-auto mt-2">
            Every element of PyQuiz is designed with intentionality, balancing classical typography with cutting-edge evaluation tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Live Room Dispatch</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Broadcast assessment sessions with dedicated PIN access. Examinees connect seamlessly and synchronize countdown timers with instructor commands.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Gemini AI Calibration</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Upload syllabus PDFs or images for intelligent OCR parsing, or command Gemini 2.5 to generate custom multi-level code challenges on demand.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Proctored Anti-Cheat</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Automatic fullscreen auditing, window blur detection, and proctor event logging ensure complete integrity across live competitive examinations.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Adaptive Timers</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Configurable per-question countdown rings with audible warning ticks and automated timeout locks to test real programming agility.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Performance Dossier</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Detailed post-quiz grade sheets with cognitive difficulty breakdowns, topic mastery indices, and line-by-line editorial code explanations.
            </p>
          </div>

          <div className="card-editorial p-6 space-y-3">
            <div className="w-10 h-10 rounded-md bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-fg">Offline Archive Fallback</h3>
            <p className="text-xs text-editorial-muted-fg leading-relaxed">
              Full offline functionality with 360 curated Python questions across 12 standardized sets even when no API keys are present.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-editorial accent-top p-8 sm:p-12 text-center relative overflow-hidden">
          <span className="small-caps text-editorial-accent block mb-3">
            Begin Your Python Evaluation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-editorial-fg font-normal max-w-2xl mx-auto mb-4 leading-tight">
            Ready to Unlock Deep Python Mastery?
          </h2>
          <p className="text-sm text-editorial-muted-fg max-w-lg mx-auto mb-8 font-sans">
            Launch a proctored assessment room or configure custom curriculum questions in seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onCreateQuiz}
              className="btn-primary-serif text-sm py-3 px-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Custom Quiz</span>
            </button>
            <button
              onClick={onStartStudent}
              className="btn-secondary-serif text-sm py-3 px-6"
            >
              <span>Join with Quiz PIN</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
