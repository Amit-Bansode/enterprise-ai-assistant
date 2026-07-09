import type { LeaveDraft } from '@/domain/entities/ConversationContext';
import { formatDateDisplay, normalizeDuration } from '@/core/utils/date';
import type { LeaveChangeField } from '@/application/actions/leaveMessageContext';

export function hasDraftUpdates(slots: Record<string, string>): boolean {
  return Boolean(
    slots.date?.trim() ||
      slots.reason?.trim() ||
      slots.duration?.trim() ||
      slots.leaveType?.trim(),
  );
}

export interface DraftMergeResult {
  draft: LeaveDraft;
  changedFields: LeaveChangeField[];
}

export function mergeDraftUpdates(
  draft: LeaveDraft,
  slots: Record<string, string>,
): DraftMergeResult {
  const updated = { ...draft };
  const changedFields: LeaveChangeField[] = [];

  if (slots.date?.trim()) {
    updated.date = slots.date.trim();
    updated.dateDisplay = slots.dateDisplay?.trim() || formatDateDisplay(updated.date);
    changedFields.push('date');
  }

  if (slots.reason?.trim()) {
    updated.reason = slots.reason.trim();
    changedFields.push('reason');
  }

  if (slots.duration?.trim()) {
    updated.duration = normalizeDuration(slots.duration);
    changedFields.push('duration');
  }

  if (slots.leaveType?.trim()) {
    updated.leaveType = slots.leaveType.trim();
    changedFields.push('leaveType');
  }

  return { draft: updated, changedFields };
}
