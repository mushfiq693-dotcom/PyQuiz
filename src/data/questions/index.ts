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
    name: 'Section 1',
    title: 'Python Basics, Control Flow & Operators',
    description: 'Variables, primitive data types, boolean logic, loops, conditionals, bitwise operators, and expressions.',
    icon: 'Terminal',
    topics: ['Data Types', 'Control Flow', 'Loops', 'Operators', 'Slicing', 'Truthiness'],
    sets: [
      {
        id: 'sec1-set1',
        sectionId: 'section1',
        sectionName: 'Section 1',
        setName: 'Set 1',
        description: 'Core Syntax, Object References, Loops & Bitwise Logic (30 Questions)',
        questions: section1Set1Questions,
      },
      {
        id: 'sec1-set2',
        sectionId: 'section1',
        sectionName: 'Section 1',
        setName: 'Set 2',
        description: 'String Methods, Lexicographical Sorting & Scope Boundaries (30 Questions)',
        questions: section1Set2Questions,
      },
      {
        id: 'sec1-set3',
        sectionId: 'section1',
        sectionName: 'Section 1',
        setName: 'Set 3',
        description: 'Built-in Functions, Type Conversion, Formatting & Recursion (30 Questions)',
        questions: section1Set3Questions,
      },
    ],
  },
  {
    id: 'section2',
    name: 'Section 2',
    title: 'Functions, Scope & Advanced Constructs',
    description: 'Positional/keyword arguments, closures, decorators, lambda expressions, recursion, and generator pipelines.',
    icon: 'Cpu',
    topics: ['Function Signatures', 'Closures', 'Decorators', 'Lambdas', 'Recursion', 'Itertools'],
    sets: [
      {
        id: 'sec2-set1',
        sectionId: 'section2',
        sectionName: 'Section 2',
        setName: 'Set 1',
        description: 'Default Arguments, *args/**kwargs, Closures & Decorators (30 Questions)',
        questions: section2Set1Questions,
      },
      {
        id: 'sec2-set2',
        sectionId: 'section2',
        sectionName: 'Section 2',
        setName: 'Set 2',
        description: 'Higher-Order Functions, Coroutines, Yield From & Caching (30 Questions)',
        questions: section2Set2Questions,
      },
      {
        id: 'sec2-set3',
        sectionId: 'section2',
        sectionName: 'Section 2',
        setName: 'Set 3',
        description: 'Single-Dispatch, Bytecode Introspection & Frame Inspection (30 Questions)',
        questions: section2Set3Questions,
      },
    ],
  },
  {
    id: 'section3',
    name: 'Section 3',
    title: 'Data Structures, Slicing & Collections',
    description: 'Lists, tuples, dictionaries, sets, comprehensions, namedtuples, deques, heaps, and bisect.',
    icon: 'Layers',
    topics: ['Lists', 'Dictionaries', 'Sets', 'Tuples', 'Comprehensions', 'Collections'],
    sets: [
      {
        id: 'sec3-set1',
        sectionId: 'section3',
        sectionName: 'Section 3',
        setName: 'Set 1',
        description: 'Comprehensions, Set Mathematics, Deques & Dictionaries (30 Questions)',
        questions: section3Set1Questions,
      },
      {
        id: 'sec3-set2',
        sectionId: 'section3',
        sectionName: 'Section 3',
        setName: 'Set 2',
        description: 'Shallow/Deep Copy, Named Tuples, Bisect & Min-Heaps (30 Questions)',
        questions: section3Set2Questions,
      },
      {
        id: 'sec3-set3',
        sectionId: 'section3',
        sectionName: 'Section 3',
        setName: 'Set 3',
        description: 'Memoryviews, Custom Missing Handlers & Cartesian Products (30 Questions)',
        questions: section3Set3Questions,
      },
    ],
  },
  {
    id: 'section4',
    name: 'Section 4',
    title: 'OOP, Exceptions, File I/O & Design Patterns',
    description: 'Classes, inheritance, polymorphism, dunder methods, custom context managers, descriptors, and asyncio.',
    icon: 'ShieldAlert',
    topics: ['Classes & Objects', 'Inheritance & MRO', 'Exceptions', 'Dunder Methods', 'Metaclasses', 'Asyncio'],
    sets: [
      {
        id: 'sec4-set1',
        sectionId: 'section4',
        sectionName: 'Section 4',
        setName: 'Set 1',
        description: 'C3 Linearization, Descriptors, Slots & Custom Exceptions (30 Questions)',
        questions: section4Set1Questions,
      },
      {
        id: 'sec4-set2',
        sectionId: 'section4',
        sectionName: 'Section 4',
        setName: 'Set 2',
        description: 'Dataclasses, Metaclasses, Pathlib & Garbage Collection (30 Questions)',
        questions: section4Set2Questions,
      },
      {
        id: 'sec4-set3',
        sectionId: 'section4',
        sectionName: 'Section 4',
        setName: 'Set 3',
        description: 'Asyncio Coroutines, ThreadPools, Pickle & Mocking (30 Questions)',
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
