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

  async sendMessage(content: string): Promise<Message> {
    const userMessage: Message = {
      id: createId('user'),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    this.messages.push(userMessage);

    const assistantMessage: Message = {
      id: createId('assistant'),
      role: 'assistant',
      content: `I received: "${content}". Connect a remote datasource when your backend is ready.`,
      createdAt: new Date().toISOString(),
    };

    this.messages.push(assistantMessage);
    return assistantMessage;
  }

  async clearMessages(): Promise<void> {
    this.messages = [...seedMessages];
  }
}
