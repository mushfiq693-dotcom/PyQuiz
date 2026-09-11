import { Question, QuizSet, SyllabusSection } from './types';
import { section1Set1Questions } from './section1/set1';
import { section1Set2Questions } from './section1/set2';
import { section1Set3Questions } from './section1/set3';

import { section2Set1Questions } from './section2/set1';
import { section2Set2Questions } from './section2/set2';
import { section2Set3Questions } from './section2/set3';

import { section3Set1Questions } from './section3/set1';
import { section3Set2Questions } from './section3/set2';
import { section3Set3Questions } from './section3/set3';

import { section4Set1Questions } from './section4/set1';
import { section4Set2Questions } from './section4/set2';
import { section4Set3Questions } from './section4/set3';

export * from './types';

export const syllabusSections: SyllabusSection[] = [
  {
    id: 'section1',
    name: 'Module 1',
    title: 'Basics',
    description: 'Object, reference, data type (mutable, immutable), all types of Operators, and complete Slicing concepts.',
    icon: 'Terminal',
    topics: ['Object & Reference', 'Data Types (Mutable/Immutable)', 'All Operators', 'Walrus & Unpacking', 'Slicing Techniques'],
    sets: [
      {
        id: 'sec1-set1',
        sectionId: 'section1',
        sectionName: 'Module 1: Basics',
        setName: 'Set 1',
        description: 'Object References, Mutability, Arithmetic & Bitwise Logic (30 Questions)',
        questions: section1Set1Questions,
      },
      {
        id: 'sec1-set2',
        sectionId: 'section1',
        sectionName: 'Module 1: Basics',
        setName: 'Set 2',
        description: 'Walrus, Unpacking, Identity & Membership Operators (30 Questions)',
        questions: section1Set2Questions,
      },
      {
        id: 'sec1-set3',
        sectionId: 'section1',
        sectionName: 'Module 1: Basics',
        setName: 'Set 3',
        description: 'All Types of Slicing, Step Rules & Boundaries (30 Questions)',
        questions: section1Set3Questions,
      },
    ],
  },
  {
    id: 'section2',
    name: 'Module 2',
    title: 'STL in Python',
    description: 'List, Tuple, Dictionary, Set, Comprehensions (List, Dict, String, Functions, Set), Range, and usage of enumerate.',
    icon: 'Layers',
    topics: ['List & Tuple', 'Dictionary & Set', 'Comprehensions', 'Range & Enumerate'],
    sets: [
      {
        id: 'sec2-set1',
        sectionId: 'section2',
        sectionName: 'Module 2: STL in Python',
        setName: 'Set 1',
        description: 'List, Tuple & Slicing Operations (30 Questions)',
        questions: section3Set1Questions,
      },
      {
        id: 'sec2-set2',
        sectionId: 'section2',
        sectionName: 'Module 2: STL in Python',
        setName: 'Set 2',
        description: 'Dictionary, Set & Hash Map Mutability (30 Questions)',
        questions: section3Set2Questions,
      },
      {
        id: 'sec2-set3',
        sectionId: 'section2',
        sectionName: 'Module 2: STL in Python',
        setName: 'Set 3',
        description: 'Comprehensions, Range & Enumerate Pipelines (30 Questions)',
        questions: section3Set3Questions,
      },
    ],
  },
  {
    id: 'section3',
    name: 'Module 3',
    title: 'Condition + Loop + Function in Python',
    description: 'Branching (if-else, Ternary, match-case), Loops (for, while, control), Functions, Recursion, and try-except handling.',
    icon: 'Cpu',
    topics: ['Branching (if-else, match-case)', 'Loops & Control Flow', 'Functions & Recursion', 'try-except Handling'],
    sets: [
      {
        id: 'sec3-set1',
        sectionId: 'section3',
        sectionName: 'Module 3: Condition + Loop + Function',
        setName: 'Set 1',
        description: 'Branching (if-else, Nested Ternary, match-case) & Loops (30 Questions)',
        questions: section2Set1Questions,
      },
      {
        id: 'sec3-set2',
        sectionId: 'section3',
        sectionName: 'Module 3: Condition + Loop + Function',
        setName: 'Set 2',
        description: 'Functions, Default Arguments, Scope Boundaries & Recursion (30 Questions)',
        questions: section2Set2Questions,
      },
      {
        id: 'sec3-set3',
        sectionId: 'section3',
        sectionName: 'Module 3: Condition + Loop + Function',
        setName: 'Set 3',
        description: 'Multiple Exception Handling & Raise Statements (30 Questions)',
        questions: section4Set1Questions,
      },
    ],
  },
  {
    id: 'section4',
    name: 'Module 4',
    title: 'Generators + Decorator in Python',
    description: 'Scope and Closures, Functions with arbitrary Keyword Arguments (*args, **kwargs), Generators, and Decorators.',
    icon: 'ShieldAlert',
    topics: ['Scope and Closures', '*args and **kwargs', 'Generators & Yield', 'Decorators'],
    sets: [
      {
        id: 'sec4-set1',
        sectionId: 'section4',
        sectionName: 'Module 4: Generators + Decorator',
        setName: 'Set 1',
        description: 'Scope and Closures & *args / **kwargs Parameter Binding (30 Questions)',
        questions: section2Set3Questions,
      },
      {
        id: 'sec4-set2',
        sectionId: 'section4',
        sectionName: 'Module 4: Generators + Decorator',
        setName: 'Set 2',
        description: 'Generators, Yield From & Memory Pipeline Streaming (30 Questions)',
        questions: section4Set2Questions,
      },
      {
        id: 'sec4-set3',
        sectionId: 'section4',
        sectionName: 'Module 4: Generators + Decorator',
        setName: 'Set 3',
        description: 'Function & Class Decorators, Metadata Preservation & Chaining (30 Questions)',
        questions: section4Set3Questions,
      },
    ],
  },
];

