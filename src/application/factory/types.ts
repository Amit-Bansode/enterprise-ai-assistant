export type GenUIComponentType = 'ActionCard' | 'InfoCard' | 'BriefCard';

export interface GenUIComponentProps {
  title: string;
  description: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
}

export interface UIComponent {
  id: string;
  component: GenUIComponentType;
  props: GenUIComponentProps;
}
