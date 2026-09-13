import React, { useState, useEffect, useRef } from 'react';
import { syllabusSections, getQuizSetById, generateCustomQuiz } from '../../data/questions';
import { Question, QuizSet } from '../../data/questions/types';
import { SyllabusAttachment } from '../../utils/aiQuestionModifier';
import {
  DEFAULT_PYTHON_MODULES,
  SyllabusModule,
  getSelectedTopicsSummary,
} from '../../types/syllabus';
import { ModuleTopicSelector } from './ModuleTopicSelector';
import {
  generateQuestionsWithGemini,
  extractTopicsFromAttachment,
  isGeminiConfigured,
  normalizeMimeType,
} from '../../utils/geminiApi';
import { AISettingsModal } from '../common/AISettingsModal';
import { EditorialSelect } from '../common/EditorialSelect';
import {
  Sparkles,
  ArrowRight,
  Wand2,
  BookOpen,
  Clock,
  Key,
  Bot,
  Upload,
  FileText,
  Trash2,
  FileUp,
  Loader2,
} from 'lucide-react';

interface Props {
  initialSet?: QuizSet | null;
  onProceedToReview: (config: {
    quizTitle: string;
    sectionName: string;
    setName: string;
    timePerQuestion: number;
    negativeMarkingEnabled: boolean;
    questions: Question[];
  }) => void;
  onCancel: () => void;
}

