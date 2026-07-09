import type { UIComponent } from '@/application/factory/types';
import { AISuggestionCard } from '@/presentation/components/cards/AISuggestionCard';
import { BriefCard } from '@/presentation/components/cards/BriefCard';
import { LearningCard } from '@/presentation/components/cards/LearningCard';
import { LeaveDraftCard } from '@/presentation/components/cards/LeaveDraftCard';
import { MeetingCard } from '@/presentation/components/cards/MeetingCard';
import { NextStepsCard } from '@/presentation/components/cards/NextStepsCard';
import { PolicyCard } from '@/presentation/components/cards/PolicyCard';
import { StatusCard } from '@/presentation/components/cards/StatusCard';
import { SuccessCard } from '@/presentation/components/cards/SuccessCard';
import { TaskCard } from '@/presentation/components/cards/TaskCard';
import {
  LEAVE_DRAFT_PROMPTS,
  LEAVE_STATUS_PROMPTS,
  LEAVE_SUCCESS_PROMPTS,
} from '@/core/constants/workflowPrompts';
import { NEXT_STEPS_ACTIONS } from '@/core/constants/nextSteps';

interface GenUIRendererProps {
  components: UIComponent[];
  onAction: (prompt: string) => void;
}

const PROMPT_BY_ACTION: Record<string, string> = {
  Submit: LEAVE_DRAFT_PROMPTS.submit,
  Edit: LEAVE_DRAFT_PROMPTS.modify,
  Cancel: LEAVE_DRAFT_PROMPTS.cancel,
  'View Status': LEAVE_SUCCESS_PROMPTS.viewStatus,
  Done: LEAVE_SUCCESS_PROMPTS.done,
  Refresh: LEAVE_STATUS_PROMPTS.refresh,
  'Cancel Request': LEAVE_STATUS_PROMPTS.cancelRequest,
};

function resolveNextStepPrompt(label: string): string {
  return PROMPT_BY_ACTION[label] ?? label;
}

export function GenUIRenderer({ components, onAction }: GenUIRendererProps) {
  return (
    <>
      {components.map(component => {
        switch (component.component) {
          case 'BriefCard':
            return <BriefCard key={component.id} {...component.props} />;
          case 'MeetingCard':
            return <MeetingCard key={component.id} {...component.props} />;
          case 'TaskCard':
            return <TaskCard key={component.id} {...component.props} />;
          case 'LearningCard':
            return <LearningCard key={component.id} {...component.props} />;
          case 'AISuggestionCard':
            return <AISuggestionCard key={component.id} {...component.props} />;
          case 'PolicyCard':
            return (
              <PolicyCard
                key={component.id}
                {...component.props}
                onAction={onAction}
              />
            );
          case 'LeaveDraftCard':
            return (
              <LeaveDraftCard
                key={component.id}
                {...component.props}
                onAction={onAction}
              />
            );
          case 'SuccessCard':
            return (
              <SuccessCard
                key={component.id}
                {...component.props}
                onAction={onAction}
              />
            );
          case 'StatusCard':
            return (
              <StatusCard
                key={component.id}
                {...component.props}
                onAction={onAction}
              />
            );
          case 'NextStepsCard':
            return (
              <NextStepsCard
                key={component.id}
                {...component.props}
                onAction={label => onAction(resolveNextStepPrompt(label))}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
