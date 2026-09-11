import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

export const SoundToggle: React.FC = () => {
  const [enabled, setEnabled] = React.useState(soundManager.isEnabled());

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    soundManager.setEnabled(next);
    if (next) {
      soundManager.playSelect();
    }
  };

  return (
    <button
      onClick={toggle}
      title={enabled ? 'Mute Audio Signals' : 'Enable Audio Signals'}
      className="p-2 rounded-md min-w-[36px] min-h-[36px] sm:min-w-[38px] sm:min-h-[38px] flex items-center justify-center bg-editorial-card border border-editorial-border hover:border-editorial-accent text-editorial-muted-fg hover:text-editorial-fg active:scale-95 transition-all shadow-xs group"
      aria-label="Toggle audio"
    >
      {enabled ? (
        <Volume2 className="w-3.5 h-3.5 text-editorial-accent transition-colors" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-editorial-muted-fg group-hover:text-editorial-accent transition-colors" />
      )}
    </button>
  );
};
