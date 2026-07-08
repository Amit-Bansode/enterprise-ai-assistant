import type { Message } from '@/domain/entities/Message';
import { StorageKeys } from '@/core/constants/storageKeys';
import { getObject, setObject } from '@/core/storage/mmkvStorage';

export class LocalChatDataSource {
  async getMessages(): Promise<Message[]> {
    return getObject<Message[]>(StorageKeys.chatHistory) ?? [];
  }

  async saveMessages(messages: Message[]): Promise<void> {
    setObject(StorageKeys.chatHistory, messages);
  }

  async clearMessages(): Promise<void> {
    setObject(StorageKeys.chatHistory, []);
  }
}
