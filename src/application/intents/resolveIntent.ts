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

export async function resolveIntent(userMessage: string): Promise<DetectedIntent> {
  const conversationContext = getConversationContext();

  const workflowIntent = detectWorkflowAction(userMessage);
  if (workflowIntent) {
    return workflowIntent;
  }

  if (isGeminiConfigured()) {
    const geminiIntent = await extractIntentWithGemini(userMessage, conversationContext);
    if (
      geminiIntent &&
      geminiIntent.intent !== 'unknown' &&
      shouldUseGeminiExtraction(geminiIntent.intent)
    ) {
      return geminiIntent;
    }
  }

  const conversationModify = detectConversationModify(userMessage, conversationContext);
  if (conversationModify) {
    return conversationModify;
  }

  return detectIntentFallback(userMessage);
}
