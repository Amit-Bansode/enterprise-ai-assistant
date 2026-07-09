import type { AIResponse } from '@/application/provider/types';
import type { UIComponentDescriptor } from '@/application/parser/types';
import {
  getMorningBriefTemplate,
  normalizeResponse,
} from '@/data/datasource/mock/resolveMockResponse';

function toAIResponse(message: string, descriptors: UIComponentDescriptor[]): AIResponse {
  return {
    text: message,
    raw: JSON.stringify({ message, descriptors }, null, 2),
  };
}

export function generateMorningBriefResponse(): AIResponse {
  const template = getMorningBriefTemplate();
  const { message, descriptors } = normalizeResponse(template);
  return toAIResponse(message, descriptors);
}

function buildDescriptorsForIntent(
  intent: string,
): { message: string; descriptors: UIComponentDescriptor[] } | null {
  switch (intent) {
    case 'apply_leave':
      return normalizeResponse({
        message:
          'Your leave request for tomorrow is ready. Review the details below and submit when ready.',
        components: [{ kind: 'workflow_draft' }],
      });
    case 'knowledge_search':
      return normalizeResponse({
        message: 'Found relevant policy information.',
        components: [{ kind: 'knowledge_item' }],
      });
    case 'resume_work':
      return normalizeResponse({
        message: 'Restored your last active workflow.',
        components: [{ kind: 'workflow_resume' }],
      });
    case 'daily_brief':
      return normalizeResponse(getMorningBriefTemplate());
    default:
      return null;
  }
}

export async function generateMockResponse(
  intent: string,
  summary: string,
): Promise<AIResponse> {
  if (intent === 'daily_brief') {
    return generateMorningBriefResponse();
  }

  const result = buildDescriptorsForIntent(intent);
  if (result) {
    return toAIResponse(result.message, result.descriptors);
  }

  return toAIResponse(summary, []);
}
