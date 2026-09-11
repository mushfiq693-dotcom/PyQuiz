export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  question: string;
  code?: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, or 3
  difficulty: Difficulty;
  topic: string;
  explanation: string;
}

export interface QuizSet {
  id: string;
  sectionId: string;
  sectionName: string;
  setName: string;
  description: string;
  questions: Question[];
}

export interface SyllabusSection {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  topics: string[];
  sets: QuizSet[];
}
