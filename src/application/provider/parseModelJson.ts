import type { UserIntent } from '@/application/intents/types';

const VALID_INTENTS = new Set<UserIntent>([
  'apply_leave',
  'submit_leave',
  'modify_leave',
  'cancel_leave',
  'daily_brief',
  'knowledge_search',
  'resume_work',
  'general_question',
  'unknown',
]);

export function parseModelJson<T>(text: string): T {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const jsonText = fenced ? fenced[1].trim() : trimmed;

  return JSON.parse(jsonText) as T;
}

export function toValidIntent(value: string): UserIntent {
  const normalized = value.trim() as UserIntent;
  return VALID_INTENTS.has(normalized) ? normalized : 'unknown';
}
