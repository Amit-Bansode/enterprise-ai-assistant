export const NEXT_STEPS_PROMPT = 'What would you like to do next?';

export const NEXT_STEPS_ACTIONS = ['Submit', 'Edit', 'Cancel'] as const;

export type NextStepAction = (typeof NEXT_STEPS_ACTIONS)[number];
