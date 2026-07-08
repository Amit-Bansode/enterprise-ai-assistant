import type { ActionResult } from '@/application/actions/types';
import type { DetectedIntent } from '@/application/intents/types';
import type { KnowledgeResult } from '@/application/retrieval/types';

export interface AIResponseContext {
  userMessage: string;
  intent: DetectedIntent;
  actionResult: ActionResult;
  knowledge: KnowledgeResult | null;
}

export interface AIResponse {
  text: string;
  raw: string;
}