export const allQuestions: Question[] = syllabusSections.flatMap((s) =>
  s.sets.flatMap((set) => set.questions)
);

export function getQuizSetById(setId: string): QuizSet | undefined {
  for (const section of syllabusSections) {
    const found = section.sets.find((s) => s.id === setId);
    if (found) return found;
  }
  return undefined;
}

export function getQuestionsForSection(sectionId: string): Question[] {
  const sec = syllabusSections.find((s) => s.id === sectionId);
  return sec ? sec.sets.flatMap((s) => s.questions) : [];
}

export function generateCustomQuiz(options: {
  sectionId?: string;
  setId?: string;
  totalCount?: number;
  easyCount?: number;
  mediumCount?: number;
  hardCount?: number;
}): Question[] {
  let pool: Question[] = [];

  if (options.setId) {
    const set = getQuizSetById(options.setId);
    if (set) pool = [...set.questions];
  } else if (options.sectionId && options.sectionId !== 'all') {
    pool = getQuestionsForSection(options.sectionId);
  } else {
    pool = [...allQuestions];
  }

  const easyPool = pool.filter((q) => q.difficulty === 'easy');
  const mediumPool = pool.filter((q) => q.difficulty === 'medium');
  const hardPool = pool.filter((q) => q.difficulty === 'hard');

  const easyCount = options.easyCount ?? 10;
  const mediumCount = options.mediumCount ?? 10;
  const hardCount = options.hardCount ?? 10;

  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const selectedEasy = shuffle(easyPool).slice(0, easyCount);
  const selectedMedium = shuffle(mediumPool).slice(0, mediumCount);
  const selectedHard = shuffle(hardPool).slice(0, hardCount);

  const combined = [...selectedEasy, ...selectedMedium, ...selectedHard];

  // In case specific counts are requested or fallback
  if (combined.length === 0) {
    return shuffle(pool).slice(0, options.totalCount ?? 30);
  }

  return combined;
}
