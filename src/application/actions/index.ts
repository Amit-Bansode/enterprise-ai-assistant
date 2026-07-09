import { applyLeave } from '@/application/actions/applyLeave';
import { generateMorningBrief } from '@/application/actions/generateMorningBrief';
import {
  cancelLeave,
  modifyLeave,
  viewLeaveStatus,
} from '@/application/actions/leaveWorkflow';
import { resumeWork } from '@/application/actions/resumeWork';
import { searchKnowledge } from '@/application/actions/searchKnowledge';
import { submitLeaveAction } from '@/application/actions/submitLeave';
import type { ActionContext, ActionHandler, ActionResult } from '@/application/actions/types';
import type { UserIntent } from '@/application/intents/types';

const actionRegistry: Partial<Record<UserIntent, ActionHandler>> = {
  apply_leave: applyLeave,
  submit_leave: submitLeaveAction,
  modify_leave: modifyLeave,
  cancel_leave: cancelLeave,
  daily_brief: generateMorningBrief,
  knowledge_search: searchKnowledge,
  resume_work: resumeWork,
};

async function runDefaultAction(context: ActionContext): Promise<ActionResult> {
  const normalized = context.userMessage.toLowerCase();

  if (normalized.includes('view leave status') || normalized.includes('view status')) {
    return viewLeaveStatus(context);
  }

  if (normalized.includes('done')) {
    return {
      actionId: 'noop',
      summary: 'Great! Let me know if you need anything else.',
      requiresKnowledge: false,
      payload: {},
    };
  }

  return {
    actionId: 'noop',
    summary: 'No enterprise action required for this message.',
    requiresKnowledge: context.intent.intent === 'general_question',
    payload: {},
  };
}

export async function executeAction(context: ActionContext): Promise<ActionResult> {
  const handler = actionRegistry[context.intent.intent] ?? runDefaultAction;
  return handler(context);
}
