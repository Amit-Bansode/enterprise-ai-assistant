import type { ActionContext, ActionResult } from '@/application/actions/types';
import { getConversationContext } from '@/application/context/conversationContext';

export async function resumeWork(context: ActionContext): Promise<ActionResult> {
  const contextState = getConversationContext();

  if (contextState.activeWorkflow === 'leave' && contextState.submitted) {
    return {
      actionId: 'resume_work',
      summary:
        'You have an active leave request.\n\nWould you like to check its status?',
      requiresKnowledge: false,
      payload: { submitted: contextState.submitted },
    };
  }

  if (contextState.activeWorkflow === 'leave' && contextState.draft) {
    return {
      actionId: 'resume_work',
      summary:
        'You have a leave draft in progress.\n\nWould you like to continue where you left off?',
      requiresKnowledge: false,
      payload: { draft: contextState.draft },
    };
  }

  return {
    actionId: 'resume_work',
    summary: 'No active workflow found. How can I help you today?',
    requiresKnowledge: false,
    payload: {},
  };
}
