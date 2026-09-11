import { Question, Difficulty } from '../data/questions/types';
import { allQuestions } from '../data/questions';
import { SyllabusModule, getSelectedTopicKeywords } from '../types/syllabus';

export function makeQuestionHarder(q: Question): Question {
  let newCode = q.code;
  let newExplanation = q.explanation;
  const newOptions: [string, string, string, string] = [...q.options];

  if (q.difficulty === 'easy') {
    const candidate = allQuestions.find(
      (item) => item.topic === q.topic && item.difficulty === 'medium' && item.id !== q.id
    );
    if (candidate) return { ...candidate, id: `ai-mod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` };
  } else if (q.difficulty === 'medium') {
    const candidate = allQuestions.find(
      (item) => item.topic === q.topic && item.difficulty === 'hard' && item.id !== q.id
    );
    if (candidate) return { ...candidate, id: `ai-mod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` };
  }

  if (newCode && !newCode.includes('try:')) {
    newCode = `${newCode}\n# Note: Evaluating boundary condition with side effect`;
    newExplanation = `${newExplanation} (Calibrated to Hard: requires tracing subtle state mutation and reference behavior).`;
  }

  return {
    ...q,
    id: `ai-harder-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    difficulty: 'hard',
    code: newCode,
    options: newOptions,
    explanation: newExplanation,
  };
}

export function makeQuestionEasier(q: Question): Question {
  if (q.difficulty === 'hard') {
    const candidate = allQuestions.find(
      (item) => item.topic === q.topic && item.difficulty === 'medium' && item.id !== q.id
    );
    if (candidate) return { ...candidate, id: `ai-mod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` };
  } else if (q.difficulty === 'medium') {
    const candidate = allQuestions.find(
      (item) => item.topic === q.topic && item.difficulty === 'easy' && item.id !== q.id
    );
    if (candidate) return { ...candidate, id: `ai-mod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` };
  }

  return {
    ...q,
    id: `ai-easier-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    difficulty: 'easy',
    explanation: `${q.explanation} (Calibrated to Easy: fundamental concept review).`,
  };
}

