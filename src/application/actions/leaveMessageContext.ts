import type { LeaveDraft } from '@/domain/entities/ConversationContext';

export type LeaveChangeField = 'date' | 'duration' | 'reason' | 'leaveType';

export interface LeaveMessageContext {
  date: string;
  duration: string;
  reason: string;
  leaveType: string;
  changedFields?: LeaveChangeField[];
}

export function buildLeaveMessageContext(
  draft: LeaveDraft,
  changedFields?: LeaveChangeField[],
): LeaveMessageContext {
  return {
    date: draft.dateDisplay,
    duration: draft.duration,
    reason: draft.reason,
    leaveType: draft.leaveType,
    changedFields,
  };
}

export function buildModifyFallbackMessage(context: LeaveMessageContext): string {
  const changed = context.changedFields ?? [];

  if (changed.includes('date')) {
    return `I've updated your leave date to ${context.date} while keeping the remaining details unchanged. Please review the updated draft below before submitting.`;
  }

  if (changed.includes('duration')) {
    return `I've changed the leave duration to ${context.duration} and regenerated your draft. Please verify the updated request before submission.`;
  }

  if (changed.includes('reason')) {
    return `Done. I've updated the reason to ${context.reason}. Review the revised leave request below.`;
  }

  if (changed.includes('leaveType')) {
    return `I've updated the leave type to ${context.leaveType}. Please review the revised draft below before submitting.`;
  }

  return "I've updated your leave draft with the new details. Please review below before submitting.";
}

export function buildApplyFallbackMessage(context: LeaveMessageContext): string {
  return `I've prepared a leave request for ${context.date} for your review. Please check the draft below before submitting.`;
}

export function buildSubmitFallbackMessage(
  context: LeaveMessageContext,
  reference?: string,
): string {
  if (reference) {
    return `Your leave request, ${reference}, has been submitted successfully. Please review the confirmation below.`;
  }

  return 'Your leave request has been submitted successfully. Please review the confirmation below.';
}
