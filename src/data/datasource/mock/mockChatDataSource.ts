import type { Message } from '@/domain/entities/Message';

export class MockChatDataSource {
  private messages: Message[] = [];

  async getMessages(): Promise<Message[]> {
    return [...this.messages];
  }

  async setMessages(messages: Message[]): Promise<void> {
    this.messages = [...messages];
  }

  async clearMessages(): Promise<void> {
    this.messages = [];
  }
}
