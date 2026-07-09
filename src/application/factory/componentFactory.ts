import type { UIComponentDescriptor } from '@/application/parser/types';
import type { UIComponent } from '@/application/factory/types';
import {
  NEXT_STEPS_ACTIONS,
  NEXT_STEPS_PROMPT,
} from '@/core/constants/nextSteps';
import type { CardAccent } from '@/presentation/theme/cardAccents';

type DescriptorBuilder = (descriptor: UIComponentDescriptor) => UIComponent | null;

const WORKFLOW_COMPONENTS = new Set([
  'LeaveDraftCard',
  'SuccessCard',
  'StatusCard',
]);

const accentByKind: Partial<Record<UIComponentDescriptor['kind'], CardAccent>> = {
  daily_summary: 'primary',
  meeting: 'blue',
  task: 'green',
  learning: 'purple',
  workflow_draft: 'orange',
  workflow_success: 'green',
  workflow_status: 'blue',
  workflow_resume: 'green',
  knowledge_item: 'purple',
  action_prompt: 'primary',
};

const descriptorBuilders: Partial<
  Record<UIComponentDescriptor['kind'], DescriptorBuilder>
> = {
  daily_summary: descriptor => ({
    id: descriptor.id,
    component: 'BriefCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      accent: accentByKind.daily_summary,
      metadata: descriptor.data,
    },
  }),
  meeting: descriptor => ({
    id: descriptor.id,
    component: 'MeetingCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      accent: accentByKind.meeting,
      metadata: descriptor.data,
    },
  }),
  task: descriptor => ({
    id: descriptor.id,
    component: 'TaskCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      accent: accentByKind.task,
      metadata: descriptor.data,
    },
  }),
  learning: descriptor => ({
    id: descriptor.id,
    component: 'LearningCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      accent: accentByKind.learning,
      metadata: descriptor.data,
    },
  }),
  workflow_draft: descriptor => ({
    id: descriptor.id,
    component: 'LeaveDraftCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      accent: accentByKind.workflow_draft,
      metadata: descriptor.data,
    },
  }),
  workflow_success: descriptor => ({
    id: descriptor.id,
    component: 'SuccessCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      accent: accentByKind.workflow_success,
      metadata: descriptor.data,
    },
  }),
  workflow_status: descriptor => ({
    id: descriptor.id,
    component: 'StatusCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      accent: accentByKind.workflow_status,
      metadata: descriptor.data,
    },
  }),
  knowledge_item: descriptor => ({
    id: descriptor.id,
    component: 'LearningCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      accent: accentByKind.knowledge_item,
      metadata: descriptor.data,
    },
  }),
  workflow_resume: descriptor => ({
    id: descriptor.id,
    component: 'TaskCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      accent: accentByKind.workflow_resume,
      metadata: descriptor.data,
    },
  }),
  action_prompt: descriptor => ({
    id: descriptor.id,
    component: 'NextStepsCard',
    props: {
      title: descriptor.title || NEXT_STEPS_PROMPT,
      description: descriptor.body,
      metadata: {
        actions: descriptor.data.actions ?? NEXT_STEPS_ACTIONS,
      },
    },
  }),
};

function createNextStepsComponent(): UIComponent {
  return {
    id: 'next_steps',
    component: 'NextStepsCard',
    props: {
      title: NEXT_STEPS_PROMPT,
      description: '',
      metadata: {
        actions: [...NEXT_STEPS_ACTIONS],
      },
    },
  };
}

export function buildComponents(
  descriptors: UIComponentDescriptor[],
): UIComponent[] {
  const built = descriptors
    .map(descriptor => {
      const builder = descriptorBuilders[descriptor.kind];
      return builder ? builder(descriptor) : null;
    })
    .filter((component): component is UIComponent => component !== null)
    .filter(component => component.component !== 'NextStepsCard');

  const hasWorkflowCard = built.some(component =>
    WORKFLOW_COMPONENTS.has(component.component),
  );

  if (hasWorkflowCard) {
    return built;
  }

  return [...built, createNextStepsComponent()];
}
