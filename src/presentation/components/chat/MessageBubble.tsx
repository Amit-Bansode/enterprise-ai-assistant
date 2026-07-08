import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import type { Message } from '@/domain/entities/Message';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const theme = useTheme();
  const isUser = message.role === 'user';

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userAlign : styles.assistantAlign,
      ]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isUser
              ? theme.colors.primary
              : theme.colors.surfaceVariant,
          },
        ]}>
        <Text
          variant="bodyMedium"
          style={{ color: isUser ? theme.colors.onPrimary : theme.colors.onSurface }}>
          {message.content}
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
  userAlign: {
    alignItems: 'flex-end',
  },
  assistantAlign: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});
