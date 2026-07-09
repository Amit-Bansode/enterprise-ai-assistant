import { hasDraftUpdates } from '@/application/actions/leaveDraftUtils';
import { isPolicyQuestion } from '@/application/intents/detectKnowledgeQuery';
import { parseModifySlots } from '@/application/intents/parseModifySlots';
import type { DetectedIntent } from '@/application/intents/types';
import type { ConversationContext } from '@/domain/entities/ConversationContext';

export function isModifySessionActive(context: ConversationContext): boolean {
  return (
    context.activeWorkflow === 'leave' &&
    context.status === 'draft' &&
    Boolean(context.draft) &&
    context.lastAction === 'modify_prompt'
  );
}

export function detectModifySessionUpdate(
  text: string,
  context: ConversationContext,
): DetectedIntent | null {
  if (!isModifySessionActive(context)) {
    return null;
  }

  if (isPolicyQuestion(text)) {
    return null;
  }

  const slots = parseModifySlots(text, context.pendingModifyField);

  if (!hasDraftUpdates(slots)) {
    return null;
  }

  return {
    intent: 'modify_leave',
    confidence: 0.96,
    rawText: text,
    slots: {
      ...slots,
      trigger: context.pendingModifyField ?? 'modify_session',
    },
  };
}
