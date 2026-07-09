import { detectKnowledgeQuery } from '@/application/intents/detectKnowledgeQuery';
import { detectModifySessionUpdate } from '@/application/intents/detectModifySession';
import type { DetectedIntent } from '@/application/intents/types';
import { detectWorkflowAction } from '@/application/intents/detectWorkflowAction';
import { detectIntentFallback } from '@/application/intents/detectIntentFallback';
import { detectConversationModify } from '@/application/intents/detectConversationModify';
import { getConversationContext } from '@/application/context/conversationContext';
import {
  extractIntentWithGemini,
  shouldUseGeminiExtraction,
} from '@/application/provider/extractIntent';
import { isGeminiConfigured } from '@/application/provider/GeminiProvider';

function coerceActiveDraftIntent(
  geminiIntent: DetectedIntent,
  conversationContext: ReturnType<typeof getConversationContext>,
): DetectedIntent {
  if (!conversationContext.draft) {
    return geminiIntent;
  }

  if (
    conversationContext.lastAction === 'modify_prompt' ||
    geminiIntent.intent === 'apply_leave'
  ) {
    return {
      ...geminiIntent,
      intent: 'modify_leave',
      confidence: geminiIntent.confidence,
    };
  }

  return geminiIntent;
}

export async function resolveIntent(userMessage: string): Promise<DetectedIntent> {
  const conversationContext = getConversationContext();

  const workflowIntent = detectWorkflowAction(userMessage);
  if (workflowIntent) {
    return workflowIntent;
  }

  const knowledgeIntent = detectKnowledgeQuery(userMessage);
  if (knowledgeIntent) {
    return knowledgeIntent;
  }

  const modifySessionIntent = detectModifySessionUpdate(userMessage, conversationContext);
  if (modifySessionIntent) {
    return modifySessionIntent;
  }

  const conversationModify = detectConversationModify(userMessage, conversationContext);
  if (conversationModify) {
    return conversationModify;
  }

  if (isGeminiConfigured()) {
    const geminiIntent = await extractIntentWithGemini(userMessage, conversationContext);
    if (
      geminiIntent &&
      geminiIntent.intent !== 'unknown' &&
      shouldUseGeminiExtraction(geminiIntent.intent, userMessage)
    ) {
      return coerceActiveDraftIntent(geminiIntent, conversationContext);
    }
  }

  return detectIntentFallback(userMessage);
}
