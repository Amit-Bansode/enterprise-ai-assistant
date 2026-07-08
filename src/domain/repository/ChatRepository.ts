import type { Message } from '@/domain/entities/Message';

export interface ChatRepository {
  getMessages(): Promise<Message[]>;
  sendMessage(content: string): Promise<Message>;
  clearMessages(): Promise<void>;
}
