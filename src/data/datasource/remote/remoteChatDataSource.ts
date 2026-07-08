import type { Message } from '@/domain/entities/Message';
import { apiClient } from '@/core/network/apiClient';

export class RemoteChatDataSource {
  async getMessages(): Promise<Message[]> {
    const response = await apiClient.get<Message[]>('/chat/messages');
    return response.data;
  }

  async sendMessage(content: string): Promise<Message> {
    const response = await apiClient.post<Message>('/chat/messages', { content });
    return response.data;
  }
}
