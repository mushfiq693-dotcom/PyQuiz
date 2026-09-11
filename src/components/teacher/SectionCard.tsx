import React from 'react';
import { SyllabusSection, QuizSet } from '../../data/questions/types';
import { Terminal, Cpu, Layers, ShieldAlert, ChevronRight, Play, Sparkles } from 'lucide-react';

interface Props {
  section: SyllabusSection;
  onSelectSet: (set: QuizSet) => void;
  onQuickStartSet: (set: QuizSet) => void;
}

export const SectionCard: React.FC<Props> = ({ section, onSelectSet, onQuickStartSet }) => {
  const [expanded, setExpanded] = React.useState(false);

  const getIcon = () => {
    switch (section.icon) {
      case 'Terminal':
        return Terminal;
      case 'Cpu':
        return Cpu;
      case 'Layers':
        return Layers;
      default:
        return ShieldAlert;
    }
  };

  const Icon = getIcon();
  const totalQuestions = section.sets.reduce((sum, s) => sum + s.questions.length, 0);

  return (
    <div className="card-editorial p-6 transition-all hover:border-editorial-accent/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Section Info */}
        <div className="flex items-start space-x-4">
          <div className="p-2.5 rounded-md bg-editorial-muted border border-editorial-border text-editorial-accent shrink-0 mt-0.5">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="small-caps text-[10px] text-editorial-accent bg-editorial-muted px-2 py-0.5 rounded border border-editorial-border">
                {section.name}
              </span>
              <span className="text-xs text-editorial-muted-fg font-mono">
                {section.sets.length} Standard Sets · {totalQuestions} Questions
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-editorial-fg mt-1.5">{section.title}</h3>
            <p className="text-xs text-editorial-muted-fg mt-1 leading-relaxed max-w-2xl">{section.description}</p>
          </div>
        </div>

        {/* Right Action Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn-secondary-serif text-xs py-1.5 px-3 self-start sm:self-auto shrink-0"
        >
          <span>{expanded ? 'Collapse Sets' : 'Explore Sets'}</span>
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      {/* Expanded Sets List */}
      {expanded && (
        <div className="mt-5 pt-5 border-t border-editorial-border grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {section.sets.map((quizSet) => (
            <div
              key={quizSet.id}
              className="p-4 rounded-md bg-editorial-muted/40 border border-editorial-border hover:border-editorial-accent transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-editorial-fg">
                    {quizSet.setName}
                  </span>
                  <span className="text-[11px] text-editorial-muted-fg font-mono">
                    30 Questions
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-2 text-[10px] text-editorial-muted-fg font-mono">
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold">10 Easy</span> ·
                  <span className="text-amber-700 dark:text-amber-300 font-semibold">10 Med</span> ·
                  <span className="text-rose-700 dark:text-rose-300 font-semibold">10 Hard</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-editorial-border flex items-center gap-2">
                <button
                  onClick={() => onSelectSet(quizSet)}
                  className="w-full py-1.5 px-3 rounded text-xs font-medium bg-editorial-card text-editorial-fg border border-editorial-border hover:border-editorial-accent hover:text-editorial-accent transition-all flex items-center justify-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>Configure / Review</span>
                </button>
                <button
                  onClick={() => onQuickStartSet(quizSet)}
                  title="Direct Launch Live Session"
                  className="p-1.5 rounded bg-editorial-accent text-editorial-bg hover:bg-editorial-accent-light transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
