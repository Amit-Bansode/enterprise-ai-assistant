export function createId(prefix = 'msg'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createLeaveDraftId(): string {
  const sequence = Math.floor(Math.random() * 999) + 1;
  return `LV-DRAFT-${String(sequence).padStart(3, '0')}`;
}
