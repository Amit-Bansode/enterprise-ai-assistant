import type { ChatRepository } from '@/domain/repository/ChatRepository';
import type { Message } from '@/domain/entities/Message';

export class SendMessageUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  execute(content: string): Promise<Message> {
    return this.chatRepository.sendMessage(content.trim());
  }
}

export class LoadMessagesUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  execute(): Promise<Message[]> {
    return this.chatRepository.getMessages();
  }
}

export class ClearChatUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  execute(): Promise<void> {
    return this.chatRepository.clearMessages();
  }
}
