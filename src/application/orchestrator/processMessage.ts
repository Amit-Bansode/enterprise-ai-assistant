import { buildComponents } from '@/application/factory/componentFactory';
import type { UIComponent } from '@/application/factory/types';
import { resolveIntent } from '@/application/intents/resolveIntent';
import type { DetectedIntent } from '@/application/intents/types';
import { parseResponse } from '@/application/parser/parseResponse';
import { generateResponse } from '@/application/provider/generateResponse';
import { executeAction } from '@/application/actions';
import { retrieveKnowledge } from '@/application/retrieval/retrieveKnowledge';

export interface ProcessMessageResult {
  assistantMessage: string;
  components: UIComponent[];
  intent: DetectedIntent;
}

export async function processMessage(userMessage: string): Promise<ProcessMessageResult> {
  const intent = await resolveIntent(userMessage);

  const actionResult = await executeAction({
    userMessage,
    intent,
  });

  const knowledgeResult = await retrieveKnowledge(userMessage, actionResult);

  const aiResponse = await generateResponse(intent.intent, actionResult, {
    userMessage,
    knowledgeResult,
  });

  const parsed = parseResponse(aiResponse);
  const components = buildComponents(parsed.descriptors);

  return {
    assistantMessage: parsed.messageText,
    components,
    intent,
  };
}
