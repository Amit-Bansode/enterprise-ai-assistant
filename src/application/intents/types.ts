export type UserIntent =
  | 'apply_leave'
  | 'daily_brief'
  | 'knowledge_search'
  | 'resume_work'
  | 'general_question'
  | 'unknown';

export interface DetectedIntent {
  intent: UserIntent;
  confidence: number;
  rawText: string;
  slots: Record<string, string>;
}
