import type { LeaveDraft } from '@/domain/entities/ConversationContext';
import { formatDateDisplay, normalizeDuration } from '@/core/utils/date';

export function hasDraftUpdates(slots: Record<string, string>): boolean {
  return Boolean(
    slots.date?.trim() ||
      slots.reason?.trim() ||
      slots.duration?.trim() ||
      slots.leaveType?.trim(),
  );
}

export function mergeDraftUpdates(draft: LeaveDraft, slots: Record<string, string>): LeaveDraft {
  const updated = { ...draft };

  if (slots.date?.trim()) {
    updated.date = slots.date.trim();
    updated.dateDisplay = slots.dateDisplay?.trim() || formatDateDisplay(updated.date);
  }

  if (slots.reason?.trim()) {
    updated.reason = slots.reason.trim();
  }

  if (slots.duration?.trim()) {
    updated.duration = normalizeDuration(slots.duration);
  }

  if (slots.leaveType?.trim()) {
    updated.leaveType = slots.leaveType.trim();
  }

  return updated;
}
