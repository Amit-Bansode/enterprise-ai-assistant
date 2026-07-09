import type { ConversationContext } from '@/domain/entities/ConversationContext';

function buildContextBlock(context: ConversationContext): string {
  if (context.activeWorkflow !== 'leave' || !context.draft) {
    return '';
  }

  const { draft } = context;

  return `
Active conversation context:
{
  "activeWorkflow": "leave",
  "draftId": "${context.draftId ?? ''}",
  "status": "${context.status ?? 'draft'}",
  "currentDraft": {
    "date": "${draft.date}",
    "reason": "${draft.reason}",
    "duration": "${draft.duration}",
    "leaveType": "${draft.leaveType}"
  }
}

When the user updates the existing leave draft (e.g. "change it to 26 July"), use intent "modify_leave" and only include changed entity fields. Leave other entity fields as empty strings.
`;
}

export function buildExtractionPrompt(
  userMessage: string,
  conversationContext?: ConversationContext | null,
): string {
  const contextBlock = conversationContext ? buildContextBlock(conversationContext) : '';

  return `You are an enterprise AI assistant.
Extract structured information from the user message.
Return ONLY valid JSON. No markdown. No explanation.

Schema:
{
  "intent": "",
  "entities": {
    "date": "",
    "reason": "",
    "duration": "",
    "leaveType": ""
  }
}

Valid intent values:
apply_leave, submit_leave, modify_leave, cancel_leave, daily_brief, knowledge_search, resume_work, general_question, unknown

Rules:
- Use ISO date format YYYY-MM-DD for entities.date when a date is mentioned.
- Leave empty strings for unknown entity fields.
- Infer intent from meaning, not only keywords.
- When conversation context shows an active leave draft and the user wants to change details, use modify_leave.
${contextBlock}
User: ${userMessage}`;
}
