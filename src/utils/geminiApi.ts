import { Question } from '../data/questions/types';
import {
  AIGenerationOptions,
  SyllabusAttachment,
  generateAIQuestionsWithOptions,
} from './aiQuestionModifier';
import {
  SyllabusModule,
  ModuleColor,
  DEFAULT_PYTHON_MODULES,
  getSelectedTopicsSummary,
  getSelectedTopicKeywords,
} from '../types/syllabus';

const STORAGE_KEY = 'pyassess_gemini_api_key';
const CUSTOM_MODEL_KEY = 'pyassess_gemini_custom_model';

// Fallback cascade: prioritize Gemini 2.5 Flash / Gemini 2.0 Flash / 1.5 Flash
export const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
];

let cachedWorkingModel = '';

/**
 * Normalizes image or document MIME types for Google Gemini compatibility
 */
export function normalizeMimeType(fileName: string, rawMime?: string): string {
  const lowerName = fileName.toLowerCase();
  if (lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) return 'image/jpeg';
  if (lowerName.endsWith('.png')) return 'image/png';
  if (lowerName.endsWith('.webp')) return 'image/webp';
  if (lowerName.endsWith('.pdf')) return 'application/pdf';
  if (rawMime === 'image/jpg') return 'image/jpeg';
  return rawMime || 'image/jpeg';
}

/**
 * Retrieves the currently configured Gemini API Key from localStorage or .env
 */
export function getGeminiApiKey(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim().length > 0) {
      return saved.trim();
    }
  } catch {
    // ignore
  }

  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
    return envKey.trim();
  }

  return '';
}

/**
 * Saves or clears the Gemini API Key in localStorage
 */
export function setGeminiApiKey(key: string): void {
  try {
    if (!key || key.trim().length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      cachedWorkingModel = '';
    } else {
      localStorage.setItem(STORAGE_KEY, key.trim());
      cachedWorkingModel = '';
    }
  } catch {
    // ignore
  }
}

export function saveGeminiApiKey(key: string): void {
  setGeminiApiKey(key);
}

export function removeGeminiApiKey(): void {
  setGeminiApiKey('');
}

/**
 * Checks if a Gemini API Key is available
 */
export function isGeminiConfigured(): boolean {
  const key = getGeminiApiKey();
  return Boolean(key && key.trim().length > 10);
}

export function getPreferredModel(): string | null {
  try {
    return localStorage.getItem(CUSTOM_MODEL_KEY) || null;
  } catch {
    return null;
  }
}

export function savePreferredModel(model: string): void {
  try {
    localStorage.setItem(CUSTOM_MODEL_KEY, model.trim());
    cachedWorkingModel = '';
  } catch {
    // ignore
  }
}

/**
 * Discovers and returns the working models available for the provided Gemini API key
 */
export async function discoverWorkingModels(apiKey: string): Promise<string[]> {
  if (!apiKey) return GEMINI_MODELS;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.models) && data.models.length > 0) {
        const supported = data.models
          .filter((m: any) => {
            const methods = m.supportedGenerationMethods;
            return Array.isArray(methods) ? methods.includes('generateContent') : true;
          })
          .map((m: any) => m.name.replace(/^models\//, ''));

        if (supported.length > 0) {
          // Sort to prioritize flash and 2.5/2.0/1.5 models
          const sorted = supported.sort((a: string, b: string) => {
            const score = (name: string) => {
              if (name.includes('2.5-flash')) return 110;
              if (name.includes('2.0-flash')) return 100;
              if (name.includes('1.5-flash')) return 90;
              if (name.includes('flash')) return 80;
              if (name.includes('1.5-pro')) return 70;
              if (name.includes('pro')) return 60;
              return 10;
            };
            return score(b) - score(a);
          });
          return sorted;
        }
      }
    }
  } catch (e) {
    console.warn('Could not fetch model list from Gemini API, using fallback candidates:', e);
  }

  return GEMINI_MODELS;
}

/**
 * Robust caller with auto-fallback across Gemini models
 */
