import type { ConversationContext } from '@/domain/entities/ConversationContext';

function buildContextBlock(context: ConversationContext): string {
  if (context.activeWorkflow !== 'leave' || !context.draft) {
    return '';
  }

  const { draft } = context;
  const modifySession = context.lastAction === 'modify_prompt';

  return `
Active conversation context:
{
  "activeWorkflow": "leave",
  "draftId": "${context.draftId ?? ''}",
  "status": "${context.status ?? 'draft'}",
  "modifySession": ${modifySession},
  "pendingModifyField": "${context.pendingModifyField ?? ''}",
  "currentDraft": {
    "date": "${draft.date}",
    "reason": "${draft.reason}",
    "duration": "${draft.duration}",
    "leaveType": "${draft.leaveType}"
  }
}

When the user updates the existing leave draft, use intent "modify_leave" and only include changed entity fields. Leave other entity fields as empty strings.
${modifySession ? 'The user clicked Modify and is now providing an updated value. Always use modify_leave and extract date, reason, duration, or leaveType from their message.' : ''}
${context.pendingModifyField ? `The user is updating only the "${context.pendingModifyField}" field.` : ''}
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
- Questions about policies, rules, or guidelines (e.g. "what is the leave policy", "can I carry forward leave") must use knowledge_search, NOT apply_leave.
- apply_leave is only when the user wants to request or book time off.
- When conversation context shows an active leave draft and the user wants to change details, use modify_leave.
- If an active leave draft exists, never use apply_leave for changes — use modify_leave instead.
${contextBlock}
User: ${userMessage}`;
}
