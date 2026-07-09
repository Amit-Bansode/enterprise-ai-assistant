import type { ActionContext, ActionResult } from '@/application/actions/types';
import {
  getConversationContext,
  saveConversationContext,
} from '@/application/context/conversationContext';
import { submitLeave as submitLeaveApi } from '@/data/datasource/mock/submitLeave';

export async function submitLeaveAction(context: ActionContext): Promise<ActionResult> {
  const contextState = getConversationContext();

  if (!contextState.draft) {
    return {
      actionId: 'submit_leave',
      summary: 'No leave draft found. Please apply for leave first.',
      requiresKnowledge: false,
      payload: {},
    };
  }

  const submitted = await submitLeaveApi(contextState.draft);

  saveConversationContext({
    activeWorkflow: 'leave',
    status: 'submitted',
    draft: contextState.draft,
    submitted,
    lastAction: 'submit',
  });

  return {
    actionId: 'submit_leave',
    summary: 'Your leave request has been submitted successfully.',
    requiresKnowledge: false,
    payload: { submitted },
  };
}
