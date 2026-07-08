import type { ActionContext, ActionResult } from '@/application/actions/types';

export async function generateMorningBrief(
  context: ActionContext,
): Promise<ActionResult> {
  return {
    actionId: 'daily_brief',
    summary: 'Compiled your morning brief from calendar, tasks, and approvals.',
    requiresKnowledge: false,
    payload: {
      meetings: 3,
      pendingApprovals: 2,
      priorityTasks: ['Review Q3 budget', 'Sign vendor contract'],
      generatedAt: new Date().toISOString(),
    },
  };
}
