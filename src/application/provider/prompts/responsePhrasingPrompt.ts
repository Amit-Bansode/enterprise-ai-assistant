import type { LeaveMessageContext } from '@/application/actions/leaveMessageContext';

export interface ResponsePhrasingContext {
  intent: string;
  leaveDate?: string;
  duration?: string;
  reason?: string;
  leaveType?: string;
  reference?: string;
  status?: string;
  changedFields?: string[];
}

export function buildResponsePhrasingContext(
  intent: string,
  messageContext?: LeaveMessageContext,
  extras?: Pick<ResponsePhrasingContext, 'reference' | 'status'>,
): ResponsePhrasingContext {
  return {
    intent,
    leaveDate: messageContext?.date,
    duration: messageContext?.duration,
    reason: messageContext?.reason,
    leaveType: messageContext?.leaveType,
    changedFields: messageContext?.changedFields,
    reference: extras?.reference,
    status: extras?.status,
  };
}

export function buildResponsePhrasingPrompt(context: ResponsePhrasingContext): string {
  const lines = [
    'Write a friendly enterprise assistant response.',
    'Return one or two sentences only.',
    'Do not use JSON. Do not use bullet points.',
    'Always acknowledge what happened before the user reviews any card shown below.',
    `Intent: ${context.intent}`,
  ];

  if (context.leaveDate) {
    lines.push(`Leave Date: ${context.leaveDate}`);
  }
  if (context.duration) {
    lines.push(`Duration: ${context.duration}`);
  }
  if (context.reason) {
    lines.push(`Reason: ${context.reason}`);
  }
  if (context.leaveType) {
    lines.push(`Leave Type: ${context.leaveType}`);
  }
  if (context.changedFields?.length) {
    lines.push(`Changed Fields: ${context.changedFields.join(', ')}`);
  }
  if (context.reference) {
    lines.push(`Reference: ${context.reference}`);
  }
  if (context.status) {
    lines.push(`Status: ${context.status}`);
  }

  if (context.intent === 'modify_leave') {
    lines.push(
      'Mention exactly what was updated and ask the user to review the updated draft below before submitting.',
    );
  }

  if (context.intent === 'apply_leave') {
    lines.push('Confirm a draft was prepared and ask the user to review it below before submitting.');
  }

  if (context.intent === 'submit_leave') {
    lines.push('Confirm successful submission and reference the leave request reference if available.');
  }

  return lines.join('\n');
}
