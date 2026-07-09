import type { ActionResult } from '@/application/actions/types';
import type { AIResponse } from '@/application/provider/types';
import type { UIComponentDescriptor } from '@/application/parser/types';
import { phraseResponse } from '@/application/provider/phraseResponse';
import {
  LEAVE_DRAFT_PROMPTS,
  LEAVE_STATUS_PROMPTS,
  LEAVE_SUCCESS_PROMPTS,
} from '@/core/constants/workflowPrompts';
import {
  getMorningBriefTemplate,
  normalizeResponse,
} from '@/data/datasource/mock/resolveMockResponse';
import type { UserIntent } from '@/application/intents/types';

function toAIResponse(message: string, descriptors: UIComponentDescriptor[]): AIResponse {
  return {
    text: message,
    raw: JSON.stringify({ message, descriptors }, null, 2),
  };
}

function buildLeaveDraftDescriptor(draft: Record<string, unknown>): UIComponentDescriptor {
  return {
    id: 'leave_draft',
    kind: 'workflow_draft',
    title: 'Leave Request Draft',
    body: 'Review your leave details before submitting.',
    data: {
      ...draft,
      actions: [
        { label: 'Submit', prompt: LEAVE_DRAFT_PROMPTS.submit },
        { label: 'Modify', prompt: LEAVE_DRAFT_PROMPTS.modify },
        { label: 'Cancel', prompt: LEAVE_DRAFT_PROMPTS.cancel },
      ],
    },
  };
}

function buildLeaveSuccessDescriptor(submitted: Record<string, unknown>): UIComponentDescriptor {
  return {
    id: 'leave_success',
    kind: 'workflow_success',
    title: 'Leave Submitted',
    body: 'Your request is now pending manager approval.',
    data: {
      ...submitted,
      actions: [
        { label: 'View Status', prompt: LEAVE_SUCCESS_PROMPTS.viewStatus },
        { label: 'Done', prompt: LEAVE_SUCCESS_PROMPTS.done },
      ],
    },
  };
}

function buildLeaveStatusDescriptor(submitted: Record<string, unknown>): UIComponentDescriptor {
  return {
    id: 'leave_status',
    kind: 'workflow_status',
    title: 'Leave Status',
    body: 'Track your active leave request.',
    data: {
      ...submitted,
      actions: [
        { label: 'Refresh', prompt: LEAVE_STATUS_PROMPTS.refresh },
        { label: 'Cancel Request', prompt: LEAVE_STATUS_PROMPTS.cancelRequest },
      ],
    },
  };
}

export function generateMorningBriefResponse(): AIResponse {
  const template = getMorningBriefTemplate();
  const { message, descriptors } = normalizeResponse(template);
  return toAIResponse(message, descriptors);
}

export async function generateResponse(
  intent: UserIntent,
  actionResult: ActionResult,
): Promise<AIResponse> {
  if (intent === 'daily_brief') {
    return generateMorningBriefResponse();
  }

  const fallbackMessage = actionResult.summary;
  const message = await phraseResponse(intent, actionResult, fallbackMessage);
  const descriptors = buildDescriptors(intent, actionResult);

  return toAIResponse(message, descriptors);
}

function buildDescriptors(
  intent: UserIntent,
  actionResult: ActionResult,
): UIComponentDescriptor[] {
  switch (intent) {
    case 'apply_leave':
    case 'modify_leave': {
      const draft = actionResult.payload.draft as Record<string, unknown> | undefined;
      return draft ? [buildLeaveDraftDescriptor(draft)] : [];
    }
    case 'submit_leave': {
      const submitted = actionResult.payload.submitted as Record<string, unknown> | undefined;
      return submitted ? [buildLeaveSuccessDescriptor(submitted)] : [];
    }
    case 'resume_work': {
      if (actionResult.payload.submitted) {
        return [
          buildLeaveStatusDescriptor(actionResult.payload.submitted as Record<string, unknown>),
        ];
      }
      if (actionResult.payload.draft) {
        return [buildLeaveDraftDescriptor(actionResult.payload.draft as Record<string, unknown>)];
      }
      return [];
    }
    case 'knowledge_search':
      return normalizeResponse({
        message: actionResult.summary,
        components: [{ kind: 'knowledge_item' }],
      }).descriptors;
    case 'cancel_leave':
      return [];
    default:
      if (actionResult.payload.submitted) {
        return [
          buildLeaveStatusDescriptor(actionResult.payload.submitted as Record<string, unknown>),
        ];
      }
      return [];
  }
}

/** @deprecated Use generateResponse */
export async function generateMockResponse(
  intent: string,
  actionResult: ActionResult,
): Promise<AIResponse> {
  return generateResponse(intent as UserIntent, actionResult);
}
