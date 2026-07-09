import type { ActionContext, ActionResult } from '@/application/actions/types';
import {
  clearConversationContext,
  getConversationContext,
  saveConversationContext,
} from '@/application/context/conversationContext';

export async function modifyLeave(context: ActionContext): Promise<ActionResult> {
  const contextState = getConversationContext();

  if (!contextState.draft) {
    return {
      actionId: 'modify_leave',
      summary: 'No leave draft to modify. Start by applying for leave.',
      requiresKnowledge: false,
      payload: {},
    };
  }

  return {
    actionId: 'modify_leave',
    summary:
      'Here is your current leave draft. Update the details and submit when ready.',
    requiresKnowledge: false,
    payload: { draft: contextState.draft },
  };
}

export async function cancelLeave(context: ActionContext): Promise<ActionResult> {
  clearConversationContext();

  return {
    actionId: 'cancel_leave',
    summary: 'Your leave request has been cancelled.',
    requiresKnowledge: false,
    payload: {},
  };
}

export async function viewLeaveStatus(context: ActionContext): Promise<ActionResult> {
  const contextState = getConversationContext();

  if (contextState.submitted) {
    return {
      actionId: 'resume_work',
      summary: 'Here is the latest status of your leave request.',
      requiresKnowledge: false,
      payload: { submitted: contextState.submitted },
    };
  }

  return {
    actionId: 'resume_work',
    summary: 'No active leave request found.',
    requiresKnowledge: false,
    payload: {},
  };
}
