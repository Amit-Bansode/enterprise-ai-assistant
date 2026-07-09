import type { DetectedIntent, UserIntent } from '@/application/intents/types';
import { geminiProvider, isGeminiConfigured } from '@/application/provider/GeminiProvider';
import { buildExtractionPrompt } from '@/application/provider/prompts/extractionPrompt';
import { parseModelJson, toValidIntent } from '@/application/provider/parseModelJson';
import { formatDateDisplay } from '@/core/utils/date';

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
  const date = entities.date?.trim() ?? '';
  const reason = entities.reason?.trim() ?? '';
  const duration = entities.duration?.trim() ?? '';
  const leaveType = entities.leaveType?.trim() ?? '';

  return {
    intent,
    confidence: 0.95,
    rawText: userMessage,
    slots: {
      date,
      dateDisplay: formatDateDisplay(date) || date,
      reason,
      duration,
      leaveType,
    },
  };
}

export async function extractIntentWithGemini(
  userMessage: string,
): Promise<DetectedIntent | null> {
  if (!isGeminiConfigured()) {
    return null;
  }

  try {
    const prompt = buildExtractionPrompt(userMessage);
    const raw = await geminiProvider.generate(prompt);
    const extraction = parseModelJson<GeminiExtraction>(raw);
    return mapExtractionToIntent(userMessage, extraction);
  } catch {
    return null;
  }
}

export function shouldUseGeminiExtraction(intent: UserIntent): boolean {
  return ![
    'submit_leave',
    'modify_leave',
    'cancel_leave',
    'daily_brief',
  ].includes(intent);
}
