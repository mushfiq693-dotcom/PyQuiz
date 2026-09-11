import React from 'react';

interface Props {
  index: number;
  optionText: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (index: number) => void;
  shortcutKey: string;
}

export const OptionButton: React.FC<Props> = ({
  index,
  optionText,
  isSelected,
  isDisabled,
  onSelect,
  shortcutKey,
}) => {
  const label = String.fromCharCode(65 + index); // 'A', 'B', 'C', 'D'

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => onSelect(index)}
      className={`group w-full p-4 rounded-lg border text-left transition-all duration-200 flex items-start space-x-3.5 focus:outline-none focus:ring-2 focus:ring-editorial-accent focus:ring-offset-2 ${
        isSelected
          ? 'bg-editorial-accent/10 border-editorial-accent text-editorial-foreground shadow-sm ring-1 ring-editorial-accent'
          : 'bg-white hover:bg-editorial-muted/50 border-editorial-border hover:border-editorial-accent-secondary text-editorial-foreground shadow-sm'
      } ${isDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer transform active:scale-[0.99]'}`}
    >
      {/* Option Key Badge */}
      <div
        className={`w-7 h-7 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
          isSelected
            ? 'bg-editorial-accent text-white shadow-sm'
            : 'bg-editorial-muted border border-editorial-border text-editorial-foreground group-hover:border-editorial-accent group-hover:text-editorial-accent'
        }`}
      >
        {label}
      </div>

      {/* Option Text */}
      <div className="flex-1 pt-0.5">
        <span className="text-sm font-mono leading-relaxed block text-editorial-foreground">
          {optionText}
        </span>
      </div>

      {/* Keyboard Shortcut Indicator */}
      <div className="hidden sm:block text-[10px] font-mono text-editorial-muted-foreground group-hover:text-editorial-foreground pt-1">
        [{shortcutKey}]
      </div>
    </button>
  );
};
