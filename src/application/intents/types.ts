export type UserIntent =
  | 'general_question'
  | 'workflow_action'
  | 'knowledge_lookup'
  | 'unknown';

export interface ParsedIntent {
  intent: UserIntent;
  confidence: number;
  rawText: string;
}
