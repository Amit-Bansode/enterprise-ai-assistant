import type { UIComponentDescriptor } from '@/application/parser/types';
import type { UIComponent } from '@/application/factory/types';

type DescriptorBuilder = (descriptor: UIComponentDescriptor) => UIComponent | null;

const descriptorBuilders: Record<UIComponentDescriptor['kind'], DescriptorBuilder> = {
  workflow_draft: descriptor => ({
    id: descriptor.id,
    component: 'ActionCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      actionLabel: String(descriptor.data.actionLabel ?? 'Review'),
      metadata: descriptor.data,
    },
  }),
  workflow_resume: descriptor => ({
    id: descriptor.id,
    component: 'ActionCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      actionLabel: String(descriptor.data.actionLabel ?? 'Continue'),
      metadata: descriptor.data,
    },
  }),
  action_prompt: descriptor => ({
    id: descriptor.id,
    component: 'ActionCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      actionLabel: String(descriptor.data.actionLabel ?? 'Confirm'),
      metadata: descriptor.data,
    },
  }),
  knowledge_item: descriptor => ({
    id: descriptor.id,
    component: 'InfoCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      metadata: descriptor.data,
    },
  }),
  daily_summary: descriptor => ({
    id: descriptor.id,
    component: 'BriefCard',
    props: {
      title: descriptor.title,
      description: descriptor.body,
      metadata: descriptor.data,
    },
  }),
};

export function buildComponents(
  descriptors: UIComponentDescriptor[],
): UIComponent[] {
  return descriptors
    .map(descriptor => {
      const builder = descriptorBuilders[descriptor.kind];
      return builder ? builder(descriptor) : null;
    })
    .filter((component): component is UIComponent => component !== null);
}
