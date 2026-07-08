import type { AIResponseContext, AIResponse } from '@/application/provider/types';
import type { UIComponentDescriptor } from '@/application/parser/types';

function formatKnowledge(context: AIResponseContext): string {
  if (!context.knowledge?.items.length) {
    return '';
  }

  const citations = context.knowledge.items
    .map(item => `- ${item.title} (${item.source}): ${item.snippet}`)
    .join('\n');

  return `\n\nRelevant knowledge:\n${citations}`;
}

function buildDescriptors(context: AIResponseContext): UIComponentDescriptor[] {
  const { intent, actionResult, knowledge } = context;

  switch (intent.intent) {
    case 'apply_leave':
      return [
        {
          id: 'leave_draft',
          kind: 'workflow_draft',
          title: 'Leave request draft',
          body: 'Review dates and submit for manager approval.',
          data: {
            actionLabel: 'Review leave request',
            ...actionResult.payload,
          },
        },
      ];
    case 'daily_brief':
      return [
        {
          id: 'morning_brief',
          kind: 'daily_summary',
          title: 'Morning brief',
          body: actionResult.summary,
          data: actionResult.payload,
        },
      ];
    case 'knowledge_search':
      return (knowledge?.items ?? []).map(item => ({
        id: item.id,
        kind: 'knowledge_item' as const,
        title: item.title,
        body: item.snippet,
        data: { source: item.source },
      }));
    case 'resume_work':
      return [
        {
          id: 'resume_workflow',
          kind: 'workflow_resume',
          title: 'Resume workflow',
          body: String(
            actionResult.payload.lastWorkflow ?? 'Continue your last task.',
          ),
          data: {
            actionLabel: 'Continue',
            ...actionResult.payload,
          },
        },
      ];
    default:
      return [];
  }
}

export async function generateAIResponse(
  context: AIResponseContext,
): Promise<AIResponse> {
  const knowledgeSection = formatKnowledge(context);
  const text = [
    context.actionResult.summary,
    `Intent: ${context.intent.intent.replace('_', ' ')}.`,
    knowledgeSection,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const descriptors = buildDescriptors(context);

  return {
    text,
    raw: JSON.stringify(
      {
        message: text,
        descriptors,
      },
      null,
      2,
    ),
  };
}
