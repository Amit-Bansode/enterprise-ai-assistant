import type { DetectedIntent, UserIntent } from '@/application/intents/types';

interface IntentPattern {
  intent: UserIntent;
  confidence: number;
  keywords: string[];
}

const intentPatterns: IntentPattern[] = [
  {
    intent: 'apply_leave',
    confidence: 0.9,
    keywords: ['leave', 'pto', 'vacation', 'time off', 'day off'],
  },
  {
    intent: 'daily_brief',
    confidence: 0.88,
    keywords: ['brief', 'morning brief', 'daily brief', 'standup', 'meetings', 'today'],
  },
  {
    intent: 'knowledge_search',
    confidence: 0.85,
    keywords: ['policy', 'document', 'search', 'handbook', 'guideline'],
  },
  {
    intent: 'resume_work',
    confidence: 0.82,
    keywords: ['resume', 'continue', 'pick up', 'where i left'],
  },
];

export function detectIntent(text: string): DetectedIntent {
  const normalized = text.trim().toLowerCase();

  for (const pattern of intentPatterns) {
    const matched = pattern.keywords.find(keyword => normalized.includes(keyword));
    if (matched) {
      return {
        intent: pattern.intent,
        confidence: pattern.confidence,
        rawText: text,
        slots: { trigger: matched },
      };
    }
  }

  if (normalized.endsWith('?')) {
    return {
      intent: 'general_question',
      confidence: 0.6,
      rawText: text,
      slots: {},
    };
  }

  return {
    intent: 'unknown',
    confidence: 0.4,
    rawText: text,
    slots: {},
  };
}
