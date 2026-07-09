import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';
import { cardAccentColors } from '@/presentation/theme/cardAccents';

interface MeetingItem {
  time: string;
  title: string;
}

interface MeetingCardProps extends GenUIComponentProps {}

export function MeetingCard({ title, metadata, accent = 'blue' }: MeetingCardProps) {
  const items = (metadata?.items as MeetingItem[] | undefined) ?? [];
  const accentColor = cardAccentColors[accent];

  return (
    <AccentCardShell title={title} icon="calendar-clock" accent={accent}>
      <View style={styles.list}>
        {items.map(item => (
          <View key={`${item.time}-${item.title}`} style={styles.row}>
            <Text variant="labelLarge" style={{ color: accentColor }}>
              {item.time}
            </Text>
            <Text variant="bodyMedium" style={styles.meetingTitle}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  meetingTitle: {
    flex: 1,
  },
});