export const QuizCreator: React.FC<Props> = ({
  initialSet,
  onProceedToReview,
  onCancel,
}) => {
  const [mode, setMode] = useState<'ai' | 'syllabus'>('ai');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [showAiSettingsModal, setShowAiSettingsModal] = useState<boolean>(false);
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(false);

  useEffect(() => {
    setHasGeminiKey(isGeminiConfigured());
  }, []);

  const refreshAiStatus = () => {
    setHasGeminiKey(isGeminiConfigured());
  };

  // Syllabus Mode State (Pre-made sets)
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    initialSet?.sectionId || syllabusSections[0].id
  );
  const [selectedSetId, setSelectedSetId] = useState<string>(
    initialSet?.id || syllabusSections[0].sets[0].id
  );

  // Dynamic Custom Topics & Structured Modules
  const [modules, setModules] = useState<SyllabusModule[]>(() =>
    JSON.parse(JSON.stringify(DEFAULT_PYTHON_MODULES))
  );
  const [topics, setTopics] = useState<string[]>([]);

  // Syllabus Attachment (Image or PDF)
  const [attachment, setAttachment] = useState<SyllabusAttachment | null>(null);
  const [isExtractingTopics, setIsExtractingTopics] = useState<boolean>(false);
  const [extractionMessage, setExtractionMessage] = useState<string>('');
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generation Tuning
  const [questionStyle, setQuestionStyle] = useState<
    'all' | 'code-tracing' | 'conceptual' | 'error-handling' | 'edge-cases'
  >('all');

  const [difficultyPreset, setDifficultyPreset] = useState<'balanced' | 'beginner' | 'advanced' | 'custom'>('balanced');
  const [easyCount, setEasyCount] = useState<number>(10);
  const [mediumCount, setMediumCount] = useState<number>(10);
  const [hardCount, setHardCount] = useState<number>(10);
  const [customKeywords, setCustomKeywords] = useState<string>('');

  // Delivery Options
  const [timePerQuestion, setTimePerQuestion] = useState<number>(20);
  const [negativeMarking, setNegativeMarking] = useState<boolean>(true);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');

  const currentSection = syllabusSections.find((s) => s.id === selectedSectionId);
  const totalQuestions = mode === 'ai' ? easyCount + mediumCount + hardCount : 30;

  // Process File (Image, PDF, or Text)
  const processUploadedFile = (file: File) => {
    const rawMime = file.type || '';
    const mimeType = normalizeMimeType(file.name, rawMime);
    const isImage = mimeType.startsWith('image/');
    const isPdf = mimeType === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isImage && !isPdf && !mimeType.includes('text')) {
      alert('Please upload an image (PNG, JPG, WEBP) or PDF syllabus document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const resultStr = reader.result as string;
      let base64Data = resultStr.includes('base64,') ? resultStr.split('base64,')[1] : resultStr;
      base64Data = base64Data.replace(/[\r\n\s]+/g, '');

      const newAttachment: SyllabusAttachment = {
        name: file.name,
        size: file.size,
        mimeType: mimeType,
        base64Data: base64Data,
        previewUrl: isImage ? resultStr : undefined,
      };

      setAttachment(newAttachment);
      setExtractionMessage('');

      // Auto-extract topics immediately if Gemini is configured
      if (isGeminiConfigured()) {
        setIsExtractingTopics(true);
        setExtractionMessage(`Scanning "${file.name}" with Gemini AI...`);
        try {
          const res = await extractTopicsFromAttachment(newAttachment);
          setIsExtractingTopics(false);
          if (res.success && res.modules && res.modules.length > 0) {
            setModules(res.modules);
            setTopics(res.topics);
            setExtractionMessage(`Auto-extracted ${res.modules.length} modules & ${res.topics.length} topics from "${file.name}"!`);
          } else if (res.success && res.topics.length > 0) {
            setTopics((prev) => Array.from(new Set([...prev, ...res.topics])));
            setExtractionMessage(`Auto-extracted ${res.topics.length} topics from "${file.name}"!`);
          } else {
            setExtractionMessage(res.message || 'Attached document ready for question generation.');
          }
        } catch (err: any) {
          setIsExtractingTopics(false);
          setExtractionMessage(err?.message || 'Error analyzing document.');
        }
      } else {
        setExtractionMessage('Document attached. Configure Gemini API key to auto-extract topics.');
      }
    };

    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processUploadedFile(file);
  };

  // Manual Trigger to Auto-Extract Topics from Attached Document
  const handleExtractTopics = async () => {
    if (!attachment) return;
    if (!hasGeminiKey) {
      setShowAiSettingsModal(true);
      return;
    }

    setIsExtractingTopics(true);
    setExtractionMessage('Scanning document and extracting curriculum modules with Gemini AI...');

    const res = await extractTopicsFromAttachment(attachment);
    setIsExtractingTopics(false);

    if (res.success && res.modules && res.modules.length > 0) {
      setModules(res.modules);
      setTopics(res.topics);
      setExtractionMessage(`Successfully extracted ${res.modules.length} modules & ${res.topics.length} topics from "${attachment.name}"!`);
    } else if (res.success && res.topics.length > 0) {
      const merged = Array.from(new Set([...topics, ...res.topics]));
      setTopics(merged);
      setExtractionMessage(`Successfully extracted ${res.topics.length} topics from "${attachment.name}"!`);
    } else {
      setExtractionMessage(res.message || 'Could not extract topics. Please check your Gemini API key.');
    }
  };

  // Preset Question Counts & Difficulty Profiles
  const applyCountPreset = (total: number) => {
    if (difficultyPreset === 'beginner') {
      const easy = Math.round(total * 0.6);
      const med = Math.round(total * 0.3);
      const hard = Math.max(1, total - easy - med);
      setEasyCount(easy);
      setMediumCount(med);
      setHardCount(hard);
    } else if (difficultyPreset === 'advanced') {
      const hard = Math.round(total * 0.6);
      const med = Math.round(total * 0.3);
      const easy = Math.max(1, total - hard - med);
      setEasyCount(easy);
      setMediumCount(med);
      setHardCount(hard);
    } else {
      const base = Math.floor(total / 3);
      const rem = total % 3;
      setEasyCount(base + (rem > 0 ? 1 : 0));
      setMediumCount(base + (rem > 1 ? 1 : 0));
      setHardCount(base);
    }
  };

  const applyDifficultyPreset = (preset: 'balanced' | 'beginner' | 'advanced' | 'custom') => {
    setDifficultyPreset(preset);
    const currentTotal = easyCount + mediumCount + hardCount;
    if (preset === 'balanced') {
      const base = Math.floor(currentTotal / 3);
      const rem = currentTotal % 3;
      setEasyCount(base + (rem > 0 ? 1 : 0));
      setMediumCount(base + (rem > 1 ? 1 : 0));
      setHardCount(base);
    } else if (preset === 'beginner') {
      const easy = Math.round(currentTotal * 0.6);
      const med = Math.round(currentTotal * 0.3);
      const hard = Math.max(1, currentTotal - easy - med);
      setEasyCount(easy);
      setMediumCount(med);
      setHardCount(hard);
    } else if (preset === 'advanced') {
      const hard = Math.round(currentTotal * 0.6);
      const med = Math.round(currentTotal * 0.3);
      const easy = Math.max(1, currentTotal - hard - med);
      setEasyCount(easy);
      setMediumCount(med);
      setHardCount(hard);
    }
  };

  const handleCreate = async () => {
    if (mode === 'syllabus') {
      const foundSet = getQuizSetById(selectedSetId);
      const questions = foundSet ? [...foundSet.questions] : generateCustomQuiz({ sectionId: selectedSectionId });
      const sectionName = foundSet?.sectionName || 'Section';
      const setName = foundSet?.setName || 'Set';

      onProceedToReview({
        quizTitle: customTitle.trim() || `${sectionName} - ${setName}`,
        sectionName,
        setName,
        timePerQuestion,
        negativeMarkingEnabled: negativeMarking,
        questions,
      });
    } else {
      setIsGenerating(true);
      setGenerationStatus(hasGeminiKey ? 'Synthesizing assessment questions with Google Gemini...' : 'Compiling from Question Archive...');

      try {
        const { questions: generatedQs, source } = await generateQuestionsWithGemini({
          selectedTopics: topics,
          selectedModules: modules,
          customTopics: [],
          attachment: attachment || undefined,
          questionStyle,
          easyCount,
          mediumCount,
          hardCount,
          customKeywords,
          shuffleQuestions,
          shuffleOptions,
        });

        setIsGenerating(false);
        onProceedToReview({
          quizTitle:
            customTitle.trim() ||
            (source === 'gemini'
              ? `Python Assessment (${totalQuestions} Questions)`
              : `Python Assessment (${totalQuestions} Questions)`),
          sectionName: source === 'gemini' ? 'Google Gemini 2.5 Synthesis' : 'Curated Archive Engine',
          setName: `${easyCount}E · ${mediumCount}M · ${hardCount}H`,
          timePerQuestion,
          negativeMarkingEnabled: negativeMarking,
          questions: generatedQs,
        });
      } catch {
        setIsGenerating(false);
      }
    }
  };

  return (
    <>
      <div className="card-editorial max-w-5xl mx-auto my-4 sm:my-10 p-4 sm:p-8 md:p-10 shadow-md text-editorial-fg">
        {/* Header & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-editorial-border">
          <div>
            <span className="small-caps text-[10px] text-editorial-accent">
              Assessment Design Studio
            </span>
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-editorial-fg">
                Configure Assessment
              </h2>
              {mode === 'ai' && (
                <button
                  type="button"
                  onClick={() => setShowAiSettingsModal(true)}
                  className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border flex items-center space-x-1 transition-all ${
                    hasGeminiKey
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                      : 'bg-editorial-muted text-editorial-muted-fg border-editorial-border hover:text-editorial-fg'
                  }`}
                >
                  <Bot className="w-3 h-3 text-editorial-accent" />
                  <span>{hasGeminiKey ? 'Gemini 2.5 Live' : 'AI Setup'}</span>
                  <Key className="w-2.5 h-2.5 ml-0.5 opacity-60" />
                </button>
              )}
            </div>
            <p className="text-xs text-editorial-muted-fg mt-1 font-sans">
              Calibrate syllabus topics, upload curriculum documents, or deploy standard sets.
            </p>
          </div>

          <div className="flex p-1 bg-editorial-muted rounded-md border border-editorial-border self-start sm:self-auto">
            <button
              onClick={() => setMode('ai')}
              className={`px-3 sm:px-3.5 py-1.5 rounded text-xs font-medium transition-all flex items-center space-x-1 ${
                mode === 'ai'
                  ? 'bg-editorial-card text-editorial-fg shadow-xs border border-editorial-border'
                  : 'text-editorial-muted-fg hover:text-editorial-fg'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 mr-1 text-editorial-accent" />
              <span>Generative Studio</span>
            </button>
            <button
              onClick={() => setMode('syllabus')}
              className={`px-3 sm:px-3.5 py-1.5 rounded text-xs font-medium transition-all flex items-center space-x-1 ${
                mode === 'syllabus'
                  ? 'bg-editorial-card text-editorial-fg shadow-xs border border-editorial-border'
                  : 'text-editorial-muted-fg hover:text-editorial-fg'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-editorial-accent" />
              <span>Standard Sets</span>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          {/* Assessment Title */}
          <div>
            <label className="block font-mono text-xs font-medium text-editorial-muted-fg uppercase tracking-[0.15em] mb-1.5">
              Assessment Title
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={
                mode === 'ai'
                  ? 'e.g. Python Diagnostic & Language Runtime Evaluation'
                  : 'e.g. Midterm Examination · Section I'
              }
              className="input-editorial w-full font-serif text-base sm:text-sm font-medium"
            />
          </div>

          {mode === 'ai' ? (
            /* ======================== AI GENERATION OPTIONS ======================== */
            <div className="space-y-8">
              {/* 1. TOP CONTROLS: SYLLABUS OCR UPLOADER & QUESTION PARADIGM (SAME ROW) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {/* 1A. COMPACT SYLLABUS ATTACHMENT UPLOADER (IMAGE OR PDF) */}
                <div className="p-3 sm:p-3.5 rounded-lg bg-editorial-muted/40 border border-editorial-border flex flex-col justify-center">
                  {attachment ? (
                    /* Compact Attached File Card */
                    <div className="p-2 rounded-md bg-editorial-card border border-editorial-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        {attachment.previewUrl ? (
                          <img
                            src={attachment.previewUrl}
                            alt="Syllabus Preview"
                            className="w-8 h-8 object-cover rounded border border-editorial-border shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-editorial-muted border border-editorial-border flex items-center justify-center text-editorial-accent shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="text-xs font-serif font-bold text-editorial-fg block truncate max-w-[140px] sm:max-w-[180px]">
                            {attachment.name}
                          </span>
                          <span className="text-[10px] text-editorial-muted-fg font-mono">
                            {(attachment.size / 1024).toFixed(1)} KB · OCR Ready
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={handleExtractTopics}
                          disabled={isExtractingTopics}
                          className="btn-primary-serif text-[11px] py-1 px-2.5 disabled:opacity-50 flex items-center space-x-1"
                        >
                          {isExtractingTopics ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Scanning...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              <span>Scan Matrix</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAttachment(null);
                            setExtractionMessage('');
                          }}
                          className="p-1 rounded text-editorial-muted-fg hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                          title="Remove attachment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Compact Dropzone */
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingFile(true);
                      }}
                      onDragLeave={() => setIsDraggingFile(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingFile(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) processUploadedFile(file);
                      }}
                      className={`h-full min-h-[46px] py-1.5 px-3 sm:py-2 sm:px-3.5 border border-dashed rounded-md transition-all cursor-pointer flex items-center justify-between gap-2 group ${
                        isDraggingFile
                          ? 'border-editorial-accent bg-editorial-accent/10'
                          : 'border-editorial-border hover:border-editorial-accent bg-editorial-card'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf,.txt,.md"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="flex items-center space-x-2 min-w-0">
                        <div className="p-1 rounded bg-editorial-muted text-editorial-accent group-hover:bg-editorial-accent group-hover:text-editorial-bg transition-colors shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-serif font-bold text-editorial-fg block truncate">
                            Upload Syllabus (OCR)
                          </span>
                          <p className="text-[10px] text-editorial-muted-fg font-sans truncate">
                            PNG, JPG, PDF auto-extract
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-editorial-muted text-editorial-accent border border-editorial-border shrink-0 font-medium">
                        Browse
                      </span>
                    </div>
                  )}

                  {extractionMessage && (
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 p-1.5 rounded-md flex items-center space-x-1.5 font-mono mt-1.5 truncate">
                      <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{extractionMessage}</span>
                    </p>
                  )}
                </div>

                {/* 1B. QUESTION PARADIGM SELECTOR */}
                <div className="p-3 sm:p-3.5 rounded-lg bg-editorial-muted/40 border border-editorial-border flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-xs font-medium text-editorial-fg uppercase tracking-[0.15em]">
                      Question Paradigm
                    </label>
                  </div>
                  <div className="w-full">
                    <EditorialSelect
                      value={questionStyle}
                      onChange={(val) => setQuestionStyle(val as any)}
                      options={[
                        { value: 'all', label: 'Balanced / Comprehensive Mix', sublabel: 'Harmonious blend across syntax rules and code analysis.' },
                        { value: 'code-tracing', label: 'Code Output Tracing (Predict stdout)', sublabel: 'Direct focus on predictive code execution.' },
                        { value: 'conceptual', label: 'Language Semantics & Scope Rules', sublabel: 'Focus on mutability, scopes, and keywords.' },
                        { value: 'error-handling', label: 'Exceptions & Runtime Faults', sublabel: 'Focus on TypeError, IndexError, and try-except.' },
                        { value: 'edge-cases', label: 'Subtle Gotchas & Corner Cases', sublabel: 'Focus on tricky Python subtleties and traps.' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* 2. CURRICULUM MODULES & TOPICS WORKSPACE (4-Quadrant Module Architecture) */}
              <ModuleTopicSelector modules={modules} onChange={setModules} />

              {/* 4. Question Count & Difficulty Allocation */}
              <div className="p-5 rounded-lg bg-editorial-muted/40 border border-editorial-border space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-editorial-border">
                  <div>
                    <span className="font-mono text-xs font-medium text-editorial-fg uppercase tracking-[0.15em]">
                      Total Assessment Items: <strong className="text-editorial-accent font-serif text-base">{totalQuestions} Qs</strong>
                    </span>
                  </div>

                  {/* Question Count Presets */}
                  <div className="flex items-center space-x-1.5 bg-editorial-card p-1 rounded-md border border-editorial-border text-xs">
                    <span className="font-mono text-[10px] text-editorial-muted-fg px-1.5">Preset:</span>
                    {[10, 15, 20, 30].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => applyCountPreset(cnt)}
                        className={`px-2 py-0.5 rounded font-mono transition-all ${
                          totalQuestions === cnt
                            ? 'bg-editorial-accent text-editorial-bg font-bold shadow-sm'
                            : 'text-editorial-muted-fg hover:text-editorial-fg'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Ratio Selector */}
                <div className="flex flex-wrap gap-2">
                  <span className="font-mono text-[11px] text-editorial-muted-fg uppercase tracking-wider self-center mr-1">
                    Profile:
                  </span>
                  {[
                    { id: 'balanced', label: 'Balanced (1:1:1)' },
                    { id: 'beginner', label: 'Foundational (60% Level I)' },
                    { id: 'advanced', label: 'Rigorous (60% Level III)' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => applyDifficultyPreset(item.id as any)}
                      className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                        difficultyPreset === item.id
                          ? 'bg-editorial-accent/15 border-editorial-accent text-editorial-accent font-semibold'
                          : 'bg-editorial-card border-editorial-border text-editorial-muted-fg hover:text-editorial-fg'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Sliders for Easy / Med / Hard */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                  <div className="p-3.5 rounded-md bg-editorial-card border border-editorial-border">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold font-mono text-[11px] uppercase tracking-wider">Level I</span>
                      <span className="font-serif font-bold text-editorial-fg">{easyCount}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={easyCount}
                      onChange={(e) => {
                        setEasyCount(Number(e.target.value));
                        setDifficultyPreset('custom');
                      }}
                      className="w-full accent-emerald-600 dark:accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 rounded-md bg-editorial-card border border-editorial-border">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-amber-700 dark:text-amber-400 font-semibold font-mono text-[11px] uppercase tracking-wider">Level II</span>
                      <span className="font-serif font-bold text-editorial-fg">{mediumCount}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={mediumCount}
                      onChange={(e) => {
                        setMediumCount(Number(e.target.value));
                        setDifficultyPreset('custom');
                      }}
                      className="w-full accent-amber-600 dark:accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 rounded-md bg-editorial-card border border-editorial-border">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-rose-700 dark:text-rose-400 font-semibold font-mono text-[11px] uppercase tracking-wider">Level III</span>
                      <span className="font-serif font-bold text-editorial-fg">{hardCount}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={hardCount}
                      onChange={(e) => {
                        setHardCount(Number(e.target.value));
                        setDifficultyPreset('custom');
                      }}
                      className="w-full accent-rose-600 dark:accent-rose-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ======================== SYLLABUS SET SELECTION ======================== */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-4 sm:p-5 rounded-lg bg-editorial-muted/40 border border-editorial-border space-y-2">
                <label className="block font-mono text-xs font-medium text-editorial-muted-fg uppercase tracking-[0.15em]">
                  Curriculum Module
                </label>
                <EditorialSelect
                  value={selectedSectionId}
                  onChange={(val) => {
                    setSelectedSectionId(val);
                    const sec = syllabusSections.find((s) => s.id === val);
                    if (sec && sec.sets.length > 0) {
                      setSelectedSetId(sec.sets[0].id);
                    }
                  }}
                  options={syllabusSections.map((sec) => ({
                    value: sec.id,
                    label: `${sec.name}: ${sec.title}`,
                    badge: `${sec.sets.length} Sets`,
                    sublabel: sec.description,
                  }))}
                />
              </div>

              <div className="p-4 sm:p-5 rounded-lg bg-editorial-muted/40 border border-editorial-border space-y-2">
                <label className="block font-mono text-xs font-medium text-editorial-muted-fg uppercase tracking-[0.15em]">
                  Standard Set (30 Items)
                </label>
                <EditorialSelect
                  value={selectedSetId}
                  onChange={(val) => setSelectedSetId(val)}
                  options={(currentSection?.sets || []).map((set) => ({
                    value: set.id,
                    label: set.setName,
                    badge: '30 Qs',
                    sublabel: set.description,
                  }))}
                />
              </div>
            </div>
          )}

          {/* ======================== DELIVERY & EXAM RULES ======================== */}
          <div className="p-4 sm:p-5 rounded-lg bg-editorial-muted/40 border border-editorial-border space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-editorial-border">
              <Clock className="w-4 h-4 text-editorial-accent" />
              <span className="font-mono text-xs font-medium text-editorial-fg uppercase tracking-[0.15em]">
                Examination Protocol & Rules
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Timer per question */}
              <div className="p-3.5 sm:p-4 rounded-md bg-editorial-card border border-editorial-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-editorial-fg">
                    Countdown Timer per Item
                  </span>
                  <span className="font-mono text-xs font-bold text-editorial-accent">
                    {timePerQuestion}s
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={timePerQuestion}
                  onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                  className="w-full accent-editorial-accent cursor-pointer"
                />
              </div>

              {/* Negative Marking Toggle */}
              <div className="p-3.5 sm:p-4 rounded-md bg-editorial-card border border-editorial-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-editorial-fg block">
                    Negative Penalty Calibration
                  </span>
                  <span className="text-[11px] text-editorial-muted-fg">
                    {negativeMarking ? '-0.25 penalty on >30% incorrect' : 'No penalty deductions'}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negativeMarking}
                    onChange={(e) => setNegativeMarking(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-editorial-muted border border-editorial-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-editorial-accent"></div>
                </label>
              </div>
            </div>

            {/* Randomization toggles (AI Mode) */}
            {mode === 'ai' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center space-x-2.5 p-3 rounded-md bg-editorial-card border border-editorial-border cursor-pointer text-xs text-editorial-fg">
                  <input
                    type="checkbox"
                    checked={shuffleQuestions}
                    onChange={(e) => setShuffleQuestions(e.target.checked)}
                    className="rounded border-editorial-border text-editorial-accent focus:ring-editorial-accent"
                  />
                  <span>Permute Question Sequence</span>
                </label>

                <label className="flex items-center space-x-2.5 p-3 rounded-md bg-editorial-card border border-editorial-border cursor-pointer text-xs text-editorial-fg">
                  <input
                    type="checkbox"
                    checked={shuffleOptions}
                    onChange={(e) => setShuffleOptions(e.target.checked)}
                    className="rounded border-editorial-border text-editorial-accent focus:ring-editorial-accent"
                  />
                  <span>Permute Multiple-Choice Distractors (A/B/C/D)</span>
                </label>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-editorial-border">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary-serif text-xs py-2.5 px-4 text-center justify-center"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleCreate}
              disabled={isGenerating}
              className="btn-primary-serif text-xs py-2.5 px-6 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>{generationStatus || `Compiling ${totalQuestions} Questions...`}</span>
                </>
              ) : (
                <>
                  <span>Compile & Review Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI Key Configuration Modal */}
      <AISettingsModal
        isOpen={showAiSettingsModal}
        onClose={() => setShowAiSettingsModal(false)}
        onKeyUpdated={refreshAiStatus}
      />
    </>
  );
};
