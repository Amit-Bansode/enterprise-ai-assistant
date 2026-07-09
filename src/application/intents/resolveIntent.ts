import type { DetectedIntent, UserIntent } from '@/application/intents/types';
import { detectWorkflowAction } from '@/application/intents/detectWorkflowAction';
import { detectIntentFallback } from '@/application/intents/detectIntentFallback';
import {
  extractIntentWithGemini,
  shouldUseGeminiExtraction,
} from '@/application/provider/extractIntent';
import { isGeminiConfigured } from '@/application/provider/GeminiProvider';

export async function resolveIntent(userMessage: string): Promise<DetectedIntent> {
  const workflowIntent = detectWorkflowAction(userMessage);
  if (workflowIntent) {
    return workflowIntent;
  }

  if (isGeminiConfigured()) {
    const geminiIntent = await extractIntentWithGemini(userMessage);
    if (
      geminiIntent &&
      geminiIntent.intent !== 'unknown' &&
      shouldUseGeminiExtraction(geminiIntent.intent)
    ) {
      return geminiIntent;
    }
  }

  return detectIntentFallback(userMessage);
}
