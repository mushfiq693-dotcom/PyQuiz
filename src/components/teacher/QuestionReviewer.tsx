import React, { useState } from 'react';
import { Question, Difficulty } from '../../data/questions/types';
import { CodeSnippet } from '../common/CodeSnippet';
import { DifficultyBadge } from '../common/DifficultyBadge';
import { EditorialSelect } from '../common/EditorialSelect';
import {
  makeQuestionHarder,
  makeQuestionEasier,
  regenerateDistractors,
  regenerateQuestion,
} from '../../utils/aiQuestionModifier';
import {
  Edit3,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Trash2,
  Save,
  Plus,
  Send,
  ArrowLeft,
  Check,
} from 'lucide-react';

interface Props {
  quizTitle: string;
  sectionName: string;
  setName: string;
  timePerQuestion: number;
  negativeMarkingEnabled: boolean;
  initialQuestions: Question[];
  onPublishQuiz: (finalQuestions: Question[]) => void;
  onBack: () => void;
}

export const QuestionReviewer: React.FC<Props> = ({
  quizTitle,
  initialQuestions,
  onPublishQuiz,
  onBack,
}) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | Difficulty>('all');
  const [editDraft, setEditDraft] = useState<Question | null>(null);

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditDraft(JSON.parse(JSON.stringify(questions[index])));
  };

  const saveEditing = () => {
    if (editingIndex !== null && editDraft) {
      const updated = [...questions];
      updated[editingIndex] = editDraft;
      setQuestions(updated);
      setEditingIndex(null);
      setEditDraft(null);
    }
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditDraft(null);
  };

  const handleMakeHarder = (index: number) => {
    const updated = [...questions];
    updated[index] = makeQuestionHarder(updated[index]);
    setQuestions(updated);
  };

  const handleMakeEasier = (index: number) => {
    const updated = [...questions];
    updated[index] = makeQuestionEasier(updated[index]);
    setQuestions(updated);
  };

  const handleRegenDistractors = (index: number) => {
    const updated = [...questions];
    updated[index] = regenerateDistractors(updated[index]);
    setQuestions(updated);
  };

  const handleRegenerate = (index: number) => {
    const updated = [...questions];
    updated[index] = regenerateQuestion(updated[index]);
    setQuestions(updated);
  };

  const handleDelete = (index: number) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleAddNew = () => {
    const newQ: Question = {
      id: `custom-q-${Date.now()}`,
      question: 'New question text...',
      code: '',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      difficulty: 'medium',
      topic: 'General',
      explanation: 'Explanation for correct answer.',
    };
    setQuestions([...questions, newQ]);
    startEditing(questions.length);
  };

  const filteredQuestions = questions.filter(
    (q) => filterDifficulty === 'all' || q.difficulty === filterDifficulty
  );

  const easyCount = questions.filter((q) => q.difficulty === 'easy').length;
  const medCount = questions.filter((q) => q.difficulty === 'medium').length;
  const hardCount = questions.filter((q) => q.difficulty === 'hard').length;

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 sm:p-10 rounded-lg bg-editorial-card border border-editorial-border shadow-md text-editorial-fg">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-editorial-border">
        <div>
          <button
            onClick={onBack}
            className="flex items-center space-x-1 text-xs text-editorial-muted-fg hover:text-editorial-fg transition-colors mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Configurator</span>
          </button>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-2xl font-serif font-bold text-editorial-fg">{quizTitle}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-editorial-muted text-editorial-accent border border-editorial-border">
              {questions.length} Items
            </span>
          </div>
        </div>

        {/* Action Controls & Publish */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleAddNew}
            className="btn-secondary-serif text-xs py-2 px-3.5"
          >
            <Plus className="w-3.5 h-3.5 text-editorial-accent" />
            <span>Add Item</span>
          </button>

          <button
            onClick={() => onPublishQuiz(questions)}
            className="btn-primary-serif text-xs py-2 px-4.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Deploy Live Assessment</span>
          </button>
        </div>
      </div>

      {/* Stats and Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-6 p-3.5 rounded-md bg-editorial-muted/50 border border-editorial-border text-xs">
        {/* Breakdown counters */}
        <div className="flex items-center space-x-2 font-mono">
          <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            {easyCount} Level I
          </span>
          <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            {medCount} Level II
          </span>
          <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-semibold bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30">
            {hardCount} Level III
          </span>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center space-x-1 bg-editorial-card p-1 rounded border border-editorial-border">
          <button
            onClick={() => setFilterDifficulty('all')}
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition-all ${
              filterDifficulty === 'all'
                ? 'bg-editorial-fg text-editorial-bg shadow-sm'
                : 'text-editorial-muted-fg hover:text-editorial-fg'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterDifficulty('easy')}
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition-all ${
              filterDifficulty === 'easy'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-editorial-muted-fg hover:text-editorial-fg'
            }`}
          >
            Level I
          </button>
          <button
            onClick={() => setFilterDifficulty('medium')}
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition-all ${
              filterDifficulty === 'medium'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-editorial-muted-fg hover:text-editorial-fg'
            }`}
          >
            Level II
          </button>
          <button
            onClick={() => setFilterDifficulty('hard')}
            className={`px-2.5 py-0.5 rounded text-xs font-medium transition-all ${
              filterDifficulty === 'hard'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-editorial-muted-fg hover:text-editorial-fg'
            }`}
          >
            Level III
          </button>
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const originalIndex = questions.findIndex((item) => item.id === q.id);
          const isEditing = editingIndex === originalIndex;

          return (
            <div
              key={q.id}
              className={`rounded-lg border transition-all ${
                isEditing
                  ? 'border-editorial-accent bg-editorial-card p-6 shadow-md'
                  : 'border-editorial-border bg-editorial-card p-5 hover:border-editorial-accent/40 shadow-sm'
              }`}
            >
              {isEditing && editDraft ? (
                /* INLINE EDIT FORM */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-editorial-border">
                    <span className="font-mono text-xs font-bold text-editorial-accent">
                      Editing Item #{originalIndex + 1}
                    </span>
                    <div className="flex items-center space-x-2">
                      <EditorialSelect
                        value={editDraft.difficulty}
                        onChange={(val) =>
                          setEditDraft({ ...editDraft, difficulty: val as Difficulty })
                        }
                        size="sm"
                        className="w-36"
                        options={[
                          { value: 'easy', label: 'Level I (Easy)' },
                          { value: 'medium', label: 'Level II (Medium)' },
                          { value: 'hard', label: 'Level III (Hard)' },
                        ]}
                      />
                      <input
                        type="text"
                        value={editDraft.topic}
                        onChange={(e) => setEditDraft({ ...editDraft, topic: e.target.value })}
                        placeholder="Topic"
                        className="input-editorial text-xs py-1 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={editDraft.question}
                      onChange={(e) => setEditDraft({ ...editDraft, question: e.target.value })}
                      placeholder="Question text"
                      className="input-editorial w-full font-serif text-sm"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={editDraft.code || ''}
                      onChange={(e) => setEditDraft({ ...editDraft, code: e.target.value })}
                      placeholder="Python Code (optional)"
                      className="input-editorial w-full font-mono text-xs"
                    />
                  </div>

                  {/* 4 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {editDraft.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`flex items-center space-x-2 p-2.5 rounded-md border ${
                          editDraft.correctAnswer === optIdx
                            ? 'border-emerald-500/50 bg-emerald-500/10'
                            : 'border-editorial-border bg-editorial-card'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`correct-ans-${editDraft.id}`}
                          checked={editDraft.correctAnswer === optIdx}
                          onChange={() => setEditDraft({ ...editDraft, correctAnswer: optIdx })}
                          className="accent-editorial-accent cursor-pointer"
                        />
                        <span className="text-xs font-bold text-editorial-muted-fg font-mono">
                          {String.fromCharCode(65 + optIdx)}:
                        </span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const nextOpts = [...editDraft.options];
                            nextOpts[optIdx] = e.target.value;
                            setEditDraft({ ...editDraft, options: nextOpts as any });
                          }}
                          className="flex-1 bg-transparent text-xs text-editorial-fg focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={editDraft.explanation}
                      onChange={(e) => setEditDraft({ ...editDraft, explanation: e.target.value })}
                      placeholder="Technical Explanation"
                      className="input-editorial w-full text-xs"
                    />
                  </div>

                  {/* Save/Cancel Buttons */}
                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="btn-secondary-serif text-xs py-1.5 px-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={saveEditing}
                      className="btn-primary-serif text-xs py-1.5 px-4"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* READ-ONLY CARD VIEW */
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-editorial-border">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs font-bold text-editorial-muted-fg">
                        #{originalIndex + 1 < 10 ? `0${originalIndex + 1}` : originalIndex + 1}
                      </span>
                      <DifficultyBadge difficulty={q.difficulty} />
                      <span className="text-xs font-mono font-medium text-editorial-muted-fg bg-editorial-muted px-2 py-0.5 rounded border border-editorial-border">
                        {q.topic}
                      </span>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleMakeEasier(originalIndex)}
                        title="Calibrate to Lower Difficulty"
                        className="p-1.5 rounded hover:bg-editorial-muted text-editorial-muted-fg hover:text-emerald-600 transition-colors"
                      >
                        <TrendingDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleMakeHarder(originalIndex)}
                        title="Calibrate to Higher Difficulty"
                        className="p-1.5 rounded hover:bg-editorial-muted text-editorial-muted-fg hover:text-rose-600 transition-colors"
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleRegenDistractors(originalIndex)}
                        title="Regenerate Distractors (Options)"
                        className="p-1.5 rounded hover:bg-editorial-muted text-editorial-muted-fg hover:text-editorial-accent transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleRegenerate(originalIndex)}
                        title="Regenerate Whole Question"
                        className="p-1.5 rounded hover:bg-editorial-muted text-editorial-muted-fg hover:text-editorial-accent transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => startEditing(originalIndex)}
                        title="Edit Question"
                        className="p-1.5 rounded hover:bg-editorial-muted text-editorial-muted-fg hover:text-editorial-fg transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {questions.length > 1 && (
                        <button
                          onClick={() => handleDelete(originalIndex)}
                          title="Delete Question"
                          className="p-1.5 rounded hover:bg-rose-500/10 text-editorial-muted-fg hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <h4 className="font-serif text-sm sm:text-base font-bold text-editorial-fg mt-3 leading-snug">
                    {q.question}
                  </h4>

                  {/* Code snippet if any */}
                  {q.code && <CodeSnippet code={q.code} allowCopy={false} />}

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = q.correctAnswer === optIdx;
                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-md border text-xs flex items-start space-x-2 ${
                            isCorrect
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-medium'
                              : 'border-editorial-border bg-editorial-muted/40 text-editorial-fg'
                          }`}
                        >
                          <span className="font-mono font-bold text-[11px] shrink-0 text-editorial-muted-fg">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="flex-1 font-mono text-[11px]">{opt}</span>
                          {isCorrect && (
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="mt-3 p-3 rounded-md bg-editorial-muted/50 border border-editorial-border text-xs text-editorial-muted-fg leading-relaxed">
                    <strong className="text-editorial-fg block font-serif font-semibold text-[11px] mb-0.5">
                      Technical Assessment Note:
                    </strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
