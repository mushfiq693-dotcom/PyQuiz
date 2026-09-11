import { QuizSessionConfig, StudentProfile } from '../types/quiz';

export type BroadcastMessage =
  | { type: 'QUIZ_PUBLISHED'; payload: QuizSessionConfig }
  | { type: 'STUDENT_JOINED'; payload: { quizCode: string; student: StudentProfile } }
  | { type: 'QUIZ_STARTED'; payload: { quizCode: string } }
  | { type: 'STUDENT_PROGRESS'; payload: { quizCode: string; studentId: string; questionIndex: number } }
  | { type: 'STUDENT_FINISHED'; payload: { quizCode: string; studentId: string; score: number } };

class BroadcastSyncManager {
  private channel: BroadcastChannel | null = null;
  private listeners: ((msg: BroadcastMessage) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('pyassess_quiz_sync_channel');
        this.channel.onmessage = (event) => {
          this.notifyListeners(event.data);
        };
      } catch {
        // Fallback handled via storage event if needed
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'pyassess_broadcast_event' && e.newValue) {
          try {
            const data = JSON.parse(e.newValue);
            this.notifyListeners(data);
          } catch {
            // ignore
          }
        }
      });
    }
  }

  public subscribe(callback: (msg: BroadcastMessage) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notifyListeners(msg: BroadcastMessage) {
    this.listeners.forEach((l) => {
      try {
        l(msg);
      } catch {
        // ignore callback error
      }
    });
  }

  public publish(msg: BroadcastMessage) {
    // Notify local listeners
    this.notifyListeners(msg);

    // Broadcast across tabs via BroadcastChannel
    if (this.channel) {
      try {
        this.channel.postMessage(msg);
      } catch {
        // fallback
      }
    }

    // Secondary fallback via localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('pyassess_broadcast_event', JSON.stringify({ ...msg, _t: Date.now() }));
      } catch {
        // storage quota
      }
    }
  }
}

export const syncManager = new BroadcastSyncManager();
