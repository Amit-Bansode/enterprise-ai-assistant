export type ComponentDescriptorKind =
  | 'workflow_draft'
  | 'knowledge_item'
  | 'daily_summary'
  | 'workflow_resume'
  | 'action_prompt';

export interface UIComponentDescriptor {
  id: string;
  kind: ComponentDescriptorKind;
  title: string;
  body: string;
  data: Record<string, unknown>;
}

export interface ParsedResponse {
  messageText: string;
  descriptors: UIComponentDescriptor[];
}

export interface LLMStructuredOutput {
  message: string;
  descriptors: UIComponentDescriptor[];
}
