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
      className="p-2 rounded-md bg-white hover:bg-[#F5F3F0] text-[#1A1A1A] hover:text-[#B8860B] transition-all border border-[#E8E4DF] hover:border-[#B8860B] shadow-sm"
      aria-label="Toggle audio"
    >
      {enabled ? <Volume2 className="w-3.5 h-3.5 text-[#B8860B]" /> : <VolumeX className="w-3.5 h-3.5 text-[#6B6B6B]" />}
    </button>
  );
};
