import type { ChatRepository } from '@/domain/repository/ChatRepository';
import type { Message } from '@/domain/entities/Message';

export class LoadMessagesUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  execute(): Promise<Message[]> {
    return this.chatRepository.getMessages();
  }
}

export class AppendChatTurnUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  execute(userContent: string, assistantContent: string): Promise<Message[]> {
    return this.chatRepository.appendTurn(
      userContent.trim(),
      assistantContent.trim(),
    );
  }
}

export class SeedAssistantMessageUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  execute(assistantContent: string): Promise<Message[]> {
    return this.chatRepository.seedAssistantMessage(assistantContent.trim());
  }
}

export class ClearChatUseCase {
  constructor(private readonly chatRepository: ChatRepository) {}

  execute(): Promise<void> {
    return this.chatRepository.clearMessages();
  }
}
