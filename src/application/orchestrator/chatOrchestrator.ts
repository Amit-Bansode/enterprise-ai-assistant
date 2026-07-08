import { processMessage } from '@/application/orchestrator/processMessage';
import {
  AppendChatTurnUseCase,
  ClearChatUseCase,
  LoadMessagesUseCase,
} from '@/application/usecases/chatUseCases';
import type { UIComponent } from '@/application/factory/types';
import type { DetectedIntent } from '@/application/intents/types';
import { ChatRepositoryImpl } from '@/data/repository/ChatRepositoryImpl';
import type { Message } from '@/domain/entities/Message';

const chatRepository = new ChatRepositoryImpl();

const loadMessagesUseCase = new LoadMessagesUseCase(chatRepository);
const appendChatTurnUseCase = new AppendChatTurnUseCase(chatRepository);
const clearChatUseCase = new ClearChatUseCase(chatRepository);

export interface ChatTurnResult {
  messages: Message[];
  components: UIComponent[];
  intent: DetectedIntent;
}

export const chatOrchestrator = {
  loadMessages(): Promise<Message[]> {
    return loadMessagesUseCase.execute();
  },

  async sendMessage(content: string): Promise<ChatTurnResult> {
    const processed = await processMessage(content);
    const messages = await appendChatTurnUseCase.execute(
      content,
      processed.assistantMessage,
    );

    return {
      messages,
      components: processed.components,
      intent: processed.intent,
    };
  },

  clearMessages(): Promise<void> {
    return clearChatUseCase.execute();
  },
};
