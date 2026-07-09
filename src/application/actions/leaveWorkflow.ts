import type { ActionContext, ActionResult } from '@/application/actions/types';
import {
  hasDraftUpdates,
  mergeDraftUpdates,
} from '@/application/actions/leaveDraftUtils';
import { getModifyFieldGuidance } from '@/application/actions/leaveModifyGuidance';
import {
  buildLeaveMessageContext,
  buildModifyFallbackMessage,
} from '@/application/actions/leaveMessageContext';
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

  if (hasDraftUpdates(context.intent.slots)) {
    const { draft: updatedDraft, changedFields } = mergeDraftUpdates(
      contextState.draft,
      context.intent.slots,
    );
    const messageContext = buildLeaveMessageContext(updatedDraft, changedFields);

    saveConversationContext({
      ...contextState,
      draft: updatedDraft,
      lastAction: 'modify',
      pendingModifyField: null,
    });

    return {
      actionId: 'modify_leave',
      summary: buildModifyFallbackMessage(messageContext),
      requiresKnowledge: false,
      payload: { draft: updatedDraft, messageContext },
    };
  }

  const fieldGuidance = getModifyFieldGuidance(context.userMessage);

  saveConversationContext({
    ...contextState,
    lastAction: 'modify_prompt',
    pendingModifyField: fieldGuidance?.field ?? null,
  });

  if (fieldGuidance) {
    return {
      actionId: 'modify_leave',
      summary: fieldGuidance.message,
      requiresKnowledge: false,
      payload: {
        modifyPrompt: true,
        field: fieldGuidance.field,
        examples: fieldGuidance.examples,
      },
    };
  }

  return {
    actionId: 'modify_leave',
    summary: 'Sure! What would you like to update in your leave request?',
    requiresKnowledge: false,
    payload: { modifyPrompt: true },
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
