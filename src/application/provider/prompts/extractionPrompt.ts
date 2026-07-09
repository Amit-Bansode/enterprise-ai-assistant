export function buildExtractionPrompt(userMessage: string): string {
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

User: ${userMessage}`;
}
