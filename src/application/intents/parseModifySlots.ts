import type { ModifyField } from '@/application/actions/leaveModifyGuidance';
import { formatDateDisplay, normalizeDuration } from '@/core/utils/date';

const MONTHS: Record<string, number> = {
  january: 0,
  jan: 0,
  february: 1,
  feb: 1,
  march: 2,
  mar: 2,
  april: 3,
  apr: 3,
  may: 4,
  june: 5,
  jun: 5,
  july: 6,
  jul: 6,
  august: 7,
  aug: 7,
  september: 8,
  sep: 8,
  sept: 8,
  october: 9,
  oct: 9,
  november: 10,
  nov: 10,
  december: 11,
  dec: 11,
};

function titleCase(text: string): string {
  return text
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function parseDateFromText(text: string): { iso: string; display: string } | null {
  const dayMonthYear = text.match(
    /(\d{1,2})(?:st|nd|rd|th)?\s*(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)(?:\s+(\d{4}))?/i,
  );

  if (dayMonthYear) {
    const day = Number(dayMonthYear[1]);
    const month = MONTHS[dayMonthYear[2].toLowerCase()];
    const year = dayMonthYear[3] ? Number(dayMonthYear[3]) : 2026;
    const iso = new Date(year, month, day).toISOString().slice(0, 10);
    return { iso, display: formatDateDisplay(iso) };
  }

  const monthDay = text.match(
    /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s+(\d{4}))?/i,
  );

  if (monthDay) {
    const month = MONTHS[monthDay[1].toLowerCase()];
    const day = Number(monthDay[2]);
    const year = monthDay[3] ? Number(monthDay[3]) : 2026;
    const iso = new Date(year, month, day).toISOString().slice(0, 10);
    return { iso, display: formatDateDisplay(iso) };
  }

  const normalized = text.toLowerCase();
  if (normalized.includes('tomorrow')) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const iso = tomorrow.toISOString().slice(0, 10);
    return { iso, display: formatDateDisplay(iso) };
  }

  return null;
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
  const reasonMatch = text.match(/\breason\s*(?:is|:)\s*(.+)$/i);
  if (reasonMatch) {
    return titleCase(reasonMatch[1]);
  }

  const forMatch = text.match(/\bfor\s+(.+)$/i);
  if (forMatch) {
    return titleCase(forMatch[1]);
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
    const parsedDate = parseDateFromText(trimmed);
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

  if (
    pendingField === 'date' &&
    !slots.date &&
    !slots.reason &&
    !slots.duration &&
    !slots.leaveType
  ) {
    const parsedDate = parseDateFromText(trimmed);
    if (parsedDate) {
      slots.date = parsedDate.iso;
      slots.dateDisplay = parsedDate.display;
    }
  }

  return slots;
}
