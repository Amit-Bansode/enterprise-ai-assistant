import type { DetectedIntent, UserIntent } from '@/application/intents/types';

export interface ActionContext {
  userMessage: string;
  intent: DetectedIntent;
}

export interface ActionResult {
  actionId: UserIntent | 'noop';
  summary: string;
  requiresKnowledge: boolean;
  payload: Record<string, unknown>;
}

export type ActionHandler = (context: ActionContext) => Promise<ActionResult>;
