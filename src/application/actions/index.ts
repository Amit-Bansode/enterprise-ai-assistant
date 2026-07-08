import { applyLeave } from '@/application/actions/applyLeave';
import { generateMorningBrief } from '@/application/actions/generateMorningBrief';
import { resumeWork } from '@/application/actions/resumeWork';
import { searchKnowledge } from '@/application/actions/searchKnowledge';
import type { ActionContext, ActionHandler, ActionResult } from '@/application/actions/types';
import type { UserIntent } from '@/application/intents/types';

const actionRegistry: Partial<Record<UserIntent, ActionHandler>> = {
  apply_leave: applyLeave,
  daily_brief: generateMorningBrief,
  knowledge_search: searchKnowledge,
  resume_work: resumeWork,
};

async function runDefaultAction(context: ActionContext): Promise<ActionResult> {
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
