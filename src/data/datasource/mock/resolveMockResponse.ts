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
    title: 'Meetings',
    body: 'Your schedule for today',
    data: {
      items: [
        { time: '10:30', title: 'Design Review' },
        { time: '2:00', title: 'Sprint Planning' },
      ],
    },
  },
  task: {
    id: 'tasks',
    kind: 'task',
    title: 'Pending Tasks',
    body: '2 approvals waiting',
    data: {
      pendingCount: 2,
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
    title: 'Leave Policy 2026',
    body: 'Annual leave requests require manager approval at least 3 days in advance.',
    data: { source: 'HR Handbook' },
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
