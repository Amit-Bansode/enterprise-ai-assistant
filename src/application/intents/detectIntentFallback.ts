import type { DetectedIntent, UserIntent } from '@/application/intents/types';
import { parseLeaveSlots } from '@/application/intents/parseLeaveSlots';

interface IntentPattern {
  intent: UserIntent;
  confidence: number;
  keywords: string[];
}

const intentPatterns: IntentPattern[] = [
  {
    intent: 'apply_leave',
    confidence: 0.75,
    keywords: ['leave', 'pto', 'vacation', 'time off', 'day off'],
  },
  {
    intent: 'daily_brief',
    confidence: 0.75,
    keywords: ['brief', 'standup', 'meetings', 'today'],
  },
  {
    intent: 'knowledge_search',
    confidence: 0.75,
    keywords: ['policy', 'document', 'search', 'handbook', 'guideline'],
  },
  {
    intent: 'resume_work',
    confidence: 0.75,
    keywords: ['resume'],
  },
];

export function detectIntentFallback(text: string): DetectedIntent {
  const normalized = text.trim().toLowerCase();

  for (const pattern of intentPatterns) {
    const matched = pattern.keywords.find(keyword => normalized.includes(keyword));
    if (matched) {
      const slots: Record<string, string> = { trigger: matched };

      if (pattern.intent === 'apply_leave') {
        const leaveSlots = parseLeaveSlots(text);
        slots.date = leaveSlots.date;
        slots.dateDisplay = leaveSlots.dateDisplay;
        slots.reason = leaveSlots.reason;
      }

      return {
        intent: pattern.intent,
        confidence: pattern.confidence,
        rawText: text,
        slots,
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
