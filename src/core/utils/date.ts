export function formatDateDisplay(isoDate?: string): string {
  if (!isoDate) {
    return '';
  }

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
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
