import { parseNaturalLanguageDate } from '@/core/utils/date';
import { parseLeaveSlots } from '@/application/intents/parseLeaveSlots';

describe('parseNaturalLanguageDate', () => {
  it('parses compact day-month without space', () => {
    const result = parseNaturalLanguageDate('Apply leave on 11july its my son\'s');
    expect(result).toEqual({
      iso: '2026-07-11',
      display: '11 July 2026',
    });
  });

  it('parses spaced day-month', () => {
    const result = parseNaturalLanguageDate('birthday leave for 11 july');
    expect(result).toEqual({
      iso: '2026-07-11',
      display: '11 July 2026',
    });
  });
});

describe('parseLeaveSlots', () => {
  it('extracts date and son birthday reason from compact input', () => {
    const slots = parseLeaveSlots('Apply leave on 11july its my son\'s');
    expect(slots).toEqual({
      date: '2026-07-11',
      dateDisplay: '11 July 2026',
      reason: "Son's",
    });
  });

  it('detects birthday leave reason', () => {
    const slots = parseLeaveSlots('i request birthday leave for 11 july');
    expect(slots.date).toBe('2026-07-11');
    expect(slots.reason).toBe('Birthday');
  });
});
