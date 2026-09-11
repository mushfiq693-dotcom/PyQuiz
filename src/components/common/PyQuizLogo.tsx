import React from 'react';

interface PyQuizLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'emblem' | 'badge' | 'plain';
  showAura?: boolean;
}

export const PyQuizLogo: React.FC<PyQuizLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'badge',
  showAura = false,
}) => {
  // Size dimensions
  const sizeMap = {
    xs: { box: 'w-7 h-7', img: 'w-6 h-6' },
    sm: { box: 'w-9 h-9', img: 'w-8 h-8' },
    md: { box: 'w-11 h-11 sm:w-12 sm:h-12', img: 'w-10 h-10 sm:w-11 sm:h-11' },
    lg: { box: 'w-16 h-16 sm:w-20 sm:h-20', img: 'w-14 h-14 sm:w-18 sm:h-18' },
    xl: { box: 'w-24 h-24 sm:w-28 sm:h-28', img: 'w-22 h-22 sm:w-26 sm:h-26' },
    '2xl': { box: 'w-32 h-32 sm:w-36 sm:h-36', img: 'w-30 h-30 sm:w-34 sm:h-34' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const logoImage = (
    <div className="relative inline-flex items-center justify-center select-none">
      {/* 1. Subtle Ambient Aura (only when showAura is enabled) */}
      {showAura && (
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#306998]/20 via-[#FFD43B]/15 to-[#306998]/20 blur-sm animate-python-aura-minimal -z-10 pointer-events-none" />
      )}

      {/* 2. Mascot Logo with Minimal Smooth Float Animation */}
      <img
        src="/pyquiz-mascot.jpg"
        alt="PyQuiz Logo Mascot"
        className={`${currentSize.img} object-contain rounded-xl animate-logo-minimal transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none`}
        loading="eager"
      />
    </div>
  );

  if (variant === 'plain') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{logoImage}</div>;
  }

  if (variant === 'emblem') {
    return (
      <div
        className={`${currentSize.box} rounded-2xl bg-gradient-to-b from-editorial-card to-editorial-muted border border-editorial-border shadow-editorial-md flex items-center justify-center p-1.5 ${className}`}
      >
        {logoImage}
      </div>
    );
  }

  // Default 'badge' variant
  return (
    <div
      className={`${currentSize.box} rounded-xl bg-editorial-card border border-editorial-border shadow-xs flex items-center justify-center transition-all duration-300 group-hover:border-editorial-accent/50 p-1 ${className}`}
    >
      {logoImage}
    </div>
  );
};

export default PyQuizLogo;
