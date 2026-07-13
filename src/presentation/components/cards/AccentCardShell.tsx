import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, Text, useTheme } from 'react-native-paper';

import type { CardAccent } from '@/presentation/theme/cardAccents';
import {
  cardAccentColors,
  getCardAccentBackground,
} from '@/presentation/theme/cardAccents';

interface AccentCardShellProps extends PropsWithChildren {
  title: string;
  icon: string;
  accent: CardAccent;
}

export function AccentCardShell({
  title,
  icon,
  accent,
  children,
}: AccentCardShellProps) {
  const theme = useTheme();
  const accentColor = cardAccentColors[accent];
  const accentBackground = getCardAccentBackground(accent, theme.dark);

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      mode="elevated">
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <Card.Content style={styles.content}>
        <View style={[styles.header, { backgroundColor: accentBackground }]}>
          <Icon source={icon} size={20} color={accentColor} />
          <Text variant="titleMedium" style={[styles.title, { color: accentColor }]}>
            {title}
          </Text>
        </View>
        {children}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  content: {
    paddingLeft: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
  },
});