async function callGeminiWithModelFallback(
  apiKey: string,
  payload: any
): Promise<{ text: string; usedModel: string }> {
  const preferred = getPreferredModel();
  const modelQueue = Array.from(
    new Set(
      [
        cachedWorkingModel,
        preferred,
        ...GEMINI_MODELS,
      ].filter(Boolean) as string[]
    )
  );

  let lastError: string | null = null;

  for (const model of modelQueue) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => null);
        const errMsg = errJson?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        lastError = errMsg;

        // If the error is API key invalid, immediately throw (no need to retry other models)
        if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('API key not valid')) {
          throw new Error('Invalid Gemini API key. Please check the key from Google AI Studio.');
        }

        // If it's model not found / deprecated, continue to next model
        if (
          response.status === 404 ||
          errMsg.includes('not found') ||
          errMsg.includes('no longer available') ||
          errMsg.includes('not supported') ||
          errMsg.includes('deprecated')
        ) {
          continue;
        }

        continue;
      }

      const data = await response.json();
      const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidateText) {
        throw new Error('Empty response received from Gemini API.');
      }

      cachedWorkingModel = model;
      return { text: candidateText, usedModel: model };
    } catch (err: any) {
      if (err?.message?.includes('Invalid Gemini API key')) {
        throw err;
      }
      lastError = err?.message || 'Gemini API Error';
    }
  }

  throw new Error(lastError || 'Failed to communicate with Google Gemini API.');
}

/**
 * Tests connection to Google Gemini API with a minimal prompt
 */
