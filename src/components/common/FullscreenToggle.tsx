import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { antiCheatManager } from '../../utils/antiCheat';

export const FullscreenToggle: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = React.useState(antiCheatManager.isFullscreen());

  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(antiCheatManager.isFullscreen());
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggle = () => {
    if (isFullscreen) {
      antiCheatManager.exitFullscreen();
    } else {
      antiCheatManager.requestFullscreen();
    }
  };

  return (
    <button
      onClick={toggle}
      title={isFullscreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode'}
      className="p-2 rounded-md bg-white hover:bg-[#F5F3F0] text-[#1A1A1A] hover:text-[#B8860B] transition-all border border-[#E8E4DF] hover:border-[#B8860B] shadow-sm"
      aria-label="Toggle fullscreen"
    >
      {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-[#B8860B]" /> : <Maximize2 className="w-3.5 h-3.5 text-[#6B6B6B]" />}
    </button>
  );
};
