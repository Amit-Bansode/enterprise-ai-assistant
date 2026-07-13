import { useEffect, useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';

import { useChatStore } from '@/application/orchestrator/chatStore';
import { QUICK_ACTIONS } from '@/core/constants/quickActions';
import { GenUIRenderer } from '@/presentation/components/chat/GenUIRenderer';
import { ChatInput } from '@/presentation/components/chat/ChatInput';
import { QuickActionRow } from '@/presentation/components/chat/QuickActionRow';
import { MessageBubble } from '@/presentation/components/chat/MessageBubble';
import { ThinkingIndicator } from '@/presentation/components/chat/ThinkingIndicator';
import { ScreenContainer } from '@/presentation/components/common/ScreenContainer';
import type { Message } from '@/domain/entities/Message';

export function ChatScreen() {
  const listRef = useRef<FlatList<Message>>(null);
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

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }, [messages.length, components.length, isThinking]);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
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
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          onContentSizeChange={() => {
            listRef.current?.scrollToEnd({ animated: true });
          }}
          ListFooterComponent={
            <>
              {isThinking ? <ThinkingIndicator /> : null}
              {!isThinking && components.length > 0 ? (
                <GenUIRenderer components={components} onAction={sendMessage} />
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
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
