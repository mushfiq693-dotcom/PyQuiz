export type ModuleColor = 'blue' | 'emerald' | 'purple' | 'amber' | 'cyan' | 'rose' | 'indigo';

export interface SyllabusTopicItem {
  id: string;
  title: string;
  subtopics?: string[];
  selectedSubtopics?: string[]; // specific subtopics selected
  selected: boolean;
}

export interface SyllabusModule {
  id: string;
  moduleNumber: number;
  title: string;
  color: ModuleColor;
  items: SyllabusTopicItem[];
  selected: boolean;
}

/**
 * Default standard 4 Python modules matching the curriculum structure in reference image
 */
export const DEFAULT_PYTHON_MODULES: SyllabusModule[] = [
  {
    id: 'mod-1-basics',
    moduleNumber: 1,
    title: 'Basics',
    color: 'blue',
    selected: true,
    items: [
      {
        id: 't-1-1',
        title: 'Object, reference, data type (mutable, immutable)',
        selected: true,
        subtopics: [],
      },
      {
        id: 't-1-2',
        title: 'Operator',
        selected: true,
        subtopics: [
          'Arithmetic Operator',
          'Comparison (Relational) Operator',
          'Logical Operator',
          'Bitwise Operator',
          'Identity Operator',
          'Membership Operator',
          'Conditional Operator (Ternary)',
          'Lambda Operator',
          'Attribute Access Operator',
          'Index Operator ([])',
          'Slice Operator',
          'Unpacking Operator (all types)',
          'Walrus Operator (:=)',
          'Assignment Operator',
        ],
      },
      {
        id: 't-1-3',
        title: 'Slicing (all types of Slicing)',
        selected: true,
        subtopics: [],
      },
    ],
  },
  {
    id: 'mod-2-stl',
    moduleNumber: 2,
    title: 'STL in Python',
    color: 'emerald',
    selected: true,
    items: [
      { id: 't-2-1', title: 'List', selected: true, subtopics: [] },
      { id: 't-2-2', title: 'Tuple', selected: true, subtopics: [] },
      { id: 't-2-3', title: 'Dictionary', selected: true, subtopics: [] },
      { id: 't-2-4', title: 'Set', selected: true, subtopics: [] },
      {
        id: 't-2-5',
        title: 'Comprehension',
        selected: true,
        subtopics: [
          'List Comprehension',
          'Dictionary Comprehension',
          'String Comprehension',
          'Comprehension using Functions',
          'Set Comprehension',
          'Set Operations',
        ],
      },
      { id: 't-2-6', title: 'Range', selected: true, subtopics: [] },
      { id: 't-2-7', title: "Usage of 'enumerate'", selected: true, subtopics: [] },
    ],
  },
  {
    id: 'mod-3-control-flow',
    moduleNumber: 3,
    title: 'Condition + Loop + Function in Python',
    color: 'purple',
    selected: true,
    items: [
      {
        id: 't-3-1',
        title: 'Branching in Python',
        selected: true,
        subtopics: ['if - else', 'Ternary / Nested Ternary', 'match-case'],
      },
      {
        id: 't-3-2',
        title: 'Loop',
        selected: true,
        subtopics: [
          'for Loop',
          'while Loop',
          'Usage of Range, enumerate, Condition',
          'Nested loop',
          'Loop control (break, continue, pass)',
        ],
      },
      { id: 't-3-3', title: 'Function', selected: true, subtopics: [] },
      { id: 't-3-4', title: 'Recursion', selected: true, subtopics: [] },
      {
        id: 't-3-5',
        title: 'try-except',
        selected: true,
        subtopics: ['Multiple exception handling', 'raise statement'],
      },
    ],
  },
  {
    id: 'mod-4-generators-decorators',
    moduleNumber: 4,
    title: 'Generators + Decorator in Python',
    color: 'amber',
    selected: true,
    items: [
      { id: 't-4-1', title: 'Scope and Closures', selected: true, subtopics: [] },
      {
        id: 't-4-2',
        title: 'Function with arbitrary Keyword Arguments (*args, **kwargs)',
        selected: true,
        subtopics: [],
      },
      { id: 't-4-3', title: 'Generators', selected: true, subtopics: [] },
      { id: 't-4-4', title: 'Decorator', selected: true, subtopics: [] },
    ],
  },
];

/**
 * Extracts a concise formatted summary of selected modules and topics for AI prompt context
 */
export function getSelectedTopicsSummary(modules: SyllabusModule[]): string[] {
  const selected: string[] = [];

  modules.forEach((mod) => {
    if (!mod.selected) return;

    mod.items.forEach((item) => {
      if (!item.selected) return;

      const subList = item.selectedSubtopics && item.selectedSubtopics.length > 0
        ? item.selectedSubtopics
        : item.subtopics || [];

      if (subList.length > 0) {
        selected.push(`${mod.title} -> ${item.title} (${subList.join(', ')})`);
      } else {
        selected.push(`${mod.title} -> ${item.title}`);
      }
    });
  });

  return selected;
}

/**
 * Extracts flat string array of active topic/subtopic keywords for question filtering
 */
export function getSelectedTopicKeywords(modules: SyllabusModule[]): string[] {
  const keywords = new Set<string>();

  modules.forEach((mod) => {
    if (!mod.selected) return;
    keywords.add(mod.title);

    mod.items.forEach((item) => {
      if (!item.selected) return;
      keywords.add(item.title);
      
      const subList = item.selectedSubtopics && item.selectedSubtopics.length > 0
        ? item.selectedSubtopics
        : item.subtopics || [];

      subList.forEach((sub) => keywords.add(sub));
    });
  });

  return Array.from(keywords);
}
