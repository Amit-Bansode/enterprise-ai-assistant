import { StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';

import type { GenUIComponentProps, WorkflowAction } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';
import { getLeaveDetailFields } from '@/presentation/components/cards/leaveCardFields';
import { cardAccentColors } from '@/presentation/theme/cardAccents';

interface StatusField {
  label: string;
  value: string;
}

interface SuccessCardProps extends GenUIComponentProps {
  onAction?: (prompt: string) => void;
}

function getSuccessFields(metadata?: Record<string, unknown>): StatusField[] {
  return [
    ...getLeaveDetailFields(metadata),
    { label: 'Reference', value: String(metadata?.reference ?? '—') },
    { label: 'Status', value: String(metadata?.status ?? '—') },
    {
      label: 'Expected Approval',
      value: String(metadata?.expectedApproval ?? '—'),
    },
  ];
}

export function SuccessCard({
  title,
  metadata,
  accent = 'green',
  onAction,
}: SuccessCardProps) {
  const accentColor = cardAccentColors[accent];
  const fields = getSuccessFields(metadata);
  const actions = (metadata?.actions as WorkflowAction[] | undefined) ?? [];

  return (
    <AccentCardShell title={title} icon="check-circle-outline" accent={accent}>
      <View style={styles.divider} />
      <View style={styles.fields}>
        {fields.map(field => (
          <View key={field.label} style={styles.row}>
            <Text variant="labelMedium" style={styles.label}>
              {field.label}
            </Text>
            {field.label === 'Status' ? (
              <Chip
                compact
                style={[styles.statusChip, { backgroundColor: `${accentColor}18` }]}
                textStyle={{ color: accentColor, fontWeight: '600' }}>
                {field.value}
              </Chip>
            ) : (
              <Text variant="bodyMedium" style={styles.value}>
                {field.value}
              </Text>
            )}
          </View>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.actions}>
        {actions.map((action, index) => (
          <Button
            key={action.label}
            mode={index === 0 ? 'contained' : 'outlined'}
            buttonColor={index === 0 ? accentColor : undefined}
            textColor={index === 0 ? undefined : accentColor}
            style={styles.button}
            onPress={() => onAction?.(action.prompt)}>
            {action.label}
          </Button>
        ))}
      </View>
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  fields: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    width: 120,
    opacity: 0.65,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '500',
  },
  statusChip: {
    alignSelf: 'flex-end',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
});
