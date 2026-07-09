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
    prompt: 'What is the leave policy?',
  },
  {
    id: 'resume',
    label: '▶ Resume Work',
    prompt: 'Resume my last workflow',
  },
  {
    id: 'briefing',
    label: "🌅 Today's Briefing",
    prompt: 'Show my morning brief',
  },
];
