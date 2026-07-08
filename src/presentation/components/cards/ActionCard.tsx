import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import type { GenUIComponentDescriptor } from '@/application/factory/genUIComponentFactory';

interface ActionCardProps {
  descriptor: GenUIComponentDescriptor;
  onPress?: () => void;
}

export function ActionCard({ descriptor, onPress }: ActionCardProps) {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="titleMedium">{descriptor.title}</Text>
        <Text variant="bodyMedium" style={styles.description}>
          {descriptor.description}
        </Text>
      </Card.Content>
      {descriptor.actionLabel ? (
        <Card.Actions>
          <Button mode="contained-tonal" onPress={onPress}>
            {descriptor.actionLabel}
          </Button>
        </Card.Actions>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  description: {
    marginTop: 8,
  },
});
