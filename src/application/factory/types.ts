import type { CardAccent } from '@/presentation/theme/cardAccents';

export type GenUIComponentType =
  | 'BriefCard'
  | 'MeetingCard'
  | 'TaskCard'
  | 'LearningCard'
  | 'AISuggestionCard'
  | 'PolicyCard'
  | 'LeaveDraftCard'
  | 'SuccessCard'
  | 'StatusCard'
  | 'NextStepsCard';

export interface WorkflowAction {
  label: string;
  prompt: string;
}

export interface GenUIComponentProps {
  title: string;
  description: string;
  accent?: CardAccent;
  metadata?: Record<string, unknown>;
}

export interface UIComponent {
  id: string;
  component: GenUIComponentType;
  props: GenUIComponentProps;
}
