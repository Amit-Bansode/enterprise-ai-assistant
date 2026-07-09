import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import type { GenUIComponentProps, WorkflowAction } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';
import { LEAVE_MODIFY_EXAMPLES } from '@/core/constants/workflowPrompts';
import { cardAccentColors } from '@/presentation/theme/cardAccents';

interface LeaveModifyPromptCardProps extends GenUIComponentProps {
  onAction?: (prompt: string) => void;
}

export function LeaveModifyPromptCard({
  title,
  metadata,
  accent = 'orange',
  onAction,
}: LeaveModifyPromptCardProps) {
  const accentColor = cardAccentColors[accent];
  const actions = (metadata?.actions as WorkflowAction[] | undefined) ?? [];
  const examples =
    (metadata?.examples as string[] | undefined) ?? [...LEAVE_MODIFY_EXAMPLES];

  return (
    <AccentCardShell title={title} icon="message-text-outline" accent={accent}>
      <View style={styles.actions}>
        {actions.map(action => (
          <Button
            key={action.label}
            mode="outlined"
            textColor={accentColor}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
            onPress={() => onAction?.(action.prompt)}>
            {action.label}
          </Button>
        ))}
      </View>
      {actions.length > 0 ? <View style={styles.divider} /> : null}
      <Text variant="labelMedium" style={styles.hint}>
        Or simply type your changes
      </Text>
      <View style={styles.examples}>
        {examples.map(example => (
          <Text key={example} variant="bodySmall" style={styles.example}>
            • {example}
          </Text>
        ))}
      </View>
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 8,
  },
  actionButton: {
    borderRadius: 8,
  },
  actionButtonContent: {
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  hint: {
    opacity: 0.7,
    marginBottom: 8,
  },
  examples: {
    gap: 4,
  },
  example: {
    opacity: 0.65,
    fontStyle: 'italic',
  },
});
