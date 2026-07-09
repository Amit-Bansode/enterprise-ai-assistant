import type { ActionContext, ActionResult } from '@/application/actions/types';
import {
  getConversationContext,
  saveConversationContext,
} from '@/application/context/conversationContext';
import { submitLeave as submitLeaveApi } from '@/data/datasource/mock/submitLeave';
import {
  buildLeaveMessageContext,
  buildSubmitFallbackMessage,
} from '@/application/actions/leaveMessageContext';

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
    ...contextState,
    activeWorkflow: 'leave',
    status: 'submitted',
    submitted,
    lastAction: 'submit',
  });

  const messageContext = buildLeaveMessageContext(contextState.draft);

  return {
    actionId: 'submit_leave',
    summary: buildSubmitFallbackMessage(messageContext, submitted.reference),
    requiresKnowledge: false,
    payload: { submitted, messageContext, reference: submitted.reference },
  };
}
