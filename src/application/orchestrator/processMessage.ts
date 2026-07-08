import { buildComponents } from '@/application/factory/componentFactory';
import type { UIComponent } from '@/application/factory/types';
import { detectIntent } from '@/application/intents/detectIntent';
import type { DetectedIntent } from '@/application/intents/types';
import { parseResponse } from '@/application/parser/parseResponse';
import { generateAIResponse } from '@/application/provider/generateResponse';
import { executeAction } from '@/application/actions';
import { retrieveKnowledge } from '@/application/retrieval/retrieveKnowledge';

export interface ProcessMessageResult {
  assistantMessage: string;
  components: UIComponent[];
  intent: DetectedIntent;
}

export async function processMessage(userMessage: string): Promise<ProcessMessageResult> {
  const intent = detectIntent(userMessage);

  const actionResult = await executeAction({
    userMessage,
    intent,
  });

  const knowledge = await retrieveKnowledge(userMessage, actionResult);

  const aiResponse = await generateAIResponse({
    userMessage,
    intent,
    actionResult,
    knowledge,
  });

  const parsed = parseResponse(aiResponse);
  const components = buildComponents(parsed.descriptors);

  return {
    assistantMessage: parsed.messageText,
    components,
    intent,
  };
}
