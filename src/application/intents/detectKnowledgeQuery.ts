import type { DetectedIntent } from '@/application/intents/types';

const POLICY_PHRASES = [
  'leave policy',
  'travel policy',
  'expense policy',
  'carry forward',
  'what is the policy',
  'what is the leave',
  'search policy',
  'search leave policy',
  'tell me about the policy',
  'tell me about leave',
  'handbook',
  'guideline',
  'how many days',
  'can i carry',
];

export function isPolicyQuestion(text: string): boolean {
  const normalized = text.trim().toLowerCase();

  if (normalized.includes('policy')) {
    return true;
  }

  return POLICY_PHRASES.some(phrase => normalized.includes(phrase));
}

export function detectKnowledgeQuery(text: string): DetectedIntent | null {
  if (!isPolicyQuestion(text)) {
    return null;
  }

  const normalized = text.trim().toLowerCase();
  const matched =
    POLICY_PHRASES.find(phrase => normalized.includes(phrase)) ?? 'policy';

  return {
    intent: 'knowledge_search',
    confidence: 0.93,
    rawText: text,
    slots: { trigger: matched },
  };
}
