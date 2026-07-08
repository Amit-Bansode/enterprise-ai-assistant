import type { ActionContext, ActionResult } from '@/application/actions/types';

export async function applyLeave(context: ActionContext): Promise<ActionResult> {
  return {
    actionId: 'apply_leave',
    summary: 'Prepared a leave request draft from your message.',
    requiresKnowledge: false,
    payload: {
      leaveType: 'annual',
      status: 'draft',
      requestedOn: new Date().toISOString(),
      reason: context.userMessage,
    },
  };
}
