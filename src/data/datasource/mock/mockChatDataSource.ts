import type { Message } from '@/domain/entities/Message';
import { createId } from '@/core/utils/id';

const seedMessages: Message[] = [
  {
    id: createId('seed'),
    role: 'assistant',
    content:
      'Hi! I can help you navigate enterprise workflows, answer policy questions, and run actions through natural language.',
    createdAt: new Date().toISOString(),
  },
];

export class MockChatDataSource {
  private messages: Message[] = [...seedMessages];

  async getMessages(): Promise<Message[]> {
    return [...this.messages];
  }

  async setMessages(messages: Message[]): Promise<void> {
    this.messages = [...messages];
  }

  async clearMessages(): Promise<void> {
    this.messages = [...seedMessages];
  }
}
