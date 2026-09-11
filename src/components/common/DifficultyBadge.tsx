import React from 'react';
import { Difficulty } from '../../data/questions/types';

interface Props {
  difficulty: Difficulty;
  className?: string;
}

export const DifficultyBadge: React.FC<Props> = ({ difficulty, className = '' }) => {
  const styles = {
    easy: 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]',
    medium: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    hard: 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
  };

  const labels = {
    easy: 'Level I · Concept',
    medium: 'Level II · Application',
    hard: 'Level III · Analysis',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] font-medium tracking-wider uppercase border ${styles[difficulty]} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          difficulty === 'easy'
            ? 'bg-[#16A34A]'
            : difficulty === 'medium'
            ? 'bg-[#D97706]'
            : 'bg-[#DC2626]'
        }`}
      />
      {labels[difficulty]}
    </span>
  );
};
