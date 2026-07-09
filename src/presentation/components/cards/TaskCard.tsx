import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';
import { cardAccentColors } from '@/presentation/theme/cardAccents';

interface TaskCardProps extends GenUIComponentProps {}

export function TaskCard({ title, description, accent = 'green' }: TaskCardProps) {
  const accentColor = cardAccentColors[accent];

  return (
    <AccentCardShell title={title} icon="clipboard-check-outline" accent={accent}>
      <Text variant="bodyLarge" style={[styles.description, { color: accentColor }]}>
        {description}
      </Text>
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
  description: {
    fontWeight: '600',
  },
});
