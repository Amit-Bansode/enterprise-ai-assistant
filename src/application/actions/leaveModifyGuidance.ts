import { LEAVE_MODIFY_PROMPTS } from '@/core/constants/workflowPrompts';

export type ModifyField = 'date' | 'duration' | 'reason' | 'leaveType';

interface ModifyFieldGuidance {
  field: ModifyField;
  message: string;
  examples: string[];
}

const FIELD_GUIDANCE: Record<string, ModifyFieldGuidance> = {
  [LEAVE_MODIFY_PROMPTS.changeDate]: {
    field: 'date',
    message: 'What date would you like for your leave?',
    examples: ['Change it to 26 July', 'Move it to next Friday'],
  },
  [LEAVE_MODIFY_PROMPTS.changeDuration]: {
    field: 'duration',
    message: 'What duration would you like?',
    examples: ['Make it half day', 'Change to 2 days'],
  },
  [LEAVE_MODIFY_PROMPTS.changeReason]: {
    field: 'reason',
    message: 'What reason should I update?',
    examples: ['Reason is doctor appointment', "Reason is family function"],
  },
  [LEAVE_MODIFY_PROMPTS.changeLeaveType]: {
    field: 'leaveType',
    message: 'Which leave type should I use?',
    examples: ['Change leave type to sick leave', 'Use annual leave'],
  },
};

export function getModifyFieldGuidance(userMessage: string): ModifyFieldGuidance | null {
  const normalized = userMessage.trim().toLowerCase();

  for (const [prompt, guidance] of Object.entries(FIELD_GUIDANCE)) {
    if (normalized === prompt.toLowerCase() || normalized.includes(prompt.toLowerCase())) {
      return guidance;
    }
  }

  return null;
}
