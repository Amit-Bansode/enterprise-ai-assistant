import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';
import { cardAccentColors } from '@/presentation/theme/cardAccents';

interface AISuggestionCardProps extends GenUIComponentProps {}

export function AISuggestionCard({
  title,
  description,
  accent = 'primary',
}: AISuggestionCardProps) {
  const accentColor = cardAccentColors[accent];

  return (
    <AccentCardShell title={title} icon="lightbulb-on-outline" accent={accent}>
      <Text variant="bodyMedium" style={[styles.suggestion, { color: accentColor }]}>
        {description}
      </Text>
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
  suggestion: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
