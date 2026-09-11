import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
}

interface Props {
  options: (SelectOption | string)[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const EditorialSelect: React.FC<Props> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  label,
  disabled = false,
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block font-mono text-xs font-medium text-editorial-muted-fg uppercase tracking-[0.15em] mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-md border text-left transition-all font-sans ${
          size === 'sm' ? 'py-1 px-2.5 text-xs' : 'py-2 px-3 text-xs sm:text-sm'
        } ${
          isOpen
            ? 'border-editorial-accent bg-editorial-card shadow-sm ring-2 ring-editorial-accent/20 text-editorial-fg'
            : 'border-editorial-border bg-editorial-card hover:border-editorial-accent text-editorial-fg'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className="truncate block pr-2">
          {selectedOption ? (
            <span className="flex items-center space-x-2">
              <span className="font-medium text-editorial-fg">{selectedOption.label}</span>
              {selectedOption.badge && (
                <span className="px-1.5 py-0.2 rounded font-mono text-[10px] bg-editorial-muted text-editorial-accent border border-editorial-border">
                  {selectedOption.badge}
                </span>
              )}
            </span>
          ) : (
            <span className="text-editorial-muted-fg/70">{placeholder}</span>
          )}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-editorial-accent shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-editorial-accent' : 'text-editorial-muted-fg'
          }`}
        />
      </button>

      {/* Custom Popover Options Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 max-h-64 overflow-y-auto rounded-md bg-editorial-card border border-editorial-border shadow-xl py-1 text-xs sm:text-sm animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-editorial-accent/15 text-editorial-fg font-semibold'
                    : 'text-editorial-fg hover:bg-editorial-muted/70 hover:text-editorial-accent'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="truncate">{opt.label}</span>
                    {opt.badge && (
                      <span className="px-1.5 py-0.5 rounded font-mono text-[9px] bg-editorial-muted text-editorial-accent border border-editorial-border shrink-0">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {opt.sublabel && (
                    <span className="text-[11px] text-editorial-muted-fg font-mono mt-0.5 truncate">
                      {opt.sublabel}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-editorial-accent shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
