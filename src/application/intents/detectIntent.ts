import type { DetectedIntent } from '@/application/intents/types';
import { detectIntentFallback } from '@/application/intents/detectIntentFallback';
import { detectWorkflowAction } from '@/application/intents/detectWorkflowAction';

export function detectIntent(text: string): DetectedIntent {
  return detectWorkflowAction(text) ?? detectIntentFallback(text);
}
