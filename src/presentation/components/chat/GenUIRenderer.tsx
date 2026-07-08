import type { UIComponent } from '@/application/factory/types';
import { ActionCard } from '@/presentation/components/cards/ActionCard';
import { BriefCard } from '@/presentation/components/cards/BriefCard';
import { InfoCard } from '@/presentation/components/cards/InfoCard';

interface GenUIRendererProps {
  components: UIComponent[];
}

export function GenUIRenderer({ components }: GenUIRendererProps) {
  return (
    <>
      {components.map(component => {
        switch (component.component) {
          case 'ActionCard':
            return <ActionCard key={component.id} {...component.props} />;
          case 'InfoCard':
            return <InfoCard key={component.id} {...component.props} />;
          case 'BriefCard':
            return <BriefCard key={component.id} {...component.props} />;
          default:
            return null;
        }
      })}
    </>
  );
}
