import type { ActionResult } from '@/application/actions/types';
import type { LeaveMessageContext } from '@/application/actions/leaveMessageContext';
import type { UserIntent } from '@/application/intents/types';
import { geminiProvider, isGeminiConfigured } from '@/application/provider/GeminiProvider';
import {
  buildResponsePhrasingContext,
  buildResponsePhrasingPrompt,
} from '@/application/provider/prompts/responsePhrasingPrompt';

function getMessageContext(actionResult: ActionResult): LeaveMessageContext | undefined {
  return actionResult.payload.messageContext as LeaveMessageContext | undefined;
}

export async function phraseResponse(
  intent: UserIntent,
  actionResult: ActionResult,
  fallbackMessage: string,
): Promise<string> {
  const safeFallback = fallbackMessage.trim() || 'Done.';

  if (!isGeminiConfigured()) {
    return safeFallback;
  }

  const skipPhrasing = ['daily_brief', 'unknown', 'noop'].includes(intent);
  if (skipPhrasing) {
    return safeFallback;
  }

  const messageContext = getMessageContext(actionResult);
  const phrasingContext = buildResponsePhrasingContext(intent, messageContext, {
    reference: actionResult.payload.reference as string | undefined,
    status: (actionResult.payload.submitted as Record<string, string> | undefined)?.status,
  });

  try {
    const prompt = buildResponsePhrasingPrompt(phrasingContext);
    const message = await geminiProvider.generate(prompt);
    return message.trim() || safeFallback;
  } catch {
    return safeFallback;
  }
}
