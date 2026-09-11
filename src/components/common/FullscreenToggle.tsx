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
      className="p-2 rounded-md bg-editorial-card border border-editorial-border hover:border-editorial-accent text-editorial-muted-fg hover:text-editorial-fg transition-all shadow-sm group"
      aria-label="Toggle fullscreen"
    >
      {isFullscreen ? (
        <Minimize2 className="w-3.5 h-3.5 text-editorial-accent transition-colors" />
      ) : (
        <Maximize2 className="w-3.5 h-3.5 text-editorial-muted-fg group-hover:text-editorial-accent transition-colors" />
      )}
    </button>
  );
};
