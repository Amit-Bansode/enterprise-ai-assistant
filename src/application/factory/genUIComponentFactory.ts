import type { ParsedIntent } from '@/application/intents/types';

export type GenUIComponentType = 'action_card' | 'info_card' | 'none';

export interface GenUIComponentDescriptor {
  type: GenUIComponentType;
  title: string;
  description: string;
  actionLabel?: string;
}

export function createGenUIComponent(
  intent: ParsedIntent,
): GenUIComponentDescriptor | null {
  switch (intent.intent) {
    case 'workflow_action':
      return {
        type: 'action_card',
        title: 'Workflow action detected',
        description: 'Review and confirm before submitting this request.',
        actionLabel: 'Review action',
      };
    case 'knowledge_lookup':
      return {
        type: 'info_card',
        title: 'Knowledge lookup',
        description: 'I can search enterprise documents related to your query.',
      };
    default:
      return null;
  }
}
