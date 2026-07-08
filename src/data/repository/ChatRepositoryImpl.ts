import { appConfig } from '@/core/config/appConfig';
import { LocalChatDataSource } from '@/data/datasource/local/localChatDataSource';
import { MockChatDataSource } from '@/data/datasource/mock/mockChatDataSource';
import type { Message } from '@/domain/entities/Message';
import type { ChatRepository } from '@/domain/repository/ChatRepository';

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

  async sendMessage(content: string): Promise<Message> {
    const existing = await this.getMessages();
    const assistantMessage = appConfig.useMockData
      ? await this.mockDataSource.sendMessage(content)
      : {
          id: `assistant_${Date.now()}`,
          role: 'assistant' as const,
          content: 'Remote chat API is not configured yet.',
          createdAt: new Date().toISOString(),
        };

    const updated = appConfig.useMockData
      ? await this.mockDataSource.getMessages()
      : [
          ...existing,
          {
            id: `user_${Date.now()}`,
            role: 'user' as const,
            content,
            createdAt: new Date().toISOString(),
          },
          assistantMessage,
        ];

    await this.localDataSource.saveMessages(updated);
    return assistantMessage;
  }

  async clearMessages(): Promise<void> {
    await this.localDataSource.clearMessages();
    if (appConfig.useMockData) {
      await this.mockDataSource.clearMessages();
    }
  }
}
