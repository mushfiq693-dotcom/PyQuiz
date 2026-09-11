import { AntiCheatEvent } from '../types/quiz';

export class AntiCheatMonitor {
  private events: AntiCheatEvent[] = [];
  private onEventCallback: ((event: AntiCheatEvent) => void) | null = null;
  private isActive: boolean = false;

  private handleVisibilityChange = () => {
    if (!this.isActive) return;
    if (document.hidden) {
      this.recordEvent('tab_hidden', 'User switched to another browser tab or minimized window');
    }
  };

  private handleBlur = () => {
    if (!this.isActive) return;
    this.recordEvent('window_blur', 'Browser window lost focus');
  };

  private handleCopy = (e: ClipboardEvent) => {
    if (!this.isActive) return;
    e.preventDefault();
    this.recordEvent('copy_attempt', 'Attempted to copy assessment content');
  };

  private handleContextMenu = (e: MouseEvent) => {
    if (!this.isActive) return;
    e.preventDefault();
  };

  public start(onEvent?: (event: AntiCheatEvent) => void) {
    if (typeof window === 'undefined') return;
    this.isActive = true;
    this.events = [];
    this.onEventCallback = onEvent || null;

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('blur', this.handleBlur);
    document.addEventListener('copy', this.handleCopy);
    document.addEventListener('contextmenu', this.handleContextMenu);
  }

  public stop() {
    if (typeof window === 'undefined') return;
    this.isActive = false;

    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('blur', this.handleBlur);
    document.removeEventListener('copy', this.handleCopy);
    document.removeEventListener('contextmenu', this.handleContextMenu);
  }

  private recordEvent(type: AntiCheatEvent['type'], description: string) {
    const event: AntiCheatEvent = {
      id: `ac-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      type,
      description,
    };
    this.events.push(event);
    if (this.onEventCallback) {
      this.onEventCallback(event);
    }
  }

  public getEvents(): AntiCheatEvent[] {
    return [...this.events];
  }

  public requestFullscreen(): Promise<void> {
    if (typeof document !== 'undefined' && document.documentElement.requestFullscreen) {
      return document.documentElement.requestFullscreen().catch(() => {
        // User denied or browser restricted
      });
    }
    return Promise.resolve();
  }

  public exitFullscreen(): Promise<void> {
    if (typeof document !== 'undefined' && document.fullscreenElement && document.exitFullscreen) {
      return document.exitFullscreen().catch(() => {});
    }
    return Promise.resolve();
  }

  public isFullscreen(): boolean {
    if (typeof document === 'undefined') return false;
    return !!document.fullscreenElement;
  }
}

export const antiCheatManager = new AntiCheatMonitor();
