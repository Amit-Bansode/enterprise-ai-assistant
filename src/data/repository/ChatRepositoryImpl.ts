import { appConfig } from '@/core/config/appConfig';
import { LocalChatDataSource } from '@/data/datasource/local/localChatDataSource';
import { MockChatDataSource } from '@/data/datasource/mock/mockChatDataSource';
import type { Message } from '@/domain/entities/Message';
import type { ChatRepository } from '@/domain/repository/ChatRepository';
import { createId } from '@/core/utils/id';

export class ChatRepositoryImpl implements ChatRepository {
  private readonly mockDataSource = new MockChatDataSource();
  private readonly localDataSource = new LocalChatDataSource();

  async getMessages(): Promise<Message[]> {
    const cached = await this.localDataSource.getMessages();
    if (cached.length > 0) {
      return cached;
    }

    const messages = appConfig.useMockData
      ? await this.mockDataSource.getMessages()
      : [];

    await this.localDataSource.saveMessages(messages);
    return messages;
  }

  async appendTurn(
    userContent: string,
    assistantContent: string,
  ): Promise<Message[]> {
    const existing = await this.getMessages();
    const now = new Date().toISOString();

    const updated: Message[] = [
      ...existing,
      {
        id: createId('user'),
        role: 'user',
        content: userContent,
        createdAt: now,
      },
      {
        id: createId('assistant'),
        role: 'assistant',
        content: assistantContent,
        createdAt: now,
      },
    ];

    await this.localDataSource.saveMessages(updated);

    if (appConfig.useMockData) {
      await this.mockDataSource.setMessages(updated);
    }

    return updated;
  }

  async clearMessages(): Promise<void> {
    await this.localDataSource.clearMessages();
    if (appConfig.useMockData) {
      await this.mockDataSource.clearMessages();
    }
  }
}
