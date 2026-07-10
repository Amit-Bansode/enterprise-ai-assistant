const MONTH_NAMES =
  'january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec';

const MONTH_INDEX: Record<string, number> = {
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

export interface ParsedNaturalDate {
  iso: string;
  display: string;
}

export function parseNaturalLanguageDate(text: string): ParsedNaturalDate | null {
  const dayMonthYear = text.match(
    new RegExp(
      `(\\d{1,2})(?:st|nd|rd|th)?\\s*(${MONTH_NAMES})(?:\\s+(\\d{4}))?`,
      'i',
    ),
  );

  if (dayMonthYear) {
    const day = Number(dayMonthYear[1]);
    const month = MONTH_INDEX[dayMonthYear[2].toLowerCase()];
    const year = dayMonthYear[3] ? Number(dayMonthYear[3]) : 2026;
    return {
      iso: toIsoDateString(year, month, day),
      display: formatDateDisplayFromParts(year, month, day),
    };
  }

  const monthDayYear = text.match(
    new RegExp(
      `(${MONTH_NAMES})\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:\\s+(\\d{4}))?`,
      'i',
    ),
  );

  if (monthDayYear) {
    const month = MONTH_INDEX[monthDayYear[1].toLowerCase()];
    const day = Number(monthDayYear[2]);
    const year = monthDayYear[3] ? Number(monthDayYear[3]) : 2026;
    return {
      iso: toIsoDateString(year, month, day),
      display: formatDateDisplayFromParts(year, month, day),
    };
  }

  const normalized = text.toLowerCase();
  if (normalized.includes('tomorrow')) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      iso: toIsoDateFromLocalDate(tomorrow),
      display: formatDateDisplayFromParts(
        tomorrow.getFullYear(),
        tomorrow.getMonth(),
        tomorrow.getDate(),
      ),
    };
  }

  if (normalized.includes('today')) {
    const today = new Date();
    return {
      iso: toIsoDateFromLocalDate(today),
      display: formatDateDisplayFromParts(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      ),
    };
  }

  return null;
}

export function toIsoDateString(year: number, monthIndex: number, day: number): string {
  const month = String(monthIndex + 1).padStart(2, '0');
  const dayPart = String(day).padStart(2, '0');
  return `${year}-${month}-${dayPart}`;
}

export function parseIsoDate(isoDate: string): Date | null {
  const match = isoDate.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function toIsoDateFromLocalDate(date: Date): string {
  return toIsoDateString(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatDateDisplayFromParts(
  year: number,
  monthIndex: number,
  day: number,
): string {
  return new Date(year, monthIndex, day).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateDisplay(isoDate?: string): string {
  if (!isoDate) {
    return '';
  }

  const parsed = parseIsoDate(isoDate);
  if (!parsed || Number.isNaN(parsed.getTime())) {
    return isoDate;
  }

  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function normalizeDuration(duration?: string): string {
  if (!duration?.trim()) {
    return '1 Day';
  }

  const normalized = duration.trim();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
