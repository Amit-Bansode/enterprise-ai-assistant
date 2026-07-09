import type { CardAccent } from '@/presentation/theme/cardAccents';

export type GenUIComponentType =
  | 'BriefCard'
  | 'MeetingCard'
  | 'TaskCard'
  | 'LearningCard'
  | 'LeaveCard'
  | 'NextStepsCard';

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
