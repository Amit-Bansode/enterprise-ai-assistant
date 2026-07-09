const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function parseExplicitDate(text: string): Date | null {
  const match = text.match(
    /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)(?:\s+(\d{4}))?/i,
  );

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = MONTHS[match[2].toLowerCase()];
  const year = match[3] ? Number(match[3]) : 2026;

  return new Date(year, month, day);
}

function parseRelativeDate(text: string): Date | null {
  const normalized = text.toLowerCase();
  const date = new Date();

  if (normalized.includes('tomorrow')) {
    date.setDate(date.getDate() + 1);
    return date;
  }

  if (normalized.includes('today')) {
    return date;
  }

  return null;
}

function parseReason(text: string): string {
  const match = text.match(/\bfor\s+(.+)$/i);
  if (!match) {
    return 'Personal';
  }

  return match[1]
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export interface LeaveSlots {
  date: string;
  dateDisplay: string;
  reason: string;
}

export function parseLeaveSlots(text: string): LeaveSlots {
  const parsedDate = parseExplicitDate(text) ?? parseRelativeDate(text) ?? new Date(2026, 6, 10);
  const reason = parseReason(text);

  return {
    date: parsedDate.toISOString().slice(0, 10),
    dateDisplay: formatDisplayDate(parsedDate),
    reason,
  };
}
