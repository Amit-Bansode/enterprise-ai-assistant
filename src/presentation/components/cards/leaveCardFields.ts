interface CardField {
  label: string;
  value: string;
}

export function getLeaveDetailFields(metadata?: Record<string, unknown>): CardField[] {
  return [
    { label: 'Date', value: String(metadata?.dateDisplay ?? metadata?.date ?? '—') },
    { label: 'Duration', value: String(metadata?.duration ?? '—') },
    { label: 'Reason', value: String(metadata?.reason ?? '—') },
    { label: 'Leave Type', value: String(metadata?.leaveType ?? '—') },
    { label: 'Approver', value: String(metadata?.approver ?? '—') },
  ];
}
