import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';
import { cardAccentColors } from '@/presentation/theme/cardAccents';

interface TaskItem {
  title: string;
}

interface TaskCardProps extends GenUIComponentProps {}

export function TaskCard({ title, description, metadata, accent = 'green' }: TaskCardProps) {
  const accentColor = cardAccentColors[accent];
  const items = (metadata?.items as TaskItem[] | undefined) ?? [];

  return (
    <AccentCardShell title={title} icon="clipboard-check-outline" accent={accent}>
      {items.length > 0 ? (
        <View style={styles.list}>
          {items.map(item => (
            <View key={item.title} style={styles.row}>
              <Text variant="bodyMedium" style={{ color: accentColor }}>
                •
              </Text>
              <Text variant="bodyMedium" style={styles.itemTitle}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text variant="bodyLarge" style={[styles.description, { color: accentColor }]}>
          {description}
        </Text>
      )}
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemTitle: {
    flex: 1,
  },
  description: {
    fontWeight: '600',
  },
});
