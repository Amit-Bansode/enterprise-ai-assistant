import type { ModifyField } from '@/application/actions/leaveModifyGuidance';
import { normalizeDuration, parseNaturalLanguageDate } from '@/core/utils/date';

function titleCase(text: string): string {
  return text
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function parseDurationFromText(text: string): string | null {
  const normalized = text.toLowerCase();

  if (normalized.includes('half day') || normalized.includes('half-day')) {
    return 'Half Day';
  }

  if (normalized.includes('full day')) {
    return '1 Day';
  }

  const match = normalized.match(/(\d+)\s*days?/);
  if (match) {
    return normalizeDuration(`${match[1]} days`);
  }

  return null;
}

function parseLeaveTypeFromText(text: string): string | null {
  const normalized = text.toLowerCase();

  if (normalized.includes('sick leave') || normalized.includes('sick')) {
    return 'Sick Leave';
  }

  if (normalized.includes('annual leave') || normalized.includes('annual')) {
    return 'Annual Leave';
  }

  if (normalized.includes('casual leave') || normalized.includes('casual')) {
    return 'Casual Leave';
  }

  if (normalized.includes('unpaid leave') || normalized.includes('unpaid')) {
    return 'Unpaid Leave';
  }

  return null;
}

function parseReasonFromText(text: string): string | null {
  const patterns = [
    /\breason\s*(?:is|:)\s*(.+)$/i,
    /\b(?:its|it's|it is)\s+(?:my\s+)?(.+)$/i,
    /\bbecause\s+(?:its|it's|it is)\s+(?:my\s+)?(.+)$/i,
    /\bfor\s+(.+)$/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]?.trim()) {
      return titleCase(match[1].trim());
    }
  }

  return null;
}

export function parseModifySlots(
  text: string,
  pendingField?: ModifyField | null,
): Record<string, string> {
  const slots: Record<string, string> = {};
  const trimmed = text.trim();

  if (!trimmed) {
    return slots;
  }

  if (pendingField === 'date' || !pendingField) {
    const parsedDate = parseNaturalLanguageDate(trimmed);
    if (parsedDate) {
      slots.date = parsedDate.iso;
      slots.dateDisplay = parsedDate.display;
    }
  }

  if (pendingField === 'duration' || !pendingField) {
    const duration = parseDurationFromText(trimmed);
    if (duration) {
      slots.duration = duration;
    }
  }

  if (pendingField === 'leaveType' || !pendingField) {
    const leaveType = parseLeaveTypeFromText(trimmed);
    if (leaveType) {
      slots.leaveType = leaveType;
    }
  }

  if (pendingField === 'reason') {
    slots.reason = titleCase(trimmed.replace(/^reason\s*(?:is|:)\s*/i, ''));
    return slots;
  }

  const reason = parseReasonFromText(trimmed);
  if (reason) {
    slots.reason = reason;
  }

  if (pendingField === 'date' && !slots.date) {
    const parsedDate = parseNaturalLanguageDate(trimmed);
    if (parsedDate) {
      slots.date = parsedDate.iso;
      slots.dateDisplay = parsedDate.display;
    }
  }

  return slots;
}
