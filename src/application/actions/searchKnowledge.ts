import type { ActionContext, ActionResult } from '@/application/actions/types';

export async function searchKnowledge(
  context: ActionContext,
): Promise<ActionResult> {
  return {
    actionId: 'knowledge_search',
    summary: 'Searching enterprise knowledge for relevant documents.',
    requiresKnowledge: true,
    payload: {
      query: context.userMessage,
      scope: 'enterprise',
    },
  };
}
