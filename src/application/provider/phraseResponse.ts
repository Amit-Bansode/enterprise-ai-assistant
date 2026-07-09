import type { ActionResult } from '@/application/actions/types';
import type { UserIntent } from '@/application/intents/types';
import { geminiProvider, isGeminiConfigured } from '@/application/provider/GeminiProvider';
import {
  buildResponsePhrasingPrompt,
  type ResponsePhrasingContext,
} from '@/application/provider/prompts/responsePhrasingPrompt';

function buildPhrasingContext(intent: UserIntent, actionResult: ActionResult): ResponsePhrasingContext {
  const draft = actionResult.payload.draft as Record<string, string> | undefined;
  const submitted = actionResult.payload.submitted as Record<string, string> | undefined;

  return {
    intent,
    leaveDate: draft?.dateDisplay ?? submitted?.dateDisplay,
    reason: draft?.reason ?? submitted?.reason,
    reference: submitted?.reference,
    status: submitted?.status,
  };
}

export async function phraseResponse(
  intent: UserIntent,
  actionResult: ActionResult,
  fallbackMessage: string,
): Promise<string> {
  if (!isGeminiConfigured()) {
    return fallbackMessage;
  }

  const skipPhrasing = ['daily_brief', 'unknown', 'noop'].includes(intent);
  if (skipPhrasing) {
    return fallbackMessage;
  }

  try {
    const prompt = buildResponsePhrasingPrompt(buildPhrasingContext(intent, actionResult));
    const message = await geminiProvider.generate(prompt);
    return message.trim() || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}
