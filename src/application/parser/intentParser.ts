import type { ParsedIntent } from '@/application/intents/types';

export function parseIntent(text: string): ParsedIntent {
  const normalized = text.trim().toLowerCase();

  if (normalized.includes('approve') || normalized.includes('submit')) {
    return {
      intent: 'workflow_action',
      confidence: 0.8,
      rawText: text,
    };
  }

  if (normalized.includes('policy') || normalized.includes('document')) {
    return {
      intent: 'knowledge_lookup',
      confidence: 0.75,
      rawText: text,
    };
  }

  if (normalized.endsWith('?')) {
    return {
      intent: 'general_question',
      confidence: 0.6,
      rawText: text,
    };
  }

  return {
    intent: 'unknown',
    confidence: 0.4,
    rawText: text,
  };
}
