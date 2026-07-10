import type { DetectedIntent, UserIntent } from '@/application/intents/types';
import { isPolicyQuestion } from '@/application/intents/detectKnowledgeQuery';
import { geminiProvider, isGeminiConfigured } from '@/application/provider/GeminiProvider';
import { buildExtractionPrompt } from '@/application/provider/prompts/extractionPrompt';
import { parseModelJson, toValidIntent } from '@/application/provider/parseModelJson';
import { formatDateDisplay, parseNaturalLanguageDate } from '@/core/utils/date';
import { parseLeaveSlots } from '@/application/intents/parseLeaveSlots';
import type { ConversationContext } from '@/domain/entities/ConversationContext';

export interface ExtractedEntities {
  date: string;
  reason: string;
  duration: string;
  leaveType: string;
}

interface GeminiExtraction {
  intent: string;
  entities: Partial<ExtractedEntities>;
}

function mapExtractionToIntent(
  userMessage: string,
  extraction: GeminiExtraction,
): DetectedIntent {
  const intent = toValidIntent(extraction.intent);
  const entities = extraction.entities ?? {};
  const localSlots = parseLeaveSlots(userMessage);
  const parsedLocalDate = parseNaturalLanguageDate(userMessage);

  const geminiDate = entities.date?.trim() ?? '';
  const date = parsedLocalDate?.iso ?? geminiDate ?? localSlots.date;
  const dateDisplay =
    parsedLocalDate?.display ??
    (date ? formatDateDisplay(date) || date : localSlots.dateDisplay);
  const reason = entities.reason?.trim() || localSlots.reason;
  const duration = entities.duration?.trim() ?? '';
  const leaveType = entities.leaveType?.trim() ?? '';

  return {
    intent,
    confidence: 0.95,
    rawText: userMessage,
    slots: {
      date,
      dateDisplay,
      reason,
      duration,
      leaveType,
    },
  };
}

export async function extractIntentWithGemini(
  userMessage: string,
  conversationContext?: ConversationContext | null,
): Promise<DetectedIntent | null> {
  if (!isGeminiConfigured()) {
    return null;
  }

  try {
    const prompt = buildExtractionPrompt(userMessage, conversationContext);
    const raw = await geminiProvider.generate(prompt);
    const extraction = parseModelJson<GeminiExtraction>(raw);
    return mapExtractionToIntent(userMessage, extraction);
  } catch {
    return null;
  }
}

export function shouldUseGeminiExtraction(intent: UserIntent, userMessage?: string): boolean {
  if (userMessage && isPolicyQuestion(userMessage)) {
    return false;
  }

  return !['submit_leave', 'cancel_leave', 'daily_brief'].includes(intent);
}
