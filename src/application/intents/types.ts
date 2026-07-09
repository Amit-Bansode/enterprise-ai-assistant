export type UserIntent =
  | 'apply_leave'
  | 'submit_leave'
  | 'modify_leave'
  | 'cancel_leave'
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
