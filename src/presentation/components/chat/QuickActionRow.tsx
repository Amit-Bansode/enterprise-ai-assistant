import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';

import type { QuickAction } from '@/core/constants/quickActions';

interface QuickActionRowProps {
  actions: QuickAction[];
  onAction: (prompt: string) => void;
  disabled?: boolean;
}

export function QuickActionRow({ actions, onAction, disabled = false }: QuickActionRowProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="labelLarge" style={styles.label}>
        Quick Actions
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}>
        {actions.map(action => (
          <Chip
            key={action.id}
            mode="outlined"
            disabled={disabled}
            onPress={() => onAction(action.prompt)}
            style={[styles.chip, { backgroundColor: theme.colors.elevation.level1 }]}>
            {action.label}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  label: {
    marginBottom: 8,
    opacity: 0.8,
  },
  row: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    borderRadius: 20,
  },
});
