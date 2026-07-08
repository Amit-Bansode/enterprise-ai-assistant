import type { ActionContext, ActionResult } from '@/application/actions/types';

export async function resumeWork(context: ActionContext): Promise<ActionResult> {
  return {
    actionId: 'resume_work',
    summary: 'Restored your last active workflow context.',
    requiresKnowledge: false,
    payload: {
      lastWorkflow: 'Expense reimbursement #EXP-1042',
      lastStep: 'Manager approval pending',
      resumedAt: new Date().toISOString(),
    },
  };
}
