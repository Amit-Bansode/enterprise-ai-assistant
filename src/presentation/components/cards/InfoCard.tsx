import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';

interface InfoCardProps extends GenUIComponentProps {}

export function InfoCard({ title, description }: InfoCardProps) {
  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <Text variant="titleMedium">{title}</Text>
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      </Card.Content>
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
