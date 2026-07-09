import type { ActionContext, ActionResult } from '@/application/actions/types';
import { saveConversationContext } from '@/application/context/conversationContext';
import type { LeaveDraft } from '@/domain/entities/ConversationContext';
import { normalizeDuration } from '@/core/utils/date';
import { createLeaveDraftId } from '@/core/utils/id';
import {
  buildApplyFallbackMessage,
  buildLeaveMessageContext,
} from '@/application/actions/leaveMessageContext';

export async function applyLeave(context: ActionContext): Promise<ActionResult> {
  const { slots } = context.intent;

  const draft: LeaveDraft = {
    date: slots.date ?? '2026-07-10',
    dateDisplay: slots.dateDisplay ?? '10 July 2026',
    duration: normalizeDuration(slots.duration),
    reason: slots.reason?.trim() || 'Personal',
    leaveType: slots.leaveType?.trim() || 'Annual Leave',
    balance: '12 Days',
    approver: 'Engineering Manager',
    status: 'draft',
  };

  saveConversationContext({
    activeWorkflow: 'leave',
    draftId: createLeaveDraftId(),
    status: 'draft',
    draft,
    submitted: null,
    lastAction: 'apply',
    pendingModifyField: null,
  });

  const messageContext = buildLeaveMessageContext(draft);

  return {
    actionId: 'apply_leave',
    summary: buildApplyFallbackMessage(messageContext),
    requiresKnowledge: false,
    payload: { draft, messageContext },
  };
}
