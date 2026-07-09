import type { UIComponentDescriptor } from '@/application/parser/types';

export interface MockComponentRef {
  kind: UIComponentDescriptor['kind'];
}

export interface MockResponseTemplate {
  message: string;
  components: MockComponentRef[];
}

const descriptorCatalog: Partial<
  Record<UIComponentDescriptor['kind'], UIComponentDescriptor>
> = {
  daily_summary: {
    id: 'daily_summary',
    kind: 'daily_summary',
    title: "Today's Brief",
    body: '2 meetings • 2 approvals • 1 learning module',
    data: {
      meetings: 2,
      pendingApprovals: 2,
      learningModules: 1,
    },
  },
  meeting: {
    id: 'meetings',
    kind: 'meeting',
    title: 'Meetings (2)',
    body: 'Your schedule for today',
    data: {
      count: 2,
      items: [
        { time: '10:30', title: 'Design Review' },
        { time: '2:00', title: 'Sprint Planning' },
      ],
    },
  },
  task: {
    id: 'approvals',
    kind: 'task',
    title: 'Pending Approvals (2)',
    body: '2 approvals waiting',
    data: {
      pendingCount: 2,
      items: [{ title: 'Leave Approval' }, { title: 'Expense Approval' }],
    },
  },
  learning: {
    id: 'learning',
    kind: 'learning',
    title: 'Continue Learning',
    body: 'React Native TurboModules',
    data: {
      course: 'React Native TurboModules',
      progress: 62,
    },
  },
  ai_suggestion: {
    id: 'ai_suggestion',
    kind: 'ai_suggestion',
    title: 'AI Suggestion',
    body: '"You have a free 30-minute slot at 4 PM. Continue your React Native learning?"',
    data: {},
  },
  workflow_draft: {
    id: 'workflow_draft',
    kind: 'workflow_draft',
    title: 'Leave Request Draft',
    body: 'Review your leave details before submitting.',
    data: {},
  },
  knowledge_item: {
    id: 'knowledge_item',
    kind: 'knowledge_item',
    title: 'Leave Policy',
    body: 'Annual Leave',
    data: {
      subtitle: 'Annual Leave',
      bullets: [
        '18 days/year',
        'Carry forward allowed (up to 5 days)',
        'Manager approval required',
      ],
      source: 'HR Policy v2.1',
      updatedAt: 'Jan 2026',
    },
  },
  workflow_resume: {
    id: 'workflow_resume',
    kind: 'workflow_resume',
    title: 'Resume workflow',
    body: 'Expense reimbursement #EXP-1042 — Manager approval pending',
    data: { actionLabel: 'Continue' },
  },
  action_prompt: {
    id: 'action_prompt',
    kind: 'action_prompt',
    title: 'Action required',
    body: 'Review and confirm to continue.',
    data: { actionLabel: 'Confirm' },
  },
};

export function normalizeResponse(
  template: MockResponseTemplate,
): { message: string; descriptors: UIComponentDescriptor[] } {
  const descriptors = template.components
    .map(ref => descriptorCatalog[ref.kind])
    .filter((descriptor): descriptor is UIComponentDescriptor => Boolean(descriptor));

  return {
    message: template.message,
    descriptors,
  };
}

export function getMorningBriefTemplate(): MockResponseTemplate {
  return require('./morningBrief.json') as MockResponseTemplate;
}
