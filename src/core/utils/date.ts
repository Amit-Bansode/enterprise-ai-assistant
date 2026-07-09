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
