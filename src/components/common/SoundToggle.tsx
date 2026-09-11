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
      className="p-2 rounded-md bg-editorial-card border border-editorial-border hover:border-editorial-accent text-editorial-muted-fg hover:text-editorial-fg transition-all shadow-sm group"
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
