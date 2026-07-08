import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useChatStore } from '@/application/orchestrator/chatStore';
import { Routes } from '@/core/constants/routes';
import { ActionCard } from '@/presentation/components/cards/ActionCard';
import { ChatInput } from '@/presentation/components/chat/ChatInput';
import { MessageBubble } from '@/presentation/components/chat/MessageBubble';
import { ScreenContainer } from '@/presentation/components/common/ScreenContainer';
import type { RootStackParamList } from '@/presentation/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, typeof Routes.Chat>;

export function ChatScreen({ navigation }: Props) {
  const {
    messages,
    activeGenUI,
    isLoading,
    error,
    loadMessages,
    sendMessage,
    clearChat,
  } = useChatStore();

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return (
    <ScreenContainer>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Assistant" subtitle="Enterprise chat + GenUI" />
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
        ListHeaderComponent={
          activeGenUI ? <ActionCard descriptor={activeGenUI} /> : null
        }
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  loader: {
    paddingVertical: 12,
  },
  error: {
    color: '#B91C1C',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
