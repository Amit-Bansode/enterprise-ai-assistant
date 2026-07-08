import type { Message } from '@/domain/entities/Message';

export interface ChatRepository {
  getMessages(): Promise<Message[]>;
  appendTurn(userContent: string, assistantContent: string): Promise<Message[]>;
  clearMessages(): Promise<void>;
}