export async function testGeminiConnection(keyToTest?: string): Promise<{ success: boolean; message: string }> {
  const apiKey = keyToTest || getGeminiApiKey();
  if (!apiKey) {
    return { success: false, message: 'No API Key provided.' };
  }

  try {
    const result = await callGeminiWithModelFallback(apiKey, {
      contents: [{ parts: [{ text: 'Respond with the word "OK" if connection is successful.' }] }],
      generationConfig: { maxOutputTokens: 10, temperature: 0.1 },
    });

    return {
      success: true,
      message: `Connection successful! Active model: ${result.usedModel}`,
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error connecting to Gemini API.' };
  }
}

const COLOR_CYCLE: ModuleColor[] = ['blue', 'emerald', 'purple', 'amber', 'cyan', 'rose', 'indigo'];

/**
 * Analyzes an attached image/PDF/text document using Gemini vision/document processing
 * and extracts hierarchical Python modules with topics & subtopics (like in 4-quadrant syllabus).
 */
export async function extractTopicsFromAttachment(
  attachment: SyllabusAttachment,
  customApiKey?: string
): Promise<{ success: boolean; modules: SyllabusModule[]; topics: string[]; message?: string }> {
  const apiKey = customApiKey || getGeminiApiKey();
  if (!apiKey) {
    return {
      success: false,
      modules: [],
      topics: [],
      message: 'Gemini API Key is required for AI document extraction.',
    };
  }

  const prompt = `You are an expert Python curriculum analyzer and document OCR specialist.
Examine this attached syllabus / course outline / image / document with high precision.
Extract all distinct Modules / Sections / Units / Quadrants and their nested topics and subtopics.
Look for numbered modules or colored quadrant cards (e.g. "1 Basics", "2 STL in Python", "3 Condition + Loop + Function", "4 Generators + Decorator", etc.).
For each module:
1. Extract the module title and number.
2. Extract all numbered or bulleted main topics under it.
3. If a topic has nested subtopics (e.g. for "Operator" list subtopics like "Arithmetic Operator", "Bitwise Operator", "Walrus Operator", "Unpacking Operator", etc.; or for "Comprehension" list "List", "Dictionary", "Set", etc.), extract them in the "subtopics" array.

Return ONLY a valid JSON object matching this schema:
{
  "modules": [
    {
      "moduleNumber": 1,
      "title": "Basics",
      "color": "blue",
      "items": [
        {
          "title": "Object, reference, data type(mutable, immutable)",
          "subtopics": []
        },
        {
          "title": "Operator",
          "subtopics": [
            "Arithmetic Operator",
            "Comparison (Relational) Operator",
            "Logical Operator",
            "Bitwise Operator",
            "Identity Operator",
            "Membership Operator",
            "Conditional Operator (Ternary)",
            "Lambda Operator",
            "Attribute Access Operator",
            "Index Operator([])",
            "Slice Operator",
            "unpacking Operator",
            "Walrus Operator",
            "Assignment Operator"
          ]
        },
        {
          "title": "Slicing (all type of Slicing)",
          "subtopics": []
        }
      ]
    }
  ]
}

Supported colors for modules: "blue", "emerald", "purple", "amber", "cyan", "rose".
Ensure high accuracy, preserving the structure and terminology from the image/document.`;

  try {
    const parts: any[] = [{ text: prompt }];

    if (attachment.base64Data && attachment.mimeType) {
      parts.push({
        inlineData: {
          mimeType: attachment.mimeType,
          data: attachment.base64Data,
        },
      });
    } else if (attachment.rawText) {
      parts.push({
        text: `Document Content:\n${attachment.rawText}`,
      });
    }

    const { text: candidateText } = await callGeminiWithModelFallback(apiKey, {
      contents: [{ parts }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    let cleanJson = candidateText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanJson);
    let extractedModules: SyllabusModule[] = [];
    const allFlatTopics: string[] = [];

    // 1. If parsed object has "modules" array
    if (parsed && Array.isArray(parsed.modules) && parsed.modules.length > 0) {
      extractedModules = parsed.modules.map((m: any, mIdx: number) => {
        const modNum = typeof m.moduleNumber === 'number' ? m.moduleNumber : mIdx + 1;
        const color = (COLOR_CYCLE[mIdx % COLOR_CYCLE.length]) as ModuleColor;
        const rawItems = Array.isArray(m.items) ? m.items : [];

        const items = rawItems.map((item: any, itemIdx: number) => {
          const itemTitle = typeof item === 'string' ? item : String(item.title || `Topic ${itemIdx + 1}`);
          const rawSub = Array.isArray(item.subtopics) ? item.subtopics.map(String) : [];
          
          allFlatTopics.push(itemTitle);
          rawSub.forEach((s: string) => allFlatTopics.push(s));

          return {
            id: `ai-item-${Date.now()}-${mIdx}-${itemIdx}`,
            title: itemTitle,
            subtopics: rawSub,
            selected: true,
          };
        });

        return {
          id: `ai-mod-${Date.now()}-${mIdx}`,
          moduleNumber: modNum,
          title: String(m.title || `Module ${modNum}`),
          color: m.color && ['blue', 'emerald', 'purple', 'amber', 'cyan', 'rose'].includes(m.color) ? m.color : color,
          items,
          selected: true,
        };
      });
    } else if (Array.isArray(parsed) && parsed.length > 0) {
      // 2. Fallback: If it returned a flat array of strings or topic objects
      const items = parsed.map((t: any, idx: number) => {
        const title = typeof t === 'string' ? t : String(t.title || t.name || `Topic ${idx + 1}`);
        const subtopics = Array.isArray(t.subtopics) ? t.subtopics.map(String) : [];
        allFlatTopics.push(title);
        subtopics.forEach((s: string) => allFlatTopics.push(s));
        return {
          id: `ai-item-${Date.now()}-0-${idx}`,
          title,
          subtopics,
          selected: true,
        };
      });

      extractedModules = [
        {
          id: `ai-mod-${Date.now()}-0`,
          moduleNumber: 1,
          title: 'Extracted Syllabus Topics',
          color: 'blue',
          items,
          selected: true,
        },
      ];
    }

    if (extractedModules.length > 0) {
      return {
        success: true,
        modules: extractedModules,
        topics: Array.from(new Set(allFlatTopics)),
      };
    }

    return { success: false, modules: [], topics: [], message: 'Could not extract structured modules from document.' };
  } catch (err: any) {
    return {
      success: false,
      modules: [],
      topics: [],
      message: err?.message || 'Error extracting topics with Gemini API.',
    };
  }
}

/**
 * Generates live questions using Google Gemini API with strict structured JSON output.
 * If generation fails or no key is set, seamlessly falls back to the smart local engine.
 */
export async function generateQuestionsWithGemini(
  options: AIGenerationOptions,
  customApiKey?: string
): Promise<{ questions: Question[]; source: 'gemini' | 'local'; error?: string }> {
  const apiKey = customApiKey || getGeminiApiKey();

  // If no API Key configured, use the smart local engine
  if (!apiKey) {
    const localQs = generateAIQuestionsWithOptions(options);
    return { questions: localQs, source: 'local' };
  }

  const totalRequired = options.easyCount + options.mediumCount + options.hardCount;
  
  // Format structured modules & topics summary for high-precision prompt
  let topicsList = '';
  if (options.selectedModules && options.selectedModules.length > 0) {
    const modSummaries = getSelectedTopicsSummary(options.selectedModules);
    if (modSummaries.length > 0) {
      topicsList = modSummaries.join('\n- ');
    }
  }

  if (!topicsList) {
    const allSelectedTopics = [
      ...(options.selectedTopics || []),
      ...(options.customTopics || []),
    ];
    topicsList = allSelectedTopics.length > 0
      ? allSelectedTopics.join(', ')
      : 'Core Python 3, Control Flow, Functions, Data Structures, OOP';
  }

  const styleDescription = {
    'all': 'A balanced mix of code output tracing and conceptual/syntax understanding.',
    'code-tracing': 'Questions featuring short Python 3 code snippets where examinees must predict exact stdout/return values.',
    'conceptual': 'Questions testing fundamental Python language rules, scoping, mutability, and syntax behavior without lengthy code.',
    'error-handling': 'Questions testing Python exception types (TypeError, IndexError, KeyError, ZeroDivisionError, etc.) and try/except logic.',
    'edge-cases': 'Questions testing tricky Python subtleties (mutable default arguments, reference aliasing, boolean truthiness traps, MRO).',
  }[options.questionStyle || 'all'];

  let prompt = `You are an expert Python 3 assessment creator. Generate exactly ${totalRequired} distinct multiple-choice questions for a high-stakes Python exam.

Requirements:
- Target Curriculum Modules & Topics:
- ${topicsList}
- Question Style: ${styleDescription}
${options.customKeywords ? `- Specific Focus Keywords: ${options.customKeywords}` : ''}
${options.attachment ? `- The questions MUST be closely aligned with the attached syllabus / topic document.` : ''}
- Difficulty Distribution: Exactly ${options.easyCount} "easy", ${options.mediumCount} "medium", and ${options.hardCount} "hard" questions.
- Every question must be in English and adhere 100% to standard Python 3.10+ execution semantics.
- Exactly 4 choices per question (options). Only ONE correct answer (0, 1, 2, or 3).
- Provide a clear, technical explanation detailing why the correct answer is right and why other options are traps.

Output format MUST be a valid JSON array of objects conforming to this schema:
[
  {
    "question": "Question text here",
    "code": "optional valid python code or empty string",
    "options": ["Choice A", "Choice B", "Choice C", "Choice D"],
    "correctAnswer": 0,
    "difficulty": "easy",
    "topic": "Specific Topic",
    "explanation": "Detailed explanation of runtime behavior"
  }
]`;

  try {
    const parts: any[] = [{ text: prompt }];

    // Attach multimodal payload if syllabus attachment exists
    if (options.attachment && options.attachment.base64Data && options.attachment.mimeType) {
      parts.push({
        inlineData: {
          mimeType: options.attachment.mimeType,
          data: options.attachment.base64Data,
        },
      });
    }

    const { text: candidateText } = await callGeminiWithModelFallback(apiKey, {
      contents: [{ parts }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    if (!candidateText) {
      throw new Error('Gemini API returned empty response.');
    }

    // Clean JSON text if wrapped in markdown code blocks
    let cleanJson = candidateText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanJson);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error('Parsed response is not a valid question array.');
    }

    // Normalize and sanitize generated questions
    const sanitizedQuestions: Question[] = parsed.map((item: any, index: number) => {
      const rawOpts = Array.isArray(item.options) ? item.options.map(String) : ['A', 'B', 'C', 'D'];
      while (rawOpts.length < 4) rawOpts.push(`Option ${rawOpts.length + 1}`);
      const optionsTuple: [string, string, string, string] = [
        rawOpts[0] || 'A',
        rawOpts[1] || 'B',
        rawOpts[2] || 'C',
        rawOpts[3] || 'D',
      ];

      const validCorrect =
        typeof item.correctAnswer === 'number' && item.correctAnswer >= 0 && item.correctAnswer <= 3
          ? item.correctAnswer
          : 0;

      const validDiff: 'easy' | 'medium' | 'hard' =
        item.difficulty === 'easy' || item.difficulty === 'medium' || item.difficulty === 'hard'
          ? item.difficulty
          : index < options.easyCount
          ? 'easy'
          : index < options.easyCount + options.mediumCount
          ? 'medium'
          : 'hard';

      return {
        id: `gemini-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`,
        question: String(item.question || `Python Question ${index + 1}`),
        code: item.code && String(item.code).trim().length > 0 ? String(item.code) : undefined,
        options: optionsTuple,
        correctAnswer: validCorrect,
        difficulty: validDiff,
        topic: String(item.topic || 'Python Core'),
        explanation: String(item.explanation || 'Detailed explanation of Python execution.'),
      };
    });

    return {
      questions: sanitizedQuestions.slice(0, totalRequired),
      source: 'gemini',
    };
  } catch (err: any) {
    console.warn('Gemini API call failed, falling back to smart local question engine:', err);
    const fallbackQs = generateAIQuestionsWithOptions(options);
    return {
      questions: fallbackQs,
      source: 'local',
      error: err?.message || 'Error communicating with Gemini API. Used local question bank.',
    };
  }
}
