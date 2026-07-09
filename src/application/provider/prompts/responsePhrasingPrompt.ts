export interface ResponsePhrasingContext {
  intent: string;
  leaveDate?: string;
  reason?: string;
  reference?: string;
  status?: string;
}

export function buildResponsePhrasingPrompt(context: ResponsePhrasingContext): string {
  const lines = [
    'Write a friendly enterprise assistant response.',
    'Return one or two sentences only.',
    'Do not use JSON. Do not use bullet points.',
    `Intent: ${context.intent}`,
  ];

  if (context.leaveDate) {
    lines.push(`Leave Date: ${context.leaveDate}`);
  }
  if (context.reason) {
    lines.push(`Reason: ${context.reason}`);
  }
  if (context.reference) {
    lines.push(`Reference: ${context.reference}`);
  }
  if (context.status) {
    lines.push(`Status: ${context.status}`);
  }

  return lines.join('\n');
}
