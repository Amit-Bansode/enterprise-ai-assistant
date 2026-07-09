import { StyleSheet } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';
import { cardAccentColors } from '@/presentation/theme/cardAccents';

interface LearningCardProps extends GenUIComponentProps {}

export function LearningCard({
  title,
  description,
  metadata,
  accent = 'purple',
}: LearningCardProps) {
  const progress =
    typeof metadata?.progress === 'number' ? metadata.progress / 100 : undefined;
  const accentColor = cardAccentColors[accent];

  return (
    <AccentCardShell title={title} icon="book-open-page-variant" accent={accent}>
      <Text variant="bodyMedium" style={styles.description}>
        {description}
      </Text>
      {progress !== undefined ? (
        <>
          <Text variant="labelMedium" style={styles.progressLabel}>
            Progress: {Math.round(progress * 100)}%
          </Text>
          <ProgressBar
            progress={progress}
            color={accentColor}
            style={styles.progress}
          />
        </>
      ) : null}
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 4,
  },
  progressLabel: {
    marginTop: 8,
    opacity: 0.7,
  },
  progress: {
    marginTop: 8,
    borderRadius: 4,
    height: 6,
  },
});
