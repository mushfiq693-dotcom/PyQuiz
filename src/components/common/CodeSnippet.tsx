import React from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

interface Props {
  code?: string;
  className?: string;
  allowCopy?: boolean;
}

export const CodeSnippet: React.FC<Props> = ({ code, className = '', allowCopy = false }) => {
  const [copied, setCopied] = React.useState(false);

  if (!code) return null;

  const lines = code.split('\n');

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!allowCopy) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-lg overflow-hidden border border-editorial-border bg-editorial-card shadow-sm my-4 text-left select-none ${className}`}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-editorial-muted border-b border-editorial-border text-xs font-mono">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-1.5">
            <div className="w-2 h-2 rounded-full bg-editorial-border" />
            <div className="w-2 h-2 rounded-full bg-editorial-border" />
            <div className="w-2 h-2 rounded-full bg-editorial-border" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-editorial-accent" />
          <span className="text-editorial-fg font-semibold text-[11px] tracking-wide">python 3.10+</span>
        </div>
        {allowCopy && (
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-editorial-muted-fg hover:text-editorial-fg transition-colors px-2 py-0.5 rounded bg-editorial-card border border-editorial-border hover:border-editorial-accent"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="text-[10px]">Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed bg-editorial-card">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-editorial-muted/40 transition-colors">
                <td className="w-8 pr-4 text-right text-editorial-muted-fg/70 select-none text-xs align-top pt-0.5 font-mono">
                  {idx + 1}
                </td>
                <td className="text-editorial-fg whitespace-pre font-mono">
                  {colorizePython(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Subtle syntax high-lighter for keywords & primitives
function colorizePython(line: string): React.ReactNode {
  // If line has comment
  const commentIdx = line.indexOf('#');
  if (commentIdx !== -1) {
    const codePart = line.substring(0, commentIdx);
    const commentPart = line.substring(commentIdx);
    return (
      <>
        {renderTokens(codePart)}
        <span className="text-editorial-muted-fg/70 italic">{commentPart}</span>
      </>
    );
  }
  return renderTokens(line);
}

function renderTokens(str: string): React.ReactNode {
  const parts = str.split(/(\b(?:def|class|return|import|from|if|elif|else|for|while|try|except|finally|raise|with|as|lambda|yield|is|in|not|and|or|pass|break|continue|True|False|None)\b|"[^"]*"|'[^']*'|\d+)/g);

  return parts.map((part, i) => {
    if (
      ['def', 'class', 'return', 'import', 'from', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally', 'raise', 'with', 'as', 'lambda', 'yield', 'pass', 'break', 'continue'].includes(
        part
      )
    ) {
      return (
        <span key={i} className="text-editorial-accent font-bold">
          {part}
        </span>
      );
    }
    if (['is', 'in', 'not', 'and', 'or'].includes(part)) {
      return (
        <span key={i} className="text-amber-700 dark:text-amber-400 font-medium">
          {part}
        </span>
      );
    }
    if (['True', 'False', 'None'].includes(part)) {
      return (
        <span key={i} className="text-emerald-700 dark:text-emerald-400 font-semibold">
          {part}
        </span>
      );
    }
    if (part.startsWith('"') || part.startsWith("'")) {
      return (
        <span key={i} className="text-sky-700 dark:text-sky-400">
          {part}
        </span>
      );
    }
    if (/^\d+$/.test(part)) {
      return (
        <span key={i} className="text-purple-700 dark:text-purple-400">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

