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
  showAura = true,
}) => {
  // Size dimensions
  const sizeMap = {
    xs: { box: 'w-7 h-7', img: 'w-6 h-6', bulb: 'w-1.5 h-1.5' },
    sm: { box: 'w-9 h-9', img: 'w-8 h-8', bulb: 'w-2 h-2' },
    md: { box: 'w-11 h-11 sm:w-12 sm:h-12', img: 'w-10 h-10 sm:w-11 sm:h-11', bulb: 'w-2.5 h-2.5' },
    lg: { box: 'w-16 h-16 sm:w-20 sm:h-20', img: 'w-14 h-14 sm:w-18 sm:h-18', bulb: 'w-3.5 h-3.5' },
    xl: { box: 'w-24 h-24 sm:w-28 sm:h-28', img: 'w-22 h-22 sm:w-26 sm:h-26', bulb: 'w-4 h-4' },
    '2xl': { box: 'w-32 h-32 sm:w-36 sm:h-36', img: 'w-30 h-30 sm:w-34 sm:h-34', bulb: 'w-5 h-5' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const logoImage = (
    <div className="relative inline-flex items-center justify-center select-none">
      {/* 1. Ambient Python Aura Pulse (Blue & Gold Glow) */}
      {showAura && (
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#306998]/40 via-[#FFD43B]/30 to-[#306998]/40 blur-md animate-python-aura -z-10 pointer-events-none" />
      )}

      {/* 2. Animated Orbiting Circuit Particle */}
      {(variant === 'emblem' || size === 'xl' || size === '2xl') && (
        <div className="absolute inset-0 rounded-full animate-orbit-circuit pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#FFD43B] absolute -top-1 left-1/2 -translate-x-1/2" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#306998] absolute -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      )}

      {/* 3. The Mascot Image with Snake Slithering & Breathing Animation */}
      <img
        src="/pyquiz-mascot.jpg"
        alt="PyQuiz Python Snake & Quiz Board Mascot"
        className={`${currentSize.img} object-contain rounded-xl animate-snake-slither transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none`}
        loading="eager"
      />

      {/* 4. Top-Right Lightbulb Golden Sparkle Glow */}
      <div
        className={`absolute top-1 right-1 ${currentSize.bulb} rounded-full bg-yellow-400/80 blur-[1px] animate-bulb-pulse pointer-events-none`}
        title="Active Quiz Spark"
      />
    </div>
  );

  if (variant === 'plain') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{logoImage}</div>;
  }

  if (variant === 'emblem') {
    return (
      <div
        className={`${currentSize.box} rounded-2xl bg-gradient-to-b from-editorial-card to-editorial-muted border border-editorial-border shadow-editorial-lg flex items-center justify-center p-1.5 ${className}`}
      >
        {logoImage}
      </div>
    );
  }

  // Default 'badge' variant
  return (
    <div
      className={`${currentSize.box} rounded-xl bg-editorial-card/90 backdrop-blur-sm border border-editorial-border shadow-editorial-sm flex items-center justify-center transition-all duration-300 group-hover:border-editorial-accent/60 group-hover:shadow-editorial-md p-1 ${className}`}
    >
      {logoImage}
    </div>
  );
};

export default PyQuizLogo;
