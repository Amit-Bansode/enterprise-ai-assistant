import type { DetectedIntent } from '@/application/intents/types';
import { parseModifySlots } from '@/application/intents/parseModifySlots';
import { hasDraftUpdates } from '@/application/actions/leaveDraftUtils';
import type { ConversationContext } from '@/domain/entities/ConversationContext';

const MODIFY_KEYWORDS = [
  'change it',
  'change to',
  'change the',
  'update it',
  'update to',
  'update the',
  'make it',
  'switch to',
  'move to',
  'set it to',
];

export function detectConversationModify(
  text: string,
  context: ConversationContext,
): DetectedIntent | null {
  if (context.activeWorkflow !== 'leave' || context.status !== 'draft' || !context.draft) {
    return null;
  }

  const normalized = text.trim().toLowerCase();
  const matched = MODIFY_KEYWORDS.find(keyword => normalized.includes(keyword));

  if (!matched) {
    return null;
  }

  const slots = parseModifySlots(text);
  if (!hasDraftUpdates(slots)) {
    return null;
  }

  return {
    intent: 'modify_leave',
    confidence: 0.88,
    rawText: text,
    slots: { ...slots, trigger: matched },
  };
}
