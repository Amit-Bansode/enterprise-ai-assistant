import type { UIComponent } from '@/application/factory/types';
import { BriefCard } from '@/presentation/components/cards/BriefCard';
import { LearningCard } from '@/presentation/components/cards/LearningCard';
import { LeaveCard } from '@/presentation/components/cards/LeaveCard';
import { MeetingCard } from '@/presentation/components/cards/MeetingCard';
import { NextStepsCard } from '@/presentation/components/cards/NextStepsCard';
import { TaskCard } from '@/presentation/components/cards/TaskCard';

interface GenUIRendererProps {
  components: UIComponent[];
}

export function GenUIRenderer({ components }: GenUIRendererProps) {
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
          case 'LeaveCard':
            return <LeaveCard key={component.id} {...component.props} />;
          case 'NextStepsCard':
            return <NextStepsCard key={component.id} {...component.props} />;
          default:
            return null;
        }
      })}
    </>
  );
}