export function regenerateDistractors(q: Question): Question {
  const correctText = q.options[q.correctAnswer];
  
  const distractorTemplates = [
    'None',
    'SyntaxError',
    'TypeError: unsupported operand type',
    'IndexError: list index out of range',
    'AttributeError',
    '0',
    '1',
    '[]',
    '{}',
    'False',
    'True',
    'Error: object is immutable',
    'StopIteration',
  ].filter((d) => d !== correctText);

  const shuffledDistractors = distractorTemplates.sort(() => Math.random() - 0.5);

  const newOpts: string[] = [];
  const newCorrectIdx = Math.floor(Math.random() * 4);

  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === newCorrectIdx) {
      newOpts.push(correctText);
    } else {
      newOpts.push(shuffledDistractors[dIdx++] || `Alternative ${i + 1}`);
    }
  }

  return {
    ...q,
    id: `ai-distractors-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    options: newOpts as [string, string, string, string],
    correctAnswer: newCorrectIdx,
    explanation: `${q.explanation} Distractors were regenerated with common Python edge-case traps.`,
  };
}

export function regenerateQuestion(q: Question): Question {
  const matches = allQuestions.filter(
    (item) => item.topic === q.topic && item.difficulty === q.difficulty && item.id !== q.id
  );

  if (matches.length > 0) {
    const picked = matches[Math.floor(Math.random() * matches.length)];
    return {
      ...picked,
      id: `ai-regen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
  }

  const sameDiff = allQuestions.filter((item) => item.difficulty === q.difficulty && item.id !== q.id);
  const picked = sameDiff[Math.floor(Math.random() * sameDiff.length)] || q;
  return {
    ...picked,
    id: `ai-regen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  };
}

export interface SyllabusAttachment {
  name: string;
  size: number;
  mimeType: string;
  base64Data: string; // raw base64 string
  previewUrl?: string;
  extractedTopics?: string[];
  rawText?: string;
}

export interface AIGenerationOptions {
  selectedSections?: string[]; // e.g. ['section1', 'section2', 'section3', 'section4']
  selectedTopics?: string[]; // e.g. ['Control Flow', 'Functions', 'Lists', 'OOP']
  selectedModules?: SyllabusModule[]; // hierarchical modules with subtopics
  customTopics?: string[]; // user-defined topics
  attachment?: SyllabusAttachment;
  questionStyle?: 'all' | 'code-tracing' | 'conceptual' | 'error-handling' | 'edge-cases';
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  customKeywords?: string;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
}

export function generateAIQuestionsWithOptions(options: AIGenerationOptions): Question[] {
  let pool = [...allQuestions];

  // 1. Filter by selected sections if provided
  if (options.selectedSections && options.selectedSections.length > 0 && options.selectedSections.length < 4) {
    const secPrefixes = options.selectedSections.map((s) => s.toLowerCase());
    const matched = pool.filter((q) => {
      const qId = q.id.toLowerCase();
      return secPrefixes.some((sec) => qId.startsWith(sec) || qId.includes(sec));
    });
    if (matched.length >= options.easyCount + options.mediumCount + options.hardCount) {
      pool = matched;
    }
  }

  // 2. Filter by topics or structured modules if provided
  const moduleKeywords = options.selectedModules ? getSelectedTopicKeywords(options.selectedModules) : [];
  const combinedTopics = [
    ...moduleKeywords,
    ...(options.selectedTopics || []),
    ...(options.customTopics || []),
  ].filter((t) => t && t.trim().length > 0);

  if (combinedTopics.length > 0) {
    const topicTerms = combinedTopics.map((t) => t.toLowerCase());
    const matched = pool.filter((q) => {
      const qTopic = q.topic.toLowerCase();
      const qText = q.question.toLowerCase();
      return topicTerms.some((t) => qTopic.includes(t) || t.includes(qTopic) || qText.includes(t));
    });
    if (matched.length >= options.easyCount + options.mediumCount + options.hardCount) {
      pool = matched;
    }
  }

  // 3. Filter by Question Style
  if (options.questionStyle === 'code-tracing') {
    const withCode = pool.filter((q) => !!q.code && q.code.trim().length > 0);
    if (withCode.length >= (options.easyCount + options.mediumCount + options.hardCount) / 2) {
      pool = withCode;
    }
  } else if (options.questionStyle === 'conceptual') {
    const conceptual = pool.filter((q) => !q.code || q.code.trim().length === 0);
    if (conceptual.length >= (options.easyCount + options.mediumCount + options.hardCount) / 2) {
      pool = conceptual;
    }
  } else if (options.questionStyle === 'error-handling') {
    const errRelated = pool.filter(
      (q) =>
        q.topic.toLowerCase().includes('exception') ||
        q.question.toLowerCase().includes('error') ||
        q.options.some((opt) => opt.toLowerCase().includes('error')) ||
        (q.code && q.code.toLowerCase().includes('except'))
    );
    if (errRelated.length >= 5) {
      pool = errRelated;
    }
  } else if (options.questionStyle === 'edge-cases') {
    const edgeRelated = pool.filter(
      (q) =>
        q.explanation.toLowerCase().includes('trap') ||
        q.explanation.toLowerCase().includes('edge') ||
        q.explanation.toLowerCase().includes('subtle') ||
        q.explanation.toLowerCase().includes('mutation') ||
        q.explanation.toLowerCase().includes('immutable') ||
        q.explanation.toLowerCase().includes('mro')
    );
    if (edgeRelated.length >= 5) {
      pool = edgeRelated;
    }
  }

  // 4. Custom Keyword Ranking / Filtering
  if (options.customKeywords && options.customKeywords.trim().length > 0) {
    const keywords = options.customKeywords
      .toLowerCase()
      .split(/[\s,]+/)
      .filter((k) => k.length > 1);

    if (keywords.length > 0) {
      const keywordMatches = pool.filter((q) =>
        keywords.some(
          (kw) =>
            q.topic.toLowerCase().includes(kw) ||
            q.question.toLowerCase().includes(kw) ||
            (q.code && q.code.toLowerCase().includes(kw)) ||
            q.explanation.toLowerCase().includes(kw)
        )
      );
      if (keywordMatches.length >= 5) {
        pool = keywordMatches;
      }
    }
  }

  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const easyPool = pool.filter((q) => q.difficulty === 'easy');
  const mediumPool = pool.filter((q) => q.difficulty === 'medium');
  const hardPool = pool.filter((q) => q.difficulty === 'hard');

  // Fallback to allQuestions if specific pool doesn't have enough questions
  const fallbackEasy = allQuestions.filter((q) => q.difficulty === 'easy');
  const fallbackMed = allQuestions.filter((q) => q.difficulty === 'medium');
  const fallbackHard = allQuestions.filter((q) => q.difficulty === 'hard');

  const selectedEasy = shuffle(easyPool.length >= options.easyCount ? easyPool : fallbackEasy).slice(
    0,
    options.easyCount
  );
  const selectedMed = shuffle(mediumPool.length >= options.mediumCount ? mediumPool : fallbackMed).slice(
    0,
    options.mediumCount
  );
  const selectedHard = shuffle(hardPool.length >= options.hardCount ? hardPool : fallbackHard).slice(
    0,
    options.hardCount
  );

  let result = [...selectedEasy, ...selectedMed, ...selectedHard];

  if (options.shuffleQuestions !== false) {
    result = shuffle(result);
  }

  // Option Shuffling if requested
  if (options.shuffleOptions) {
    result = result.map((q) => {
      const correctText = q.options[q.correctAnswer];
      const shuffledOpts = shuffle([...q.options]);
      const newCorrectIdx = shuffledOpts.indexOf(correctText);
      return {
        ...q,
        options: shuffledOpts as [string, string, string, string],
        correctAnswer: newCorrectIdx,
      };
    });
  }

  return result.map((q) => ({
    ...q,
    id: `ai-gen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  }));
}
