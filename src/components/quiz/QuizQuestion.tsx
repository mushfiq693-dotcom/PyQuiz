import React from 'react';
import { Question } from '../../data/questions/types';
import { CodeSnippet } from '../common/CodeSnippet';
import { DifficultyBadge } from '../common/DifficultyBadge';
import { OptionButton } from './OptionButton';

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  isDisabled: boolean;
  onSelectOption: (optionIndex: number) => void;
}

export const QuizQuestion: React.FC<Props> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  isDisabled,
  onSelectOption,
}) => {
  return (
    <fieldset className="w-full border-0 p-0 m-0">
      <legend className="sr-only">
        Question {questionNumber} of {totalQuestions}: {question.question}
      </legend>

      {/* Question Header Meta */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-editorial-border">
        <div className="flex items-center space-x-2">
          <span className="small-caps px-2.5 py-1 rounded bg-editorial-muted text-editorial-foreground border border-editorial-border">
            Question {questionNumber} of {totalQuestions}
          </span>
          <DifficultyBadge difficulty={question.difficulty} />
        </div>

        <span className="text-xs font-mono text-editorial-muted-foreground bg-editorial-muted/60 px-2.5 py-1 rounded border border-editorial-border">
          Topic: #{question.topic}
        </span>
      </div>

      {/* Question Statement */}
      <div className="mb-6">
        <h3 className="font-serif text-lg sm:text-xl font-normal text-editorial-foreground leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Code Block if any */}
      {question.code && (
        <div className="my-5">
          <CodeSnippet code={question.code} allowCopy={false} />
        </div>
      )}

      {/* 4 Option Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8">
        {question.options.map((opt, idx) => (
          <OptionButton
            key={idx}
            index={idx}
            optionText={opt}
            isSelected={selectedOption === idx}
            isDisabled={isDisabled}
            onSelect={onSelectOption}
            shortcutKey={String.fromCharCode(65 + idx)}
          />
        ))}
      </div>
    </fieldset>
  );
};
