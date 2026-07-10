import { parseNaturalLanguageDate } from '@/core/utils/date';

function titleCase(text: string): string {
  return text
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function parseReason(text: string): string {
  if (/\bbirthday\b/i.test(text)) {
    if (/\b(?:my\s+)?son(?:'s)?\b/i.test(text)) {
      return "Son's Birthday";
    }
    if (/\b(?:my\s+)?daughter(?:'s)?\b/i.test(text)) {
      return "Daughter's Birthday";
    }
    return 'Birthday';
  }

  const patterns = [
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

  return 'Personal';
}

export interface LeaveSlots {
  date: string;
  dateDisplay: string;
  reason: string;
}

export function parseLeaveSlots(text: string): LeaveSlots {
  const parsedDate = parseNaturalLanguageDate(text);
  const reason = parseReason(text);

  if (parsedDate) {
    return {
      date: parsedDate.iso,
      dateDisplay: parsedDate.display,
      reason,
    };
  }

  return {
    date: '',
    dateDisplay: '',
    reason,
  };
}
