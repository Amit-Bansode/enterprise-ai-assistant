import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';

interface BriefCardProps extends GenUIComponentProps {}

export function BriefCard({ title, description, accent = 'primary' }: BriefCardProps) {
  return (
    <AccentCardShell title={title} icon="view-dashboard-outline" accent={accent}>
      <Text variant="bodyMedium" style={styles.description}>
        {description}
      </Text>
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
  description: {
    opacity: 0.85,
  },
});
