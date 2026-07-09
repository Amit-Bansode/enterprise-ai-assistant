import type { DetectedIntent, UserIntent } from '@/application/intents/types';

interface IntentPattern {
  intent: UserIntent;
  confidence: number;
  keywords: string[];
}

const workflowActionPatterns: IntentPattern[] = [
  {
    intent: 'submit_leave',
    confidence: 0.95,
    keywords: ['submit leave draft', 'submit leave'],
  },
  {
    intent: 'modify_leave',
    confidence: 0.92,
    keywords: ['modify leave draft', 'modify leave', 'edit leave draft'],
  },
  {
    intent: 'cancel_leave',
    confidence: 0.92,
    keywords: ['cancel leave request', 'cancel leave', 'cancel request'],
  },
  {
    intent: 'resume_work',
    confidence: 0.9,
    keywords: [
      'refresh leave status',
      'view leave status',
      'view status',
      'done',
      'resume my work',
      'resume work',
    ],
  },
  {
    intent: 'daily_brief',
    confidence: 0.88,
    keywords: ['morning brief', 'daily brief', 'show my morning brief'],
  },
];

export function detectWorkflowAction(text: string): DetectedIntent | null {
  const normalized = text.trim().toLowerCase();

  for (const pattern of workflowActionPatterns) {
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

  return null;
}
