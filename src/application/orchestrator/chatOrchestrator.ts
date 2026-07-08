import { createGenUIComponent } from '@/application/factory/genUIComponentFactory';
import { parseIntent } from '@/application/parser/intentParser';
import {
  ClearChatUseCase,
  LoadMessagesUseCase,
  SendMessageUseCase,
} from '@/application/usecases/chatUseCases';
import { ChatRepositoryImpl } from '@/data/repository/ChatRepositoryImpl';
import type { GenUIComponentDescriptor } from '@/application/factory/genUIComponentFactory';
import type { Message } from '@/domain/entities/Message';

const chatRepository = new ChatRepositoryImpl();

const loadMessagesUseCase = new LoadMessagesUseCase(chatRepository);
const sendMessageUseCase = new SendMessageUseCase(chatRepository);
const clearChatUseCase = new ClearChatUseCase(chatRepository);

export interface ChatTurnResult {
  message: Message;
  genUI: GenUIComponentDescriptor | null;
}

export const chatOrchestrator = {
  loadMessages(): Promise<Message[]> {
    return loadMessagesUseCase.execute();
  },

  async sendMessage(content: string): Promise<ChatTurnResult> {
    const parsedIntent = parseIntent(content);
    const message = await sendMessageUseCase.execute(content);
    const genUI = createGenUIComponent(parsedIntent);

    return { message, genUI };
  },

  clearMessages(): Promise<void> {
    return clearChatUseCase.execute();
  },
};
