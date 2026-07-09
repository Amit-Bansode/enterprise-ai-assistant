import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import type { GenUIComponentProps, WorkflowAction } from '@/application/factory/types';
import { AccentCardShell } from '@/presentation/components/cards/AccentCardShell';
import { cardAccentColors } from '@/presentation/theme/cardAccents';

interface PolicyCardProps extends GenUIComponentProps {
  onAction?: (prompt: string) => void;
}

export function PolicyCard({
  title,
  metadata,
  accent = 'purple',
  onAction,
}: PolicyCardProps) {
  const accentColor = cardAccentColors[accent];
  const bullets = (metadata?.bullets as string[] | undefined) ?? [];
  const subtitle = String(metadata?.subtitle ?? '');
  const source = String(metadata?.source ?? '—');
  const updatedAt = String(metadata?.updatedAt ?? '—');
  const actions = (metadata?.actions as WorkflowAction[] | undefined) ?? [];

  return (
    <AccentCardShell title={title} icon="book-open-variant" accent={accent}>
      {subtitle ? (
        <Text variant="titleSmall" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
      <View style={styles.bullets}>
        {bullets.map(bullet => (
          <View key={bullet} style={styles.bulletRow}>
            <Text variant="bodyMedium" style={{ color: accentColor }}>
              •
            </Text>
            <Text variant="bodyMedium" style={styles.bulletText}>
              {bullet}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.meta}>
        <View style={styles.metaRow}>
          <Text variant="labelMedium" style={styles.metaLabel}>
            Source
          </Text>
          <Text variant="bodyMedium" style={styles.metaValue}>
            {source}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text variant="labelMedium" style={styles.metaLabel}>
            Updated
          </Text>
          <Text variant="bodyMedium" style={styles.metaValue}>
            {updatedAt}
          </Text>
        </View>
      </View>
      {actions.length > 0 ? (
        <>
          <View style={styles.divider} />
          <View style={styles.actions}>
            {actions.map(action => (
              <Button
                key={action.label}
                mode="outlined"
                textColor={accentColor}
                style={styles.button}
                onPress={() => onAction?.(action.prompt)}>
                {action.label}
              </Button>
            ))}
          </View>
        </>
      ) : null}
    </AccentCardShell>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  bullets: {
    gap: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletText: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  meta: {
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  metaLabel: {
    opacity: 0.65,
  },
  metaValue: {
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  actions: {
    marginTop: 4,
  },
  button: {
    borderRadius: 8,
  },
});
