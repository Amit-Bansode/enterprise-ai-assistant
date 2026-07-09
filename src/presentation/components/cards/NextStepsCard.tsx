import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';
import type { NextStepAction } from '@/core/constants/nextSteps';

interface NextStepsCardProps extends GenUIComponentProps {}

export function NextStepsCard({ title, metadata }: NextStepsCardProps) {
  const theme = useTheme();
  const actions = (metadata?.actions as NextStepAction[] | undefined) ?? [
    'Submit',
    'Edit',
    'Cancel',
  ];

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      mode="outlined">
      <Card.Content>
        <Text variant="titleSmall" style={styles.prompt}>
          {title}
        </Text>
        <View style={styles.actions}>
          {actions.map((action, index) => (
            <Button
              key={action}
              mode={index === 0 ? 'contained' : 'outlined'}
              style={styles.button}
              compact>
              {action}
            </Button>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  prompt: {
    marginBottom: 12,
    opacity: 0.85,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
});
