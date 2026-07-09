import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';

import type { GenUIComponentProps } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';
import { cardAccentColors } from '@/presentation/theme/cardAccents';

interface LeaveField {
  label: string;
  value: string;
}

interface LeaveCardProps extends GenUIComponentProps {}

function getLeaveFields(metadata?: Record<string, unknown>): LeaveField[] {
  return [
    { label: 'Date', value: String(metadata?.date ?? '—') },
    { label: 'Reason', value: String(metadata?.reason ?? '—') },
    { label: 'Balance', value: String(metadata?.balance ?? '—') },
    { label: 'Approver', value: String(metadata?.approver ?? '—') },
    { label: 'Status', value: String(metadata?.status ?? '—') },
  ];
}

export function LeaveCard({ title, metadata, accent = 'orange' }: LeaveCardProps) {
  const accentColor = cardAccentColors[accent];
  const fields = getLeaveFields(metadata);
  const status = String(metadata?.status ?? 'Draft');

  return (
    <AccentCardShell title={title} icon="beach" accent={accent}>
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
                {status}
              </Chip>
            ) : (
              <Text variant="bodyMedium" style={styles.value}>
                {field.value}
              </Text>
            )}
          </View>
        ))}
      </View>
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
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
    width: 88,
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
});
