export interface QuickAction {
  id: string;
  label: string;
  prompt: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'leave',
    label: '🌴 Apply Leave',
    prompt: 'Apply for leave tomorrow',
  },
  {
    id: 'policy',
    label: '📘 Search Policy',
    prompt: 'Search leave policy',
  },
  {
    id: 'resume',
    label: '▶ Resume Work',
    prompt: 'Resume my last workflow',
  },
  {
    id: 'meetings',
    label: "📅 Today's Meetings",
    prompt: 'Show my morning brief',
  },
];
