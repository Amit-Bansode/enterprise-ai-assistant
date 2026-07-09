import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export function ThinkingIndicator() {
  const theme = useTheme();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(current => (current.length >= 3 ? '' : `${current}.`));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, styles.assistantAlign]}>
      <View
        style={[styles.bubble, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Thinking{dots}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  assistantAlign: {
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});
