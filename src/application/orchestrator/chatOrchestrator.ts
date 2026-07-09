import { processMessage } from '@/application/orchestrator/processMessage';
import { processStartupBrief } from '@/application/orchestrator/processStartupBrief';
import {
  AppendChatTurnUseCase,
  ClearChatUseCase,
  LoadMessagesUseCase,
  SeedAssistantMessageUseCase,
} from '@/application/usecases/chatUseCases';
import { clearConversationContext } from '@/application/context/conversationContext';
import type { UIComponent } from '@/application/factory/types';
import type { DetectedIntent } from '@/application/intents/types';
import { thinkingDelay } from '@/core/utils/delay';
import { ChatRepositoryImpl } from '@/data/repository/ChatRepositoryImpl';
import type { Message } from '@/domain/entities/Message';

const chatRepository = new ChatRepositoryImpl();

const loadMessagesUseCase = new LoadMessagesUseCase(chatRepository);
const appendChatTurnUseCase = new AppendChatTurnUseCase(chatRepository);
const seedAssistantMessageUseCase = new SeedAssistantMessageUseCase(chatRepository);
const clearChatUseCase = new ClearChatUseCase(chatRepository);

export interface ChatTurnResult {
  messages: Message[];
  components: UIComponent[];
  intent: DetectedIntent;
}

export const chatOrchestrator = {
  async initialize(): Promise<ChatTurnResult> {
    const existing = await loadMessagesUseCase.execute();

    const [processed] = await Promise.all([
      processStartupBrief(),
      thinkingDelay(),
    ]);

    if (existing.length > 0) {
      return {
        messages: existing,
        components: processed.components,
        intent: processed.intent,
      };
    }

    const messages = await seedAssistantMessageUseCase.execute(
      processed.assistantMessage,
    );

    return {
      messages,
      components: processed.components,
      intent: processed.intent,
    };
  },

  loadMessages(): Promise<Message[]> {
    return loadMessagesUseCase.execute();
  },

  async sendMessage(content: string): Promise<ChatTurnResult> {
    const [processed] = await Promise.all([
      processMessage(content),
      thinkingDelay(),
    ]);

    const assistantContent = processed.assistantMessage.trim() || 'Done.';
    const messages = await appendChatTurnUseCase.execute(content, assistantContent);

    return {
      messages,
      components: processed.components,
      intent: processed.intent,
    };
  },

  async clearMessages(): Promise<ChatTurnResult> {
    await clearChatUseCase.execute();
    clearConversationContext();
    return this.initialize();
  },
};
