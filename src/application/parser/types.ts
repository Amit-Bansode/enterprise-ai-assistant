export type ComponentDescriptorKind =
  | 'daily_summary'
  | 'meeting'
  | 'task'
  | 'learning'
  | 'ai_suggestion'
  | 'workflow_draft'
  | 'workflow_modify_prompt'
  | 'workflow_success'
  | 'workflow_status'
  | 'knowledge_item'
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
