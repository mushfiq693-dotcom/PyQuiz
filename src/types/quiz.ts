import { Question, Difficulty } from '../data/questions/types';

export type UserRole = 'admin' | 'teacher' | 'student';
export type TeacherApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  teacherStatus?: TeacherApprovalStatus;
  teacherNote?: string;
  customGeminiApiKey?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserSubmissionRecord {
  id: string;
  sessionId: string;
  quizTitle: string;
  sectionName?: string;
  setName?: string;
  studentId: string;
  studentName: string;
  score: ScoreResult;
  answers: StudentAnswer[];
  antiCheatEvents: AntiCheatEvent[];
  submittedAt: number;
}

export interface StudentAnswer {
  questionId: string;
  selectedOption: number | null; // null if unanswered / timed out
  timeSpentSeconds: number;
  isCorrect: boolean;
  isTimedOut: boolean;
}

export interface AntiCheatEvent {
  id: string;
  timestamp: number;
  type: 'tab_hidden' | 'window_blur' | 'fullscreen_exit' | 'copy_attempt';
  description: string;
}

export interface QuizSessionConfig {
  quizId: string;
  quizTitle: string;
  sectionId?: string;
  sectionName?: string;
  setName?: string;
  joinCode: string;
  totalQuestions: number;
  timePerQuestion: number; // default 20 seconds
  negativeMarkingEnabled: boolean; // default true (>30% wrong -> -0.25)
  questions: Question[];
  createdAt: number;
  status: 'waiting' | 'active' | 'completed';
}

export interface StudentProfile {
  id: string;
  name: string;
  studentId?: string;
  joinedAt: number;
  currentQuestionIndex: number;
  answers: StudentAnswer[];
  antiCheatEvents: AntiCheatEvent[];
  isCompleted: boolean;
  score?: ScoreResult;
}

export interface ScoreResult {
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  penalizedWrongCount: number;
  rawScore: number;
  penaltyDeductions: number;
  finalScore: number;
  accuracyPercentage: number;
  difficultyBreakdown: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
  topicBreakdown: Record<string, { correct: number; total: number; percentage: number }>;
  weakTopics: string[];
}
