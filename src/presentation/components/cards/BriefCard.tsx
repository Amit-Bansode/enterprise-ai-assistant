import { StyleSheet } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';

interface BriefCardProps extends GenUIComponentProps {}

export function BriefCard({ title, description, metadata }: BriefCardProps) {
  const meetings = metadata?.meetings;
  const pendingApprovals = metadata?.pendingApprovals;

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="titleMedium">{title}</Text>
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
        {typeof meetings === 'number' || typeof pendingApprovals === 'number' ? (
          <Card style={styles.statsRow} mode="contained">
            <Card.Content style={styles.statsContent}>
              {typeof meetings === 'number' ? (
                <Chip compact>{meetings} meetings</Chip>
              ) : null}
              {typeof pendingApprovals === 'number' ? (
                <Chip compact>{pendingApprovals} approvals</Chip>
              ) : null}
            </Card.Content>
          </Card>
        ) : null}
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
  statsRow: {
    marginTop: 12,
  },
  statsContent: {
    flexDirection: 'row',
    gap: 8,
  },
});
