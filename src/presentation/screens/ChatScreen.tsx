import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';

import { useChatStore } from '@/application/orchestrator/chatStore';
import { QUICK_ACTIONS } from '@/core/constants/quickActions';
import { GenUIRenderer } from '@/presentation/components/chat/GenUIRenderer';
import { ChatInput } from '@/presentation/components/chat/ChatInput';
import { QuickActionRow } from '@/presentation/components/chat/QuickActionRow';
import { MessageBubble } from '@/presentation/components/chat/MessageBubble';
import { ThinkingIndicator } from '@/presentation/components/chat/ThinkingIndicator';
import { ScreenContainer } from '@/presentation/components/common/ScreenContainer';

export function ChatScreen() {
  const {
    messages,
    components,
    isThinking,
    isInitialized,
    error,
    initialize,
    sendMessage,
    clearChat,
  } = useChatStore();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  return (
    <ScreenContainer>
      <Appbar.Header elevated>
        <Appbar.Content title="🤖 Enterprise AI Assistant" />
        <Appbar.Action icon="delete-outline" onPress={() => clearChat()} />
      </Appbar.Header>

      {error ? (
        <Text variant="bodySmall" style={styles.error}>
          {error}
        </Text>
      ) : null}

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <>
            {isThinking ? <ThinkingIndicator /> : null}
            {!isThinking && components.length > 0 ? (
              <GenUIRenderer components={components} />
            ) : null}
            <QuickActionRow
              actions={QUICK_ACTIONS}
              onAction={sendMessage}
              disabled={isThinking}
            />
          </>
        }
      />

      <Divider />
      <ChatInput onSend={sendMessage} disabled={isThinking} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  error: {
    color: '#B91C1C',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
